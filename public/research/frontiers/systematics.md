# What ordinary effect could imitate the signal?

F04 · Proposed investigation · 2026-09-13

AI-assisted research design; not peer reviewed. No new experimental result.

## Research question
Can an anomalous-force interpretation survive a calibrated library of ordinary effects? This is a proposed experimental and analysis program. The central output is a reproducible error budget and a falsifiable signal model.

## Measurement model
Represent the calibrated force time series as

$$
y(t)=A s(t)+\sum_j b_j x_j(t)+d(t)+\epsilon(t).
$$

Here $s(t)$ is a predefined unit-amplitude candidate template, $x_j$ are measured environmental channels, $b_j$ are calibrated transfer coefficients, $d$ is a drift model and $\epsilon$ is residual noise. Correlation between $s$ and an environmental channel can destroy identifiability; fitting both terms does not automatically resolve it.

For a harmonic oscillator readout, a useful linear benchmark is

$$
\chi(\omega)=\frac{1}{m(\omega_0^2-\omega^2+i\Gamma\omega)},\qquad x(\omega)=\chi(\omega)F(\omega).
$$

The mass $m$, resonance $\omega_0$, damping rate $\Gamma$ and readout calibration must be measured. A resonant displacement is not a force until divided by the calibrated transfer function.

## Adversarial controls
1. Replace the active element with an inert dummy having comparable electrical and thermal loading.
2. Reverse the apparatus orientation while recording cable geometry, suspension position and magnetic field.
3. Sweep modulation frequency to distinguish thermal lag, mechanical resonances and synchronous pickup.
4. Vary pressure and shielding, independently monitoring outgassing, ion flow, patch potentials and electrostatic coupling.
5. Measure power and account for photon momentum, expelled matter, external supports and fields crossing the system boundary.
6. Blind the analyst to selected active/dummy labels and inject calibrated forces to measure detection efficiency.

A reduced apparent weight could arise from buoyancy or electromagnetic support without changing gravity. A closed-device thrust claim requires a momentum balance for the full apparatus and environment; an internally applied force can produce a transient suspension response.

## Analysis and rejection criteria
Use a prespecified signal template and a documented nuisance model. Calibrate false positives using complete null runs with realistic colored noise. Report residual autocorrelation and frequency response. Do not tune exclusions or drift flexibility until a desired significance appears.

A candidate fails if a dummy or background injection reproduces it, if orientation behavior contradicts the proposed force, or if it vanishes under independent isolation. Passing these controls would justify further replication, not immediately establish new physics. Publish null results, calibration data and negative controls alongside candidate runs.

## Sources

- [AG-020: EMDrive high-accuracy test](https://doi.org/10.1007/s12567-021-00385-1)
- [AG-023: Steady electromagnetic-gravity coupling search](https://doi.org/10.1038/s41598-024-70286-w)
- [SRC-079: Search for Screened Interactions Associated with Dark Energy Below the 100 μm Length Scale](https://arxiv.org/abs/1604.04908)
- [SRC-085: Measurement of gravitational coupling between millimetre-sized masses](https://www.nature.com/articles/s41586-021-03250-7)
- [SRC-092: MadMiner: Machine learning-based inference for particle physics](https://arxiv.org/abs/1907.10621)
