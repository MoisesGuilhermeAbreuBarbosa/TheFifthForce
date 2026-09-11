# Conventions, assumptions, and evidence

## Coordinates and dimensions

Let $\mathbf r=\mathbf r_P-\mathbf r_S$ point from source to probe. Positive radial acceleration points away from the source. Newtonian acceleration is therefore

$$
\mathbf a_N=-\frac{GM}{r^2}\widehat{\mathbf r}.
$$

Use SI for experimental observables: mass in kg, distance in m, time in s, acceleration in m/s², and momentum in kg m/s. One nm/s² is $10^{-9}$ m/s². Use $G=6.67430\times10^{-11}$ m³ kg⁻¹ s⁻² for these benchmarks; this is a numerical convention, not a claim that uncertainty in G is always negligible.

Field-theory formulas explicitly labeled natural units use $\hbar=c=1$. Natural-unit mass parameters are energies, not kilogram values. Any apparatus solver must specify conversions for coordinates, mass/energy density, charge density, and field normalization. Never insert SI density directly into a natural-unit field equation.

## One Yukawa sign convention

The dossier uses

$$
V=-\frac{GMm}{r}\left(1+\alpha e^{-r/\lambda}\right),
$$

which gives

$$
\mathbf a_Y=-\alpha\frac{GM}{r^2}
\left(1+\frac r\lambda\right)e^{-r/\lambda}\widehat{\mathbf r}.
$$

Positive $\alpha$ adds attraction; negative $\alpha$ adds a repulsive correction. The legacy QAGRA/browser outward-force family instead uses positive outward amplitude $\alpha_{\rm out}$. For the same correction, $\alpha=-\alpha_{\rm out}$. This release documents the mapping rather than silently changing historical records or fits.

The total radial acceleration reverses only if

$$
1+\alpha(1+r/\lambda)e^{-r/\lambda}<0.
$$

For infinite range this requires $\alpha<-1$. A negative fitted correction of small magnitude is reduced attraction, not net repulsion. Geometry-specific finite-source integrals replace this point-source criterion in an apparatus.

## What each result means

| Result | Permitted interpretation | Further evidence needed |
|---|---|---|
| Support balances weight | Conventional levitation | A separate gravitational observable |
| Dispersion has negative effective mass | Effective dynamical behavior | Independent active/passive gravity test |
| Residual differs from zero | Model/data discrepancy | Calibration, systematics, predictions, replication |
| Selected quantum mean reverses sign | Conditional response in a specified protocol | Complementary outcomes, gravity specificity |
| Source-correlated extra force replicates | Reproducible interaction candidate | Mechanism and compatibility with other tests |
| One simulated classifier wins | Workload-specific numerical result | Strong baselines, repeats, full resource costs |

## Statistical language

Report the observable, estimate, uncertainty construction, covariance assumptions, intervals, and analysis selections. A confidence interval is not a posterior probability without a specified Bayesian analysis. A p-value is not the probability that a model is true. BIC differences are approximate model-comparison summaries, not calibrated discovery significance.

Candidate searches over frequency, range, geometry, or many AI-generated models create selection effects. Use independent held-out data and null simulations of the complete search pipeline, including tuning and selection. Correlated samples do not contribute the same information as independent samples. Repeated measurement of one amplitude does not create new response directions in parameter space.

When the coupling is zero, a force's range or oscillation frequency may be unidentified. Standard regular likelihood approximations can fail at this boundary. Calibrate coverage and false-alarm rates for the actual pipeline. Do not repair disagreement by deleting favorable rows or introducing undocumented offsets.

## Quantum response and measurement

For a weak impulse interaction

$$
U=\exp\left(\frac{i mT\hat A_g\otimes\hat x}{\hbar}\right),
$$

an initially centered real Gaussian probe has a leading conditional momentum shift $mT\operatorname{Re}(A_w)$ under the stated source selection. Different pointer correlations and measurement choices can change the mapping; a weak value alone does not define an instrument.

Postselection probabilities generally depend on the interaction. The expression $|\langle f|i\rangle|^2$ is the zero/weak-interaction limit. At finite strength calculate probabilities from the evolved state and use those probabilities when averaging outcomes.

For a complete source measurement whose result is ignored, the reduced probe state equals its state before that measurement. Consequently

$$
\sum_f p_f\langle p\rangle_f=\langle p\rangle_{\rm unconditioned}.
$$

This identity is not, by itself, a complete momentum-conservation proof for a device. Include source recoil, state preparation, trapping/control apparatus, photons, and environmental fluxes when making a complete-system claim.

## Admission requirements for models

Every proposed model needs an equation or Hamiltonian, variable definitions, units, parameter domain, initial/boundary conditions, measured observable, conventional competitors, limiting cases, sensitivity assumptions, and falsification criteria. A text label or invented force formula alone is insufficient for an experimental prediction.

A model should explain more observations than the parameters introduced solely to fit them. Preserve reasonable alternative nuisance models. A poor fit under an incomplete null model is not evidence that the new interaction is correct.

## Source and evidence states

Keep source type separate from claim status. A primary theoretical paper, preprint, experiment, review, patent, and video are different source types. Proposed, simulated, measured, independently replicated, constrained, and retracted are different statuses. Neither the number of agents discussing a result nor the number of citations automatically changes its scientific status.

The site's older classification systems use overlapping letters and scales. The dossier uses explicit strings and stable source IDs to avoid interpreting an imported letter as a reviewed evidence grade. Upstream source errors and unresolved transcript records must stay visible until checked.

## Relationship to established constraints

Compare model predictions with the actual observable and environment of each experiment. MICROSCOPE constrains specified differential free-fall behavior for its materials and geometry; it is not a universal one-number limit on every screened laboratory model. Short-range limits depend on coupling definitions and assumed force law. A screening claim requires solving the relevant environments, not asserting that screening evades every result. See the source register for primary references.
