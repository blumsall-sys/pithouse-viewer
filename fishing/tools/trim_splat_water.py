import numpy as np,json
from pathlib import Path
root=Path(r'G:\Pit House Test\Fishing Mini Game');level=json.loads((root/'fraser-fishing-minigame/public/assets/level.json').read_text());path=root/'SPLATS/Rugged River Gorge Landscape.ply'
with path.open('rb')as f:
 header=b''
 while not header.endswith(b'end_header\n'):header+=f.readline()
 n=int(next(l.split()[2]for l in header.splitlines()if l.startswith(b'element vertex ')));data=np.frombuffer(f.read(),dtype='<f4').reshape(n,-1).copy()
x,y,z,w=level['splat']['rotation'];r=np.array([[1-2*(y*y+z*z),2*(x*y-z*w),2*(x*z+y*w)],[2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w)],[2*(x*z-y*w),2*(y*z+x*w),1-2*(x*x+y*y)]])
world=data[:,:3]@r.T+level['splat']['position'];xx=world[:,0];zz=world[:,2];inside=np.zeros(n,dtype=bool);poly=level['water']['polygon']
for i,a in enumerate(poly):
 b=poly[i-1];inside^=((a[1]>zz)!=(b[1]>zz))&(xx<(b[0]-a[0])*(zz-a[1])/(b[1]-a[1]+1e-20)+a[0])
keep=~(inside&(world[:,1]<level['waterY']+.065));filtered=data[keep];header=header.replace(f'element vertex {n}'.encode(),f'element vertex {len(filtered)}'.encode());scratch=Path(__file__).resolve().parent/'work';scratch.mkdir(exist_ok=True);out=scratch/'river-v2-trimmed.ply';out.write_bytes(header+filtered.tobytes());print('Removed captured water splats:',n-len(filtered),'retained:',len(filtered))
