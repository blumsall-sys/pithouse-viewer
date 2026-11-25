import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as pc from '../mobile-playtest/experience/node_modules/playcanvas/build/playcanvas.mjs';
import {WalkCollision} from '../mobile-playtest/experience/adventure-runtime.js';
import {Narration,journeyStartURL} from '../shared/experience.js';

for(const name of ['pithouse-scene','fraser-river'])test(name+' jump rises and lands without being cut off by a ground height limit',()=>{
  const scene=JSON.parse(fs.readFileSync(new URL('../mobile-playtest/experience/data/'+name+'.json',import.meta.url)));
  // A ledge below maxFeetY must not cap the airborne part of a jump.
  scene.movement={...scene.movement,fallbackFloorY:1.3,maxFeetY:1.45};
  const walker=new WalkCollision(pc,null,scene),camera=new pc.Entity('Jump camera');
  camera.setPosition(0,1.3+walker.eyeHeight,0);walker.reset(camera);
  const initial=camera.getPosition().y;assert.equal(walker.jump(),true);assert.equal(walker.jump(),false);
  let peak=initial;for(let frame=0;frame<180;frame++){walker.move(camera,1/60,0,0,0,true);peak=Math.max(peak,camera.getPosition().y);}
  assert.ok(peak-initial>.5);assert.equal(walker.grounded,true);assert.ok(Math.abs(camera.getPosition().y-initial)<.08);
});
test('all dialogue uses one voice, language, rate and pitch; voice off cancels speech',()=>{
  const spoken=[];let canceled=0;const voice={name:'Canadian voice',lang:'en-CA'};
  const engine={cancel(){canceled++;},getVoices:()=>[voice],speak:u=>spoken.push(u)};
  const narrator=new Narration(engine,class{constructor(text){this.text=text;}});
  narrator.setEnabled(true);
  for(const line of ['Welcome to the pithouse.','Would you like to learn about dipnet fishing?','Choose your catch.','Thank you, river.'])narrator.speak(line);
  assert.equal(spoken.length,4);
  for(const u of spoken){assert.equal(u.voice,voice);assert.equal(u.lang,'en-CA');assert.equal(u.rate,.89);assert.equal(u.pitch,.94);}
  narrator.setEnabled(false);narrator.speak('Do not speak');assert.equal(spoken.length,4);assert.ok(canceled>=5);
});
test('reset from either river scene returns to the beginning inside the pithouse',()=>{
  for(const url of ['https://example.org/repo/fishing/','https://example.org/repo/mobile-playtest/experience/?scene=fraser','https://example.org/repo/mobile-playtest/experience/'])assert.equal(journeyStartURL(url).href,'https://example.org/repo/mobile-playtest/experience/');
});
