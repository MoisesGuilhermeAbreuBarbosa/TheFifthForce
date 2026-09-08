"""Command-line interface for reproducible QAGRA experiments."""
from __future__ import annotations
import argparse,json
from pathlib import Path
from .benchmark import run_benchmark
from .evidence import EvidenceLedger,sha256_file
from .hypotheses import hypothesis_from_spec
from .model_selection import rank_hypotheses
from .simulator import Dataset,SimulationConfig,concatenate,simulate
from .quantum import openqasm3_feature_circuit

def _simulate_cmd(args):
    params={}
    if args.hypothesis in {"repulsive","inverse_square","repulsive_inverse_square"}: params["alpha"]=args.alpha
    elif args.hypothesis in {"yukawa","yukawa_repulsive"}: params.update(alpha=args.alpha,range_m=args.range_m)
    elif args.hypothesis in {"oscillatory","periodic"}: params.update(amplitude_m_s2=args.amplitude,frequency_hz=args.frequency)
    ds=simulate(SimulationConfig(n_samples=args.samples,seed=args.seed),hypothesis_from_spec(args.hypothesis,**params)); ds.to_csv(args.output); print(json.dumps({"output":str(args.output),"sha256":sha256_file(args.output),"rows":len(ds.X)},indent=2)); return 0

def _demo_cmd(args):
    out=Path(args.output_dir); out.mkdir(parents=True,exist_ok=True); ledger=EvidenceLedger(out/"evidence-ledger.jsonl"); specs=[("null",{}),("repulsive_inverse_square",{"alpha":0.12}),("yukawa_repulsive",{"alpha":0.18,"range_m":0.02}),("oscillatory",{"amplitude_m_s2":5e-12,"frequency_hz":0.7})]; parts=[]
    for i,(name,params) in enumerate(specs): parts.append(simulate(SimulationConfig(n_samples=args.samples_per_class,seed=args.seed+i),hypothesis_from_spec(name,**params)))
    ds=concatenate(parts); data_path=out/"synthetic.csv"; ds.to_csv(data_path); ledger.append("dataset_generated",{"file":data_path.name,"sha256":sha256_file(data_path),"classes":[s[0] for s in specs]}); bench=run_benchmark(ds,seed=args.seed); ledger.append("benchmark_completed",bench.as_dict()); ranking=rank_hypotheses(ds); ranking_path=out/"hypothesis-ranking.json"; ranking_path.write_text(json.dumps(ranking[:12],indent=2),encoding="utf-8"); ledger.append("hypothesis_ranking_completed",{"file":ranking_path.name,"sha256":sha256_file(ranking_path),"best":ranking[0]}); qasm_path=out/"feature-map.qasm"; qasm_path.write_text(openqasm3_feature_circuit([0.2,-0.4,0.7,0.1]),encoding="utf-8"); ledger.append("quantum_circuit_exported",{"file":qasm_path.name,"sha256":sha256_file(qasm_path)}); ok,count,error=ledger.verify(); summary={"benchmark":bench.as_dict(),"best_hypothesis_fit":ranking[0],"ledger":{"verified":ok,"entries":count,"error":error},"output_dir":str(out)}; (out/"summary.json").write_text(json.dumps(summary,indent=2),encoding="utf-8"); print(json.dumps(summary,indent=2)); return 0

def _rank_cmd(args): print(json.dumps(rank_hypotheses(Dataset.from_csv(args.dataset))[:args.top],indent=2)); return 0
def _verify_cmd(args):
    ok,count,error=EvidenceLedger(args.ledger).verify(); print(json.dumps({"verified":ok,"entries":count,"error":error},indent=2)); return 0 if ok else 2

def build_parser():
    p=argparse.ArgumentParser(prog="qagra",description="Quantum-Assisted Gravitational Research Architecture"); sub=p.add_subparsers(dest="command",required=True); s=sub.add_parser("simulate",help="Generate a synthetic experiment dataset"); s.add_argument("--hypothesis",default="null"); s.add_argument("--samples",type=int,default=1000); s.add_argument("--seed",type=int,default=7); s.add_argument("--alpha",type=float,default=0.1); s.add_argument("--range-m",type=float,default=0.02); s.add_argument("--amplitude",type=float,default=1e-11); s.add_argument("--frequency",type=float,default=0.5); s.add_argument("--output",type=Path,default=Path("runs/synthetic.csv")); s.set_defaults(func=_simulate_cmd); d=sub.add_parser("demo",help="Run the complete synthetic benchmark"); d.add_argument("--samples-per-class",type=int,default=120); d.add_argument("--seed",type=int,default=23); d.add_argument("--output-dir",type=Path,default=Path("runs/demo")); d.set_defaults(func=_demo_cmd); r=sub.add_parser("rank",help="Rank physics hypotheses against a CSV dataset"); r.add_argument("dataset",type=Path); r.add_argument("--top",type=int,default=10); r.set_defaults(func=_rank_cmd); v=sub.add_parser("verify-ledger",help="Verify hash-chain integrity"); v.add_argument("ledger",type=Path); v.set_defaults(func=_verify_cmd); return p
def main(argv=None):
    args=build_parser().parse_args(argv); return args.func(args)
if __name__=="__main__": raise SystemExit(main())
