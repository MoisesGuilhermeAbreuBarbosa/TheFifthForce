import {notFound} from 'next/navigation';
import {documentation,relatedInvestigations} from '@/lib/documentation';
import {SiteNavigation} from '../../site-navigation';
import {ArrowLeft,ArrowUpRight,Download} from 'lucide-react';
export function generateStaticParams(){return documentation.map(x=>({id:x.id}))}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;const x=documentation.find(s=>s.id===id);return {title:x?x.topic+' | Source documentation':'Source not found'}}
export default async function SourcePage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const x=documentation.find(s=>s.id===id);if(!x)notFound();const related=relatedInvestigations(id);
 return <main><SiteNavigation current="literature"/><div className="reader-toolbar"><a className="outline" href="/literature"><ArrowLeft size={16}/>Source library</a><a className="outline" href={'/research/documentation/'+id+'.md'} download><Download size={16}/>Download source notes</a></div>
 <section className="dossier-heading"><p className="eyebrow">SOURCE DOCUMENTATION / {id} / {x.year}</p><h1>{x.topic}</h1><p className="lede">{x.authors||'Author metadata not yet verified in this register.'}</p><span className="tag">{x.record_type}</span></section>
 <div className="research-notice">On-site editorial source notes · Not a reproduction of the original paper · {x.status}</div>
 <div className="frontier-reader"><article className="paper source-reader"><section id="summary"><h2>Source summary</h2><p>{x.result}</p></section>
 <section id="claim"><h2>Claim and interpretation</h2>{x.claim!=='See the source summary below.'&&<p>{x.claim}</p>}<p><strong>Interpretation to avoid:</strong> {x.common_error}</p></section>
 <section id="checks"><h2>What needs checking</h2><p>{x.correction}</p><p><strong>Replication record:</strong> {x.replication}</p></section>
 <section id="provenance"><h2>Provenance and review scope</h2><dl className="source-facts"><dt>Register ID</dt><dd>{id}</dd><dt>Publication year</dt><dd>{x.year}</dd><dt>Research field</dt><dd>{x.research_field}</dd><dt>Original classification</dt><dd>{x.category} · {x.evidence}</dd><dt>Review coverage</dt><dd>{x.review_scope||'Inherited annotation; not re-audited in the September 2026 expansion.'}</dd>{x.reviewed_on&&<><dt>Last record check</dt><dd>{x.reviewed_on}</dd></>}</dl></section>
 <section id="original"><h2>Original document — complementary information</h2><p>Use the original document to inspect its full derivation, figures, methods and publication history. These notes are the site’s own annotated guide; they do not replace a full-text review.</p><a className="outline" href={x.source} target="_blank" rel="noopener noreferrer">Open original source <ArrowUpRight size={16}/></a><p className="source-url">{x.source}</p></section>
 </article><aside className="dossier-aside"><p className="eyebrow">IN THIS RECORD</p><a href="#summary">Source summary</a><a href="#claim">Claim and interpretation</a><a href="#checks">Required checks</a><a href="#provenance">Review provenance</a><a href="#original">Original publication</a><h3>Continue the investigation</h3>{related.map(h=><a key={h.slug} href={'/investigations/'+h.slug}>{h.id} · {h.title}</a>)}{id.startsWith('DOS-')&&<a href="/quantum-advances/research">Coherence and force discrimination dossier</a>}<a href="/literature/documentation">Browse all documentation</a><a href="/research/documentation/library.sqlite" download>Download SQLite database</a></aside></div></main>
}
