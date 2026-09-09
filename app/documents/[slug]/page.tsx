import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {notFound} from 'next/navigation';
import {documents} from '@/lib/documents';
import {SiteNavigation} from '../../site-navigation';
import Markdown from '../../markdown';
import {Readout} from '../../restored';
import {DataViewer} from '../../data/viewer';
export default async function Document({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const d=documents[slug];if(!d)notFound();const text=await readFile(join(process.cwd(),'public/research',d.render||d.raw),'utf8');let html='';if(d.html){const source=await readFile(join(process.cwd(),'public/publications',d.html),'utf8');html=source.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1]||'';html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/\son\w+="[^"]*"/gi,'');}
return <main><SiteNavigation current="repository"/><div className="sectionhead lower"><h1>{d.title}</h1></div><div className="reader-toolbar"><a className="outline" href={'/api/documents/'+slug+'/raw'} download>Download original {d.raw.endsWith('.md')?'Markdown':'source'}</a><a className="outline" href="/repository">Back to repository</a></div>{d.html&&<p>Archived, not peer reviewed. This reader uses the repository’s typeset edition; download the original text for comparison. Later reanalysis and limitations take precedence.</p>}<Readout text={text}/>{html?<article className="scientific-prose document-html" dangerouslySetInnerHTML={{__html:html}}/>:d.render?<article className="paper"><Markdown content={text}/></article>:<pre className="document-code"><code>{text}</code></pre>}{['working-paper','results'].includes(slug)&&<section><h2>Explore the experimental measurements</h2><DataViewer embedded/></section>}</main>}
