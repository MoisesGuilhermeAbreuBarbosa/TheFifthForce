"""Verify CFD analytic predictions against independently integrated Gaussian densities.

Run from the repository: python3 scripts/verify-research-dossier.py
NumPy required. Does not alter original data or generated artifacts.
With --write-fixtures, intentionally refresh the mathematical fixtures after review.
"""
from pathlib import Path
import argparse
import hashlib
import json
import math
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
DOSSIER = ROOT / 'public/research/dossier'


def analytic(eta, kappa, phase=0.0):
    v = eta * math.cos(phase) * math.exp(-kappa * kappa / 8)
    p = .5 - .48 * v
    selected = (-.68 + .72 * v) / p
    complement = (-.82 - .72 * v) / (1 - p)
    return dict(eta=eta, kappa=kappa, phase_rad=phase,
                selected_probability=p, selected_response=selected,
                complementary_response=complement,
                unconditional_response=p * selected + (1 - p) * complement)


def verify_gaussian(eta, kappa, phase):
    # Integrate the actual densities, independent of the closed-form moment code.
    grid = np.linspace(-2 * kappa - 12, 12, 100001)
    left = (2 * np.pi)**(-.25) * np.exp(-(grid + kappa)**2 / 4)
    right = (2 * np.pi)**(-.25) * np.exp(-(grid + 2*kappa)**2 / 4)
    cross = .48 * eta * np.cos(phase) * left * right
    densities = [.32*left**2 + .18*right**2 - cross,
                 .18*left**2 + .32*right**2 + cross]
    expected = analytic(eta, kappa, phase)
    means, probabilities = [], []
    for density in densities:
        assert density.min() > -1e-14, 'Negative probability density'
        probability = np.trapezoid(density, grid)
        mean = np.trapezoid(grid * density, grid) / probability
        probabilities.append(probability)
        means.append(mean)
    assert np.isclose(sum(probabilities), 1, atol=1e-12)
    assert np.isclose(probabilities[0], expected['selected_probability'], atol=1e-12)
    assert np.isclose(means[0], kappa*expected['selected_response'], atol=1e-11)
    assert np.isclose(means[1], kappa*expected['complementary_response'], atol=1e-11)
    assert np.isclose(np.dot(probabilities, means), -1.5*kappa, atol=1e-11)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write-fixtures', action='store_true')
    args = parser.parse_args()
    count = 0
    for eta in (0, .9, 17/18, .95, 1):
        for kappa in (0, .01, .3, 1, 3):
            for phase in (0, math.pi/2, math.pi):
                verify_gaussian(eta, kappa, phase)
                count += 1
    assert np.isclose(analytic(1, 0)['selected_response'], 2)
    assert abs(analytic(17/18, 0)['selected_response']) < 1e-12
    assert analytic(1, 1)['selected_response'] < 0
    assert analytic(1, .01, math.pi)['selected_response'] < 0
    fixtures = dict(kind='analytic_benchmark', model_version='1.0.0',
                    note='Dimensionless Gaussian impulse calculations; not sensor data.',
                    cases=[analytic(e, k, p) for e, k, p in
                           [(0, 0, 0), (.9, 0, 0), (.95, 0, 0), (1, 0, 0),
                            (1, .3, 0), (1, 1, 0), (1, .3, math.pi)]])
    if args.write_fixtures:
        (DOSSIER/'benchmark-fixtures.json').write_text(json.dumps(fixtures, indent=2)+'\n')
    else:
        saved = json.loads((DOSSIER/'benchmark-fixtures.json').read_text())
        for actual, expected in zip(saved['cases'], fixtures['cases'], strict=True):
            for key, value in expected.items():
                assert math.isclose(actual[key], value, rel_tol=1e-12, abs_tol=1e-12), key
    data_file = ROOT/'public/research/panda_fig3a.csv'
    assert hashlib.md5(data_file.read_bytes()).hexdigest() == 'df578555b01f75b3373d42d5336b8190'
    y, sigma = np.loadtxt(data_file, delimiter=',', skiprows=1).T
    w = 1 / sigma**2
    mean = w@y / w.sum()
    chi2 = np.sum(w*(y-mean)**2)
    uncertainty = np.sqrt(chi2/(len(y)-1)/w.sum() + 2.66**2 + 1)
    assert len(y) == 553
    assert np.isclose(mean, 33.096184655936035, rtol=1e-12)
    assert np.isclose(uncertainty, 6.288705398296418, rtol=1e-12)
    manifest = json.loads((DOSSIER/'manifest.json').read_text())
    records = json.loads((DOSSIER/'hypotheses.json').read_text())
    source_ids = {r['id'] for r in json.loads((DOSSIER/'sources.json').read_text())}
    required = json.loads((ROOT/'schemas/research-hypothesis.schema.json').read_text())['items']['required']
    assert {r['id'] for r in records} == {f'CFD-H{i}' for i in range(1, 6)}
    for record in records:
        assert all(key in record and record[key] for key in required)
        assert set(record['sources']) <= source_ids
        assert (DOSSIER/(record['chapter']+'.md')).is_file()
    for chapter in manifest['chapters']:
        assert (DOSSIER/(chapter['slug']+'.md')).is_file()
    print(f'PASS: {count} independently integrated finite Gaussian cases; threshold, phase, weak limit, outcome accounting and fixtures.')
    print('PASS: original Panda checksum and 553-row summary; no experimental files modified.')
    print('PASS: five hypothesis records, source references and chapter files.')


if __name__ == '__main__':
    main()
