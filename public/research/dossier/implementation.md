# Implementation roadmap and research contracts

## 1. Release boundary

This release adds detailed research documentation, structured hypothesis/source records, an H1 mathematical explorer, numerical verification, and repository/Wiki/site navigation. It does not implement a full experimental inference platform, nonlinear field solver, shared run database, or physical quantum backend. The tables below distinguish those states.

Canonical chapter files live in `public/research/dossier/`. The site renders them under `/quantum-advances/research/[slug]`. `manifest.json` controls chapter order and metadata. `scripts/prepare-research-dossier.py` generates the complete Markdown download, Wiki chapters, and the downloadable numerical verifier. Edit canonical chapters, then run that script; do not manually edit generated Wiki copies.

## 2. Research record contracts

Each hypothesis has a stable ID, version, status, kind, precise statement, mathematical model, assumptions, parameters with units/domains, predictions, conventional competitors, falsification criteria, protocol, acceptance gates, source IDs, linked atlas subjects, implementation state, and limitations. `hypotheses.json` holds the five initial records; `schemas/research-hypothesis.schema.json` validates the contract.

Proposed run records should contain run ID; creation/completion timestamps; hypothesis ID/version; code commit; model implementation version; dataset identifier/hash; input parameters and units; geometry/calibration versions; execution type; random seeds; solver tolerances; backend/circuit/job metadata where applicable; outputs with uncertainties; diagnostics; failure state; and review status.

Suggested execution types are `analytic_benchmark`, `classical_synthetic`, `quantum_statevector`, `quantum_hardware`, `public_data_reanalysis`, and `new_sensor_measurement`. These names describe what executed. They are not evidence grades.

## 3. Capability matrix

| Capability | State after this release | Remaining work |
|---|---|---|
| Five detailed hypotheses | Delivered as unreviewed proposals | Independent scientific review |
| H1 weak/finite Gaussian benchmark | Delivered | Full apparatus/open-system model |
| Dossier reader and downloads | Delivered | Future localization/export formats |
| Structured hypotheses and sources | Delivered | Reviewed ingestion and change workflow |
| Existing synthetic force simulator | Existing prototype | Strong nuisance and geometry modeling |
| Existing statevector feature map | Existing prototype | Circuit/export parity and hardware adapter |
| Real Panda amplitude reanalysis | Existing, recomputed summary | Metrology recovery and covariance |
| Joint finite-range inference | Specified | Solver, likelihood, blind coverage validation |
| Screened-vector apparatus/stability | Specified, unresolved | Physical inputs and constrained dynamics |
| Adaptive next-experiment service | Specified | Baselines and blind resource benchmark |
| Shared public run records | Specified | Durable storage, authentication, review |
| Automatic research receipts | Schema/invitation plus this static receipt | Runtime event capture and ingestion |

## 4. Prioritized work packages

### WP0 — Scientific consistency

Unify conventions at model boundaries, explicitly map historical signs, show source type separately from evidence state, and reconcile video verification records. Preserve historical documents with dated status notes. Do not rewrite old numerical results merely to align their sign labels.

Acceptance: identical physical inputs map to identical signed predictions across Python, browser, and exported model records. Every imported source retains an unverified state until its claim-level review is complete. Transcript labels distinguish full verified transcript, secondary transcript pointer, metadata-only summary, and unavailable speech.

### WP1 — H1 reproducibility

Delivered here: weak and finite Gaussian moments, phase/decoherence dependence, selected/complementary probabilities, unconditional mean, source formulas, and independent numerical integration checks. The explorer uses dimensionless values and a clear model label.

Next acceptance: a full density-matrix solver recovers the benchmark in its limiting regime, preserves trace/positivity within numerical tolerance, resolves outcome-dependent losses, and supplies source/control momentum accounting. Physical feasibility remains a separate forecast.

### WP2 — Circuit parity and honest model loading

Create one circuit representation for execution and OpenQASM. Include final rotations, entangling gates, measurement declarations, and bit-order metadata. Rename fixed-family loading so users understand it does not execute generated equations. Change unspecified fallback ideas to an explicit unresolved/null baseline instead of defaulting to repulsion.

Acceptance: exact exported-circuit observables agree with browser values for fixed test inputs; shot estimates match statistical intervals; invalid angles/parameters are rejected; arbitrary generated equations cannot be silently represented by an unrelated fixed family.

### WP3 — Evidence and run storage

Use GitHub for reviewed canonical documentation and small research records. A future durable backend can store larger run outputs with stable identifiers and checksums; schema and permission design precede deployment. Keep public contributions separate from reviewed scientific records.

Acceptance: a shared run URL survives sessions and devices; artifact retrieval verifies hashes; access control protects unpublished records; revisions are attributable; interrupted jobs keep failure state. A local hash chain alone is not proof of authorship or protection against complete chain replacement. External timestamping or signatures require a defined trust model.

### WP4 — Geometry-aware inference

Implement the H2 finite-volume source response, detector integration, correlated likelihood, geometry priors, and null-calibrated parameter search. Import processed data honestly and keep unavailable channels explicit.

Acceptance: analytic limits, mesh/domain convergence, injected-signal recovery, confidence coverage, nuisance-only false-positive checks, and held-out geometry prediction. A pretty exclusion curve without these checks is not a completed analysis.

### WP5 — Conventional-force challenge library

Implement H4 calibration and intervention datasets, with thermal, magnetic, electrostatic, motion, and selection-bias models as appropriate to each apparatus.

Acceptance: independent interventions excite identifiable disturbance directions; frozen models predict held-out data; unmodeled mechanisms can produce an inconclusive outcome rather than a forced discovery label.

### WP6 — Adaptive research and quantum execution

Implement H5 expected-information selection with classical baselines first. Add a backend adapter only for a justified workload and store complete execution artifacts. Physical quantum access and provider configuration are not assumed by this release.

Acceptance: equal-budget repeated blind comparisons; resource accounting; model-mismatch evaluation; provider job/circuit/shot records; no quantum-advantage assertion from a browser simulation.

### WP7 — Screened-vector field program

Specify the action, units, charge sector, complete geometry, exterior state, and physical environmental intervention. Develop nonlinear continuation and constrained perturbation analysis.

Acceptance: converged observable, stable physical branch where claimed, independently checked dynamics, environment-specific constraint comparison, and one parameter set predicting multiple configurations. If no viable measurable region remains, publish that result.

## 5. Proposed API surface

The following are design proposals, not endpoints implemented by this release:

| Method/path | Purpose | Required behavior |
|---|---|---|
| GET `/api/v1/hypotheses` | Reviewed and proposed model catalog | Stable IDs, explicit status/version |
| POST `/api/v1/runs` | Submit validated computational job | Authentication, quotas, schema, execution type |
| GET `/api/v1/runs/:id` | Retrieve run and artifact pointers | Version/hash provenance, failure states |
| POST `/api/v1/experiment-designs` | Request a next-test proposal | Model set, budget, expected information |
| POST `/api/v1/research-receipts` | Submit consultation record | Validation and moderation |

Current static JSON downloads provide machine-readable access without pretending a write service exists. An API must advertise actual capabilities and must not claim every external visitor leaves an automatic record.

## 6. Review and publication workflow

Proposed records are reviewed for source provenance, dimensions, sign, model assumptions, testability, and implementation match. Reproducibility checks precede a status update. A reviewer may accept a useful null result or correction without supporting the underlying new-force claim.

Prefer changes reviewed through repository history. The GitHub Wiki publisher mirrors repository Wiki sources; native edits can be overwritten. Generated dossier Wiki pages include their canonical source path. The site's versioned fallback should include all newly linked chapters.

Vercel deployment follows the branch configured in the user's existing project. A Git commit is not proof that production deployed; inspect deployment status and public routes separately. Do not infer a working public address from a project name.

## 7. Validation commands

From the repository root:

```bash
python3 scripts/prepare-research-dossier.py
python3 scripts/verify-research-dossier.py
npm run build
```

The numerical verifier requires NumPy, already used by the scientific analysis. It prints checks and does not alter the original experimental files. Browser checks should cover chapter navigation, typeset equations, downloads, finite/weak switch, phase and coherence controls, invalid slugs, and mobile layout. Check that benchmark outputs are labeled and that the complete-outcome mean stays attractive.

## 8. Contributor task examples

- Reproduce H1 moments with an independent density-matrix implementation.
- Locate numerical Panda apparatus coordinates and covariance with primary provenance.
- Challenge H2 with a geometry error that mimics the candidate force.
- Derive the constrained scalar–vector perturbation operator for a fully specified branch.
- Supply a calibrated ordinary-force intervention dataset.
- Benchmark adaptive selection against a fixed design on sealed scenarios.

Contributions should state what was actually done, provide code/data/units, identify failures, and cite contradictory evidence. A research receipt documents consultation and findings, not endorsement.
