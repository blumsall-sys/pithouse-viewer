const v=(x=0,y=0,z=0)=>({x,y,z});
export const length=p=>Math.hypot(p.x,p.y,p.z);
export const dot=(a,b)=>a.x*b.x+a.y*b.y+a.z*b.z;
export function transform(p,pose){return{x:pose.center.x+pose.right.x*p.x+pose.normal.x*p.y+pose.forward.x*p.z,y:pose.center.y+pose.right.y*p.x+pose.normal.y*p.y+pose.forward.y*p.z,z:pose.center.z+pose.right.z*p.x+pose.normal.z*p.y+pose.forward.z*p.z};}
export function local(p,pose){const d={x:p.x-pose.center.x,y:p.y-pose.center.y,z:p.z-pose.center.z};return{x:dot(d,pose.right),y:dot(d,pose.normal),z:dot(d,pose.forward)};}
export function uprightPose(center={x:0,y:0,z:0}){return{center:{...center},right:v(1,0,0),normal:v(0,1,0),forward:v(0,0,1)};}
export function createNetLattice(sectors=32,rings=8,radius=.54,depth=.65){
 const rest=[],pins=[],edges=[],visible=[];for(let r=0;r<rings;r++){const t=r/rings,rr=radius*Math.sqrt(Math.max(.015,1-t*t));for(let s=0;s<sectors;s++){const a=s/sectors*Math.PI*2;rest.push(v(Math.cos(a)*rr,-depth*t,Math.sin(a)*rr));pins.push(r===0);}}
 const bottom=rest.length;rest.push(v(0,-depth,0));pins.push(false);
 const add=(a,b,stiff,draw=false)=>{const pa=rest[a],pb=rest[b];edges.push({a,b,rest:Math.hypot(pa.x-pb.x,pa.y-pb.y,pa.z-pb.z),stiff});if(draw)visible.push([a,b]);};
 for(let r=0;r<rings;r++)for(let s=0;s<sectors;s++){const i=r*sectors+s,next=r*sectors+(s+1)%sectors;add(i,next,.93,true);if(r<rings-1){add(i,i+sectors,.94,true);add(i,(r+1)*sectors+(s+1)%sectors,.48);add(next,i+sectors,.48);}else add(i,bottom,.94,true);if(r<rings-2)add(i,i+2*sectors,.24);}
 return{rest,pins,edges,visible,sectors,rings,radius,depth};
}
export function fishCollider(size=.72,heading=0,mass=.7){return{halfLength:size*.29,radius:size*.16,mass,yaw:heading,roll:0,velocity:v(),previous:v(),captured:false};}
export function crossedHoop(previousPose,pose,previousFish,fish,body,radius=.54){
 const a=local(previousFish,previousPose),b=local(fish,pose);const margin=body.radius*.35;
 return a.y>=-margin&&b.y<=margin&&b.y>=-.28&&Math.hypot(b.x,b.z)<radius-body.radius*.5&&(pose.center.y>previousPose.center.y+.0001||a.y-b.y>.015);
}
export function crossedBasket(previous,current,velocity,basket){return previous.y>basket.rimY&&current.y<=basket.rimY&&velocity.y<-.05&&Math.hypot(current.x-basket.x,current.z-basket.z)<basket.radius;}
function mixPose(a,b,t){const mix=(p,q)=>({x:p.x+(q.x-p.x)*t,y:p.y+(q.y-p.y)*t,z:p.z+(q.z-p.z)*t}),unit=p=>{const n=Math.hypot(p.x,p.y,p.z)||1;return{x:p.x/n,y:p.y/n,z:p.z/n};};return{center:mix(a.center,b.center),right:unit(mix(a.right,b.right)),normal:unit(mix(a.normal,b.normal)),forward:unit(mix(a.forward,b.forward))};}
export class NetClothPhysics{
 constructor(options={}){this.lattice=createNetLattice(options.sectors??32,options.rings??8,options.radius??.54,options.depth??.65);this.positions=this.lattice.rest.map(p=>({...p}));this.previous=this.positions.map(p=>({...p}));this.pose=uprightPose();this.time=0;this.accumulator=0;this.reset(this.pose);}
 reset(pose){this.pose=mixPose(pose,pose,1);this.accumulator=0;for(let i=0;i<this.positions.length;i++){Object.assign(this.positions[i],transform(this.lattice.rest[i],pose));Object.assign(this.previous[i],this.positions[i]);}}
 step(dt,pose,{body=null,waterY=-100,ground=null,contain=true,obstacles=null}={}){this.obstacles=obstacles;this.accumulator=Math.min(this.accumulator+dt,.065);const h=1/120,count=Math.floor((this.accumulator+1e-10)/h);if(!count)return;const start=this.pose,elapsed=count*h;this.frameVelocity={x:(pose.center.x-start.center.x)/elapsed,y:(pose.center.y-start.center.y)/elapsed,z:(pose.center.z-start.center.z)/elapsed};for(let i=1;i<=count;i++){this.substep(h,mixPose(start,pose,i/count),body,waterY,ground,contain);this.accumulator-=h;}this.accumulator=Math.max(0,this.accumulator);this.pose=mixPose(pose,pose,1);}

 substep(h,pose,body,waterY,ground,contain){this.time+=h;const {pins,edges,rest}=this.lattice,p=this.positions,old=this.previous;
  for(let i=0;i<p.length;i++){if(pins[i]){Object.assign(old[i],p[i]);Object.assign(p[i],transform(rest[i],pose));continue;}const n=p[i],o=old[i],wet=n.y<waterY,drag=Math.exp(-h*(wet?12:1.8)),dx=(n.x-o.x)*drag,dy=(n.y-o.y)*drag,dz=(n.z-o.z)*drag;Object.assign(o,n);n.x+=dx+(wet?.07:0)*h*h;n.y+=dy-9.81*(wet?.55:1)*h*h;n.z+=dz;}
  if(body){body.onCloth=false;const b=body.position,vel=body.velocity;body.previous={...b};const wet=b.y<waterY,drag=Math.exp(-h*(wet?3:.35));vel.x*=drag;vel.y=vel.y*drag-9.81*(wet?.16:1)*h;vel.z*=drag;if(body.captured&&body.allowEscape){const q=local(b,pose);vel.x-=(pose.right.x*q.x+pose.forward.x*q.z)*h*5;vel.z-=(pose.right.z*q.x+pose.forward.z*q.z)*h*5;}b.x+=vel.x*h;b.y+=vel.y*h;b.z+=vel.z*h;}
  for(let iter=0;iter<6;iter++){
   for(const e of edges){const a=p[e.a],b=p[e.b],dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z,d=Math.hypot(dx,dy,dz)||1e-8,wa=pins[e.a]?0:1,wb=pins[e.b]?0:1,sum=wa+wb;if(!sum)continue;const f=(d-e.rest)/d*e.stiff/sum;a.x+=dx*f*wa;a.y+=dy*f*wa;a.z+=dz*f*wa;b.x-=dx*f*wb;b.y-=dy*f*wb;b.z-=dz*f*wb;}
   if(body)this.collideBody(body,pose,contain);
   if(ground)for(let i=this.lattice.sectors;i<p.length;i++){const height=ground(p[i].x,p[i].z);if(height!==null&&p[i].y<height+.012){p[i].y=height+.012;old[i].x=p[i].x;old[i].z=p[i].z;}}
   if(this.obstacles)for(let i=this.lattice.sectors;i<p.length;i++)this.obstacles.projectPoint(p[i],.015);
   for(let i=0;i<this.lattice.sectors;i++)Object.assign(p[i],transform(rest[i],pose));
  }
  if(body){const b=body.position;body.velocity.x=(b.x-body.previous.x)/h;body.velocity.y=(b.y-body.previous.y)/h;body.velocity.z=(b.z-body.previous.z)/h;if(body.allowEscape&&body.onCloth){const fv=this.frameVelocity??v(),friction=1-Math.exp(-h*10);body.velocity.x+=(fv.x-body.velocity.x)*friction;body.velocity.z+=(fv.z-body.velocity.z)*friction;if(body.velocity.y<fv.y)body.velocity.y=fv.y;}const speed=length(body.velocity);if(speed>6){body.velocity.x*=6/speed;body.velocity.y*=6/speed;body.velocity.z*=6/speed;}}
 }
 collideBody(body,pose,contain){const b=body.position,angle=body.yaw*Math.PI/180,axis=v(Math.sin(angle),0,Math.cos(angle)),radius=body.radius;
  for(let i=this.lattice.sectors;i<this.positions.length;i++){const n=this.positions[i],dx=n.x-b.x,dy=n.y-b.y,dz=n.z-b.z,t=Math.max(-body.halfLength,Math.min(body.halfLength,dx*axis.x+dz*axis.z)),cx=b.x+axis.x*t,cz=b.z+axis.z*t,nx=n.x-cx,ny=n.y-b.y,nz=n.z-cz,d=Math.hypot(nx,ny,nz);if(d<radius&&d>1e-8){const depth=(radius-d)/d;const share=body.allowEscape?1:.98;n.x+=nx*depth*share;n.y+=ny*depth*share;n.z+=nz*depth*share;b.x-=nx*depth*(1-share);b.y-=ny*depth*(1-share);b.z-=nz*depth*(1-share);}}
  // A continuous support surface supplements the knot contacts, so a slender fish cannot tunnel through the weave openings.
  if(contain&&pose.normal.y>.35){let q=local(b,pose);if(body.allowEscape&&q.y<-.1){const radial=Math.hypot(q.x,q.z),allowed=this.lattice.radius*Math.sqrt(Math.max(.1,1-(q.y/.9)**2))-radius*.15;if(radial>allowed){const correction=(radial-allowed)/radial;b.x-=(pose.right.x*q.x+pose.forward.x*q.z)*correction;b.y-=(pose.right.y*q.x+pose.forward.y*q.z)*correction;b.z-=(pose.right.z*q.x+pose.forward.z*q.z)*correction;b.x+=pose.normal.x*(radial-allowed)*.35;b.y+=pose.normal.y*(radial-allowed)*.35;b.z+=pose.normal.z*(radial-allowed)*.35;q=local(b,pose);}}if(body.allowEscape&&(Math.hypot(q.x,q.z)>this.lattice.radius-radius*.15||q.y>.22))return;let sag=0;for(let i=(this.lattice.rings-1)*this.lattice.sectors;i<this.positions.length;i++)sag+=local(this.positions[i],pose).y;sag/=(this.lattice.sectors+1);sag=Math.max(-1.05,Math.min(-.48,sag));const radial=Math.hypot(q.x,q.z),support=sag*(1-Math.min(.95,(radial/this.lattice.radius)**2))+radius*.85;if(q.y<support){body.onCloth=true;const correction=support-q.y;b.x+=pose.normal.x*correction;b.y+=pose.normal.y*correction;b.z+=pose.normal.z*correction;}if(!body.allowEscape&&q.y>.05){const correction=q.y-.05;b.x-=pose.normal.x*correction;b.y-=pose.normal.y*correction;b.z-=pose.normal.z*correction;}const allowed=this.lattice.radius-radius*.8;if(!body.allowEscape&&radial>allowed){const f=(radial-allowed)/(radial||1);b.x-=(pose.right.x*q.x+pose.forward.x*q.z)*f;b.y-=(pose.right.y*q.x+pose.forward.y*q.z)*f;b.z-=(pose.right.z*q.x+pose.forward.z*q.z)*f;}}
 }
 get sag(){let y=0;for(let i=(this.lattice.rings-1)*this.lattice.sectors;i<this.positions.length;i++)y+=local(this.positions[i],this.pose).y;return-y/(this.lattice.sectors+1);}
}
