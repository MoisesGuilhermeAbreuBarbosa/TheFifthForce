import records from '@/public/research/literature.json';
type RecordSource=(typeof records)[number] & {authors?:string;reviewed_on?:string;review_scope?:string;doi?:string;investigations?:string[]};
export type Source=RecordSource & {research_field:string;record_type:string};
// Subject taxonomy is editorial navigation, never an evidence-quality score.
const fields:Record<string,number[]>={
 'Spacetime and energy conditions':[1,16,17,18,25,30,36,37,38,39,70,71],
 'Conventional forces and analogues':[2,6,13,72],
 'Propulsion claims and controls':[3,4,5,7,8,9,10,11,12,20,23,26,40,41,42,43,44,45,46,75,76],
 'Precision gravity and equivalence':[19,24,27,29,32,33,34,35,51,52,55,77,83,85],
 'Screened fields':[49,60,78,79,80,81,82,84],
 'Antimatter gravity':[21,28,56,57,58,59],
 'Quantum coherence and measurement':[14,15,22,31,50,61,62,63,64,65,66,67,68,69,73,74,93,94],
 'Casimir and surface forces':[47,48],
 'Quantum computation and inference':[86,87,88,89,90,91,92,95,96],
 'Foundations of gravity':[53,54]
};
function recordType(s:RecordSource){
 if(/^[A-Z]$/.test(s.evidence))return 'Legacy code · review needed';
 if(/claim/i.test(s.evidence))return 'Claim or disputed interpretation';
 if(/experiment/i.test(s.evidence))return 'Experimental record';
 if(/theory/i.test(s.evidence))return 'Theoretical record';
 if(/Algorithm|Method|computational/i.test(s.evidence))return 'Computational method';
 if(/comment|reply/i.test(s.evidence))return 'Scientific exchange';
 return 'Review, perspective or report';
}
export const sources:Source[]=records.map(s=>({...s,research_field:Object.entries(fields).find(([,ids])=>ids.includes(Number(s.id.split('-')[1])))?.[0]||'Unclassified',record_type:recordType(s)}));
export function searchSources(query='',category='',evidence='',sort='register'){
 const terms=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 const found=sources.filter(s=>(!category||s.research_field===category)&&(!evidence||s.record_type===evidence)&&terms.every(t=>Object.values(s).join(' ').toLowerCase().includes(t)));
 if(sort==='newest')found.sort((a,b)=>Number(b.year)-Number(a.year));
 if(sort==='oldest')found.sort((a,b)=>Number(a.year)-Number(b.year));
 return found;
}
