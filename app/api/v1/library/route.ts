import {searchSources} from '@/lib/library';
export function GET(request:Request){
 const p=new URL(request.url).searchParams;
 const items=searchSources((p.get('q')||'').slice(0,300),p.get('category')||'',p.get('evidence')||'',p.get('sort')||'register');
 return Response.json({version:'1.0',storage:'Versioned GitHub JSON',review_notice:'Source annotations are not independent replications. Consult each review_scope.',total:items.length,items},{headers:{'Access-Control-Allow-Origin':'*','Cache-Control':'public, max-age=300'}});
}
