# Pit House Self-Hosted SuperSplat Viewer

## Combined pithouse and dipnet fishing journey

Branch: `feature/pithouse-dipnet-fishing`.

Open `/experience/` (an alias for `/mobile-playtest/experience/`). Begin inside with the Elder as usual. Investigate the center pole and choose **Climb to Fraser River**. Walk down the hillside toward the water and approach the Elder. Interact to accept or decline the dipnet fishing invitation. Accepting opens the complete fishing experience with its normal exploration and three-step briefing.

After the round, return to the fishing Elder for the results. **Return to the pithouse** returns inside and restores the Study Stone inventory, Elder meeting progress, and voice preference for the current browser tab. **Reset fishing experience** clears the fishing round and returns to its original spawn and briefing flow. The pause menu’s **Try the round again** replays just the round. Return is also available from the fishing pause and exit menus. Browser storage restrictions allow navigation but may prevent progress restoration.

### Build and preview the combined site

Node.js 22+ is required. From the repository root:

```powershell
npm ci --prefix mobile-playtest/experience
npm ci --prefix fishing
npm test
npm test --prefix mobile-playtest/experience
npm run build
npm test --prefix fishing
npm run preview
```

Open **http://127.0.0.1:8170/experience/**. Serve `dist/`, which includes the original viewer, interactive pithouse, exterior scene, pinned local pithouse engine, and built fishing game. The site supports repository subpaths and uses relative asset URLs. The published root opens the combined journey. The original viewer remains at `/original-viewer.html`.

For browser regression checks, install Chromium once with `npx --prefix mobile-playtest/experience playwright install chromium`, keep the preview running, then run `npm run test:browser`. `PITHOUSE_URL` overrides the preview base URL and `CHROMIUM_PATH` selects an existing browser executable. The browser check covers the ladder, invitation decline/accept, normal fishing briefing, results for both outcomes with an accelerated round clock, full reset, and return with a collected inventory item. Gameplay physics are covered separately by the fishing tests. Review images are written to `test-results/`.

The branch workflow runs checks, builds the complete site, and uploads `pithouse-fishing-site` and browser review artifacts. GitHub Pages publishes the complete built site from the `main` branch at https://blumsall-sys.github.io/pithouse-viewer/. The source stays on `feature/pithouse-dipnet-fishing`. To publish an update, build the checked-in source and commit all of `dist/` to the publishing branch `main`; `version.json` records the source commit. The fishing source directory alone is not a static deployment.

### Local build provenance

- Pithouse: repository `mobile-playtest` from `0f8fb1f`, including the animated Elder, roof ladder, exterior SOG, entrance GLB, panorama, and measured terrain voxels. Its runtime matches the latest local copy in the November 12 Codex task; older Fixed Elder v3 downloads were superseded.
- Fishing: November 19 **Revision 12**, using the latest local `work/revision3` source/assets and comparing against `work/github-fishing-mini`. The final local mobile stylesheet and two additional revision-12 regressions are included. Expanded water, four fishing pockets, extended shoreline navigation, fish-depth aiming, local audio, and touch controls are retained. Existing character/model files are reused unchanged.
- New integration: riverbank Elder placement and invitation, shared journey handoff, completion/reset/return controls, complete static build, and regression checks. Historical dialogue remains prototype content pending the existing cultural review process.

The original standalone viewer instructions follow.

This package is configured to load:
- `pithouse.sog` - Gaussian splat
- `settings.json` - SuperSplat Studio experience settings (camera, annotations, post settings, future animation tracks)
- `scene.voxel.json` + `scene.voxel.bin` - voxel collision

`index.html` contains the SuperSplat Viewer application and has been configured with:
- contentUrl: `./pithouse.sog`
- settingsUrl: `./settings.json`
- collisionUrl: `./scene.voxel.json`

Visible SuperSplat branding is hidden with CSS while viewer controls remain enabled.

## Local test
Double-click `TEST_LOCAL.bat`, then open http://localhost:8000/ in Chrome or Edge.
Do not test by double-clicking index.html because browser file:// security can block asset loading.

## Expected functionality
- Gaussian splat rendering
- Studio starting camera/FOV
- Studio annotations and annotation camera views
- Orbit/fly/walk controls exposed by the viewer
- Voxel collision loading
- Settings/help/fullscreen controls
- Animation tracks automatically supported if a future Studio settings export contains them

## Updating from SuperSplat Studio
- Annotation/camera/settings change: replace `settings.json` with the newly exported Studio JSON.
- Splat change: replace `pithouse.sog`.
- Collision change: replace BOTH `scene.voxel.json` and `scene.voxel.bin`.

## Hosting
Upload all files in this folder to the same public HTTPS directory. Keep filenames unchanged.
The viewer is a static website; Squarespace should iframe its hosted URL rather than trying to execute these files from Squarespace file storage.
