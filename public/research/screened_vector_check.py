"""Dimensionless diagnostic, not a physical parameter fit or full mode spectrum."""
import numpy as np
from scipy.integrate import solve_bvp
from scipy.linalg import eigh, solve

def run(jamp, box=12., grid=240):
    g=.5; v=1.; ls=1.; k=2.; mc=1.; lc=1.
    def step(r,a): return .5*(1-np.tanh((r-a)/.05))
    def density(r): return step(r,1.)
    def controller(r): return jamp*(step(r,2.)-step(r,1.2))
    def ode(r,y):
        X,dx,s,ds,c,dc=y
        return np.vstack((dx,g*g*s*s*X-g*density(r)-2*dx/r,
            ds,ls*(s*s-v*v)*s+k*c*c*s-g*g*X*X*s-2*ds/r,
            dc,(mc*mc+k*s*s)*c+lc*c**3-controller(r)-2*dc/r))
    def bc(a,b): return np.array([a[1],a[3],a[5],b[0],b[2]-v,b[4]])
    r=np.linspace(1e-5,box,600); y=np.zeros((6,len(r))); y[2]=v
    sol=None
    # Continuation in controller amplitude for the nonlinear branch.
    for amp in np.linspace(0,jamp,6) if jamp else [0]:
        original=jamp; jamp=float(amp)
        sol=solve_bvp(ode,bc,r,y,tol=1e-7,max_nodes=25000)
        if not sol.success: raise RuntimeError(sol.message)
        r=sol.x; y=sol.y; jamp=original
    rr=np.linspace(0,box,grid+2)[1:-1]; h=box/(grid+1)
    X,dx,s,ds,c,dc=sol.sol(rr)
    lap=np.diag(np.full(grid,2/h**2))+np.diag(np.full(grid-1,-1/h**2),1)+np.diag(np.full(grid-1,-1/h**2),-1)
    A=lap+np.diag(g*g*s*s)
    B=np.diag(2*g*g*s*X)
    Hs=lap+np.diag(ls*(3*s*s-v*v)+k*c*c-g*g*X*X)+B@solve(A,B,assume_a='pos')
    Hc=lap+np.diag(mc*mc+3*lc*c*c+k*s*s)
    cross=np.diag(2*k*s*c)
    H=np.block([[Hs,cross],[cross,Hc]])
    eig=eigh(H,subset_by_index=[0,2],eigvals_only=True)
    return dict(J=original if jamp else 0,box=box,grid=grid,nodes=len(sol.x),residual=float(max(sol.rms_residuals)),
        s_min=float(min(s)),chi_max=float(max(c)),probe_vector_accel_per_unit_Q_over_m=float(-g*sol.sol(3.)[1]),
        radial_static_hessian_lowest=eig.tolist())

for box,grid in [(12.,240),(12.,480),(18.,480)]:
    for amp in [0.,5.]: print(run(amp,box,grid),flush=True)
