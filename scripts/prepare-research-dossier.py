"""Generate dossier exports and Wiki copies from one canonical chapter set."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
DOSSIER = ROOT/'public/research/dossier'
manifest = json.loads((DOSSIER/'manifest.json').read_text())
combined = ['# Coherence and Force Discrimination — Complete Research Dossier\n\nRevision 1.0 · 11 September 2026\n\nResearch proposals and mathematical benchmarks. No new physical detection.\n']
base = 'https://github.com/MoisesGuilhermeAbreuBarbosa/TheFifthForce/blob/main/'
for chapter in manifest['chapters']:
    text = (DOSSIER/(chapter['slug']+'.md')).read_text()
    combined.append(text)
    generated = ('<!-- Generated from public/research/dossier/'+chapter['slug']+'.md; edit canonical source. -->\n\n'
                 + text + '\n\n---\n\n[Canonical editable chapter]('+base+'public/research/dossier/'+chapter['slug']+'.md) · [[Research-Dossier]] · [[Research-Dossier-Sources]]\n')
    (ROOT/'wiki'/(chapter['wiki']+'.md')).write_text(generated)
    (ROOT/'public/wiki'/(chapter['wiki']+'.md')).write_text(generated)
(DOSSIER/'complete-dossier.md').write_text('\n\n---\n\n'.join(combined))
(DOSSIER/'verify-research-dossier.py').write_text((ROOT/'scripts/verify-research-dossier.py').read_text())
for name in ['_Sidebar','Current-Status','Home','Quantum-Advances','QAGRA','Roadmap']:
    (ROOT/'public/wiki'/(name+'.md')).write_text((ROOT/'wiki'/(name+'.md')).read_text())
print(f'Prepared {len(manifest["chapters"])} chapters, complete Markdown, Wiki copies and verifier download.')
