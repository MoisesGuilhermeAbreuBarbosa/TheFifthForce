"""Reproducible classical-vs-quantum benchmark pipeline."""
from __future__ import annotations
from dataclasses import dataclass,asdict
import numpy as np
from .classical import RidgeClassifier,accuracy
from .quantum import QuantumFeatureModel
from .simulator import Dataset

DEFAULT_MODEL_FEATURES=["source_mass_kg","probe_x_m","time_s","electric_field_v_m","magnetic_field_t","temperature_delta_k","vibration_m_s2","residual_m_s2"]
@dataclass
class BenchmarkResult:
    classical_accuracy:float; quantum_feature_accuracy:float; train_size:int; test_size:int; features:list[str]; seed:int
    def as_dict(self): return asdict(self)
def _select(dataset,names): return np.column_stack([dataset.column(name) for name in names])
def stratified_split(y,test_fraction=0.3,seed=19):
    rng=np.random.default_rng(seed); train=[]; test=[]; y=np.asarray(y)
    for c in np.unique(y):
        idx=np.flatnonzero(y==c); rng.shuffle(idx); n_test=max(1,int(round(len(idx)*test_fraction))); test.extend(idx[:n_test]); train.extend(idx[n_test:])
    return np.asarray(train,dtype=int),np.asarray(test,dtype=int)
def run_benchmark(dataset:Dataset,*,features=None,seed=19,max_quantum_train=240):
    features=features or list(DEFAULT_MODEL_FEATURES); X=_select(dataset,features); y=dataset.label; train_idx,test_idx=stratified_split(y,seed=seed); classical=RidgeClassifier().fit(X[train_idx],y[train_idx]); classical_acc=accuracy(y[test_idx],classical.predict(X[test_idx])); rng=np.random.default_rng(seed); q_train_idx=train_idx.copy()
    if len(q_train_idx)>max_quantum_train: q_train_idx=rng.choice(q_train_idx,max_quantum_train,replace=False)
    q_model=QuantumFeatureModel(n_qubits=min(4,X.shape[1]),layers=2,seed=seed).fit(X[q_train_idx],y[q_train_idx]); q_acc=accuracy(y[test_idx],q_model.predict(X[test_idx])); return BenchmarkResult(classical_acc,q_acc,int(len(train_idx)),int(len(test_idx)),features,seed)
