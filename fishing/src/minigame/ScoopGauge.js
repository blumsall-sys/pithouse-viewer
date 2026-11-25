const SETTINGS={smolt:{period:4.4,start:.32,end:.68},sockeye:{period:3.8,start:.39,end:.61},chinook:{period:3.3,start:.44,end:.56}};
export class ScoopGauge {
 reset(){this.fish=null;this.elapsed=0;this.value=0;this.active=false;this.ready=false;}
 constructor(){this.reset();}
 update(dt,fish,beneath,winding=false){
  if(fish!==this.fish){this.reset();this.fish=fish;}
  const settings=SETTINGS[fish?.species.id]??SETTINGS.sockeye;Object.assign(this,settings);const stamina=fish?.stamina??1,width=(this.end-this.start)/Math.max(.8,stamina);this.start=.5-width/2;this.end=.5+width/2;this.period/=Math.sqrt(stamina);
  this.aligned=!!fish&&beneath;this.active=winding||this.aligned;
  if(!this.active){this.ready=false;return;}
  this.elapsed+=dt;const cycle=(this.elapsed/(this.period/2))%2;
  this.value=cycle<=1?cycle:2-cycle;
  this.ready=this.aligned&&this.value>=this.start&&this.value<=this.end;
 }
 quality(){return !this.aligned?'miss':this.ready?'clean':this.value>.18&&this.value<.82?'sluggish':'miss';}
}
