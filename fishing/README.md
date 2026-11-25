# Fraser River dip-net fishing

A first-person PlayCanvas game using the supplied Fraser River Gaussian splat and 3D assets.

## Play

Desktop: WASD moves, mouse looks and sweeps, hold/release left click times the scoop, E speaks/deposits, F moves the basket, Q releases, Space jumps, Ctrl crouches, Esc opens the menu.

Touch: left joystick moves; drag the view to look. Right-side buttons provide hold-to-dip, basket, speak/tip, release, jump and crouch. Controls adapt to context. Portrait and landscape layouts are supported.

Hold to submerge near a fish, release in the center sweet spot, carry gently and tip into the basket. Release juveniles. Return to the elder when the round ends.

## Develop and deploy

Use Node 22, `npm ci`, `npm run dev`. Run `npm run test:gameplay` and `npm run build`. The Pages workflow builds and deploys `dist` on pushes to main. GitHub Pages must be enabled with GitHub Actions as its publishing source. The build uses relative asset URLs for repository subpaths. No login or backend is required by the game.

## Revision 12

Expanded the water volume and fish routes into the left river area, added four fishing pockets and matching expanded rock collision, introduced touch controls, lowered touch rendering resolution and removed the expensive planar water reflection on touch devices. Briefing is three short steps and the HUD shows one next action. 156 gameplay checks pass, including extended fish routes and joystick response. Final mobile-device visual/performance testing remains necessary.

The Gaussian splat and 3D models were supplied for this project. PlayCanvas licensing is included in LICENSE-PlayCanvas.txt.
