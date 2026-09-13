"""Build the on-site source-note downloads and SQLite research database.
Canonical editorial records remain versioned in GitHub. This is a read-only
publication snapshot, rebuilt at each deployment, not a user-write service.
"""
import json
import sqlite3
from pathlib import Path

root = Path(__file__).resolve().parents[1]
folder = root / 'public/research/documentation'
folder.mkdir(parents=True, exist_ok=True)
records = json.loads((root / 'public/research/literature.json').read_text()) + json.loads((root / 'public/research/documentation-supplement.json').read_text())
investigations = json.loads((root / 'public/research/frontiers/investigations.json').read_text())
assert len({x['id'] for x in records}) == len(records)
db_path = folder / 'library.sqlite'
db_path.unlink(missing_ok=True)
db = sqlite3.connect(db_path)
db.execute('PRAGMA foreign_keys=ON')
db.executescript("""
CREATE TABLE metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE sources (id TEXT PRIMARY KEY, title TEXT NOT NULL, authors TEXT, year INTEGER, original_url TEXT NOT NULL, summary TEXT NOT NULL, notes_markdown TEXT NOT NULL, record_json TEXT NOT NULL);
CREATE TABLE investigations (slug TEXT PRIMARY KEY, title TEXT NOT NULL, status TEXT NOT NULL, body_markdown TEXT NOT NULL);
CREATE TABLE citations (investigation_slug TEXT REFERENCES investigations(slug), source_id TEXT REFERENCES sources(id), PRIMARY KEY(investigation_slug, source_id));
CREATE INDEX sources_year ON sources(year);
CREATE INDEX sources_title ON sources(title);
""")
db.executemany('INSERT INTO metadata VALUES (?,?)', [('schema_version','1.0'),('content_scope','Editorial source notes, not full copies of third-party publications'),('canonical_storage','GitHub versioned JSON'),('publication_date','2026-09-13')])
for x in records:
    note = f"""# {x['topic']}

{x['id']} · {x['year']} · {x.get('authors', 'Author metadata not yet verified')}

On-site editorial source notes. Not a reproduction of the original paper.

## Source summary

{x['result']}

## Claim and interpretation

{x['claim']}

**Interpretation to avoid:** {x['common_error']}

## What needs checking

{x['correction']}

**Replication record:** {x['replication']}

## Provenance and review scope

- Original classification: {x['category']} · {x['evidence']}
- Status: {x['status']}
- Review coverage: {x.get('review_scope', 'Inherited annotation; not re-audited in the September 2026 expansion.')}
- Last record check: {x.get('reviewed_on', 'Not recorded in the inherited register')}

## Original document — complementary information

[Original publication or source]({x['source']})

[Read these notes on the site](https://anti-gravity-site-rev02.vercel.app/literature/{x['id']})
"""
    (folder / (x['id'] + '.md')).write_text(note)
    db.execute('INSERT INTO sources VALUES (?,?,?,?,?,?,?,?)', (x['id'],x['topic'],x.get('authors'),x['year'],x['source'],x['result'],note,json.dumps(x,ensure_ascii=False)))
for x in investigations:
    db.execute('INSERT INTO investigations VALUES (?,?,?,?)', (x['slug'],x['title'],x['status'],x['body']))
    db.executemany('INSERT INTO citations VALUES (?,?)', [(x['slug'],id) for id in x['sources']])
db.commit()
assert db.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'
assert db.execute('PRAGMA foreign_key_check').fetchall() == []
assert db.execute('SELECT COUNT(*) FROM sources').fetchone()[0] == len(records)
(folder / 'library.sql').write_text('\n'.join(db.iterdump()) + '\n')
db.close()
(folder / 'records.json').write_text(json.dumps(records,indent=2,ensure_ascii=False) + '\n')
print(f'Prepared {len(records)} source-note pages/downloads and verified SQLite database with {len(investigations)} investigations.')
