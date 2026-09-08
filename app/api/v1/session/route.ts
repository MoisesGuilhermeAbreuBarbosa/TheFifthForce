import {randomBytes} from 'node:crypto';
import {cookies} from 'next/headers';
import {db,hash,userId,body,reply,trustedWrite} from '@/lib/community';
export const dynamic='force-dynamic';
export async function GET(){try{return reply({id:await userId()});}catch{return reply({error:'Account storage is not configured. The site operator must connect a durable database.'},503);}}
export async function POST(req:Request){if(!trustedWrite(req)||req.headers.has('authorization'))return reply({error:'Use your browser account page.'},403);try{
 const p=await body(req);let id:string;let recovery:string|undefined;
 if(p.action==='create'){id=crypto.randomUUID();recovery='ofr_'+randomBytes(32).toString('hex');const r=await db().prepare('INSERT INTO accounts(id,recovery_hash,created) SELECT ?,?,? WHERE (SELECT count(*) FROM accounts)<10000').bind(id,await hash(recovery),new Date().toISOString()).run();if(!r.meta.changes)return reply({error:'Account capacity reached.'},429);}
 else if(p.action==='login'&&/^ofr_[a-f0-9]{64}$/.test(p.recovery??'')){const row=await db().prepare('SELECT id FROM accounts WHERE recovery_hash=?').bind(await hash(p.recovery)).first();if(!row)return reply({error:'Invalid recovery key.'},401);id=row.id;}
 else return reply({error:'Choose create or supply a valid recovery key.'},400);
 const token='ofs_'+randomBytes(32).toString('hex');const expires=new Date(Date.now()+30*86400000);await db().prepare('DELETE FROM sessions WHERE owner=? OR expires<?').bind(id,new Date().toISOString()).run();await db().prepare('INSERT INTO sessions VALUES(?,?,?)').bind(await hash(token),id,expires.toISOString()).run();(await cookies()).set('of_session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',expires});return reply({id,recovery});
 }catch{return reply({error:'Account storage unavailable. Ask the site operator to check database configuration.'},503);}}
export async function DELETE(req:Request){if(!trustedWrite(req))return reply({error:'Origin rejected'},403);try{const c=await cookies();const token=c.get('of_session')?.value;if(token)await db().prepare('DELETE FROM sessions WHERE token_hash=?').bind(await hash(token)).run();c.delete('of_session');return reply({signed_out:true});}catch{return reply({error:'Sign-out unavailable'},503);}}
