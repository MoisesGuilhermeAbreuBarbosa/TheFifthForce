# QAGRA — Quantum-Assisted Gravitational Research Architecture

QAGRA is a reproducible research software project for testing weak anomalous-force and candidate anomalous-gravity hypotheses with classical physics models, quantum algorithms, and an auditable evidence trail.

**Scientific position:** QAGRA does not assume antigravity exists. Its null hypothesis is conventional physics plus measured nuisance forces. Candidate anomalous interactions must beat that null model, survive systematic-error controls, and replicate before they can be treated as evidence for new gravitational physics.

## v0.1

- Newtonian force/acceleration primitives.
- Quantum source-superposition and post-selected weak-value calculations.
- Null, repulsive inverse-square, Yukawa, oscillatory, and quantum-postselected hypotheses.
- Synthetic experiment generator / digital twin with nuisance channels.
- Classical ridge baseline.
- Hybrid quantum-AI feature model: angle encoding, ZZ entangling map, variational circuit, quantum observables, classical head.
- OpenQASM 3 feature-map export for later hardware execution.
- BIC hypothesis ranking.
- SHA-256 hash-chained evidence ledger.
- CLI and regression tests.

## Run

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\\Scripts\\activate
pip install -e .[dev]
qagra demo --output-dir runs/demo
pytest -q
```

The demo emits a synthetic dataset, hypothesis ranking, OpenQASM circuit, benchmark summary, and tamper-evident evidence ledger.

## Quantum AI

For classical input x, QAGRA forms

`|phi(x)> = U_phi(x)|0>^n`,

then a variational state

`|psi(x;theta)> = U_theta U_phi(x)|0>^n`,

and measures observables such as `<Z_j>` and `<Z_j Z_k>`. These quantum features feed a small classical hypothesis head. This hybrid form can run on current gate-based hardware while remaining testable locally.

Quantum computers do **not** generically accelerate arbitrary AI matrix multiplication, and superposition does not make every answer readable in one pass. QAGRA therefore evaluates quantum advantage only for specific algorithms and includes the complete cost of state preparation, circuit execution, sampling, and readout.

See `docs/MATHEMATICAL_MODEL.md` and `docs/QUANTUM_AI_ARCHITECTURE.md`.
