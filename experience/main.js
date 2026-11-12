import * as pc from 'playcanvas';
import { AdventureRuntime } from './adventure-runtime.js';

// Independent PlayCanvas runtime. Original SuperSplat viewer remains untouched.
const $ = (id) => document.getElementById(id);
const ui = Object.fromEntries(['application','welcome','start-button','dialogue','speaker','dialogue-text','dialogue-options','dialogue-next','dialogue-hint','status','prompt','collection','markers','help','fatal','debug','voice-button','touch'].map(id => [id, $(id)]));
const MOBILE = matchMedia('(pointer: coarse)').matches;
const clamp = (n,lo,hi) => Math.max(lo,Math.min(hi,n));
const v3 = (p) => new pc.Vec3(...p);
const safeText = (el, value) => { el.textContent = String(value ?? ''); };
const sceneURL = './data/pithouse-scene.json';
const state = { ready:false, started:false, talking:false, typing:false, selected:null, since:0, timer:0, typeElapsed:0,
  typeText:'', shown:0, minSeconds:0, choicePending:null, voice:false, yaw:0, pitch:0, keys:new Set(),
  touchMove:[0,0], touchLook:[0,0], collected:new Set(), scene:null, annotations:[], positions:[], nodes:new Map(),
  status:'Loading', debug:false };
let app, camera, player, npcAnim, adventure;
let clock = 0, lastLook = null;
let markerButtons = [];
const resetButton = ui['start-button'];

function status(s) { state.status=s; safeText(ui.status,s); }
function fail(e) {
  console.error('Pithouse initialization failed:',e);
  safeText(ui.fatal,'Unable to load the interactive experience: '+(e?.message||e)+'. Check the console and serve from localhost or HTTPS.');
  ui.fatal.hidden=false; status('Loading error');
}
async function json(url) { const res=await fetch(url,{cache:'no-cache'});if(!res.ok) throw new Error(url+' returned HTTP '+res.status);return res.json(); }
function loadAsset(url,type,name='asset') {
  return new Promise((resolve,reject)=>{
    const a = new pc.Asset(name,type,{url});
    a.once('load',()=>resolve(a)); a.once('error',err=>reject(err instanceof Error?err:new Error(String(err))));
    app.assets.add(a);app.assets.load(a);
  });
}
function primitive(type,name,pos,scale,color,opacity=1) {
  const e=new pc.Entity(name);
  const mat=new pc.StandardMaterial();mat.diffuse=color;mat.useMetalness=false;
  if(opacity<1){mat.opacity=opacity;mat.blendType=pc.BLEND_NORMAL;mat.depthWrite=false;}
  mat.update();
  e.addComponent('render',{type,material:mat});
  e.setPosition(...pos);e.setLocalScale(...scale);app.root.addChild(e);
  return e;
}
function putCamera() {
  const spawn=state.scene.spawn;
  // These coordinates are the original SuperSplat viewer's world-space camera.
  // Rotate the SOG separately, not the camera or the annotations.
  camera.setPosition(...spawn.position);
  if(Number.isFinite(spawn.fov)) camera.camera.fov=spawn.fov;
  const from=v3(spawn.position), to=v3(spawn.lookAt || [0,1,0]);
  aimAt(to,from);
}
function aimAt(target, source) {
  const dir=target.clone().sub(source);const horizontal=Math.hypot(dir.x,dir.z);
  state.yaw=Math.atan2(-dir.x,-dir.z)*180/Math.PI;
  state.pitch=clamp(Math.atan2(dir.y,Math.max(.001,horizontal))*180/Math.PI,-76,76);
  camera.setEulerAngles(state.pitch,state.yaw,0);
}
function createPlayer() {
  player=new pc.Entity('Viewer Position');
  app.root.addChild(player);
  camera=new pc.Entity('First person camera');
  camera.addComponent('camera',{fov:75,nearClip:0.08,farClip:1200,clearColor:new pc.Color(.08,.06,.045),priority:0});
  app.root.addChild(camera);
  putCamera();
  const light=new pc.Entity('Ambient key');
  light.addComponent('light',{type:'directional',color:pc.Color.WHITE,intensity:1,castShadows:false});
  light.setEulerAngles(60,25,10);app.root.addChild(light);
  app.scene.ambientLight=new pc.Color(.46,.43,.39);
}
async function createSplat() {
  const url=state.scene.environment?.splat;
  if(!url)return;
  status('Loading the pithouse splat…');
  const asset=await loadAsset(url,'gsplat','Pithouse SOG');
  const splat=new pc.Entity('Pithouse SOG');
  splat.addComponent('gsplat',{asset});
  if(state.scene.environment.splatPosition) splat.setPosition(...state.scene.environment.splatPosition);
  // Apply SuperSplat's Z-axis correction. Do not rotate NPCs or annotation coordinates.
  splat.setEulerAngles(...(state.scene.environment.splatRotation || [0,0,180]));
  if(state.scene.environment.splatScale) splat.setLocalScale(...state.scene.environment.splatScale);
  app.root.addChild(splat);
}
async function createProps() {
  const src=state.scene.environment?.propsGlb;
  if(!src)return;
  try {
    const asset=await loadAsset(src,'container','Scene Props');
    app.root.addChild(asset.resource.instantiateRenderEntity());
  }catch(e){console.warn('Optional scene GLB failed to load',e);}
}
function makeNPCFallback(npc) {
  const [x,y,z]=npc.position;
  const body=primitive('cylinder','Elder placeholder torso',[x,y+.78,z],[.65,1.15,.47],new pc.Color(.41,.29,.17));
  const head=primitive('sphere','Elder placeholder head',[x,y+1.58,z],[.39,.39,.39],new pc.Color(.78,.56,.36));
  const badge=primitive('cylinder','Elder placeholder base',[x,y+.05,z],[.7,.08,.7],new pc.Color(.85,.59,.23),.75);
  body.setEulerAngles(0,npc.yaw||0,0);head.setEulerAngles(0,npc.yaw||0,0);
  return {body,head,badge};
}
function makeAnimationGraph(entity,asset,npc) {
  const tracks=Object.fromEntries(asset.resource.animations.map(a=>[a.resource.name,a.resource]));
  const clipNames=npc.animationClips||{Idle:'Idle',Talk:'Talk',Gesture:'Gesture'};
  if(!['Idle','Talk','Gesture'].every(s=>tracks[clipNames[s]])){
    console.warn('Animation graph not activated: expected clip names missing',clipNames,Object.keys(tracks));return;
  }
  const graph={
    layers:[{name:'Base',states:[{name:'START'},{name:'Idle',loop:true},{name:'Talk',loop:true},{name:'Gesture',loop:true}],
      transitions:[{from:'START',to:'Idle'},
        ...['Idle','Talk','Gesture'].flatMap(from=>['Idle','Talk','Gesture'].filter(to=>to!==from).map(to=>({
          from,to,time:.2,conditions:[{parameterName:'mode',predicate:pc.ANIM_EQUAL_TO,value:{Idle:0,Talk:1,Gesture:2}[to]}]
        })))]}],
    parameters:{mode:{name:'mode',type:pc.ANIM_PARAMETER_INTEGER,value:0}}
  };
  entity.addComponent('anim',{activate:true});
  entity.anim.loadStateGraph(graph);
  const layer=entity.anim.baseLayer;
  for(const s of ['Idle','Talk','Gesture']) layer.assignAnimation(s,tracks[clipNames[s]]);
  npcAnim=entity.anim;
  setAnimMode(0);
}
function setAnimMode(n) { if(npcAnim){try{npcAnim.setInteger('mode',n);}catch(e){console.warn('Anim parameter mismatch',e);}} }
async function createCharacters() {
  for(const npc of (state.scene.characters||[])) {
    const position=v3(npc.position);
    // Target the Elder's torso instead of their feet (eye-level camera).
    const talkPoint=position.clone().add(new pc.Vec3(0,1.2,0));
    state.positions.push({type:'npc',name:npc.name||'Guide',position:talkPoint,id:npc.id||'npc',radius:npc.interactRadius||2.35,dialogue:npc.dialogue||'welcome'});
    if(!npc.model){makeNPCFallback(npc);continue;}
    try {
      const a=await loadAsset(npc.model,'container',npc.name||'NPC');
      const entity=a.resource.instantiateRenderEntity();
      entity.name=npc.name||'NPC';
      entity.setPosition(position);entity.setEulerAngles(0,npc.yaw||0,0);entity.setLocalScale(npc.scale||1,npc.scale||1,npc.scale||1);
      app.root.addChild(entity);
      makeAnimationGraph(entity,a,npc);
    }catch(err){ console.warn('NPC model not available; placeholder displayed',err);makeNPCFallback(npc); }
  }
}
function importAnnotations() {
  state.annotations.forEach((a,i)=>{
    state.positions.push({type:'annotation',id:'annotation-'+i,name:a.title||('Annotation '+(i+1)),position:v3(a.position),radius:3,index:i});
  });
  for(const h of(state.scene.hotspots||[])){
    state.positions.push({type:'hotspot',id:h.id,name:h.name||h.id,position:v3(h.position),radius:h.radius||2.5,dialogue:h.dialogue});
  }
  for(const c of(state.scene.collectibles||[])){
    state.positions.push({type:'collectible',id:c.id,name:c.name||'Collectible',position:v3(c.position),radius:c.radius||1.6,note:c.note,consume:c.consume||false});
    const entity=primitive('sphere','Collectible · '+c.id,c.position,[.18,.18,.18],new pc.Color(.97,.69,.2));
    state.nodes.set('item:'+c.id,entity);
  }
  markerButtons=state.positions.map(item=>{
    const button=document.createElement('button');
    button.type='button';button.className='marker';button.textContent=item.type==='npc'?'✦ '+item.name:item.type==='collectible'?'✧ '+item.name:'◈ '+item.name;
    // A projected marker must not allow dialogue from across the room.
    button.addEventListener('click',()=>{if(canInteract(item))interactWith(item);});
    ui.markers.appendChild(button);return {item,button};
  });
}
function collisionHit(p,r) {
  const bounds=state.scene.movement?.bounds;
  if(bounds&&(p.x<bounds.min[0]+r||p.x>bounds.max[0]-r||p.z<bounds.min[2]+r||p.z>bounds.max[2]-r))return true;
  for(const c of(state.scene.colliders||[])) {
    if(c.enabled===false||c.kind==='floor'||c.kind==='trigger')continue;
    if(!c.center||!c.size)continue;
    const cx=c.center[0],cy=c.center[1],cz=c.center[2],sx=c.size[0]/2,sy=c.size[1]/2,sz=c.size[2]/2;
    if(p.y<cy-sy-.3||p.y>cy+sy+2.1)continue;
    const nx=clamp(p.x,cx-sx,cx+sx),nz=clamp(p.z,cz-sz,cz+sz);
    if((p.x-nx)**2+(p.z-nz)**2<r*r)return true;
  }
  return false;
}
function updateMovement(dt) {
  if(!state.started||state.talking||!ui.help.hidden)return;
  const k=state.keys;
  let x=(k.has('KeyD')||k.has('ArrowRight')?1:0)-(k.has('KeyA')||k.has('ArrowLeft')?1:0)+state.touchMove[0];
  let z=(k.has('KeyW')||k.has('ArrowUp')?1:0)-(k.has('KeyS')||k.has('ArrowDown')?1:0)-state.touchMove[1];
  const len=Math.hypot(x,z);if(len>.01){x/=Math.max(len,1);z/=Math.max(len,1);}
  if(!len)return;
  const speed=state.scene.movement?.speed||2.5,r=state.scene.movement?.radius||.25,angle=state.yaw*Math.PI/180;
  const dx=(x*Math.cos(angle)-z*Math.sin(angle))*speed*Math.min(dt,.04);
  const dz=(-x*Math.sin(angle)-z*Math.cos(angle))*speed*Math.min(dt,.04);
  const pos=camera.getPosition().clone();
  const nextX=pos.clone();nextX.x+=dx;if(!collisionHit(nextX,r))pos.x=nextX.x;
  const nextZ=pos.clone();nextZ.z+=dz;if(!collisionHit(nextZ,r))pos.z=nextZ.z;
  camera.setPosition(pos);
}
function canInteract(item) {
  if(!state.started || state.talking || !item) return false;
  if(item.type==='collectible'&&state.collected.has(item.id))return false;
  // The interaction anchor can be at eye/torso or ground height. Use a horizontal
  // reach check with a vertical limit so ground collectibles are actually reachable.
  const eye=camera.getPosition(),point=item.position;
  const horizontal=Math.hypot(eye.x-point.x,eye.z-point.z);
  const height=Math.abs(eye.y-point.y);
  return horizontal<=item.radius && height<=(item.type==='collectible'?2.4:2.1);
}
function nearestInteraction() {
  const pos=camera.getPosition(),dir=camera.forward;
  const candidates=state.positions.filter(canInteract).map(i=>{
    const delta=i.position.clone().sub(pos),distance=delta.length();
    const facing=delta.normalize().dot(dir);
    return {item:i,distance,facing};
  }).filter(i=>i.facing>.08).sort((a,b)=>b.facing-a.facing||a.distance-b.distance);
  return candidates[0]?.item||null;
}
function interactWith(item) {
  if(!canInteract(item))return;
  switch(item.type) {
    case 'npc': showNode(item.dialogue);break;
    case 'annotation':showAnnotation(item.index);break;
    case 'hotspot':item.dialogue?showNode(item.dialogue):showMessage(item.name,'This object is ready for an authored interaction.');break;
    case 'collectible':
      adventure?.inspect(item);break;
  }
}
function closeDialogue() {
  const wasTalking=state.talking;
  if(wasTalking)adventure?.endDialogue();
  state.talking=false;state.typing=false;ui.dialogue.hidden=true;ui['dialogue-options'].replaceChildren();
  document.body.classList.remove('dialogue-open');setAnimMode(0);
  status('Explore · E to interact · mouse to look');
}
function sayOutLoud(t) {
  if(!state.voice||!('speechSynthesis' in window))return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(t);u.lang='en-CA';u.rate=.89;u.pitch=.94;
  speechSynthesis.speak(u);
}
function typeDialogue(dt) {
  if(!state.talking)return;
  state.timer+=dt;
  if(state.typing) {
    state.typeElapsed+=dt;
    const target=Math.min(state.typeText.length,Math.floor(state.typeElapsed*33));
    if(target!==state.shown){state.shown=target;safeText(ui['dialogue-text'],state.typeText.slice(0,target));}
    if(state.shown>=state.typeText.length)state.typing=false;
  }
  const available=!state.typing&&state.timer>=state.minSeconds;
  if(available&&state.choicePending){
    const choices=state.choicePending;state.choicePending=null;
    choices.forEach((c,i)=>{
      const b=document.createElement('button');b.type='button';b.className='choice';
      const n=document.createElement('span');n.className='num';n.textContent=String(i+1)+'.';b.appendChild(n);
      b.appendChild(document.createTextNode(c.text));
      b.addEventListener('click',()=>choose(c));ui['dialogue-options'].appendChild(b);
    });
    if(!choices.length)ui['dialogue-next'].hidden=false;
  }
  safeText(ui['dialogue-hint'],available?'Choose your next step':state.typing?'The Elder is speaking…':'A moment to reflect…');
}
function openDialogue({speaker,text,choices=[],minDecisionSeconds=0,focus=null}) {
  if(!text)return;
  if(document.pointerLockElement)document.exitPointerLock();
  if(focus)aimAt(v3(focus),camera.getPosition());
  state.talking=true;state.timer=0;state.typeElapsed=0;state.shown=0;state.typing=true;state.typeText=text;
  state.minSeconds=clamp(minDecisionSeconds,0,15);
  state.choicePending=choices;
  safeText(ui.speaker,speaker||'Guide');safeText(ui['dialogue-text'],'');
  ui['dialogue-options'].replaceChildren();ui['dialogue-next'].hidden=true;
  ui.dialogue.hidden=false;document.body.classList.add('dialogue-open');
  setAnimMode(1);sayOutLoud(text);
}
function showNode(name) {
  let node=state.scene.dialogue?.[name];
  if(!node){console.warn('Missing dialogue',name);return;}
  node=adventure?.decorateDialogue(name,node)||node;
  adventure?.enterDialogue(node,name);
  state.selected=name;openDialogue(node);
  if(adventure)adventure.dialogueChoice=0;
}
function showMessage(speaker,text) { if(adventure)adventure.enterDialogue({},null);openDialogue({speaker,text,choices:[{text:'Continue exploring',mode:'explore'}]}); }
function showAnnotation(index) {
  const a=state.annotations[index];if(!a)return;
  adventure?.enterDialogue({},null);
  openDialogue({speaker:a.title||'Point of Interest',text:a.text||'A point of interest.',
    choices:[{text:'Continue exploring',mode:'explore'},{text:'Speak to the Elder',next:'welcome'}]});
}
function closeDialogueForChoice() {
  state.talking=false;state.typing=false;ui.dialogue.hidden=true;ui['dialogue-options'].replaceChildren();
  document.body.classList.remove('dialogue-open');setAnimMode(0);
}
function choose(choice) {
  if(state.typing||state.timer<state.minSeconds)return;
  if('speechSynthesis'in window)speechSynthesis.cancel();
  setAnimMode(2);
  // Reusing the dialogue camera across linked nodes prevents unintended snaps.
  closeDialogueForChoice();
  if(choice.action==='annotation'&&typeof choice.annotationIndex==='number') {showAnnotation(choice.annotationIndex);return;}
  if(choice.next){showNode(choice.next);return;}
  adventure?.endDialogue();
  status('Free exploration · find places, collect objects, or speak to the Elder');
}
ui['dialogue-next'].addEventListener('click',closeDialogue);
function updateMarkers() {
  if(!state.started||state.talking){for(const b of markerButtons)b.button.hidden=true;return;}
  const eye=camera.getPosition(),forward=camera.forward;
  for(const {item,button} of markerButtons){
    const p=item.position;
    if(item.type==='collectible'&&state.collected.has(item.id)){button.hidden=true;continue;}
    const d=p.clone().sub(eye),length=d.length();
    if(d.dot(forward)<=0||length>Math.max(6,item.radius*2.2)){button.hidden=true;continue;}
    const screen=camera.camera.worldToScreen(p);
    const inside=screen.x>40&&screen.x<innerWidth-40&&screen.y>80&&screen.y<innerHeight-50;
    button.hidden=!inside;
    button.disabled=!canInteract(item);
    if(inside){button.style.left=screen.x+'px';button.style.top=screen.y+'px';}
  }
  const near=nearestInteraction();
  safeText(ui.prompt,near?'Press E / tap Interact · '+near.name:'');
}
function onLook(dx,dy) {
  if(adventure){adventure.look(dx,dy);return;}
  if(!state.started||state.talking||!ui.help.hidden)return;
  state.yaw-=dx*.17;state.pitch=clamp(state.pitch-dy*.16,-77,77);
  camera.setEulerAngles(state.pitch,state.yaw,0);
}
function handleInputs() {
  document.addEventListener('keydown',ev=>{
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(ev.code))ev.preventDefault();
    if(adventure?.handleKey(ev))return;
    state.keys.add(ev.code);
    if(ev.code==='Backquote'){state.debug=!state.debug;ui.debug.hidden=!state.debug;}
    if(state.talking&&['Digit1','Digit2','Digit3'].includes(ev.code)){
      const choices=[...ui['dialogue-options'].querySelectorAll('button')];
      choices[Number(ev.code.slice(-1))-1]?.click();return;
    }
    if(ev.code==='KeyE'&&!ev.repeat&&!state.talking)interactWith(nearestInteraction());
    if(ev.code==='Escape'&&!ui.help.hidden)ui.help.hidden=true;
  });
  document.addEventListener('keyup',ev=>state.keys.delete(ev.code));
  window.addEventListener('blur',()=>state.keys.clear());
  document.addEventListener('mousemove',ev=>{if(document.pointerLockElement===ui.application)onLook(ev.movementX,ev.movementY);});
  ui.application.addEventListener('click',()=>{if(!MOBILE&&state.started&&!state.talking&&!document.pointerLockElement)ui.application.requestPointerLock?.();});
  ui.application.addEventListener('pointerdown',ev=>{lastLook={x:ev.clientX,y:ev.clientY};});
  ui.application.addEventListener('pointermove',ev=>{
    if(document.pointerLockElement||!lastLook||ev.buttons===0)return;
    onLook(ev.clientX-lastLook.x,ev.clientY-lastLook.y);lastLook={x:ev.clientX,y:ev.clientY};
  });
  ui.application.addEventListener('pointerup',()=>lastLook=null);
  window.addEventListener('resize',()=>app?.resizeCanvas());
  $('mobile-interact').addEventListener('click',()=>interactWith(nearestInteraction()));
  for(const [padId,key,thumbId] of [['move-pad','touchMove','move-thumb'],['look-pad','touchLook','look-thumb']]){
    const pad=$(padId),thumb=$(thumbId);let last={x:0,y:0};
    pad.addEventListener('pointerdown',ev=>{pad.setPointerCapture(ev.pointerId);last={x:ev.clientX,y:ev.clientY};});
    pad.addEventListener('pointermove',ev=>{
      if(!pad.hasPointerCapture(ev.pointerId))return;
      const rect=pad.getBoundingClientRect();
      const x=clamp((ev.clientX-(rect.left+rect.width/2))/(rect.width*.38),-1,1);
      const y=clamp((ev.clientY-(rect.top+rect.height/2))/(rect.height*.38),-1,1);
      thumb.style.transform='translate('+(x*rect.width*.24)+'px,'+(y*rect.height*.24)+'px)';
      if(key==='touchMove')state.touchMove=[x,y];
      else {onLook((ev.clientX-last.x)*1.25,(ev.clientY-last.y)*1.25);last={x:ev.clientX,y:ev.clientY};}
    });
    const end=()=>{if(key==='touchMove')state.touchMove=[0,0];else state.touchLook=[0,0];thumb.style.transform='';};
    pad.addEventListener('pointerup',end);pad.addEventListener('pointercancel',end);
  }
  $('help-button').addEventListener('click',()=>ui.help.hidden=!ui.help.hidden);
  $('close-help').addEventListener('click',()=>ui.help.hidden=true);
  ui['voice-button'].addEventListener('click',()=>{
    state.voice=!state.voice;safeText(ui['voice-button'],'Voice: '+(state.voice?'On':'Off'));
    ui['voice-button'].setAttribute('aria-pressed',String(state.voice));
    if(!state.voice&&'speechSynthesis'in window)speechSynthesis.cancel();
  });
  resetButton.addEventListener('click',()=>{
    if(!state.ready)return;
    state.started=true;document.body.classList.add('started');ui.welcome.hidden=true;
    if(MOBILE)ui.touch.hidden=false;
    adventure?.start();
    // Do not open Elder dialogue until player approaches and explicitly interacts.
    state.since=clock;
  });
}
async function main() {
  state.scene=await json(sceneURL);
  const settings=await json(state.scene.environment?.legacyAnnotations||'../settings.json').catch(e=>{console.warn('Legacy annotations unavailable',e);return null;});
  state.annotations=settings?.annotations||[];
  app=new pc.Application(ui.application,{graphicsDeviceOptions:{antialias:false,alpha:false}});
  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);app.setCanvasResolution(pc.RESOLUTION_AUTO);
  app.graphicsDevice.maxPixelRatio=Math.min(devicePixelRatio||1,MOBILE?1.5:2);
  app.start();
  createPlayer();
  handleInputs();
  await createSplat();
  await createProps();
  await createCharacters();
  importAnnotations();
  adventure=new AdventureRuntime({
    pc,app,camera,scene:state.scene,state,showNode,closeDialogue,nearestInteraction,interactWith,status,
    dialogueButtons:()=>ui['dialogue-options']
  });
  status('Initializing voxel collision…');
  await adventure.initialize();
  app.on('update',dt=>{
    clock+=dt;
    adventure?.step(dt);
    typeDialogue(dt);
    updateMarkers();
    if(state.debug) {
      const p=camera.getPosition();
      safeText(ui.debug,'camera: '+[p.x,p.y,p.z].map(x=>x.toFixed(2)).join(', ')+'\nyaw: '+state.yaw.toFixed(0)+' · pitch: '+state.pitch.toFixed(0)+'\nmode: '+(state.talking?'dialogue':'explore'));
    }
  });
  state.ready=true;status(adventure.walker?.voxel?'Ready · SOG + voxel walk collision':'Ready · SOG loaded, voxel collision unavailable');
  resetButton.disabled=false;safeText(resetButton,'Begin the journey');
}
main().catch(fail);
