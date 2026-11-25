import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ScoopGauge} from '../src/minigame/ScoopGauge.js';
import {DipNetController} from '../src/minigame/DipNetController.js';
for(const hz of [20,30,60])for(const id of ['smolt','sockeye','chinook'])test(`${id} gauge at ${hz} Hz has a reachable green window and rejects mistimed releases`,()=>{
 const fish={species:{id}},g=new ScoopGauge();g.update(.5,fish,false);assert.equal(g.elapsed,0);assert.equal(g.ready,false);
 g.update(1/hz,fish,true);assert.equal(g.ready,false);
 let green=0;for(let i=0;i<hz*5;i++){g.update(1/hz,fish,true);if(g.ready)green++;assert.equal(g.ready,g.value>=g.start&&g.value<=g.end);}
 assert.ok(green>hz*.3);g.update(.1,null,false);assert.equal(g.ready,false);assert.equal(g.elapsed,0);
});
test('small fish have wider, slower release windows than large fish',()=>{const a=new ScoopGauge(),b=new ScoopGauge();a.update(0,{species:{id:'smolt'}},true);b.update(0,{species:{id:'chinook'}},true);assert.ok(a.end-a.start>b.end-b.start);assert.ok(a.period>b.period);});
test('controller only lifts on a successful gauge release',()=>{for(const ready of [false,true]){const fish={},n={submerged:true,scoopReady:ready,scoopLock:fish,gauge:{active:true},clock:0,onMessage(){}};DipNetController.prototype.up.call(n);assert.equal(n.lift,ready?1.1:0);assert.equal(n.submerged,false);if(ready)assert.equal(n.liftingFish,fish);}});
