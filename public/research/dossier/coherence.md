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
