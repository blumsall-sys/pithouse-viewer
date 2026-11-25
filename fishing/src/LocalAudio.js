import {narration} from '../../shared/experience.js';
import {localAssetUrl} from './utils/LocalAssets.js';
export class LocalAudio {
 constructor(){this.enabled=true;this.last={};this.voice=null;document.addEventListener('pointerdown',()=>this.unlock(),{once:true});document.addEventListener('keydown',()=>this.unlock(),{once:true});}
 unlock(){try{this.context??=new (window.AudioContext||window.webkitAudioContext)();this.context.resume().catch(()=>{});}catch{}}
 tone(success=true){if(!this.enabled)return;this.unlock();const c=this.context;if(!c)return;const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(success?520:190,c.currentTime);o.frequency.exponentialRampToValueAtTime(success?850:110,c.currentTime+.2);g.gain.setValueAtTime(.07,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.3);o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+.32);}
 say(key){if(!this.enabled)return;const lines={begin:'Begin the harvest. Take only what you need.',bank:'Fish banked.',release:'Fish released safely back into the river.',fail:'The fish escaped back into the river.',success:'Fish in the net.'};if(lines[key])narration.speak(lines[key]);}

 message(text){if(/Fish banked/i.test(text)){this.tone();this.say('bank');}else if(/Fish in the net|Juvenile in the net/i.test(text)){this.tone();this.say('success');}else if(/close escape|fish escaped back into the river/i.test(text)){this.tone(false);this.say('fail');}else if(/released safely/i.test(text))this.say('release');else if(/round is over|plentiful harvest/i.test(text))this.say('finish');}
 toggle(){this.enabled=!this.enabled;if(!this.enabled)this.voice?.pause();else{this.unlock();this.say('begin');}return this.enabled;}
}
