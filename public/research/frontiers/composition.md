# Can composition break a force-model degeneracy?

F03 · Proposed investigation · 2026-09-13

AI-assisted research design; not peer reviewed. No new experimental result.

## Research question
Would a material-dependent response distinguish an extra interaction from a rescaling of Newton’s constant or a positioning error? This proposal connects laboratory geometry to equivalence-principle measurements through an explicit charge model.

## Parameterization
Define the dimensionless Eötvös parameter using consistently oriented acceleration components,

$$\eta_{AB}=\frac{2(a_A-a_B)}{a_A+a_B}.$$

For illustration, let an additional point-source force have material factors $q_A,q_B,q_S$ and coupling $\alpha$. At first order in a small correction,

$$\eta_{AB}\simeq\alpha q_S(q_A-q_B)(1+r/\lambda)e^{-r/\lambda}.$$

This is a phenomenological model, not a derived particle theory. Define the charges—such as a normalized composition-dependent quantity—before fitting. Extended Earth and laboratory sources need volume integration. A source-independent offset, a universal coupling and a composition-dependent coupling are different hypotheses.

## Experimental design
Use at least two probe compositions, matched exterior geometry and independently measured mass. Alternate their positions to separate material from location. Then change the source composition while measuring its density distribution. Control magnetic susceptibility, surface work function, charge, patch potentials, thermal expansion and suspension response. Identical shape does not imply identical electromagnetic behavior.

Specify a blocked design with material, position and time as independent factors. Predefine exclusions from instrument diagnostics. Estimate a covariance matrix rather than treating every repeated observation as independent. Reserve full runs for out-of-sample checks; randomly splitting adjacent time samples risks leaking drift into validation.

## Inference and falsification
Fit a common geometry model with separate material factors. Test whether the proposed composition term improves held-out prediction after nuisance parameters and covariance are included. Inject known signals to test bias and interval coverage. If a learned likelihood is used, first demonstrate agreement with an ordinary Gaussian benchmark and explicitly test simulator mismatch.

MICROSCOPE’s titanium/platinum result is a strong composition-dependent constraint. It does not automatically exclude every finite-range force or every coupling: the source, range, charge assignment and screening regime must match. Conversely, it must not be ignored when those assumptions do match.

## Deliverable
Produce a material-response matrix, calibration records, charge definitions, translated external constraints and a preregistered analysis. Reject a claimed new force if it follows swapped locations rather than composition, or if its inferred parameter point contradicts an applicable established constraint. No experiment has been executed for this dossier.

## Sources

- [AG-019: MICROSCOPE equivalence principle](https://doi.org/10.1103/PhysRevLett.129.121102)
- [SRC-077: New Test of the Gravitational 1/r² Law at Separations down to 52 μm](https://arxiv.org/abs/2002.11761)
- [SRC-083: Testing sub-gravitational forces on atoms from a miniature, in-vacuum source mass](https://arxiv.org/abs/1612.05171)
- [SRC-092: MadMiner: Machine learning-based inference for particle physics](https://arxiv.org/abs/1907.10621)
