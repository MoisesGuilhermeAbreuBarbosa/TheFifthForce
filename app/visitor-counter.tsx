'use client';
import {useEffect,useState} from 'react';

type Counts={available:boolean;total?:number;human?:number;ai?:number;crawler?:number;archive?:{archivedAt:string|null;total:number;human:number;ai:number;crawler:number}};

export function VisitorCounter(){
  const [counts,setCounts]=useState<Counts|null>(null);
  useEffect(()=>{fetch('/api/visits',{cache:'no-store'}).then(response=>response.json()).then(setCounts).catch(()=>setCounts({available:false}));},[]);
  if(!counts)return <aside className="visit-counter" aria-live="polite"><span>PUBLIC ACCESS LEDGER</span><strong>Loading visit totals…</strong></aside>;
  if(!counts.available){const a=counts.archive;if(a?.archivedAt)return <aside className="visit-counter"><span>PUBLIC ACCESS LEDGER · GITHUB ARCHIVE</span><strong>{a.total.toLocaleString()} landing-page accesses</strong><div><span><b>{a.human.toLocaleString()}</b> likely human</span><span><b>{a.ai.toLocaleString()}</b> declared AI</span><span><b>{a.crawler.toLocaleString()}</b> other automated</span></div><small>Archived {new Date(a.archivedAt).toLocaleString()}. Live counting is temporarily unavailable.</small></aside>;return <aside className="visit-counter"><span>PUBLIC ACCESS LEDGER</span><strong>Counter awaiting persistent storage</strong><small>No local or estimated total is shown.</small></aside>}
  return <aside className="visit-counter" aria-label="Public page access totals"><span>PUBLIC ACCESS LEDGER · LIVE</span><strong>{counts.total?.toLocaleString()} landing-page accesses</strong><div><span><b>{counts.human?.toLocaleString()}</b> likely human</span><span><b>{counts.ai?.toLocaleString()}</b> declared AI</span><span><b>{counts.crawler?.toLocaleString()}</b> other automated</span></div><small>Request counts, not unique people. Classification uses declared user-agent signatures; unidentified automation may be counted as human. Aggregate totals are archived to GitHub every six hours.</small></aside>;
}
