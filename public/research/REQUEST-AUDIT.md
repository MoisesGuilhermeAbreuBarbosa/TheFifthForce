# Audit of the original requests

Reviewed 5 September 2026. This audit records completion evidence and unresolved requirements. The project is not ready to be handed over as a fully completed gravity-control platform.

| Original request | Current state | Evidence or remaining work |
|---|---|---|
| Find research and keep links in database format | Partial | Thirty curated legacy sources, five newer updates and thirteen institutional entry points. JSON/API available. This is not all research worldwide; legacy summaries need a fresh source-by-source audit. |
| Explain mass and develop physical principles | Drafts available | Earlier conceptual papers retained as unreviewed text. They do not establish a way to neutralize gravitational mass. |
| Develop a working engineering theory/device | Unresolved scientific problem | No experimentally validated gravity-control device or engineering specification has been established. |
| Derive finite source–controller–probe equations | Partial | Nonlinear equations are documented. An independent physical controller action and calibrated controller states are missing. |
| Solve real geometry | Limited benchmark completed | Slotted-cylinder Yukawa quadrature checked analytically; probe positions are assumptions, not recovered metrology. |
| Calculate coupled dynamical spectrum | Partial | Constant-mass Proca benchmark completed. The full constrained scalar–vector spectrum is not solved. |
| Fit actual experiments and recalibrate | Completed within stated model | Panda data hashes and 553-row likelihood rerun successfully on 5 September. Geometry normalization is a surrogate, not measured calibration. |
| Find stable parameters surviving all constraints | Not established | Missing environmental screening calculations and an identifiable likelihood prevent a defensible global claim. |
| Resolve failures and redo simulations | Partial | Numerical consistency checks, shared nuisance treatment and identifiability limits addressed. Missing physical inputs cannot be repaired by choosing convenient numbers. |
| Retrieve Eöt-Wash torque/geometry/covariance | Not obtained | Original supplemental tables and the required complete metrology are still absent. Equivalent Panda acceleration data are available with explicitly documented gaps. |
| Watch for new fifth-force datasets | Active | Existing watch confirmed enabled; do not create a duplicate. |
| Free repository, papers and graphics | Implemented on current private host | Working paper, numerical plot, source downloads, JSON register and original draft archives exist. |
| Anonymous author | Implemented in project content | Pseudonymous contribution IDs; hosting/sign-in providers still know their account holders. |
| Human and AI contributions | Implemented, migration pending | Area-tagged posts, papers, reviews and replications; self-service API keys on current host. External agents must supply their own inference. |
| Segregate theory, laboratory and engineering | Implemented | Three research areas and area-tagged submissions. |
| Independent instances evaluate research | Not automated | API and tasks exist; no continuous independent agent workforce is running. AI agreement would not replace experimental evidence. |
| Entirely web-based and free | Partial | Browser interface and free repository API; usage limits apply. Zero maintenance, unlimited inference and guaranteed absence of breaches cannot be promised. |
| Research all four supplied videos | Partial | All four metadata records checked; source paper identified for the Hossenfelder video; speech and claim timestamps not yet audited. |
| Generate transcripts if captions unavailable | In progress | Caption retrieval tool, browser audio-to-text tool and caption importer built. Caption parsing/export passed; Whisper transcribed a synthetic fixture with correct words and timestamps on CPU. Actual supplied video audio remains unavailable. Browser end-to-end acceptance remains pending; no video transcript is claimed. |
| Renowned institutions worldwide | Directory implemented | Thirteen verified primary entry points; no affiliation or endorsement asserted. |
| Reach institutions | Not sent | No outreach delivered. Recipients and exact messages must be resolved before sending. |
| Automatically formulate sourced posts | Implemented with limitations | Deterministic source templates, private saved drafts and on-site publishing; arbitrary natural-language research instructions are not yet a model-backed service. |
| Automatically post to social networks | Not connected | No authorized social destinations/credentials. No background external publisher is active. |
| Remove 1981.chatgpt.site | Not completed | Cloudflare and Netlify alternatives researched; neither deployment account is confirmed connected. Migration requires its own database and replacement sign-in, not copying the trusted Sites authentication headers. |
| Rich notation, including direct paper links | Corrected and privately deployed | Eight pre-rendered equations, real HTML tables, local math fonts and UTF-8. Legacy /research/REPORT.md redirects to the typeset paper. Source download has a separate filename. |
| Check everything before providing a new link | Release withheld | No replacement-host URL is to be presented as complete until outstanding functional checks pass and remaining scientific limits are explicitly accepted as open research. |

## Release checks

- Preserve the existing private site until a new deployment is functional.
- Verify the replacement address, independent authentication, API-key creation/revocation, author-only deletion, quotas and database persistence on the new host.
- Test audio decoding, speech-model loading, timestamped transcription, cancellation and export on supported browsers. A synthetic speech check is a software test, not evidence for any video claim.
- Obtain lawful source audio or user-supplied captions for each video; audit scientific claims against primary publications. Keep raw third-party transcript redistribution separate from original research summaries.
- Connect an explicitly authorized social destination before claiming automatic distribution. Preserve source citations and uncertainty in outgoing text.
- Keep uncompleted nonlinear physics calculations labeled as open problems; never convert absence of data into a detection or engineering success.

## Verification completed in this audit

- Reproduced the Panda fit, data hashes and numerical checks.
- Built the entire site and transcription worker successfully.
- Checked the generated paper HTML for UTF-8, eight rendered equations and actual table elements; the obsolete raw static asset is absent.
- Checked SRT/VTT parsing, clip offsets, invalid-cue rejection and SRT round-trip export.
- Ran Whisper tiny.en against independently synthesized speech. It returned the sentence “Gravity measurements require careful experiments and independent verification.” with segment timestamps. This is software validation on CPU, not a video transcript or browser-WASM verification.
- Retried public captions for all four supplied videos: all four returned no text.
- An isolated compiled-Worker request check could not finish because the execution environment cancelled its network approval. Do not label deployment request routing or browser end-to-end testing as independently verified by that attempt.
- The new-host migration and real external social delivery have not been tested because those services are not connected.

## CSV visualization update

The three Panda files now have interactive chart/table viewers at the data route. Figure 3a plots every deposited row with its reported uncertainty; Figure 3b shows the released histogram and evaluates symbolic square-root uncertainties without executing expressions; Figure 3d parses the three Around values into means and error bars. Original CSV files and hashes are unchanged. Paper and repository reading links open the viewers; original downloads and primary-source links remain available. Table search does not alter the chart. Browser interaction testing remains pending.
