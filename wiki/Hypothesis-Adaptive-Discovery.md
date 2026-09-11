<!-- Generated from public/research/dossier/adaptive-discovery.md; edit canonical source. -->

# CFD-H5: Adaptive discovery and quantum resource accounting

**Status: computational hypothesis and benchmark specification.** The project has not demonstrated improved discovery efficiency or physical quantum advantage with this proposed method.

## 1. Objective

Select the next experiment that best separates surviving explanations per unit resource. The aim is not to maximize an apparent anomaly or classifier confidence. A useful selection may be a null control, a geometry survey, or a conventional-force calibration.

Let D be existing data, H a model label, $\theta_H$ its parameters, and d an allowed next experiment. The predictive distribution integrates parameter and nuisance uncertainty:

$$
p(y\mid d,D)=\sum_H\int p(y\mid d,H,\theta_H)
p(\theta_H,H\mid D)d\theta_H.
$$

Expected model information gain is

$$
U(d)=\mathbb E_{y\mid d,D}
D_{\rm KL}\left[p(H\mid D,y,d)\Vert p(H\mid D)\right].
$$

One possible resource-aware decision is $d^*=\arg\max_d U(d)/C(d)$ with a positive, explicitly defined cost. If time, money, exposure, and energy cannot be combined meaningfully, show a Pareto comparison instead of hiding arbitrary weights in one score.

## 2. Testable proposition

An adaptive strategy reaches a predefined discrimination or estimation target with lower total resource use than a fixed grid or randomized design, while maintaining the same false-positive and coverage standards on unseen scenarios.

This proposition can fail. A simple fixed design may be more robust, computationally cheaper, or equally informative. Preserve those outcomes.

## 3. Baselines and challenge families

Compare a fixed space-filling design, random allowed selection, a strong classical adaptive method, and any proposed quantum-assisted method. Give them identical allowed controls, initial evidence, resource budgets, parameter information, and stopping rules.

The blind scenario generator should include conventional gravity/noise; correlated drift; geometry error; magnetic/thermal coupling; finite-range injections of both signs; coherence/phase effects; detection bias; and misspecified mechanisms absent from the model library. Separate train/tuning seeds from final evaluation seeds and evaluate complete held-out apparatus configurations.

Classical baselines should extend beyond nearest-centroid classification: evaluate an appropriate likelihood model, regularized regression, and strong nonlinear models where relevant. Tune all methods comparably without using the final test labels.

## 4. Metrics

| Metric | Why it matters |
|---|---|
| False-positive rate after the full search | Detects selection-induced “discoveries” |
| Coverage of intervals | Tests uncertainty calibration |
| Resources to a registered target | Measures practical research efficiency |
| Held-out predictive log score | Rewards calibrated probabilities |
| Model discrimination accuracy | Useful but insufficient alone |
| Performance under model mismatch | Tests ability to remain uncertain |
| Failure/timeout rate | Includes unusable workloads |
| Total latency and monetary cost | Counts the full execution path |

Report distributions over repeated independent cases, uncertainty of comparisons, and both successful and failed runs. Do not report only the best seed or easiest signal regime. Compare paired cases where possible.

## 5. Role of an AI research assistant

The assistant may retrieve sources, propose models, translate reviewed equations into code, identify confounding variables, propose interventions, and summarize uncertainty. Generated equations require dimension, sign, limit, and numerical checks. Source retrieval must preserve exact references and distinguish retrieved text from model inference.

The current browser generator selects among fixed families. Loading a family is not compiling the generated equation. A future executable model needs a reviewed registry entry with parameter domains, solver/version, and observable mapping. Avoid unrestricted execution of generated code in the public request path.

Keep an explicit unknown/model-mismatch option. Do not force every unusual observation into a repulsive-force category. Hypotheses must include ordinary explanations and evidence that could contradict them.

## 6. Where quantum algorithms might enter

Candidate workloads include source/probe Hamiltonian simulation, structured kernel evaluation, Hamiltonian learning, and amplitude estimation for suitably encoded expectations. The relevant question is whether the complete workload is cheaper or more accurate than its best classical comparator.

Representing many possibilities in a superposition does not make all classical answers available in one readout. Amplitude-estimation query advantages assume coherent access to specified state preparation and reflections/oracles; building those operations can dominate cost. Small four-qubit circuits are straightforward classical simulations and do not establish computational speedup. See [S8] for the foundational amplitude-estimation algorithm.

For sensing, quantum Fisher information can bound achievable information, but multiparameter bounds may not be simultaneously attainable and nuisance parameters and measurement constraints matter. A formal bound is not an achieved sensor precision. Use an explicit accessible measurement and compare its classical outcome Fisher information with the bound.

## 7. End-to-end cost ledger

Record data cleaning/encoding, classical optimization, circuit compilation, state preparation, backend queue, shots, repeated measurement settings, readout, error mitigation, postprocessing, and retries. If fault tolerance is assumed, include logical/physical resource estimates and error-correction overhead. Distinguish active execution time from queue delay and total wall time.

For postselection, count every preparation, both outcomes, detection inefficiency, and reset. For a kernel, count all pairwise evaluations and storage. A claimed advantage must state whether it is accuracy at equal cost, cost at equal accuracy, or asymptotic query complexity under explicit assumptions.

## 8. Quantum circuit reproducibility requirement

The reviewed browser implementation includes final RY and CZ gates after its feature map; its original OpenQASM exporter omits those gates and measurement operations. Hardware comparisons must first resolve this mismatch. This dossier does not silently assert that exporting the old program reproduces displayed observables.

The implementation backlog requires one canonical circuit description from which simulator and export are generated. Validate gate order, angle convention, endianness, measurement basis, and Z/ZZ estimator definitions. Compare exact simulation with the exported program at fixed inputs, then compare shot estimates with statistical uncertainty. Hardware completion requires provider job IDs and actual submitted circuit artifacts.

## 9. Website behavior

The future recommendation panel should display candidate experiment, allowed parameter values, competing explanations, expected information gain, cost, model assumptions, and uncertainty. Let users inspect why a calibration was selected. Store the recommendation before its result to distinguish prediction from retrospective explanation.

A benchmark page should expose scenarios, seeds, model/code versions, metrics, failure counts, resource breakdown, and downloadable records. Human review controls canonical status changes. A simulation job completion or high model confidence must never automatically become experimental evidence.

## 10. Stop or continue

Continue an adaptive method when it repeatedly improves a registered metric at equal validity standards. Revise it when uncertainty is miscalibrated or it exploits nuisance correlations. Stop an asserted quantum-advantage path when end-to-end costs exceed the classical method without a compensating benefit; retain a clearly labeled educational or methodological implementation if useful.


---

[Canonical editable chapter](https://github.com/MoisesGuilhermeAbreuBarbosa/TheFifthForce/blob/main/public/research/dossier/adaptive-discovery.md) · [[Research-Dossier]] · [[Research-Dossier-Sources]]
