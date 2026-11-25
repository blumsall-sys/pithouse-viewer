import {uprightPose} from './NetClothPhysics.js';
export function sweepPose(center,velocity,submerged,lift,quality){
 const pose=uprightPose(center),strength=submerged?.12:lift>0?(quality==='clean'?.12:.055):.025;
 const nx=Math.max(-.38,Math.min(.38,-velocity.x*strength)),nz=Math.max(-.38,Math.min(.38,-velocity.z*strength)),ny=Math.sqrt(Math.max(.1,1-nx*nx-nz*nz));
 pose.normal={x:nx,y:ny,z:nz};
 const d=Math.hypot(ny,nx);pose.right={x:ny/d,y:-nx/d,z:0};
 pose.forward={x:-nx*nz/d,y:-ny*nz/d,z:d};return pose;
}
