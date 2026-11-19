"""Pithouse Elder FBX -> GLB converter for Blender 4.5 / 5.x.

Run: blender -b --python build_elder_glb.py -- "<FBX folder>" "<project>/experience/assets/elder.glb"
Requires Idle.fbx, Talking.fbx, Working On Device.fbx in <FBX folder>.
These files are deliberately not committed to the public repository.
"""
import bpy,sys,traceback,json,struct
from pathlib import Path
def main():
    args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
    if len(args)<2:raise ValueError('Usage: -- <folder with FBX files> <output GLB>')
    folder,out=Path(args[0]),Path(args[1])
    names=[('Idle','Idle.fbx'),('Talk','Talking.fbx'),('FireWork','Working On Device.fbx')]
    for _,name in names:
        if not (folder/name).exists():raise FileNotFoundError(str(folder/name))
    bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
    armature=None;meshes=[];original_bones=None;tracks=[]
    for i,(clip,filename) in enumerate(names):
        before=set(bpy.data.objects)
        print('[Pithouse] FBX import:',filename,flush=True)
        bpy.ops.import_scene.fbx(filepath=str(folder/filename),use_anim=True,ignore_leaf_bones=True)
        imported=list(set(bpy.data.objects)-before)
        armatures=[o for o in imported if o.type=='ARMATURE']
        if not armatures:raise RuntimeError('No armature in '+filename)
        rig=max(armatures,key=lambda o:len(o.data.bones))
        bone_names=[b.name for b in rig.data.bones]
        if original_bones is None:original_bones=bone_names
        if original_bones!=bone_names:raise RuntimeError('Skeleton mismatch: '+filename)
        if not rig.animation_data or not rig.animation_data.action:raise RuntimeError('Missing Action: '+filename)
        action=rig.animation_data.action.copy()
        action.name=clip;action.use_fake_user=True;tracks.append((clip,action))
        if not i:
            armature=rig;meshes=[o for o in imported if o.type=='MESH']
            if not meshes:raise RuntimeError('No skinned mesh in Idle.fbx')
        else:
            for obj in imported:bpy.data.objects.remove(obj,do_unlink=True)
    armature.animation_data_create();armature.animation_data.action=None
    for name,action in tracks:
        nla=armature.animation_data.nla_tracks.new();nla.name=name
        strip=nla.strips.new(name,max(1,int(action.frame_range[0])),action)
        strip.name=name
    bpy.ops.object.select_all(action='DESELECT')
    armature.select_set(True)
    for mesh in meshes:mesh.select_set(True)
    bpy.context.view_layer.objects.active=armature
    out.parent.mkdir(parents=True,exist_ok=True)
    bpy.ops.export_scene.gltf(filepath=str(out),export_format='GLB',use_selection=True,
        export_yup=True,export_animations=True,export_animation_mode='NLA_TRACKS',
        export_force_sampling=True,export_anim_slide_to_zero=True,
        export_skins=True,export_materials='EXPORT')
    with out.open('rb') as f:
        header=f.read(20)
        if header[:4]!=b'glTF':raise RuntimeError('Output is not GLB')
        length,ctype=struct.unpack_from('<II',header,12)
        if ctype!=0x4e4f534a:raise RuntimeError('GLB JSON chunk missing')
        manifest=json.loads(f.read(length))
    clips=[a.get('name','') for a in manifest.get('animations',[])]
    print('[Pithouse] Exported GLB animations',clips,flush=True)
    if any(x not in clips for x in ('Idle','Talk','FireWork')):
        raise RuntimeError('GLB missing required clips: '+str(clips))
    (out.parent/'elder-export-report.json').write_text(json.dumps(
      {'file':out.name,'bytes':out.stat().st_size,'clips':clips,'boneCount':len(original_bones)},indent=2))
    print('[Pithouse] Success:',out,flush=True)
try:main()
except Exception:traceback.print_exc();sys.exit(1)
