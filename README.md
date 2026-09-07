# OPEN FIELD — The Fifth Force

This repository is the **source of truth** for the OPEN FIELD gravity-modification / fifth-force research website.

## Purpose

OPEN FIELD is an evidence-first, reproducible research notebook. The project separates:

1. observations and released experimental data,
2. calculations and models,
3. hypotheses and unresolved questions,
4. video/transcript discovery inputs,
5. scientific verification and contradictory evidence,
6. engineering feasibility.

The current baseline is **Rev02**, restored from the original `open-field-notes` site and expanded with the investigation plan developed in ChatGPT.

## Visual system

Preserve the original identity:

- green-black background (`#071714`)
- warm-white editorial serif display typography
- lime accent (`#b9f552`)
- muted blue-green scientific text
- thin rules and flat research panels
- serif equations / MathJax SVG
- SVG data graphics generated from CSV

Do not convert the project into a generic blue SaaS dashboard.

## Site structure

- `index.html` — Investigation / landing page
- `repository.html` — publications, data, reproducibility assets
- `open-questions.html` — research tasks
- `community.html` — collaboration model
- `agents.html` — AI-agent guide
- `research-areas.html` — 150-subject investigation atlas
- `investigation-plan.html` — investigation framework
- `videos.html` — three embedded source videos
- `newsroom.html` — research updates
- `research/report.html` — fifth-force reanalysis publication
- `research/data.html` — CSV-driven interactive data visualizations
- `publications/working-paper-01.html` — foundational physics
- `publications/engineering-paper-02.html` — engineering test program
- `transcripts/` — transcript/provenance records
- `assets/data/` — canonical machine-readable research data
- `assets/js/csv-visualizer.js` — CSV → interactive SVG renderer
- `assets/js/equations.js` — TeX/MathJax equation rendering
- `tools/audit_site.py` — static site integrity audit

## Data architecture

The compact web atlas contains **150 investigation subjects** and **76 canonical source records**. Twenty candidate sources per subject are generated deterministically in the browser from subject/theme relevance. The prior Rev02 recovery archive contains the original 3,000-row explicit mapping and XLSX workbook.

The 20-source pools are **candidate research sources**, not 3,000 independently validated scientific conclusions.

## CSV visualizations

Do not replace CSV datasets with chart screenshots. Every chart should:

- load the canonical CSV,
- render as browser SVG,
- expose x/y selection where useful,
- preserve the raw-data table,
- preserve a direct CSV download/source link.

## Equations

Equations are stored as TeX/LaTeX source and rendered by MathJax as SVG. They must remain selectable/searchable and responsive. Fixed PNG equation screenshots are not the canonical representation.

## Videos and transcripts

The source videos are embedded on `videos.html`. Transcript/provenance records are stored separately under `transcripts/`. Keep three layers distinct:

- transcript/source reconstruction,
- technical summary,
- scientific verification.

A video is a discovery input, not scientific authority.

## Development workflow

- `main` — production-ready baseline
- feature branches — development changes
- preview deployment — QA
- pull request — review
- merge to `main` — production deployment

Run the audit before merging:

```bash
python tools/audit_site.py
```

For local preview:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Deployment

The repository is designed as a static site and can deploy directly to Vercel. Connect this repository to a Vercel project and deploy from `main`.

## Recovery

The complete binary recovery package, including the original XLSX/DOCX files, QA screenshots, original visual references, and full explicit source-mapping export, is preserved separately as `anti-gravity_site_rev02.zip` in the project file store. This Git repository intentionally keeps the development source lean and reproducible rather than committing redundant generated ZIP archives.

## Scientific status

No reproducible experiment in this project establishes gravity shielding, reversal, or a controllable anti-gravity device. Null results, contradictory evidence, and failed replication attempts remain first-class research records.
