# Validation — November 12, 2026

Status: **partial source repair; original Elder rendered acceptance blocked**.

The handoff was read completely before edits. The original attachment is 53,339,264 bytes according to the handoff, but the attachment-transfer tool rejects files above 32 MiB. No copy exists in this checkout. The supplied original GLB has therefore **not been inspected in this run**. The eight historical screenshots were not attached to this conversation. A compressed attachment below the transfer limit or downloadable URL is needed to finish model-specific work.

## Findings and changes

- Confirmed source defect: `openDialogue()` selected Elder Talk/Working for every dialogue using stale `state.selected`. Explicit `character` and `animation` scene metadata now controls ownership. Annotation/generic messages Idle; Working is requested only by `warmthDetail`. Closing returns to Idle. Linked Elder nodes retain crossfades without an intermediate animation reset.
- Confirmed engine behavior: inspected PlayCanvas 2.24.0 (`0d07e10`) source. glTF BLEND imports as `BLEND_NORMAL`, `depthWrite=false`. A per-character cloned MASK material policy now enables opaque-pass depth writing and preserves imported opacity texture and double-sided lighting. Cutoff 0.1 is a **candidate**, not an artistically validated threshold. Original binary/material resource is untouched. Source/opaque/cutout comparison modes and SOG/culling isolation are available under `?diagnostics`.
- No evidence yet establishes the cause of the original Elder's intermittent disappearance. Engine skinned AABBs use bone transforms. Their default computation and culling are preserved; diagnostics expose actual world bounds and visibility for subsequent investigation.
- Imported root now validates both scale and rotation. All three animations are required and explicitly loop. No hierarchy transform or inverse-bind rewrite occurs.
- Annotation interruption now replaces a preceding dialogue-camera transition with restoration of the saved exploration pose. The saved pose remains available until closing the conversation. Subsequent Elder topics also retain the inventory discussion choice.
- Missing model validation now fails usefully rather than claiming a placeholder. Added a byte-preserving installer with GLB structural checks and SHA-256 output. The public branch still does not include the licensed asset. Replaced contradictory README normalization/FBX/placeholder instructions.
- Elder placement, collider and camera coordinates were left provisional because neither skinned dimensions nor clearances could be verified. No source-based placement correction is claimed.

## Tests

- Node tests with real PlayCanvas 2.24.0 material/entity classes: animation ownership, MASK flags and material cloning, original rig-transform invariants, annotation camera interruption, inventory discussion and authored metadata.
- Scene validation with `--allow-missing-elder`: passes with one explicit missing-asset warning. Normal validation deliberately fails until the original GLB is installed.
- Chromium WebGL2 loads the real SOG and exposes an actionable fatal error naming `./assets/elder.glb` when it is absent. No silent model fallback.
- Browser integration with a clearly synthetic, 33-joint GLB intercepted only by the test: startup; Idle → Elder Talk → explicit Working → Idle; annotation inspection after Working stays Idle; finite skinned world AABBs; depthWrite/alphaTest flags; culling enabled; no uncaught page errors. Both SOG-disabled and real-SOG-enabled control runs passed. This control fixture does not represent the Elder geometry, texture, animation channels or proportions. It is not committed as a model and is never a production fallback.
- `git diff --check` and JavaScript syntax checks pass.

## Handoff acceptance checklist

| Criterion | Result |
| --- | --- |
| Existing feature branch only; main/backup unchanged | Verified refs before commit; recheck after push |
| Original viewer and SOG/settings/voxel files preserved | No changes to protected paths |
| Repeatable original GLB installation, no placeholder | Implemented; original-asset run blocked by transfer limit |
| Real SOG startup and module requests | Browser exercised; main/adventure/elder modules load |
| Original Elder stable silhouette, no transparency holes | **Blocked**; MASK candidate needs actual texture/pose comparisons |
| Original Elder disappearance and animated bounds | **Unresolved**; diagnostics added, no speculative culling bypass |
| Bidirectional SOG/Elder occlusion | **Unresolved**; original-model camera comparisons pending |
| Animation ownership, authored Working, returns to Idle | Node and synthetic browser control pass; actual NLA pose/root-motion run pending |
| Annotation does not trigger Elder Talk/Working | Synthetic browser control passes |
| Feet grounded, no timber/hearth intersections, collider calibrated | **Unresolved**; placement unchanged pending actual model |
| Original Elder dialogue framing and saved-view restore | Camera interruption test passes; visual framing/restore regression pending |
| Full keyboard/gamepad/mobile, inventory, voxel jump, pause/reset, audio | Existing logic preserved; full device/visual regression **not completed** |
| Exact Windows setup and diagnostics | README updated |

This is not a stable/verified replacement build. Complete the real GLB comparison sequence before accepting the material threshold, changing placement, or claiming the rendering defects resolved.
