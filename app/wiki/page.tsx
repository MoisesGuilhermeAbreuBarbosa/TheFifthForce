import {notFound} from 'next/navigation';
import Markdown from '../markdown';
import {defaultPages,readWiki,wikiLinks,wikiRoot,slug} from '@/lib/wiki';
import {SiteNavigation} from '../site-navigation';
export const dynamic='force-dynamic';
export default async function Wiki({searchParams}:{searchParams:Promise<{page?:string}>}){
 const requested=(await searchParams).page||'Home';
 const [document,sidebar]=await Promise.all([readWiki(requested),readWiki('_Sidebar')]);
 if(!document)notFound();
 const discovered=[...(sidebar?.content||'').matchAll(/\[\[([^\]]+)\]\]/g)].map(m=>{const [a,b]=m[1].split('|');return defaultPages.includes(slug(a))?slug(a):slug(b||a);}).filter(x=>/^[A-Za-z0-9_-]{1,100}$/.test(x));
 const pages=[...new Set([...defaultPages,...discovered,requested])];
 return <main><SiteNavigation current="wiki"/><div className="wiki-layout"><nav className="wiki-nav" aria-label="Wiki pages">{pages.map(page=><a key={page} href={'/wiki?page='+encodeURIComponent(page)} aria-current={page===requested?'page':undefined}>{page.replaceAll('-',' ')}</a>)}</nav><article className="wiki-article"><p className="fine">{document.live?'Reading the GitHub Wiki · updates are fetched on visits with a two-minute cache.':'Showing a saved wiki snapshot. GitHub could not be reached; check the original for newer edits.'}</p><Markdown content={wikiLinks(document.content)}/><div className="wiki-edit"><p>Help improve this page. Edits are made on GitHub and appear here after the cache refreshes. The repository also maintains wiki/ source files; its publish workflow can overwrite native Wiki edits when those files change.</p><a className="outline" href={wikiRoot+'/'+encodeURIComponent(requested)+'/_edit'}>Edit this page on GitHub</a> <a className="outline" href={wikiRoot+'/'+encodeURIComponent(requested)}>View original GitHub Wiki</a><p><a href="https://github.com/MoisesGuilhermeAbreuBarbosa/TheFifthForce/tree/main/wiki">Edit the repository wiki source</a></p></div></article></div></main>;
}
