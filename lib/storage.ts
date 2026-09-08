import {createClient} from '@libsql/client';
import {schema} from './schema';
let client:ReturnType<typeof createClient>|undefined;
let ready:Promise<unknown>|undefined;
export function db(){
 if(!client){const url=process.env.TURSO_DATABASE_URL;if(!url || (process.env.VERCEL && url.startsWith('file:')))throw Error('Configure a durable TURSO_DATABASE_URL for hosting.');client=createClient({url,authToken:process.env.TURSO_AUTH_TOKEN});}
 const c=client;
 if(!ready)ready=c.batch(schema,'write').catch(e=>{ready=undefined;throw e;});
 return {prepare(sql:string){let args:any[]=[];const execute=async()=>{await ready;return c.execute({sql,args});};return {bind(...v:any[]){args=v;return this;},async first(){return (await execute()).rows[0] as any??null;},async all(){return {results:(await execute()).rows as any[]};},async run(){return {meta:{changes:(await execute()).rowsAffected}};}}}};
}
