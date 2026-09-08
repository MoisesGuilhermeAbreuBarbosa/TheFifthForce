"""Synthetic experiment generator and physics-aware digital twin."""

from __future__ import annotations
from dataclasses import dataclass
from pathlib import Path
import csv
import numpy as np
from .hypotheses import ExperimentPoint, Hypothesis, NullHypothesis
from .physics import gravity_acceleration_1d

FEATURE_COLUMNS = ["source_mass_kg","probe_x_m","time_s","electric_field_v_m","magnetic_field_t","temperature_delta_k","vibration_m_s2","baseline_gravity_m_s2","nuisance_m_s2","anomaly_m_s2","observed_m_s2","residual_m_s2"]

@dataclass(frozen=True)
class SimulationConfig:
    n_samples: int = 1000
    seed: int = 7
    source_mass_min_kg: float = 1e-4
    source_mass_max_kg: float = 2e-3
    probe_distance_min_m: float = 0.01
    probe_distance_max_m: float = 0.06
    duration_s: float = 60.0
    noise_sigma_m_s2: float = 2e-12
    electric_coupling: float = 2e-15
    magnetic_coupling: float = 5e-5
    thermal_coupling: float = 8e-12

@dataclass
class Dataset:
    X: np.ndarray
    feature_names: list[str]
    label: np.ndarray
    metadata: dict
    def column(self, name: str) -> np.ndarray:
        return self.X[:, self.feature_names.index(name)]
    def to_csv(self, path: str | Path) -> None:
        path = Path(path); path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("w", newline="", encoding="utf-8") as f:
            w = csv.writer(f); w.writerow(self.feature_names + ["hypothesis_label"])
            for row, y in zip(self.X, self.label): w.writerow([f"{float(v):.17g}" for v in row] + [str(y)])
    @classmethod
    def from_csv(cls, path: str | Path) -> "Dataset":
        path = Path(path)
        with path.open("r", newline="", encoding="utf-8") as f: rows = list(csv.reader(f))
        if len(rows) < 2: raise ValueError("Dataset CSV contains no data rows")
        header = rows[0]
        if header[-1] != "hypothesis_label": raise ValueError("Last CSV column must be hypothesis_label")
        X = np.asarray([[float(x) for x in r[:-1]] for r in rows[1:]], dtype=float)
        label = np.asarray([r[-1] for r in rows[1:]], dtype=str)
        return cls(X=X, feature_names=header[:-1], label=label, metadata={"source": str(path)})

def simulate(config: SimulationConfig, hypothesis: Hypothesis | None = None, *, label: str | None = None) -> Dataset:
    if config.n_samples <= 0: raise ValueError("n_samples must be positive")
    hypothesis = hypothesis or NullHypothesis(); rng = np.random.default_rng(config.seed)
    masses = rng.uniform(config.source_mass_min_kg, config.source_mass_max_kg, config.n_samples)
    distances = rng.uniform(config.probe_distance_min_m, config.probe_distance_max_m, config.n_samples)
    probe_x = distances * rng.choice(np.asarray([-1.0, 1.0]), size=config.n_samples)
    time_s = np.linspace(0.0, config.duration_s, config.n_samples)
    e_field = rng.normal(0.0, 30.0, config.n_samples)
    b_field = rng.normal(0.0, 50e-9, config.n_samples)
    temp = rng.normal(0.0, 0.03, config.n_samples)
    vibration = rng.normal(0.0, 5e-13, config.n_samples)
    baseline = np.asarray([gravity_acceleration_1d(m, 0.0, x) for m, x in zip(masses, probe_x)])
    nuisance = config.electric_coupling*e_field + config.magnetic_coupling*b_field + config.thermal_coupling*temp + vibration
    anomaly = np.asarray([hypothesis.residual_acceleration(ExperimentPoint(float(m), float(x), float(t))) for m, x, t in zip(masses, probe_x, time_s)])
    noise = rng.normal(0.0, config.noise_sigma_m_s2, config.n_samples)
    observed = baseline + nuisance + anomaly + noise
    residual = observed - baseline - nuisance
    X = np.column_stack([masses,probe_x,time_s,e_field,b_field,temp,vibration,baseline,nuisance,anomaly,observed,residual])
    return Dataset(X=X, feature_names=list(FEATURE_COLUMNS), label=np.repeat(label or hypothesis.name, config.n_samples), metadata={"seed":config.seed,"hypothesis":label or hypothesis.name,"noise_sigma_m_s2":config.noise_sigma_m_s2})

def concatenate(datasets: list[Dataset]) -> Dataset:
    if not datasets: raise ValueError("At least one dataset is required")
    names = datasets[0].feature_names
    if any(ds.feature_names != names for ds in datasets): raise ValueError("Feature schemas differ")
    return Dataset(X=np.vstack([ds.X for ds in datasets]), feature_names=list(names), label=np.concatenate([ds.label for ds in datasets]), metadata={"parts":[ds.metadata for ds in datasets]})
