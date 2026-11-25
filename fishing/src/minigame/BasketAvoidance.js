// The rope bag hangs below the rigid hoop. Reserve clearance for both.
export function avoidBasket(point,grip,basket,{tipping=false,side=1,project=false}={}){
 if(!basket)return false;
 const dx=point.x-basket.x,dz=point.z-basket.z,d=Math.hypot(dx,dz);
 if(tipping||d>=1.24)return false;
 const gx=grip.x-basket.x,gz=grip.z-basket.z,n=Math.hypot(gx,gz)||1;
 // Lower to the selected side of the basket; never lift over it during approach.
 const sx=-gz/n*side,sz=gx/n*side;
 point.x=basket.x+(project&&d>.01?dx/d:sx)*1.26;point.z=basket.z+(project&&d>.01?dz/d:sz)*1.26;
 point.y=Math.min(point.y,basket.rimY+.1);return true;
}

export function avoidBasketHandle(grip,point,basket){
 if(!basket||point.y>basket.rimY+.12||point.y<basket.baseY-.12)return false;
 const dx=grip.x-point.x,dz=grip.z-point.z,n=Math.hypot(dx,dz)||1;
 const clear=(x,z)=>{const sx=x/n*3.5,sz=z/n*3.5,t=Math.max(0,Math.min(1,((basket.x-point.x)*sx+(basket.z-point.z)*sz)/(3.5*3.5)));return Math.hypot(point.x+sx*t-basket.x,point.z+sz*t-basket.z)>.72;};
 if(clear(dx,dz))return false;
 for(const a of [.5,-.5,.9,-.9,1.4,-1.4]){const x=dx*Math.cos(a)-dz*Math.sin(a),z=dx*Math.sin(a)+dz*Math.cos(a);if(clear(x,z)){grip.x=point.x+x;grip.z=point.z+z;return true;}}
 return false;
}

export function projectBasketRope(p,basket,radius=.02){
 if(!basket||p.y>basket.rimY+radius||p.y<basket.baseY-radius)return false;
 const dx=p.x-basket.x,dz=p.z-basket.z,d=Math.hypot(dx,dz),r=.61+radius;
 if(d>=r)return false;
 p.x=basket.x+(d?dx/d:1)*r;p.z=basket.z+(d?dz/d:0)*r;return true;
}
