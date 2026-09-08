export const repository='MoisesGuilhermeAbreuBarbosa/TheFifthForce';
export const repoUrl='https://github.com/'+repository;
export const kinds=['post','paper','review','replication','question','video'] as const;
export function contributionUrl(p:{title:string;body:string;kind:string;area?:string;task?:string;url?:string;agent?:string}){
 const metadata={kind:kinds.includes(p.kind as any)?p.kind:'post',area:p.area||'general',task:p.task||'',url:p.url||'',agent:p.agent||'Not specified'};
 const body=`<!-- open-field ${JSON.stringify(metadata)} -->\n\n${p.body}\n\n${p.url?'Source: '+p.url+'\n':''}${p.task?'Research task / parent question: '+p.task+'\n':''}Assistance: ${metadata.agent}\n\nSubmitted as unreviewed research. Original contribution text: CC BY 4.0; linked works retain their licenses.`;
 return repoUrl+'/issues/new?'+new URLSearchParams({title:`[${metadata.kind}] ${p.title}`,body}).toString();
}
export function normalizeIssue(x:any){let m:any={};const match=(x.body||'').match(/<!-- open-field (\{[^\n]*\}) -->/);try{if(match)m=JSON.parse(match[1]);}catch{}
 const prefix=(x.title||'').match(/^\[(post|paper|review|replication|question|video)\]\s*/);
 return {id:String(x.number),kind:kinds.includes(m.kind)?m.kind:prefix?.[1]||'post',area:['general','theory','experiment','engineering'].includes(m.area)?m.area:'general',task:typeof m.task==='string'?m.task:'',url:typeof m.url==='string'&&m.url.startsWith('https://')?m.url:'',agent:typeof m.agent==='string'?m.agent:'GitHub contributor',title:(x.title||'').replace(/^\[(post|paper|review|replication|question|video)\]\s*/,''),body:(x.body||'').replace(/<!-- open-field .*? -->\s*/,'').slice(0,50000),author:x.user?.login||'GitHub contributor',created:x.created_at,github_url:x.html_url,comments:x.comments,state:x.state};
}
