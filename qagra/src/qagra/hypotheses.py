"""Candidate residual-force hypotheses."""

from __future__ import annotations

from dataclasses import dataclass
import math
from typing import Protocol

import numpy as np

from .physics import G, classical_mixture_acceleration, gravity_acceleration_operator, postselected_weak_value, postselection_probability


@dataclass(frozen=True)
class ExperimentPoint:
    source_mass_kg: float
    probe_x_m: float
    time_s: float


class Hypothesis(Protocol):
    name: str
    def residual_acceleration(self, point: ExperimentPoint) -> float: ...


@dataclass(frozen=True)
class NullHypothesis:
    name: str = "H0_null"
    def residual_acceleration(self, point: ExperimentPoint) -> float:
        return 0.0


@dataclass(frozen=True)
class RepulsiveInverseSquare:
    alpha: float = 0.1
    source_x_m: float = 0.0
    name: str = "H_repulsive_inverse_square"
    def residual_acceleration(self, point: ExperimentPoint) -> float:
        dx = point.probe_x_m - self.source_x_m
        r = abs(dx)
        if r == 0:
            return 0.0
        return math.copysign(1.0, dx) * self.alpha * G * point.source_mass_kg / (r**2)


@dataclass(frozen=True)
class YukawaRepulsion:
    alpha: float = 0.1
    range_m: float = 0.02
    source_x_m: float = 0.0
    name: str = "H_yukawa_repulsive"
    def residual_acceleration(self, point: ExperimentPoint) -> float:
        dx = point.probe_x_m - self.source_x_m
        r = abs(dx)
        if r == 0 or self.range_m <= 0:
            return 0.0
        factor = (1.0 + r / self.range_m) * math.exp(-r / self.range_m)
        return math.copysign(1.0, dx) * self.alpha * G * point.source_mass_kg * factor / (r**2)


@dataclass(frozen=True)
class OscillatoryResidual:
    amplitude_m_s2: float = 1e-11
    frequency_hz: float = 0.5
    phase_rad: float = 0.0
    name: str = "H_oscillatory"
    def residual_acceleration(self, point: ExperimentPoint) -> float:
        return self.amplitude_m_s2 * math.sin(2.0 * math.pi * self.frequency_hz * point.time_s + self.phase_rad)


@dataclass(frozen=True)
class PostselectedQuantumGravity:
    """Weak-value residual for a two-branch spatial source superposition."""
    source_positions_m: tuple[float, float] = (-50e-6, 50e-6)
    initial_state: tuple[complex, complex] = (1 / math.sqrt(2), 1 / math.sqrt(2))
    final_state: tuple[complex, complex] = (0.8, -0.6)
    coupling_scale: float = 1.0
    name: str = "H_quantum_postselected"

    @property
    def ideal_postselection_probability(self) -> float:
        return postselection_probability(self.initial_state, self.final_state)

    def full_conditional_acceleration(self, point: ExperimentPoint) -> float:
        op = gravity_acceleration_operator(point.source_mass_kg, self.source_positions_m, point.probe_x_m)
        aw = postselected_weak_value(op, self.initial_state, self.final_state)
        return self.coupling_scale * float(np.real(aw))

    def residual_acceleration(self, point: ExperimentPoint) -> float:
        op = gravity_acceleration_operator(point.source_mass_kg, self.source_positions_m, point.probe_x_m)
        aw = postselected_weak_value(op, self.initial_state, self.final_state)
        classical = classical_mixture_acceleration(op, self.initial_state)
        return self.coupling_scale * (float(np.real(aw)) - classical)


def hypothesis_from_spec(name: str, **params) -> Hypothesis:
    key = name.strip().lower()
    if key in {"null", "h0", "h0_null"}: return NullHypothesis()
    if key in {"repulsive", "inverse_square", "repulsive_inverse_square"}: return RepulsiveInverseSquare(**params)
    if key in {"yukawa", "yukawa_repulsive"}: return YukawaRepulsion(**params)
    if key in {"oscillatory", "periodic"}: return OscillatoryResidual(**params)
    if key in {"quantum", "postselected", "quantum_postselected"}: return PostselectedQuantumGravity(**params)
    raise KeyError(f"Unknown hypothesis: {name}")
