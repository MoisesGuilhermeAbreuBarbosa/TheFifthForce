import type {Metadata} from 'next';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {notFound} from 'next/navigation';
import {SiteNavigation} from '../../../site-navigation';
import Markdown from '../../../markdown';
import manifest from '@/public/research/dossier/manifest.json';
import styles from '../dossier.module.css';

export const dynamicParams=false;
export function generateStaticParams(){return manifest.chapters.map(chapter=>({slug:chapter.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const chapter=manifest.chapters.find(c=>c.slug===slug);
  return {title:chapter?chapter.title+' | Research Dossier':'Research Dossier',description:chapter?.description};
}
export default async function Chapter({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const index=manifest.chapters.findIndex(c=>c.slug===slug);
  if(index<0)notFound();
  const chapter=manifest.chapters[index];
  const content=await readFile(join(process.cwd(),'public','research','dossier',chapter.slug+'.md'),'utf8');
  return <main><SiteNavigation current="quantum-advances"/>
    <div className={styles.links}><a href="/quantum-advances/research">← Research dossier</a><a href={'/research/dossier/'+chapter.slug+'.md'} download>Download this chapter</a><a href="/research/dossier/complete-dossier.md" download>Complete dossier</a></div>
    <div className={styles.layout}><nav className={styles.nav} aria-label="Dossier chapters">{manifest.chapters.map(c=><a href={'/quantum-advances/research/'+c.slug} key={c.slug} aria-current={c.slug===slug?'page':undefined}>{c.title}</a>)}</nav>
      <article className={styles.article}><p className="fine">Research dossier · v1.0 · Proposed research / mathematical benchmarks</p><Markdown content={content}/>
        <div className={styles.pager}>{index>0?<a href={'/quantum-advances/research/'+manifest.chapters[index-1].slug}>← {manifest.chapters[index-1].title}</a>:<a href="/quantum-advances/research">Dossier home</a>}{index<manifest.chapters.length-1&&<a href={'/quantum-advances/research/'+manifest.chapters[index+1].slug}>{manifest.chapters[index+1].title} →</a>}</div>
      </article>
    </div>
  </main>;
}
