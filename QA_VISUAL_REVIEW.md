# OPEN FIELD Rev02 — Visual QA Review

## Authority used
The user-provided screenshots preserved in the Rev02 recovery archive are the authoritative visual reference. Rev02 was evaluated against the original OPEN FIELD landing page, repository, open questions, community, AI-agent, research-area and newsroom captures.

## Target visual grammar
- near-black green/blue-green field, not generic black and not a blue SaaS dashboard;
- warm-white editorial serif for research headlines;
- lime accent reserved for the OPEN FIELD mark, active navigation, key evidence states, data marks and primary calls to action;
- muted blue-green sans-serif body copy;
- small tracked uppercase metadata;
- thin green rules and restrained flat panels;
- scientific/data blocks use monospaced text only where appropriate;
- equations are vector mathematical typesetting, not screenshots;
- charts are part of the article/research surface, not external raw-file links.

## Comparison findings
### Palette
The original home capture is dominated by a dark blue-green around RGB (16,28,28). Rev02 intentionally uses a slightly darker near-black green base (`#071714`) with panels layered above it; the family, contrast structure and lime hierarchy match the original rather than the earlier blue-dashboard rebuild. The Rev02 lime is `#b9f552`, visually aligned with the original fluorescent yellow-green accent.

### Typography
The large landing-page hierarchy is restored: a warm-white editorial serif for “Question gravity.” and an italic lime serif for “Start with evidence.” Body and navigation typography remain compact sans-serif. Data/code areas use monospace. Publication equations use MathJax SVG and retain TeX source.

### Layout and rhythm
Desktop pages preserve the original wide editorial margins, a centered masthead note, right-side contributor control, two-column hero/status composition, thin navigation rule, large whitespace bands and flat scientific panels. The new Videos and Investigation Plan pages use the same grid, border, spacing and typographic system rather than introducing a new design language.

### CSV visualizations
`research/data.html` contains three embedded graphical views generated from the exact downloadable Panda CSV assets. The visual language uses the same dark panel, lime marks and muted axes/rules. Fig. 3a is a point-series view, Fig. 3b a histogram/bar view, and Fig. 3d a three-point separation summary with reported uncertainty bars. The browser component renders SVG; the packaged HTML also contains static SVG fallbacks for non-JavaScript rendering/archival screenshots.

### Equations
The recovered report and both working papers use rich vector equations. TeX/LaTeX remains in `data-tex`; MathJax SVG is rendered from TeX source; the GitHub source uses the public MathJax runtime while the recovery archive retains the vendored copy. Pre-rendered inline SVG fallbacks are present so equations remain visible in static renderers. No scientific equation is represented by a raster image.

### Videos
All three videos are embedded with YouTube privacy-enhanced players. A visually consistent lime play/title fallback sits underneath the iframe, so a blocked/offline embed does not leave an empty black rectangle. Transcript provenance/status is presented immediately alongside each video.

### Responsive presentation
The production CSS includes explicit mobile breakpoints at 900 px and 600 px. A forced-mobile QA render (`screenshots/home-mobile-qa.png`) confirms the intended single-column hierarchy, stacked research status, responsive likelihood card, stacked evidence blocks and retained lime/serif identity.

## Screenshots reviewed
- `screenshots/home-desktop.png`
- `screenshots/repository-desktop.png`
- `screenshots/data-desktop-full.png`
- `screenshots/report-equations-desktop.png`
- `screenshots/videos-desktop.png`
- `screenshots/research-areas-desktop.png`
- `screenshots/home-mobile-qa.png`
- `screenshots/data-mobile-qa.png`
- `screenshots/videos-mobile-qa.png`
- `screenshots/qa-original-vs-rev02-home.png`

## Corrections made during QA
1. Removed the earlier blue-dashboard visual language and restored the OPEN FIELD green-black / warm-white / lime grammar.
2. Embedded local SVG graph generation from CSV instead of leaving data only as downloads.
3. Added explicit Fig. 3d uncertainty visualization.
4. Converted publication equations to TeX-driven MathJax SVG with inline vector fallback.
5. Set equation fallback color explicitly so static renderers display white mathematical notation on the dark field.
6. Added full-frame video fallback posters behind YouTube iframes.
7. Kept new research pages inside the original masthead, hero, navigation, spacing and footer system.

## Screenshot-engine note
The container’s Chromium navigation is administratively blocked, so deterministic QA captures were generated through WeasyPrint using the HTML/CSS and packaged SVG fallbacks. WeasyPrint does not execute JavaScript or YouTube iframes; this is why the data pages include static SVG fallbacks and the video page includes poster fallbacks. The functional audit separately verifies the JavaScript files, local paths and data assets. Live-host verification should be repeated after deployment.

## Visual disposition
**PASS for graphical cohesion.** The restored landing page is recognizably the original OPEN FIELD design, and the new data, equation, publication, video and atlas components now behave as extensions of the same research-journal system rather than separate applications.
