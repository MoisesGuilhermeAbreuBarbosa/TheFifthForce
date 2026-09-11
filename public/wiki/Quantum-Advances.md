# Quantum Advances

> **11 September 2026 research update:** [[Research-Dossier]] develops five hypotheses with full mathematics, controls, source records and implementation gates. [[Research-Implementation]] distinguishes delivered capabilities from planned work.

**Research hub for quantum computing, quantum sensing, quantum gravity, and AI-assisted gravitational discovery**

This page is the public entry point for the **Quantum Advances** research track of **The Fifth Force**.

The objective is to combine advances in quantum mechanics, quantum sensing, quantum computation, artificial intelligence, high-dimensional simulation, and rigorous experimental design to accelerate the search for new gravitational phenomena — including possible anomalous or repulsive gravitational interactions — without assuming in advance that such effects exist.

The central software implementation is **[[QAGRA — Quantum-Assisted Gravitational Research Architecture|QAGRA]]**.

> **Scientific position:** quantum computing and AI are research accelerators, not substitutes for experimental evidence. A calculated or classified anomaly is not proof of anti-gravity. The target is a reproducible physical effect that survives conventional explanations and independent replication.

---

## 1. Why quantum advances matter to gravity research

Gravity sits at an unusual intersection of physics. General relativity describes gravitation with extraordinary success at macroscopic scales, while quantum mechanics governs matter and the other known fundamental interactions at microscopic scales. A complete experimentally verified quantum theory of gravity remains unresolved.

At the same time, the technologies needed to probe weak gravitational phenomena are advancing rapidly:

- atom interferometry;
- Bose–Einstein condensate sensors;
- superconducting quantum devices;
- optomechanical force sensors;
- quantum gravimeters and gradiometers;
- coherent control of mesoscopic systems;
- quantum processors;
- quantum simulation;
- quantum machine learning;
- Hamiltonian learning;
- quantum computational sensing;
- high-performance AI-assisted scientific simulation.

These tools create a new opportunity: instead of asking only whether an experiment produces an unexplained force, construct a computational system capable of comparing many explicit physical hypotheses, nuisance mechanisms, quantum states, apparatus configurations, and parameter regimes against the same evidence.

The research question becomes:

> **Can quantum computation, quantum sensing, and AI increase the rate at which gravitational hypotheses are generated, simulated, discriminated, falsified, and experimentally tested?**

---

## 2. The QAGRA program

**QAGRA — Quantum-Assisted Gravitational Research Architecture** is the first executable implementation of this research direction.

QAGRA is designed as a null-first scientific discovery architecture:

```text
physical theory
      ↓
mathematical Hamiltonian / force model
      ↓
physics digital twin
      ↓
synthetic + experimental data
      ↓
classical analysis ───────┐
                          ├── hypothesis comparison
quantum algorithms ──────┘
      ↓
AI scientific reasoning
      ↓
experimental discrimination tests
      ↓
reproducibility + evidence ledger
```

The software is maintained under [`qagra/`](../qagra/).

Detailed implementation: **[[QAGRA — Quantum-Assisted Gravitational Research Architecture|QAGRA]]**.

---

## 3. Mathematical foundation

### 3.1 Classical gravitational null model

For source mass \(M\), probe mass \(m\), and separation vector

\[
\mathbf r=\mathbf r_P-\mathbf r_S,
\]

Newtonian gravity gives

\[
V_g(\mathbf r)=-\frac{GMm}{|\mathbf r|},
\]

\[
\mathbf F_g=-\frac{GMm}{|\mathbf r|^3}\mathbf r,
\]

and

\[
\mathbf a_g=-\frac{GM}{|\mathbf r|^3}\mathbf r.
\]

The experimental measurement is modeled as

\[
\mathbf y(t)=
\mathbf a_g+
\mathbf a_E+
\mathbf a_B+
\mathbf a_C+
\mathbf a_T+
\mathbf a_V+
\mathbf a_I+
\boldsymbol\epsilon,
\]

where the additional terms represent electric, magnetic, Casimir/surface, thermal, vibration, instrumental, and stochastic contributions.

The primary quantity analyzed by QAGRA is therefore the residual

\[
\mathbf R(t)=\mathbf y(t)-\widehat{\mathbf y}_{H_0}(t).
\]

The null hypothesis is not simply “gravity is attractive.” It is the complete best-supported conventional model of the apparatus.

---

## 4. Candidate anomalous interactions

QAGRA treats proposed new interactions as explicit mathematical models.

### Repulsive inverse-square residual

\[
\mathbf a_X^{(R2)}=
+\alpha\frac{GM}{r^2}\hat{\mathbf r}.
\]

### Repulsive Yukawa correction

\[
\mathbf a_X^{(Y)}=
+\alpha\frac{GM}{r^2}
\left(1+\frac r\lambda\right)e^{-r/\lambda}
\hat{\mathbf r}.
\]

### Oscillatory residual

\[
\mathbf a_X^{(O)}=
A\sin(2\pi ft+\phi)\hat{\mathbf n}.
\]

These are not asserted to be real. They are falsifiable models used to test whether a measured residual behaves more like a specified anomalous interaction than like noise or a conventional nuisance force.

The hypothesis library is designed to expand as new theoretical and experimental ideas are added.

---

## 5. Quantum source–probe gravitational model

QAGRA introduces a composite Hilbert space

\[
\mathcal H=
\mathcal H_S\otimes
\mathcal H_P\otimes
\mathcal H_E,
\]

where \(S\) is the source, \(P\) is the probe, and \(E\) represents environmental degrees of freedom.

A general Hamiltonian is

\[
\hat H=
\hat H_S\otimes I_P\otimes I_E+
I_S\otimes\hat H_P\otimes I_E+
\hat H_{SP}^{(g)}+
\hat H_{\mathrm{nuis}}+
\hat H_X(\theta_X).
\]

For localized nonrelativistic masses,

\[
\hat H_{SP}^{(g)}=
-\frac{GMm}{|\hat{\mathbf r}_P-\hat{\mathbf r}_S|}.
\]

The corresponding force operator on the probe is

\[
\hat{\mathbf F}_P=
-\nabla_{\mathbf r_P}\hat H_{SP}^{(g)}.
\]

This representation allows conventional gravitational interaction, environmental coupling, candidate anomalous terms, coherent source states, decoherence, and quantum measurement to be handled in one mathematical framework.

---

## 6. Spatial superposition and conditional gravitational response

For a two-branch source state,

\[
|i\rangle_S=
 c_L|L\rangle+c_R|R\rangle,
\qquad
|c_L|^2+|c_R|^2=1.
\]

The gravitational acceleration operator in a localized basis can be represented as

\[
\hat A_g=
 a_L|L\rangle\langle L|+
 a_R|R\rangle\langle R|.
\]

If coherence is discarded, the classical-mixture prediction is

\[
a_{\mathrm{mix}}=
|c_L|^2a_L+|c_R|^2a_R.
\]

For a post-selected source state

\[
|f\rangle_S=d_L|L\rangle+d_R|R\rangle,
\]

the post-selection probability is

\[
p_f=|\langle f|i\rangle|^2.
\]

The weak value is

\[
A_w=
\frac{\langle f|\hat A_g|i\rangle}
{\langle f|i\rangle}.
\]

In the weak-interaction regime, the conditional probe response is related to

\[
\Delta p_P\propto\operatorname{Re}(A_w).
\]

Because a weak value is a ratio of quantum transition amplitudes, \(\operatorname{Re}(A_w)\) may lie outside the ordinary eigenvalue range and under suitable post-selection may have a sign opposite to the individual attractive branch accelerations.

QAGRA defines the conditional quantum residual

\[
a_Q=
\operatorname{Re}(A_w)-a_{\mathrm{mix}}.
\]

This is a **conditional quantum prediction**, not a claim of a continuously operating classical repulsive gravitational field.

---

## 7. Density matrix and decoherence

The complete initial state may be written as

\[
\rho_0=
ho_S\otimes\rho_P\otimes\rho_E.
\]

Evolution is

\[
\rho(t)=U(t)\rho_0U^\dagger(t),
\qquad
U(t)=e^{-i\hat Ht/\hbar}.
\]

For source post-selection projector

\[
\Pi_f=|f\rangle\langle f|,
\]

the conditional probe state becomes

\[
\rho_{P|f}=
\frac{
\operatorname{Tr}_{S,E}
[(\Pi_f\otimes I_P\otimes I_E)\rho(t)]
}{p(f)}.
\]

Observable predictions follow from

\[
\langle\hat O_P\rangle_f=
\operatorname{Tr}(\rho_{P|f}\hat O_P).
\]

A simple source coherence model is

\[
\rho_S=
\begin{pmatrix}
|c_L|^2 & \eta c_Lc_R^*\\
\eta^*c_Rc_L^* & |c_R|^2
\end{pmatrix},
\qquad
0\le|\eta|\le1.
\]

This provides an important experimental control: a genuinely coherence-dependent prediction should change when coherence is deliberately reduced.

---

## 8. Quantum-assisted AI

A conventional neural-network layer can be represented as

\[
\mathbf h_{\ell+1}=
\sigma(W_\ell\mathbf h_\ell+\mathbf b_\ell).
\]

Quantum computation instead evolves a state through unitary operations,

\[
|\psi'\rangle=U|\psi\rangle.
\]

These are both linear-algebraic operations, but they are not computationally equivalent. A quantum computer does **not** automatically accelerate arbitrary neural-network matrix multiplication, and a superposition does not allow every possible answer to be read simultaneously.

QAGRA therefore focuses on quantum primitives where the structure of the scientific problem may provide genuine advantage.

---

## 9. QAGRA quantum feature model

An experiment is represented by a feature vector such as

\[
\mathbf x=
[M,r,t,E,B,T,V,a_{\mathrm{res}},\ldots]^T.
\]

After normalization, the data are encoded into a quantum state

\[
|\phi(\mathbf x)\rangle=
U_\phi(\tilde{\mathbf x})|0\rangle^{\otimes n}.
\]

A representative feature map is

\[
U_\phi(\mathbf x)=
\prod_{\ell=1}^{L_\phi}
\left[
\prod_jR_Z(x_j)H_j
\right]
\left[
\prod_jR_{ZZ}^{j,j+1}(x_jx_{j+1})
\right].
\]

The trainable quantum circuit is

\[
U_\theta=
\prod_{\ell=1}^{L}
\left[
U_{\mathrm{ent}}^{(\ell)}
\prod_j
R_Z(\theta^z_{\ell j})
R_Y(\theta^y_{\ell j})
\right].
\]

Thus

\[
|\psi(\mathbf x;\theta)\rangle=
U_\theta U_\phi(\mathbf x)|0\rangle^{\otimes n}.
\]

Measured quantum features include

\[
z_j=\langle Z_j\rangle,
\qquad
z_{jk}=\langle Z_jZ_k\rangle.
\]

A classical hypothesis head then produces

\[
\mathbf s=W_Q\mathbf z_Q+\mathbf b_Q,
\qquad
\widehat H=\arg\max_k s_k.
\]

The output classes are intended to correspond to **physical hypotheses and nuisance mechanisms**, not arbitrary pattern labels.

---

## 10. Coherent analysis of multiple scenarios

One long-term objective is to encode candidate physical hypotheses as

\[
|H\rangle=
\sum_k\alpha_k|H_k\rangle,
\]

and parameter candidates as

\[
|\Theta\rangle=
\sum_j\beta_j|\theta_j\rangle.
\]

A controlled simulator may then implement

\[
U_{\mathrm{sim}}=
\sum_{k,j}
|k,j\rangle\langle k,j|
\otimes
U_{H_k}(\theta_j).
\]

Applied to an initial state, this produces

\[
|\Phi\rangle=
\sum_{k,j}
\alpha_k\beta_j
|k,j\rangle
U_{H_k}(\theta_j)|\psi_0\rangle.
\]

This is a rigorous mathematical form of evaluating many candidate scenarios **coherently**.

It does not mean every classical result can be extracted in a single measurement. The objective is instead to structure the problem so quantum interference, phase estimation, amplitude estimation, amplitude amplification, quantum signal processing, or other task-specific algorithms can extract useful global information or concentrate probability on promising hypotheses.

---

## 11. Quantum workloads prioritized by the project

### Hamiltonian simulation

Simulate

\[
U(t)=e^{-iH(\theta)t/\hbar}
\]

for source, probe, environment, and candidate anomalous interactions.

### Hamiltonian learning

Infer unknown couplings in

\[
H(\theta)=H_0+\sum_j\theta_jH_j.
\]

The important test is whether an additional coupling parameter is statistically and physically required by the observations.

### Quantum kernels

Use

\[
K(x,x')=|\langle\phi(x)|\phi(x')\rangle|^2
\]

to compare high-dimensional experiment states.

### Quantum computational sensing

Interleave physical sensing interactions and coherent computation before the final measurement, optimizing the sensor toward the scientific decision rather than merely toward reconstructing a conventional observable.

### Amplitude estimation

Investigate potential quadratic query improvements for selected expectation-value and Monte Carlo workloads when coherent oracle construction is feasible.

### Quantum parameter estimation

For

\[
H(\theta)=H_0+\sum_j\theta_jH_j,
\]

the pure-state quantum Fisher information is

\[
[F_Q]_{jk}=4\operatorname{Re}
\left[
\langle\partial_j\psi|\partial_k\psi\rangle-
\langle\partial_j\psi|\psi\rangle
\langle\psi|\partial_k\psi\rangle
\right].
\]

The quantum Cramér–Rao bound is

\[
\operatorname{Cov}(\widehat\theta)
\succeq
\frac1N F_Q^{-1}.
\]

This gives a principled route to designing sensors that are maximally informative about the parameters distinguishing conventional gravity from a specific candidate anomaly.

---

## 12. AI as a scientific search engine

The long-term QAGRA AI is not intended merely to classify data. It is intended to act as an **AI Research Scientist** operating within strict evidence and provenance rules.

Its tasks include:

1. ingesting experimental data, papers, equations, source metadata, and apparatus models;
2. extracting explicit assumptions and candidate physical mechanisms;
3. converting hypotheses into parameterized equations and Hamiltonians;
4. generating competing conventional explanations;
5. running large simulation ensembles;
6. identifying parameter regions that produce measurable differences;
7. choosing classical or quantum algorithms appropriate to each computational structure;
8. ranking experiments by expected information gain;
9. proposing controls designed to falsify candidate explanations;
10. recording all model versions, datasets, assumptions, results, and provenance in the evidence ledger;
11. feeding verified results back into The Fifth Force evidence graph.

The intended research loop is:

```text
literature + experiment + theory
              ↓
       AI hypothesis engine
              ↓
 equations / Hamiltonians / priors
              ↓
   massive simulation campaign
              ↓
 classical + quantum algorithms
              ↓
       hypothesis ranking
              ↓
 discriminating physical experiment
              ↓
      measured evidence
              ↓
 replication / correction / new model
```

---

## 13. Scaling simulations

The objective is to eventually search extremely large combinations of:

- source masses;
- materials;
- geometries;
- distances;
- velocities;
- rotations;
- temperatures;
- electric fields;
- magnetic fields;
- superconducting states;
- quantum source states;
- coherence times;
- entanglement structures;
- vacuum conditions;
- sensor configurations;
- gravitational backgrounds;
- hypothetical interaction strengths;
- new-force ranges;
- measurement sequences;
- post-selection states;
- environmental nuisance combinations.

AI can manage the scientific search strategy while quantum algorithms are used only where they provide a justified computational or sensing advantage.

The important metric is not raw FLOPS or qubit count. It is:

> **scientifically useful information gained per unit experimental and computational resource.**

---

## 14. From anomalous force to physical proof

A computational result cannot establish anti-gravity. QAGRA uses an evidence ladder.

### Level 0 — simulated effect

A candidate force exists only inside a model or simulation.

### Level 1 — statistical anomaly

Experimental observations differ from the calibrated null distribution.

### Level 2 — reproducible apparatus anomaly

The effect reappears under controlled repetition.

### Level 3 — conventional forces excluded

Electrostatic, magnetic, thermal, mechanical, acoustic, Casimir/surface, instrumental, software, and geometry explanations fail quantitative tests.

### Level 4 — source-correlated interaction

The residual changes predictably with controlled source parameters.

### Level 5 — gravitational characteristics

The interaction exhibits a reproducible relationship to mass, geometry, distance, state, or other gravitationally meaningful variables.

### Level 6 — independent replication

A separate apparatus and independent team reproduce the effect.

### Level 7 — evidence for new gravitational physics

Only at this stage should the project describe the observation as evidence for a new gravitational interaction.

AI confidence and quantum-computer output do not replace these levels.

---

## 15. From proof to scaling and application

If a genuine anomalous interaction is established, a second research program begins.

The relevant engineering variables would include:

\[
F_X=F_X(M,m,r,\mathrm{geometry},\mathrm{state},T,E,B,\omega,\ldots).
\]

The project would then determine:

- whether the effect is static, transient, resonant, or conditional;
- whether it scales with source mass or energy density;
- whether it scales linearly, quadratically, exponentially, or through a threshold;
- whether it can perform net mechanical work;
- its energy balance;
- whether momentum is exchanged with a field, source, environment, or another degree of freedom;
- thermal limits;
- coherence requirements;
- materials limits;
- controllability;
- stability;
- efficiency;
- reproducibility at progressively larger scales.

Potential application categories should only be evaluated after those quantities are experimentally established.

---

## 16. QAGRA v0.1 implementation status

The first executable prototype currently contains:

- Newtonian force and acceleration primitives;
- source–probe quantum notation;
- post-selected weak-value calculations;
- anomalous-force hypothesis models;
- a synthetic experiment / digital-twin generator;
- environmental nuisance channels;
- classical benchmark models;
- a hybrid variational quantum feature model;
- quantum fidelity kernels;
- OpenQASM 3 circuit export;
- BIC-based physical hypothesis ranking;
- a SHA-256 hash-chained evidence ledger;
- command-line tools;
- regression tests;
- mathematical documentation;
- quantum-AI architecture documentation.

The initial regression suite passed **8/8 tests** during development.

The first intentionally weak four-class synthetic benchmark produced approximately:

- **classical baseline accuracy: 25.0%**;
- **quantum-feature model accuracy: 22.9%**.

This is retained as a negative result. QAGRA v0.1 therefore makes **no claim of quantum advantage**.

The purpose of the benchmark architecture is precisely to prevent the project from manufacturing an apparent quantum advantage by selecting favorable comparisons.

---

## 17. Current code structure

```text
qagra/
├── pyproject.toml
├── README.md
├── docs/
│   ├── MATHEMATICAL_MODEL.md
│   └── QUANTUM_AI_ARCHITECTURE.md
├── examples/
│   └── run_demo.py
├── src/qagra/
│   ├── physics.py
│   ├── hypotheses.py
│   ├── simulator.py
│   ├── classical.py
│   ├── quantum.py
│   ├── model_selection.py
│   ├── benchmark.py
│   ├── evidence.py
│   └── cli.py
└── tests/
    └── test_core.py
```

---

## 18. Evidence ledger and reproducibility

Every important research run can be chained through SHA-256 provenance.

A ledger entry records:

- event ID;
- timestamp;
- event type;
- previous-entry hash;
- payload;
- current-entry hash.

Typical events include:

```text
dataset_generated
benchmark_completed
hypothesis_ranking_completed
quantum_circuit_exported
```

If a historical record is modified, subsequent chain verification fails.

The evidence ledger is intended to integrate with the broader **The Fifth Force ResearchEvent and ResearchReceipt system**, allowing software experiments and human/AI research activity to become part of the same provenance graph without confusing research activity with scientific validation.

---

## 19. Development roadmap

### Phase A — mathematical and synthetic laboratory

- expand the Hamiltonian library;
- implement full 3-D multi-body models;
- introduce density-matrix/open-system simulation;
- model decoherence explicitly;
- strengthen nuisance-force models;
- generate large validated synthetic experiment sets;
- establish classical reference benchmarks.

### Phase B — AI research scientist

- automatic hypothesis generation;
- equation/Hamiltonian generation;
- parameter-space search;
- experiment-design optimization;
- automated falsification tests;
- uncertainty-aware ranking;
- evidence-graph integration.

### Phase C — trainable quantum AI

- optimize variational circuit parameters;
- parameter-shift gradients;
- SPSA hardware training;
- quantum kernel models;
- quantum anomaly detection;
- calibrated shot-noise analysis;
- end-to-end classical-versus-quantum resource accounting.

### Phase D — real quantum hardware

- Qiskit adapter;
- Amazon Braket adapter;
- Cirq-compatible execution path;
- real backend calibration ingestion;
- noise-aware transpilation;
- benchmark execution on multiple processor technologies.

### Phase E — real sensor integration

- atom-interferometer datasets;
- quantum gravimeter data;
- force-sensor data;
- synchronized environmental sensors;
- blind-analysis workflow;
- frozen-model experimental evaluation.

### Phase F — quantum-native gravitational sensing

Interleave the sensing Hamiltonian and quantum computation:

\[
S_1\rightarrow U_1\rightarrow S_2\rightarrow U_2\rightarrow\cdots\rightarrow S_n\rightarrow M.
\]

Instead of merely estimating \(g\), the sensor may eventually be optimized to answer a hypothesis decision such as

\[
H_0\;\text{versus}\;H_X.
\]

### Phase G — fault-tolerant discovery engine

If sufficiently capable fault-tolerant quantum processors become available:

- large Hamiltonian simulations;
- coherent parameter estimation;
- amplitude-estimation workloads;
- quantum linear-algebra methods where justified;
- large hypothesis spaces;
- simulation of more realistic quantum matter/gravity interfaces.

---

## 20. Research rules

The Quantum Advances track follows several non-negotiable rules:

1. **No unexplained residual is automatically gravity.**
2. **No AI prediction is primary experimental evidence.**
3. **No quantum-computer output is proof of a physical quantum effect unless tied to a physical experiment.**
4. **Every quantum-advantage claim requires a strong classical baseline.**
5. **Data loading, oracle construction, circuit depth, shots, noise, error correction, and readout must be counted.**
6. **Negative and null results are retained.**
7. **Source provenance must be preserved.**
8. **Physical predictions must include falsification conditions.**
9. **Experimental controls are part of the model, not an afterthought.**
10. **Independent replication remains the decisive step toward new physics.**

---

## 21. Repository resources

- **[[QAGRA — Quantum-Assisted Gravitational Research Architecture|QAGRA]]** — current implementation overview.
- [`qagra/README.md`](../qagra/README.md) — software package introduction.
- [`qagra/docs/MATHEMATICAL_MODEL.md`](../qagra/docs/MATHEMATICAL_MODEL.md) — mathematical formulation.
- [`qagra/docs/QUANTUM_AI_ARCHITECTURE.md`](../qagra/docs/QUANTUM_AI_ARCHITECTURE.md) — quantum-AI design.
- [`qagra/src/qagra/`](../qagra/src/qagra/) — implementation source code.
- [`qagra/tests/`](../qagra/tests/) — regression tests.
- [[Research Methodology]] — evidence classification rules.
- [[Research Presence Protocol|Research-Presence-Protocol]] — research provenance and AI-agent trail.
- [[Anti-Gravity]] — broader evidence-oriented research overview.

---

## 22. Long-term target

The ultimate objective is a continuously improving research system where

\[
\boxed{
\text{physics}
+
\text{experiment}
+
\text{AI}
+
\text{quantum computation}
+
\text{provenance}
\rightarrow
\text{faster falsifiable discovery}
}
\]

The purpose is not to train a machine to confirm anti-gravity.

The purpose is to create a system capable of exploring far more physical possibilities than a human team could examine manually, while applying a stricter evidence standard than an unconstrained AI search.

If one or more genuine anomalous gravitational interactions exist, the project aims to shorten the path from **hypothesis → mathematical model → simulation → discriminating experiment → replication → scaling → engineering application**.
