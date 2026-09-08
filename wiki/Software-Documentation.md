# Software Documentation

This page defines the target software documentation structure for **The Fifth Force**. It should evolve alongside the production codebase.

## 1. Repository

Repository: `MoisesGuilhermeAbreuBarbosa/TheFifthForce`

Primary responsibilities of the repository:

- application source code;
- database schema and migrations;
- research-ingestion logic;
- API implementation;
- contribution workflows;
- research-presence and provenance logging;
- test suites;
- deployment configuration;
- Wiki source and synchronization workflow.

## 2. Intended product surfaces

The platform is expected to expose the following major surfaces:

### Research home
A navigable overview of research areas, current evidence status, recent additions, active questions, and current research activity.

### Research areas
Dedicated pages for each field with linked sources, experiments, claims, replications, formulas, datasets, videos, and research-presence metrics.

### Literature Register
A structured source catalog with filtering, provenance, citation metadata, and evidence links.

### Research Repository
A searchable collection of papers, reports, patents, datasets, equations, media, and archival material.

### Open Questions
A contribution-oriented interface allowing users to post questions, add evidence, propose experiments, and discuss unresolved issues.

### Videos
A dedicated embedded-video library with metadata, transcripts or transcript references, extracted claims, and user submissions.

### Newsroom
A continuously refreshed research-intelligence feed connected to permanent source and claim records.

### For Agents
Machine-readable documentation for AI systems interacting with the research database and API, including the research-receipt protocol.

### Wiki
The GitHub Wiki provides project documentation, roadmap, current status, scientific background, evidence policy, research-presence protocol, and development documentation.

## 3. Canonical data model

The software should avoid storing research information as disconnected page text. Core entities should use stable identifiers.

Suggested entities:

- `ResearchArea`
- `Source`
- `Claim`
- `Experiment`
- `Replication`
- `Researcher`
- `Organization`
- `Dataset`
- `Formula`
- `Patent`
- `Video`
- `OpenQuestion`
- `Contribution`
- `EvidenceLink`
- `ResearchEvent`
- `ResearchReceipt`
- `ResearchSession`

### Source
Minimum fields:

- stable ID;
- title;
- authors;
- publication/institution;
- publication date/year;
- source type;
- DOI;
- canonical URL;
- archive URL where relevant;
- abstract/summary;
- primary vs. secondary;
- evidence classification;
- linked research areas;
- linked claims;
- attachments;
- provenance metadata.

### Claim
Minimum fields:

- stable ID;
- normalized claim text;
- claimant/source;
- research area;
- supporting evidence;
- contradicting evidence;
- replication status;
- current evidence status;
- uncertainty/notes;
- revision history.

### Experiment
Minimum fields:

- stable ID;
- apparatus;
- methodology;
- independent variable;
- measured quantity;
- reported effect size;
- uncertainty;
- controls;
- raw data availability;
- conventional-force analysis;
- result;
- replication links.

### ResearchEvent
A `ResearchEvent` records that a research interaction occurred on a project-controlled surface.

Minimum fields:

- event ID;
- event type;
- timestamp;
- privacy-preserving session ID;
- actor type: human / AI model / autonomous agent / unknown;
- optional declared model or agent identity;
- research query where applicable;
- linked research areas;
- linked claims;
- linked sources;
- parent event ID for event chains;
- interaction surface: website / API / Wiki / agent;
- privacy and visibility flags.

Typical event types:

- `search_performed`;
- `search_result_opened`;
- `wiki_page_read`;
- `source_opened`;
- `claim_opened`;
- `experiment_opened`;
- `dataset_opened`;
- `citation_followed`;
- `api_query`;
- `research_receipt_submitted`;
- `contribution_submitted`.

### ResearchReceipt
A `ResearchReceipt` is a voluntary structured return message from an AI model, autonomous agent, or researcher indicating that project material was used during a research session.

It should record, when available:

- research question;
- resources consulted;
- agent/model identity if voluntarily disclosed;
- new sources found;
- findings;
- evidence relationship;
- contradictions;
- uncertainties;
- replication information;
- datasets/code;
- open questions;
- recommended next steps;
- timestamp.

A research receipt is **proof of consultation, not endorsement or validation**.

## 4. Evidence relationships

The database should support explicit relationships such as:

- source **supports** claim;
- source **contradicts** claim;
- experiment **tests** claim;
- replication **reproduces** experiment;
- replication **fails to reproduce** experiment;
- source **references** source;
- researcher **authored** source;
- organization **conducted** experiment;
- dataset **belongs to** experiment;
- video **discusses** claim;
- open question **arises from** claim;
- research event **consulted** source;
- search event **targeted** research area;
- research receipt **references** research event or session.

This graph is central to the project.

## 5. Research-presence architecture

The system should maintain two related graphs:

### Evidence graph

`research area → claim → source → experiment → result → replication → current status`

### Research activity graph

`actor/session → search → result → source/page → citation → finding → contribution`

The activity graph shows **where research is happening**. It must never be treated as evidence that a scientific claim is true.

### Mandatory project-controlled search imprint

Every search performed through The Fifth Force application should create a `search_performed` event before or atomically with returning the results.

Conceptual flow:

```text
POST /api/v1/search
  1. validate query
  2. create ResearchEvent(type=search_performed)
  3. execute search
  4. attach matched research-area / claim / source IDs when available
  5. return search results + research_event_id
```

When a result is opened:

```text
search_performed
    ↓
search_result_opened
    ↓
source_opened / claim_opened / experiment_opened
    ↓
citation_followed
    ↓
research_receipt_submitted or contribution_submitted
```

This creates a durable research trail from question to evidence.

## 6. API principles

The public API should be:

- versioned;
- read-first;
- stable-ID based;
- provenance preserving;
- filterable;
- paginated;
- machine-readable;
- explicit about evidence status;
- capable of returning the research-event ID associated with project-controlled searches.

Example resource families:

- `/api/v1/research-areas`
- `/api/v1/sources`
- `/api/v1/claims`
- `/api/v1/experiments`
- `/api/v1/replications`
- `/api/v1/researchers`
- `/api/v1/organizations`
- `/api/v1/open-questions`
- `/api/v1/videos`
- `/api/v1/datasets`
- `/api/v1/search`
- `/api/v1/research-events`
- `/api/v1/research-receipts`
- `/api/v1/research-activity`
- `/api/v1/agent-capabilities`

## 7. Contribution model

User contributions should not directly overwrite canonical scientific status.

Recommended workflow:

1. contribution submitted;
2. source/provenance validation;
3. duplicate detection;
4. evidence-type classification;
5. moderator/reviewer assessment;
6. canonical record updated;
7. revision/audit trail preserved.

Research events and receipts should remain distinct from reviewed canonical scientific contributions.

## 8. AI-agent integration

Agents should operate under explicit rules:

- never invent citations;
- distinguish source statements from project conclusions;
- prefer primary sources;
- preserve DOI/canonical URL;
- identify contradictory evidence;
- flag unreplicated positive claims;
- never upgrade evidence status without supporting records;
- preserve uncertainty;
- emit stable identifiers when interacting with the API;
- leave a research receipt when technically possible after consulting project resources.

Agent-discovery surfaces in the repository include:

- `/AGENTS.md`;
- `/llms.txt`;
- `/.well-known/thefifthforce-research.json`;
- `wiki/AI-Human-Collaboration.md`;
- `wiki/Research-Presence-Protocol.md`.

Future production surfaces should expose the same protocol through:

- `/api/v1/agent-capabilities`;
- `/api/v1/research-receipts`.

## 9. Privacy and research telemetry

Research presence must be designed as scientific provenance, not surveillance.

Default requirements:

- use pseudonymous or anonymous session identifiers where possible;
- do not require a personal identity for a search event;
- do not record hidden chain-of-thought;
- do not collect unrelated private prompts, credentials, or browsing history;
- separate private telemetry from publicly visible research contributions;
- allow aggregation for analytics;
- support retention controls and deletion/opt-out mechanisms where legally required;
- require explicit disclosure before publicly attributing a human or agent identity when appropriate.

## 10. Wiki synchronization

The repository keeps Markdown Wiki source under `wiki/` so changes can be reviewed through normal Git history. A GitHub Actions workflow publishes these pages to the repository’s native Wiki Git repository after GitHub initializes the Wiki.

The canonical native-Wiki homepage is `Home.md`. `_Sidebar.md` defines navigation.

## 11. Deployment documentation

As the application code is consolidated, this page should document:

- runtime/framework;
- package manager;
- local development commands;
- environment variables;
- database provider;
- migrations;
- build pipeline;
- Vercel project/deployment configuration;
- authentication;
- storage;
- background jobs;
- search/indexing;
- research-event ingestion;
- observability;
- backup/recovery;
- production-release procedure.

## 12. Testing requirements

The finished system should include tests for:

- source ingestion;
- DOI/URL normalization;
- claim-source relationships;
- permission rules;
- contribution workflows;
- API contracts;
- search/filter behavior;
- automatic `search_performed` event creation;
- search-result event chaining;
- research-receipt validation;
- privacy-field behavior;
- database migrations;
- broken internal links;
- Wiki synchronization;
- production smoke tests.

## 13. Documentation rule

Software changes that alter the public API, data model, contribution model, deployment process, research-presence protocol, or research workflow should update the corresponding Wiki documentation in the same development cycle.

See [[Research Presence Protocol|Research-Presence-Protocol]] for the detailed event and receipt specification.