export function advanceApproach(f,dt,river,net,difficulty){
 const p=f.position,u=river.river.upstream;f.age+=dt;f.wiggle+=dt*5;f.travelPhase??='incoming';
 const big=f.species?.id==='chinook',small=f.species?.id==='smolt',speed=(small?.65:big?1.25:.9)*(1+difficulty*.2)*(f.sizeFactor??1);f.energy??=f.stamina??1;f.energy=Math.max(.45,Math.min(f.stamina??1,f.energy+dt*(net?.scoopLock===f?-.15:.06)));
 const chased=net?.submerged&&Math.hypot(p.x-net.target.x,p.z-net.target.z)<1.7&&(net.speed>2.3||net.scoopLock===f);
 if(f.dodgeFromNet>0){f.dodgeFromNet-=dt;if(f.travelPhase!=='escape'){f.travelPhase='escape';f.route=null;}}
 if(f.travelPhase==='rest'){f.rest-=dt;f.restElapsed=(f.restElapsed??0)+dt;f.mode='rest';if(f.rest<=0||(chased&&f.restElapsed>2.5)){f.travelPhase='escape';f.route=null;}else{return false;}}
 const side=Math.floor(f.seed??0)%2,exit=river.river.escapes?.[side]??river.river.escape??[1.7,7.3];
 if(!f.restGoal)f.restGoal=river.restingPoint(f.radius,f.seed??0,net?.camera?.getPosition?.());
 const goal=f.travelPhase==='escape'?river.safePoint(exit[0],exit[1],f.radius):f.restGoal;
 if(!f.route){f.route=river.path(p,goal,f.radius);f.routeIndex=0;f.stuckTime=0;}
 let target=f.route[f.routeIndex];while(target&&Math.hypot(target.x-p.x,target.z-p.z)<.12)target=f.route[++f.routeIndex];
 if(!target){const remaining=Math.hypot(goal.x-p.x,goal.z-p.z);if(remaining>.08){if(remaining>.65||!river.isClear((goal.x+p.x)/2,(goal.z+p.z)/2,f.radius)){f.route=null;return false;}target=goal;}else{if(f.travelPhase==='escape')return true;f.approach=false;f.travelPhase='rest';f.restElapsed=0;f.mode='rest';f.rest=small?5:big?6:7;f.route=null;return false;}}
 let dx=target.x-p.x,dz=target.z-p.z,n=Math.hypot(dx,dz)||1;const before={x:p.x,z:p.z};river.move(p,dx/n*speed*(f.travelPhase==='escape'?1.15+f.energy*.25:1)*dt,dz/n*speed*(f.travelPhase==='escape'?1.15+f.energy*.25:1)*dt,f.radius);
 const moved=Math.hypot(p.x-before.x,p.z-before.z);f.stuckTime=moved<.002?(f.stuckTime??0)+dt:0;if(f.stuckTime>.65){f.route=null;f.stuckTime=0;}
 p.y=river.water.surfaceY-river.water.fishDepth-.025*Math.sin(f.wiggle*.5);river.clamp(p,f.radius);if(moved>.0001)f.heading=(f.heading??0)+Math.max(-dt*150,Math.min(dt*150,((Math.atan2(p.x-before.x,p.z-before.z)*180/Math.PI-(f.heading??0)+540)%360)-180));return false;
}
