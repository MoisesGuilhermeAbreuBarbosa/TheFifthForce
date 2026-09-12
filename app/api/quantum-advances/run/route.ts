import {createHash} from 'node:crypto';
import {z} from 'zod';

export const runtime='nodejs';

const G=6.67430e-11;
const families=['null','repulsive_inverse_square','yukawa','oscillatory','quantum_postselected'] as const;
const requestSchema=z.object({
  family:z.enum(families),sourceMassKg:z.number().positive().max(1e6),distanceM:z.number().min(0.003).max(100),
  alpha:z.number().min(-1e6).max(1e6),rangeM:z.number().positive().max(100),noiseSigma:z.number().positive().max(1),
  samples:z.number().int().min(40).max(2000),seed:z.number().int(),mode:z.enum(['simulation','sweep']).default('simulation')
}).strict();

function rng(seed:number){let s=seed>>>0;return()=>{s=(Math.imul(1664525,s)+1013904223)>>>0;return s/4294967296;};}
function gaussian(next:()=>number){const u=Math.max(next(),1e-12),v=next();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
function accelerationBranch(m:number,sourceX:number,probeX:number){const dx=probeX-sourceX,r=Math.abs(dx);return -G*m*dx/(r*r*r);}
function anomaly(family:typeof families[number],m:number,r:number,t:number,alpha:number,rangeM:number){
  if(family==='null')return 0;
  if(family==='repulsive_inverse_square')return alpha*G*m/(r*r);
  if(family==='yukawa')return alpha*G*m/(r*r)*(1+r/rangeM)*Math.exp(-r/rangeM);
  if(family==='oscillatory')return alpha*1e-11*Math.sin(2*Math.PI*0.7*t);
  const left=-50e-6,right=50e-6,i=1/Math.sqrt(2),fL=.8,fR=-.6;
  const aL=accelerationBranch(m,left,r),aR=accelerationBranch(m,right,r);
  return alpha*((fL*aL*i+fR*aR*i)/(fL*i+fR*i)-.5*(aL+aR));
}
function canonical(value:unknown):string{if(value===null||typeof value!=='object')return JSON.stringify(value);if(Array.isArray(value))return `[${value.map(canonical).join(',')}]`;const object=value as Record<string,unknown>;return `{${Object.keys(object).sort().map(key=>`${JSON.stringify(key)}:${canonical(object[key])}`).join(',')}}`;}
function rms(values:number[]){return Math.sqrt(values.reduce((sum,value)=>sum+value*value,0)/Math.max(1,values.length));}

export async function POST(request:Request){
  let input:z.infer<typeof requestSchema>;
  try{input=requestSchema.parse(await request.json());}catch{return Response.json({error:'Invalid QAGRA run parameters.'},{status:400});}
  const createdAt=new Date().toISOString();
  if(input.mode==='sweep'){
    const points=Array.from({length:101},(_,index)=>{const alpha=index*Math.max(.5,Math.abs(input.alpha)*2)/100;const values=Array.from({length:80},(_,j)=>anomaly(input.family,input.sourceMassKg,input.distanceM*(.75+.5*j/79),60*j/79,alpha,input.rangeM));return {alpha,snr:rms(values)/input.noiseSigma};});
    const contentHash=createHash('sha256').update(canonical({input,points})).digest('hex');
    return Response.json({schemaVersion:'qagra.run.v1',runId:`qgr_${contentHash.slice(0,24)}`,contentHash,createdAt,engine:'qagra-vercel-node-v1',input,summary:{points:points.length,maxSnr:Math.max(...points.map(point=>point.snr))},points});
  }
  const next=rng(input.seed),points=[];
  for(let index=0;index<input.samples;index++){
    const timeS=60*index/Math.max(1,input.samples-1),distanceM=Math.min(.2,Math.max(.003,input.distanceM*(.72+.56*next())));
    const signal=anomaly(input.family,input.sourceMassKg,distanceM,timeS,input.alpha,input.rangeM),noise=gaussian(next)*input.noiseSigma;
    points.push({index,timeS,distanceM,signal,noise,residual:signal+noise});
  }
  const contentHash=createHash('sha256').update(canonical({input,points})).digest('hex');
  const mean=points.reduce((sum,point)=>sum+point.residual,0)/points.length;
  return Response.json({schemaVersion:'qagra.run.v1',runId:`qgr_${contentHash.slice(0,24)}`,contentHash,createdAt,engine:'qagra-vercel-node-v1',input,summary:{samples:points.length,rmsSignal:rms(points.map(point=>point.signal)),rmsResidual:rms(points.map(point=>point.residual)),meanResidual:mean,snr:rms(points.map(point=>point.signal))/input.noiseSigma},points});
}
