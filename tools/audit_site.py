#!/usr/bin/env python3
"""OPEN FIELD Rev02 static-site integrity audit. Standard library only."""
from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import csv, json, sys

ROOT = Path(__file__).resolve().parents[1]

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs=[]
    def handle_starttag(self, tag, attrs):
        d=dict(attrs)
        for attr in ('href','src','data-src'):
            v=d.get(attr)
            if v:
                self.refs.append((tag,attr,v))

def local_path(ref: str):
    if ref.startswith(('#','mailto:','tel:','javascript:')):
        return None
    p=urlparse(ref)
    if p.scheme or p.netloc:
        return None
    path=unquote(p.path)
    if not path:
        return None
    return ROOT / path.lstrip('/')

def check_html():
    missing=[]; checked=0; html_files=list(ROOT.rglob('*.html'))
    for hp in html_files:
        parser=LinkParser(); parser.feed(hp.read_text(encoding='utf-8',errors='replace'))
        for tag,attr,ref in parser.refs:
            lp=local_path(ref)
            if lp is None: continue
            checked += 1
            if not lp.exists():
                missing.append((str(hp.relative_to(ROOT)),attr,ref))
    return html_files,checked,missing

def check_atlas():
    p=ROOT/'assets/data/research-atlas.json'
    db=json.loads(p.read_text(encoding='utf-8'))
    inv=db.get('investigations',[]); src=db.get('sources',[]); maps=db.get('mappings',[])
    bad=[]
    for x in inv:
        mu=x.get('Mapped URLs')
        if not isinstance(mu,(int,float)):
            bad.append((x.get('Research ID'),mu))
    return len(inv),len(src),len(maps),bad

def check_csvs():
    out=[]
    for p in sorted((ROOT/'assets/data/panda').glob('*.csv')):
        with p.open(newline='',encoding='utf-8-sig') as f:
            rows=list(csv.reader(f))
        out.append((p.name,len(rows),max((len(r) for r in rows),default=0)))
    return out

def check_transcripts():
    base=ROOT/'transcripts'; missing=[]
    for i in range(1,4):
        for ext in ('html','md'):
            p=base/f'video-{i:02d}.{ext}'
            if not p.exists(): missing.append(str(p.relative_to(ROOT)))
    return missing

def check_required():
    required=[
        'README.md','index.html','repository.html','research/report.html','research/data.html',
        'publications/working-paper-01.html','publications/engineering-paper-02.html',
        'assets/js/csv-visualizer.js','assets/js/equations.js','assets/vendor/mathjax/tex-svg.js',
        'assets/data/Anti_Gravity_Research_Database.xlsx','assets/data/urls.csv','assets/data/urls.json',
        'assets/downloads/panda_fifth_force_reanalysis.zip'
    ]
    return [r for r in required if not (ROOT/r).exists()]

def main():
    html_files,nrefs,missing_links=check_html()
    n_inv,n_src,n_maps,bad_atlas=check_atlas()
    csvs=check_csvs(); trans=check_transcripts(); req=check_required()
    print('OPEN FIELD REV02 STATIC AUDIT')
    print(f'Root: {ROOT}')
    print(f'HTML pages: {len(html_files)}')
    print(f'Local HTML asset/link refs checked: {nrefs}')
    print(f'Missing local refs: {len(missing_links)}')
    for x in missing_links[:30]: print('  MISSING',*x)
    print(f'Atlas: {n_inv} investigations | {n_src} canonical sources | {n_maps} subject-source associations')
    print(f'Atlas nonnumeric Mapped URLs fields: {len(bad_atlas)}')
    for x in bad_atlas[:10]: print('  BAD_ATLAS',x)
    print('Panda CSV files:')
    for name,rows,cols in csvs: print(f'  {name}: {rows} rows, max {cols} columns')
    print(f'Missing transcript representations: {len(trans)}')
    for x in trans: print('  MISSING',x)
    print(f'Missing required recovery assets: {len(req)}')
    for x in req: print('  MISSING',x)
    bad = bool(missing_links or bad_atlas or trans or req or n_inv!=150 or n_src!=76 or n_maps!=3000)
    print('RESULT:', 'FAIL' if bad else 'PASS')
    return 1 if bad else 0

if __name__=='__main__':
    raise SystemExit(main())
