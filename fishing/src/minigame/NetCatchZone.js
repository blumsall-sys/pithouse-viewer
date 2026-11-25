import {BoundingBox,Ray,Vec3} from 'playcanvas';
import {local} from './NetClothPhysics.js';
export class NetCatchZone {
 constructor(radius=.54){this.radius=radius;this.bounds=new BoundingBox(new Vec3(0,-.35,0),new Vec3(radius,.55,radius));this.ray=new Ray(new Vec3(),new Vec3(0,-1,0));this.hit=new Vec3();}
 contains(position,pose,bodyRadius=.1){const q=local(position,pose);this.ray.origin.set(q.x,.35,q.z);const intersects=this.bounds.intersectsRay(this.ray,this.hit);return intersects&&Math.hypot(q.x,q.z)<this.radius-bodyRadius*.15&&q.y>-.95&&q.y<.28;}
}
