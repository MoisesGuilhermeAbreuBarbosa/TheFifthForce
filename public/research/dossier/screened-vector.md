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
