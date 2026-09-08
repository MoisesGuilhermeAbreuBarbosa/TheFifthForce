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
- test suites;
- deployment configuration;
- Wiki source and synchronization workflow.

## 2. Intended product surfaces

The platform is expected to expose the following major surfaces:

### Research home
A navigable overview of research areas, current evidence status, recent additions, and active questions.

### Research areas
Dedicated pages for each field with linked sources, experiments, claims, replications, formulas, datasets, and videos.

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
Machine-readable documentation for AI systems interacting with the research database and API.

### Wiki
The GitHub Wiki provides project documentation, roadmap, current status, scientific background, evidence policy, and development documentation.

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
- open question **arises from** claim.

This graph is central to the project.

## 5. API principles

The public API should be:

- versioned;
- read-first;
- stable-ID based;
- provenance preserving;
- filterable;
- paginated;
- machine-readable;
- explicit about evidence status.

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

## 6. Contribution model

User contributions should not directly overwrite canonical scientific status.

Recommended workflow:

1. contribution submitted;
2. source/provenance validation;
3. duplicate detection;
4. evidence-type classification;
5. moderator/reviewer assessment;
6. canonical record updated;
7. revision/audit trail preserved.

## 7. AI-agent integration

Agents should operate under explicit rules:

- never invent citations;
- distinguish source statements from project conclusions;
- prefer primary sources;
- preserve DOI/canonical URL;
- identify contradictory evidence;
- flag unreplicated positive claims;
- never upgrade evidence status without supporting records;
- preserve uncertainty;
- emit stable identifiers when interacting with the API.

## 8. Wiki synchronization

The repository keeps Markdown Wiki source under `wiki/` so changes can be reviewed through normal Git history. A GitHub Actions workflow publishes these pages to the repository’s native Wiki Git repository.

The canonical native-Wiki homepage is `Home.md`. `_Sidebar.md` defines navigation.

## 9. Deployment documentation

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
- observability;
- backup/recovery;
- production-release procedure.

## 10. Testing requirements

The finished system should include tests for:

- source ingestion;
- DOI/URL normalization;
- claim-source relationships;
- permission rules;
- contribution workflows;
- API contracts;
- search/filter behavior;
- database migrations;
- broken internal links;
- Wiki synchronization;
- production smoke tests.

## 11. Documentation rule

Software changes that alter the public API, data model, contribution model, deployment process, or research workflow should update the corresponding Wiki documentation in the same development cycle.
