import {BoundingBox,Ray,Vec3} from 'playcanvas';
export class SceneObstacles {
 constructor(level,npc){this.level=level;this.npc=npc;this.elder={x:level.elder[0],z:level.elder[2],base:level.elder[1],radius:.62,height:1.8};this.bounds=new BoundingBox();}
 update(){const e=this.elder;e.radius=this.npc?.mode==='Working'?.8:.62;e.height=this.npc?.mode==='Working'?1.25:1.8;this.bounds.center.set(e.x,e.base+e.height/2,e.z);this.bounds.halfExtents.set(e.radius,e.height/2,e.radius);}
 overlaps(x,z,radius=.2){const e=this.elder;return Math.hypot(x-e.x,z-e.z)<e.radius+radius;}
 projectPoint(p,radius=.025){const e=this.elder;if(p.y<e.base-radius||p.y>e.base+e.height+radius)return false;const dx=p.x-e.x,dz=p.z-e.z,d=Math.hypot(dx,dz),r=e.radius+radius;if(d>=r)return false;p.x=e.x+(dx/(d||1))*r;p.z=e.z+(d?dz/d:1)*r;return true;}
 segmentBlocked(a,b,padding=.04){const d=new Vec3(b.x-a.x,b.y-a.y,b.z-a.z),length=d.length();if(!length)return this.overlaps(a.x,a.z,padding);const box=this.bounds.clone();box.halfExtents.addScalar(padding);const hit=new Vec3();return box.intersectsRay(new Ray(new Vec3(a.x,a.y,a.z),d.mulScalar(1/length)),hit)&&hit.distance(new Vec3(a.x,a.y,a.z))<=length;}
 netBlocked(p,grip){const e=this.elder,overlaps=p.y-.7<e.base+e.height&&p.y+.08>e.base&&this.overlaps(p.x,p.z,.57),dx=grip.x-p.x,dz=grip.z-p.z,d=Math.hypot(dx,dz)||1,tail={x:p.x+dx/d*3.5,y:grip.y,z:p.z+dz/d*3.5};return overlaps||this.segmentBlocked(p,tail,.055);}
 safeNet(desired,grip){const e=this.elder;if(!this.netBlocked(desired,grip))return desired;const dx=desired.x-grip.x,dz=desired.z-grip.z;for(const angle of [.45,-.45,.9,-.9,1.4,-1.4,Math.PI]){const p={x:grip.x+dx*Math.cos(angle)-dz*Math.sin(angle),y:Math.max(desired.y,e.base+.9),z:grip.z+dx*Math.sin(angle)+dz*Math.cos(angle)};if(!this.netBlocked(p,grip))return p;}return null;}
}
