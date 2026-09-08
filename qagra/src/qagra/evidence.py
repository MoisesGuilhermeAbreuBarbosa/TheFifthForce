"""Append-only, SHA-256 hash-chained evidence ledger."""
from __future__ import annotations
from datetime import datetime,timezone
from pathlib import Path
import hashlib,json,uuid

def _canonical(obj): return json.dumps(obj,sort_keys=True,separators=(",",":"),ensure_ascii=False)
def sha256_file(path):
    h=hashlib.sha256()
    with Path(path).open("rb") as f:
        for block in iter(lambda:f.read(1024*1024),b""): h.update(block)
    return h.hexdigest()
class EvidenceLedger:
    def __init__(self,path): self.path=Path(path); self.path.parent.mkdir(parents=True,exist_ok=True)
    def _last_hash(self):
        if not self.path.exists() or self.path.stat().st_size==0: return "GENESIS"
        last=None
        with self.path.open("r",encoding="utf-8") as f:
            for line in f:
                if line.strip(): last=json.loads(line)
        return "GENESIS" if last is None else last["entry_hash"]
    def append(self,event_type,payload):
        body={"entry_id":str(uuid.uuid4()),"timestamp":datetime.now(timezone.utc).isoformat(),"event_type":event_type,"previous_hash":self._last_hash(),"payload":payload}; body["entry_hash"]=hashlib.sha256(_canonical(body).encode("utf-8")).hexdigest()
        with self.path.open("a",encoding="utf-8") as f: f.write(_canonical(body)+"\n")
        return body
    def verify(self):
        if not self.path.exists(): return True,0,None
        previous="GENESIS"; count=0
        with self.path.open("r",encoding="utf-8") as f:
            for count,line in enumerate(f,start=1):
                row=json.loads(line); expected=row.pop("entry_hash")
                if row.get("previous_hash")!=previous: return False,count,"previous_hash mismatch"
                actual=hashlib.sha256(_canonical(row).encode("utf-8")).hexdigest()
                if actual!=expected: return False,count,"entry_hash mismatch"
                previous=expected
        return True,count,None
