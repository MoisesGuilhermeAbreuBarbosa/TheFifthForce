import csv,json,math,re,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[1]/'public/research'
expected={'fig3a':'df578555b01f75b3373d42d5336b8190','fig3b':'0d5d04f094b5a7ff56e8554ab5805d4a','fig3d':'d77b516441a8f3c12b930fd560172790'}
def uncertainty(s):
 try:return float(s)
 except ValueError:
  m=re.fullmatch(r'(?:(\d+(?:\.\d+)?)\*)?Sqrt\[(\d+(?:\.\d+)?)\]',s)
  if not m:raise ValueError(s)
  return float(m[1] or 1)*math.sqrt(float(m[2]))
views={}
for key in expected:
 p=root/f'panda_{key}.csv';assert hashlib.md5(p.read_bytes()).hexdigest()==expected[key]
 rows=list(csv.reader(p.open(newline='')));result=[]
 if key!='fig3d':rows=rows[1:]
 for i,row in enumerate(rows,1):
  if key=='fig3a':x,y,error=i,float(row[0]),float(row[1])
  elif key=='fig3b':x,y,error=float(row[0]),float(row[1]),uncertainty(row[2])
  else:
   m=re.fullmatch(r'Around\[([^,]+),\s*([^\]]+)\]',row[1]);assert m
   x,y,error=float(row[0]),float(m[1]),float(m[2])
  assert all(math.isfinite(v) for v in [x,y,error]) and error>=0
  result.append(dict(row=i,x=x,y=y,error=error,original=row))
 views[key]={'file':p.name,'md5':expected[key],'rows':result}
assert len(views['fig3a']['rows'])==553 and len(views['fig3b']['rows'])==15 and len(views['fig3d']['rows'])==3
assert sum(r['y'] for r in views['fig3b']['rows'])==553
(root/'data-views.json').write_text(json.dumps(views,indent=2)+'\n')
print('Validated original hashes, 553 blocks, 15 bins, 3 groups and symbolic uncertainty parsing.')
