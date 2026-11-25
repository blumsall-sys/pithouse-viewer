import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Vec3} from 'playcanvas';
import {RiverCurrentSystem} from '../src/minigame/RiverCurrentSystem.js';
import {advanceApproach} from '../src/minigame/ApproachFish.js';
import {selectHoopTarget} from '../src/minigame/HoopTargeting.js';
import {SPECIES} from '../src/minigame/ScoreAndStewardship.js';
const level=JSON.parse(fs.readFileSync(new URL('../public/assets/level.json',import.meta.url)));
for(const species of SPECIES)test(species.id+' approaches, rests and escapes left without entering rock',()=>{
 const river=new RiverCurrentSystem(level),p=river.spawnPoint(species.size*.56,true),f={position:new Vec3(p.x,-.78,p.z),radius:species.size*.56,species,age:0,wiggle:0,approach:true};let rested=false,escaped=false;
 for(let i=0;i<7000&&!escaped;i++){escaped=advanceApproach(f,.05,river,null,.2);rested ||= f.travelPhase==='rest';assert.ok(river.isClear(f.position.x,f.position.z,f.radius));}
 assert.ok(rested);assert.ok(escaped);assert.ok(f.position.x>13.5);
});
test('submerged hoop acquires nearby fish, retains lock and rejects below-hoop fish',()=>{
 const f={position:new Vec3(0,-.6,0),mode:'current'},r={segmentBlocked:()=>false};
 assert.equal(selectHoopTarget([f],new Vec3(0,-.8,0),r),f);
 assert.equal(selectHoopTarget([f],new Vec3(.9,-.8,0),r,f),f);
 assert.equal(selectHoopTarget([f],new Vec3(0,-.3,0),r,null,true),null);assert.ok(f.dodgeFromNet>0);
});
