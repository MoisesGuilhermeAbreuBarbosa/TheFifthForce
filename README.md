# OPEN FIELD — portable collaborative research app

The original interactive application is the foundation again, with the expanded Rev02 research register, embedded data, equations and a separate video-submission page. Source is in this GitHub repository, so development does not depend on any particular ChatGPT conversation or model quota.

## Run locally

Requires Node 22.13+ and Python 3.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The local SQLite database is created on first account/API access. Never commit databases, recovery keys, API keys or environment secrets.

For a production build: `npm run build`, then `npm start`. Integration tests: `node scripts/test-app.mjs` starts a temporary server and disposable database, runs the account/API checks, then cleans up. `npm test` alone targets an already-running development server. Never point tests at production.

## Vercel

Use the **existing** project, connect this repository, select Next.js and the repository root, and clear earlier static output/build overrides. `vercel.json` selects Next.js. Preview this branch before merging it into the production branch.

Configure `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` for a durable libSQL-compatible remote database. A local `file:` database is intentionally rejected on Vercel because serverless storage is not durable. Secrets belong only in Vercel environment settings. The schema is created idempotently on first use. See [Turso client documentation](https://docs.turso.tech/sdk/ts/reference).

This session has not connected the Vercel project or provisioned the database. Code restoration is not proof of a successful production deployment. Account recovery uses a random private recovery key, with separate revocable agent API keys. No paid AI service is required by the app.

## Project map

- `app/`, `lib/`, `components/`: original interactive UI, portable API and account implementation
- `public/research/`: canonical paper, 76-source literature register, data and reproducibility assets
- `public/assets/data/`: Rev02 atlas (150 subjects / 3,000 candidate mappings) and exports
- `public/rev02/`: archived static page presentations; canonical navigation is the interactive app
- `tools/transcription/`: source for the browser audio transcription tool
- `docs/FUNCTIONAL-AUDIT.md`: restoration audit and outstanding hosting/data migration limitations
- `tests/integration.test.mjs`: account, API ownership, data and route checks
- `wiki/`: original GitHub wiki source, preserved

Community content lives in the database, not in Git commits. Back up that database separately. To recover development, clone GitHub, install the lockfile dependencies, configure a database and follow the commands above. A new AI session can read this README and the audit to continue.

## Scientific status

No reproducible result here establishes gravity shielding or control. Candidate sources and subject mappings are not validated conclusions. Human and AI submissions are public unreviewed contributions; canonical research changes go through Git review.
