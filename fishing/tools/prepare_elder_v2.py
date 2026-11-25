import bpy
root=r'G:\Pit House Test\Fishing Mini Game';bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=root+r'\3D ASSETS\Elder_NLA_wMesh.glb')
for o in list(bpy.data.objects):
 if o.name.startswith('Icosphere'):bpy.data.objects.remove(o,do_unlink=True)
for o in bpy.data.objects:
 if o.type=='ARMATURE':o.data.pose_position='REST'
for o in bpy.data.objects:
 if o.type!='MESH':continue
 bpy.context.view_layer.objects.active=o
 for mod in o.modifiers:
  if mod.type=='ARMATURE':mod.show_viewport=False;mod.show_render=False
 weld=o.modifiers.new('Weld original split triangle seams','WELD');weld.merge_threshold=.00003;bpy.ops.object.modifier_apply(modifier=weld.name)
 mod=o.modifiers.new('Browser mesh budget','DECIMATE');mod.ratio=min(1,18000/len(o.data.polygons));bpy.ops.object.modifier_apply(modifier=mod.name)
 for mod in o.modifiers:
  if mod.type=='ARMATURE':mod.show_viewport=True;mod.show_render=True
for o in bpy.data.objects:
 if o.type=='ARMATURE':o.data.pose_position='POSE'
for im in bpy.data.images:
 if max(im.size)>1024:
  ratio=1024/max(im.size);im.scale(int(im.size[0]*ratio),int(im.size[1]*ratio))
bpy.ops.export_scene.gltf(filepath=root+r'\fraser-fishing-minigame\public\assets\models\npc_fisher_host.glb',export_format='GLB',export_animations=True,export_animation_mode='NLA_TRACKS',export_image_format='JPEG',export_jpeg_quality=85)
print('ELDER_REST_GEOMETRY_PRESERVED')
