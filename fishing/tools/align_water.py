import bpy,json,math
from mathutils import Vector
root=r'G:\Pit House Test\Fishing Mini Game';out=root+r'\fraser-fishing-minigame\public\assets';col=bpy.data.collections['FISHING_GAMEPLAY']
def box(name,loc,dims,role):
 o=bpy.data.objects[name];o.location=loc;o.dimensions=dims;o['game_role']=role;o.hide_set(False);o.display_type='WIRE'
box('COLL_PlayerBankFloor',(3.7,.15,.15),(4.2,5.3,.32),'walkable')
box('BOUND_RiverEdge',(3.7,-2.65,.85),(4.5,.2,2),'player_wall')
box('BOUND_BackEdge',(3.7,2.95,.85),(4.5,.2,2),'player_wall')
box('BOUND_UpstreamEnd',(1.45,.15,.85),(.2,5.8,2),'player_wall')
box('BOUND_DownstreamEnd',(5.95,.15,.85),(.2,5.8,2),'player_wall')
box('ZONE_FishSpawn',(-.6,-5.25,-.05),(.4,1.4,.5),'fish_spawn')
box('ZONE_FishGoal',(7.3,-5.25,-.05),(.4,1.4,.5),'fish_goal')
box('BOUND_FishFarBank',(3.35,-6.1,-.1),(8.3,.2,.8),'fish_wall')
box('BOUND_FishNearBank',(3.35,-4.5,-.1),(8.3,.2,.8),'fish_wall')
eddies=[(1.9,-4.9,.6),(3.5,-4.9,.6),(5.2,-4.9,.6)]
for i,(x,y,r) in enumerate(eddies):o=bpy.data.objects['Eddy_%02d'%(i+1)];o.location=(x,y,.02);o.dimensions=(r*2,r*2,.03);o['radius']=r;o.hide_set(False)
# Use evaluated animated geometry to position the elder, because rest-pose bounds omit rig scale.
elder=bpy.data.objects['GAME_ElderRoot'];elder.hide_set(False)
for o in elder.children_recursive:o.hide_set(False)
bpy.context.scene.frame_set(1);bpy.context.view_layer.update();dg=bpy.context.evaluated_depsgraph_get()
vs=[]
for o in elder.children_recursive:
 if o.type=='MESH':
  ev=o.evaluated_get(dg);vs.extend(ev.matrix_world@v.co for v in ev.data.vertices)
lo=min(v.z for v in vs);hi=max(v.z for v in vs);factor=1.65/(hi-lo);elder.scale*=factor
bpy.context.view_layer.update();dg=bpy.context.evaluated_depsgraph_get();vs=[]
for o in elder.children_recursive:
 if o.type=='MESH':
  ev=o.evaluated_get(dg);vs.extend(ev.matrix_world@v.co for v in ev.data.vertices)
cx=(min(v.x for v in vs)+max(v.x for v in vs))/2;cy=(min(v.y for v in vs)+max(v.y for v in vs))/2
elder.location+=Vector((3.382333-cx,1.378602-cy,.330705-min(v.z for v in vs)))
path=out+r'\level.json';config=json.load(open(path));config['river']={'minX':-.6,'maxX':7.3,'minZ':4.6,'maxZ':6.0,'spawnX':-.6,'goalX':7.3,'flow':'x'};config['bank']=[[1.7,-2.7],[5.7,-2.7],[5.7,2.4],[1.7,2.4]];config['eddies']=[[x,.02,-y,r] for x,y,r in eddies];config['walkBounds']={'minX':1.8,'maxX':5.6,'minZ':-2.65,'maxZ':2.3};config['colliders']=[{'name':o.name,'center':[o.location.x,o.location.z,-o.location.y],'size':[o.dimensions.x,o.dimensions.z,o.dimensions.y],'role':o.get('game_role')} for o in col.objects if o.get('game_role')]
json.dump(config,open(path,'w'),indent=2)
bpy.ops.object.select_all(action='DESELECT')
for o in col.objects:
 if o.get('game_role'):o.select_set(True)
bpy.ops.export_scene.gltf(filepath=out+r'\models\river_collision.glb',export_format='GLB',use_selection=True,export_animations=False)
for o in col.objects:
 if o.get('game_role'):o.select_set(False)
for a in bpy.context.screen.areas:
 if a.type=='VIEW_3D':
  r=a.spaces.active.region_3d;r.view_location=Vector((2,-1,0));r.view_distance=11;r.view_rotation=(Vector((1,0,.2))-Vector((4,-8,4))).to_track_quat('-Z','Y');r.view_perspective='PERSP'
bpy.ops.wm.save_as_mainfile(filepath=root+r'\BLENDER\Fishing_MiniGame_Gameplay.blend')
result={'saved':bpy.data.filepath,'water':'X=-0.6..7.3, Blender Y=-5.05..-3.15','elder_height':1.65}
