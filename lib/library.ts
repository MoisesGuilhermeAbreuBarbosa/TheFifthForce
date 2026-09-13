import records from '@/public/research/literature.json';
export type Source = (typeof records)[number] & {authors?:string; reviewed_on?:string; review_scope?:string; doi?:string; investigations?:string[]};
export const sources:Source[] = records;
export function searchSources(query='',category='',evidence='',sort='register'){
 const terms=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 const found=sources.filter(s=>(!category||s.category===category)&&(!evidence||s.evidence===evidence)&&terms.every(t=>Object.values(s).join(' ').toLowerCase().includes(t)));
 if(sort==='newest')found.sort((a,b)=>Number(b.year)-Number(a.year));
 if(sort==='oldest')found.sort((a,b)=>Number(a.year)-Number(b.year));
 return found;
}
