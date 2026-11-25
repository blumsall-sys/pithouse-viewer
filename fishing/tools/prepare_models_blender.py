import bpy,sys,os,math,json
from mathutils import Vector,Matrix
root=r'G:\Pit House Test\Fishing Mini Game';out=root+r'\fraser-fishing-minigame\public\assets\models'
def clean():bpy.ops.wm.read_factory_settings(use_empty=True)
def slim():
 for o in list(bpy.context.scene.objects):
  if o.type=='MESH' and len(o.data.polygons)>12000:
   bpy.context.view_layer.objects.active=o
   weld=o.modifiers.new('Join source triangle seams','WELD');weld.merge_threshold=.00003;bpy.ops.object.modifier_apply(modifier=weld.name)
   m=o.modifiers.new('Browser mesh budget','DECIMATE');m.ratio=12000/len(o.data.polygons);bpy.ops.object.modifier_apply(modifier=m.name)
 for im in bpy.data.images:
  if im.size[0]>1024 or im.size[1]>1024:
   r=1024/max(im.size);im.scale(int(im.size[0]*r),int(im.size[1]*r))
def export(name,anim=True):
 slim();bpy.ops.export_scene.gltf(filepath=out+'\\'+name,export_format='GLB',export_animations=anim,export_animation_mode='NLA_TRACKS',export_image_format='JPEG',export_jpeg_quality=85)
for src,dst in [('Elder_NLA_wMesh.glb','npc_fisher_host.glb'),('DipNet.glb','dip_net.glb'),('Basket.glb','basket.glb')]:
 clean();bpy.ops.import_scene.gltf(filepath=root+'\\3D ASSETS\\'+src)
 for o in list(bpy.data.objects):
  if o.name.startswith('Icosphere'):bpy.data.objects.remove(o,do_unlink=True)
 export(dst)
for src,dst in [('Fish1.glb','salmon_sockeye.glb'),('Fish2.glb','salmon_chinook.glb')]:
 clean();bpy.ops.import_scene.gltf(filepath=root+r'\3D ASSETS\Shark_exported-modelanimated.glb')
 arm=next(o for o in bpy.data.objects if o.type=='ARMATURE');arm.parent=None;arm.matrix_world=Matrix.Identity(4)
 for o in list(bpy.data.objects):
  if o.type=='MESH':bpy.data.objects.remove(o,do_unlink=True)
 before=set(bpy.data.objects);bpy.ops.import_scene.gltf(filepath=root+'\\3D ASSETS\\'+src)
 fish=next(o for o in set(bpy.data.objects)-before if o.type=='MESH');fish.parent=None;fish.matrix_world=Matrix.Identity(4)
 # Static salmon and shark both face -Y in Blender. Fit salmon along shark spine.
 vs=fish.data.vertices;mn=Vector((min(v.co.x for v in vs),min(v.co.y for v in vs),min(v.co.z for v in vs)));mx=Vector((max(v.co.x for v in vs),max(v.co.y for v in vs),max(v.co.z for v in vs)))
 length=mx.y-mn.y;center=(mn+mx)/2
 for v in vs:v.co=(v.co-center)*(6.1/length)+Vector((0,.5,.1))
 fish.parent=arm;m=fish.modifiers.new('Shared shark swim rig','ARMATURE');m.object=arm
 chain=[arm.data.bones[n] for n in ['head_tip','head','pelvis','tail_1','tail_2','tail_3','tail_4','tail_5','tail_6','tail_7','tail_8','tail_tip']]
 groups={b.name:fish.vertex_groups.new(name=b.name) for b in chain}
 for v in vs:
  nearest=sorted(chain,key=lambda b:abs(v.co.y-b.head_local.y))[:2];ds=[1/(abs(v.co.y-b.head_local.y)+.04)**2 for b in nearest];total=sum(ds)
  for b,w in zip(nearest,ds):groups[b.name].add([v.index],w/total,'REPLACE')
 arm.scale=(1/6.1,)*3
 if arm.animation_data:
  arm.animation_data.action=None
  for t in list(arm.animation_data.nla_tracks):
   if 'Swim_Horizontal' not in t.name:arm.animation_data.nla_tracks.remove(t)
   else:t.name='Swim'
 export(dst)
# Preserve existing world placements for static station props, elder is separately animated at runtime.
clean();bpy.ops.wm.open_mainfile(filepath=root+r'\BLENDER\Fishing_MiniGame_Gameplay.blend')
keep={'BASKET 1','DIP_NET','FISH 1','FISH 2'}
for o in list(bpy.data.objects):
 if o.name not in keep:bpy.data.objects.remove(o,do_unlink=True)
for o in bpy.data.objects:o.parent=None
export('station.glb',False)
print('BROWSER_ASSETS_READY')
