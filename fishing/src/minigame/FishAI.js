import {advanceApproach} from './ApproachFish.js';
export function fishHeading(dx,dz){return Math.atan2(dx,dz)*180/Math.PI;}
export function advanceFish(f,dt,river,net,difficulty,rng=Math.random){
 if(f.dodgeFromNet>0&&river.river.upstream){f.travelPhase='escape';f.route=null;}
 if((f.approach||f.travelPhase)&&river.river.upstream)return advanceApproach(f,dt,river,net,difficulty);
 f.age+=dt;f.wiggle+=dt*(f.mode==='rest'?2:6);const p=f.position,radius=f.radius??.35,speed=(.8+difficulty*.65)*(f.species?.id==='chinook'?1.3:f.species?.id==='smolt'?.7:1);let vx=0,vz=0;
 if(f.mode==='current'&&!f.visited){const e=river.available(p);if(e&&rng()<dt*1.8){f.eddy=e;e.occupant=f;f.mode='eddy';f.rest=2.5+rng()*3;f.route=null;}}
 if(f.mode==='current'||f.mode==='eddy'){
  if(!f.route){f.stage??=0;const stop=f.stage===0?river.safePoint(1.25,3.65,radius):f.stage===1?river.safePoint(5.8,4.15,radius):null;const target=f.mode==='eddy'?f.eddy:stop??{x:river.river.goalX+.07,z:6.4+Math.sin(f.seed)*.6};f.route=river.path(p,target,radius,f.mode==='current'&&!stop);f.routeIndex=0;}
  let target=f.route[f.routeIndex];while(target&&Math.hypot(target.x-p.x,target.z-p.z)<.1){f.routeIndex++;target=f.route[f.routeIndex];}
  if(target){const dx=target.x-p.x,dz=target.z-p.z,n=Math.hypot(dx,dz);vx=dx/n*speed;vz=dz/n*speed;}
  else if(f.mode==='eddy'){f.mode='rest';f.route=null;}
  else if((f.stage??0)<2){f.stage=(f.stage??0)+1;f.route=null;}else vx=speed;
 }
 if(f.mode==='rest'){f.rest-=dt;vx=Math.cos(f.wiggle)*.04;vz=Math.sin(f.wiggle)*.04;if(f.rest<=0){f.mode='current';f.visited=true;if(f.eddy)f.eddy.occupant=null;f.eddy=null;f.route=null;}}
 const distance=net?.submerged?Math.hypot(p.x-net.target.x,p.z-net.target.z):99;
 if(net?.scoopLock!==f&&distance<1.5&&distance>.55&&(net.still>1.8||net.speed>6.5||rng()<dt*difficulty*.25)){f.flee=.65;f.mode='flee';if(f.eddy)f.eddy.occupant=null;f.eddy=null;f.visited=true;f.route=null;}
 if(f.mode==='flee'){f.flee-=dt;vx=1.6+difficulty;vz=Math.sign(p.z-(net?.target.z??p.z-1))*.8;if(f.flee<=0){f.mode='current';f.route=null;}}
 if(f.species?.id==='chinook'&&net?.submerged&&net.scoopLock===f&&net.holdTime>.6&&Math.sin(f.age*2+f.seed)>.9){vz+=.6;vx+=Math.cos(f.seed)*.5;net.scoopReady=false;net.beneathTime=0;}const before={x:p.x,z:p.z};river.move(p,vx*dt,vz*dt,radius);p.y=river.water.surfaceY-river.water.fishDepth-.035*Math.sin(f.wiggle*.5+f.seed);river.clamp(p,radius);
 const dx=p.x-before.x,dz=p.z-before.z;if(f.mode==='rest')f.heading=-90;else if(Math.hypot(dx,dz)>.0001)f.heading=fishHeading(dx,dz);
 return p.x>river.river.goalX;
}
