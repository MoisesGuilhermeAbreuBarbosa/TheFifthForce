"""Build linked Markdown and Wiki exports from the canonical frontier records."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
folder=root/'public/research/frontiers'
records=json.loads((folder/'investigations.json').read_text())
sources={s['id']:s for s in json.loads((root/'public/research/literature.json').read_text())}
index=['# Research Frontiers\n\nSix proposed investigation designs · 13 September 2026\n\nAI-assisted proposals, not peer-reviewed findings or new physical detections.\n']
for x in records:
    refs='\n'.join(f"- [{id}: {sources[id]['topic']}]({sources[id]['source']})" for id in x['sources'])
    content=f"# {x['title']}\n\n{x['id']} · {x['status']} · {x['date']}\n\nAI-assisted research design; not peer reviewed. No new experimental result.\n\n{x['body']}\n\n## Sources\n\n{refs}\n"
    (folder/(x['slug']+'.md')).write_text(content)
    index.append(f"## {x['id']} — {x['title']}\n\n{x['summary']}\n\n[Read the complete investigation](https://anti-gravity-site-rev02.vercel.app/investigations/{x['slug']}) · [Editable source](https://github.com/MoisesGuilhermeAbreuBarbosa/TheFifthForce/blob/main/public/research/frontiers/{x['slug']}.md)\n")
text='\n'.join(index)+'\n## Source library\n\n[Search the 96-record library](https://anti-gravity-site-rev02.vercel.app/literature). New annotations cover primary abstracts and landing pages, not independent replication.\n'
for d in ['wiki','public/wiki']:(root/d/'Research-Frontiers.md').write_text(text)
print('Prepared six dossiers and Wiki index.')
