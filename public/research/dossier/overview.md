# Coherence and Force Discrimination

Research dossier · Revision 1.0 · 11 September 2026

**Status: proposed research program with an executable mathematical benchmark. No new physical experiment, gravity-control device, or quantum-computational advantage is reported.**

## Purpose

The Fifth Force aims to preserve useful work from humans and AI systems and turn it into reproducible scientific progress. This dossier develops five linked hypotheses from the existing research content. It specifies the observables, equations, assumptions, conventional competitors, experiments, analysis requirements, implementation work, and stopping conditions needed to investigate them.

The program has two physical branches: conditional quantum source–probe response, and additional finite-range interactions. They share an inference and provenance framework, but they are not the same mechanism. Quantum computation is a possible analysis resource; quantum source coherence is a physical experimental variable. Neither implies the other.

## Evidence baseline

The repository reanalysis of the released Panda acceleration table retains 553 rows and obtains an extra switched acceleration of

$$
\widehat A=-2.103815\;\mathrm{nm/s^2},\qquad
\sigma_A=6.288705\;\mathrm{nm/s^2}.
$$

The two-sided Gaussian 95% interval is approximately $[-14.429451,10.221821]$ nm/s² under the documented likelihood assumptions. Zero is only 0.335 standard deviations from the fit. This is consistent with no additional force. These numbers were recalculated during the source review, not newly measured in a laboratory.

The deposited acceleration values are processed measurements, not raw atom images or fringe data. The paper's 552-block description and the CSV's 553 rows remain unresolved. The source/probe geometry used in the finite-source benchmark includes assumed coordinates and normalization to the published Newtonian prediction. There is no completed global exclusion analysis or nonlinear screened-vector apparatus solution. [Reanalysis and limitations](https://github.com/MoisesGuilhermeAbreuBarbosa/TheFifthForce/blob/main/public/research/REPORT-source.md).

The literature file contains 76 URL records. The atlas contains 150 research questions and 3,000 candidate mappings reusing those URLs. A mapping establishes neither relevance at claim level nor independent verification. The Wiki's separate 50 numbered references include repeated underlying sources; these counts must not be added as if they were unique evidence items.

## Hypothesis register

| ID | Proposition | Kind | Present status | Primary next gate |
|---|---|---|---|---|
| CFD-H1 | A specified conditional response changes sign only above a calculable coherence/overlap threshold | Quantum-model prediction | Weak and finite-Gaussian benchmarks derived | Reproduce distributions and outcome accounting |
| CFD-H2 | Multiple measured geometries distinguish a finite-range response from admissible metrology errors | Experimental design | Formal inference specification | Demonstrate identifiability on blind synthetic cases |
| CFD-H3 | One screened-vector model predicts distance, environment, and composition dependence jointly | Speculative physical model | Coupled equations and required inputs documented | Stable apparatus solution and compatible constraints |
| CFD-H4 | Independently calibrated disturbance responses predict many source-correlated apparent forces | Conventional competitor | Intervention protocol specified | Predict held-out disturbance and science runs |
| CFD-H5 | Adaptive experiment choice improves discrimination per resource over fixed/random designs | Computational hypothesis | Benchmark design specified | Repeated blind end-to-end comparison |

These are proposed extensions for this project, not claims of priority in the scientific literature. An AI-generated proposition is not peer-reviewed theory or experimental evidence. A new hypothesis record starts as **proposed / unreviewed**.

## How the pieces work together

H1 supplies a fully specified small quantum benchmark. H2 supplies the force/geometry inference structure. H4 supplies explicit conventional competitors. H5 chooses experiments that separate the models left after prior results. H3 enters the same process only when its field solution and nuisance predictions are sufficiently defined.

For each cycle, register models and priors; validate limiting cases; choose controls and exposure; generate blind recovery challenges; freeze analysis; analyze the observations; publish the complete result; and update the evidence graph. Keep null results and failures in the same history as positive results.

## What is provided in this release

- Nine readable chapters, with equations, experiment protocols, decision criteria, and primary-source pointers.
- Five machine-readable hypothesis records and a validation schema.
- A reproducible H1 calculator for both the weak limit and a finite Gaussian impulse model.
- Numerical fixtures that preserve selected, complementary, and unconditional outcomes.
- An in-browser H1 explorer and direct links from Quantum Advances and the Wiki.
- A detailed implementation backlog distinguishing delivered material from planned work.

## What remains unperformed

No coherent-mass gravitational experiment, new detector measurement, complete nonlinear vector stability analysis, strong classical-versus-physical-quantum benchmark, or shared run database is delivered by this documentation release. The H1 finite model assumes fixed branches and prescribed impulses; it is not a full three-dimensional apparatus simulation. Synthetic and mathematical outputs are labeled accordingly.

## Reading sequence

Begin with **Conventions and evidence**, then **Coherence threshold**. Read **Finite-range identifiability** and **Systematics and interventions** together before interpreting residual data. **Screened vector** provides the conditional theory extension. **Adaptive discovery** and **Implementation roadmap** describe how to make the research executable. **Sources and provenance** records attribution and verification limits.

## Engineering interpretation

The first useful outcome is a correctly predicted measurement or a defensible parameter constraint. An unexplained residual motivates investigation. A replicated new interaction would motivate a separate engineering program covering source and probe scaling, complete-system momentum and energy, control, stability, power, heat, duty cycle, and independent reproduction. There is no justified extrapolation from a conditional quantum response to a continuously operating propulsion system.
