import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const sources=JSON.parse(readFileSync(new URL('../public/research/literature.json',import.meta.url),'utf8'));
const base=process.env.TEST_BASE_URL||'http://localhost:3000';
test('GitHub storage protocol retires local accounts and writes',async()=>{
 for(const route of ['session','key','briefs'])for(const method of ['GET','POST','DELETE'])assert.equal((await fetch(base+'/api/v1/'+route,{method})).status,410);
 for(const method of ['POST','DELETE'])assert.equal((await fetch(base+'/api/v1/posts',{method})).status,405);
 const d=await (await fetch(base+'/api/v1/research')).json();assert.equal(d.literature.length,sources.length);assert.equal(d.storage,'GitHub');
 const spec=await (await fetch(base+'/openapi.json')).json();assert.ok(spec.paths['/api/v1/posts'].get);assert.equal(spec.paths['/api/v1/posts'].post,undefined);
});
test('Research files and primary routes are served',async()=>{for(const path of ['/','/account','/videos','/data','/repository','/literature','/documents/early-working-paper','/api/documents/early-working-paper/raw','/research/REPORT-source.md','/research/REPORT-rendered.md','/research/reanalyse.py','/research/panda_fig3a.csv','/research/reproducibility.zip','/assets/data/research-atlas.json','/openapi.json','/llms.txt']){const r=await fetch(base+path);assert.equal(r.status,200,path);assert.ok((await r.arrayBuffer()).byteLength>0,path);}});

test('Expanded library and research records retain valid relationships',async()=>{
 const d=await (await fetch(base+'/api/v1/library?q=Harrow')).json();assert.equal(d.total,1);assert.equal(d.items[0].id,'SRC-086');
 const all=await (await fetch(base+'/api/v1/library')).json();assert.equal(all.total,sources.length);assert.equal(new Set(all.items.map(x=>x.source)).size,all.total);
 const hypotheses=await (await fetch(base+'/research/frontiers/investigations.json')).json();assert.equal(hypotheses.length,6);
 for(const h of hypotheses){for(const id of h.sources)assert.ok(sources.some(x=>x.id===id),id);assert.equal((await fetch(base+'/investigations/'+h.slug)).status,200);assert.equal((await fetch(base+'/research/frontiers/'+h.slug+'.md')).status,200);}
});
