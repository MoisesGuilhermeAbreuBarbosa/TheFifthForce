import {cookies} from 'next/headers';
import {db} from './storage';
export {db};
export async function hash(s:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,'0')).join('');}
export async function userId(){const token=(await cookies()).get('of_session')?.value;if(!token||!/^ofs_[a-f0-9]{64}$/.test(token))return null;const row=await db().prepare('SELECT owner FROM sessions WHERE token_hash=? AND expires>?').bind(await hash(token),new Date().toISOString()).first();return row?.owner??null;}
export async function identity(req:Request){const b=req.headers.get('authorization');if(b){const key=b.match(/^Bearer (of_[a-f0-9]{64})$/)?.[1];if(!key)return null;const row=await db().prepare('SELECT id FROM accounts WHERE token_hash = ?').bind(await hash(key)).first();return row?.id??null;}return userId();}
export const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, POST, DELETE, OPTIONS','Access-Control-Allow-Headers':'Authorization, Content-Type','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
export function reply(data:unknown,status=200){return Response.json(data,{status,headers:cors});}
export function trustedWrite(req:Request){return req.headers.has('authorization')||req.headers.get('origin')===new URL(req.url).protocol+'//'+req.headers.get('host');}
export async function body(req:Request){if(!req.headers.get('content-type')?.startsWith('application/json'))throw new Error('Use JSON');const reader=req.body?.getReader();if(!reader)throw new Error('Missing JSON');let total=0;const chunks=[];while(true){const x=await reader.read();if(x.done)break;total+=x.value.byteLength;if(total>32768){await reader.cancel();throw new Error('Maximum 32 KB');}chunks.push(x.value);}const out=new Uint8Array(total);let at=0;for(const x of chunks){out.set(x,at);at+=x.length;}return JSON.parse(new TextDecoder().decode(out));}
