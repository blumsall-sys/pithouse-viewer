import {BankNavigation} from './BankNavigation.js';

// The hoop can be aimed 3.1 m away. Leave clearance for the fish and the rim.
export const REST_REACH = 2.45;
export function connectedBank(level) {
  const nav=new BankNavigation(level),step=.2,b=level.walkBounds;
  const width=Math.floor((b.maxX-b.minX)/step)+1,height=Math.floor((b.maxZ-b.minZ)/step)+1;
  const nodes=Array.from({length:width*height},(_,i)=>{const x=b.minX+(i%width)*step,z=b.minZ+Math.floor(i/width)*step,y=nav.sample(x,z);return y===null?null:{x,y,z};});
  let start=-1,distance=Infinity;
  nodes.forEach((n,i)=>{if(n){const d=Math.hypot(n.x-level.player[0],n.z-level.player[2]);if(d<distance){start=i;distance=d;}}});
  if(start<0)throw Error('No walkable fishing bank at the player spawn');
  const seen=new Set([start]),queue=[start];
  for(let head=0;head<queue.length;head++){
    const id=queue[head],ix=id%width,iz=Math.floor(id/width),a=nodes[id];
    for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const x=ix+dx,z=iz+dz,next=z*width+x,n=nodes[next];
      if(x<0||z<0||x>=width||z>=height||seen.has(next)||!n||n.y-a.y>.4||n.y-a.y<-.7||nav.sample((n.x+a.x)/2,(n.z+a.z)/2)===null)continue;
      seen.add(next);queue.push(next);
    }
  }
  return queue.map(id=>nodes[id]);
}

export function restingCandidates(level,river,radius) {
  river.reachableBank??=connectedBank(level);
  const result=[];
  // Every authored pocket is moved into real open water beside connected dry rock.
  for(let z=2.2;z<=11;z+=.3)for(let x=-2.5;x<=15.5;x+=.3){
    if(!river.isClear(x,z,Math.max(.65,radius+.12)))continue;
    let anchor=null,best=REST_REACH;
    for(const bank of river.reachableBank){const d=Math.hypot(bank.x-x,bank.z-z);if(d<best){best=d;anchor=bank;}}
    if(anchor)result.push({x,z,anchor,distance:best});
  }
  if(!result.length)throw Error('No resting water is reachable from the dry fishing bank');
  return result;
}

export function reachableRestingPoint(river,radius,seed=0,player=river.level.player) {
  river.restingLocations??=new Map();
  // Round upward: a shared cache entry must also clear the largest fish using it.
  const bucket=Math.ceil(radius*20)/20;
  if(!river.restingLocations.has(bucket))river.restingLocations.set(bucket,restingCandidates(river.level,river,bucket));
  const px=player.x??player[0],pz=player.z??player[2],desiredX=px+Math.sin(seed*2.4)*2.2;
  let best=null,score=Infinity;
  for(const point of river.restingLocations.get(bucket)){
    const crowd=(river.restingReservations||[]).reduce((total,p)=>total+Math.max(0,radius+p.radius+.3-Math.hypot(p.x-point.x,p.z-point.z))*2,0);
    const d=Math.hypot(point.x-desiredX,point.z-(pz+2.3))+Math.hypot(point.anchor.x-px,point.anchor.z-pz)*.3+point.distance*.1+crowd;
    if(d<score){score=d;best=point;}
  }
  river.restingReservations=[...(river.restingReservations||[]),{x:best.x,z:best.z,radius}].slice(-12);
  return {x:best.x,z:best.z,anchor:best.anchor};
}
