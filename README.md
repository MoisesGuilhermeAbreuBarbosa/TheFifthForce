# OPEN FIELD — Anti-Gravity Site Rev02

## Purpose
This archive is the complete recovery/rebuild package for the OPEN FIELD gravity research notebook. It preserves the original visual identity shown in the reference screenshots and integrates the later video research, 150-field investigation map, databases and reproducibility assets.

## Revision
- Archive name: `anti-gravity_site_rev02.zip`
- Built: 7 September 2026
- Research status on landing page: **No anomalous force detected**
- Site type: static HTML/CSS/JavaScript; no proprietary server runtime required for read-only use.

## Visual system
The authoritative reference is the recovered OPEN FIELD design: dark green-black background, warm-white Georgia-style editorial serif headings, lime accent (#b9f552), muted blue-green body text, compact sans-serif metadata, thin green rules, flat research panels and restrained rounded corners. Do not replace this with blue SaaS/dashboard styling.

## Important architecture decisions
### Publications
All publications used by the site are rendered as real HTML. Editable/source files remain downloadable.

### Equations
Equations are stored as TeX/LaTeX strings in HTML and rendered with the vendored MathJax 3 SVG browser bundle at `assets/vendor/mathjax/tex-svg.js`. Each `.eq` block retains its TeX in `data-tex=...`; `assets/js/equations.js` adds TeX visibility and copy controls. Rev02 also contains pre-rendered inline SVG equation fallbacks so the mathematical content remains vector-quality even when JavaScript is unavailable. No equation is stored as a raster screenshot, and no font files are bundled.

### CSV graphics
`assets/js/csv-visualizer.js` is the embedded visualization tool. It fetches a local CSV and generates SVG directly in the browser. The same CSV remains available through a Download CSV button. It supports line, scatter and bar views, numeric-column selection, uncertainty/error bars, hover tooltips and raw-table inspection.

Example:
```html
<div class="csvviz"
  data-src="/assets/data/panda/panda_fig3a.csv"
  data-mode="scatter"
  data-y="Mean Value (nm/s^2)"
  data-error="Std (nm/s^2)"></div>
<script defer src="/assets/js/csv-visualizer.js"></script>
```

## Main routes
- `/index.html` — restored investigation landing page
- `/repository.html` — publications/downloads
- `/research/report.html` — fifth-force reanalysis, rich HTML + equations + CSV visualizations
- `/research/data.html` — interactive CSV views
- `/publications/working-paper-01.html` — foundational physics
- `/publications/engineering-paper-02.html` — engineering working paper
- `/open-questions.html` — seven original research tasks
- `/community.html` — recovered contribution interface in static recovery mode
- `/agents.html` — AI-agent protocol/read interface
- `/research-areas.html` — 150-field atlas
- `/investigation-plan.html` — consolidated research plan
- `/videos.html` — three embedded videos
- `/transcripts/video-01.html`, `video-02.html`, `video-03.html` — transcript/provenance records
- `/newsroom.html` — research updates
- `/api.html` and `/api/research.json` — read-only API index
- `/research-export.html` — recovery downloads

## Data assets
- `assets/data/Anti_Gravity_Research_Database.xlsx` — research database workbook
- `assets/data/research-atlas.json` — normalized 150-field / 3,000-association web dataset
- `assets/data/research-atlas-original.json` — unmodified source JSON from prior atlas package
- `assets/data/urls.csv` and `urls.json` — all registered research/runtime URLs
- `assets/data/panda/` — REPORT.md, 3 CSVs, `reanalyse.py`, `results.json`
- `assets/downloads/panda_fifth_force_reanalysis.zip` — original reproducibility bundle

## Transcript policy
The archive contains one transcript record per video in HTML and Markdown. Full third-party transcripts are **not redistributed** when the transcript is hosted by a third party and is not user-provided. Each record includes video URL, transcript/primary-source URL, status, research summary and topic index. This preserves provenance without falsely presenting reconstructed narration as scientific evidence.

## Build / local preview
No build step is required. From the site root:
```bash
python -m http.server 8000
```
Open `http://localhost:8000/`. Do not open pages directly with `file://` because browsers may block CSV/JSON fetches.

## Vercel deployment
The site is static and can be deployed by placing this directory in a Git repository and importing it into Vercel, or with the Vercel CLI:
```bash
npm i -g vercel
vercel
# after preview QA
vercel --prod
```
`vercel.json` provides clean redirects for recovered route names.

## QA before production
1. Run `python tools/audit_site.py` if present, or verify all relative links/assets.
2. Start a local HTTP server.
3. Confirm `/research/data.html` draws all three SVG visualizations.
4. Confirm MathJax renders equations on all three publication/report pages.
5. Test desktop and mobile widths.
6. Check embedded YouTube players.
7. Confirm downloads return actual CSV/XLSX/ZIP files.
8. Review `screenshots/` and `QA_VISUAL_REVIEW.md` for the last graphical-cohesion pass.

## Scientific data rules
- Video content = discovery input, not authority.
- Candidate source mapping ≠ scientific validation.
- Null/contradictory evidence stays visible.
- Transcript, technical summary and scientific verification remain separate.
- Do not label levitation, effective negative mass or unexplained thrust as gravity modification without gravitational scaling and system-boundary closure.

## Recovery if the original hosting/account is lost
1. Unzip this archive.
2. Verify `assets/data` and `transcripts` are present.
3. Run a local HTTP server.
4. Replace external media URLs only if unavailable. MathJax is vendored locally; YouTube remains the only external display dependency for the embedded videos.
5. Deploy the folder to any static host (Vercel, Netlify, GitHub Pages, S3/CloudFront, nginx, Apache).
6. Preserve the CSS variables and typography in `assets/css/styles.css` to maintain the recovered visual identity.
7. If adding new research, update the JSON/database first, then render it; do not hard-code scientific conclusions only into page prose.


## Rebuilding the equation fallbacks
The browser does not need a build step: it loads the local MathJax SVG bundle. If a maintainer wants to regenerate the pre-rendered inline SVG fallbacks, install `mathjax-full@3` in a temporary development environment, render each element's `data-tex` source to SVG, and preserve the original TeX attribute. Do not convert equations to PNG/JPEG.

## Visual reference and QA evidence
The `screenshots/reference-original/` folder contains user-provided reference captures of the original OPEN FIELD interface. The `screenshots/qa/` and top-level screenshot files document Rev02 render checks. `QA_VISUAL_REVIEW.md` records the cohesion review and corrections.

## Automatic Vercel deployment setup

The complete site is at the repository root. In the **existing** Vercel project, open Settings → Git and connect `MoisesGuilhermeAbreuBarbosa/TheFifthForce`. Set the Production environment's tracking branch to `main`, Root Directory to the repository root, and Framework Preset to Other. No package install or build is required; the output directory is `.`. Repository configuration enables Git deployments.

Merge the completed migration before deploying `main`. Once linked, pushes to `main` update production; other branches produce previews. The GitHub site-audit workflow validates local links and required datasets. It is not a configured Vercel deployment gate or branch-protection rule.

The Vercel account connection must have access to the existing project. No deployment token belongs in this repository. Confirm a deployment's commit SHA and Ready status in Vercel before claiming a live update.

The original wiki remains in [wiki/README.md](wiki/README.md). The source ZIP links use GitHub's main-branch archive; historical screenshot/recovery bundles remain separate.
