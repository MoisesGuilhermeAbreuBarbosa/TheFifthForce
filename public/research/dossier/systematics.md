# CFD-H4: Systematics, interventions, and blind discrimination

**Status: conventional competing hypothesis and experiment protocol.** Its purpose is to explain apparent signals where ordinary mechanisms suffice and to quantify what remains when they do not.

## 1. Proposition

Many source-correlated apparent forces can be predicted from independently calibrated disturbance channels. A real test is prediction of withheld data under deliberate interventions, not unrestricted regression after seeing an anomaly.

For a locally linear stationary response,

$$
y(\omega)=a_N(\omega)+a_X(\omega)+\sum_jH_j(\omega)u_j(\omega)+\epsilon(\omega).
$$

The disturbance $u_j$ might be temperature, mirror motion, field gradient, or cable current. Its transfer function $H_j$ includes amplitude and phase. Nonlinearities, state changes, and memory require explicit extensions; a single linear fit is not universally adequate.

## 2. Why source correlation is not enough

Moving a source can also tilt an optical reference, alter a field, change gas flow, move cables, or warm a support. These routes share the source-control signal. A lock-in detector faithfully extracts all of them. Increasing integration time does not eliminate a source-synchronous systematic offset.

An ordinary quantum interaction can also produce coherence-dependent postselection. H1 therefore needs both quantum-control tests and interaction-specific background tests. Likewise, mass scaling can be mimicked when changing mass also changes magnetic material or mounting stress.

## 3. Intervention matrix

| Intervention | Information gained | Important ambiguity | Required record |
|---|---|---|---|
| Source parked, carriage moves | Motion and support coupling | Dummy mass may change vibration | Encoder, acceleration, settling trace |
| Matched dissipative load | Heating response | Local heat paths can differ | Distributed temperatures and power |
| Controlled magnetic changes | Magnetic susceptibility/gradient response | Nonlinear hysteresis | Field/gradient map and history |
| Charge neutralization or bias sweep | Electrostatic contribution | Patch potentials may remain | Surface/charge diagnostics |
| Source distance/shape changes | Spatial response | Geometry also changes backgrounds | Survey covariance and full mass map |
| Coherence/phase changes | Quantum selection dependence | Ordinary forces can interfere | Independent visibility and phase |
| Mounting or cable rerouting | Hardware force transmission | Sensor alignment may change | Photographs, CAD revision, calibration |
| Apparatus orientation | Vector/symmetry response | Several artifacts transform too | Orientation and environmental vectors |

No row is a universal proof of gravitational origin. The joint predictions and measured sensitivity determine what explanations are excluded.

## 4. Calibration, freezing, and validation

Divide data into calibration, model-development, and final evaluation sets by meaningful blocks or runs. Randomly splitting adjacent correlated samples can leak drift structure into both training and test data. Reserve complete sessions, geometry settings, or apparatus configurations when appropriate.

Estimate disturbance responses on calibration interventions. Verify that the channels have sufficient independent excitation to separate their effects. Freeze chosen transfer functions and uncertainty treatment before the science evaluation. Propagate calibration uncertainty rather than treating fitted coefficients as exact.

Include blinded injections with known signs and scales, some below the nominal detection threshold. A pipeline must recover true injections without manufacturing signals in null challenges. The party generating challenge labels should not expose them to the fitting process before the registered analysis is complete.

If the candidate physical signal and an environmental channel are collinear, data alone cannot separate them. Design an intervention that breaks that relation. Do not announce success because one flexible model happened to assign the shared signal to its preferred term.

## 5. Minimum observation record

Keep shot/run identifier, timestamp, source state, measured coordinates, detector calibration, raw or minimally processed readout, selected outcome, no-detection count, pulse sequence, temperature, pressure, electric/magnetic diagnostics, motion/tilt channels, instrument configuration, and rejection flags with reasons. Units and time synchronization must be explicit.

Preserve the full file and versioned processing pipeline. Publish correction history instead of overwriting troublesome observations. Store the mapping from raw record to plotted point and the uncertainty assumptions used in aggregation.

For imported public data, state which channels were not released. Missing telemetry is an uncertainty, not an observed absence of a disturbance. The Panda release cannot retroactively supply apparatus channels it does not contain.

## 6. Statistical decision protocol

Predeclare the candidate model family, parameter domains, primary observable, maximum exposure, stopping rule, control tests, and discovery/constraint criteria. If many models or frequencies are searched, calibrate the full selection pipeline on null simulations. Report exploratory results separately from confirmatory ones.

Possible outcomes include a well-calibrated null result, recovery of a conventional artifact, an inconclusive result limited by calibration, or an unexplained residual. A residual advances only when held-out prediction, intervention robustness, and independent replication support the next inference.

Failure to identify an artifact is not proof that no artifact exists. Conversely, a null test rules out only the predicted effect sizes and conditions to which it had sensitivity. Keep the claimed regime, achieved sensitivity, and replication differences together.

## 7. Momentum and energy accounting

Define the complete experimental boundary. For an isolated system, total momentum change must be balanced by external impulse or momentum flux. Include supports, fields, power supply, thermal radiation, expelled material, and measurement/control apparatus. Internal source–probe exchange cannot accelerate a fully isolated center of mass by itself.

For quantum postselection, account for both outcomes, discarded preparations, detection efficiency, and resetting. Conditional mean shifts are not a complete energy or momentum budget. A propulsion interpretation requires independent measurements of the full apparatus and its environment.

## 8. Website deliverables

Add a control-response matrix to each hypothesis record. Display measured calibration, predicted response, observation, residual, and uncertainty for each intervention. Link excluded explanations only to the actual tests that constrain them. Provide a conventional-mechanism library with instrument-specific parameters rather than a generic checklist marked “passed.”

A future blind-challenge module should seal scenario labels, record submitted model versions, expose labels after completion, and retain unsuccessful runs. The first implementation can use versioned GitHub fixtures and reviewed results; a shared online challenge service remains future work.

## 9. Acceptance criteria

Demonstrate disturbance-only held-out prediction; calibrated interval coverage; injected-signal recovery; false-positive control after model selection; robustness across sessions; and no use of hidden test labels. Failure should identify the next calibration or intervention needed. H4 and H2 should be validated together before interpreting a new residual as gravitational.
