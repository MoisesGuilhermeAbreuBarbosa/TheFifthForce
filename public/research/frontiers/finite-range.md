# Can geometry reveal a finite-range force?

F01 · Proposed investigation · 2026-09-13

AI-assisted research design; not peer reviewed. No new experimental result.

## Research question
Can a jointly fitted separation scan and source-reversal measurement distinguish a finite-range interaction from apparatus geometry? This is a proposed extension to the existing Panda analysis, not a new detection or a claimed novel fundamental interaction.

## Model and measurable prediction
For ideal point masses, adopt the conventional Yukawa parameterization

$$
V(r)=-\frac{GMm}{r}\left(1+\alpha e^{-r/\lambda}\right),\qquad F_r=-\frac{GMm}{r^2}\left[1+\alpha(1+r/\lambda)e^{-r/\lambda}\right].
$$

Here $G$ is Newton’s constant, $M,m$ are masses, $r>0$ is center separation, $\alpha$ is a signed relative coupling and $\lambda>0$ is an interaction range. Negative $\alpha$ means a repulsive *correction*; the total force need not be repulsive. The browser explorer implements this point-mass expression only.

For a real source, replace the point potential by

$$
\Phi(\mathbf x)=-G\int d^3x'\,\frac{\rho(\mathbf x')}{|\mathbf x-\mathbf x'|}\left[1+\alpha e^{-|\mathbf x-\mathbf x'|/\lambda}\right],\qquad \mathbf a=-\nabla\Phi.
$$

Average the response over the measured atomic cloud or probe volume. The proposed discriminant is the complete separation-dependent response, including reversal sign and phase, not a single nonzero residual.

## Test protocol
1. Reproduce the original Newtonian result without changing deposited rows. Keep the unresolved 553/552 discrepancy visible.
2. Recover source dimensions, probe coordinates, their covariance and acquisition timestamps. Mark assumed quantities explicitly.
3. Predefine separations spanning the range of interest and alternate source configurations. Randomize acquisition order to reduce time-drift confounding.
4. Fit $y_i=a_N(r_i,\theta)+\alpha a_Y(r_i,\lambda,\theta)+b_i$ with geometry and environmental nuisance parameters $\theta$.
5. Test recovery of injected signals and the coverage of intervals on synthetic data before opening a held-out measurement set.

## Decision rule and stopping condition
At fixed range, compare the null and alternative using the same nuisance model. Calibrate a scan-wide significance threshold with null simulations; a pointwise interval is not a global detection criterion. A candidate must survive geometry perturbations, reversals and independent replication. If the model cannot distinguish position error from coupling, report non-identifiability and the additional metrology needed.

## Deliverables and limits
Publish original-data checksums, geometry files, integration convergence, injection fixtures, residuals and confidence construction. A simplified transfer curve is not an Eöt-Wash exclusion plot. The Lee experiment supplies a relevant measured constraint, while the atom and millimetre-mass experiments motivate complementary geometries; their results cannot be combined by overlaying unrelated force numbers.

## Sources

- [SRC-077: New Test of the Gravitational 1/r² Law at Separations down to 52 μm](https://arxiv.org/abs/2002.11761)
- [SRC-083: Testing sub-gravitational forces on atoms from a miniature, in-vacuum source mass](https://arxiv.org/abs/1612.05171)
- [SRC-085: Measurement of gravitational coupling between millimetre-sized masses](https://www.nature.com/articles/s41586-021-03250-7)
- [SRC-051: Lattice atom interferometer gravitational attraction](https://www.nature.com/articles/s41586-024-07561-3)
