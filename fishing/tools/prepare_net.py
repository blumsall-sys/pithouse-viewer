import bpy
from mathutils import Matrix,Vector
root=r'G:\Pit House Test\Fishing Mini Game'
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=root+r'\3D ASSETS\DipNet.glb')
o=next(o for o in bpy.data.objects if o.type=='MESH');o.parent=None;o.matrix_world=Matrix.Identity(4)
for v in o.data.vertices:
 x,y,z=v.co;v.co=Vector(((z-.18)*2,(.31966-x)*2,-y*2))
bpy.context.view_layer.objects.active=o
weld=o.modifiers.new('Join source triangle seams','WELD');weld.merge_threshold=.00006;bpy.ops.object.modifier_apply(modifier=weld.name)
mod=o.modifiers.new('Browser mesh budget','DECIMATE');mod.ratio=min(1,16000/len(o.data.polygons));bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
for im in bpy.data.images:
 if max(im.size)>1024:
  ratio=1024/max(im.size);im.scale(int(im.size[0]*ratio),int(im.size[1]*ratio))
bpy.ops.export_scene.gltf(filepath=root+r'\fraser-fishing-minigame\public\assets\models\dip_net.glb',export_format='GLB',export_animations=False,export_image_format='JPEG',export_jpeg_quality=85)
