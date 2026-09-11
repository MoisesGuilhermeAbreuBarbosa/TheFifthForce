# Sources, attribution, and review limits

## Primary-source register

The sources below motivate or constrain the research. They do not validate a gravity-control device. The project-specific coherence coefficients, finite Gaussian derivation, experiment combinations, and implementation contracts are newly assembled research work, not quotations from these publications.

| ID | Source | Role in this dossier | Verification scope |
|---|---|---|---|
| S1 | Saldanha, Marletto, Vedral, *Repulsive Gravitational Force as a Witness of the Quantum Nature of Gravity*, arXiv:2602.12266 | Source superposition and postselection motivation | Abstract and accessible paper HTML consulted during review; proposal, not measured gravity repulsion |
| S2 | Ferrie and Combes, *Weak value amplification is suboptimal for estimation and detection*, arXiv:1307.4016 | Resource-aware metrology caution | Abstract consulted; conclusions depend on statistical assumptions |
| S3 | Knee, Combes, Ferrie, Gauger, *Weak-value amplification: state of play*, arXiv:1410.6252 | Context on amplification and metrology | Abstract consulted; not a universal verdict on every technical-noise regime |
| S4 | Panda et al., *Measuring gravitational attraction with a lattice atom interferometer*, Nature (2024), DOI 10.1038/s41586-024-07561-3 | Real experimental baseline | Existing project manuscript analysis and released CSVs; no new apparatus access |
| S5 | Lee et al., *New Test of the Gravitational 1/r² Law at Separations down to 52 μm*, arXiv:2002.11761 | Short-range force constraints | Primary abstract/record consulted; original torque data not recovered here |
| S6 | Touboul et al., *MICROSCOPE mission: final results of the test of the Equivalence Principle*, arXiv:2209.15487 | Composition-dependent acceleration constraints | Primary abstract consulted; model/environment matching still required |
| S7 | Nelson and Walsh, *Chameleon Vector Bosons*, arXiv:0802.0762 | Environment-dependent vector screening | Primary abstract plus project equation summary; no new full stability calculation |
| S8 | Brassard, Høyer, Mosca, Tapp, *Quantum Amplitude Amplification and Estimation*, arXiv:quant-ph/0005055 | Algorithmic basis for a candidate computational primitive | Abstract and bibliographic record consulted; no resource theorem applied to this apparatus |

## Direct links

- [S1 — quantum conditional-force proposal](https://arxiv.org/abs/2602.12266)
- [S2 — estimation and postselection](https://arxiv.org/abs/1307.4016)
- [S3 — weak-value metrology review](https://arxiv.org/abs/1410.6252)
- [S4 — Panda publication](https://doi.org/10.1038/s41586-024-07561-3)
- [S4-D — released Panda data, DOI 10.5281/zenodo.10995225](https://doi.org/10.5281/zenodo.10995225)
- [S4-M — accepted manuscript with methods](https://par.nsf.gov/servlets/purl/10525888)
- [S5 — inverse-square-law experiment](https://arxiv.org/abs/2002.11761)
- [S6 — MICROSCOPE final results](https://arxiv.org/abs/2209.15487)
- [S7 — screened vector theory](https://arxiv.org/abs/0802.0762)
- [S8 — amplitude amplification and estimation](https://arxiv.org/abs/quant-ph/0005055)

## Local source review

The review baseline was repository commit `10ce081c66973759a62ea21977459684eb65b4eb`, which matched `main` and `restore/interactive-app` when inspected. Sources included the current reanalysis, archived physics and engineering drafts, Wiki research/roadmap/provenance pages, QAGRA mathematical and architecture documents, literature register, atlas questions, video notes, and relevant browser/Python implementation.

The review did not independently read every externally linked publication in full. Native Wiki edits outside repository history, unexported previous databases, and production-only contributions may differ. No complete Vercel deployment verification or video viewing was inferred from repository access.

## Reanalysis provenance

The principal CSV file checksum is MD5 `df578555b01f75b3373d42d5336b8190`. It contains 553 numeric rows. Recalculation gives weighted mean 33.096184655936035 nm/s², chi-squared 587.0212109153017 for 552 degrees of freedom, scaled statistical uncertainty 5.610010301823207 nm/s², and total extra-force uncertainty 6.288705398296418 nm/s² with the existing shared-nuisance assumptions.

The accompanying histogram and three group summaries are related products, not extra independent observations to concatenate with the primary blocks. Preserve the published data credit and CC BY 4.0 attribution described in the original reanalysis. Numerical benchmark fixtures added here contain synthetic/analytic outputs and are labeled separately.

## Video evidence conflict

The four-entry retrieval-status file reports unverified transcripts. Three separate transcript-summary records point to secondary transcripts or primary-paper verification paths. These are not equivalent statuses. This release records the inconsistency and does not silently claim that full speech, quotations, or timestamps have been verified.

Future reconciliation should record video ID, source type, retrieval date, language, whether full text exists, whether speech was checked, whether text can be redistributed, and a claim-level source path. A paper linked by a video can support a scientific discussion without proving that the video said a particular sentence.

## Corrections and interpretation

Archived early drafts contain ideas later narrowed by the engineering discussion and real-data reanalysis. Later limitations take precedence where explicitly stated. Keep their historical identity rather than merging incompatible claims into one apparently settled theory.

The dossier's hypothesis IDs identify proposals, not discoveries. A mathematical match validates the implemented equations under their assumptions. A successful independent code reproduction remains computational replication. Experimental replication requires independently acquired physical measurements.

The static research receipt included with the dossier records this review and contribution. It does not claim an automatic external-agent reporting service exists. Human/AI attention counts should never be used as scientific evidence weights.

## How to contribute a correction

Identify the chapter and hypothesis/source ID; state the disputed assertion; give a precise primary reference or reproducible calculation; distinguish the source's claim from your inference; include parameter and unit conventions; and describe how the correction changes predictions or implementation. Preserve both the old and revised versions in repository history.
