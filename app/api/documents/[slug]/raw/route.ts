import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {documents} from '@/lib/documents';
export async function GET(_:Request,{params}:{params:Promise<{slug:string}>}){const d=documents[(await params).slug];if(!d)return new Response('Not found',{status:404});return new Response(await readFile(join(process.cwd(),'public/research',d.raw),'utf8'),{headers:{'Content-Type':'text/plain; charset=utf-8','Content-Disposition':`attachment; filename="${d.raw}"`}});}
