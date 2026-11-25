export function selectScoopTarget(fish,aim,player,river,current=null){
 const eligible=f=>!['net','banked','airborne'].includes(f.mode)&&Math.hypot(f.position.x-player.x,f.position.z-player.z)<3.55&&river.isClear(f.position.x,f.position.z,.48)&&!river.segmentBlocked?.(player,f.position);
 if(current&&fish.includes(current)&&eligible(current)&&Math.hypot(current.position.x-aim.x,current.position.z-aim.z)<1.15)return current;
 let best=null,distance=.85;for(const f of fish){if(!eligible(f))continue;const d=Math.hypot(f.position.x-aim.x,f.position.z-aim.z);if(d<distance){distance=d;best=f;}}return best;
}
