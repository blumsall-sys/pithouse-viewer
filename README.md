# Pit House Self-Hosted SuperSplat Viewer

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
