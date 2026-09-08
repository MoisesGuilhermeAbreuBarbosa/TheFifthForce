"""Classical baselines. Quantum claims are invalid without these controls."""
from __future__ import annotations
from dataclasses import dataclass
import numpy as np

@dataclass
class RidgeClassifier:
    ridge: float = 1e-6
    def fit(self, X: np.ndarray, y: np.ndarray) -> "RidgeClassifier":
        X=np.asarray(X,dtype=float); y=np.asarray(y); self.mu_=X.mean(axis=0); self.sigma_=X.std(axis=0); self.sigma_=np.where(self.sigma_<1e-15,1.0,self.sigma_)
        Z=(X-self.mu_)/self.sigma_; Z=np.column_stack([np.ones(len(Z)),Z]); self.classes_=np.unique(y); Y=np.column_stack([(y==c).astype(float) for c in self.classes_]); A=Z.T@Z+self.ridge*np.eye(Z.shape[1]); self.weights_=np.linalg.solve(A,Z.T@Y); return self
    def predict(self, X: np.ndarray) -> np.ndarray:
        Z=(np.asarray(X,dtype=float)-self.mu_)/self.sigma_; Z=np.column_stack([np.ones(len(Z)),Z]); return self.classes_[np.argmax(Z@self.weights_,axis=1)]

def accuracy(y_true, y_pred) -> float: return float(np.mean(np.asarray(y_true)==np.asarray(y_pred)))

def confusion_matrix(y_true, y_pred, labels=None):
    y_true=np.asarray(y_true); y_pred=np.asarray(y_pred); labels=np.asarray(labels if labels is not None else np.unique(np.concatenate([y_true,y_pred]))); idx={c:i for i,c in enumerate(labels)}; m=np.zeros((len(labels),len(labels)),dtype=int)
    for a,b in zip(y_true,y_pred): m[idx[a],idx[b]]+=1
    return labels,m
