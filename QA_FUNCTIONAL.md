# OPEN FIELD Rev02 — Functional QA

## Scope
This review checks the static recovery package before deployment. The build deliberately does not fake the original writable contributor backend: read-only research/API assets work statically; community write/auth flows are clearly marked as requiring a connected backend.

## Required capabilities
- HTML publications: present.
- HTML transcript/provenance records: present for all 3 videos.
- Markdown transcript records: present for all 3 videos.
- Downloadable original/recovery files: present.
- Interactive CSV-to-SVG component: present as `assets/js/csv-visualizer.js`.
- Exact CSV download source shared with the viewer: present.
- TeX/LaTeX source + local MathJax SVG: present.
- Research atlas: 150 investigations.
- Canonical source library: 76 records.
- Subject/source mappings: 3,000.
- Formula-string normalization: completed; `Mapped URLs` is numeric in the web JSON.
- URL registry: 106 unique external research/media URLs after a completeness scan of Rev02 assets.
- Original research database XLSX: packaged.
- Panda reanalysis: report, code, JSON result and all 3 CSVs packaged.

## Static route/asset audit
Run:
```bash
python tools/audit_site.py
```
The audit checks local links/assets, required recovery files, transcript pairs, data counts and CSV presence. `node --check` is also run against all local JavaScript files.

## CSV viewer behavior
The browser viewer supports:
- local CSV parsing;
- SVG line/scatter/bar rendering;
- x/y column selection;
- uncertainty/error marks;
- hover tooltips;
- raw table inspection;
- CSV download from the same `data-src` file.

The 3d dataset’s Mathematica-style `Around[value,error]` representation is explicitly parsed rather than discarded.

## Equation behavior
Publication pages load `assets/vendor/mathjax/tex-svg.js` locally. Equation source is retained in HTML and can be shown/copied through `assets/js/equations.js`. Static inline SVG fallback is packaged for archival/non-JS rendering.

## External dependencies
- YouTube is required only for live video playback. A site-local fallback panel remains visible if the iframe cannot load.
- Scientific/source URLs are references, not runtime requirements.
- MathJax is local in Rev02.

## Backend boundary
The recovered read API is static (`/api/research.json`, atlas JSON, URL JSON). The original contributor sign-in/write backend was not recovered as deployable source. Rev02 therefore preserves the interface and data contract but labels write submission as unavailable rather than simulating successful persistence.

## Deployment verification
After the site is deployed, verify at minimum:
1. `/index.html`
2. `/repository.html`
3. `/research/data.html`
4. `/research/report.html`
5. `/publications/working-paper-01.html`
6. `/publications/engineering-paper-02.html`
7. `/videos.html`
8. `/research-areas.html`
9. `/investigation-plan.html`
10. `/api/research.json`
11. all three CSV download links
12. all three embedded video players

Any host-specific failure should be corrected in routing/backend configuration without changing the visual system.
