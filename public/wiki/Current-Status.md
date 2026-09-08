# Current Status

_Last updated: September 2026_

## Overall status

**The Fifth Force is in active reconstruction and expansion.**

The project has a defined research mission and an initial GitHub repository, but the complete website, database, collaboration system, API, and research interfaces are still being consolidated into this repository.

## Wiki

**Status: active build**

Completed source pages:

- Home
- Current Status
- Roadmap
- Software Documentation
- Research Methodology
- AI–Human Collaboration
- Research Presence Protocol
- Anti-Gravity overview
- Reference Library
- Wiki sidebar navigation

The initial Anti-Gravity bibliography is seeded from the same 50 numbered references used by the English Wikipedia article “Anti-gravity”, with additional evidence classification.

## AI–human research collaboration

**Status: mission and protocol defined; application implementation pending**

Completed in the repository:

- explicit AI–human collaborative research mission;
- machine-readable research invitation in the Wiki;
- `AGENTS.md` agent instructions;
- `llms.txt` discovery document;
- `.well-known/thefifthforce-research.json` capability manifest;
- structured Research Receipt schema;
- evidence/provenance rules for AI contributions.

The target is for humans, AI models, and autonomous agents to leave reusable research trails instead of allowing useful discoveries to disappear inside isolated sessions.

## Research presence / search imprints

**Status: protocol and data model defined; runtime instrumentation not yet implemented**

The target behavior is that every supported interaction on project-controlled surfaces creates a minimal `ResearchEvent`, including:

- search performed;
- search result opened;
- Wiki/research page read;
- source opened;
- claim opened;
- experiment or dataset opened;
- citation followed;
- API query;
- research receipt submitted;
- contribution submitted.

The application should automatically create a `search_performed` event when a search executes and return a `research_event_id` with the search results.

External AI systems that only encounter a public GitHub page cannot be technically forced to transmit data back. They are instead given an explicit standardized invitation to submit a Research Receipt when technically possible.

Research presence is **not scientific evidence**. It records that a question or resource was encountered during research, not that it was endorsed, validated, or reproduced.

## Research content

**Status: foundation established; major expansion required**

Available or initiated:

- anti-gravity scientific overview;
- antimatter-gravity evidence;
- equivalence-principle constraints;
- Biefeld–Brown / electrogravitics discussion;
- rotating-mass and gyroscope claims;
- superconducting-gravity claims;
- Ning Li / Douglas Torr literature;
- Podkletnov-related experimental history;
- NASA and U.S. Air Force research references;
- patents and historical programs;
- null-result and replication references;
- evidence classification framework.

Still required:

- expanded source discovery beyond the Wikipedia seed set;
- source-by-source verification against primary documents;
- structured claim extraction;
- replication graph;
- researcher and institution profiles;
- experimental parameter records;
- comprehensive historical-program archive;
- dedicated research-area pages.

## Literature Register

**Status: not yet implemented in this repository**

The literature register must become a searchable structured catalog rather than a static bibliography.

Priority capabilities:

- title/author/year search;
- research-area filtering;
- source-type filtering;
- DOI and canonical URL;
- primary/secondary classification;
- claim links;
- evidence status;
- replication status;
- attachments and datasets;
- citation export.

## Research repository

**Status: incomplete**

The target repository is broader than the current codebase. It should include or link:

- peer-reviewed papers;
- official technical reports;
- patents;
- archival documents;
- datasets and CSV files;
- formulas;
- experiment diagrams;
- research videos;
- transcripts;
- derived analyses.

## Open Questions

**Status: collaboration workflow not yet implemented**

The final interface must allow users to:

- add new research questions;
- contribute to existing questions;
- attach sources and evidence;
- propose experiments;
- add calculations or datasets;
- track question status and discussion history.

## Video library

**Status: dedicated implementation required**

The target design includes:

- a dedicated Videos page;
- embedded playback;
- metadata and source links;
- transcript handling;
- claim extraction;
- research-area tagging;
- user submission of new videos.

## Newsroom

**Status: redesign required**

The newsroom should function as a continuously refreshed research feed connected to permanent research records, rather than a static content list.

## For Agents

**Status: repository-level discovery defined; production API pending**

The agent interface now documents:

- machine-readable research invitation;
- source provenance requirements;
- evidence classifications;
- contribution rules;
- citation standards;
- Research Receipt format;
- Research Presence Protocol.

Still required:

- production `/api/v1/agent-capabilities` endpoint;
- production `/api/v1/research-receipts` endpoint;
- production `/api/v1/research-events` endpoint;
- automatic search/read event capture;
- receipt validation and moderation;
- agent attribution and privacy controls.

## Public API

**Status: specified in Wiki; not yet implemented in this repository**

The API should ultimately expose canonical records for sources, claims, experiments, research areas, people, institutions, open questions, videos, datasets, evidence relationships, research events, and research receipts.

## Software codebase

**Status: repository foundation only**

The GitHub repository currently contains the project foundation, machine-readable agent-discovery files, and Wiki-source documentation. The complete production website/application code and research database still need to be consolidated into this repository and documented here.

## Immediate priorities

1. Initialize and publish the native GitHub Wiki.
2. Expand the literature register beyond the initial 50-source seed set.
3. Define and implement the canonical database schema, including `ResearchEvent`, `ResearchReceipt`, and `ResearchSession`.
4. Consolidate the production website code into this repository.
5. Instrument application search so every project-controlled search creates a privacy-preserving research imprint.
6. Implement source/page/citation event chaining and the research-activity graph.
7. Implement AI Research Receipt and agent-capabilities endpoints.
8. Restore interactive research-area, open-question, repository, and agent functionality.
9. Rebuild the newsroom and dedicated video library.
10. Implement the evidence graph and public API.
11. Establish contribution, moderation, privacy, and provenance workflows.

See [[Roadmap]] for the staged implementation plan.
