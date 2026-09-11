'use client';

import {useState} from 'react';
import {coherenceBenchmark} from '@/lib/coherence-benchmark';
import styles from './dossier.module.css';

export function CoherenceExplorer() {
  const [eta,setEta]=useState(1);
  const [kappa,setKappa]=useState(0.3);
  const [phase,setPhase]=useState(0);
  const [finite,setFinite]=useState(true);
  const result=coherenceBenchmark(eta,kappa,phase*Math.PI/180,finite);
  function download() {
    const record={kind:'analytic_benchmark',hypothesis_id:'CFD-H1',model_version:'1.0.0',
      approximation:finite?'finite_gaussian_impulse':'weak_limit',
      inputs:{eta,kappa,phase_deg:phase},result,
      note:'Dimensionless mathematical prediction, not sensor data or hardware execution.'};
    const url=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download='CFD-H1-benchmark.json';a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return <section className={styles.explorer} aria-labelledby="coherence-explorer-heading">
    <p className="eyebrow">CFD-H1 · MATHEMATICAL BENCHMARK</p>
    <h2 id="coherence-explorer-heading">Explore the coherence threshold</h2>
    <p className={styles.note}>Two attractive branches: −a and −2a. Change coherence, impulse strength and relative phase to compare selected and complementary outcomes. All values below are model calculations.</p>
    <div className={styles.controls}>
      <label>Coherence η · {eta.toFixed(3)}<input aria-label="Coherence eta" type="range" min="0" max="1" step="0.001" value={eta} onChange={e=>setEta(Number(e.target.value))}/></label>
      <label>Impulse κ · {kappa.toFixed(2)}<input aria-label="Impulse kappa" type="range" min="0" max="2" step="0.01" value={kappa} onChange={e=>setKappa(Number(e.target.value))}/></label>
      <label>Relative phase · {phase}°<input aria-label="Relative phase" type="range" min="0" max="180" step="1" value={phase} onChange={e=>setPhase(Number(e.target.value))}/></label>
      <label>Calculation<select value={finite?'finite':'weak'} onChange={e=>setFinite(e.target.value==='finite')}><option value="finite">Finite Gaussian impulse</option><option value="weak">Weak-limit coefficient</option></select></label>
    </div>
    <dl className={styles.metrics}>
      <div><dt>Selected probability</dt><dd data-testid="selected-probability">{(100*result.selectedProbability).toFixed(3)}%</dd></div>
      <div><dt>Selected response / a</dt><dd data-testid="selected-response">{result.selectedResponse.toFixed(5)}</dd></div>
      <div><dt>Complementary response / a</dt><dd>{result.complementaryResponse.toFixed(5)}</dd></div>
      <div><dt>All-outcome response / a</dt><dd data-testid="unconditional-response">{result.unconditionalResponse.toFixed(5)}</dd></div>
    </dl>
    <p className={styles.outcome} role="status">{kappa===0?'Zero impulse: displayed response ratios are limiting coefficients.':result.visibility>result.threshold?'Selected mean reverses sign; the complete ensemble remains attractive.':'Selected mean does not reverse sign at these settings.'}</p>
    <p className={styles.note}>Effective visibility {result.visibility.toFixed(5)}; sign threshold {(17/18).toFixed(5)}. {finite?'Overlap is exp(−κ²/8).':'Weak mode sets overlap to 1; finite-strength predictions require the finite model.'} The outcome-weighted mean is −1.5a. This model does not include source recoil or establish a propulsion mechanism.</p>
    <div className={styles.actions}><button className="outline" onClick={download}>Download benchmark JSON</button><a className="outline" href="/quantum-advances/research/coherence">Read the full derivation</a></div>
  </section>;
}
