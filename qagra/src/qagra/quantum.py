"""Small auditable state-vector backend for QAGRA quantum ML prototypes."""
from __future__ import annotations
from dataclasses import dataclass
import math
import numpy as np

def rz(theta): return np.asarray([[np.exp(-0.5j*theta),0.0],[0.0,np.exp(0.5j*theta)]],dtype=np.complex128)
def ry(theta):
    c,s=math.cos(theta/2.0),math.sin(theta/2.0); return np.asarray([[c,-s],[s,c]],dtype=np.complex128)
H=np.asarray([[1,1],[1,-1]],dtype=np.complex128)/math.sqrt(2)

def _apply_single(state,gate,qubit,n):
    out=state.copy(); stride=1<<qubit
    for base in range(0,1<<n,stride<<1):
        for off in range(stride):
            i0=base+off; i1=i0+stride; a,b=state[i0],state[i1]; out[i0]=gate[0,0]*a+gate[0,1]*b; out[i1]=gate[1,0]*a+gate[1,1]*b
    return out

def _apply_cz(state,q0,q1,n):
    out=state.copy()
    for idx in range(1<<n):
        if ((idx>>q0)&1) and ((idx>>q1)&1): out[idx]*=-1.0
    return out

def _apply_rzz(state,theta,q0,q1,n):
    out=state.copy()
    for idx in range(1<<n):
        z0=1.0 if ((idx>>q0)&1)==0 else -1.0; z1=1.0 if ((idx>>q1)&1)==0 else -1.0; out[idx]*=np.exp(-0.5j*theta*z0*z1)
    return out

def standardize_features(X):
    X=np.asarray(X,dtype=float); mu=X.mean(axis=0); sigma=X.std(axis=0); sigma=np.where(sigma<1e-15,1.0,sigma); return (X-mu)/sigma,mu,sigma

def squash_angles(X): return np.pi*np.tanh(np.asarray(X,dtype=float)/2.0)

def feature_state(x,n_qubits=None,depth=2):
    x=np.asarray(x,dtype=float).reshape(-1); n=n_qubits or len(x)
    if n<=0: raise ValueError("n_qubits must be positive")
    if len(x)<n: x=np.pad(x,(0,n-len(x)))
    x=x[:n]; state=np.zeros(1<<n,dtype=np.complex128); state[0]=1.0
    for _ in range(depth):
        for q in range(n): state=_apply_single(state,H,q,n); state=_apply_single(state,rz(float(x[q])),q,n)
        for q in range(n-1): state=_apply_rzz(state,float(x[q]*x[q+1]),q,q+1,n)
    return state/np.linalg.norm(state)

def variational_state(x,theta,depth=2):
    theta=np.asarray(theta,dtype=float)
    if theta.ndim!=3 or theta.shape[2]!=2: raise ValueError("theta must have shape (layers, n_qubits, 2)")
    n=theta.shape[1]; state=feature_state(x,n_qubits=n,depth=depth)
    for layer in range(theta.shape[0]):
        for q in range(n): state=_apply_single(state,ry(float(theta[layer,q,0])),q,n); state=_apply_single(state,rz(float(theta[layer,q,1])),q,n)
        for q in range(n-1): state=_apply_cz(state,q,q+1,n)
        if n>2: state=_apply_cz(state,n-1,0,n)
    return state

def z_expectations(state,n):
    probs=np.abs(state)**2; out=np.zeros(n,dtype=float)
    for q in range(n): out[q]=float(np.dot(probs,np.asarray([1.0 if ((idx>>q)&1)==0 else -1.0 for idx in range(1<<n)])))
    return out

def quantum_feature_vector(x,theta):
    state=variational_state(x,theta); n=theta.shape[1]; z=z_expectations(state,n); probs=np.abs(state)**2; zz=[]
    for q in range(n-1):
        vals=[]
        for idx in range(1<<n):
            z0=1.0 if ((idx>>q)&1)==0 else -1.0; z1=1.0 if ((idx>>(q+1))&1)==0 else -1.0; vals.append(z0*z1)
        zz.append(float(np.dot(probs,np.asarray(vals))))
    return np.concatenate([z,np.asarray(zz,dtype=float)])

def fidelity_kernel(x,y,n_qubits=None,depth=2):
    sx=feature_state(x,n_qubits=n_qubits,depth=depth); sy=feature_state(y,n_qubits=n_qubits,depth=depth); return float(abs(np.vdot(sx,sy))**2)

def kernel_matrix(Xa,Xb,n_qubits=None,depth=2):
    Xa=np.asarray(Xa,dtype=float); Xb=np.asarray(Xb,dtype=float); K=np.empty((len(Xa),len(Xb)),dtype=float)
    for i,a in enumerate(Xa):
        for j,b in enumerate(Xb): K[i,j]=fidelity_kernel(a,b,n_qubits=n_qubits,depth=depth)
    return K

def openqasm3_feature_circuit(x,*,depth=2):
    x=np.asarray(x,dtype=float).reshape(-1); n=len(x); lines=["OPENQASM 3.0;",'include "stdgates.inc";',f"qubit[{n}] q;"]
    for _ in range(depth):
        for q,angle in enumerate(x): lines.append(f"h q[{q}];"); lines.append(f"rz({float(angle):.17g}) q[{q}];")
        for q in range(n-1):
            angle=float(x[q]*x[q+1]); lines.append(f"cx q[{q}], q[{q+1}];"); lines.append(f"rz({angle:.17g}) q[{q+1}];"); lines.append(f"cx q[{q}], q[{q+1}];")
    return "\n".join(lines)+"\n"

@dataclass
class QuantumFeatureModel:
    """Hybrid QAI: quantum feature extractor + small classical head."""
    n_qubits:int=4; layers:int=2; seed:int=11; ridge:float=1e-3
    def __post_init__(self):
        rng=np.random.default_rng(self.seed); self.theta=rng.normal(0.0,0.25,size=(self.layers,self.n_qubits,2)); self.mu=None; self.sigma=None; self.classes_=None; self.weights_=None
    def _encode(self,X,fit=False):
        X=np.asarray(X,dtype=float)
        if fit: _,self.mu,self.sigma=standardize_features(X)
        if self.mu is None or self.sigma is None: raise RuntimeError("Model has not been fitted")
        Z=squash_angles((X-self.mu)/self.sigma)
        if Z.shape[1]<self.n_qubits: Z=np.pad(Z,((0,0),(0,self.n_qubits-Z.shape[1])))
        return Z[:,:self.n_qubits]
    def _qfeatures(self,Z): return np.vstack([quantum_feature_vector(z,self.theta) for z in Z])
    def fit(self,X,y):
        Z=self._encode(X,fit=True); Q=self._qfeatures(Z); self.classes_=np.unique(y); Y=np.column_stack([(np.asarray(y)==c).astype(float) for c in self.classes_]); A=Q.T@Q+self.ridge*np.eye(Q.shape[1]); self.weights_=np.linalg.solve(A,Q.T@Y); return self
    def decision_function(self,X):
        if self.weights_ is None: raise RuntimeError("Model has not been fitted")
        return self._qfeatures(self._encode(X))@self.weights_
    def predict(self,X): return self.classes_[np.argmax(self.decision_function(X),axis=1)]
