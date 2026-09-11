import type {Metadata} from 'next';
import {SiteNavigation} from '../../site-navigation';
import manifest from '@/public/research/dossier/manifest.json';
import {CoherenceExplorer} from './coherence-explorer';
import styles from './dossier.module.css';

export const metadata:Metadata={title:'Research Dossier | Quantum Advances',description:'Five testable research hypotheses, mathematical derivations, experiment protocols and development specifications for The Fifth Force.'};

export default function ResearchDossier() {
  return <main><SiteNavigation current="quantum-advances"/>
    <section className={styles.intro}><p className="eyebrow">RESEARCH DOSSIER · REVISION 1.0 · 11 SEPTEMBER 2026</p>
      <h1>Coherence and<br/><em>force discrimination.</em></h1>
      <p>Five hypotheses developed into equations, measurable predictions, experimental controls and implementation requirements. Read the full research program, reproduce the mathematical benchmark, and inspect what remains unresolved.</p>
      <p className="fine">Research proposals and mathematical benchmarks. No new physical detection or quantum advantage is claimed.</p>
    </section>
    <div className={styles.links}><a className="primary" href="/quantum-advances/research/overview">Start reading</a><a className="outline" href="/research/dossier/complete-dossier.md" download>Download complete dossier</a><a className="outline" href="/research/dossier/hypotheses.json" download>Hypotheses JSON</a><a className="outline" href="/quantum-advances">Open the existing laboratory</a></div>
    <div className={styles.cards}>{manifest.chapters.map((chapter,index)=><a className={styles.card} key={chapter.slug} href={'/quantum-advances/research/'+chapter.slug}><span className={styles.number}>CHAPTER {String(index+1).padStart(2,'0')}</span><h2>{chapter.title}</h2><p>{chapter.description}</p><span className="fine">Read chapter →</span></a>)}</div>
    <CoherenceExplorer/>
    <section className={styles.intro}><h2>Reproduce and extend the work</h2><p>Run the verifier from a checkout of the repository. It independently integrates Gaussian probability densities, checks every outcome and recalculates the original experimental summary. The structured records preserve assumptions, sources, limitations and acceptance gates.</p>
      <div className={styles.links}><a href="/research/dossier/verify-research-dossier.py" download>Numerical verifier</a><a href="/research/dossier/benchmark-fixtures.json" download>Benchmark fixtures</a><a href="/research/dossier/sources.json" download>Source register</a><a href="/research/dossier/research-receipt.json" download>Research receipt</a><a href="/wiki?page=Research-Dossier">Wiki edition</a></div>
    </section>
  </main>;
}
