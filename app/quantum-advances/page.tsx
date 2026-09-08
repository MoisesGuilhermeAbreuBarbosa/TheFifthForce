import type {Metadata} from 'next';
import {SiteNavigation} from '../site-navigation';
import {QuantumAdvancesLab} from './quantum-advances-lab';

export const metadata:Metadata={
  title:'Quantum Advances | OPEN FIELD',
  description:'Live QAGRA simulation, quantum-circuit, AI-hypothesis and evidence-analysis workspace for gravity research.'
};

export default function QuantumAdvancesPage(){
  return <main>
    <SiteNavigation current="quantum-advances"/>
    <section className="intro" style={{alignItems:'flex-start'}}>
      <div style={{maxWidth:860}}>
        <p className="eyebrow">QAGRA · ACTIVE RESEARCH SURFACE</p>
        <h1>Quantum advances.<br/><em>Test the hypothesis.</em></h1>
        <p className="lede">A live hybrid classical–quantum workspace for gravity and anomalous-force research. Build a falsifiable hypothesis, run controlled synthetic experiments, sweep parameters, execute an auditable state-vector quantum circuit, compare classical and quantum feature models, and preserve the session trail.</p>
      </div>
      <aside className="edition">
        <span>RESEARCH MODE</span>
        <strong>Null-first</strong>
        <p>Simulation ≠ evidence<br/>Replication required</p>
      </aside>
    </section>
    <div className="callout" style={{marginTop:0}}>
      <div><p className="eyebrow">SCIENTIFIC GUARDRAIL</p><h2>Quantum computation accelerates analysis only where the algorithm earns the advantage.</h2></div>
      <a className="outline" href="/wiki/QAGRA" target="_blank" rel="noreferrer">QAGRA documentation</a>
    </div>
    <QuantumAdvancesLab/>
  </main>;
}
