import test from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://localhost:3000';
async function call(path,{method='GET',cookie='',key='',data}={}){const r=await fetch(base+path,{method,headers:{Origin:base,...(cookie?{Cookie:cookie}:{}),...(key?{Authorization:'Bearer '+key}:{}),...(data?{'Content-Type':'application/json'}:{})},...(data?{body:JSON.stringify(data)}:{})});let d;try{d=await r.json();}catch{d={};}return {r,d,cookie:r.headers.get('set-cookie')?.split(';')[0]};}
test('Account, recovery, API keys, contributions, questions, videos and private drafts',async()=>{
 const a=await call('/api/v1/session',{method:'POST',data:{action:'create'}});assert.equal(a.r.status,200);assert.match(a.d.recovery,/^ofr_/);assert.ok(a.cookie);
 const cookie=a.cookie;const k=await call('/api/v1/key',{method:'POST',cookie});assert.match(k.d.key,/^of_/);
 const basePost={title:'Independent validation submission',body:'Primary source and method recorded here. This is an integration test, not scientific evidence.',url:'https://example.org/research',area:'theory',task:'R01',agent:'Automated integration test'};
 for(const kind of ['question','video','replication']){const p=await call('/api/v1/posts',{method:'POST',key:k.d.key,data:{...basePost,kind}});assert.equal(p.r.status,201,JSON.stringify(p.d));const list=await call('/api/v1/posts?kind='+kind);assert.ok(list.d.items.some(x=>x.id===p.d.id));
 const other=await call('/api/v1/session',{method:'POST',data:{action:'create'}});const no=await call('/api/v1/posts?id='+p.d.id,{method:'DELETE',cookie:other.cookie});assert.equal(no.d.deleted,false);
 assert.equal((await call('/api/v1/posts?id='+p.d.id,{method:'DELETE',cookie})).d.deleted,true);}
 const research=await call('/api/v1/research');assert.equal(research.d.literature.length,76);
 const brief=await call('/api/v1/briefs',{method:'POST',cookie,data:{source_id:research.d.updates[0].id,intent:'invite-review'}});assert.equal(brief.r.status,201);assert.equal((await call('/api/v1/briefs',{cookie})).d.items.length,1);await call('/api/v1/briefs?id='+brief.d.id,{method:'DELETE',cookie});
 await call('/api/v1/key',{method:'DELETE',cookie});assert.equal((await call('/api/v1/posts',{method:'POST',key:k.d.key,data:{...basePost,kind:'post'}})).r.status,401);
 await call('/api/v1/session',{method:'DELETE',cookie});assert.equal((await call('/api/v1/session',{cookie})).d.id,null);
 const login=await call('/api/v1/session',{method:'POST',data:{action:'login',recovery:a.d.recovery}});assert.equal(login.d.id,a.d.id);
 const spoof=await fetch(base+'/api/v1/key',{method:'POST',headers:{Origin:base,'oai-authenticated-user-id':'spoof'}});assert.equal(spoof.status,401);
 const csrf=await fetch(base+'/api/v1/key',{method:'POST',headers:{Origin:'https://attacker.invalid',Cookie:login.cookie}});assert.equal(csrf.status,403);
});
test('Research files and primary routes are served',async()=>{for(const path of ['/','/account','/videos','/data','/research/REPORT-source.md','/research/REPORT-rendered.md','/research/reanalyse.py','/research/panda_fig3a.csv','/research/reproducibility.zip','/assets/data/research-atlas.json','/openapi.json','/llms.txt']){const r=await fetch(base+path);assert.equal(r.status,200,path);assert.ok((await r.arrayBuffer()).byteLength>0,path);}});
