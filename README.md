# OPEN FIELD — portable collaborative research app

The original interactive application is the foundation again, with the expanded Rev02 research register, embedded data, equations and a separate video-submission page. Source is in this GitHub repository, so development does not depend on any particular ChatGPT conversation or model quota.

## Run locally

Requires Node 22.13+ and Python 3.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. No database or authentication environment variables are required. GitHub stores public contributions; browser-local newsroom drafts can be exported.

For a production build: `npm run build`, then `npm start`. Integration tests: `node scripts/test-app.mjs` starts a temporary server, runs the GitHub protocol and route checks, then cleans up. `npm test` alone targets an already-running development server. Never point tests at production.

Browser tests also run in GitHub Actions. To run them locally after a build: `npx playwright install chromium`, then `BROWSER_TESTS=1 node scripts/test-app.mjs`. These prepare GitHub drafts without submitting real issues. Browser support and model downloads are required for the separate audio-transcription tool.

## Vercel

Use the **existing** project, connect this repository, select Next.js and the repository root, and clear earlier static output/build overrides. `vercel.json` selects Next.js. Preview this branch before merging it into the production branch.

Connect GitHub and track `restore/interactive-app` as the production branch (or merge it into your chosen production branch). A successful build updates the production domain. Immutable deployment URLs continue to show their original build.

## GitHub storage and contribution accounts

- Papers, CSV data, source registers, code and documentation are versioned repository files.
- Contributions, new questions, video suggestions and reply threads use GitHub Issues. Issues is enabled; Discussions was not enabled when this switch was made.
- The website prepares a draft and opens GitHub for sign-in, review and publication. No GitHub credential is entered into the website.
- The public feed uses GitHub's read API with a two-minute cache. Rate limits or outages show a direct GitHub fallback. This is not an instantaneous database feed.
- Authorized agents can use GitHub's Issues API and propose canonical changes through pull requests. Old site-issued recovery/API keys are retired.
- Private newsroom drafts stay in the browser; export them for backup. They are not synchronized between devices. No automatic social posting runs.
- Existing content in any earlier hosted database has not been migrated by this change.

No Turso or Vercel Storage service is needed. All public GitHub contributions are unreviewed until assessed; contributor usernames are public. Public API limits and hosting free-tier limits still apply.

## Project map

- `app/`, `lib/`, `components/`: original interactive UI, portable API and account implementation
- `public/research/`: canonical paper, 76-source literature register, data and reproducibility assets
- `public/assets/data/`: Rev02 atlas (150 subjects / 3,000 candidate mappings) and exports
- `public/rev02/`: archived static page presentations; canonical navigation is the interactive app
- `tools/transcription/`: source for the browser audio transcription tool
- `docs/FUNCTIONAL-AUDIT.md`: restoration audit and outstanding hosting/data migration limitations
- `tests/integration.test.mjs`: retired endpoint, read-only API, data and route checks
- `wiki/`: original GitHub wiki source, preserved

To recover development, clone this repository, install the lockfile dependencies and run the commands above. Community discussions remain in GitHub Issues. A new AI session can read this README and the audit to continue.

## Scientific status

No reproducible result here establishes gravity shielding or control. Candidate sources and subject mappings are not validated conclusions. Human and AI submissions are public unreviewed contributions; canonical research changes go through Git review.

## Website Wiki and update timing

`/wiki` reads the native GitHub Wiki with a 120-second server cache and renders internal wiki links within the site. A versioned snapshot in `public/wiki/` provides an explicitly labeled fallback during upstream failures. New pages linked from the native sidebar appear in navigation. Editing links sit at the bottom of each page. The existing main-branch wiki publisher can overwrite native edits from `wiki/`; keep the source files aligned.

Code/research file commits on `restore/interactive-app` trigger Vercel production builds. GitHub Issues are read at runtime, and the visible community feed refreshes every two minutes and on returning to the tab. No scheduled deployment is needed for contributions. Native Wiki updates are fetched on subsequent page requests; an already open Wiki page needs a reload.

## Interface completion

Home is a dedicated landing view. Shared navigation includes consistent icons, a subtle Home link, Literature, and Quantum Advances. `/repository` and `/literature` are separate pages. Literature combines the curated file with a separately labeled incoming GitHub paper/reference feed and a reference-submission form. Publishing still finishes on GitHub; submissions do not become curated evidence automatically.

`/documents/[slug]` presents typeset archived papers, Markdown equations, numerical data charts or readable source code as appropriate. Original downloads use `/api/documents/[slug]/raw`; legacy early-paper text links redirect to the rich readers. Original assets remain in GitHub.
