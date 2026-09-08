import json,math
import numpy as np
from qagra.benchmark import run_benchmark
from qagra.evidence import EvidenceLedger
from qagra.hypotheses import ExperimentPoint,PostselectedQuantumGravity,RepulsiveInverseSquare
from qagra.model_selection import rank_hypotheses
from qagra.physics import gravity_acceleration_1d,postselected_weak_value
from qagra.quantum import feature_state,fidelity_kernel,openqasm3_feature_circuit
from qagra.simulator import Dataset,SimulationConfig,concatenate,simulate

def test_newtonian_direction():
    assert gravity_acceleration_1d(1.0,0.0,1.0)<0; assert gravity_acceleration_1d(1.0,0.0,-1.0)>0
def test_weak_value_can_leave_eigenvalue_range():
    op=np.diag([-1.0,-2.0]).astype(complex); i=np.array([1.0,1.0])/math.sqrt(2); f=np.array([1.0,-0.8]); assert np.real(postselected_weak_value(op,i,f))>0
def test_quantum_postselection_exposes_probability():
    h=PostselectedQuantumGravity(); assert 0.0<h.ideal_postselection_probability<=1.0; assert np.isfinite(h.residual_acceleration(ExperimentPoint(1e-3,0.02,0.0)))
def test_dataset_roundtrip(tmp_path):
    ds=simulate(SimulationConfig(n_samples=20),RepulsiveInverseSquare(alpha=0.1)); p=tmp_path/"d.csv"; ds.to_csv(p); rt=Dataset.from_csv(p); assert rt.X.shape==ds.X.shape; assert np.all(rt.label==ds.label)
def test_quantum_state_and_kernel():
    x=np.array([0.1,0.2,-0.3]); state=feature_state(x); assert np.isclose(np.linalg.norm(state),1.0); assert np.isclose(fidelity_kernel(x,x),1.0)
def test_qasm_export():
    qasm=openqasm3_feature_circuit(np.array([0.1,0.2])); assert "OPENQASM 3.0" in qasm; assert "rz(" in qasm; assert "cx q[0], q[1]" in qasm
def test_ledger_detects_tampering(tmp_path):
    p=tmp_path/"ledger.jsonl"; ledger=EvidenceLedger(p); ledger.append("a",{"x":1}); ledger.append("b",{"x":2}); assert ledger.verify()[0]; rows=p.read_text().splitlines(); row=json.loads(rows[0]); row["payload"]["x"]=99; rows[0]=json.dumps(row,sort_keys=True,separators=(",",":")); p.write_text("\n".join(rows)+"\n"); assert not ledger.verify()[0]
def test_end_to_end_benchmark_and_ranking():
    parts=[simulate(SimulationConfig(n_samples=30,seed=1),None),simulate(SimulationConfig(n_samples=30,seed=2),RepulsiveInverseSquare(alpha=0.3))]; ds=concatenate(parts); result=run_benchmark(ds,max_quantum_train=30); assert 0<=result.classical_accuracy<=1; assert 0<=result.quantum_feature_accuracy<=1; assert rank_hypotheses(parts[1])[0]["model"] in {"H_repulsive_inverse_square","H_yukawa_repulsive"}
