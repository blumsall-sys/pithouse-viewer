import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Vec3} from 'playcanvas';
import {RiverCurrentSystem} from '../src/minigame/RiverCurrentSystem.js';
import {advanceApproach} from '../src/minigame/ApproachFish.js';
import {DipNetController} from '../src/minigame/DipNetController.js';
import {BankNavigation} from '../src/minigame/BankNavigation.js';
import {SPECIES} from '../src/minigame/ScoreAndStewardship.js';
const level=JSON.parse(fs.readFileSync(new URL('../public/assets/level.json',import.meta.url)));
for(const species of SPECIES)for(const factor of [.82,1,1.16])test(`${species.id} ${factor} rests at a dry-bank position the actual hoop can reach, then escapes`,()=>{
  const river=new RiverCurrentSystem(level),radius=species.size*factor*.56;
  const start=river.safePoint(6,34,radius),seed=factor===1?1:0;
  const f={position:new Vec3(start.x,-.78,start.z),species,radius,sizeFactor:factor,age:0,wiggle:0,approach:true,seed};
  let rest=false,escaped=false,restSeconds=0;
  for(let i=0;i<9000&&!escaped;i++){
    escaped=advanceApproach(f,.05,river,null,.2);assert.ok(river.isClear(f.position.x,f.position.z,radius));
    if(f.travelPhase==='rest'){
      restSeconds+=.05;
      if(!rest){
        rest=true;const a=f.restGoal.anchor,nav=new BankNavigation(level);assert.notEqual(nav.sample(a.x,a.z),null);
        assert.ok(Math.hypot(a.x-f.position.x,a.z-f.position.z)<2.7);
        const position=new Vec3(a.x,nav.sample(a.x,a.z)+1.65,a.z),direction=f.position.clone().sub(position).normalize();
        const net={camera:{getPosition:()=>position,forward:direction,right:new Vec3(1,0,0)},level,target:new Vec3(),trapped:[],enabled:true,submerged:false,lift:0,river};
        DipNetController.prototype.aim.call(net,1/60,true);
        assert.equal(net.inReach,true);assert.ok(Math.hypot(net.desired.x-f.position.x,net.desired.z-f.position.z)<.45);
      }
    }
  }
  assert.ok(rest);assert.ok(restSeconds>=4.9);assert.ok(escaped);
  if(seed===1)assert.ok(f.position.x<0);else assert.ok(f.position.x>13);
});
test('initial nearby resting positions are spread around the reachable rocks',()=>{
  const river=new RiverCurrentSystem(level),points=Array.from({length:5},(_,i)=>river.restingPoint(.4,i,{x:5.2,z:2.1}));
  assert.ok(new Set(points.map(p=>p.x.toFixed(1)+','+p.z.toFixed(1))).size>=4);
});
