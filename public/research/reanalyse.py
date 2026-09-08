"""Real Panda data reanalysis; conditional finite-source Yukawa benchmark.
Run: python reanalyse.py. Requires numpy and scipy. No synthetic observations.
"""
from pathlib import Path
import csv, hashlib, json, re
import numpy as np
from scipy.integrate import quad
from scipy.optimize import brentq
from scipy.stats import chi2, norm
from scipy.constants import G, hbar, c, electron_volt, atomic_mass

ROOT = Path(__file__).resolve().parent
expected = {'panda_fig3a.csv':'df578555b01f75b3373d42d5336b8190',
            'panda_fig3b.csv':'0d5d04f094b5a7ff56e8554ab5805d4a',
            'panda_fig3d.csv':'d77b516441a8f3c12b930fd560172790'}
hashes = {}
for name, digest in expected.items():
    actual = hashlib.md5((ROOT/name).read_bytes()).hexdigest()
    assert actual == digest, (name, actual, digest)
    hashes[name] = actual
data = np.loadtxt(ROOT/'panda_fig3a.csv', delimiter=',', skiprows=1)
assert np.isfinite(data).all() and (data[:,1]>0).all()
y,sigma = data.T
w = 1/sigma**2
mean = np.dot(w,y)/w.sum()
chisq = np.sum(w*(y-mean)**2)
dof = len(y)-1
scale = np.sqrt(chisq/dof)
se = w.sum()**-.5
se_scaled = se*scale
# Central shift is not applied: the deposition's correction convention is unknown.
# Shared systematic and Newtonian uncertainties are profiled Gaussian nuisances.
baseline, baseline_sigma, sys_sigma = 35.2, 1., 2.66
excess = mean-baseline
total_sigma = np.sqrt(se_scaled**2+sys_sigma**2+baseline_sigma**2)
interval = [excess-1.95996398454*total_sigma, excess+1.95996398454*total_sigma]
folded95 = brentq(lambda b:norm.cdf((b-excess)/total_sigma)-norm.cdf((-b-excess)/total_sigma)-.95,0,100)
loo = (np.dot(w,y)-w*y)/(w.sum()-w)
group=[]
with (ROOT/'panda_fig3d.csv').open() as f:
    for row in csv.reader(f):
        values=re.findall(r'[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?',row[1])
        group.append([float(row[0]),float(values[0]),float(values[1])])
group=np.array(group)
X=np.column_stack([np.ones(3),group[:,0]-group[:,0].mean()])
cov=np.linalg.inv(X.T @ (X/group[:,2,None]**2))
coef=cov @ (X.T @ (group[:,1]/group[:,2]**2))
group_chi=np.sum(((group[:,1]-X@coef)/group[:,2])**2)

# Finite hollow cylinder with radial rectangular access slot, axial probe.
# At fixed radius r the slot removes azimuth 2 asin(width/(2r)).
# Integrate source z analytically; radial Gauss integration is then exact up to tolerance.
R1,R2,L,width,rho=.005,.0127,.0254,.0057,19300.
def acceleration(z, lam=np.inf, epsrel=1e-10, slot=True):
    def fun(r):
        near=np.hypot(r,z-L/2); far=np.hypot(r,z+L/2)
        angle=2*np.pi-2*np.arcsin(width/(2*r)) if slot else 2*np.pi
        return r*angle*(np.exp(-near/lam)/near-np.exp(-far/lam)/far)
    return G*rho*quad(fun,R1,R2,epsabs=1e-15,epsrel=epsrel)[0]*1e9
def cylinder_analytic(z):
    return 2*np.pi*G*rho*(np.hypot(R2,z-L/2)-np.hypot(R1,z-L/2)
        -np.hypot(R2,z+L/2)+np.hypot(R1,z+L/2))*1e9
z0=.014 # illustrative symmetric on-axis positions, not recovered metrology
a_nominal=acceleration(z0)
assert abs(acceleration(z0,slot=False)-cylinder_analytic(z0))<1e-9
convergence=abs(acceleration(z0,epsrel=1e-6)-a_nominal)
scan=[]
for lam in [.001,.003,.005,.01,.03,.1,1.,np.inf]:
    response=baseline*acceleration(z0,lam)/a_nominal
    scan.append({'range_m':float(lam) if np.isfinite(lam) else 'infinity',
       'response_nm_s2_per_alpha':response,
       'alpha_hat':excess/response,'alpha_sigma':total_sigma/response,
       'alpha_95_lower':interval[0]/response,'alpha_95_upper':interval[1]/response,
       'abs_alpha_folded95':folded95/response,
       'relative_response_z13mm':(acceleration(.013,lam)/acceleration(.013))/(response/baseline),
       'relative_response_z15mm':(acceleration(.015,lam)/acceleration(.015))/(response/baseline)})
# Physical Proca spectrum in infinite vacuum is Omega^2=c^2(k^2+lambda^-2).
# Dirichlet cube is a numerical regulator, NOT the real chamber's boundary.
spectra=[]
for N in [16,32,64,128]:
    box=.1; dx=box/(N+1); lam=.01
    k2=12*np.sin(np.pi/(2*(N+1)))**2/dx**2
    exact=(c/(2*np.pi))*np.sqrt(3*(np.pi/box)**2+1/lam**2)
    freq=c/(2*np.pi)*np.sqrt(k2+1/lam**2)
    spectra.append({'N_per_axis':N,'lowest_regulator_frequency_Hz':freq,
                    'exact_regulator_frequency_Hz':exact,'relative_error':(freq/exact-1)})

results={'data_md5':hashes,'n':len(y),'mean_nm_s2':mean,'formal_se_nm_s2':se,
 'scaled_se_nm_s2':se_scaled,'chi2':chisq,'dof':dof,'reduced_chi2':chisq/dof,
 'goodness_of_fit_p':chi2.sf(chisq,dof),'excess_nm_s2':excess,
 'excess_sigma_nm_s2':total_sigma,'excess_95_interval_nm_s2':interval,
 'folded_absolute_excess95_nm_s2':folded95,'null_delta_chi2':(excess/total_sigma)**2,
 'leave_one_out_mean_range':[loo.min(),loo.max()],
 'separation_slope_nm_s2_per_um':coef[1],'separation_slope_sigma':np.sqrt(cov[1,1]),
 'separation_linear_chi2_1dof':group_chi,
 'nominal_geometry_newton_nm_s2':a_nominal,'geometry_quadrature_change_nm_s2':convergence,
 'geometry_normalization_to_published':baseline/a_nominal,
 'conditional_yukawa_scan':scan,'proca_regulator_spectrum':spectra}
(ROOT/'results.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps(results,indent=2))
