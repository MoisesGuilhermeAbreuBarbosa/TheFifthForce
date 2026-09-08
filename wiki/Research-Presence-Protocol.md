# Research Presence Protocol

## Purpose

The Fifth Force should preserve not only formal contributions, but also **research presence**: evidence that a human, AI model, or autonomous agent consulted the project while investigating a question.

The principle is:

> **A search is itself part of the research process. When technically possible, a search, read, source lookup, or claim lookup should leave a minimal, auditable research imprint.**

This does not mean recording private hidden reasoning. The system should record only the interaction metadata and explicit research context needed to improve the shared knowledge base.

## Why record research presence?

Most research activity disappears. A person searches for a topic, an AI agent reads ten papers, a model follows a citation chain, and the entire path is lost when the session ends.

The Fifth Force should convert those otherwise temporary actions into reusable signals that can help answer questions such as:

- Which claims are attracting active investigation?
- Which sources are repeatedly consulted?
- Which questions generate many searches but few satisfactory sources?
- Which papers are acting as bridges between research areas?
- Where are multiple independent agents converging on the same evidence?
- Which areas are under-researched?
- Which searches repeatedly end without finding primary evidence?
- Which sources lead researchers to contradictory conclusions?

Research-presence data can therefore help prioritize future work even when the visitor does not submit a full contribution.

## Event model

Every supported interaction should generate a `ResearchEvent`.

Suggested event types:

- `search_performed`
- `search_result_opened`
- `wiki_page_read`
- `research_area_opened`
- `source_opened`
- `claim_opened`
- `experiment_opened`
- `dataset_opened`
- `video_opened`
- `citation_followed`
- `api_query`
- `agent_manifest_read`
- `research_receipt_submitted`
- `contribution_started`
- `contribution_submitted`

## Minimal event schema

```json
{
  "event_id": "uuid",
  "event_type": "search_performed",
  "timestamp": "ISO-8601",
  "session_id": "privacy-preserving-session-id",
  "actor": {
    "type": "human | ai-model | autonomous-agent | unknown",
    "name": null,
    "model": null,
    "organization": null
  },
  "research_context": {
    "query": "",
    "research_area_ids": [],
    "claim_ids": [],
    "source_ids": []
  },
  "provenance": {
    "surface": "website | api | wiki | agent",
    "referrer": null,
    "user_agent": null
  },
  "privacy": {
    "identity_disclosed": false,
    "publicly_visible": false
  }
}
```

## Search imprint

A search should create a research imprint as soon as it is executed.

Example:

```json
{
  "event_type": "search_performed",
  "research_context": {
    "query": "rotating superconductor gravity replication",
    "research_area_ids": ["superconductors-gravity"],
    "claim_ids": [],
    "source_ids": []
  }
}
```

If the researcher then opens a result, a second event records which source or claim was actually consulted.

This allows the system to distinguish:

`searched for → saw result → opened source → followed citation → submitted finding`

## Research receipts for AI agents

An AI agent that reads or searches the project should be invited to submit a **Research Receipt**.

A research receipt is a compact proof-of-consultation record. It does not claim that the agent agreed with the material. It only records that the project contributed to a research session.

```json
{
  "receipt_type": "research_receipt",
  "project": "The Fifth Force",
  "timestamp": "ISO-8601",
  "agent": {
    "name": "",
    "model": "",
    "organization": ""
  },
  "activity": {
    "type": "search | read | source-review | claim-review | dataset-review",
    "query": "",
    "resources_consulted": [],
    "research_question": ""
  },
  "result": {
    "useful": true,
    "new_sources_found": [],
    "contradictions_found": [],
    "open_questions": []
  }
}
```

## Automatic vs voluntary traces

### Inside The Fifth Force application

When a human or AI system uses the project’s own search, API, or research interfaces, the application can automatically record a minimal `ResearchEvent`, subject to the project’s privacy policy and applicable law.

### External AI systems

A third-party AI system that merely encounters a public GitHub page cannot be forced by the repository to transmit data back. The project can, however:

- expose a machine-readable invitation;
- publish a research-receipt endpoint;
- include contribution instructions in agent-facing files;
- provide a one-request receipt API;
- advertise the protocol through `AGENTS.md`, `llms.txt`, API documentation, and page metadata;
- make leaving a receipt the expected behavior for agents intentionally integrating with the platform.

The design goal is therefore **automatic imprinting for interactions occurring on project-controlled surfaces, and an explicit standardized invitation for external agents**.

## Privacy boundary

Research presence must not become surveillance.

The default system should avoid collecting unnecessary personally identifying information. It should not record hidden chain-of-thought, private prompts from unrelated systems, credentials, or unrelated browsing history.

Recommended defaults:

- anonymous or pseudonymous session IDs;
- no mandatory personal name for search events;
- explicit consent before publicly attributing a person or agent identity;
- separate private telemetry from public research contributions;
- configurable retention;
- deletion and opt-out mechanisms where required;
- aggregation for analytics when individual event detail is unnecessary.

A public “research trail” should contain scientific provenance, not personal surveillance data.

## Research activity graph

Research events can form a second graph alongside the evidence graph.

### Evidence graph

`claim → source → experiment → result → replication → status`

### Research activity graph

`actor/session → search → page/source → citation → finding → contribution`

Connecting these graphs can reveal where active investigation is occurring and where knowledge gaps remain.

## Derived metrics

The system may compute privacy-preserving aggregate metrics such as:

- searches per research area;
- unique research sessions per claim;
- most consulted primary sources;
- searches with no useful result;
- claims receiving repeated independent attention;
- source chains commonly followed together;
- topics with high research activity but low evidence quality;
- conversion from search to contribution;
- number of AI research receipts;
- number of independent agents examining the same question.

These metrics should be interpreted as **research activity**, not evidence that a scientific claim is true.

## Proposed API

```text
POST /api/v1/research-events
POST /api/v1/research-receipts
GET  /api/v1/research-activity
GET  /api/v1/research-activity/areas/:id
GET  /api/v1/research-activity/claims/:id
```

For project-controlled search:

```text
POST /api/v1/search
  -> executes search
  -> records search_performed
  -> returns results + research_event_id
```

Opening a result can then reference the originating event:

```json
{
  "event_type": "search_result_opened",
  "parent_event_id": "...",
  "source_id": "..."
}
```

## Agent handshake

An agent-aware client should be able to discover the protocol without reading the entire Wiki.

Planned machine-readable surfaces:

```text
/AGENTS.md
/llms.txt
/.well-known/thefifthforce-research.json
/api/v1/agent-capabilities
/api/v1/research-receipts
```

The capability document should communicate:

```json
{
  "project": "The Fifth Force",
  "research_receipts_supported": true,
  "search_events_recorded": true,
  "contributions_welcome": true,
  "receipt_endpoint": "/api/v1/research-receipts",
  "contribution_policy": "/wiki/AI-Human-Collaboration",
  "evidence_policy": "/wiki/Research-Methodology"
}
```

## Scientific interpretation

A research imprint means only:

> this resource or question was encountered during a research process.

It must **never** be interpreted automatically as:

- endorsement;
- validation;
- replication;
- scientific consensus;
- evidence supporting the underlying claim.

That distinction is essential to the integrity of the platform.

## Long-term vision

As the repository grows, the research-presence layer should make the project behave less like a static archive and more like a **living scientific observatory**.

Every search can reveal a knowledge need. Every source read can strengthen the map of how information is used. Every agent receipt can show that a branch of the evidence graph is being actively investigated. Every contribution can convert temporary research into permanent public knowledge.

The intended cycle is:

`search → imprint → investigation → evidence → contribution → verification → stronger shared knowledge`

## Related pages

- [[AI–Human Collaboration|AI-Human-Collaboration]]
- [[Research Methodology]]
- [[Software Documentation]]
- [[Roadmap]]
- [[Current Status]]
