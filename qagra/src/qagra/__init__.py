"""QAGRA: Quantum-Assisted Gravitational Research Architecture."""

from .physics import (
    G,
    HBAR,
    gravity_acceleration_1d,
    gravity_acceleration_operator,
    postselected_weak_value,
    postselection_probability,
)
from .hypotheses import hypothesis_from_spec
from .simulator import Dataset, SimulationConfig, simulate
from .evidence import EvidenceLedger

__all__ = [
    "G",
    "HBAR",
    "gravity_acceleration_1d",
    "gravity_acceleration_operator",
    "postselected_weak_value",
    "postselection_probability",
    "hypothesis_from_spec",
    "Dataset",
    "SimulationConfig",
    "simulate",
    "EvidenceLedger",
]

__version__ = "0.1.0"
