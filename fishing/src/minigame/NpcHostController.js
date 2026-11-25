import {animate} from '../utils/PlaceholderFactory.js';
export class NpcHostController{
 constructor(entity,asset){this.animation=animate(entity,asset,'Idle');this.mode='Idle';}
 setMode(mode){if(this.mode===mode)return;this.mode=mode;this.animation?.play(mode);}
 idle(){this.setMode('Idle');}talk(){this.setMode('Talking');}work(){this.setMode('Working');}
 facePlayer(player,anchor,dt,offset=0){if(!anchor||this.mode==='Working')return;const p=anchor.getPosition(),target=Math.atan2(player.x-p.x,player.z-p.z)*180/Math.PI+offset,current=anchor.forward?Math.atan2(-anchor.forward.x,-anchor.forward.z)*180/Math.PI:anchor.getEulerAngles().y,delta=((target-current+540)%360)-180;anchor.setEulerAngles(0,current+Math.max(-dt*100,Math.min(dt*100,delta)),0);}
 update(){} // Work loops until an explicit interaction changes the state.
}
