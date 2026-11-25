const preferenceKey = 'pithouse-experience-preferences';
function preferences() {
  try { return JSON.parse(globalThis.sessionStorage?.getItem(preferenceKey) || '{}') || {}; } catch { return {}; }
}
export class Narration {
  constructor(engine = globalThis.speechSynthesis, Utterance = globalThis.SpeechSynthesisUtterance) {
    this.engine = engine; this.Utterance = Utterance; this.enabled = Boolean(preferences().voice);
    this.lastText = ''; this.utterance = null;
  }
  setEnabled(enabled) {
    this.enabled = Boolean(enabled); this.stop();
    try { sessionStorage.setItem(preferenceKey, JSON.stringify({...preferences(), voice:this.enabled})); } catch {}
    if (this.enabled && this.lastText) this.speak(this.lastText);
    return this.enabled;
  }
  speak(text) {
    this.lastText = String(text || '').trim();
    this.stop();
    if (!this.enabled || !this.lastText || !this.engine || !this.Utterance) return;
    const utterance = this.utterance = new this.Utterance(this.lastText);
    utterance.lang = 'en-CA'; utterance.rate = .89; utterance.pitch = .94;
    const voices = this.engine.getVoices?.() || [];
    utterance.voice = voices.find(v=>v.lang==='en-CA') || voices.find(v=>v.lang?.startsWith('en')) || null;
    this.engine.speak(utterance);
  }
  stop() { this.engine?.cancel(); this.utterance = null; }
}
export const narration = new Narration();

export function landscapeDialogueShot(shot) {
  if(!shot?.position||!shot?.target||typeof innerWidth==='undefined'||innerWidth<=innerHeight||!globalThis.matchMedia?.('(pointer: coarse)').matches)return shot;
  const dx=shot.target[0]-shot.position[0],dz=shot.target[2]-shot.position[2],distance=Math.hypot(dx,dz)||1;
  // Look slightly to the left of the speaker, leaving their face beside the card.
  const offset=distance*.5;
  return {...shot,target:[shot.target[0]+dz/distance*offset,shot.target[1],shot.target[2]-dx/distance*offset],keyframes:shot.keyframes?.map(landscapeDialogueShot)};
}

export function journeyStartURL(currentURL) {
  const current = new URL(currentURL);
  const target = new URL(current.pathname.includes('/fishing/') ? '../mobile-playtest/experience/' : './', current);
  if (current.searchParams.has('localEngine')) target.searchParams.set('localEngine','');
  return target;
}
export function resetJourney() {
  narration.stop();
  try {
    sessionStorage.removeItem('pithouse-ladder-trip');
    sessionStorage.removeItem('pithouse-fishing-trip');
    localStorage.removeItem('fraser-last-harvest');
  } catch {}
  location.assign(journeyStartURL(location.href));
}

// Identical core settings and keyboard behavior in every part of the journey.
export class ExperienceMenu {
  constructor({onOpen=()=>{}, onClose=()=>{}, onVoice=()=>{}, onRestart, onReturn}={}) {
    Object.assign(this,{onOpen,onClose,onVoice}); this.opened=false;
    this.button=document.createElement('button'); this.button.id='settings-button';
    this.button.className='journey-menu-button'; this.button.textContent='Menu';
    this.button.setAttribute('aria-controls','journey-settings');this.button.setAttribute('aria-expanded','false');
    this.root=document.createElement('section');this.root.id='journey-settings';this.root.hidden=true;
    this.root.className='journey-settings';this.root.setAttribute('role','dialog');this.root.setAttribute('aria-modal','true');this.root.setAttribute('aria-labelledby','settings-title');
    this.root.innerHTML='<div class="journey-card"><div class="eyebrow">PITHOUSE · FRASER RIVER</div><h2 id="settings-title">Settings</h2><div class="journey-menu-actions"></div><p id="settings-controls" hidden>Move with WASD or the left touchpad. Look with the mouse or right touchpad. Use Space or Jump to jump. Use E or Interact to speak. In fishing, hold to dip and release to lift. Carry your catch to the basket and interact to tip it in.</p></div>';
    const actions=this.root.querySelector('.journey-menu-actions');
    const add=(id,label,fn)=>{const b=document.createElement('button');b.id=id;b.textContent=label;b.className='secondary';b.onclick=fn;actions.append(b);return b;};
    add('settings-resume','Resume',()=>this.close());
    this.voice=add('settings-voice','',()=>{narration.setEnabled(!narration.enabled);this.updateVoice();this.onVoice(narration.enabled);});
    add('settings-help','Controls',()=>{const p=this.root.querySelector('#settings-controls');p.hidden=!p.hidden;if(!p.hidden)narration.speak(p.textContent);});
    add('settings-reset','Reset experience',resetJourney);
    if(onRestart)add('settings-restart-fishing','Reset fishing game',()=>{this.close();onRestart();});
    if(onReturn)add('settings-return','Return to the pithouse',onReturn);
    this.button.onclick=()=>this.opened?this.close():this.open();
    this.root.addEventListener('click',event=>{if(event.target===this.root)this.close();});
    this.handleKey=event=>{
      if(!this.opened)return;
      event.stopImmediatePropagation();
      if(event.code==='Escape'){event.preventDefault();this.close();return;}
      if(event.key==='Tab'){
        const buttons=[...this.root.querySelectorAll('button')],first=buttons[0],last=buttons.at(-1);
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    };
    window.addEventListener('keydown',this.handleKey,true);
    document.body.append(this.button,this.root);this.updateVoice();
  }
  updateVoice(){this.voice.textContent='Voice: '+(narration.enabled?'On':'Off');this.voice.setAttribute('aria-pressed',String(narration.enabled));}
  open(){if(this.opened)return;this.previousFocus=document.activeElement;this.opened=true;this.onOpen();narration.stop();document.exitPointerLock?.();this.root.hidden=false;this.button.setAttribute('aria-expanded','true');this.updateVoice();this.root.querySelector('button').focus();}
  close(){if(!this.opened)return;this.opened=false;this.root.hidden=true;this.button.setAttribute('aria-expanded','false');this.onClose();this.previousFocus?.focus?.();}
  destroy(){window.removeEventListener('keydown',this.handleKey,true);this.root.remove();this.button.remove();}
}
