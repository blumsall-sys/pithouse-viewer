/* Pithouse experience systems v0.3: ground walking, conversations, inventory,
   authored camera shots, USB gamepad, and synthesized CC0-style ambience.
   Self-contained; depends only on PlayCanvas v2.24 and browser APIs. */

const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const V=(pc,p)=>new pc.Vec3(...p);
const near=(x)=>Math.abs(x)<.14?0:x;
const copyPose=(camera)=>({position:camera.getPosition().clone(),rotation:camera.getEulerAngles().clone(),fov:camera.camera.fov});
const byId=(id)=>document.getElementById(id);
function elem(tag,cls,parent,text) {
  const node=document.createElement(tag); if(cls)node.className=cls;
  if(text!==undefined)node.textContent=text;
  parent.appendChild(node);return node;
}
function newButton(parent,text,handler,cls='secondary') {
  const b=elem('button',cls,parent,text); b.type='button';b.addEventListener('click',handler);return b;
}
class WalkCollision {
  constructor(pc,voxel,manifest) {
    this.pc=pc;this.voxel=voxel;this.scene=manifest;
    this.eyeHeight=manifest.movement?.eyeHeight??1.6;
    this.radius=manifest.movement?.radius??.2;
    this.feetY=0;this.vy=0;this.velocity=[0,0];this.travel=0;
  }
  static async load(pc,manifest) {
    const url=manifest.environment?.voxelJson||'../scene.voxel.json';
    const bin=manifest.environment?.voxelBin||'../scene.voxel.bin';
    if(typeof pc.VoxelOccupancy!=='function')throw Error('PlayCanvas VoxelOccupancy is unavailable in this engine version');
    const [a,b]=await Promise.all([fetch(url),fetch(bin)]);
    if(!a.ok||!b.ok)throw Error('Voxel files unavailable ('+a.status+'/'+b.status+')');
    return new pc.VoxelOccupancy(await a.json(),await b.arrayBuffer());
  }
  floorAt(x,z,previousFoot,maxRise=.5,maxDrop=2.1) {
    if(!this.voxel)return null;
    const high=previousFoot+maxRise+.2,dist=maxRise+maxDrop+.2;
    const ray=new this.pc.Ray(new this.pc.Vec3(x,high,z), new this.pc.Vec3(0,-1,0));
    const point=new this.pc.Vec3(),normal=new this.pc.Vec3();
    if(!this.voxel.raycast(ray,dist,point,normal))return null;
    // Floor candidate must be generally upward-facing; avoid mistaking side walls for floors.
    if(normal.y<.5)return null;
    return point.y;
  }
  solid(x,y,z) {
    if(this.voxel&&this.voxel.isSolid(new this.pc.Vec3(x,y,z)))return true;
    for(const c of(this.scene.colliders||[])) {
      if(c.enabled===false||c.kind==='floor'||c.kind==='trigger'||!c.center||!c.size)continue;
      if(Math.abs(x-c.center[0])<=c.size[0]*.5&&Math.abs(y-c.center[1])<=c.size[1]*.5&&Math.abs(z-c.center[2])<=c.size[2]*.5)return true;
    }
    return false;
  }
  free(x,z,foot) {
    const bounds=this.voxel?.bounds;
    if(bounds) {
      const mn=bounds.getMin(),mx=bounds.getMax();
      if(x<mn.x+this.radius||x>mx.x-this.radius||z<mn.z+this.radius||z>mx.z-this.radius)return false;
    } else {
      const b=this.scene.movement?.bounds;
      if(b&&(x<b.min[0]+this.radius||x>b.max[0]-this.radius||z<b.min[2]+this.radius||z>b.max[2]-this.radius))return false;
    }
    const r=this.radius*0.84;
    for(const h of [.16,.5,1.0,1.48]) {
      for(const [ox,oz] of [[0,0],[r,0],[-r,0],[0,r],[0,-r],[r*.7,r*.7],[-r*.7,r*.7],[r*.7,-r*.7],[-r*.7,-r*.7]]) {
        if(this.solid(x+ox,foot+h,z+oz))return false;
      }
    }
    return true;
  }
  reset(camera,pos) {
    const eye=pos||camera.getPosition().clone();
    this.feetY=eye.y-this.eyeHeight;
    const floor=this.floorAt(eye.x,eye.z,this.feetY,1.0,5);
    if(floor!==null&&Number.isFinite(floor))this.feetY=floor+.035;
    this.velocity=[0,0];this.vy=0;this.travel=0;
    camera.setPosition(eye.x,this.feetY+this.eyeHeight,eye.z);
  }
  move(camera,dt,moveX,moveZ,yaw,enabled) {
    if(!enabled)return;
    const p=camera.getPosition().clone(),len=Math.hypot(moveX,moveZ),normalizer=Math.max(1,len);
    const a=yaw*Math.PI/180, mx=moveX/normalizer,mz=moveZ/normalizer;
    const speed=this.scene.movement?.speed??2.25;
    let dx=(mx*Math.cos(a)-mz*Math.sin(a))*speed;
    let dz=(-mx*Math.sin(a)-mz*Math.cos(a))*speed;
    const t=1-Math.exp(-dt*13);
    this.velocity[0]+=(dx-this.velocity[0])*t;this.velocity[1]+=(dz-this.velocity[1])*t;
    const travel=Math.hypot(this.velocity[0],this.velocity[1])*dt;
    const steps=Math.max(1,Math.ceil(travel/.09)), step=dt/steps;
    for(let i=0;i<steps;i++){
      const sx=this.velocity[0]*step,sz=this.velocity[1]*step;
      for(const [axis,d] of [['x',sx],['z',sz]]) {
        const tx=p.x+(axis==='x'?d:0),tz=p.z+(axis==='z'?d:0);
        const newFloor=this.floorAt(tx,tz,this.feetY,.32,1);
        const candidate=newFloor===null?this.feetY:Math.max(this.feetY-.28,newFloor+.035);
        if(candidate>this.feetY+.33||!this.free(tx,tz,candidate))continue;
        p.x=tx;p.z=tz;
        if(newFloor!==null)this.feetY=Math.max(this.feetY-.15,candidate);
      }
    }
    const ground=this.floorAt(p.x,p.z,this.feetY,.32,2.2);
    if(ground!==null) {
      const target=ground+.035;
      // Snap down modest stairs, soften uneven voxel floor.
      this.feetY+=(target-this.feetY)*clamp(dt*14,0,1);
      this.vy=0;
    } else {
      this.vy=Math.max(-14,this.vy-9.8*dt);
      this.feetY+=this.vy*dt;
    }
    if(!this.voxel) {
      // Do not silently imply voxel collision is active when a file is missing.
      const safe=Number(this.scene.movement?.fallbackFloorY ?? 0);
      this.feetY=Math.max(this.feetY,safe); this.vy=0;
    }
    this.travel+=travel;
    const bob=travel>.0005&&ground!==null?Math.sin(this.travel*8)*.009:0;
    camera.setPosition(p.x,this.feetY+this.eyeHeight+bob,p.z);
  }
}
class Ambience {
  constructor(){this.ctx=null;this.noise=null;this.next=0;this.enabled=true;this.master=null;}
  start() {
    if(!this.enabled)return;
    if(this.ctx){this.ctx.resume?.();return;}
    const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
    const ctx=this.ctx=new Audio(),master=this.master=ctx.createGain();master.gain.value=.23;master.connect(ctx.destination);
    const buffer=ctx.createBuffer(1,ctx.sampleRate*8,ctx.sampleRate),out=buffer.getChannelData(0);
    let last=0;for(let i=0;i<out.length;i++){last=.98*last+.02*(Math.random()*2-1);out[i]=last*.32;}
    const source=ctx.createBufferSource();source.buffer=buffer;source.loop=true;
    const filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=850;
    const gain=ctx.createGain();gain.gain.value=.045;
    source.connect(filter).connect(gain).connect(master);source.start();
    this.noise=source;this.next=ctx.currentTime+.9;
  }
  tick() {
    if(!this.ctx||!this.enabled||this.ctx.state!=='running')return;
    if(this.ctx.currentTime<this.next)return;
    // Quiet, synthetic two-note forest bird chirp; original procedural ambience.
    const c=this.ctx,t=c.currentTime;
    for(const [i,shift] of [[0,0],[1,.14]]) {
      const osc=c.createOscillator(),vol=c.createGain();
      osc.type='sine';osc.frequency.setValueAtTime(1270+i*150+shift*70,t+shift);
      osc.frequency.exponentialRampToValueAtTime(1800+i*100,t+shift+.1);
      osc.frequency.exponentialRampToValueAtTime(1350+i*100,t+shift+.24);
      vol.gain.setValueAtTime(.0001,t+shift);
      vol.gain.exponentialRampToValueAtTime(.009,t+shift+.035);
      vol.gain.exponentialRampToValueAtTime(.0001,t+shift+.28);
      osc.connect(vol).connect(this.master);osc.start(t+shift);osc.stop(t+shift+.31);
    }
    this.next=t+2.5+Math.random()*4.2;
  }
  setEnabled(v) {this.enabled=v;if(this.ctx){if(v)this.ctx.resume?.();else this.ctx.suspend?.();}else if(v)this.start();}
}
export class AdventureRuntime {
  constructor({pc,app,camera,scene,state,showNode,closeDialogue,nearestInteraction,interactWith,status,dialogueButtons}) {
    Object.assign(this,{pc,app,camera,scene,state,showNode,closeDialogue,nearestInteraction,interactWith,status,dialogueButtons});
    this.walker=null;this.ambience=new Ambience();this.gamepadAxes=[0,0];this.prevButtons=[];
    this.dialogueChoice=0;this.modalChoice=0;this.transition=null;this.savedPose=null;this.shotTime=0;this.currentShot=null;
    this.inventory=[];this.modal=null;this.backAction=null;this.pause=null;
    this.settings={};
    this.installUI();
  }
  installUI() {
    const top=document.querySelector('.top-actions');
    newButton(top,'Inventory (I)',()=>this.openInventory(),'quiet').id='inventory-button';
    this.audioBtn=newButton(top,'Ambience: On',()=>{this.ambience.setEnabled(!this.ambience.enabled);this.audioBtn.textContent='Ambience: '+(this.ambience.enabled?'On':'Off');},'quiet');
    const bottom=document.querySelector('.dialogue-footer');
    newButton(bottom,'Back (B/Esc)',()=>this.cancelDialogue(),'secondary').id='dialogue-back';
    const shade=this.pause=elem('section','shade adventure-modal',document.body);shade.hidden=true;
    const card=elem('div','welcome-card modal-card',shade);
    const eyebrow=elem('div','eyebrow',card,'PITHOUSE · EXPERIENCE');eyebrow.setAttribute('aria-hidden','true');
    this.modalTitle=elem('h2','modal-title',card);
    this.modalText=elem('p','modal-description',card);
    this.modalButtons=elem('div','modal-actions',card);
    this.modalDetails=elem('div','modal-details',card);
    shade.addEventListener('click',(ev)=>{if(ev.target===shade)this.back();});
  }
  async initialize() {
    try {
      const voxel=await WalkCollision.load(this.pc,this.scene);
      this.walker=new WalkCollision(this.pc,voxel,this.scene);
      this.status('Voxel collision loaded · ground walking enabled');
    } catch(err) {
      console.error('Voxel collision failed',err);
      this.walker=new WalkCollision(this.pc,null,this.scene);
      this.status('WARNING: voxel collision unavailable, using author colliders and floor');
    }
  }
  start() {
    this.ambience.start();
    this.pause.hidden=true;this.backAction=null;this.savedPose=null;this.transition=null;this.currentShot=null;
    this.state.talking=false;this.walker?.reset(this.camera,V(this.pc,this.scene.spawn.position));
    this.status('Walk to the Elder and press E or gamepad A · I inventory · Esc pause');
  }
  step(dt) {
    this.pollGamepad(dt);
    this.ambience.tick();
    this.animateCamera(dt);
    const help=byId('help'),active=this.state.started&&!this.state.talking&&this.pause.hidden&&help.hidden&&!this.transition;
    const k=this.state.keys;
    const x=(k.has('KeyD')||k.has('ArrowRight')?1:0)-(k.has('KeyA')||k.has('ArrowLeft')?1:0)+this.state.touchMove[0]+this.gamepadAxes[0];
    const z=(k.has('KeyW')||k.has('ArrowUp')?1:0)-(k.has('KeyS')||k.has('ArrowDown')?1:0)-this.state.touchMove[1]-this.gamepadAxes[1];
    this.walker?.move(this.camera,Math.min(dt,.05),x,z,this.state.yaw,active);
  }
  look(dx,dy) {
    if(!this.state.started||this.state.talking||!this.pause.hidden||this.transition||!byId('help').hidden)return;
    this.state.yaw-=dx*.17;this.state.pitch=clamp(this.state.pitch-dy*.16,-77,77);
    this.camera.setEulerAngles(this.state.pitch,this.state.yaw,0);
  }
  poseFromShot(node,id) {
    const source=node.camera||((id==='welcome'||id==='stoneDiscussion')?'elder':null);
    const shot=typeof source==='string'?this.scene.cameras?.[source]:source;
    if(shot&&Array.isArray(shot.position)&&Array.isArray(shot.target))return shot;
    if(node.focus)return {position:this.camera.getPosition().toArray(),target:node.focus,fov:70,duration:.55};
    return null;
  }
  moveTo(shot,restore=false) {
    if(!shot)return;
    const start=copyPose(this.camera);
    const pose=restore?shot:{
      position:V(this.pc,shot.position),target:V(this.pc,shot.target),
      fov:Number(shot.fov||75),keyframes:shot.keyframes||null
    };
    this.transition={start,pose,duration:Math.max(.1,Number(shot.duration)||.65),elapsed:0,restore};
  }
  enterDialogue(node,id) {
    if(!this.savedPose)this.savedPose=copyPose(this.camera);
    const shot=this.poseFromShot(node,id);
    this.currentShot=shot||null;this.shotTime=0;
    if(shot)this.moveTo(shot);
  }
  endDialogue() {
    this.currentShot=null;
    if(this.savedPose) {
      const pose=this.savedPose;this.savedPose=null;
      this.moveTo({duration:.65},true);
      this.transition.pose=pose;
    }
  }
  animateCamera(dt) {
    const t=this.transition;
    if(!t)return;
    t.elapsed+=dt;
    let alpha=clamp(t.elapsed/t.duration,0,1);alpha=alpha*alpha*(3-2*alpha);
    const start=t.start,end=t.pose;
    const p=new this.pc.Vec3().lerp(start.position,end.position,alpha);
    this.camera.setPosition(p);
    this.camera.camera.fov=start.fov+(end.fov-start.fov)*alpha;
    if(t.restore) {
      const e=new this.pc.Vec3().lerp(start.rotation,end.rotation,alpha);
      this.camera.setEulerAngles(e);
    } else {
      // Position and target keyframes are authored in Blender and exported in world coordinates.
      let target=end.target;
      const keys=end.keyframes;
      if(Array.isArray(keys)&&keys.length>=2) {
        const progress=t.elapsed/t.duration,sorted=[...keys].sort((a,b)=>a.t-b.t);
        let i=0;while(i<sorted.length-2&&sorted[i+1].t<progress)i++;
        const k0=sorted[i],k1=sorted[i+1],b=clamp((progress-k0.t)/Math.max(.0001,k1.t-k0.t),0,1);
        const position=new this.pc.Vec3().lerp(V(this.pc,k0.position),V(this.pc,k1.position),b);
        const tar=new this.pc.Vec3().lerp(V(this.pc,k0.target),V(this.pc,k1.target),b);
        this.camera.setPosition(position);target=tar;
        this.camera.camera.fov=(k0.fov??end.fov)*(1-b)+(k1.fov??end.fov)*b;
      }
      this.camera.lookAt(target);
    }
    if(t.elapsed>=t.duration) {
      this.transition=null;
      if(t.restore) {
        // Restore navigation pitch/yaw from the actual saved player rotation.
        const e=end.rotation;this.state.yaw=e.y;this.state.pitch=e.x;
        this.walker?.reset(this.camera,end.position);
      }
    }
  }
  decorateDialogue(id,node) {
    if(id!=='welcome'||!this.inventory.length)return node;
    const item=this.inventory[0];
    return {...node,choices:[...node.choices,
      {text:'I found a '+item.name+'. Can we discuss it?',next:'stoneDiscussion'}]};
  }
  inspect(item) {
    if(this.state.collected.has(item.id))return;
    this.openModal(item.name,item.note||'Examine this object.',[
      {label:'Take item',action:()=>this.take(item,false)},
      ...(item.consume?[{label:'Consume item',action:()=>this.take(item,true)}]:[]),
      {label:'Leave it',action:()=>this.back()}
    ],'Observe this object in the pithouse before collecting it.');
  }
  take(item,consumed=false) {
    this.state.collected.add(item.id);
    this.inventory.push({id:item.id,name:item.name,note:item.note||'',consumed});
    const world=this.state.nodes.get('item:'+item.id);
    if(world)world.enabled=false;
    const counter=byId('collection');
    counter.textContent='Inventory: '+this.inventory.length+' item'+(this.inventory.length===1?'':'s')+' · Press I';
    this.closeModal();this.status('Collected '+item.name+'. Press I to inspect; ask the Elder about it.');
  }
  openInventory() {
    if(!this.state.started)return;
    const buttons=this.inventory.length
      ?this.inventory.map(item=>({label:item.name+(item.consumed?' (used)':''),action:()=>this.openModal(item.name,item.note,[{label:'Back to inventory',action:()=>this.openInventory()}])}))
      :[{label:'No items yet',action:()=>{}}];
    buttons.push({label:'Close inventory',action:()=>this.closeModal()});
    this.openModal('Inventory',this.inventory.length?'Select an item to inspect. The Elder can discuss collected objects.':'Explore the pithouse to discover objects you can take.',buttons);
  }
  openPause() {
    if(!this.state.started)return;
    this.openModal('Paused','Return to exploring, inspect what you found, or restart the demonstration.',[
      {label:'Resume',action:()=>this.closeModal()},
      {label:'Inventory',action:()=>this.openInventory()},
      {label:'Reset experience',action:()=>this.openModal('Reset experience?','Return to the beginning and clear the inventory?',[
        {label:'Yes, reset',action:()=>this.reset()},{label:'Cancel',action:()=>this.openPause()}
      ])}
    ]);
  }
  openModal(title,description,choices,subtitle='') {
    if(document.pointerLockElement)document.exitPointerLock();
    this.pause.hidden=false;this.modalChoice=0;this.modalTitle.textContent=title;this.modalText.textContent=description||'';
    this.modalDetails.textContent=subtitle;this.modalButtons.replaceChildren();
    for(const item of choices)newButton(this.modalButtons,item.label,item.action,item.label.startsWith('Take')?'primary':'secondary');
    this.backAction=()=>this.closeModal();
    this.modalButtons.querySelector('button')?.focus();
  }
  closeModal(){this.pause.hidden=true;this.backAction=null;}
  back() {if(!this.pause.hidden){this.closeModal();return;}if(this.state.talking){this.cancelDialogue();return;}this.openPause();}
  cancelDialogue(){if(!this.state.talking)return;this.closeDialogue();this.status('Conversation closed · continue exploring');}
  reset(){
    this.closeModal();if('speechSynthesis'in window)speechSynthesis.cancel();
    if(this.state.talking)this.closeDialogue();
    this.state.collected.clear();this.inventory=[];
    for(const [key,ent] of this.state.nodes){if(key.startsWith('item:'))ent.enabled=true;}
    this.currentShot=null;this.savedPose=null;this.transition=null;
    this.state.keys.clear();this.state.touchMove=[0,0];this.gamepadAxes=[0,0];
    byId('collection').textContent='';
    this.camera.setPosition(...this.scene.spawn.position);
    this.walker?.reset(this.camera,V(this.pc,this.scene.spawn.position));
    this.camera.lookAt(V(this.pc,this.scene.spawn.lookAt));
    const e=this.camera.getEulerAngles();this.state.yaw=e.y;this.state.pitch=e.x;
    this.state.started=false;document.body.classList.remove('started');
    byId('welcome').hidden=false;byId('touch').hidden=true;
    this.status('Experience reset · begin the journey');
  }
  handleKey(ev) {
    if(ev.code==='Escape') {
      if(!byId('help').hidden){byId('help').hidden=true;return true;}
      this.back();return true;
    }
    if(ev.code==='KeyI'&&!ev.repeat){if(this.pause.hidden)this.openInventory();else this.closeModal();return true;}
    if(ev.code==='KeyP'&&!ev.repeat){this.openPause();return true;}
    if(!this.pause.hidden){
      const list=[...this.modalButtons.querySelectorAll('button')];
      if(ev.code==='ArrowDown'||ev.code==='ArrowUp'){
        this.modalChoice=clamp(this.modalChoice+(ev.code==='ArrowDown'?1:-1),0,Math.max(0,list.length-1));
        list[this.modalChoice]?.focus();return true;
      }
      if(ev.code==='Enter'||ev.code==='Space'){list[this.modalChoice]?.click();return true;}
      return true;
    }
    if(this.state.talking) {
      if(['ArrowUp','ArrowDown'].includes(ev.code)) {
        const btn=[...this.dialogueButtons().querySelectorAll('button')];
        this.dialogueChoice=clamp(this.dialogueChoice+(ev.code==='ArrowDown'?1:-1),0,Math.max(0,btn.length-1));
        btn[this.dialogueChoice]?.focus();return true;
      }
      if(ev.code==='Enter'||ev.code==='Space') {
        const btn=[...this.dialogueButtons().querySelectorAll('button')];
        btn[this.dialogueChoice]?.click();return true;
      }
    }
    return false;
  }
  pollGamepad(dt) {
    const pads=navigator.getGamepads?.()||[];const pad=[...pads].find(p=>p&&p.connected);
    if(!pad){this.gamepadAxes=[0,0];this.prevButtons=[];return;}
    const dead=(x)=>near(x);
    this.gamepadAxes=[dead(pad.axes[0]||0),dead(pad.axes[1]||0)];
    if(this.state.started&&!this.state.talking&&this.pause.hidden) {
      this.look(dead(pad.axes[2]||0)*dt*230,dead(pad.axes[3]||0)*dt*230);
    }
    const active=(i)=>Boolean(pad.buttons[i]?.pressed);
    const edge=(i)=>active(i)&&!this.prevButtons[i];
    if(!this.state.started&&edge(0))byId('start-button')?.click();
    if(edge(9)){if(this.pause.hidden)this.openPause();else this.closeModal();}
    if(edge(1)){this.back();}
    if(edge(3)){this.openInventory();}
    if(!this.pause.hidden){
      const list=[...this.modalButtons.querySelectorAll('button')];
      if(edge(13))this.modalChoice=Math.min(list.length-1,this.modalChoice+1);
      if(edge(12))this.modalChoice=Math.max(0,this.modalChoice-1);
      list[this.modalChoice]?.focus();
      if(edge(0))list[this.modalChoice]?.click();
    }else if(this.state.talking&&this.pause.hidden){
      const btn=[...this.dialogueButtons().querySelectorAll('button')];
      if(edge(13))this.dialogueChoice=Math.min(btn.length-1,this.dialogueChoice+1);
      if(edge(12))this.dialogueChoice=Math.max(0,this.dialogueChoice-1);
      btn[this.dialogueChoice]?.focus();
      if(edge(0))btn[this.dialogueChoice]?.click();
    }else if(this.state.started&&edge(0))this.interactWith(this.nearestInteraction());
    this.prevButtons=pad.buttons.map(b=>Boolean(b?.pressed));
  }
}