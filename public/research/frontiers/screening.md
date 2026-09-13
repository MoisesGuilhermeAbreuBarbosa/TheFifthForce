# Does the environment change a hypothetical scalar force?

F02 · Proposed investigation · 2026-09-13

AI-assisted research design; not peer reviewed. No new experimental result.

## Research question
Can a source–chamber–probe model predict a reproducible environmental signature that a constant-coupling Yukawa model cannot? Chameleon and symmetron models already exist in the literature. The project contribution proposed here is a shared apparatus benchmark and a controlled comparison between them.

## Coupled field problem
In natural units with $c=\hbar=1$, a quasistatic, nonrelativistic scalar satisfies

$$\nabla^2\phi=\frac{\partial V_{\rm eff}}{\partial\phi},\qquad V_{\rm eff}(\phi,\rho)=V(\phi)+\rho A(\phi).$$

A chameleon benchmark uses $V=\Lambda^{4+n}/\phi^n$ with $n>0$, $\phi>0$, and $A\simeq1+\beta\phi/M_{\rm Pl}$ in the small-coupling expansion. A symmetron benchmark uses

$$V_{\rm eff}=\frac12\left(\frac{\rho}{M_s^2}-\mu^2\right)\phi^2+\frac{g_s}{4}\phi^4,\qquad g_s>0.$$

The unscreened point-probe acceleration is $\mathbf a_\phi=-\nabla\ln A$. Extended screened probes require their own field response. Do not confuse the coupling scale $M_s$ with a source mass. Convert natural-unit predictions to SI before comparing measured accelerations.

## Proposed investigation
Build a finite chamber model including source, walls and residual gas. Start with a one-dimensional analytic limit, then advance to a two-dimensional axisymmetric geometry where justified. Vary gas density and wall thickness independently in simulation. Search for a change in the *scalar component*, while keeping the ordinary gravitational field in the forward model.

For any physical experiment, use equal-temperature reference runs, monitored charge and magnetic fields, matched mechanical configurations, and a density scan that records gas damping and refractive-index effects. Moving a wall also changes its Newtonian field: this is a modeled background, not evidence of shielding.

## Numerical acceptance
A publishable solver must state boundary conditions, domain extent, mesh, units and branch selection. Demonstrate convergence of the predicted force, not just a low equation residual. Compare with the linear limit and an independent discretization. A static solution does not establish dynamical stability; the perturbation operator and boundary spectrum remain a separate requirement.

## Falsification and next decision
The candidate fails if the environmental response follows charge, temperature or damping controls, or if the same parameter point fails published constraints after translating their assumptions. A null result constrains only the tested model, geometry and range. The next useful deliverable is a benchmark with reproducible units and boundary conditions, followed by a likelihood fit—not an engineering claim of gravity control.

## Sources

- [SRC-078: Atom-interferometry constraints on dark energy](https://arxiv.org/abs/1502.03888)
- [SRC-079: Search for Screened Interactions Associated with Dark Energy Below the 100 μm Length Scale](https://arxiv.org/abs/1604.04908)
- [SRC-080: Chameleon Fields: Awaiting Surprises for Tests of Gravity in Space](https://arxiv.org/abs/astro-ph/0309300)
- [SRC-081: Chameleon Cosmology](https://arxiv.org/abs/astro-ph/0309411)
- [SRC-082: Symmetron Fields: Screening Long-Range Forces Through Local Symmetry Restoration](https://arxiv.org/abs/1001.4525)
- [SRC-084: Experiment to detect dark energy forces using atom interferometry](https://arxiv.org/abs/1812.08244)
