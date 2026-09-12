export type VisitorKind='human'|'ai'|'crawler';

const AI_AGENTS=/GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|CCBot|Bytespider|cohere-ai|Amazonbot|meta-externalagent|Applebot-Extended/i;
const CRAWLERS=/bot|crawler|spider|slurp|bingpreview|facebookexternalhit|WhatsApp|Discordbot|LinkedInBot/i;

export function classifyVisitor(userAgent:string):VisitorKind{
  if(AI_AGENTS.test(userAgent))return 'ai';
  if(CRAWLERS.test(userAgent))return 'crawler';
  return 'human';
}

async function redis(command:Array<string|number>){
  const url=process.env.UPSTASH_REDIS_REST_URL,token=process.env.UPSTASH_REDIS_REST_TOKEN;
  if(!url||!token)return null;
  const response=await fetch(url,{method:'POST',headers:{authorization:`Bearer ${token}`,'content-type':'application/json'},body:JSON.stringify(command),cache:'no-store'});
  if(!response.ok)throw new Error('Visit counter storage unavailable');
  return (await response.json()).result;
}

export async function recordVisit(kind:VisitorKind){
  await Promise.all([redis(['INCR','open-field:visits:total']),redis(['INCR',`open-field:visits:${kind}`])]);
}

export async function getVisitCounts(){
  const values=await redis(['MGET','open-field:visits:total','open-field:visits:human','open-field:visits:ai','open-field:visits:crawler']);
  if(!values)return null;
  const [total,human,ai,crawler]=(values as Array<string|null>).map(value=>Number(value||0));
  return {total,human,ai,crawler};
}
