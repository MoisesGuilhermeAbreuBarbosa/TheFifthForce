## Current storage update: GitHub

This update supersedes database/account deployment requirements in the historical restoration audit below. Public contributions and reply threads use GitHub Issues; canonical research remains in repository files. No Turso secrets are required. The account page links to GitHub; former site API keys and recovery keys are retired. The community feed is cached and has a direct GitHub fallback. Newsroom drafts are browser-local and exportable. Publication requires finishing the submission on GitHub. No previous hosted database content has been imported.

## Historical restoration audit

# Original app → portable GitHub app audit

Baseline: the original open-field-notes source checkout, compared with Rev02 static recovery and the GitHub default branch on 2026-09-08. Live original-page retrieval failed; this is a source audit, not a claim of authenticated live-site inspection. Existing hosted database contents were not exported.

| Feature | Static Rev02 gap | Restored implementation |
|---|---|---|
| Navigation | Long static pages | Original stateful tabs, URL/back navigation and separate videos route |
| Research repository | Reduced asset list | Original papers, code, results, data and reproducibility ZIP |
| Literature | Missing register | 76 unique source URLs; original evaluations retained, imported candidates labelled |
| Read working paper | Broken/reduced readout | In-app Markdown/KaTeX reader, failure state, working source download |
| Read aloud | No control | Browser speech start/stop, with unavailable-browser message |
| Experimental graphics | Preserve Rev02 improvement | Embedded interactive CSV viewer in paper, errors and expandable raw table |
| Questions | Static task list | Seven original tasks, new question submissions and linked replies through task IDs |
| Community | Static instructions | Persisted posts, papers, reviews, replications; owner-only deletion and refresh |
| Accounts | Host-bound or absent | Self-service pseudonymous account with private recovery key and HttpOnly session |
| API keys | Missing | Generate, rotate and revoke; token hashes only; independent of account recovery |
| For agents | Reduced static copy | Original protocol, examples, limits, instructions and updated OpenAPI |
| Research areas | Flat source list | Original area filters/institutions/updates plus paginated searchable 150-subject atlas and mapped sources |
| Newsroom | Static copy | Original saved private drafts, instructions, exports, on-site publication and social-copy tools |
| Videos | Preserve embeds | Separate gallery with original source leads and account-authenticated new submissions |
| Transcription | Lost tool | Original local-audio browser worker, generated reproducibly at build time |
| Persistence | No backend | SQLite locally; remote libSQL-compatible database for Vercel |

## Boundaries that remain

- Vercel project access and a durable database connection are not available in this session. The code can run locally; hosted accounts/posts require those settings. No fallback silently writes public posts to browser storage.
- Old accounts, keys and posts are not migrated. They require an authorized database export and identity mapping; ChatGPT identities cannot simply be copied into the new sign-in system.
- Social accounts remain unconnected. Templates do not perform AI inference or automatic social delivery.
- Video notes are not full recovered transcripts. Uploaded audio transcription is separate, and requires downloadable model files and a compatible browser.
- Imported references and 3,000 mappings are research candidates, not newly verified evidence. No successful gravity-control device is asserted.
- Recovery keys have no email reset. Losing a key and session means losing access; save the recovery key privately.
- Free infrastructure is subject to provider quotas. Public deployments require abuse monitoring and maintenance; there is no claim of immunity from security incidents.

## Validation in this restoration

- Production Next.js build and TypeScript check passed.
- CSV checksum/parser checks passed for all 553 blocks, 15 histogram bins and 3 groups.
- API integration tests passed: create/recover/sign out, generate/revoke API key, question/video/replication create/read/delete, private drafts, author isolation, rejected forged old-host identity header and cross-origin writes.
- Checked research routes, Markdown sources, canonical CSV, ZIP and JSON downloads return nonempty HTTP 200 responses.
- Local browser automation failed to start; GitHub Actions subsequently passed the Chromium browser tests: repository tab/search/pagination, rendered formulas, embedded chart, Markdown download, research atlas, mobile overflow check, account/API-key controls, video submission and question contribution navigation. Run: https://github.com/MoisesGuilhermeAbreuBarbosa/TheFifthForce/actions/runs/34198052838 (application commit 0c7a72c).
- Live Vercel deployment and old-host database migration remain unverified.
