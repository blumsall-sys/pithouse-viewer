# Pithouse interactive experience

Work on `feature/pithouse-interactive-experience`. The original viewer at `/`, SOG, settings, and voxel pair are preserved. This is a prototype; the original Elder's rendered acceptance checklist is still pending. Story text awaits cultural review.

## Windows setup

Install Git, Node.js 22+ and Python 3. Clone or update the existing feature branch:

```powershell
git clone -b feature/pithouse-interactive-experience https://github.com/blumsall-sys/pithouse-viewer.git
cd pithouse-viewer
node experience/tools/install-elder.mjs "C:\path\Elder_NLA_wMesh.glb"
node experience/tools/validate-scene.mjs
python -m http.server 8000
```

For an existing checkout, select the feature branch and run `git pull --ff-only` before installing. Open http://localhost:8000/experience/ and hard refresh with Ctrl+Shift+R. The original viewer is http://localhost:8000/. Do not open HTML with `file://`. Production imports PlayCanvas **2.24.0** from jsDelivr and needs internet access.

The GLB is required, locally installed, and ignored by Git. A bare checkout is not a character-enabled deployment. The installer validates the original armature, skin and animation names, prints a SHA-256, and copies bytes unchanged. It does not verify texture artistry, all skin weights, or redistribution rights. No replacement model or FBX conversion is needed. Never use a prior normalized model or alter the imported root: preserve its **0.01 scale and +90° X rotation** and its inverse-bind matrices. Position/yaw/scene scale belong to the separate placement parent.

## Controls and preserved systems

WASD/arrows walk, mouse look, Space jump, E interact, I inventory, Esc/P pause/back, Enter reveal text, 1–3 answer, backquote debug. Gamepad sticks move/look; A interact/confirm or jump with no target; X jump; B back; Y inventory; Start pause; D-pad menus. Mobile uses the existing touchpads and Interact button. Voxel floor tracking/collision, Study Stone inventory, annotations, speech and synthesized ambience remain in `adventure-runtime.js`.

## Rendering and dialogue policies

`data/pithouse-scene.json` owns placement, collider, cameras, clip names and policies. Elder dialogue nodes explicitly have `character: "elder"`; animation ownership never depends on speaker text or a previously selected topic. Normal Elder nodes Talk. Only the authored `warmthDetail` node requests `animation: "FireWork"`. Annotations/messages and exploration Idle. All three clips are required and loop, with 0.32-second crossfades. Missing clips or a damaged original root stop startup with diagnostics.

The provided GLB is reported to use one BLEND material for the whole body. PlayCanvas imports BLEND as transparent with `depthWrite=false`. The new Elder policy uses `material: {"mode":"mask","alphaCutoff":0.1}`: retain the imported RGBA texture, opacity channel/UVs and double-sided lighting; discard low-alpha fragments and render surviving fragments in the opaque depth-writing pass. The original material and binary remain unchanged. **This cutoff is provisional until the actual model's hair/clothing edges are inspected.** It may require adjustment or an art-side material split. This does not prove that alpha caused every disappearance.

Opaque depth-writing meshes render before transparent splats, allowing front splats to blend over meshes and behind splats to fail the mesh depth test. Gaussian translucency remains different from a solid wall. Do not force the SOG to write solid depth or draw the Elder as an overlay. Animated bone bounds and frustum culling remain enabled; no fixed AABB or culling bypass is applied by default.

Placement `[0.95,0,2.2]`, scale `1.7`, collider and authored shots remain provisional. They have not been moved without the actual skinned model and multi-angle evidence. No claim of grounded feet, correct facing or clearance from posts/hearth is made.

## Diagnostics

Open `/experience/?diagnostics` and use the console:

```js
pithouseDebug.snapshot() // mode, world animated AABBs, visibility and material flags
pithouseDebug.splat(false) // isolation; true restores it
pithouseDebug.bounds() // draws current boxes for one frame
```

Reload the same camera path with these diagnostic parameters:

- `?diagnostics&elderMaterial=source` — original glTF BLEND behavior.
- `?diagnostics&elderMaterial=mask` — candidate cutout/depth policy.
- `?diagnostics&elderMaterial=opaque` — opaque diagnostic only; ignores intentional alpha edges.
- `?diagnostics&splat=off` — unchanged character/light without SOG.
- `?diagnostics&elderCull=off` — culling isolation only; never the normal configuration.

Record snapshots during Idle/Talk/Working and crossfades from front/back/side, then repeat with the SOG disabled. Compare on the same camera positions. Source/cutout differences isolate alpha; culling differences require investigation of actual animated bounds. These toggles are not visual acceptance results.

## Automated checks

```powershell
npm ci --prefix experience
npm test --prefix experience
node experience/tools/validate-scene.mjs
npx --prefix experience playwright install chromium
# Keep the Python server running in another terminal:
npm run test:browser --prefix experience
```

Set `CHROMIUM_PATH` to an existing Chromium executable if needed. The browser smoke harness imports the same pinned engine locally, checks startup and finite skinned bounds, interacts through Elder Talk → Working → Idle, and inspects a real annotation after Working. It captures page errors. It is a smoke test, not a substitute for rendered comparisons.

Without the original GLB, source validation can run with `--allow-missing-elder`; it warns explicitly. `node experience/tests/browser-smoke.mjs --fixture` uses a synthetic skinned control via network interception only. This fixture is never installed or shown by the normal app. It tests integration but cannot verify Elder appearance, poses, dimensions, or texture edges.

See [VALIDATION.md](VALIDATION.md) for results and remaining acceptance work.
