# Coherence and Force Discrimination — Complete Research Dossier

Revision 1.0 · 11 September 2026

Research proposals and mathematical benchmarks. No new physical detection.


---

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


---

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


---

# CFD-H1: Coherence threshold for conditional response

**Status: mathematical prediction and executable benchmark.** The source-superposition/postselection direction is motivated by Saldanha, Marletto and Vedral [S1]. The explicit coefficients and finite Gaussian benchmark below are a project derivation; no experimental observation or literature-priority claim is made.

## 1. Falsifiable proposition

For the specified two-branch source and Gaussian probe, the selected mean impulse reverses sign only when the product of coherence, phase alignment, and probe overlap exceeds a calculable threshold. The complementary outcomes preserve the unconditional attractive mean.

This is more specific than an arbitrary positive residual: it predicts the sign boundary, outcome probabilities, conditional means, finite-strength corrections, and loss of the effect under dephasing.

## 2. State preparation

Use orthogonal localized source branches $|L\rangle,|R\rangle$ with equal populations and real nonnegative coherence parameter $\eta$:

$$
\rho_S=\frac12\begin{pmatrix}1&\eta\\\eta&1\end{pmatrix},
\quad 0\le\eta\le1,\qquad
\hat A_g=\begin{pmatrix}-a&0\\0&-2a\end{pmatrix},\quad a>0.
$$

Both accelerations point toward the source; this can represent two source distances on the same side of the probe. It does not require either branch to have negative gravitational mass. The unconditional branch mean is $a_{\rm mix}=-3a/2$.

Choose the orthonormal measurement basis

$$
|f\rangle=0.8|L\rangle-0.6|R\rangle,
\qquad |\bar f\rangle=0.6|L\rangle+0.8|R\rangle.
$$

Both vectors have unit norm and their inner product is zero. The two outcomes form a complete measurement, so rejected outcomes can be accounted for without a missing probability channel.

## 3. Weak-limit derivation

Let $\Pi_f=|f\rangle\langle f|$. For the real, initially uncorrelated Gaussian pointer and weak momentum-kick coupling defined in the conventions chapter,

$$
p_f=\operatorname{Tr}(\Pi_f\rho_S)=0.50-0.48\eta,
$$

$$
\operatorname{Re}\operatorname{Tr}(\Pi_f\hat A_g\rho_S)
=a(-0.68+0.72\eta).
$$

Consequently

$$
\boxed{\frac{a_f}{a}=\frac{-0.68+0.72\eta}{0.50-0.48\eta}}.
$$

The denominator is positive throughout the allowed interval. Thus $a_f>0$ exactly when $\eta>17/18$. For the complementary outcome,

$$
p_{\bar f}=0.50+0.48\eta,\qquad
\frac{a_{\bar f}}a=\frac{-0.82-0.72\eta}{0.50+0.48\eta}.
$$

The probability-weighted sum is $-1.5a$ for every $\eta$.

| Coherence | Selected probability | Selected response / a | Complementary response / a |
|---:|---:|---:|---:|
| 0 | 0.500 | −1.360000 | −1.640000 |
| 0.90 | 0.068 | −0.470588 | −1.575107 |
| 0.95 | 0.044 | +0.090909 | −1.573222 |
| 1 | 0.020 | +2.000000 | −1.571429 |

## 4. Finite Gaussian impulse model

The weak approximation must not be extrapolated to arbitrary kicks. Define dimensionless probe momentum $q=p/\sigma_p$, initial unit-variance Gaussian momentum density, and

$$
\kappa=\frac{maT}{\sigma_p},\quad d_L=-\kappa,\quad d_R=-2\kappa,
\quad \psi_j(q)=(2\pi)^{-1/4}\exp[-(q-d_j)^2/4].
$$

The branch overlap is

$$
s=\int\psi_L\psi_R\,dq=\exp(-\kappa^2/8).
$$

Let $\varphi$ be the residual relative phase, including preparation, evolution, and measurement phases. Define $c=\eta\cos\varphi$ and $v=cs$. The unnormalized selected density is

$$
P_f(q)=0.32\psi_L^2+0.18\psi_R^2-0.48c\psi_L\psi_R.
$$

The complementary density is

$$
P_{\bar f}(q)=0.18\psi_L^2+0.32\psi_R^2+0.48c\psi_L\psi_R.
$$

Their sum is the equally weighted mixture of the branch densities. Gaussian integration gives exact results within this prescribed-impulse model:

$$
p_f=0.50-0.48v,\qquad
\frac{\langle q\rangle_f}{\kappa}
=\frac{-0.68+0.72v}{0.50-0.48v},
$$

$$
p_{\bar f}=0.50+0.48v,\qquad
\frac{\langle q\rangle_{\bar f}}{\kappa}
=\frac{-0.82-0.72v}{0.50+0.48v}.
$$

The apparent acceleration ratio means the observed mean impulse divided by $mTa$, not an independently measured continuously acting repulsive field. At $\kappa=0$ the ratio is a continuous limiting coefficient; all actual impulses are zero.

The finite-strength sign condition is

$$
\boxed{\eta\cos\varphi\,e^{-\kappa^2/8}>17/18.}
$$

Even perfect coherence and phase cannot give a positive selected mean when $\kappa\ge\sqrt{8\ln(18/17)}$. Stronger interactions can therefore destroy this particular conditional reversal by reducing branch overlap. This is a parameter-specific prediction, not a universal bound on postselection experiments.

## 5. Variance and detected events

Let $\bar d=(d_L+d_R)/2$. The unnormalized selected second moment is

$$
B_f=0.32(1+d_L^2)+0.18(1+d_R^2)-0.48v(1+\bar d^2).
$$

Then $\operatorname{Var}(q|f)=B_f/p_f-\langle q\rangle_f^2$. With $N$ independent preparations and overall detection efficiency $\epsilon_d$, the expected number of selected detections is $N\epsilon_dp_f$. An approximate standard error is $\sigma_p\sqrt{\operatorname{Var}(q|f)/(N\epsilon_dp_f)}$ when enough detections are available. This ignores drift, uncertain coherence, and selection-dependent detection losses; those must enter a real likelihood.

Large conditional shifts must be evaluated against the lost trials and full preparation time. The weak-value metrology literature discusses why amplification does not generally imply greater information per resource [S2, S3].

## 6. Experimental protocol

1. Independently calibrate source branch populations, branch separation, probe width, detection efficiency, and acceleration sign.
2. Measure coherence and phase in reference sequences. Do not infer coherence solely from the anomalous-response fit being tested.
3. Acquire randomized coherence and phase settings, including $\eta\approx0$, phase reversal, and source-absent controls.
4. Store both outcome labels and full probe distributions, including no-detection events and rejected shots with reasons.
5. Compare joint outcome probabilities and distributions with the finite model, not just selected means.
6. Challenge electromagnetic, surface-force, trapping, selection-bias, and preparation-recoil alternatives.
7. Freeze the final test region, exposure, and analysis before unblinding. Replicate any physical signature independently.

An optical or electrostatic analogue could validate interference mathematics and readout, but would not establish a gravitational interaction.

## 7. Assumptions and falsification

Fixed orthogonal source branches, prescribed constant impulses, a real Gaussian input, a phase described by one relative angle, and no unmodeled outcome-dependent detection are assumed. Source recoil, wavepacket spreading, three-dimensional geometry, environmental memory, and control fields are not solved. A full Hamiltonian/open-system implementation is required for experimental feasibility.

Disagreement with the threshold curve challenges this specified model after calibration uncertainties are included. Persistence under complete decoherence challenges the coherence explanation. Agreement alone does not identify gravity: ordinary quantum forces can obey the same mathematics. Gravity specificity requires measured mass/distance behavior and stringent background exclusion.

## 8. Reproduction and next work

Run `python3 scripts/verify-research-dossier.py` from the repository root. The verifier compares analytic moments with independently integrated probability densities, checks normalization and unconditional means, checks the weak limit and threshold, and recalculates the existing Panda summary. Stored numerical fixtures are mathematical benchmarks, not sensor observations.

Next: derive the source/probe/control Hamiltonian; include decoherence channels with calibrated rates; solve finite packets and source recoil; forecast resource requirements; validate any physical analogue; only then assess a gravitational implementation. Do not interpret this benchmark as a hardware feasibility demonstration.


---

# CFD-H2: Finite-range force and geometry identifiability

**Status: proposed experimental design and inference framework.** The current Panda reanalysis supplies an amplitude likelihood, not independently identified strength and range. This chapter specifies the additional information required.

## 1. Proposition

A predeclared set of independently surveyed source configurations can produce distinguishable responses for a Yukawa correction, Newtonian geometry error, and calibrated environmental disturbances. The scientific deliverable is a forecast and then a held-out prediction, not simply a lower residual sum of squares.

## 2. Forward model

For source density $\rho_S(\mathbf x';\mathbf g_i)$ in configuration $i$, define the potential per unit probe mass

$$
\Phi_Y(\mathbf x)=-G\alpha\int d^3x'\,
\rho_S(\mathbf x';\mathbf g_i)
\frac{e^{-|\mathbf x-\mathbf x'|/\lambda}}{|\mathbf x-\mathbf x'|}.
$$

The field is $\mathbf a_Y=-\nabla\Phi_Y$. A point-source approximation requires validation against the full source and separation scales. Nonlinear screening is not represented by this linear convolution.

For an ideal three-pulse atom interferometer with acceleration along its sensitivity axis,

$$
\Phi_i=k_{\rm eff}\int_0^{2T}w(t)a_x[\mathbf r_i(t)]dt,
$$

where $w(t)=t$ for $0\le t\le T$ and $w(t)=2T-t$ afterward. Constant acceleration gives $\Phi_i=k_{\rm eff}aT^2$. Resolve finite-pulse response, cloud averaging, and separated-arm phase contributions when the approximation is insufficient. Include both sensing channels and every moved support or carriage mass.

After applying the actual experimental estimator, write

$$
\mathbf d=\mathbf a_N(\mathbf g)+\alpha\mathbf K(\lambda,\mathbf g)
+X\mathbf b+\boldsymbol\epsilon.
$$

K is the finite-source observable response per unit coupling, not an arbitrary fit shape. Geometry includes near and far positions, density distributions, probe trajectories, and covariance. A far-state signal negligible in the Newtonian model need not be negligible for every alternative interaction.

## 3. Correlated likelihood

With covariance C and independently determined Gaussian nuisance priors,

$$
-2\ln L=\mathbf r^TC^{-1}\mathbf r+\ln\det C
+(\mathbf g-\mathbf g_0)^T\Sigma_g^{-1}(\mathbf g-\mathbf g_0)
+(\mathbf b-\mathbf b_0)^T\Sigma_b^{-1}(\mathbf b-\mathbf b_0)+\mathrm{const}.
$$

Here $\mathbf r=\mathbf d-\mathbf a_N-\alpha\mathbf K-X\mathbf b$. Shared systematic offsets must not be added as independent per-shot noise. If C is fixed, its determinant is constant for parameter estimation; if C is fitted, retain it. Priors must come from stated calibration or explicit scientific assumptions, not from the desired detection.

## 4. Why more rows do not solve everything

For one effective mean $A=\alpha K(\lambda)$, the data-only sensitivity to $(\alpha,\lambda)$ is one row, so its information rank is at most one. Thousands of repeated measurements improve that amplitude but do not manufacture a second parameter direction.

For several configurations form the whitened sensitivity matrix $C^{-1/2}J$, with $J_{ij}=\partial\mu_i/\partial\theta_j$. Inspect singular values after sensible dimensionless parameter scaling. Near-dependent columns indicate degeneracy. The smallest singular value depends on units unless this scaling is defined.

For nuisance vector $\nu$, local information about physics parameters after nuisance adjustment is the Schur complement

$$
F_{\rm phys,eff}=F_{\theta\theta}
-F_{\theta\nu}F_{\nu\nu}^{-1}F_{\nu\theta},
$$

when the inverse exists and the local Gaussian approximation applies. Report data-only and prior-assisted information separately; strong priors can otherwise hide weak experimental identifiability.

At $\alpha=0$, $\partial\mu/\partial\lambda=0$: the range is undefined under the null. Use pipeline-level null simulations or an appropriate boundary-aware method when searching over range. Do not quote a regular two-parameter Gaussian ellipse as a universal solution.

## 5. Proposed design campaign

Choose several distances spanning the candidate ranges, more than one source shape or independently characterized mass distribution, both source sides where possible, reference-channel locations, and parked/sham configurations. The exact distances must follow feasibility and a model forecast; no particular laboratory coordinates are asserted here.

1. Recover metrology and covariance before fitting new physics.
2. Build the Newtonian finite-volume calculation and reproduce analytic limits.
3. Compute K for each source state and candidate range.
4. Propagate position, density, and cloud uncertainties jointly.
5. Optimize configurations for separation from nuisance directions.
6. Inject known synthetic corrections and geometry errors into blind challenges.
7. Freeze training/calibration configurations; hold out at least one independently useful geometry.
8. Publish predictions and intervals for the held-out geometry before opening its data.

Two or three distances alone are not guaranteed to identify an interaction when extra nuisance parameters are introduced. The design must demonstrate this numerically.

## 6. Falsification and useful null outcomes

A candidate is weakened if admissible metrology explains it, if parameters differ across source configurations, if predictions fail the held-out geometry, or if a disturbance model predicts the observations better. A null result yields a sensitivity-limited constraint with all model assumptions attached. If metrology dominates, the next experiment may be a geometry calibration rather than more force measurements.

The existing reanalysis reports a 37.20 nm/s² nominal benchmark versus a 35.2 nm/s² published prediction and then normalizes the range dependence. That is a conditional surrogate; this dossier does not turn it into recovered apparatus metrology. The three wavepacket group summaries are not independent replacements for their parent measurements.

## 7. Website and data requirements

The future interface should accept versioned geometry, observation tables, covariance, detector response, and nuisance priors. Display residuals, posterior/profile slices, data-only information rank, and prior sensitivity. Export all sampled parameter points, failed fits, units, code revision, and input hashes. Label forecasts, public-data reanalyses, and new sensor observations separately.

A source drawing upload alone is insufficient. Require coordinate conventions, dimension uncertainties, density/material assumptions, trajectory information, and which parts move. Provide a schema error instead of silently assuming omitted quantities are zero.

## 8. Acceptance gates

- Recover analytic Newtonian and long-range limits within a declared numerical tolerance.
- Demonstrate mesh/domain convergence in the predicted observable, not just solver residual.
- Recover blinded injected signals with calibrated interval coverage.
- Avoid false detections when the challenge contains only geometry error or correlated noise.
- Predict held-out configurations without retuning the model.
- Compare with experiment-specific existing bounds using the same coupling convention [S4–S6].

No new joint dataset or global exclusion plot is claimed in this release.


---

# CFD-H3: Environment and composition in a screened vector model

**Status: speculative physical hypothesis.** No stable detectable apparatus parameter set is established. Nelson and Walsh provide the primary screened-vector motivation [S7]; the project extension is a multi-configuration discriminating test.

## 1. Proposition and sign

One specified vector/scalar model could predict an additional interaction whose measured pattern depends jointly on source distance, surrounding matter, and source/probe charge-to-mass ratios. The same model parameters must explain every configuration and relevant external constraint.

In a canonical linear limit, natural units give

$$
V_X(r)=\frac{g_X^2Q_SQ_P}{4\pi r}e^{-m_Vr}.
$$

Like-sign charges produce repulsion. Charge is a model-defined conserved quantity, not automatically mass. A B−L example must use the appropriate composition-dependent charge, including the neutral atom's proton/electron cancellation. State the charge definition rather than assuming all materials have the same Q/M.

Mapping the unscreened two-body interaction to the dossier Yukawa convention gives

$$
\alpha=-\frac{g_X^2Q_SQ_P}{4\pi G M m},\qquad \lambda=m_V^{-1}
$$

in mutually consistent natural units. This formula does not justify an additional screening-factor multiplication after a fully nonlinear source has already been resolved.

## 2. Coupled static benchmark

The repository summarizes the Nelson–Walsh static system using scalar amplitude f, scalar charge q, gauge coupling g, charge density n, scalar mass parameter $m_s$, scalar self-coupling $\epsilon$, and electrochemical variable $\omega$:

$$
\nabla^2f=(m_s^2+\epsilon f^2-q^2\omega^2)f,
$$

$$
\nabla^2\omega=-g^2n+2q^2g^2\omega f^2,
\qquad m_V^2(\mathbf x)=2q^2g^2f^2(\mathbf x).
$$

These equations require the action, normalization conventions, charge sector, and boundary conditions to be fixed before physical use. A position-dependent mass is an output of the field solution. Replacing it by an arbitrarily chosen constant or adding a controller-dependent mass changes the model.

## 3. What an environmental intervention means

Define two real configurations E1 and E2 of surrounding matter, each with measured geometry, material composition, source state, and detector conditions. Their full density and charge maps enter the solver. Environmental changes may also alter Newtonian fields, patch potentials, thermal gradients, magnetic fields, mechanical stress, and vacuum behavior.

After predicting/subtracting the documented conventional terms, an informative observable is

$$
\mathcal D=(d_{\rm near}-d_{\rm far})_{E1}
-(d_{\rm near}-d_{\rm far})_{E2}.
$$

The subtraction rejects only components common to the paired states. It is not automatically free of ordinary forces. Equal total mass does not guarantee equal gravitational multipoles or equal local fields.

Composition changes add another test. Calibrate changed susceptibilities and surface properties independently; a material-dependent force is not automatically a new gauge interaction. Pressure scans similarly change ordinary damping and thermal transfer and cannot uniquely diagnose screening.

## 4. Required apparatus inputs

| Input | Required detail | Consequence if absent |
|---|---|---|
| Source and probe | Positions, shape, density, composition, uncertainty | Force prediction underdetermined |
| Chamber and surroundings | Walls, openings, supports, nearby matter, gas | Screening environment unknown |
| Charge sector | Coupled conserved charge and scalar occupation assumptions | Wrong branch or source equation possible |
| Exterior | Domain size and physical asymptotic state | Artificial boundary response possible |
| Control states | What physically changes and how it couples in the action | No defined controller prediction |
| Detector | Trajectories, response, finite cloud, covariance | Field cannot be compared directly to measurement |

When any of these inputs is assumed, label it as an illustrative benchmark and propagate sensitivity to it.

## 5. Numerical sequence

Convert units; build each configuration's material/charge map; select a physical branch through continuation or other justified conditions; solve the coupled boundary problem; compute the observable; compare limiting cases; refine mesh; enlarge domain; propagate metrology; and compare all configurations using one parameter set. Save failed solutions and branch choices.

A small nonlinear residual is necessary but insufficient. Check the observable's numerical error, boundary dependence, branch multiplicity, and physical validity. A claimed new source response should exceed numerical error by a declared margin and remain under independently varied resolution.

## 6. Dynamical stability is a separate problem

The existing constant-mass Proca dispersion $\Omega^2=c^2(k^2+\lambda^{-2})$ checks a homogeneous healthy vector benchmark. It does not determine stability of an inhomogeneous scalar–vector configuration.

The dynamical problem must retain amplitude, phase, spatial-vector perturbations, Gauss constraints, and consistent gauge treatment. Even a scalar on a prescribed electrostatic background can lead to a quadratic frequency problem containing both $2\Omega V$ and $-\Omega^2$ terms. A positive static radial Hessian alone is not a full mode-spectrum proof.

The archived `screened_vector_check.py` is explicitly a dimensionless diagnostic. Its controller profile is not an experimentally characterized actuator. Do not relabel its eigenvalues as a completed physical spectrum or build authorization.

## 7. Compatibility and falsification

Translate each external experiment into this model's actual predicted observable and screening environment. Attach the material, range, geometry, and likelihood assumptions to each comparison. Existing equivalence-principle and short-range tests may rule out parameter points; screening cannot be asserted as an unrestricted escape [S5, S6].

Reject or revise a benchmark if it has no physical stable branch, fails convergence, contradicts relevant constraints, requires a different free coupling per configuration, or fails a held-out environment/composition prediction. If no viable measurable region survives, publish that result and redirect resources.

## 8. Development deliverables

The future solver package needs a documented action and units; validated density-map inputs; branch solver; constrained perturbation analysis; observable integrator; parameter/constraint comparison; and independent implementation check. The website should expose solver status and omitted physics beside each plot. An arbitrary range slider remains an educational linear model until these requirements are met.

This branch targets a possible additional interaction. It does not yet specify Earth-gravity shielding, passive gravitational-mass reversal, or propulsion. Each of those would require its own operational model and experimental campaign.


---

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


---

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


---

# Sources, attribution, and review limits

## Primary-source register

The sources below motivate or constrain the research. They do not validate a gravity-control device. The project-specific coherence coefficients, finite Gaussian derivation, experiment combinations, and implementation contracts are newly assembled research work, not quotations from these publications.

| ID | Source | Role in this dossier | Verification scope |
|---|---|---|---|
| S1 | Saldanha, Marletto, Vedral, *Repulsive Gravitational Force as a Witness of the Quantum Nature of Gravity*, arXiv:2602.12266 | Source superposition and postselection motivation | Abstract and accessible paper HTML consulted during review; proposal, not measured gravity repulsion |
| S2 | Ferrie and Combes, *Weak value amplification is suboptimal for estimation and detection*, arXiv:1307.4016 | Resource-aware metrology caution | Abstract consulted; conclusions depend on statistical assumptions |
| S3 | Knee, Combes, Ferrie, Gauger, *Weak-value amplification: state of play*, arXiv:1410.6252 | Context on amplification and metrology | Abstract consulted; not a universal verdict on every technical-noise regime |
| S4 | Panda et al., *Measuring gravitational attraction with a lattice atom interferometer*, Nature (2024), DOI 10.1038/s41586-024-07561-3 | Real experimental baseline | Existing project manuscript analysis and released CSVs; no new apparatus access |
| S5 | Lee et al., *New Test of the Gravitational 1/r² Law at Separations down to 52 μm*, arXiv:2002.11761 | Short-range force constraints | Primary abstract/record consulted; original torque data not recovered here |
| S6 | Touboul et al., *MICROSCOPE mission: final results of the test of the Equivalence Principle*, arXiv:2209.15487 | Composition-dependent acceleration constraints | Primary abstract consulted; model/environment matching still required |
| S7 | Nelson and Walsh, *Chameleon Vector Bosons*, arXiv:0802.0762 | Environment-dependent vector screening | Primary abstract plus project equation summary; no new full stability calculation |
| S8 | Brassard, Høyer, Mosca, Tapp, *Quantum Amplitude Amplification and Estimation*, arXiv:quant-ph/0005055 | Algorithmic basis for a candidate computational primitive | Abstract and bibliographic record consulted; no resource theorem applied to this apparatus |

## Direct links

- [S1 — quantum conditional-force proposal](https://arxiv.org/abs/2602.12266)
- [S2 — estimation and postselection](https://arxiv.org/abs/1307.4016)
- [S3 — weak-value metrology review](https://arxiv.org/abs/1410.6252)
- [S4 — Panda publication](https://doi.org/10.1038/s41586-024-07561-3)
- [S4-D — released Panda data, DOI 10.5281/zenodo.10995225](https://doi.org/10.5281/zenodo.10995225)
- [S4-M — accepted manuscript with methods](https://par.nsf.gov/servlets/purl/10525888)
- [S5 — inverse-square-law experiment](https://arxiv.org/abs/2002.11761)
- [S6 — MICROSCOPE final results](https://arxiv.org/abs/2209.15487)
- [S7 — screened vector theory](https://arxiv.org/abs/0802.0762)
- [S8 — amplitude amplification and estimation](https://arxiv.org/abs/quant-ph/0005055)

## Local source review

The review baseline was repository commit `10ce081c66973759a62ea21977459684eb65b4eb`, which matched `main` and `restore/interactive-app` when inspected. Sources included the current reanalysis, archived physics and engineering drafts, Wiki research/roadmap/provenance pages, QAGRA mathematical and architecture documents, literature register, atlas questions, video notes, and relevant browser/Python implementation.

The review did not independently read every externally linked publication in full. Native Wiki edits outside repository history, unexported previous databases, and production-only contributions may differ. No complete Vercel deployment verification or video viewing was inferred from repository access.

## Reanalysis provenance

The principal CSV file checksum is MD5 `df578555b01f75b3373d42d5336b8190`. It contains 553 numeric rows. Recalculation gives weighted mean 33.096184655936035 nm/s², chi-squared 587.0212109153017 for 552 degrees of freedom, scaled statistical uncertainty 5.610010301823207 nm/s², and total extra-force uncertainty 6.288705398296418 nm/s² with the existing shared-nuisance assumptions.

The accompanying histogram and three group summaries are related products, not extra independent observations to concatenate with the primary blocks. Preserve the published data credit and CC BY 4.0 attribution described in the original reanalysis. Numerical benchmark fixtures added here contain synthetic/analytic outputs and are labeled separately.

## Video evidence conflict

The four-entry retrieval-status file reports unverified transcripts. Three separate transcript-summary records point to secondary transcripts or primary-paper verification paths. These are not equivalent statuses. This release records the inconsistency and does not silently claim that full speech, quotations, or timestamps have been verified.

Future reconciliation should record video ID, source type, retrieval date, language, whether full text exists, whether speech was checked, whether text can be redistributed, and a claim-level source path. A paper linked by a video can support a scientific discussion without proving that the video said a particular sentence.

## Corrections and interpretation

Archived early drafts contain ideas later narrowed by the engineering discussion and real-data reanalysis. Later limitations take precedence where explicitly stated. Keep their historical identity rather than merging incompatible claims into one apparently settled theory.

The dossier's hypothesis IDs identify proposals, not discoveries. A mathematical match validates the implemented equations under their assumptions. A successful independent code reproduction remains computational replication. Experimental replication requires independently acquired physical measurements.

The static research receipt included with the dossier records this review and contribution. It does not claim an automatic external-agent reporting service exists. Human/AI attention counts should never be used as scientific evidence weights.

## How to contribute a correction

Identify the chapter and hypothesis/source ID; state the disputed assertion; give a precise primary reference or reproducible calculation; distinguish the source's claim from your inference; include parameter and unit conventions; and describe how the correction changes predictions or implementation. Preserve both the old and revised versions in repository history.
