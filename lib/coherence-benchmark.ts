/** Dimensionless prescribed-Gaussian-impulse benchmark; not a physical experiment. */
export function coherenceBenchmark(eta: number, kappa: number, phase: number, finite = true) {
  if (![eta, kappa, phase].every(Number.isFinite) || eta < 0 || eta > 1 || kappa < 0) {
    throw new RangeError('Require 0 ≤ coherence ≤ 1, nonnegative impulse and finite phase.');
  }
  const overlap = finite ? Math.exp(-kappa * kappa / 8) : 1;
  const visibility = eta * Math.cos(phase) * overlap;
  const selectedProbability = 0.5 - 0.48 * visibility;
  const complementaryProbability = 1 - selectedProbability;
  const selectedResponse = (-0.68 + 0.72 * visibility) / selectedProbability;
  const complementaryResponse = (-0.82 - 0.72 * visibility) / complementaryProbability;
  const unconditionalResponse = selectedProbability * selectedResponse + complementaryProbability * complementaryResponse;
  return {overlap, visibility, selectedProbability, complementaryProbability, selectedResponse,
    complementaryResponse, unconditionalResponse, selectedMomentum: kappa * selectedResponse,
    complementaryMomentum: kappa * complementaryResponse, threshold: 17 / 18};
}
