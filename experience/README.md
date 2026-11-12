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

## Gameplay stabilisation and Elder animations — November 2026

### Walking / jump
Walking now uses a median of five voxel-floor samples under the character, a deadband on small height changes, smooth correction for real step changes, no camera head bob, and loss-of-ground hysteresis. Locomotion yaw and pitch are tracked independently from animated dialogue cameras. Space jumps only while grounded; Xbox A jumps if no nearby interaction target. The actual floor needs checking in the browser, particularly where voxel geometry is noisy.

### Dialogue / cameras
The first Elder interaction uses dialogue.welcome. Subsequent sessions use dialogue.topics and do not repeat the welcome. Follow-up questions go to topics. Dialogue text speed increased to 62 characters per second and minDecisionSeconds is zero for the sample story. Press Enter / gamepad A while letters are appearing to reveal the entire sentence immediately. Questions about construction and the center pole now use cameras.centerPole; warmth uses cameras.hearth. Player viewpoint is saved with a quaternion and independent navigation heading and restored after closing dialogue, avoiding 180 degree W/S inversions.

### Real Elder animation assets — local conversion required
User-supplied Idle.fbx, Talking.fbx, and Working On Device.fbx were inspected: all have Elder_ForExport mesh and 33 identically named mixamorig bones. Source FBXs are NOT committed to this public repository. Standalone PlayCanvas loads GLB, not FBX. Use experience/tools/build_elder_glb.py inside Blender 4.5/5.x, or the supplied separate offline Elder FBX-to-GLB kit.

From a Windows command prompt, after unpacking the FBX files together:
blender -b --python experience/tools/build_elder_glb.py -- "C:\\PithouseElderFBX" "C:\\path\\pithouse-viewer\\experience\\assets\\elder.glb"

The converter imports all three FBX files, verifies matching bones, copies their actions to one Elder armature, exports the weighted character mesh and three named NLA tracks Idle, Talk and FireWork, and validates the GLB animation names. The scene manifest expects ./assets/elder.glb and maps Idle when unengaged, Talk for dialogue, FireWork for warmth. The PlayCanvas Anim component has three states and crossfades between them over 0.32 seconds. If GLB conversion/load fails, the character placeholder is shown with a console warning. Verify scale, material textures, bone retargeting and armature animation before distributing.

Animation source handling: keep source FBXs offline unless their license allows public redistribution. Each is approximately 23 MB; bundling raw FBXs in the public GitHub Pages deploy would unnecessarily increase load size. Only the final GLB belongs in the experience/assets deployment directory.

### Regression checks
1. Walk continuously on the floor; idle camera should remain stable when standing still and not micro-bounce with voxel floor samples.
2. Jump with Space in grounded exploration, land and return to walking. On gamepad, A jumps unless an interactable is in range.
3. Talk to Elder, ask about hearth, return to topics, close dialogue and test W/S before and after.
4. Open Elder again: no repeat initial welcome. Center-pole choices should use centerPole shot and focus on actual annotated support pole.
5. Confirm Elder GLB visibly animates Idle, Talk, FireWork when installed locally. Inspect browser console for missing clip fallback.

Code/config and the source FBX skeletons have been checked, but the rendered character, voxel movement changes and Blender GLB conversion have not been end-to-end verified in a live Blender/browser session.


## November 12 Elder NLA test build — required local model installation

The prototype branch references `experience/assets/elder.glb`, which is not committed to the public repository. Use the separately supplied **Pithouse_Elder_Local_Test.zip** to clone/update the feature branch and install the provided normalized GLB. Do not treat the GitHub branch alone as a complete character-enabled deployment.

- Source Elder GLB contains one textured mesh, one 33-joint armature and three clips: `mixamo.com_Idle`, `NlaTrack_Talking`, `NlaTrack_Working`.
- Original exported root transform was a 0.01 scale and +90 degree X-axis rotation, producing an incorrectly oriented approximately 1 cm scene-space model. The supplied normalized `elder.glb` uses identity root rotation and root scale 1, retaining the embedded mesh, skeleton, image, and animations.
- Manifest scales normalized ~1 m mesh by 1.7, with the Elder at [0.95,0,2.2] and a solid 0.86 x 1.75 x 0.86 m author collider.
- Elder GLB is **required**. An absent or invalid GLB displays a startup error instead of silently substituting a placeholder. The animation component maps embedded clip names to Idle, Talk, FireWork and transitions back to Idle after conversation.
- Validate all files using `node experience/tools/validate-scene.mjs` after copying `elder.glb`.
- Run local server from repository root (not inside experience/): `python -m http.server 8000`. Open `http://localhost:8000/experience/`.
- Full in-browser render, animation transition, contact, voxel floor and gamepad testing require a desktop browser and must be performed locally. Static file/GLB validation is not an end-to-end browser test.
- This branch is independent. `main` and `backup/2026-11-11-original-viewer` remain unchanged.



## Critical Elder rig correction — November 12 (broken GLB normalization)

**Supersedes the November 12 root-normalization instructions above.** The previous ZIP's `elder.glb` was broken by manually changing the armature-root rotation and 0.01 scale while leaving inverse-bind matrices unchanged. That invalidated skinning and caused character polygons to stretch tens of metres and intersect the first-person camera. Discard that normalized GLB.

**Correct installation**: take the unmodified `Elder_NLA_wMesh.glb` exported directly from Blender, copy it to `experience/assets/elder.glb` (rename only; do not edit GLB transforms). The provided replacement local-test ZIP includes this original binary. The imported armature must retain its root 0.01 scale and +90° X rotation. The PlayCanvas code creates an independent placement parent and applies world position, yaw, and 1.7x scene scale to the parent only, leaving the skinned GLB hierarchy intact.

The original GLB has 809,854 weighted vertices, 33 joints, one mesh, and the named clips `mixamo.com_Idle`, `NlaTrack_Talking`, `NlaTrack_Working`. The original rest-pose skinning bounds are approximately 0.93 m wide, 1.00 m high, 0.33 m deep; the damaged normalized file incorrectly expands to about 92.85 x 33.48 x 100 m. Do not "fix" this by camera clipping or lowering scene scale.

Test plan: restore unmodified GLB; open experience; watch Elder idle by the hearth; approach and interact to trigger Talk; leave dialogue to return to Idle; verify Elder body collision, no polygons through camera, and original viewer still runs at root URL. Full rendered browser/interaction validation must still be performed in local browser.

