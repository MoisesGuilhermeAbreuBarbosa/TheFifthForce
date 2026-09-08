#!/usr/bin/env python3
"""Retrieve ordinary public captions, recording access failures without inventing text.
Outputs are private working material. Redistribution requires the appropriate rights.
"""
import argparse, concurrent.futures, hashlib, json, pathlib, re, urllib.request
IDS=['bY1EQ6HD-ao','ybxSgIBbBh8','XKRMbVpJ3Rc','JMWEQwIt_ew']
def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=20) as r:
        data=r.read(20_000_001)
        if len(data)>20_000_000:raise ValueError('Response exceeds retrieval limit')
        return data

def retrieve(video_id,out):
    result={'video_id':video_id,'url':'https://www.youtube.com/watch?v='+video_id,'status':'unavailable','transcript_verified':False}
    try:
        html=fetch(result['url']).decode('utf-8','replace')
        m=re.search(r'ytInitialPlayerResponse\s*=\s*',html)
        if not m:raise ValueError('Public player metadata not found')
        player,_=json.JSONDecoder().raw_decode(html[m.end():])
        detail=player.get('videoDetails',{});result.update(title=detail.get('title'),creator=detail.get('author'))
        tracks=player.get('captions',{}).get('playerCaptionsTracklistRenderer',{}).get('captionTracks',[])
        english=[t for t in tracks if t.get('languageCode','').startswith('en')]
        english.sort(key=lambda t:t.get('kind')=='asr')
        if not english:raise ValueError('No public English caption track listed')
        track=english[0];data=fetch(track['baseUrl']+'&fmt=json3')
        if not data.strip():raise ValueError('Caption endpoint returned no text')
        content=json.loads(data);segments=[]
        for e in content.get('events',[]):
            text=''.join(s.get('utf8','') for s in e.get('segs',[])).strip()
            if text:segments.append({'start':e.get('tStartMs',0)/1000,'end':(e.get('tStartMs',0)+e.get('dDurationMs',0))/1000,'text':text})
        if not segments:raise ValueError('No speech segments in caption response')
        path=out/(video_id+'.private.json');path.write_text(json.dumps({'segments':segments,'source':result['url'],'review_status':'unreviewed'},ensure_ascii=False,indent=2),encoding='utf-8')
        result.update(status='retrieved_unreviewed',caption_type=track.get('kind','publisher'),segments=len(segments),sha256=hashlib.sha256(data).hexdigest())
    except Exception as exc:result['reason']=str(exc)[:240]
    return result

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--out',type=pathlib.Path,required=True);args=parser.parse_args();args.out.mkdir(parents=True,exist_ok=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:results=list(pool.map(lambda v:retrieve(v,args.out),IDS))
    (args.out/'retrieval-status.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
    for r in results:print(r['video_id'],r['status'],r.get('reason',''))
if __name__=='__main__':main()
