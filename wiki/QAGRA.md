# QAGRA — Quantum-Assisted Gravitational Research Architecture

**Status:** Research software prototype v0.1 — review branch, not yet a scientific result.

QAGRA is the computational research layer of **The Fifth Force**. Its purpose is to accelerate the formulation, simulation, discrimination, and falsification of candidate gravitational and anomalous-force hypotheses using classical physics, AI, and quantum-computing methods.

> QAGRA does not assume that anti-gravity exists. The null hypothesis remains conventional physics plus measured nuisance forces.

## Core research question

Can quantum computation, quantum sensing, and AI extract more reliable information from complex gravitational experiments and simulations than strong classical methods, while maintaining an auditable path from equation to evidence?

## v0.1 software

The prototype lives under [`qagra/`](../qagra/) and contains:

- Newtonian force/acceleration primitives;
- a formal source–probe quantum model;
- post-selected weak-value calculations for a spatially superposed source;
- candidate null, inverse-square repulsive, Yukawa, oscillatory, and quantum-postselected hypotheses;
- a synthetic experiment/digital-twin generator with environmental nuisance channels;
- classical benchmark models;
- a hybrid quantum-AI feature model;
- OpenQASM 3 circuit export;
- physics-hypothesis ranking;
- a SHA-256 hash-chained evidence ledger;
- regression tests and a reproducible command-line demo.

## Mathematical core

The source/probe/environment Hilbert space is

\[
\mathcal H=\mathcal H_S\otimes\mathcal H_P\otimes\mathcal H_E.
\]

A general model is

\[
\hat H=\hat H_S+\hat H_P+\hat H_{SP}^{(g)}+\hat H_{\mathrm{nuis}}+\hat H_X(\theta_X),
\]

with nonrelativistic gravitational interaction

\[
\hat H_{SP}^{(g)}=-\frac{GMm}{|\hat{\mathbf r}_P-\hat{\mathbf r}_S|}.
\]

For source preparation \(|i\rangle\), postselection \(|f\rangle\), and gravitational acceleration operator \(\hat A_g\), QAGRA computes

\[
A_w=\frac{\langle f|\hat A_g|i\rangle}{\langle f|i\rangle}.
\]

The conditional quantum residual is

\[
a_Q=\operatorname{Re}(A_w)-a_{\mathrm{mix}}.
\]

This is a conditional post-selected prediction, not an unconditional repulsive force.

Full derivation: [`qagra/docs/MATHEMATICAL_MODEL.md`](../qagra/docs/MATHEMATICAL_MODEL.md).

## Quantum AI

The first QAGRA-QAI model is hybrid and intended to run on present gate-based quantum hardware.

Classical/sensor input \(x\) is encoded as

\[
|\phi(x)\rangle=U_\phi(x)|0\rangle^{\otimes n},
\]

processed through a trainable circuit

\[
|\psi(x;\theta)\rangle=U_\theta U_\phi(x)|0\rangle^{\otimes n},
\]

and measured through observables such as

\[
\langle Z_j\rangle,\qquad\langle Z_jZ_k\rangle.
\]

Those features are mapped to physical hypothesis classes rather than generic labels.

QAGRA explicitly rejects the shortcut assumption that a quantum computer automatically runs ordinary neural-network matrix multiplication faster. Quantum advantage must be demonstrated for a specific workload and include state preparation, circuit depth, sampling, error correction, and readout costs.

Architecture: [`qagra/docs/QUANTUM_AI_ARCHITECTURE.md`](../qagra/docs/QUANTUM_AI_ARCHITECTURE.md).

## Coherent scenario search

A future quantum scenario engine may represent hypotheses and parameter candidates coherently,

\[
|H\rangle=\sum_k\alpha_k|H_k\rangle,\qquad
|\Theta\rangle=\sum_j\beta_j|\theta_j\rangle,
\]

and apply controlled simulations

\[
U_{\mathrm{sim}}=\sum_{k,j}|k,j\rangle\langle k,j|\otimes U_{H_k}(\theta_j).
\]

The goal is not to read every scenario in one measurement. It is to use quantum algorithms to estimate decision statistics, likelihoods, amplitudes, or high-value candidate regions more efficiently when a valid speedup exists.

## Evidence discipline

QAGRA separates five levels: simulated anomaly; statistical anomaly; reproducible experimental anomaly; conventional-force explanations excluded; and independently replicated evidence for a new interaction. AI or quantum-computer output cannot by itself move a result to the final level.

## Current prototype result

The regression suite passes **8/8 tests**. The initial intentionally difficult four-class synthetic demo produced approximately **25.0% classical accuracy** and **22.9% quantum-feature accuracy**. The current prototype therefore does **not** claim a quantum advantage. That negative benchmark is retained as part of the research record.

## Next technical milestones

- train variational circuit parameters instead of using a fixed random ansatz;
- add quantum-kernel and amplitude-estimation benchmark modules;
- add density-matrix decoherence and open-system simulation;
- build experiment-specific nuisance libraries;
- import real gravimeter/interferometer datasets;
- freeze blind-analysis pipelines before evaluating experimental data;
- add Qiskit/Braket/Cirq hardware adapters;
- connect QAGRA runs to The Fifth Force ResearchEvent and ResearchReceipt graph.
