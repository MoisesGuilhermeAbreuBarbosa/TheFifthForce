# QAGRA Mathematical Model

## 1. Null model

For source mass M, probe mass m and separation vector r = r_P-r_S,

\[
V_g(\mathbf r)=-\frac{GMm}{|\mathbf r|},\qquad
\mathbf F_g=-\frac{GMm}{|\mathbf r|^3}\mathbf r,\qquad
\mathbf a_g=-\frac{GM}{|\mathbf r|^3}\mathbf r.
\]

The measured acceleration is modeled as

\[
\mathbf y(t)=\mathbf a_g+\mathbf a_E+\mathbf a_B+\mathbf a_C+\mathbf a_T+\mathbf a_V+\mathbf a_I+\boldsymbol\epsilon.
\]

QAGRA analyzes the residual

\[
\mathbf R(t)=\mathbf y(t)-\widehat{\mathbf y}_{H_0}(t).
\]

## 2. Alternative interactions

General alternative:

\[
\mathbf y=\widehat{\mathbf y}_{H_0}+\mathbf a_X(\mathbf r,t,\mathbf s;\theta_X)+\boldsymbol\epsilon.
\]

Repulsive inverse-square residual:

\[
\mathbf a_X^{(R2)}=+\alpha\frac{GM}{r^2}\hat{\mathbf r}.
\]

Repulsive Yukawa correction:

\[
\mathbf a_X^{(Y)}=+\alpha\frac{GM}{r^2}\left(1+\frac r\lambda\right)e^{-r/\lambda}\hat{\mathbf r}.
\]

Oscillatory residual:

\[
\mathbf a_X^{(O)}=A\sin(2\pi ft+\phi)\hat{\mathbf n}.
\]

## 3. Quantum source–probe model

Use the composite Hilbert space

\[
\mathcal H=\mathcal H_S\otimes\mathcal H_P\otimes\mathcal H_E.
\]

The Hamiltonian is

\[
\hat H=\hat H_S\otimes I_P\otimes I_E+I_S\otimes\hat H_P\otimes I_E+\hat H_{SP}^{(g)}+\hat H_{\mathrm{nuis}}+\hat H_X(\theta_X).
\]

For nonrelativistic localized masses,

\[
\hat H_{SP}^{(g)}=-\frac{GMm}{|\hat{\mathbf r}_P-\hat{\mathbf r}_S|},
\qquad
\hat{\mathbf F}_P=-\nabla_{\mathbf r_P}\hat H_{SP}^{(g)}.
\]

## 4. Spatial source superposition

For two branches,

\[
|i\rangle_S=c_L|L\rangle+c_R|R\rangle,
\qquad |c_L|^2+|c_R|^2=1.
\]

In the localized branch basis,

\[
\hat A_g=a_L|L\rangle\langle L|+a_R|R\rangle\langle R|,
\qquad
a_j=-GM\frac{x_P-x_j}{|x_P-x_j|^3}.
\]

Discarding coherence gives

\[
a_{\mathrm{mix}}=|c_L|^2a_L+|c_R|^2a_R.
\]

## 5. Post-selection and weak values

Post-select

\[
|f\rangle_S=d_L|L\rangle+d_R|R\rangle,
\qquad
p_f=|\langle f|i\rangle|^2.
\]

The weak value is

\[
A_w=\frac{\langle f|\hat A_g|i\rangle}{\langle f|i\rangle}.
\]

In the weak-interaction regime the conditional probe shift is proportional to

\[
\Delta p_P\propto \operatorname{Re}(A_w).
\]

Because A_w is a ratio of transition amplitudes, its real part can lie outside the eigenvalue range and, for suitable nearly destructive postselection, can have the opposite sign from both ordinary attractive branch accelerations. QAGRA defines the conditional quantum residual

\[
a_Q=\operatorname{Re}(A_w)-a_{\mathrm{mix}}.
\]

This is conditional on postselection; it is not an unconditional classical repulsive force.

## 6. Density-matrix evolution

For

\[
\rho_0=\rho_S\otimes\rho_P\otimes\rho_E,
\]

\[
\rho(t)=U(t)\rho_0U^\dagger(t),\qquad U(t)=e^{-i\hat Ht/\hbar}.
\]

With source projector \(\Pi_f=|f\rangle\langle f|\),

\[
\rho_{P|f}=\frac{\operatorname{Tr}_{S,E}[(\Pi_f\otimes I_P\otimes I_E)\rho(t)]}{p(f)},
\]

and

\[
\langle\hat O_P\rangle_f=\operatorname{Tr}(\rho_{P|f}\hat O_P).
\]

This is the target representation for future open-system and decoherence simulation.

## 7. Decoherence control

A minimal source state is

\[
\rho_S=\begin{pmatrix}|c_L|^2&\eta c_Lc_R^*\\\eta^*c_Rc_L^*&|c_R|^2\end{pmatrix},\qquad0\le|\eta|\le1.
\]

A genuine coherence-dependent prediction must vary with η. Deliberate decoherence therefore becomes a falsification control.

## 8. Inference

For candidate set

\[
\mathcal M=\{H_0,H_{R2},H_Y,H_O,H_Q,\ldots\},
\]

Bayesian model selection is

\[
P(H_k|D)=\frac{P(D|H_k)P(H_k)}{\sum_jP(D|H_j)P(H_j)}.
\]

QAGRA v0.1 also implements

\[
\mathrm{BIC}=k\ln n+n\ln(\mathrm{RSS}/n)
\]

for fast interpretable screening.

## 9. Quantum parameter estimation

For

\[
\hat H(\theta)=\hat H_0+\sum_j\theta_j\hat H_j,
\]

the pure-state quantum Fisher information is

\[
[F_Q]_{jk}=4\operatorname{Re}[\langle\partial_j\psi|\partial_k\psi\rangle-\langle\partial_j\psi|\psi\rangle\langle\psi|\partial_k\psi\rangle],
\]

with quantum Cramér–Rao bound

\[
\operatorname{Cov}(\hat\theta)\succeq \frac1N F_Q^{-1}.
\]

This provides a principled future route for optimizing quantum sensors toward parameters that best discriminate H0 from candidate anomalous interactions.

## 10. Evidence rule

A candidate anomalous-gravity interpretation requires: (1) significant residual structure, (2) physical specificity against nuisance alternatives, (3) predicted behavior under deliberate controls, and (4) independent replication. The quantum formalism expands the hypotheses that can be tested; it does not lower the evidentiary standard.
