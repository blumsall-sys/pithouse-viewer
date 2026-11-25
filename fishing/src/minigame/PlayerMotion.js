export class PlayerMotion {
 constructor(){this.height=1.65;this.offset=0;this.velocity=0;this.wasJump=false;}
 update(dt,keys){const crouch=keys.has('ControlLeft')||keys.has('ControlRight'),jump=keys.has('Space');this.height+=( (crouch?1.02:1.65)-this.height)*(1-Math.exp(-dt*14));if(jump&&!this.wasJump&&this.offset<=0&&!crouch)this.velocity=4.4;this.wasJump=jump;this.velocity-=12*dt;this.offset=Math.max(0,this.offset+this.velocity*dt);if(this.offset===0)this.velocity=0;return this.height+this.offset;}
}
