"""Physics primitives used by QAGRA.

The module keeps ordinary gravitational dynamics and the explicitly quantum
post-selection calculation separate. This is deliberate: a weak-value or
post-selected anomaly must never be silently treated as a classical force law.
"""

from __future__ import annotations

import numpy as np

G = 6.67430e-11
HBAR = 1.054_571_817e-34


def _as_complex_state(state: np.ndarray | list[complex]) -> np.ndarray:
    v = np.asarray(state, dtype=np.complex128).reshape(-1)
    n = np.linalg.norm(v)
    if n == 0:
        raise ValueError("Quantum state cannot be the zero vector")
    return v / n


def gravity_acceleration_1d(source_mass_kg: float, source_x_m: float, probe_x_m: float) -> float:
    """Newtonian acceleration along x due to a point source."""
    dx = probe_x_m - source_x_m
    r = abs(dx)
    if r == 0:
        raise ValueError("Point-source and probe positions cannot coincide")
    return -G * source_mass_kg * dx / (r**3)


def gravity_force_1d(source_mass_kg: float, probe_mass_kg: float, source_x_m: float, probe_x_m: float) -> float:
    return probe_mass_kg * gravity_acceleration_1d(source_mass_kg, source_x_m, probe_x_m)


def gravity_acceleration_operator(source_mass_kg: float, source_positions_m, probe_x_m: float) -> np.ndarray:
    """A_g = sum_j a_j |x_j><x_j| in a localized source-position basis."""
    positions = np.asarray(source_positions_m, dtype=float).reshape(-1)
    values = [gravity_acceleration_1d(source_mass_kg, x, probe_x_m) for x in positions]
    return np.diag(np.asarray(values, dtype=np.complex128))


def expectation(operator: np.ndarray, state) -> complex:
    psi = _as_complex_state(state)
    op = np.asarray(operator, dtype=np.complex128)
    return np.vdot(psi, op @ psi)


def postselection_probability(initial_state, final_state) -> float:
    i = _as_complex_state(initial_state)
    f = _as_complex_state(final_state)
    return float(abs(np.vdot(f, i)) ** 2)


def postselected_weak_value(operator: np.ndarray, initial_state, final_state, *, min_overlap: float = 1e-12) -> complex:
    """A_w = <f|A|i>/<f|i>. Conditional prediction, not unconditional force."""
    i = _as_complex_state(initial_state)
    f = _as_complex_state(final_state)
    op = np.asarray(operator, dtype=np.complex128)
    overlap = np.vdot(f, i)
    if abs(overlap) < min_overlap:
        raise ValueError("Postselection overlap is too small for a stable weak-value calculation")
    return np.vdot(f, op @ i) / overlap


def classical_mixture_acceleration(operator: np.ndarray, source_state) -> float:
    psi = _as_complex_state(source_state)
    probs = np.abs(psi) ** 2
    diag = np.real(np.diag(np.asarray(operator, dtype=np.complex128)))
    return float(np.dot(probs, diag))


def composite_hamiltonian(h_source: np.ndarray, h_probe: np.ndarray, h_interaction: np.ndarray) -> np.ndarray:
    """Construct H = H_S⊗I + I⊗H_P + H_int for finite models."""
    hs = np.asarray(h_source, dtype=np.complex128)
    hp = np.asarray(h_probe, dtype=np.complex128)
    hi = np.asarray(h_interaction, dtype=np.complex128)
    ident_s = np.eye(hs.shape[0], dtype=np.complex128)
    ident_p = np.eye(hp.shape[0], dtype=np.complex128)
    h = np.kron(hs, ident_p) + np.kron(ident_s, hp)
    if hi.shape != h.shape:
        raise ValueError("Interaction Hamiltonian has incompatible dimension")
    return h + hi
