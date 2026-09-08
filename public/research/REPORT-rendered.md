# Finite-source fifth-force reanalysis using released experimental measurements

## Outcome and scope

An actual experimental-data fit was completed. It does not show an anomalous force. A finite-source Yukawa response was calculated and tested against that fit. A constant-mass vector dynamical-spectrum benchmark was evaluated. **This is not a completed nonlinear chameleon-vector apparatus simulation or a global exclusion analysis.** The available data do not identify that model's parameters or its controller response.

## Accessible data and provenance

The primary dataset is Panda et al., *Measuring gravitational attraction with a lattice atom interferometer*, Zenodo, DOI [10.5281/zenodo.10995225](https://doi.org/10.5281/zenodo.10995225), CC BY 4.0. Credit: Cristian D. Panda, Matthew J. Tao, Miguel Ceja, Justin Khoury, Guglielmo M. Tino, and Holger Muller. Three deposited files were downloaded unchanged; all three MD5 checksums match the repository metadata. Filenames were shortened locally. The deposited table is already processed acceleration data, not raw atom images or fringe measurements.

- [Data Fig 3a.csv](/data?file=fig3a): block accelerations and reported uncertainties, used for the main fit.
- [Data Fig 3b.csv](/data?file=fig3b): histogram, retained but not treated as independent measurements.
- [Data Fig 3d.csv](/data?file=fig3d): three wavepacket-separation group summaries, analyzed separately, not combined with their parent data.
- [Accepted manuscript with Methods](https://par.nsf.gov/servlets/purl/10525888); [journal publication](https://doi.org/10.1038/s41586-024-07561-3).

The Eot-Wash search found the [2020 article](https://doi.org/10.1103/PhysRevLett.124.101101), its [preprint](https://arxiv.org/abs/2002.11761), and [Lee's dissertation record](https://digital.lib.washington.edu/researchworks/items/971237d1-100a-41ae-9027-d1bbce8cf315/full). The requested 2020 supplemental torque tables were not retrieved: the APS supplement was marked subscription-required and the dissertation request returned 403. This is an access result, not proof no public copy exists. A [secondary Eot-Wash analysis repository](https://github.com/aditikrishak/EotWash_analysis) has residual data, but it was not substituted for the 2020 experiment's original torque dataset.

## 1. Reproducible experimental likelihood

All 553 numeric rows in Fig 3a are retained. The manuscript describes 552 blocks; the released CSV has no identifiers or exclusion flags with which to reconcile that difference. There is also a small central-value mismatch. Neither was repaired by deleting observations or introducing a fitted offset.

For independent reported uncertainties, define $w_i=\sigma_i^{-2}$ and fit a constant $\widehat\mu=\sum_i w_i y_i/\sum_i w_i$. Results computed here:

| Quantity | Result |
|---|---:|
| Number of rows | 553 |
| Weighted mean | 33.096185 nm/s² |
| Formal statistical standard error | 5.440093 nm/s² |
| Chi-squared / degrees of freedom | 587.021211 / 552 |
| Reduced chi-squared | 1.063444 |
| Goodness-of-fit p, before rescaling errors | 0.146290 |
| Error after multiplying by $\sqrt{\chi^2/\nu}$ | 5.610010 nm/s² |

The manuscript reports 33.3 nm/s², a 5.61 statistical uncertainty, a 2.66 systematic uncertainty, and a calculated Newtonian acceleration of 35.2 ± 1.0 nm/s². It also lists a 0.05 nm/s² systematic shift. Its sign/application in the deposited central values is not documented in the CSV; this reanalysis does not silently apply it. The ±0.05 ambiguity is small relative to the error, but does not explain the entire 0.204 central-value discrepancy. [Accepted manuscript](https://par.nsf.gov/servlets/purl/10525888).

For an additional switched acceleration $A$, use (all acceleration terms in $\mathrm{nm\,s^{-2}}$)

$$
\begin{aligned}
\chi^2(A,b,n)&=\sum_{i=1}^{553}\left[\frac{y_i-35.2-A-b-n}{s\sigma_i}\right]^2+\left(\frac{b}{2.66}\right)^2+\left(\frac{n}{1.0}\right)^2,\\
s&=\sqrt{\frac{587.021211}{552}}.
\end{aligned}\tag{1}
$$

Here $b$ and $n$ are shared systematic and Newtonian-prediction nuisance offsets. They must not be added independently to every block's variance. Profiling them gives

$$
\boxed{\widehat A=-2.103815\;\mathrm{nm\,s^{-2}},\qquad \sigma_A=6.288705\;\mathrm{nm\,s^{-2}}}
\qquad
\Delta\chi^2(A)=\frac{(A-\widehat A)^2}{\sigma_A^2}.\tag{2}
$$

The two-sided Gaussian 95% interval is [-14.429451, 10.221821] nm/s². Zero extra force is only 0.335 standard deviations from the best fit; Delta chi2 versus zero is 0.111916. The 95th percentile of the absolute value of this Gaussian is 12.985153 nm/s². This last number uses the folded-Gaussian convention; it is not a separate discovery threshold or a simultaneous multi-parameter confidence region. Gaussian nuisances and the absence of block covariance are explicit assumptions.

Leaving out one row at a time gives means between 32.0880 and 33.9821 nm/s²; no deletion is selected. The three Fig 3d group means give a weighted linear slope of 1.8048 ± 2.8380 (nm/s²)/µm, with chi-squared 1.1209 for one residual degree of freedom. This does not establish separation dependence. Group uncertainties were treated as independent for this diagnostic; an unpublished covariance could change that interpretation.

## 2. Finite-source field solution

Use the experimental cylinder dimensions: height 25.4 mm, outer radius 12.7 mm, inner radius 5.0 mm, and radial access-slot width 5.7 mm. The manuscript describes atom-position metrology but does not tabulate the numerical three-dimensional positions needed here. [Methods](https://par.nsf.gov/servlets/purl/10525888).

The benchmark therefore explicitly assumes symmetric on-axis probes at z=±14 mm, a radial slot through the full cylinder height, tungsten density 19,300 kg/m³, and negligible far-state signal. These are not recovered apparatus coordinates. The ±13 and ±15 mm cases are sensitivity checks, not a metrology posterior. The force is evaluated at the wavepacket center; no atomic-cloud or finite-wavepacket averaging is included.

For $V(r)=-Gm_1m_2[1+\alpha e^{-r/\lambda}]/r$, the exact static free-space field equation for the Yukawa potential per unit test mass is

$$
\left(\nabla^2-\lambda^{-2}\right)\Phi_Y=4\pi G\alpha\rho.\tag{3}
$$

Its Green-function solution is $\Phi_Y(\mathbf{x})=-G\alpha\int \rho(\mathbf{x}')e^{-|\mathbf{x}-\mathbf{x}'|/\lambda}|\mathbf{x}-\mathbf{x}'|^{-1}\,\mathrm{d}^3x'$. On the cylinder axis, integrate the source height analytically and the radial coordinate by adaptive quadrature. Define

$$
\begin{aligned}
d_\mp&=\sqrt{r^2+(z\mp L/2)^2},\\
\theta(r)&=2\pi-2\arcsin\!\left(\frac{w}{2r}\right),\\
K_{\mathrm{raw}}(\lambda,z)&=G\rho\int_{R_1}^{R_2}r\theta(r)\left[\frac{e^{-d_-/\lambda}}{d_-}-\frac{e^{-d_+/\lambda}}{d_+}\right]\,\mathrm{d}r.
\end{aligned}\tag{4}
$$

For z>0 this is the positive acceleration magnitude toward the source for alpha=1. The slot expression treats its missing azimuth exactly under the stated ideal geometry; no meshed edge approximation is needed. This is a finite-volume continuum solution, not a point-mass approximation. A negative alpha means a repulsive correction.

Checks: removing the slot reproduces the closed-form annular-cylinder Newtonian solution to better than 10^-9 nm/s². Changing quadrature relative tolerance from 10^-6 to 10^-10 leaves the displayed Newtonian result unchanged; this tests numerical integration, not geometry accuracy. The nominal slotted geometry gives 37.197691 nm/s², not 35.2. Thus it is **not an independent reproduction of the authors' full apparatus model**.

To obtain a conditional response, normalize the geometrical range dependence to the published Newtonian prediction:

$$
\begin{aligned}
K(\lambda)&=35.2\,\frac{K_{\mathrm{raw}}(\lambda,14\,\mathrm{mm})}{K_{\mathrm{raw}}(\infty,14\,\mathrm{mm})},\\
A&=\alpha K(\lambda).
\end{aligned}\tag{5}
$$

The normalization factor is 0.946295. It is a surrogate calibration, not a newly measured density or geometry correction. The fit uses the 1 nm/s² baseline uncertainty as an additive nuisance; uncertainty in K itself is not marginalized, so these are conditional intervals, not publication-quality exclusion limits.

| Range $\lambda$ | K, nm/s² per $\alpha$ | $\alpha$ best fit | Conditional 95% interval |
|---|---:|---:|---:|
| 1 mm | 0.036632 | -57.431 | [-393.903, 279.041] |
| 5 mm | 9.243285 | -0.22760 | [-1.56107, 1.10586] |
| 10 mm | 20.449128 | -0.10288 | [-0.70563, 0.49987] |
| 100 mm | 34.811428 | -0.06043 | [-0.41450, 0.29363] |
| Infinite range | 35.200000 | -0.05977 | [-0.40993, 0.29039] |

At 1 mm range, moving the assumed axial coordinate to 13 or 15 mm changes normalized response by +16.7% or -26.9%. At 10 mm range the changes are +1.67% and -2.43%. Metrology dominates numerical quadrature. The far-state cancellation is inherited from the published Newtonian analysis, not independently simulated for an arbitrary new interaction.

Only one effective force amplitude is constrained by the principal table. Scanning lambda does not create independent force-versus-distance measurements; alpha and lambda cannot both be identified from this mean. For a multi-parameter nonlinear model, the Fisher matrix from this one observable has rank at most one.

## 3. Dynamical spectrum: what was actually evaluated

A healthy constant-mass Proca field coupled to an externally prescribed conserved current has three physical polarizations with

$$
\boxed{\Omega^2=c^2\left(k^2+\lambda^{-2}\right).}\tag{6}
$$

For positive mass squared and the conventional kinetic sign these frequencies are real. The static source shifts the particular solution but does not change the linear fluctuation operator. This is the vector benchmark behind a repulsive Yukawa interaction, **not the inhomogeneous screened theory**.

As a numerical operator check, the scalar spatial operator common to homogeneous physical modes was discretized on a Dirichlet cube of side 0.1 m with lambda=0.01 m. The lowest eigenvalue is available exactly for the discrete Laplacian; no large matrix was unnecessarily assembled. The finite-grid lowest frequencies are:

| Interior points per axis | Frequency, GHz |
|---|---:|
| 16 | 5.430215188 |
| 32 | 5.431510759 |
| 64 | 5.431858465 |
| 128 | 5.431948575 |
| Continuum cube | 5.431979240 |

This verifies second-order convergence. The cube is an artificial spectral regulator, not a conducting chamber boundary for a new vector field. The physical free-space spectrum is continuous and has threshold c/(2 pi lambda)=4.771 GHz for lambda=1 cm. This calculation establishes neither chamber resonances nor scalar-vector stability. A massive field's high free-particle frequency does not prevent a slowly varying, quasistatic forced response.

## 4. Why this does not yet solve the nonlinear theory

For the [Nelson-Walsh chameleon-vector model](https://arxiv.org/abs/0802.0762), in natural units, with scalar amplitude f, scalar charge q, coupling g, scalar mass squared m_s² and quartic epsilon,

$$
\begin{aligned}
\nabla^2 f&=\left(m_s^2+\epsilon f^2-q^2\omega^2\right)f,\\
\nabla^2\omega&=-g^2n+2q^2g^2\omega f^2,\\
m_V^2(\mathbf{x})&=2q^2g^2 f^2(\mathbf{x}).
\end{aligned}\tag{7}
$$

Replacing m_V(x) by a fitted constant changes the model. Adding a controller-dependent mass without a controller action is also not a physical implementation. The apparatus switches a source position; it does not switch an independently characterized screening controller.

Even on the uncondensed f=0 branch, scalar dynamics in an electrostatic background are a quadratic frequency eigenproblem. For a convention $D_t=\partial_t+iV$ and $V=qgB_0$,

$$
\left[-\nabla^2+m_s^2-V^2+2\Omega V-\Omega^2\right]u=0.\tag{8}
$$

The charge-conjugate sector has $V\rightarrow -V$. This illustrates precisely why the static operator -Laplacian+m_s²-V² alone is not the dynamical spectrum. On a condensed inhomogeneous branch one must retain scalar amplitude, phase, spatial-vector perturbations, and the Gauss constraint, with a consistent gauge and exterior conditions. None of those missing spectra is claimed to have been computed here.

To make the nonlinear fit identifiable requires: numerical source/probe coordinates and covariance; chamber, supports and environmental charge/density model; a specified controller action and measured states if a controller is intended; scalar charge-sector and asymptotic conditions; and additional independent geometry/composition/control measurements. For rigorous comparison with other experiments their screening environments must also be solved, rather than applying unscreened Yukawa limits indiscriminately.

## Conclusion

The real data support ordinary attraction and provide an approximately 13 nm/s² folded-Gaussian extra-force scale under the stated assumptions. They do not establish anti-gravity, a detected repulsive correction, or a stable detectable screened-controller parameter set consistent with all experiments. The completed work resolves the lack of a real likelihood and supplies a checked finite-source benchmark. It exposes, rather than hides, the geometry and identifiability gaps blocking the nonlinear claim.

## Reproduction

Run `python reanalyse.py` in this directory with NumPy and SciPy installed. The script verifies the original CSV hashes, executes the fits and field/spectrum benchmarks, asserts the analytic Newtonian check, and writes `results.json`. No synthetic observations, discarded rows, or random seeds are used. No paper PDF is redistributed in this package; use the source links above.
