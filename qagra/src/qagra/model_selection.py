"""Interpretable residual-hypothesis ranking by BIC."""
from __future__ import annotations
import math
import numpy as np
from .physics import G
from .simulator import Dataset

def _bic(residual,prediction,k):
    n=len(residual); rss=max(float(np.sum((residual-prediction)**2)),1e-300); return n*math.log(rss/n)+k*math.log(n)
def _fit_one_basis(y,basis):
    denom=float(np.dot(basis,basis)); beta=0.0 if denom<1e-300 else float(np.dot(basis,y)/denom); return beta,beta*basis

def rank_hypotheses(dataset: Dataset) -> list[dict]:
    y=dataset.column("residual_m_s2"); m=dataset.column("source_mass_kg"); x=dataset.column("probe_x_m"); t=dataset.column("time_s"); r=np.abs(x); outward=np.sign(x); candidates=[]; zero=np.zeros_like(y)
    candidates.append({"model":"H0_null","bic":_bic(y,zero,0),"params":{}})
    inv=outward*G*m/np.maximum(r,1e-12)**2; beta,pred=_fit_one_basis(y,inv); candidates.append({"model":"H_repulsive_inverse_square","bic":_bic(y,pred,1),"params":{"alpha":beta}})
    for lam in (0.005,0.01,0.02,0.05,0.1):
        basis=inv*(1.0+r/lam)*np.exp(-r/lam); beta,pred=_fit_one_basis(y,basis); candidates.append({"model":"H_yukawa_repulsive","bic":_bic(y,pred,2),"params":{"alpha":beta,"range_m":lam}})
    duration=max(float(np.ptp(t)),1e-9)
    for freq in np.linspace(1.0/duration,3.0,30):
        S=np.column_stack([np.sin(2*np.pi*freq*t),np.cos(2*np.pi*freq*t)]); beta,*_=np.linalg.lstsq(S,y,rcond=None); pred=S@beta; candidates.append({"model":"H_oscillatory","bic":_bic(y,pred,3),"params":{"frequency_hz":float(freq),"sin_coeff":float(beta[0]),"cos_coeff":float(beta[1])}})
    candidates.sort(key=lambda row:row["bic"]); best=candidates[0]["bic"]
    for row in candidates: row["delta_bic"]=float(row["bic"]-best)
    return candidates
