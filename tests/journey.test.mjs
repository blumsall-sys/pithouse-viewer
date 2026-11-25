import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as pc from '../mobile-playtest/experience/node_modules/playcanvas/build/playcanvas.mjs';
import { WalkCollision } from '../mobile-playtest/experience/adventure-runtime.js';
import { fishingTrip, pithouseReturnURL, progress, readSession, saveSession } from '../mobile-playtest/experience/journey.js';

test('fishing round trip keeps inventory and returns inside under a repository subpath', () => {
  const value = { inventory: [{ id: 'sample-stone', name: 'Study Stone', consumed: false }], elderMet: true, voice: true };
  const trip = fishingTrip('https://example.org/pithouse-viewer/mobile-playtest/experience/?scene=fraser&localEngine', value);
  const url = pithouseReturnURL('https://example.org/pithouse-viewer/fishing/', trip);
  assert.equal(url.pathname, '/pithouse-viewer/mobile-playtest/experience/');
  assert.equal(url.searchParams.has('scene'), false);
  assert.equal(url.searchParams.has('localEngine'), true);
  assert.deepEqual(progress(trip), value);
});
test('missing, corrupt, or blocked storage does not break navigation', () => {
  const denied = { getItem() { throw Error('denied'); }, setItem() { throw Error('denied'); } };
  assert.equal(readSession(denied, 'trip'), null);
  assert.equal(saveSession(denied, 'trip', {}), false);
  assert.equal(readSession({getItem: () => '{bad'}, 'trip'), null);
  assert.deepEqual(progress({ inventory: [null, {}, {id: 'stone'}] }).inventory, [{id:'stone'}]);
  const here = 'https://example.org/repo/fishing/';
  for (const trip of [null, {returnURL:'https://evil.example/experience/'}, {returnURL:'javascript:alert(1)'}, {returnURL:'https://example.org/wrong/experience/'}]) {
    assert.equal(pithouseReturnURL(here, trip).href, 'https://example.org/repo/mobile-playtest/experience/');
  }
});

export function terrainRoute(scene, voxel) {
  const walker = new WalkCollision(pc, voxel, scene), step = .25, minX = -16, minZ = -4, width = 121, height = 121;
  const floors = new Float32Array(width * height).fill(NaN);
  const point = new pc.Vec3(), normal = new pc.Vec3();
  for (let iz=0; iz<height; iz++) for (let ix=0; ix<width; ix++) {
    const x=minX+ix*step, z=minZ+iz*step;
    if (voxel.raycast(new pc.Ray(new pc.Vec3(x,44,z),new pc.Vec3(0,-1,0)),60,point,normal) && walker.free(x,z,point.y+.055)) floors[iz*width+ix]=point.y;
  }
  const index=(x,z)=>Math.round((z-minZ)/step)*width+Math.round((x-minX)/step);
  const start=index(scene.spawn.position[0],scene.spawn.position[2]);
  const elder=scene.characters[0].position, end=index(elder[0],elder[2]-2);
  const queue=[start], prev=new Int32Array(floors.length).fill(-2);prev[start]=-1;
  for(let head=0;head<queue.length&&prev[end]===-2;head++){
    const id=queue[head],ix=id%width,iz=Math.floor(id/width);
    for(const [dx,dz] of [[0,1],[1,0],[-1,0],[0,-1]]){
      const nx=ix+dx,nz=iz+dz,next=nz*width+nx;
      if(nx<0||nx>=width||nz<0||nz>=height||prev[next]!==-2||!Number.isFinite(floors[next])||Math.abs(floors[next]-floors[id])>.3)continue;
      prev[next]=id;queue.push(next);
    }
  }
  assert.notEqual(prev[end],-2,'River elder must be reachable from the roof over existing terrain');
  const route=[];for(let id=end;id>=0;id=prev[id])route.push([minX+(id%width)*step,floors[id],minZ+Math.floor(id/width)*step]);
  return route.reverse();
}
test('river elder is grounded and has a collision-safe route from the ladder', () => {
  const root=new URL('../mobile-playtest/experience/',import.meta.url);
  const scene=JSON.parse(fs.readFileSync(new URL('data/fraser-river.json',root)));
  const bytes=fs.readFileSync(new URL('assets/fraser/terrain.voxel.bin',root));
  const voxel=new pc.VoxelOccupancy(JSON.parse(fs.readFileSync(new URL('assets/fraser/terrain.voxel.json',root))),bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));
  const elder=scene.characters[0],walker=new WalkCollision(pc,voxel,scene);
  assert.ok(Math.abs(walker.rawFloor(elder.position[0],elder.position[2],elder.position[1])-elder.position[1])<.1);
  const route=terrainRoute(scene,voxel);
  assert.ok(route.length>30);
  const camera=new pc.Entity('Route verification');camera.setPosition(...scene.spawn.position);walker.reset(camera);
  for(const [x,,z] of route){
    let frames=0;
    while(Math.hypot(camera.getPosition().x-x,camera.getPosition().z-z)>.1 && frames++<300){
      const p=camera.getPosition();
      const yaw=Math.atan2(-(x-p.x),-(z-p.z))*180/Math.PI;
      walker.move(camera,1/60,0,.5,yaw,true);
    }
    assert.ok(frames<300,'Actual walk controller must reach '+[x,z]+' from '+camera.getPosition());
  }
  assert.equal(scene.dialogue.fishingInvitation.character,'elder');
  assert.equal(scene.dialogue.fishingInvitation.choices[0].action,'fishing');
  assert.equal(scene.dialogue.fishingInvitation.choices[1].mode,'explore');
});
