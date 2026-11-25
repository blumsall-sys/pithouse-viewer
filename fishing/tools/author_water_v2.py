import bpy,json,numpy as np,math
from mathutils import Vector
root=r'G:\Pit House Test\Fishing Mini Game';out=root+r'\fraser-fishing-minigame\public\assets'
level=json.load(open(out+r'\level.json'));water=-.30;bottom=-1.85
polygon=[[-1.2,3.7],[.7,2.05],[1.9,2.05],[2.5,2.55],[4.1,2.4],[5.9,2.9],[8.6,3.8],[9,8.1],[-1.2,8.1]]
def inside(x,z):
 yes=False
 for i,a in enumerate(polygon):
  b=polygon[i-1]
  if (a[1]>z)!=(b[1]>z) and x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0]:yes=not yes
 return yes
source=bpy.data.objects['Rugged River Gorge Landscape'];count=len(source.data.points);raw=np.empty(count*3,dtype=np.float32);source.data.attributes['position'].data.foreach_get('vector',raw);raw=raw.reshape(-1,3);matrix=np.array(source.matrix_world);all_points=raw@matrix[:3,:3].T+matrix[:3,3];radiance=np.empty(count*4,dtype=np.float32);source.data.attributes['radiance:base'].data.foreach_get('vector',radiance);radiance=radiance.reshape(-1,4);valid=(all_points[:,0]>-2)&(all_points[:,0]<9)&(all_points[:,1]>-8)&(all_points[:,1]<4)&(all_points[:,2]>-1.5)&(all_points[:,2]<2)&(radiance[:,3]>.35);points=all_points[valid];cell=.18;minx=-1.8;minz=-3.5;w=62;h=66
bins={}
for x,y,z in points:
 i=int((x-minx)/cell);j=int((-y-minz)/cell)
 if 0<=i<w and 0<=j<h:bins.setdefault(j*w+i,[]).append(float(z))
heights=[]
for j in range(h):
 for i in range(w):
  vals=bins.get(j*w+i,[]);top=float(np.percentile(vals,75)) if len(vals)>=4 else -2
  heights.append(round(top,3) if top>water+.065 else None)
col=bpy.data.collections['FISHING_RIVER_V2']
def mesh(name,vs,faces,role):
 o=bpy.data.objects.get(name)
 if o:bpy.data.objects.remove(o,do_unlink=True)
 m=bpy.data.meshes.new(name);m.from_pydata([(x,-z,y) for x,y,z in vs],[],faces);m.update();o=bpy.data.objects.new(name,m);col.objects.link(o);o['game_role']=role;return o
vs=[];faces=[];landvs=[];landfaces=[]
for j in range(h):
 for i in range(w):
  x=minx+i*cell;z=minz+j*cell;top=heights[j*w+i]
  if top is not None:
   k=len(landvs);landvs.extend([(x,bottom,z),(x+cell,bottom,z),(x+cell,bottom,z+cell),(x,bottom,z+cell),(x,top,z),(x+cell,top,z),(x+cell,top,z+cell),(x,top,z+cell)])
   landfaces.extend([tuple(k+t for t in face) for face in [(4,7,6,5),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]])
  if inside(x+cell/2,z+cell/2) and top is None:
   k=len(vs);vs.extend([(x,water,z),(x,water,z+cell),(x+cell,water,z+cell),(x+cell,water,z)]);faces.append((k,k+1,k+2,k+3))
surface=mesh('WATER_RiverSurface',vs,faces,'water_surface');surface.display_type='WIRE';surface.hide_render=True
rocks=mesh('COLL_RiverRocksAndBank',landvs,landfaces,'rock_collision');rocks.display_type='WIRE';rocks.hide_render=True
volume=bpy.data.objects.get('VOLUME_FishableRiver')
if not volume:
 bpy.ops.mesh.primitive_cube_add();volume=bpy.context.object
 for c in list(volume.users_collection):c.objects.unlink(volume)
 col.objects.link(volume);volume.name='VOLUME_FishableRiver'
volume.location=(3.7,-5.1,(water+bottom)/2);volume.dimensions=(10,6,water-bottom);volume.display_type='WIRE';volume.hide_render=True;volume['game_role']='water_volume'
level['waterY']=water;level['water']={'surfaceY':water,'bottomY':bottom,'polygon':polygon,'fishDepth':.48,'normalMap':'./assets/water-normal.png'}
level['rockGrid']={'minX':minx,'minZ':minz,'cell':cell,'width':w,'height':h,'heights':heights}
level['river']={'minX':-.8,'maxX':8.2,'minZ':4.9,'maxZ':7.65,'spawnX':-.8,'goalX':8.2,'flow':'x'}
level['eddies']=[[1.6,water,5.65,.55],[3.8,water,6.25,.55],[5.8,water,5.55,.55]]
level['basket']=[3.38,.334,-.7];level['fishForwardAxis']='+Z';level['interactionRadius']=1.8
for i,e in enumerate(level['eddies']):
 o=bpy.data.objects.get('Eddy_%02d'%(i+1))
 if o:o.location=(e[0],-e[2],water)
for name,x in [('ZONE_FishSpawn',-.8),('ZONE_FishGoal',8.2)]:
 o=bpy.data.objects[name];o.location=(x,-6.1,water-.5);o.dimensions=(.3,2.6,.9)
for o in bpy.data.collections['ASSETS'].objects:
 if o.name!='BASKET 1':o.hide_render=True;o.hide_set(True)
basket=bpy.data.objects['BASKET 1'];basket.hide_render=False;basket.hide_set(False);basket.location=(3.38,.7,.334)
# The basket mesh's origin sits near its base, not at its vertical center.
basket['game_role']='elder_basket'
for target,name in [(surface,'river_surface.glb'),(rocks,'river_rocks.glb')]:
 bpy.ops.object.select_all(action='DESELECT');target.hide_set(False);target.select_set(True);bpy.context.view_layer.objects.active=target
 bpy.ops.export_scene.gltf(filepath=out+'\\models\\'+name,export_format='GLB',use_selection=True,export_animations=False)
json.dump(level,open(out+r'\level.json','w'),indent=2)
bpy.ops.wm.save_as_mainfile(filepath=root+r'\BLENDER\Fishing_MiniGame_Gameplay.blend')
result={'water_faces':len(faces),'rock_cells':sum(x is not None for x in heights),'saved':bpy.data.filepath}
