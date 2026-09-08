import test from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://localhost:3000';
test('GitHub storage protocol retires local accounts and writes',async()=>{
 for(const route of ['session','key','briefs'])for(const method of ['GET','POST','DELETE'])assert.equal((await fetch(base+'/api/v1/'+route,{method})).status,410);
 for(const method of ['POST','DELETE'])assert.equal((await fetch(base+'/api/v1/posts',{method})).status,405);
 const d=await (await fetch(base+'/api/v1/research')).json();assert.equal(d.literature.length,76);assert.equal(d.storage,'GitHub');
 const spec=await (await fetch(base+'/openapi.json')).json();assert.ok(spec.paths['/api/v1/posts'].get);assert.equal(spec.paths['/api/v1/posts'].post,undefined);
});
test('Research files and primary routes are served',async()=>{for(const path of ['/','/account','/videos','/data','/research/REPORT-source.md','/research/REPORT-rendered.md','/research/reanalyse.py','/research/panda_fig3a.csv','/research/reproducibility.zip','/assets/data/research-atlas.json','/openapi.json','/llms.txt']){const r=await fetch(base+path);assert.equal(r.status,200,path);assert.ok((await r.arrayBuffer()).byteLength>0,path);}});
