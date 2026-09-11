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
