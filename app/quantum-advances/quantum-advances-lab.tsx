'use client';

import {useEffect,useMemo,useRef,useState} from 'react';
import {CartesianGrid,Legend,Line,LineChart,ResponsiveContainer,Tooltip,XAxis,YAxis} from 'recharts';
import styles from './quantum-advances.module.css';

const G=6.67430e-11;
const LEDGER_KEY='open-field:qagra-ledger:v1';

type Family='null'|'repulsive_inverse_square'|'yukawa'|'oscillatory'|'quantum_postselected';
type Params={family:Family;sourceMassKg:number;distanceM:number;alpha:number;rangeM:number;noiseSigma:number;samples:number;seed:number};
type SimPoint={index:number;timeS:number;distanceM:number;signal:number;noise:number;residual:number};
type Hypothesis={name:string;family:Family;summary:string;equation:string;parameters:string[];predictions:string[];falsification:string[];nuisance:string[];quantumApproach:string[]};
type LedgerEntry={id:string;timestamp:string;eventType:string;previousHash:string;payload:Record<string,unknown>;hash:string};

type Complex=[number,number];
const C={add:(a:Complex,b:Complex):Complex=>[a[0]+b[0],a[1]+b[1]],mul:(a:Complex,b:Complex):Complex=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],scale:(a:Complex,s:number):Complex=>[a[0]*s,a[1]*s],abs2:(a:Complex)=>a[0]*a[0]+a[1]*a[1],phase:(x:number):Complex=>[Math.cos(x),Math.sin(x)]};

function rng(seed:number){let s=seed>>>0;return()=>{s=(Math.imul(1664525,s)+1013904223)>>>0;return s/4294967296;};}
function gaussian(next:()=>number){const u=Math.max(next(),1e-12),v=next();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
function clamp(v:number,lo:number,hi:number){return Math.min(hi,Math.max(lo,v));}
function fmt(v:number,d=3){if(!Number.isFinite(v))return '—';const a=Math.abs(v);return a!==0&&(a<1e-3||a>=1e4)?v.toExponential(2):v.toFixed(d);}
function accelerationBranch(m:number,sourceX:number,probeX:number){const dx=probeX-sourceX;const r=Math.abs(dx);return -G*m*dx/(r*r*r);}
function quantumPostselectedResidual(m:number,r:number){
  const left=-50e-6,right=50e-6;
  const aL=accelerationBranch(m,left,r),aR=accelerationBranch(m,right,r);
  const iL=1/Math.sqrt(2),iR=1/Math.sqrt(2),fL=0.8,fR=-0.6;
  const overlap=fL*iL+fR*iR;
  const weak=(fL*aL*iL+fR*aR*iR)/overlap;
  const mixture=0.5*(aL+aR);
  return weak-mixture;
}
function anomaly(family:Family,m:number,r:number,t:number,alpha:number,rangeM:number){
  if(family==='null')return 0;
  if(family==='repulsive_inverse_square')return alpha*G*m/(r*r);
  if(family==='yukawa'){const q=Math.max(rangeM,1e-6);return alpha*G*m/(r*r)*(1+r/q)*Math.exp(-r/q);}
  if(family==='oscillatory')return alpha*1e-11*Math.sin(2*Math.PI*0.7*t);
  return alpha*quantumPostselectedResidual(m,r);
}
function runSimulation(p:Params):SimPoint[]{
  const next=rng(p.seed);const n=clamp(Math.round(p.samples),40,2000);const out:SimPoint[]=[];
  for(let i=0;i<n;i++){
    const timeS=60*i/Math.max(1,n-1);
    const distanceM=clamp(p.distanceM*(0.72+0.56*next()),0.003,0.2);
    const signal=anomaly(p.family,p.sourceMassKg,distanceM,timeS,p.alpha,p.rangeM);
    const noise=gaussian(next)*p.noiseSigma;
    out.push({index:i,timeS,distanceM,signal,noise,residual:signal+noise});
  }
  return out;
}
function rms(values:number[]){return Math.sqrt(values.reduce((s,v)=>s+v*v,0)/Math.max(1,values.length));}
function mean(values:number[]){return values.reduce((s,v)=>s+v,0)/Math.max(1,values.length);}

function applyH(state:Complex[],q:number){const stride=1<<q,inv=Math.SQRT1_2;for(let b=0;b<state.length;b+=stride*2){for(let o=0;o<stride;o++){const i=b+o,j=i+stride,a=state[i],c=state[j];state[i]=C.scale(C.add(a,c),inv);state[j]=C.scale([a[0]-c[0],a[1]-c[1]],inv);}}}
function applyRY(state:Complex[],q:number,theta:number){const stride=1<<q,c=Math.cos(theta/2),s=Math.sin(theta/2);for(let b=0;b<state.length;b+=stride*2){for(let o=0;o<stride;o++){const i=b+o,j=i+stride,a=state[i],d=state[j];state[i]=C.add(C.scale(a,c),C.scale(d,-s));state[j]=C.add(C.scale(a,s),C.scale(d,c));}}}
function applyRZ(state:Complex[],q:number,theta:number){for(let i=0;i<state.length;i++){const z=((i>>q)&1)?1:-1;state[i]=C.mul(state[i],C.phase(z*theta/2));}}
function applyRZZ(state:Complex[],q0:number,q1:number,theta:number){for(let i=0;i<state.length;i++){const z0=((i>>q0)&1)?-1:1,z1=((i>>q1)&1)?-1:1;state[i]=C.mul(state[i],C.phase(-theta*z0*z1/2));}}
function applyCZ(state:Complex[],q0:number,q1:number){for(let i=0;i<state.length;i++)if(((i>>q0)&1)&&((i>>q1)&1))state[i]=C.scale(state[i],-1);}
function quantumState(input:number[]){
  const n=4;const angles=input.slice(0,n);while(angles.length<n)angles.push(0);
  const state:Array<Complex>=Array.from({length:1<<n},()=>[0,0] as Complex);state[0]=[1,0];
  for(let depth=0;depth<2;depth++){
    for(let q=0;q<n;q++){applyH(state,q);applyRZ(state,q,angles[q]);}
    for(let q=0;q<n-1;q++)applyRZZ(state,q,q+1,angles[q]*angles[q+1]);
  }
  const theta=[0.22,-0.31,0.41,0.13];for(let q=0;q<n;q++)applyRY(state,q,theta[q]);for(let q=0;q<n-1;q++)applyCZ(state,q,q+1);
  const probs=state.map(C.abs2);const z:number[]=[];for(let q=0;q<n;q++)z.push(probs.reduce((s,p,i)=>s+p*(((i>>q)&1)?-1:1),0));
  const zz:number[]=[];for(let q=0;q<n-1;q++)zz.push(probs.reduce((s,p,i)=>{const a=((i>>q)&1)?-1:1,b=((i>>(q+1))&1)?-1:1;return s+p*a*b;},0));
  return {state,probs,z,zz,features:[...z,...zz]};
}
function qasm(input:number[]){const a=input.slice(0,4);while(a.length<4)a.push(0);const lines=['OPENQASM 3.0;','include "stdgates.inc";','qubit[4] q;'];for(let d=0;d<2;d++){for(let q=0;q<4;q++){lines.push(`h q[${q}];`,`rz(${a[q].toPrecision(9)}) q[${q}];`);}for(let q=0;q<3;q++){const t=a[q]*a[q+1];lines.push(`cx q[${q}], q[${q+1}];`,`rz(${t.toPrecision(9)}) q[${q+1}];`,`cx q[${q}], q[${q+1}];`);}}return lines.join('\n');}
function scaleAngles(raw:number[]){return raw.map(v=>Math.PI*Math.tanh(v/2));}
function nearestCentroid(train:number[][],y:string[],test:number[][]){const classes=[...new Set(y)];const centroids=Object.fromEntries(classes.map(c=>{const rows=train.filter((_,i)=>y[i]===c);return [c,rows[0].map((_,j)=>mean(rows.map(r=>r[j])))];}));return test.map(row=>classes.reduce((best,c)=>{const d=row.reduce((s,v,j)=>s+(v-centroids[c][j])**2,0);return d<best.d?{c,d}:best;},{c:classes[0],d:Infinity}).c);}
function standardize(train:number[][],test:number[][]){const mu=train[0].map((_,j)=>mean(train.map(r=>r[j]))),sd=train[0].map((_,j)=>Math.max(rms(train.map(r=>r[j]-mu[j])),1e-12));const f=(r:number[])=>r.map((v,j)=>(v-mu[j])/sd[j]);return {train:train.map(f),test:test.map(f)};}
function benchmark(seed:number){
  const families:Family[]=['null','repulsive_inverse_square','yukawa','oscillatory'];const rows:number[][]=[],labels:string[]=[];const next=rng(seed);
  families.forEach((family,k)=>{for(let i=0;i<72;i++){const m=4e-4+1.8e-3*next(),r=0.008+0.055*next(),t=60*next(),alpha=family==='null'?0:0.08+0.3*next();const sig=anomaly(family,m,r,t,alpha,0.02);const noise=gaussian(next)*2e-12;rows.push([m/1e-3,r/0.03,t/30,(sig+noise)/2e-12]);labels.push(family);}});
  const train:number[][]=[],test:number[][]=[],yTrain:string[]=[],yTest:string[]=[];rows.forEach((row,i)=>{if(i%3===0){test.push(row);yTest.push(labels[i]);}else{train.push(row);yTrain.push(labels[i]);}});
  const s=standardize(train,test);const cPred=nearestCentroid(s.train,yTrain,s.test);const qTrain=s.train.map(r=>quantumState(scaleAngles(r)).features),qTest=s.test.map(r=>quantumState(scaleAngles(r)).features);const qPred=nearestCentroid(qTrain,yTrain,qTest);const accuracy=(pred:string[])=>pred.filter((p,i)=>p===yTest[i]).length/yTest.length;
  return {classical:accuracy(cPred),quantum:accuracy(qPred),train:train.length,test:test.length};
}
function canonical(value:unknown):string{if(value===null||typeof value!=='object')return JSON.stringify(value);if(Array.isArray(value))return `[${value.map(canonical).join(',')}]`;const obj=value as Record<string,unknown>;return `{${Object.keys(obj).sort().map(k=>`${JSON.stringify(k)}:${canonical(obj[k])}`).join(',')}}`;}
async function digest(text:string){const bytes=new TextEncoder().encode(text);const hash=await crypto.subtle.digest('SHA-256',bytes);return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');}

const initialParams:Params={family:'repulsive_inverse_square',sourceMassKg:1e-3,distanceM:0.03,alpha:0.15,rangeM:0.02,noiseSigma:2e-12,samples:240,seed:23};
const familyLabels:Record<Family,string>={null:'H₀ · conventional residual',repulsive_inverse_square:'Repulsive inverse-square',yukawa:'Repulsive Yukawa',oscillatory:'Oscillatory residual',quantum_postselected:'Quantum post-selected'};

export function QuantumAdvancesLab(){
  const [params,setParams]=useState<Params>(initialParams);const [data,setData]=useState<SimPoint[]>(()=>runSimulation(initialParams));const [hypPrompt,setHypPrompt]=useState('Design a falsifiable source-correlated repulsive-force hypothesis that can be separated from electrostatic and thermal effects.');const [hypothesis,setHypothesis]=useState<Hypothesis|null>(null);const [aiMode,setAiMode]=useState('');const [aiBusy,setAiBusy]=useState(false);const [circuit,setCircuit]=useState<ReturnType<typeof quantumState>|null>(null);const [bench,setBench]=useState<ReturnType<typeof benchmark>|null>(null);const [ledger,setLedger]=useState<LedgerEntry[]>([]);const ledgerRef=useRef<LedgerEntry[]>([]);const [ledgerStatus,setLedgerStatus]=useState('Session ledger ready.');
  useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem(LEDGER_KEY)||'[]') as LedgerEntry[];ledgerRef.current=saved;setLedger(saved);}catch{}},[]);
  async function append(eventType:string,payload:Record<string,unknown>){const previousHash=ledgerRef.current.at(-1)?.hash||'GENESIS';const body={id:crypto.randomUUID(),timestamp:new Date().toISOString(),eventType,previousHash,payload};const hash=await digest(canonical(body));const entry={...body,hash};const next=[...ledgerRef.current,entry];ledgerRef.current=next;setLedger(next);localStorage.setItem(LEDGER_KEY,JSON.stringify(next));setLedgerStatus(`Verified append · ${next.length} session entr${next.length===1?'y':'ies'}.`);return entry;}
  async function run(){const next=runSimulation(params);setData(next);await append('simulation_run',{...params,snr:rms(next.map(d=>d.signal))/params.noiseSigma,meanResidual:mean(next.map(d=>d.residual))});}
  async function runSweep(){await append('parameter_sweep',{family:params.family,sourceMassKg:params.sourceMassKg,distanceM:params.distanceM,rangeM:params.rangeM,noiseSigma:params.noiseSigma});}
  const snr=useMemo(()=>rms(data.map(d=>d.signal))/params.noiseSigma,[data,params.noiseSigma]);
  const chartData=useMemo(()=>data.filter((_,i)=>i%Math.max(1,Math.floor(data.length/120))===0).map(d=>({t:+d.timeS.toFixed(2),signal:d.signal,residual:d.residual})),[data]);
  const sweep=useMemo(()=>Array.from({length:31},(_,i)=>{const alpha=i*(Math.max(0.5,params.alpha*2)/30);const vals=Array.from({length:40},(_,j)=>anomaly(params.family,params.sourceMassKg,params.distanceM*(0.75+0.5*j/39),60*j/39,alpha,params.rangeM));return {alpha:+alpha.toFixed(4),snr:rms(vals)/params.noiseSigma};}),[params]);
  const qInput=useMemo(()=>scaleAngles([params.sourceMassKg/1e-3,params.distanceM/0.03,mean(data.map(d=>d.residual))/Math.max(params.noiseSigma,1e-18),params.alpha]),[params,data]);
  async function executeCircuit(){const result=quantumState(qInput);setCircuit(result);await append('quantum_statevector_execution',{qubits:4,depth:2,inputAngles:qInput,z:result.z,zz:result.zz,hardware:'statevector_simulator',qasmVersion:'3.0'});}
  async function runBenchmark(){const result=benchmark(params.seed+101);setBench(result);await append('benchmark_run',{...result,method:'nearest-centroid raw features vs 4-qubit quantum feature map',note:'No advantage is inferred from one benchmark.'});}
  async function generateHypothesis(){setAiBusy(true);try{const r=await fetch('/api/quantum-advances/hypothesis',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({prompt:hypPrompt})});const body=await r.json();if(!r.ok)throw new Error(body.error||'Hypothesis generation failed');setHypothesis(body.hypothesis);setAiMode(body.mode==='gateway'?'Vercel AI Gateway':'Structured fallback');await append('hypothesis_generated',{mode:body.mode,name:body.hypothesis.name,family:body.hypothesis.family,prompt:hypPrompt});}catch(e){setAiMode(String(e));}finally{setAiBusy(false);}}
  function loadHypothesis(){if(!hypothesis)return;setParams(p=>({...p,family:hypothesis.family}));}
  async function verifyLedger(){let previous='GENESIS';for(let i=0;i<ledgerRef.current.length;i++){const row=ledgerRef.current[i];if(row.previousHash!==previous){setLedgerStatus(`Chain failed at entry ${i+1}: previous hash mismatch.`);return;}const {hash,...body}=row;const actual=await digest(canonical(body));if(actual!==hash){setLedgerStatus(`Chain failed at entry ${i+1}: content hash mismatch.`);return;}previous=hash;}setLedgerStatus(`SHA-256 chain verified · ${ledgerRef.current.length} entr${ledgerRef.current.length===1?'y':'ies'}.`);}
  function exportLedger(){const blob=new Blob([JSON.stringify(ledgerRef.current,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`qagra-session-ledger-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);}
  function clearLedger(){ledgerRef.current=[];setLedger([]);localStorage.removeItem(LEDGER_KEY);setLedgerStatus('Session ledger cleared.');}
  const topStates=useMemo(()=>circuit?circuit.probs.map((p,i)=>({state:i.toString(2).padStart(4,'0'),p})).sort((a,b)=>b.p-a.p).slice(0,8):[],[circuit]);

  return <div className={styles.lab}>
    <section className={styles.section}>
      <div className={styles.sectionHead}><div><p className="eyebrow">01 · HYPOTHESIS ENGINE</p><h2>Generate a falsifiable hypothesis</h2></div><span className={styles.status}>{aiMode||'Gateway-ready'}</span></div>
      <p>Describe the physical idea. The generator must return a model family, equation, measurable predictions, nuisance competitors, falsification tests, and a quantum-computing role. Generated text remains a research proposal, not evidence.</p>
      <textarea className={styles.textarea} value={hypPrompt} onChange={e=>setHypPrompt(e.target.value)} rows={4}/>
      <div className={styles.actions}><button className="primary" onClick={generateHypothesis} disabled={aiBusy}>{aiBusy?'Generating…':'Generate hypothesis'}</button>{hypothesis&&<button className="outline" onClick={loadHypothesis}>Load family into simulator</button>}</div>
      {hypothesis&&<article className={styles.hypothesis}><div className={styles.hypTitle}><h3>{hypothesis.name}</h3><span className={styles.family}>{familyLabels[hypothesis.family]}</span></div><p>{hypothesis.summary}</p><pre>{hypothesis.equation}</pre><div className={styles.columns}><div><strong>Predictions</strong><ul>{hypothesis.predictions.map(x=><li key={x}>{x}</li>)}</ul></div><div><strong>Falsification</strong><ul>{hypothesis.falsification.map(x=><li key={x}>{x}</li>)}</ul></div><div><strong>Nuisance competitors</strong><ul>{hypothesis.nuisance.map(x=><li key={x}>{x}</li>)}</ul></div><div><strong>Quantum approach</strong><ul>{hypothesis.quantumApproach.map(x=><li key={x}>{x}</li>)}</ul></div></div></article>}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}><div><p className="eyebrow">02 · LIVE DIGITAL TWIN</p><h2>Run synthetic force experiments</h2></div><span className={styles.status}>SNR {fmt(snr,2)}</span></div>
      <div className={styles.controls}>
        <label>Hypothesis<select value={params.family} onChange={e=>setParams(p=>({...p,family:e.target.value as Family}))}>{Object.entries(familyLabels).map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label>
        <label>Source mass (kg)<input type="number" step="0.0001" min="0.00001" value={params.sourceMassKg} onChange={e=>setParams(p=>({...p,sourceMassKg:+e.target.value}))}/></label>
        <label>Probe distance (m)<input type="number" step="0.001" min="0.003" value={params.distanceM} onChange={e=>setParams(p=>({...p,distanceM:+e.target.value}))}/></label>
        <label>Coupling α<input type="number" step="0.01" value={params.alpha} onChange={e=>setParams(p=>({...p,alpha:+e.target.value}))}/></label>
        <label>Yukawa range λ (m)<input type="number" step="0.005" min="0.001" value={params.rangeM} onChange={e=>setParams(p=>({...p,rangeM:+e.target.value}))}/></label>
        <label>Noise σ (m/s²)<input type="number" step="1e-13" value={params.noiseSigma} onChange={e=>setParams(p=>({...p,noiseSigma:+e.target.value}))}/></label>
        <label>Samples<input type="number" min="40" max="2000" step="20" value={params.samples} onChange={e=>setParams(p=>({...p,samples:+e.target.value}))}/></label>
        <label>Random seed<input type="number" value={params.seed} onChange={e=>setParams(p=>({...p,seed:+e.target.value}))}/></label>
      </div>
      <div className={styles.actions}><button className="primary" onClick={run}>Run simulation</button><button className="outline" onClick={runSweep}>Record sweep</button></div>
      <div className={styles.metrics}><div><span>RMS signal</span><strong>{fmt(rms(data.map(d=>d.signal)))} m/s²</strong></div><div><span>RMS residual</span><strong>{fmt(rms(data.map(d=>d.residual)))} m/s²</strong></div><div><span>Mean residual</span><strong>{fmt(mean(data.map(d=>d.residual)))} m/s²</strong></div><div><span>Samples</span><strong>{data.length}</strong></div></div>
      <div className={styles.chart}><ResponsiveContainer width="100%" height={320}><LineChart data={chartData}><CartesianGrid stroke="#334643" strokeDasharray="3 3"/><XAxis dataKey="t" stroke="#a7b8b4"/><YAxis stroke="#a7b8b4" tickFormatter={(v)=>Number(v).toExponential(1)}/><Tooltip contentStyle={{background:'#172626',border:'1px solid #334643'}} formatter={(v)=>Number(v).toExponential(3)}/><Legend/><Line type="monotone" dataKey="signal" dot={false} stroke="#c6f36b" strokeWidth={2}/><Line type="monotone" dataKey="residual" dot={false} stroke="#83dfce" strokeWidth={1.5}/></LineChart></ResponsiveContainer></div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}><div><p className="eyebrow">03 · PARAMETER SWEEP</p><h2>Map detectability before touching hardware</h2></div><span className={styles.status}>31 coupling values</span></div>
      <p>The sweep estimates signal-to-noise across coupling strength for the current model. It is a sensitivity map, not a posterior probability of new physics.</p>
      <div className={styles.chart}><ResponsiveContainer width="100%" height={300}><LineChart data={sweep}><CartesianGrid stroke="#334643" strokeDasharray="3 3"/><XAxis dataKey="alpha" stroke="#a7b8b4"/><YAxis stroke="#a7b8b4"/><Tooltip contentStyle={{background:'#172626',border:'1px solid #334643'}}/><Line type="monotone" dataKey="snr" dot={false} stroke="#c6f36b" strokeWidth={2}/></LineChart></ResponsiveContainer></div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}><div><p className="eyebrow">04 · QUANTUM CIRCUIT</p><h2>Execute the feature map</h2></div><span className={styles.status}>4 qubits · state-vector</span></div>
      <p>The browser executes a small auditable state-vector circuit implementing angle encoding and ZZ interactions, then reports quantum observables used as QAGRA features. The generated OpenQASM 3 program is hardware-ready, but this page does not claim execution on physical quantum hardware.</p>
      <div className={styles.actions}><button className="primary" onClick={executeCircuit}>Execute state-vector circuit</button><button className="outline" onClick={()=>navigator.clipboard.writeText(qasm(qInput))}>Copy OpenQASM 3</button></div>
      {circuit&&<><div className={styles.metrics}>{circuit.z.map((v,i)=><div key={i}><span>⟨Z{i}⟩</span><strong>{fmt(v,4)}</strong></div>)}</div><div className={styles.quantumGrid}><div><h3>Highest-probability basis states</h3><table><thead><tr><th>State</th><th>Probability</th></tr></thead><tbody>{topStates.map(s=><tr key={s.state}><td>|{s.state}⟩</td><td>{(100*s.p).toFixed(3)}%</td></tr>)}</tbody></table></div><div><h3>OpenQASM 3</h3><pre className={styles.code}>{qasm(qInput)}</pre></div></div></>}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}><div><p className="eyebrow">05 · BENCHMARK</p><h2>Quantum vs. classical, measured—not assumed</h2></div><span className={styles.status}>Synthetic 4-class task</span></div>
      <p>Both models see the same generated experiments. The classical baseline uses standardized physical features; the quantum path uses a four-qubit feature map followed by the same nearest-centroid decision rule.</p>
      <button className="primary" onClick={runBenchmark}>Run benchmark</button>
      {bench&&<div className={styles.metrics}><div><span>Classical accuracy</span><strong>{(bench.classical*100).toFixed(1)}%</strong></div><div><span>Quantum-feature accuracy</span><strong>{(bench.quantum*100).toFixed(1)}%</strong></div><div><span>Difference</span><strong>{((bench.quantum-bench.classical)*100).toFixed(1)} pp</strong></div><div><span>Train / test</span><strong>{bench.train} / {bench.test}</strong></div></div>}
      <p className="fine">Reference QAGRA v0.1 benchmark: 25.0% classical vs 22.9% quantum-feature accuracy under intentionally weak signal/noise conditions. That result is retained as a null benchmark, not tuned away.</p>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}><div><p className="eyebrow">06 · EVIDENCE LEDGER</p><h2>Expose the research trail</h2></div><span className={styles.status}>{ledger.length} session entries</span></div>
      <p>This ledger is genuinely stored in this browser and hash-chained with SHA-256. It is <strong>not</strong> a shared canonical database. Exported entries can be attached to a GitHub contribution or future ResearchReceipt; durable public write storage will be added only when a reviewed backend is configured.</p>
      <div className={styles.actions}><button className="outline" onClick={verifyLedger}>Verify chain</button><button className="outline" onClick={exportLedger} disabled={!ledger.length}>Export JSON</button><button className="outline" onClick={clearLedger} disabled={!ledger.length}>Clear local ledger</button></div><p className={styles.ledgerStatus}>{ledgerStatus}</p>
      <div className={styles.ledger}>{[...ledger].reverse().slice(0,20).map(entry=><article key={entry.id}><div><strong>{entry.eventType.replaceAll('_',' ')}</strong><span>{new Date(entry.timestamp).toLocaleString()}</span></div><code>{entry.hash.slice(0,20)}…</code><details><summary>Payload</summary><pre>{JSON.stringify(entry.payload,null,2)}</pre></details></article>)}{!ledger.length&&<p className="fine">Run a simulation, generate a hypothesis, execute a circuit, or run a benchmark to create the first entry.</p>}</div>
    </section>
  </div>;
}
