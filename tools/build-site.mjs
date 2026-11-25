import { cp, mkdir, copyFile, rm, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'dist');
const build = spawnSync(process.execPath, [path.join(root, 'fishing/node_modules/vite/bin/vite.js'), 'build'], { cwd: path.join(root, 'fishing'), stdio: 'inherit' });
if (build.status !== 0) process.exit(build.status || 1);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ['index.html', 'pithouse.sog', 'settings.json', 'scene.voxel.json', 'scene.voxel.bin', 'LICENSE-SUPERSPLAT-VIEWER.txt']) {
  await copyFile(path.join(root, file), path.join(out, file));
}
await cp(path.join(root, 'mobile-playtest'), path.join(out, 'mobile-playtest'), {
  recursive: true,
  filter: src => !path.relative(path.join(root,'mobile-playtest'),src).split(path.sep).some(part => ['node_modules', 'test-results', 'tests', 'source', 'tools', '.git'].includes(part))
});
await mkdir(path.join(out, 'mobile-playtest/experience/vendor'), { recursive: true });
await copyFile(path.join(root, 'mobile-playtest/experience/node_modules/playcanvas/build/playcanvas.min.mjs'), path.join(out, 'mobile-playtest/experience/vendor/playcanvas.min.mjs'));
await copyFile(path.join(root, 'mobile-playtest/experience/node_modules/playcanvas/LICENSE'), path.join(out, 'mobile-playtest/experience/vendor/LICENSE-PlayCanvas.txt'));
const entry=path.join(out,'mobile-playtest/experience/index.html');
await writeFile(entry,(await readFile(entry,'utf8'))
  .replaceAll('./node_modules/playcanvas/build/playcanvas.min.mjs','./vendor/playcanvas.min.mjs')
  .replaceAll('https://cdn.jsdelivr.net/npm/playcanvas@2.24.0/+esm','./vendor/playcanvas.min.mjs'));
await cp(path.join(root, 'fishing/dist'), path.join(out, 'fishing'), { recursive: true });
await cp(path.join(root, 'experience'), path.join(out, 'experience'), { recursive: true });
await copyFile(path.join(root, 'fishing/LICENSE-PlayCanvas.txt'), path.join(out, 'fishing/LICENSE-PlayCanvas.txt'));
await copyFile(path.join(root, 'README.md'), path.join(out, 'README.md'));
console.log('Complete static journey: dist/ (serve this directory at / or a repository subpath).');
