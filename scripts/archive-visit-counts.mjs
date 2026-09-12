import {writeFile} from 'node:fs/promises';

const siteUrl=process.env.OPEN_FIELD_SITE_URL||'https://anti-gravity-site-rev02.vercel.app';
const response=await fetch(`${siteUrl}/api/visits`,{headers:{accept:'application/json'}});
if(!response.ok)throw new Error(`Visit endpoint returned ${response.status}`);
const counts=await response.json();
if(!counts.available)throw new Error('Persistent visit counter is not configured on the deployed site.');
const archive={
  schemaVersion:'open-field.visit-counts.v1',archivedAt:new Date().toISOString(),source:'aggregate-request-counter',
  measurement:'landing-page accesses',total:counts.total,human:counts.human,ai:counts.ai,crawler:counts.crawler,
  privacy:'Aggregate counts only; no IP addresses, cookies, or visitor identifiers.'
};
await writeFile('public/research/visit-counts.json',`${JSON.stringify(archive,null,2)}\n`);
