import {sources} from './library';
import supplement from '@/public/research/documentation-supplement.json';
import investigations from '@/public/research/frontiers/investigations.json';
export const documentation=[...sources,...supplement.map(x=>({...x,research_field:'Quantum coherence and measurement',record_type:x.evidence,investigations:[] as string[]}))];
export function documentationLink(href?:string){
 if(!href)return href;
 const record=documentation.find(x=>x.source===href);
 return record?'/literature/'+record.id:href;
}
export function relatedInvestigations(id:string){return investigations.filter(x=>x.sources.includes(id))}
