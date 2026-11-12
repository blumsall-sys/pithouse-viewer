# Pithouse interactive experience — prototype

Independent PlayCanvas experience in the experience/ directory. The root SuperSplat viewer, settings.json, SOG and voxel data have NOT been modified.

## Start

Run the root TEST_LOCAL.bat or run python -m http.server 8000 in repository root, then open http://localhost:8000/experience/ in your desktop/mobile browser on a reachable HTTPS or LAN-hosted origin. Do not double-click the HTML file. The page imports PlayCanvas from jsDelivr and needs an internet connection for the ES module; the pithouse.sog is served by the repository. Do not reconfigure GitHub Pages on main until you test the feature branch separately.

- Renderer: PlayCanvas v2.24.0; same SOG as original viewer, now oriented with a 180° Z rotation to match the standard PlayCanvas GSplat asset transform.
- Inputs: desktop WASD/arrow keys, pointer lock to look, E interact, numeric 1–3 menu answers; mobile two thumbpads and Interact button.
- Dialogue: typewriter, 3 choices when the Elder is approached and interacted with (never automatic on start); minimum time before choices; optional browser-generated TTS, off by default.
- NPC: stand-in Elder initially placed beside the hearth and center pole (world position [0.95, 0, 2.2], adjustable in Blender), with interaction limited to 2.35 metres. Rigged GLB supported with three named embedded clips. The code builds an Idle/Talk/Gesture animation state graph where complete matching clips are available.
- Interaction: legacy SuperSplat annotations are surfaced as markers, plus authored hotspots and collectibles.
- Scene: edit data/pithouse-scene.json for positions, dialogue, callbacks, names, focus points, optional GLB assets.
- Collision: axis-aligned manually authored blocker boxes plus a bounding rectangle. The original voxel format is NOT integrated; this is not full gravity, capsule or physics movement.
- Optional GLB: scene mesh exports for props; SOG is a separate visual-only asset, not a colliding mesh.

## Blender to browser

Use Blender 4.5+ in metric units. Save the Blender .blend in the repository root or edit PROJECT in tools/blender_scene_bridge.py. Import your splat for reference (without expecting it to export as GLB) and keep scale/alignment consistent with existing pithouse.sog.

Author named empties / meshes:

| Name | Purpose | Custom properties |
| --- | --- | --- |
| _SPAWN | Eye/camera position | None |
| _LOOK_AT | First camera focal point | None |
| NPC_Elder | Elder placement | title, radius, dialogue, model_url, yaw, anim_idle, anim_talk, anim_gesture |
| HOT_Pole | Conversation/hotspot | title, radius, dialogue (dialogue node id) |
| ITEM_Stone | Collectible | title, note, radius |
| COL_Wall01 | Blocking box | Dimensions and transform |
| COL_FLOOR_Ground | Floor metadata, **not yet locomotion physics** | Dimensions and transform |
| PROP_Pottery / RENDER_Wall | GLB render mesh | Materials/textures |

Run experience/tools/blender_scene_bridge.py in Blender's Scripting workspace. Output is experience/data/pithouse-scene.json plus experience/assets/pithouse-props.glb (only if prop meshes exist). Export converts Blender Z-up to PlayCanvas Y-up: (x,z,-y). JSON dialogue nodes and config are preserved, but authored placements overwrite prior NPCs/hotspots/items/colliders. Rotated boxes become conservative axis-aligned boxes; for a final release implement triangle-mesh or convex colliders. The default Pithouse SOG uses rotation [0,0,180] on the splat entity. Keep NPC, spawn and annotations in the original viewer's world coordinates — do not apply this rotation to all scene objects. The default start camera uses the original settings.json center-pole annotation camera (position [-0.1983,2.1225,-3.5492], FOV 95). Fine-tune Elder and start via Blender after visually checking floor placement.

## Character art and animation ZIPs

For now combine a rig and Idle/Talk/Gesture animation clips into a single glTF/GLB with **identical skeleton**. Place under experience/assets/elder.glb and put ./assets/elder.glb in the NPC model field. The browser does not auto-load a ZIP of animations: unzip and export compatible clips. If names differ, edit each NPC's animationClips map. If clips are absent the model remains static.

## Writing a historical mini-adventure

Edit data/pithouse-scene.json dialogue map. A node includes speaker, text, optional focus [x,y,z], minDecisionSeconds (0–15) and choices. Each choice may link to another node via next, or return to roaming with mode:"explore". On Begin, the player freely explores from the saved interior camera. Elder dialogue appears ONLY after the player walks close and uses E/Interact or taps the enabled NPC marker. The story text is illustrative, **not vetted Indigenous cultural interpretation**. Consult cultural advisors / knowledge keepers for review, permissions and audio before publishing.

## Next release milestones

1. Validate SOG vs Blender transforms and calibrate physical scale, floor, eye height.
2. Implement solid capsule sweep/slide and floor/navmesh collision, trigger volumes and LOS picking.
3. Import rigged Elder with clip graph, optional prerecorded narration and synchronized gestures.
4. Build camera waypoints, 5–15-second cutscenes, checkpoints and save-state.
5. Test mobile touch/landscape plus memory and splat load FPS, use streamed SOG for larger future environments.

## Documentation sources

https://developer.playcanvas.com/user-manual/engine/standalone/
https://developer.playcanvas.com/user-manual/gaussian-splatting/building/your-first-app/engine/
https://developer.playcanvas.com/user-manual/animation/anim-state-graph-assets/

Backup branch: backup/2026-11-11-original-viewer. Work branch: feature/pithouse-interactive-experience.

## Orientation and spawn regression check

1. From a clean checkout of the feature branch, start `TEST_LOCAL.bat` and open `http://localhost:8000/experience/`.
2. Select **Begin the journey**. Roof beams and center pole should be above floor, with the camera inside the building and pointing toward the hearth. Check `http://localhost:8000/` against the original.
3. Wait 10+ seconds: Elder dialogue should not appear automatically.
4. Walk toward the Elder beside the hearth. The marker may be seen from farther away, but stays disabled until within the configured interaction radius. Look toward the Elder and press E or tap Interact.
5. Verify that the dialogue appears with three choices, then choose 'I just want to look around' and resume walking.
6. If a custom Blender export changes positions, revalidate `spawn`, `characters[].position`, and `environment.splatRotation` in `data/pithouse-scene.json`.

The runtime JS was syntax-checked, and JSON/branch content was checked via GitHub. Full browser visual verification is still required.

## Gameplay update — November 12, 2026

Runtime: experience/adventure-runtime.js adds PlayCanvas 2.24 VoxelOccupancy navigation from scene.voxel.json and scene.voxel.bin, ground-following movement, gravity and collisions. When voxel assets fail, it reports a warning and falls back to a limited flat-floor/box-collider controller. This is not a complete physics rigidbody or capsule sweep system.

Player spawn: [0.2,1.65,-1.6], lookAt [0.6,1.45,2.4], FOV 78. The first-person walker snaps the feet toward the detected floor. This placement needs visual verification against the actual SOG and voxel data.

Dialogue shots: manifest cameras.elder and cameras.hearth define position, look target, vertical FOV, duration and optional normalized keyframes. Camera saves player pose before first dialogue. Another question transitions back to Elder; ending or canceling dialogue restores player pose.

Collectibles: interacting with the Study Stone opens Inspect, Take or Leave; consume:true also offers Consume. Taking hides the world item and adds inventory. Inventory I or gamepad Y or toolbar; Elder offers an additional conversation when something was collected.

Controller: Xbox-style USB gamepad left stick move, right look, A interact/confirm, B back, Y inventory, Start pause, D-pad menus. Keyboard WASD/arrow move, mouse look, E interact, I inventory, Esc/P pause/back. Existing mobile touchpads remain.

Procedural ambience: Web Audio synthesized quiet wind/forest and short bird-like chirps, toggle in top toolbar. No external sound file needed.

Blender: Install Pithouse Experience Builder v0.2 add-on. Add a Cutscene Camera and target; set Shot ID such as elder or hearth, transition time, vertical FOV, and optional animation sampling across scene frame range. Export JSON/GLBs or site ZIP. The addon preserves pre-existing camera shots in the repository's manifest.

### Regression checklist

1. Pull the feature branch, restart local server, open /experience/, hard refresh Ctrl+Shift+R.
2. Confirm voxel pair loads. An explicit warning means only fallback movement is active.
3. Start on the floor, inside the wall, and test against roof/walls; adjust spawn and voxel asset in Blender if needed.
4. Speak with Elder, ask about fire (hearth shot), choose another question (Elder shot), then back out (original player view).
5. Inspect Study Stone, Take it, open inventory, ask Elder about it; reset to restore item.
6. Verify gamepad sticks and A/B/Y/Start/D-pad, keyboard Escape and UI Back, plus mobile landscape touch controls.
7. Confirm ambient audio starts on Begin and can be muted.

Limits: Runtime Javascript syntax was checked and addon pure-Python tests pass, but this updated browser version has not been visually tested against your local assets or hardware. A fully physics-based capsule controller, rigidbody objects, persistent saves and synchronized recorded audio are not yet implemented.
