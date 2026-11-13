"""
Pithouse Blender Scene Bridge — Blender 4.5+
In Blender's Scripting workspace, run this file after saving the .blend in
the repository root. Produces scene JSON and optional render-only GLB.
Blender Z-up -> PlayCanvas/glTF Y-up.
"""
import bpy
import json
from pathlib import Path
from mathutils import Vector

PROJECT = Path(bpy.path.abspath("//"))
EXPERIENCE = PROJECT / "experience"
SCENE_JSON = EXPERIENCE / "data" / "pithouse-scene.json"
PROPS_GLB = EXPERIENCE / "assets" / "pithouse-props.glb"

def point(v):
    return [round(float(v.x), 5), round(float(v.z), 5), round(float(-v.y), 5)]

def world_box(obj):
    corners = [obj.matrix_world @ Vector(v) for v in obj.bound_box]
    pts = [point(p) for p in corners]
    mi = [min(p[i] for p in pts) for i in range(3)]
    ma = [max(p[i] for p in pts) for i in range(3)]
    return ([round((mi[i] + ma[i])/2, 5) for i in range(3)],
            [max(round(ma[i] - mi[i], 5), .01) for i in range(3)])

def prop(obj, key, default=None):
    return obj.get(key, default)

if not SCENE_JSON.exists():
    raise FileNotFoundError("Missing repository experience/data/pithouse-scene.json: " + str(SCENE_JSON))
data = json.loads(SCENE_JSON.read_text(encoding="utf-8"))
data["colliders"] = []
data["hotspots"] = []
data["collectibles"] = []
data["characters"] = []
spawn = bpy.data.objects.get("_SPAWN")
look = bpy.data.objects.get("_LOOK_AT")
if spawn:
    data.setdefault("spawn", {})["position"] = point(spawn.matrix_world.translation)
if look:
    data.setdefault("spawn", {})["lookAt"] = point(look.matrix_world.translation)

for obj in bpy.data.objects:
    name = obj.name
    if name.startswith("COL_") and obj.type in {"MESH", "EMPTY"}:
        center, size = world_box(obj)
        data["colliders"].append({
            "id": name, "center": center, "size": size,
            "kind": "floor" if name.startswith("COL_FLOOR_") else "solid",
            "enabled": True
        })
    elif name.startswith("HOT_"):
        data["hotspots"].append({
            "id": name, "name": str(prop(obj, "title", name[4:].replace("_", " "))),
            "position": point(obj.matrix_world.translation),
            "radius": float(prop(obj, "radius", 2.5)),
            "dialogue": str(prop(obj, "dialogue", "welcome"))
        })
    elif name.startswith("ITEM_"):
        data["collectibles"].append({
            "id": name, "name": str(prop(obj, "title", name[5:].replace("_", " "))),
            "position": point(obj.matrix_world.translation),
            "radius": float(prop(obj, "radius", 1.6)),
            "note": str(prop(obj, "note", "You found an object."))
        })
    elif name.startswith("NPC_"):
        data["characters"].append({
            "id": name, "name": str(prop(obj, "title", "Elder")),
            "position": point(obj.matrix_world.translation),
            "yaw": float(prop(obj, "yaw", 0)),
            "scale": float(prop(obj, "scale_pc", 1)),
            "interactRadius": float(prop(obj, "radius", 4)),
            "model": prop(obj, "model_url", None),
            "dialogue": str(prop(obj, "dialogue", "welcome")),
            "animationClips": {
                "Idle": str(prop(obj, "anim_idle", "Idle")),
                "Talk": str(prop(obj, "anim_talk", "Talk")),
                "Gesture": str(prop(obj, "anim_gesture", "Gesture"))
            }
        })

data.setdefault("environment", {})["propsGlb"] = None
props = [o for o in bpy.data.objects if o.type == "MESH"
         and (o.name.startswith("PROP_") or o.name.startswith("RENDER_"))]
if props:
    PROPS_GLB.parent.mkdir(parents=True, exist_ok=True)
    selected = list(bpy.context.selected_objects)
    active = bpy.context.view_layer.objects.active
    bpy.ops.object.select_all(action="DESELECT")
    try:
        for obj in props: obj.select_set(True)
        bpy.context.view_layer.objects.active = props[0]
        bpy.ops.export_scene.gltf(filepath=str(PROPS_GLB), export_format="GLB",
                                  use_selection=True, export_yup=True)
    finally:
        bpy.ops.object.select_all(action="DESELECT")
        for obj in selected:
            if obj.name in bpy.data.objects: obj.select_set(True)
        bpy.context.view_layer.objects.active = active
    data["environment"]["propsGlb"] = "./assets/pithouse-props.glb"

SCENE_JSON.parent.mkdir(parents=True, exist_ok=True)
SCENE_JSON.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print("Pithouse scene exported:", SCENE_JSON)
print("Characters", len(data["characters"]), "colliders", len(data["colliders"]),
      "hotspots", len(data["hotspots"]), "collectibles", len(data["collectibles"]), "props", len(props))
