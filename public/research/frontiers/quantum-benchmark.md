# Where could quantum computation actually help?

F06 · Proposed investigation · 2026-09-13

AI-assisted research design; not peer reviewed. No new experimental result.

## Research question
Can a quantum algorithm estimate a useful observable in a gravity-related model more efficiently than a well-chosen classical method after input preparation, repetitions and readout? A quantum neural network is not automatically a faster replacement for every matrix multiplication in an AI model.

## Choose a bounded problem
Start with either a low-energy eigenvalue of a small discretized Hamiltonian or an expectation associated with a sparse linear system. For a Hamiltonian encoded as Pauli operators,

$$
\hat H=\sum_j c_j\hat P_j,\qquad E(\theta)=\sum_j c_j\langle\psi(\theta)|\hat P_j|\psi(\theta)\rangle.
$$

Specify units, boundary conditions and discretization before encoding. A variational minimum within an ansatz is not proof of the exact ground state or dynamical stability. Compare it with exact diagonalization for small problems and a suitable sparse classical solver as sizes grow.

For a linear-system algorithm, explicitly state sparsity, condition number, state preparation and requested output. A quantum solution state does not provide every component of a classical vector for free. Grover-style search gives a quadratic query improvement under an oracle model, not access to all hypotheses in one measurement.

## Full cost ledger
Use the same target error and success probability for every method. Record

$$
T_{\rm total}=T_{\rm preparation}+T_{\rm compilation}+T_{\rm queue}+T_{\rm execution}+T_{\rm readout}+T_{\rm classical}.
$$

Report algorithm execution separately from queue delay as well as the total. Record qubit count, two-qubit gate count, depth, shots, optimizer calls, noise mitigation, hardware calibration and random seeds. Amplitude-estimation speedups depend on coherent oracle access; sampling a circuit repeatedly is not automatically amplitude estimation.

## Staged experiment
1. Validate the physical discretization and classical reference at multiple resolutions.
2. Run an exact state-vector simulation and compare identical observables.
3. Add realistic noise and finite-shot confidence intervals.
4. Evaluate training failures and gradient variance across multiple initializations, including barren-plateau risk.
5. Execute on hardware only when a configured backend is available, preserving the real job ID and resource record.
6. Benchmark end-to-end accuracy and cost against classical alternatives with matching data access.

## Falsification and publication
Reject an advantage claim if it depends on omitted input costs, a weak classical baseline, different accuracy, or uncounted postselection. Negative benchmark results are useful: they tell us which workloads should stay classical. Quantum generative models may help sample a model distribution, but samples still require physical validation.

This release supplies the research specification and links to the existing Quantum Advances lab. It does not claim a hardware run, quantum advantage, or a quantum-computing solution to anti-gravity. The next milestone is a versioned benchmark dataset with matched-error resource tables.

## Sources

- [SRC-086: Quantum algorithm for solving linear systems of equations](https://arxiv.org/abs/0811.3171)
- [SRC-087: Quantum Computing in the NISQ era and beyond](https://arxiv.org/abs/1801.00862)
- [SRC-088: Barren plateaus in quantum neural network training landscapes](https://arxiv.org/abs/1803.11173)
- [SRC-089: A variational eigenvalue solver on a quantum processor](https://arxiv.org/abs/1304.3061)
- [SRC-090: Quantum Amplitude Amplification and Estimation](https://arxiv.org/abs/quant-ph/0005055)
- [SRC-091: A fast quantum mechanical algorithm for database search](https://arxiv.org/abs/quant-ph/9605043)
- [SRC-095: Quantum generative adversarial network for generating discrete distribution](https://arxiv.org/abs/1807.01235)
- [SRC-096: The Trotter Step Size Required for Accurate Quantum Simulation of Quantum Chemistry](https://arxiv.org/abs/1406.4920)
