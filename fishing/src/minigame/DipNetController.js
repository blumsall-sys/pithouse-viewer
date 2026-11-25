import {sweepPose} from './SweepPose.js';
import {avoidBasket,avoidBasketHandle,projectBasketRope} from './BasketAvoidance.js';
import {ScoopGauge} from './ScoopGauge.js';
import {selectHoopTarget} from './HoopTargeting.js';

import * as pc from 'playcanvas';

import {WaterInteraction} from './WaterInteraction.js';
import {NetClothPhysics,uprightPose,fishCollider,crossedHoop,crossedBasket,local} from './NetClothPhysics.js';
import {SoftNetRenderer} from './SoftNetRenderer.js';
import {NetCatchZone} from './NetCatchZone.js';
import {freezeFish,bendFish,thawFish} from './FishPresentation.js';

export class DipNetController {
 constructor(app,camera,asset,level,onCatch,onMessage){
  Object.assign(this,{app,camera,level,onCatch,onMessage});
  this.target=new pc.Vec3();this.pointer={x:innerWidth/2,y:innerHeight/2};
  this.physics=new NetClothPhysics();this.waterFX=new WaterInteraction(app,level.waterY);
  this.renderer=new SoftNetRenderer(app,this.physics,asset);this.zone=new NetCatchZone();
  this.gauge=new ScoopGauge();this.pose=uprightPose();this.enabled=false;this.submerged=false;this.trapped=[];
  this.speed=0;this.still=0;this.lift=0;this.clock=0;this.holdTime=0;this.lastPress=-10;
  this.presses=[];this.blockedUntil=0;this.strain=0;this.initialized=false;
  const b=level.basket;this.basket={x:b[0],z:b[2],baseY:b[1],rimY:b[1]+.52,radius:.45};
 }
 aim(dt,locked){
  const from=this.camera.getPosition();
  const dir=locked?this.camera.forward.clone():this.camera.camera.screenToWorld(this.pointer.x,this.pointer.y,50).sub(from).normalize();
  const horizontal=new pc.Vec3(dir.x,0,dir.z).normalize();
  const distance=dir.y<-.03?pc.math.clamp((this.level.waterY-(this.level.water?.fishDepth??.48)-from.y)/dir.y*Math.hypot(dir.x,dir.z),.9,3.1):2.6;
  this.desired=from.clone().add(horizontal.mulScalar(this.trapped.length?1.15:!this.enabled?1.4:distance));
  this.desired.y=this.trapped.length?from.y-.65:this.submerged?this.level.waterY-.65:this.level.waterY+.48;
  if(!this.trapped.length){
   if(this.submerged&&this.target.y<this.level.waterY+.04&&this.clock>=this.blockedUntil){this.scoopLock=selectHoopTarget((this.fishCandidates??[]).filter(f=>Math.hypot(f.position.x-from.x,f.position.z-from.z)<3.8),this.target,this.river,this.scoopLock,this.holdTime>.55);this.lockedFish=this.scoopLock;}else if(this.lift<=0){this.lockedFish=null;this.scoopLock=null;}
   const selected=this.scoopLock;
   if(selected&&(this.submerged||this.lift>0)){this.desired.x=selected.position.x;this.desired.z=selected.position.z;const sweep=(this.sweepInput??0)*.32;this.desired.x+=this.camera.right.x*sweep;this.desired.z+=this.camera.right.z*sweep;if(this.submerged)this.desired.y=selected.position.y-.2;}
  }
  if(this.lift>0&&this.releaseSweep){const t=1-this.lift/(this.liftDuration||1.8),arc=Math.sin(Math.max(0,t)*Math.PI)*(this.scoopQuality==='clean'?.13:.3);this.desired.x+=this.releaseSweep.x*arc;this.desired.z+=this.releaseSweep.z*arc;}
  this.inReach=!!this.river?.isClear(this.desired.x,this.desired.z,.48);
  if(!this.inReach&&!this.submerged&&!this.trapped.length)this.desired.y=from.y-.65;
  if(this.submerged&&!this.trapped.length&&(!this.inReach||(this.initialized&&this.river?.segmentBlocked?.(this.target,this.desired))))this.desired.copy(this.target);
 }
 down(){
  if(!this.enabled||this.basketController?.carried)return;
  this.clock??=0;this.presses??=[];this.lastPress??=-10;this.strain??=0;
  this.presses=this.presses.filter(t=>this.clock-t<1.1);this.presses.push(this.clock);
  const rapid=this.clock-this.lastPress<.28||this.presses.length>=4;this.lastPress=this.clock;
  if(rapid){this.blockedUntil=this.clock+.65;this.scoopLock=null;this.lockedFish=null;this.strain=Math.min(1.5,this.strain+.6);const f=this.trapped[0];if(f)this.flop(f,true);this.onMessage('Rapid scoops lose the lock · steady the net');return;}
  if(this.trapped.length){this.onMessage('Carry gently · E tips into the basket · Q releases');return;}
  if(!this.inReach){this.onMessage('Aim at an open channel beside the rocks.');return;}
  this.gauge?.reset();this.scoopMiss=false;this.scoopQuality=null;this.scoopLock=null;this.lockedFish=null;this.submerged=true;this.holdTime=0;this.beneathTime=0;this.scoopReady=false;this.lift=0;
  this.onMessage('Hold to dip · release while the needle is in the green zone');
 }
 up(){if(!this.submerged)return;this.submerged=false;if(this.gauge?.quality){this.scoopQuality=this.gauge.quality();const v=this.sweepVelocity??{x:0,z:0},n=Math.hypot(v.x,v.z)||1;this.releaseSweep={x:v.x/n,z:v.z/n};this.scoopMiss=this.scoopQuality==='miss';this.liftingFish=this.scoopLock;this.lift=this.scoopQuality==='clean'?.9:1.8;this.liftDuration=this.lift;if(this.scoopMiss){this.scoopLock=null;this.onMessage('Missed · release nearer the center sweet spot');}else this.onMessage(this.scoopQuality==='clean'?'Clean scoop · carry gently':'Slow scoop · the fish may slip away');return;}if(!this.scoopReady){this.lift=0;this.scoopLock=null;this.blockedUntil=(this.clock??0)+.35;this.onMessage(this.gauge?.active?'Missed the green zone · dip and try again':'Keep the hoop beneath a fish until the gauge begins');return;}this.liftingFish=this.scoopLock;this.lift=1.1;}

 deposit(){
  if(!this.trapped.length||this.tipping)return false;
  if(this.basketController?.carried){this.onMessage('Put the basket on dry ground first · F');return false;}
  const p=this.camera.getPosition();if(Math.hypot(p.x-this.basket.x,p.z-this.basket.z)>1.75){this.onMessage('Carry the fish closer to the basket · E to tip');return false;}
  this.tipping=.001;this.tipTilt=0;this.tipReady=false;this.submerged=false;this.lift=0;return true;
 }
 cancel(){
  for(const f of this.trapped){f.mode='current';f.visited=true;f.route=null;if(f.releasePoint)f.position.copy(f.releasePoint);this.river?.clamp(f.position,f.radius);thawFish(f);}
  this.gauge?.reset();this.trapped=[];this.scoopLock=null;this.lockedFish=null;this.submerged=false;this.tipping=0;this.tipTilt=0;this.tipReady=false;this.strain=0;
 }
 releaseIntentional(){
  const fish=[...this.trapped];for(const f of fish){const ahead=this.camera.getPosition().clone().add(this.camera.forward.clone().mulScalar(2.5));let p;try{p=this.river.safePoint(ahead.x,ahead.z,f.radius);}catch{p=f.releasePoint??this.river.spawnPoint(f.radius);}const distance=Math.hypot(p.x-f.position.x,p.z-f.position.z),t=Math.max(.65,Math.min(1.4,distance/2.5));f.intentionalRelease=true;f.body.velocity={x:(p.x-f.position.x)/t,y:(this.level.waterY+.05-f.position.y)/t+4.905*t,z:(p.z-f.position.z)/t};this.detach(f);}
  return fish;
 }
 escape(f){if(f?.body)this.detach(f);}
 detach(f){f.mode='airborne';f.body.captured=false;f.body.released=true;f.body.airTime=0;f.body.groundTime=0;this.trapped=this.trapped.filter(other=>other!==f);this.tipping=0;this.tipTilt=0;this.tipReady=false;this.lift=0;this.liftingFish=null;this.scoopLock=null;this.lockedFish=null;this.blockedUntil=(this.clock??0)+.5;}
 capture(f){
  this.tipping=0;this.tipTilt=0;this.tipReady=false;this.liftingFish=null;f.releasePoint=f.position.clone();f.mode='net';f.intentionalRelease=false;if(f.eddy)f.eddy.occupant=null;f.eddy=null;
  f.body={...fishCollider(f.species.size,f.heading),position:f.position,seed:f.seed,captured:true,allowEscape:true,held:0,outside:0,nextFlop:.85,flopAge:2,roll:0,pitch:0};
  freezeFish(f);this.trapped=[f];this.scoopLock=null;this.lockedFish=null;this.strain=this.scoopQuality==='sluggish'?.45:.02;f.body.securedUntil=this.scoopQuality==='clean'?2.5:0;this.lift=0;
  this.onMessage(f.species.id==='smolt'?'Juvenile in the net · carry gently or Q to release':'Fish in the net · carry gently · E tips · Q releases');
 }
 flop(f,rough=false){
  const b=f.body,power=(f.species.id==='chinook'?1.3:f.species.id==='smolt'?.65:1)*(f.energy??f.stamina??1);b.flopAge=0;b.flopCount=(b.flopCount??0)+1;const side=b.flopCount%2?1:-1,longHold=b.held>12;
  b.velocity.y=Math.max(b.velocity.y,(rough?2.8:longHold?2.7:1.25)*power+(this.strain??0)*.65);
  b.velocity.x+=side*(rough?1.8:longHold?.85:.18)*power;b.velocity.z+=(rough?.8:.12)*Math.sin(f.seed+b.flopCount);
  b.rollVelocity=side*(rough?90:40);b.nextFlop=.9+(Math.sin(f.seed+b.flopCount)+1)*.3;
 }
 updateAirborne(dt,f){
  const b=f.body,p=f.position,before={...p};b.airTime+=dt;b.flopAge+=dt;
  b.velocity.y-=9.81*dt;p.x+=b.velocity.x*dt;p.y+=b.velocity.y*dt;p.z+=b.velocity.z*dt;
  this.obstacles?.projectPoint(p,b.radius);
  const beforeLocal=local(before,this.pose),nowLocal=local(p,this.pose);
  if(!f.intentionalRelease&&!this.trapped.length&&!this.stowed&&b.airTime>.18&&this.clock>=this.blockedUntil&&beforeLocal.y>=0&&nowLocal.y<0&&Math.hypot(nowLocal.x,nowLocal.z)<.48){const releasePoint=f.releasePoint;this.capture(f);f.releasePoint=releasePoint;return;}
  if(!this.basketController?.carried&&!f.banked&&crossedBasket(before,p,b.velocity,this.basket)){f.banked=true;this.onCatch(f);return;}
  const ground=this.river?.ground(p.x,p.z)??null;
  if(ground!==null&&ground>this.level.waterY+.065&&p.y<ground+b.radius){p.y=ground+b.radius;b.velocity.y=0;b.velocity.x*=Math.exp(-dt*8);b.velocity.z*=Math.exp(-dt*8);b.groundTime+=dt;
   if(b.flopAge>.9){const target=f.releasePoint??p,dx=target.x-p.x,dz=target.z-p.z,n=Math.hypot(dx,dz)||1;this.flop(f);b.velocity.x+=dx/n*.8;b.velocity.z+=dz/n*.8;}
  }else if(p.y<=this.level.waterY-.04&&b.velocity.y<0){
   this.river.clamp(p,f.radius);f.mode='current';f.visited=true;f.route=null;thawFish(f);this.waterFX.impulse?.(p,.7);
   if(f.intentionalRelease)this.onReleaseWater?.(f);else this.onMessage('The fish escaped back into the river.');f.intentionalRelease=false;return;
  }
  this.renderFish(f,dt);
 }
 renderFish(f,dt){const b=f.body;const wave=Math.sin(b.flopAge*22)*Math.exp(-b.flopAge*5);b.roll=f.mode==='airborne'?(b.roll??0)+(82-(b.roll??0))*(1-Math.exp(-dt*6)):(b.roll??0)*Math.exp(-dt*4)+wave*5;b.roll=pc.math.clamp(b.roll,-85,85);bendFish(f,wave*32);f.entity.setPosition(f.position);f.entity.setEulerAngles(b.pitch??0,b.yaw,0);f.entity.rotateLocal?.(0,0,b.roll);}
 update(dt,fish,locked){
  this.clock=(this.clock??0)+dt;this.blockedUntil??=0;this.strain??=0;this.zone??=new NetCatchZone();this.fishCandidates=fish;
  if(this.submerged)this.holdTime=(this.holdTime??0)+dt;
  this.aim(dt,locked);const selected=this.scoopLock;if(this.submerged&&selected){const dx=this.target.x-selected.position.x,dz=this.target.z-selected.position.z,below=this.target.y<selected.position.y-.1&&Math.hypot(dx,dz)<.43,needed=selected.species.id==='chinook'?.75:selected.species.id==='smolt'?.16:.35;this.beneathTime=below?(this.beneathTime??0)+dt:0;this.gauge??=new ScoopGauge();this.gauge.update(dt,selected,below&&this.beneathTime>=needed,true);this.scoopReady=this.gauge.ready;}else if(this.submerged){this.gauge??=new ScoopGauge();this.gauge.update(dt,null,false,true);this.scoopReady=false;this.beneathTime=0;}const previous=this.pose,old=this.target.clone(),oldSpeed=this.speed??0;
  const grip=this.camera.getPosition().clone().add(this.camera.right.clone().mulScalar(.3)).add(this.camera.up.clone().mulScalar(-.6));
  if(this.tipping){this.tipping+=dt;this.desired.set(this.basket.x,this.basket.rimY+1.12,this.basket.z);}
  const elder=this.obstacles?.elder,nearElder=elder&&Math.hypot(this.camera.getPosition().x-elder.x,this.camera.getPosition().z-elder.z)<1.65;
  this.stowed=!!this.basketController?.carried||!!(nearElder&&!this.trapped.length);
  if(!this.stowed&&this.obstacles){const safe=this.obstacles.safeNet(this.desired,grip);if(safe)this.desired.set(safe.x,safe.y,safe.z);else this.stowed=true;}
  if(!this.basketController?.carried){const dx=this.desired.x-this.basket.x,dz=this.desired.z-this.basket.z,gx=grip.x-this.basket.x,gz=grip.z-this.basket.z;if(Math.hypot(dx,dz)>1.6)this.basketSide=null;this.basketSide??=(-gz*dx+gx*dz>=0?1:-1);avoidBasket(this.desired,grip,this.basket,{tipping:!!this.tipping,side:this.basketSide});}
  const smoothed=this.target.clone().lerp(this.target,this.desired,1-Math.exp(-dt*(this.lift>0&&this.scoopQuality!=='clean'?2.8:8)));const shift=smoothed.clone().sub(this.target),limit=this.trapped.length?(this.tipping?1.4:this.trapped[0].body.held<1.4?1.15:2.7)*dt:Infinity;if(shift.length()>limit)shift.normalize().mulScalar(limit);this.target.add(shift);if(!this.initialized){this.target.copy(this.desired);this.physics.reset(uprightPose(this.target));this.initialized=true;}
  if(this.obstacles&&!this.stowed)this.obstacles.projectPoint(this.target,.58);
  if(!this.basketController?.carried){const before=this.target.clone();avoidBasket(this.target,grip,this.basket,{tipping:!!this.tipping,side:this.basketSide??1,project:true});const correction=this.target.clone().sub(before);if(correction.length()>0){for(const points of [this.physics.positions,this.physics.previous])for(const p of points){p.x+=correction.x;p.y+=correction.y;p.z+=correction.z;}for(const key of ['x','y','z'])this.physics.pose.center[key]+=correction[key];if(this.trapped[0])this.trapped[0].position.add(correction);old.add(correction);}}

  this.speed=old.distance(this.target)/Math.max(dt,.001);this.still=this.speed<.2?(this.still??0)+dt:0;this.sweepVelocity={x:(this.target.x-old.x)/Math.max(dt,.001),z:(this.target.z-old.z)/Math.max(dt,.001)};this.pose=sweepPose(this.target,this.sweepVelocity,this.submerged,this.lift,this.scoopQuality);this.sweepInput=(this.sweepInput??0)*Math.exp(-dt*3);
  if(this.tipping){if(this.target.distance(this.desired)<.08&&this.speed<.5)this.tipReady=true;if(this.tipReady)this.tipTilt=(this.tipTilt??0)+dt;const a=Math.min(1,(this.tipTilt??0)/1.1)*Math.PI*.07;this.pose.normal={x:Math.sin(a),y:Math.cos(a),z:0};this.pose.right={x:Math.cos(a),y:-Math.sin(a),z:0};}
  if(!this.scoopMiss&&!this.trapped.length&&this.lift>0&&!this.stowed&&this.clock>=this.blockedUntil)for(const f of fish){if(['net','banked','airborne'].includes(f.mode)||((this.liftingFish??this.scoopLock)&&f!==(this.liftingFish??this.scoopLock)))continue;const body=fishCollider(f.species.size,f.heading);if(crossedHoop(previous,this.pose,f.position,f.position,body)){this.capture(f);break;}}
  const f=this.trapped[0];if(f){const b=f.body;f.energy=Math.max(.4,(f.energy??f.stamina??1)-dt*.045);b.held+=dt;b.flopAge+=dt;b.nextFlop-=dt;
   if(b.held>Math.max(.8,b.securedUntil??0)&&!this.tipping){const acceleration=Math.abs(this.speed-oldSpeed)/Math.max(dt,.001);this.strain=pc.math.clamp(this.strain+Math.max(0,acceleration-12)*dt*.022-dt*.22,0,1.5);if(b.nextFlop<=0)this.flop(f);}
   if(this.tipReady){f.position.x+=(this.basket.x-f.position.x)*(1-Math.exp(-dt*5));f.position.z+=(this.basket.z-f.position.z)*(1-Math.exp(-dt*5));}if((this.tipTilt??0)>.6&&Math.hypot(f.position.x-this.basket.x,f.position.z-this.basket.z)<.3){b.velocity.x=0;b.velocity.z=0;b.velocity.y=Math.min(0,b.velocity.y);this.detach(f);}
  }
  const cargo=this.trapped[0];this.physics.step(dt,this.pose,{body:cargo?.body??null,waterY:this.level.waterY,ground:(x,z)=>this.river?.ground(x,z)??null,contain:true,obstacles:{projectPoint:(p,r)=>{this.obstacles?.projectPoint(p,r);if(!this.basketController?.carried)projectBasketRope(p,this.basket,r);}}});
  if(cargo){const b=cargo.body;this.obstacles?.projectPoint(cargo.position,b.halfLength+b.radius);b.outside=this.zone.contains(cargo.position,this.pose,b.radius)?0:b.outside+dt;if(b.outside>.16){this.detach(cargo);this.onMessage('Fish out of the catch zone · it can escape');}this.renderFish(cargo,dt);}
  for(const free of fish)if(free.mode==='airborne')this.updateAirborne(dt,free);
  if(this.obstacles?.netBlocked(this.target,grip))this.stowed=true;this.waterFX.update(dt,this);this.lift=Math.max(0,this.lift-dt);this.renderer.setVisible?.(!this.stowed);if(!this.basketController?.carried)avoidBasketHandle(grip,this.target,this.basket);this.renderer.update(this.pose,grip,this.camera);
 }
 destroy(){this.waterFX.destroy();this.renderer.destroy();}
}
