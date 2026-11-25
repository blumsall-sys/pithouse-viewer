var mt=Object.defineProperty;var gt=(o,e,t)=>e in o?mt(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var y=(o,e,t)=>gt(o,typeof e!="symbol"?e+"":e,t);import{H as yt,W as Ce,G as vt,a as wt,P as _e,b as Ee,V as _,Q as q,B as Ge,R as je,E as O,S as ie,C as L,c as ke,L as Ye,M as te,d as se,e as Xe,f as X,m as F,g as $e,T as xt,h as bt,i as Ae,j as St,k as ze,F as oe,l as Et,A as ae,n as kt,o as zt,p as Mt,q as Pt,r as Ct,s as _t,t as Re,u as Te,v as At,w as Rt,x as Ke,y as ce,z as Tt,D as Lt,I as Ft,J as Dt,K as It}from"./playcanvas-Bznxzm9m.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const Me="pithouse-experience-preferences";function ne(){var o;try{return JSON.parse(((o=globalThis.sessionStorage)==null?void 0:o.getItem(Me))||"{}")||{}}catch{return{}}}class Nt{constructor(e=globalThis.speechSynthesis,t=globalThis.SpeechSynthesisUtterance){this.engine=e,this.Utterance=t,this.enabled=!!ne().voice,this.lastText="",this.utterance=null}setEnabled(e){this.enabled=!!e,this.stop();try{sessionStorage.setItem(Me,JSON.stringify({...ne(),voice:this.enabled}))}catch{}return this.enabled&&this.lastText&&this.speak(this.lastText),this.enabled}speak(e){var s,a;if(this.lastText=String(e||"").trim(),this.stop(),!this.enabled||!this.lastText||!this.engine||!this.Utterance)return;const t=this.utterance=new this.Utterance(this.lastText);t.lang="en-CA",t.rate=.89,t.pitch=.94;const i=((a=(s=this.engine).getVoices)==null?void 0:a.call(s))||[];t.voice=i.find(n=>n.lang==="en-CA")||i.find(n=>{var l;return(l=n.lang)==null?void 0:l.startsWith("en")})||null,this.engine.speak(t)}stop(){var e;(e=this.engine)==null||e.cancel(),this.utterance=null}}const D=new Nt;function Ze(o){var a,n;if(!(o!=null&&o.position)||!(o!=null&&o.target)||typeof innerWidth>"u"||innerWidth<=innerHeight||!((a=globalThis.matchMedia)!=null&&a.call(globalThis,"(pointer: coarse)").matches))return o;const e=o.target[0]-o.position[0],t=o.target[2]-o.position[2],i=Math.hypot(e,t)||1,s=i*.5;return{...o,target:[o.target[0]+t/i*s,o.target[1],o.target[2]-e/i*s],keyframes:(n=o.keyframes)==null?void 0:n.map(Ze)}}function Wt(o){const e=new URL(o),t=new URL(e.pathname.includes("/fishing/")?"../mobile-playtest/experience/":"./",e);return e.searchParams.has("localEngine")&&t.searchParams.set("localEngine",""),t}function Ot(){D.stop();try{sessionStorage.removeItem("pithouse-ladder-trip"),sessionStorage.removeItem("pithouse-fishing-trip"),localStorage.removeItem("fraser-last-harvest")}catch{}location.assign(Wt(location.href))}class Bt{constructor({onOpen:e=()=>{},onClose:t=()=>{},onVoice:i=()=>{},onSound:s=()=>{},onInventory:a,onRestart:n,onReturn:l}={}){Object.assign(this,{onOpen:e,onClose:t,onVoice:i}),this.opened=!1,this.button=document.createElement("button"),this.button.id="settings-button",this.button.className="journey-menu-button",this.button.textContent="Menu",this.button.setAttribute("aria-controls","journey-settings"),this.button.setAttribute("aria-expanded","false"),this.root=document.createElement("section"),this.root.id="journey-settings",this.root.hidden=!0,this.root.className="journey-settings",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-labelledby","settings-title"),this.root.innerHTML='<div class="journey-card"><div class="eyebrow">PITHOUSE · FRASER RIVER</div><h2 id="settings-title">Settings</h2><div class="journey-menu-actions"></div><p id="settings-controls" hidden>Move with WASD or the left touchpad. Look with the mouse or right touchpad. Use Space or Jump to jump. Use E or Interact to speak. In fishing, hold to dip and release to lift. Carry your catch to the basket and interact to tip it in.</p></div>';const r=this.root.querySelector(".journey-menu-actions"),c=(h,p,d)=>{const u=document.createElement("button");return u.id=h,u.textContent=p,u.className="secondary",u.onclick=d,r.append(u),u};c("settings-resume","Resume",()=>this.close()),this.voice=c("settings-voice","",()=>{D.setEnabled(!D.enabled),this.updateVoice(),this.onVoice(D.enabled)}),c("settings-reset","Reset experience",Ot),this.soundEnabled=ne().sound!==!1,this.soundEnabled||s(!1),this.sound=c("settings-sound","Sound: "+(this.soundEnabled?"On":"Off"),()=>{this.soundEnabled=!this.soundEnabled,s(this.soundEnabled),this.sound.textContent="Sound: "+(this.soundEnabled?"On":"Off");try{sessionStorage.setItem(Me,JSON.stringify({...ne(),sound:this.soundEnabled}))}catch{}}),c("settings-help","Controls",()=>{const h=this.root.querySelector("#settings-controls");h.hidden=!h.hidden,h.hidden||D.speak(h.textContent)}),a&&c("settings-inventory","Inventory",()=>{this.close(),a()}),n&&c("settings-restart-fishing","Reset fishing game",()=>{this.close(),n()}),l&&c("settings-return","Return to the pithouse",l),this.button.onclick=()=>this.opened?this.close():this.open(),this.root.addEventListener("click",h=>{h.target===this.root&&this.close()}),this.handleKey=h=>{if(this.opened){if(h.stopImmediatePropagation(),h.code==="Escape"){h.preventDefault(),this.close();return}if(h.key==="Tab"){const p=[...this.root.querySelectorAll("button")],d=p[0],u=p.at(-1);h.shiftKey&&document.activeElement===d?(h.preventDefault(),u.focus()):!h.shiftKey&&document.activeElement===u&&(h.preventDefault(),d.focus())}}},window.addEventListener("keydown",this.handleKey,!0),document.body.append(this.button,this.root),this.updateVoice()}updateVoice(){this.voice.textContent="Voice: "+(D.enabled?"On":"Off"),this.voice.setAttribute("aria-pressed",String(D.enabled))}open(){var e;this.opened||(this.previousFocus=document.activeElement,this.opened=!0,this.onOpen(),D.stop(),(e=document.exitPointerLock)==null||e.call(document),this.root.hidden=!1,this.button.setAttribute("aria-expanded","true"),this.updateVoice(),this.root.querySelector("button").focus())}close(){var e,t;this.opened&&(this.opened=!1,this.root.hidden=!0,this.button.setAttribute("aria-expanded","false"),this.onClose(),(t=(e=this.previousFocus)==null?void 0:e.focus)==null||t.call(e))}destroy(){window.removeEventListener("keydown",this.handleKey,!0),this.root.remove(),this.button.remove()}}const Ut="pithouse-ladder-trip",qt="pithouse-fishing-trip";function Ht(o,e){try{return JSON.parse(o.getItem(e)||"null")}catch{return null}}function Vt(o,e,t){try{return o.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function Gt(o={}){return{inventory:Array.isArray(o.inventory)?o.inventory.filter(e=>e&&typeof e.id=="string"):[],elderMet:!!o.elderMet,voice:!!o.voice}}function jt(o,e){const t=new URL("../mobile-playtest/experience/",o);try{const i=new URL(e==null?void 0:e.returnURL);if(i.origin===t.origin&&i.pathname===t.pathname)return i}catch{}return t}function Qe(){const o=Ht(sessionStorage,qt);Vt(sessionStorage,Ut,{...Gt(o||{}),voice:D.enabled,outside:!1,fromFishing:!0}),"speechSynthesis"in window&&speechSynthesis.cancel(),location.assign(jt(location.href,o))}const Y=[{id:"sockeye",name:"Adult Sockeye",points:100,size:.72,color:[.8,.2,.17],weight:.55},{id:"chinook",name:"Large Chinook",points:250,size:.95,color:[.55,.75,.8],weight:.2},{id:"smolt",name:"Juvenile Smolt",points:-50,size:.38,color:[.75,.9,.98],weight:.25}];class Yt{constructor(){this.reset()}reset(){this.score=0,this.combo=1,this.caughtCount=0,this.releasedSmolts=0,this.breakdown={sockeye:0,chinook:0,smolt:0}}catch(e){if(this.breakdown[e.id]++,e.id==="smolt")return this.score=Math.max(0,this.score-50),this.combo=1,-50;const t=e.points*this.combo;return this.score+=t,this.combo=Math.min(5,this.combo+1),this.caughtCount++,t}release(){return this.releasedSmolts++,this.score+=75,75}result(){return{score:this.score,caughtCount:this.caughtCount,releasedSmolts:this.releasedSmolts,breakdown:{...this.breakdown},rank:this.caughtCount>=5&&this.score>=1e3?"Plentiful harvest":"A lesson from the river",passed:this.caughtCount>=5&&this.score>=1e3}}}const N=o=>new Promise(e=>setTimeout(e,o*1e3));function Xt(o){if(new URLSearchParams(location.search).get("qa")!=="1")return;const e=document.createElement("section");e.id="browser-playtest",e.style.cssText="position:fixed;left:20px;top:110px;z-index:10000;background:#102a27ee;color:white;padding:12px;max-width:340px;font:13px sans-serif;pointer-events:auto",e.innerHTML='<b>LOCAL BROWSER PLAYTEST</b><p id="qa-result">Ready · uses real render assets and game updates</p><button id="qa-elder">Approach elder</button> <button id="qa-basket">Move basket</button> <button id="qa-catch">Scoop and deposit</button> <button id="qa-release">Release juvenile</button> <button id="qa-spam">Rough handling</button>',document.body.append(e);const t=e.querySelector("#qa-result");let i=!1,s=null;o.requestLock=()=>{o.pointerFallback=!0},o.pointerFallback=!0;const a=p=>{t.textContent=p,console.info("BROWSER_PLAYTEST",p)};async function n(p,d=6,u="state"){const f=performance.now()+d*1e3;for(;!p();){if(performance.now()>f)throw Error("Timed out "+u+": "+(s?s.mode+" fish "+[s.position.x,s.position.y,s.position.z].map(m=>m.toFixed(2)).join(","):"no fish")+" netY "+o.net.target.y.toFixed(2)+" reach "+o.net.inReach+" hold "+o.net.holdTime.toFixed(2));await N(.05)}}function l(p,d){const u=o.level.walkBounds,f=.2,m=Math.ceil((u.maxX-u.minX)/f)+1,v=Math.ceil((u.maxZ-u.minZ)/f)+1,g=o.camera.getPosition(),w=z=>o.navigation.sample(z.x,z.z)!==null&&!o.basket.blocksPlayer(z.x,z.z)&&Math.hypot(z.x-o.level.elder[0],z.z-o.level.elder[2])>o.obstacles.elder.radius+(o.basket.carried?.62:.18),E=Array.from({length:m*v},(z,P)=>({x:u.minX+P%m*f,z:u.minZ+Math.floor(P/m)*f}));let k=-1,x=-1,b=1/0,M=1/0;for(let z=0;z<E.length;z++){const P=E[z];if(!w(P))continue;const T=Math.hypot(P.x-g.x,P.z-g.z),I=Math.hypot(P.x-p,P.z-d);T<b&&(k=z,b=T),I<M&&(x=z,M=I)}const A=new Int32Array(E.length).fill(-2),S=[k];A[k]=-1;let C=0;for(;C<S.length&&A[x]===-2;){const z=S[C++],P=E[z],T=z%m,I=Math.floor(z/m);for(const[K,ft]of[[1,0],[-1,0],[0,1],[0,-1]]){const le=T+K,he=I+ft;if(le<0||he<0||le>=m||he>=v)continue;const Z=he*m+le,$=E[Z];A[Z]!==-2||!w($)||!w({x:($.x+P.x)/2,z:($.z+P.z)/2})||Math.abs(o.navigation.sample($.x,$.z)-o.navigation.sample(P.x,P.z))>.35||(A[Z]=z,S.push(Z))}}if(A[x]===-2)throw Error("No dry route to browser test position");const R=[];for(let z=x;z>=0;z=A[z])R.push(E[z]);return R.reverse()}async function r(p,d){o.ui.hide(),o.paused=!1,o.keys.clear();const u=l(p,d),f=performance.now()+15e3;for(const m of u)for(;;){const v=o.camera.getPosition(),g=m.x-v.x,w=m.z-v.z;if(Math.hypot(g,w)<.12)break;if(performance.now()>f)throw o.keys.clear(),Error("Grounded walking route blocked at "+v.x.toFixed(2)+","+v.z.toFixed(2));o.yaw=Math.atan2(-g,-w)*180/Math.PI,o.keys.add("KeyW"),await N(.04)}o.keys.clear(),await N(.15)}function c(p,d){e.querySelector(p).onclick=async()=>{if(!i){i=!0;try{await d()}catch(u){o.keys.clear(),a("FAIL · "+u.message)}finally{i=!1}}}}c("#qa-elder",async()=>{if(o.reset(),o.requestLock=()=>{o.pointerFallback=!0},await r(3.55,.12),o.interact(),o.state.state!=="DIALOGUE")throw Error("Elder dialogue did not open");a("PASS · walking and elder dialogue")}),c("#qa-basket",async()=>{if(o.ui.hide(),o.paused=!1,o.state.state!=="PLAYING"&&(o.begin(.2),await N(2.7)),await r(4.8,.25),!o.basket.toggle(o.camera,!1))throw Error("Basket pickup failed");if(await r(4.8,.78),o.yaw=180,o.pitch=-25,await N(.15),!o.basket.toggle(o.camera,!1))throw Error("Dry bank placement failed");a("PASS · basket moved to "+o.basket.volume.x.toFixed(2)+", "+o.basket.volume.z.toFixed(2))});async function h(p){o.state.time=180,o.ui.hide(),o.paused=!1,o.state.state!=="PLAYING"&&(o.begin(.2),await N(2.7)),o.spawn.clock=1e6;for(const g of[...o.spawn.fish])g.mode!=="banked"&&o.spawn.remove(g);o.net.cancel(),await r(5.5,2.4);const d=o.spawn.spawn(p),u=o.river.safePoint(5.9,3.95,.5);d.position.set(u.x,o.level.waterY-.48,u.z),d.mode="qa",d.approach=!1,d.travelPhase=null,d.route=null,s=d;const f=o.camera.getPosition(),m=d.position.x-f.x,v=d.position.z-f.z;if(o.yaw=Math.atan2(-m,-v)*180/Math.PI,o.pitch=Math.atan2(d.position.y-f.y,Math.hypot(m,v))*180/Math.PI,o.net.pointer={x:innerWidth/2,y:innerHeight/2},o.net.blockedUntil=0,o.net.lastPress=-10,o.net.presses=[],await N(.6),o.net.down(),await n(()=>o.net.scoopReady,5,"net beneath fish"),o.net.up(),await n(()=>o.net.trapped.includes(d),2,"capture"),await N(1.4),d.mode!=="net")throw Error("A gentle lift lost the fish");return d}c("#qa-catch",async()=>{const p=await h(Y[0]),d=o.score.caughtCount;if(a("Captured � tipping toward basket"),!o.net.deposit())throw Error("Basket was out of range");if(await n(()=>p.mode==="banked",7,"basket deposit"),await N(4.5),o.score.caughtCount!==d+1)throw Error("Deposit scoring was not exactly once");if(!o.basket.pile.bodies.every(u=>u.asleep))throw Error("Basket contents did not sleep");a("PASS · actual scoop, deposit, score and sleeping basket fish")}),c("#qa-release",async()=>{const p=await h(Y[2]),d=o.score.releasedSmolts;if(o.releaseCargo(),await n(()=>p.mode==="current",3,"water release"),o.score.releasedSmolts!==d+1)throw Error("Water-confirmed juvenile release failed");a("PASS · juvenile release reaches water and earns one reward")}),c("#qa-spam",async()=>{const p=await h(Y[0]),d=o.score.caughtCount;for(let u=0;u<5;u++)o.net.down(),o.net.up(),await N(.08);if(await n(()=>p.mode!=="net",3),o.score.caughtCount!==d)throw Error("Escape awarded points");a("PASS · rapid scoops eject fish without basket points")})}const Je=1347635022,et=1,$t=2,G=[0,3,8,15,24],Kt=`
uniform float spzPositionScale;

// work values
uvec4 packedData;   // xyz: 24-bit position + 8-bit scale per component, w: rotation bits

vec3 getCenter() {
    packedData = loadPackedTexture();

    // sign-extend the 24-bit fixed point position
    ivec3 p = ivec3(packedData.xyz << 8u) >> 8;
    return vec3(p) * spzPositionScale;
}

vec4 getColor() {
    vec4 c = loadColorTexture();

    // rgb stores SH DC coefficients as c * 0.15 + 0.5, convert to color as 0.5 + SH_C0 * dc,
    // alpha is stored with sigmoid already applied
    const float scale = 0.28209479177387814 / 0.15;
    return vec4((c.rgb - 0.5) * scale + 0.5, c.a);
}

vec4 getRotation() {
    // smallest-three encoding: bits 30-31 store the index of the largest component, the
    // remaining three components are stored as 9-bit magnitude + sign bit, 10 bits each,
    // starting from the lowest bits for the highest component index
    uint comp = packedData.w;
    uint largest = comp >> 30u;
    float q[4];
    float sumSquares = 0.0;
    for (int i = 3; i >= 0; i--) {
        if (uint(i) != largest) {
            float v = float(comp & 0x1ffu) * (0.7071067811865476 / 511.0);
            if ((comp & 0x200u) != 0u) v = -v;
            comp = comp >> 10u;
            q[i] = v;
            sumSquares += v * v;
        }
    }
    q[largest] = sqrt(max(0.0, 1.0 - sumSquares));

    // spz stores the quaternion as (x, y, z, w), the engine expects (w, x, y, z)
    return vec4(q[3], q[0], q[1], q[2]);
}

vec3 getScale() {
    // 8-bit log encoded scale in the top byte of each position word
    vec3 s = vec3(packedData.xyz >> 24u);
    return exp(s / 16.0 - 10.0);
}

#if SH_BANDS > 0

// quantized SH bytes of the current splat, packed 4 to a word
uint shWords[12];

float unpackSH(int i) {
    uint b = (shWords[i >> 2] >> uint(8 * (i & 3))) & 0xffu;
    return (float(b) - 128.0) / 128.0;
}

void readSHData(out vec3 sh[SH_COEFFS], out float scale) {
    uvec4 d0 = loadShTexture0();
    shWords[0] = d0.x; shWords[1] = d0.y; shWords[2] = d0.z; shWords[3] = d0.w;
    #if SH_BANDS > 1
        uvec4 d1 = loadShTexture1();
        shWords[4] = d1.x; shWords[5] = d1.y; shWords[6] = d1.z; shWords[7] = d1.w;
    #endif
    #if SH_BANDS > 2
        uvec4 d2 = loadShTexture2();
        shWords[8] = d2.x; shWords[9] = d2.y; shWords[10] = d2.z; shWords[11] = d2.w;
    #endif

    for (int i = 0; i < SH_COEFFS; i++) {
        sh[i] = vec3(unpackSH(i * 3), unpackSH(i * 3 + 1), unpackSH(i * 3 + 2));
    }

    scale = 1.0;
}

#endif
`,Zt=`
uniform spzPositionScale: f32;

// work values
var<private> packedData: vec4u;    // xyz: 24-bit position + 8-bit scale per component, w: rotation bits

fn getCenter() -> vec3f {
    packedData = loadPackedTexture();

    // sign-extend the 24-bit fixed point position
    let p = bitcast<vec3i>(packedData.xyz << vec3u(8u)) >> vec3u(8u);
    return vec3f(p) * uniform.spzPositionScale;
}

fn getColor() -> vec4f {
    let c = loadColorTexture();

    // rgb stores SH DC coefficients as c * 0.15 + 0.5, convert to color as 0.5 + SH_C0 * dc,
    // alpha is stored with sigmoid already applied
    const scale: f32 = 0.28209479177387814 / 0.15;
    return vec4f((c.rgb - 0.5) * scale + 0.5, c.a);
}

fn getRotation() -> vec4f {
    // smallest-three encoding: bits 30-31 store the index of the largest component, the
    // remaining three components are stored as 9-bit magnitude + sign bit, 10 bits each,
    // starting from the lowest bits for the highest component index
    var comp: u32 = packedData.w;
    let largest: u32 = comp >> 30u;
    var q = array<f32, 4>(0.0, 0.0, 0.0, 0.0);
    var sumSquares: f32 = 0.0;
    for (var i: i32 = 3; i >= 0; i--) {
        if (u32(i) != largest) {
            var v: f32 = f32(comp & 0x1ffu) * (0.7071067811865476 / 511.0);
            if ((comp & 0x200u) != 0u) { v = -v; }
            comp = comp >> 10u;
            q[i] = v;
            sumSquares += v * v;
        }
    }
    q[largest] = sqrt(max(0.0, 1.0 - sumSquares));

    // spz stores the quaternion as (x, y, z, w), the engine expects (w, x, y, z)
    return vec4f(q[3], q[0], q[1], q[2]);
}

fn getScale() -> vec3f {
    // 8-bit log encoded scale in the top byte of each position word
    let s = vec3f(packedData.xyz >> vec3u(24u));
    return exp(s / 16.0 - 10.0);
}

#if SH_BANDS > 0

// quantized SH bytes of the current splat, packed 4 to a word
var<private> shWords: array<u32, 12>;

fn unpackSH(i: i32) -> f32 {
    let b = (shWords[i >> 2] >> u32(8 * (i & 3))) & 0xffu;
    return (f32(b) - 128.0) / 128.0;
}

fn readSHData(sh: ptr<function, array<half3, SH_COEFFS>>, scale: ptr<function, f32>) {
    let d0 = loadShTexture0();
    shWords[0] = d0.x; shWords[1] = d0.y; shWords[2] = d0.z; shWords[3] = d0.w;
    #if SH_BANDS > 1
        let d1 = loadShTexture1();
        shWords[4] = d1.x; shWords[5] = d1.y; shWords[6] = d1.z; shWords[7] = d1.w;
    #endif
    #if SH_BANDS > 2
        let d2 = loadShTexture2();
        shWords[8] = d2.x; shWords[9] = d2.y; shWords[10] = d2.z; shWords[11] = d2.w;
    #endif

    for (var i: i32 = 0; i < SH_COEFFS; i++) {
        sh[i] = half3(vec3f(unpackSH(i * 3), unpackSH(i * 3 + 1), unpackSH(i * 3 + 2)));
    }

    *scale = 1.0;
}

#endif
`;class tt{constructor(e,t){y(this,"numSplats");y(this,"fractionalBits");y(this,"shBands");y(this,"shDim");y(this,"antialiased");y(this,"positions");y(this,"alphas");y(this,"colors");y(this,"scales");y(this,"rotations");y(this,"sh");this.numSplats=e.numPoints,this.fractionalBits=e.fractionalBits,this.antialiased=e.antialiased,this.shDim=G[e.shDegree],this.shBands=Math.min(e.shDegree,3),this.positions=t.positions,this.alphas=t.alphas,this.colors=t.colors,this.scales=t.scales,this.rotations=t.rotations,this.sh=t.sh??null}getCenters(){const{numSplats:e,positions:t}=this,i=1/(1<<this.fractionalBits),s=new Float32Array(e*3);for(let a=0;a<e*3;a++){const n=a*3;let l=t[n]|t[n+1]<<8|t[n+2]<<16;l=l<<8>>8,s[a]=l*i}return s}calcAabb(e){const{numSplats:t,positions:i}=this,s=1/(1<<this.fractionalBits),a=new _(1/0,1/0,1/0),n=new _(-1/0,-1/0,-1/0);for(let l=0;l<t;l++)for(let r=0;r<3;r++){const c=(l*3+r)*3;let h=i[c]|i[c+1]<<8|i[c+2]<<16;h=h<<8>>8;const p=h*s,d=r===0?"x":r===1?"y":"z";a[d]=Math.min(a[d],p),n[d]=Math.max(n[d],p)}e.setMinMax(a,n)}}class Qt extends vt{constructor(e,t,i={}){super(e,t,i);const{numSplats:s,shBands:a}=t,n=[{name:"packedTexture",format:_e},{name:"colorTexture",format:Ee}],l=a>0?Math.ceil(G[a]*3/16):0;for(let g=0;g<l;g++)n.push({name:`shTexture${g}`,format:_e});this._format=new wt(e,n,{readGLSL:Kt,readWGSL:Zt}),this.streams.init(this.format,s),this.parameters.set("spzPositionScale",1/(1<<t.fractionalBits));const{positions:r,scales:c,rotations:h,colors:p,alphas:d}=t,u=this.streams.getTexture("packedTexture"),f=u.lock();for(let g=0;g<s;g++){const w=g*9,E=g*3,k=g*4;f[g*4+0]=r[w+0]|r[w+1]<<8|r[w+2]<<16|c[E+0]<<24,f[g*4+1]=r[w+3]|r[w+4]<<8|r[w+5]<<16|c[E+1]<<24,f[g*4+2]=r[w+6]|r[w+7]<<8|r[w+8]<<16|c[E+2]<<24,f[g*4+3]=h[k+0]|h[k+1]<<8|h[k+2]<<16|h[k+3]<<24}u.unlock();const m=this.streams.getTexture("colorTexture"),v=m.lock();for(let g=0;g<s;g++)v[g*4+0]=p[g*3+0],v[g*4+1]=p[g*3+1],v[g*4+2]=p[g*3+2],v[g*4+3]=d[g];if(m.unlock(),a>0){const g=t.sh,w=t.shDim*3,E=G[a]*3;for(let k=0;k<l;k++){const x=this.streams.getTexture(`shTexture${k}`),b=x.lock();for(let M=0;M<s;M++){const A=M*w+k*16;for(let S=0;S<4;S++){let C=0;for(let R=0;R<4;R++){const z=k*16+S*4+R;C|=(z<E?g[A+S*4+R]:128)<<R*8}b[M*4+S]=C}}x.unlock()}}}configureMaterialDefines(e){e.set("SH_BANDS",this.gsplatData.shBands)}}const it=o=>{const e=new Uint8Array(o,0,Math.min(2,o.byteLength));return e[0]===31&&e[1]===139},Jt=o=>{const e=new Blob([o]).stream().pipeThrough(new DecompressionStream("gzip"));return new Response(e).arrayBuffer()},ei=o=>{const e=new DataView(o);if(e.byteLength<16)throw new Error("Invalid spz file: too small");if(e.getUint32(0,!0)!==Je)throw new Error(`Invalid spz file: unexpected magic number 0x${e.getUint32(0,!0).toString(16)}`);const t=e.getUint32(4,!0);if(t!==3)throw new Error(`Unsupported spz version ${t}, only versions 3 and 4 are supported`);const i={numPoints:e.getUint32(8,!0),shDegree:e.getUint8(12),fractionalBits:e.getUint8(13),antialiased:(e.getUint8(14)&et)!==0};if(i.shDegree>=G.length)throw new Error(`Invalid spz file: unsupported SH degree ${i.shDegree}`);const{numPoints:s}=i,a=G[i.shDegree],n={positions:s*9,alphas:s,colors:s*3,scales:s*3,rotations:s*4,sh:s*a*3},l={};let r=16;for(const c in n){const h=n[c];if(h!==0){if(r+h>e.byteLength)throw new Error(`Invalid spz file: the ${c} stream extends past the end of the file`);l[c]=new Uint8Array(o,r,h),r+=h}}return new tt(i,l)},ti=(o,e)=>{const t=new DataView(o);if(t.byteLength<32)throw new Error("Invalid spz file: too small");const i=t.getUint32(0,!0),s=t.getUint32(4,!0);if(i!==Je)throw it(o)?new Error("Unsupported spz file: gzip based version, only versions 3 and 4 are supported"):new Error(`Invalid spz file: unexpected magic number 0x${i.toString(16)}`);if(s!==4)throw new Error(`Unsupported spz version ${s}, only versions 3 and 4 are supported`);const a={numPoints:t.getUint32(8,!0),shDegree:t.getUint8(12),fractionalBits:t.getUint8(13),flags:t.getUint8(14),numStreams:t.getUint8(15),tocByteOffset:t.getUint32(16,!0),antialiased:!1};if(a.antialiased=(a.flags&et)!==0,a.shDegree>=G.length)throw new Error(`Invalid spz file: unsupported SH degree ${a.shDegree}`);(a.flags&$t)!==0&&console.warn("SpzParser: file contains extensions which are not supported and will be ignored");const n=a.numPoints,l=G[a.shDegree],r=["positions","alphas","colors","scales","rotations","sh"],c=[n*9,n,n*3,n*3,n*4,n*l*3].filter(u=>u>0);if(a.numStreams!==c.length)throw new Error(`Invalid spz file: expected ${c.length} streams, found ${a.numStreams}`);const h=a.numStreams*16;if(a.tocByteOffset<32||a.tocByteOffset+h>t.byteLength)throw new Error("Invalid spz file: table of contents out of bounds");const p={};let d=a.tocByteOffset+h;for(let u=0;u<a.numStreams;u++){const f=Number(t.getBigUint64(a.tocByteOffset+u*16,!0)),m=Number(t.getBigUint64(a.tocByteOffset+u*16+8,!0));if(m!==c[u])throw new Error(`Invalid spz file: unexpected size of the ${r[u]} stream`);if(d+f>t.byteLength)throw new Error("Invalid spz file: stream extends past the end of the file");const v=new Uint8Array(o,d,f);p[r[u]]=e.decompress(v,m),d+=f}return new tt(a,p)};class ii{constructor(e){y(this,"app");this.app=e}canParse(e){return e.ext==="spz"}_shouldAbort(e,t){var i,s;return t||!((i=this.app)!=null&&i.graphicsDevice)||this.app.graphicsDevice._destroyed?!0:!((s=this.app.assets)!=null&&s.get(e.id))}load(e,t,i){let s=!1;i.once("unload",()=>{s=!0});const a=()=>t(null,null),n=r=>{this._shouldAbort(i,s)?a():t(r)},l=r=>{var h;if(this._shouldAbort(i,s)){a();return}let c;try{const p=r(),d=((h=this.app.scene)==null?void 0:h.gsplatCentersEnabled)!==!1;c=new Qt(this.app.graphicsDevice,p,{prepareCenters:d}),c.antiAlias=p.antialiased}catch(p){t(p);return}t(null,c)};this.handler.fetch(e,yt.ResponseType.ARRAY_BUFFER,(r,c)=>{if(r){n(r);return}if(it(c)){Jt(c).then(h=>l(()=>ei(h)),n);return}if(!Ce.getConfig("ZstdDecoderModule")){n("SpzParser: ZSTD decoder module is not registered. Use WasmModule.setConfig('ZstdDecoderModule', { glueUrl, wasmUrl }) before loading spz version 4 files.");return}Ce.getInstance("ZstdDecoderModule",h=>{l(()=>ti(c,h))})},i)}open(e,t){return t}}function si(o,e,t=48){const i=Math.hypot(o,e),s=i>t?t/i:1;return{x:o*s/t,z:e*s/t}}class oi{constructor(e){if(this.game=e,this.enabled=matchMedia("(pointer: coarse)").matches||new URLSearchParams(location.search).has("touch"),!this.enabled)return;document.body.classList.add("touch-mode"),e.pointerFallback=!0,this.axes={x:0,z:0},e.mobileInput=this,this.root=document.createElement("div"),this.root.id="touch-controls",this.root.innerHTML='<div id="move-stick" aria-label="Movement joystick"><span></span></div><div id="look-pad" aria-label="Drag to look"></div><div id="touch-actions"><button id="touch-context">Speak</button><button id="touch-basket">Basket</button><button id="touch-dip">Hold to dip</button><button id="touch-release">Release fish</button><button id="touch-jump">Jump</button><button id="touch-crouch">Crouch</button></div><div id="touch-tip">Left stick moves · drag the view to look</div>',document.getElementById("ui").append(this.root);const t=this.root.querySelector("#move-stick"),i=t.firstElementChild,s=()=>{this.axes={x:0,z:0},i.style.transform="translate(0,0)"};t.onpointerdown=r=>{r.preventDefault(),this.origin={x:r.clientX,y:r.clientY},t.setPointerCapture(r.pointerId),this.stickId=r.pointerId},t.onpointermove=r=>{r.pointerId===this.stickId&&(this.axes=si(r.clientX-this.origin.x,r.clientY-this.origin.y),i.style.transform=`translate(${this.axes.x*38}px,${this.axes.z*38}px)`)};for(const r of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(r,()=>{this.stickId=null,s()});const a=this.root.querySelector("#look-pad");a.onpointerdown=r=>{this.lookId=r.pointerId,this.last={x:r.clientX,y:r.clientY},a.setPointerCapture(r.pointerId)},a.onpointermove=r=>{if(r.pointerId!==this.lookId||e.paused||!e.ui.modal.hidden)return;const c=r.clientX-this.last.x,h=r.clientY-this.last.y;e.yaw-=c*.17,e.pitch=Math.max(-78,Math.min(55,e.pitch-h*.14)),e.net.sweepInput=Math.max(-1,Math.min(1,(e.net.sweepInput??0)+c*.018)),this.last={x:r.clientX,y:r.clientY}},a.onpointerup=a.onpointercancel=()=>this.lookId=null;const n=(r,c)=>this.root.querySelector(r).onclick=h=>{h.preventDefault(),!e.paused&&e.ui.modal.hidden&&c()};n("#touch-context",()=>e.interact()),n("#touch-basket",()=>e.basket.toggle(e.camera,!!e.net.trapped.length)),n("#touch-release",()=>e.releaseCargo());const l=(r,c,h)=>{const p=this.root.querySelector(r);p.onpointerdown=d=>{d.preventDefault(),!(e.paused||!e.ui.modal.hidden)&&(p.setPointerCapture(d.pointerId),c())},p.onpointerup=d=>{d.preventDefault(),h()},p.onpointercancel=p.onlostpointercapture=h};l("#touch-dip",()=>{e.state.state==="PLAYING"&&(e.net.pointer={x:innerWidth/2,y:innerHeight/2},e.net.aim(1/60,!0),e.net.down())},()=>e.net.up()),l("#touch-jump",()=>e.keys.add("Space"),()=>e.keys.delete("Space")),l("#touch-crouch",()=>e.keys.add("ControlLeft"),()=>e.keys.delete("ControlLeft")),this.blur=()=>{s(),e.keys.delete("Space"),e.keys.delete("ControlLeft"),e.net.up()},window.addEventListener("blur",this.blur)}update(){if(!this.enabled)return;const e=this.game,t=!e.paused&&e.ui.modal.hidden&&!["EXITED","SUMMARY"].includes(e.state.state);if(this.root.hidden=!t,!t){this.axes={x:0,z:0};return}const i=!!e.net.trapped.length;this.root.querySelector("#touch-context").textContent=i?"Tip fish":"Speak",this.root.querySelector("#touch-context").hidden=!i&&!["EXPLORE","RETURN"].includes(e.state.state),this.root.querySelector("#touch-release").hidden=!i,this.root.querySelector("#touch-dip").hidden=i||e.state.state!=="PLAYING";const s=e.camera.getPosition(),a=e.basket.volume;this.root.querySelector("#touch-basket").hidden=i||!e.basket.carried&&Math.hypot(s.x-a.x,s.z-a.z)>1.8,this.root.querySelector("#touch-basket").textContent=e.basket.carried?"Place basket":"Basket"}destroy(){var e;this.blur&&window.removeEventListener("blur",this.blur),(e=this.root)==null||e.remove()}}class Le{constructor(){this.height=1.65,this.offset=0,this.velocity=0,this.wasJump=!1}update(e,t){const i=t.has("ControlLeft")||t.has("ControlRight"),s=t.has("Space");return this.height+=((i?1.02:1.65)-this.height)*(1-Math.exp(-e*14)),s&&!this.wasJump&&this.offset<=0&&!i&&(this.velocity=4.4),this.wasJump=s,this.velocity-=12*e,this.offset=Math.max(0,this.offset+this.velocity*e),this.offset===0&&(this.velocity=0),this.height+this.offset}}function Pe(o){var e,t,i;if((e=o.anim)!=null&&e.component&&(o.anim.component.enabled=!1),!o.frozenBones){o.frozenBones=[];for(const s of["neck","head","tail_1","tail_2","tail_3","tail_4","tail_5","tail_6"]){const a=(i=(t=o.entity)==null?void 0:t.findByName)==null?void 0:i.call(t,s);a&&o.frozenBones.push({node:a,name:s,rotation:a.getLocalRotation().clone()})}}}function st(o,e=0){Pe(o);for(const t of o.frozenBones){const i=t.name.startsWith("tail")?.3:-.12;t.node.setLocalRotation(t.rotation.clone().mul(new q().setFromEulerAngles(0,e*i,0)))}}function we(o){var e;(e=o.anim)!=null&&e.component&&(o.anim.component.enabled=!0,o.anim.component.speed=1.5),o.frozenBones=null}const de=(o,e,t)=>({x:o,y:e,z:t});class ai{constructor(e){this.volume=e,this.bodies=[],this.accumulator=0}add(e){var c;if(this.bodies.some(h=>h.fish===e))return;Pe(e);const t=this.volume,i=e.heading*Math.PI/180,s=e.species.size*.22,a=e.species.size*.15,n=de(e.position.x-t.x,e.position.y-t.baseY,e.position.z-t.z),l=[-1,0,1].map(h=>({p:de(n.x+Math.sin(i)*s*h,n.y,n.z+Math.cos(i)*s*h),old:de(n.x+Math.sin(i)*s*h,n.y,n.z+Math.cos(i)*s*h)})),r={fish:e,nodes:l,spacing:s,radius:a,asleep:!1,quiet:0,age:0,roll:(((c=e.body)==null?void 0:c.roll)??0)<0?-78:78};for(const h of this.bodies){const p=h.nodes[1].p;Math.hypot(p.x-n.x,p.z-n.z)<.65&&(h.asleep=!1,h.quiet=0)}e.mode="banked",e.banked=!0,this.bodies.push(r)}update(e){for(this.accumulator=Math.min(this.accumulator+e,.065);this.accumulator>=1/120;)this.step(1/120),this.accumulator-=1/120;for(const t of this.bodies)this.render(t)}step(e){const t=this.volume;for(const i of this.bodies)if(!i.asleep){i.age+=e;for(const s of i.nodes){const a=(s.p.x-s.old.x)*.94,n=(s.p.y-s.old.y)*.94,l=(s.p.z-s.old.z)*.94;Object.assign(s.old,s.p),s.p.x+=a,s.p.y+=n-9.81*e*e,s.p.z+=l}i.roll+=((i.roll<0?-82:82)-i.roll)*e*4}for(let i=0;i<6;i++){for(const s of this.bodies)if(!s.asleep){for(const[a,n,l,r]of[[0,1,s.spacing,.9],[1,2,s.spacing,.9],[0,2,s.spacing*2,.08]]){const c=s.nodes[a].p,h=s.nodes[n].p,p=h.x-c.x,d=h.y-c.y,u=h.z-c.z,f=Math.hypot(p,d,u)||1,m=(f-l)/f*.5*r;c.x+=p*m,c.y+=d*m,c.z+=u*m,h.x-=p*m,h.y-=d*m,h.z-=u*m}for(const a of s.nodes){a.p.y=Math.max(.055+s.radius,a.p.y);const n=Math.max(0,Math.min(1,a.p.y/(t.rimY-t.baseY))),l=t.radius*.7+t.radius*.3*n-s.radius,r=Math.hypot(a.p.x,a.p.z);r>l&&(a.p.x*=l/r,a.p.z*=l/r)}}for(let s=0;s<this.bodies.length;s++)for(let a=s+1;a<this.bodies.length;a++){const n=this.bodies[s],l=this.bodies[a];if(!(n.asleep&&l.asleep))for(const r of n.nodes)for(const c of l.nodes){const h=c.p.x-r.p.x,p=c.p.y-r.p.y,d=c.p.z-r.p.z,u=Math.hypot(h,p,d),f=n.radius+l.radius;if(u>=f)continue;n.asleep&&(n.asleep=!1,n.quiet=0),l.asleep&&(l.asleep=!1,l.quiet=0);const m=(f-u)/(u||1)*.5;r.p.x-=h*m,r.p.y-=p*m,r.p.z-=d*m,c.p.x+=h*m,c.p.y+=p*m,c.p.z+=d*m,u<1e-6&&(r.p.y-=f*.25,c.p.y+=f*.25)}}}for(const i of this.bodies){if(i.asleep)continue;const s=Math.max(...i.nodes.map(a=>Math.hypot(a.p.x-a.old.x,a.p.y-a.old.y,a.p.z-a.old.z)/e));if(i.quiet=s<.085?i.quiet+e:0,i.quiet>.45||i.age>4&&s<.2){i.asleep=!0;for(const a of i.nodes)Object.assign(a.old,a.p)}}}render(e){var g,w;const t=e.fish,i=this.volume,s=e.nodes[1].p,a=e.nodes[0].p,n=e.nodes[2].p;t.position.set(i.x+s.x,i.baseY+s.y,i.z+s.z);const l=n.x-a.x,r=n.y-a.y,c=n.z-a.z,h=Math.atan2(l,c)*180/Math.PI,p=-Math.atan2(r,Math.hypot(l,c))*180/Math.PI;t.entity.setPosition(t.position),t.entity.setEulerAngles(Math.max(-22,Math.min(22,p)),h,0),(w=(g=t.entity).rotateLocal)==null||w.call(g,0,0,e.roll);const d=s.x-a.x,u=s.z-a.z,f=n.x-s.x,m=n.z-s.z,v=Math.atan2(d*m-u*f,d*f+u*m)*180/Math.PI;st(t,Math.max(-45,Math.min(45,v)))}clear(){this.bodies=[],this.accumulator=0}}class ni{constructor(e,t,i,s,a){Object.assign(this,{entity:e,level:t,navigation:i,obstacles:s,onMessage:a});const n=t.basket;this.start=[...n],this.volume={x:n[0],z:n[2],baseY:n[1],rimY:n[1]+.52,radius:.45},this.pile=new ai(this.volume),this.carried=!1;const l=this.canPlace(n[0],n[2]);l!==null&&(this.start[1]=l,this.volume.baseY=l,this.volume.rimY=l+.52),this.render()}render(){var e;(e=this.entity)==null||e.setPosition(this.volume.x,this.volume.baseY+.2663,this.volume.z)}canPlace(e,t){var n;if((n=this.obstacles)!=null&&n.overlaps(e,t,.6))return null;const i=this.navigation.sample(e,t);if(i===null||i<(this.level.waterY??-100)+.065)return null;const s=[i];for(let l=0;l<8;l++){const r=l/8*Math.PI*2,c=this.navigation.sample(e+Math.cos(r)*.27,t+Math.sin(r)*.27);c!==null&&c>=(this.level.waterY??-100)+.065&&s.push(c)}if(s.length<7||Math.max(...s)-Math.min(...s)>.3)return null;const a=this.surfaceTop(e,t);return Number.isFinite(a)&&a<(this.level.waterY??-100)+.065?null:Number.isFinite(a)?a:Math.max(...s)}toggle(e,t){if(t)return this.onMessage("Deposit or release the fish before lifting the basket."),!1;const i=e.getPosition();if(this.carried){const s=e.forward,a=Math.hypot(s.x,s.z)||1,n=i.x+s.x/a*.95,l=i.z+s.z/a*.95,r=this.canPlace(n,l);return r===null?(this.onMessage("Set the basket on a flat, dry rock away from the elder."),!1):(Object.assign(this.volume,{x:n,z:l,baseY:r,rimY:r+.52}),this.carried=!1,this.render(),this.onMessage("Basket placed · bring the net over its opening"),!0)}if(Math.hypot(i.x-this.volume.x,i.z-this.volume.z)>1.6)return this.onMessage("Walk closer to the basket · F picks it up"),!1;this.carried=!0;for(const s of this.pile.bodies){s.asleep=!0;for(const a of s.nodes)Object.assign(a.old,a.p)}return this.onMessage("Carrying basket · F places it on dry ground · net stowed"),!0}surfaceTop(e,t){const i=this.level.placementGrid,s=[];if(i)for(let a=-.28;a<=.28;a+=.07)for(let n=-.28;n<=.28;n+=.07){if(Math.hypot(n,a)>.3)continue;const l=Math.floor((e+n-i.minX)/i.cell),r=Math.floor((t+a-i.minZ)/i.cell);if(l<0||r<0||l>=i.width||r>=i.height)continue;const c=i.heights[r*i.width+l];c!==null&&s.push(c)}return s.sort((a,n)=>a-n),s.length?s[Math.floor((s.length-1)*.7)]+.006:-1/0}update(e){var t;if(this.carried){const i=e.getPosition(),s=e.forward,a=e.right,n=Math.hypot(s.x,s.z)||1,l={x:i.x+s.x/n*.65-a.x*.3,y:i.y-1.32,z:i.z+s.z/n*.65-a.z*.3};(t=this.obstacles)==null||t.projectPoint(l,.59),l.y=Math.max(l.y,this.surfaceTop(l.x,l.z)),Object.assign(this.volume,{x:l.x,z:l.z,baseY:l.y,rimY:l.y+.52})}this.render()}updatePile(e){if(!this.carried)this.pile.update(e);else for(const t of this.pile.bodies)this.pile.render(t)}accept(e){this.pile.add(e)}reset(e=!0){if(this.pile.clear(),this.carried=!1,e){const t=this.start;Object.assign(this.volume,{x:t[0],z:t[2],baseY:t[1],rimY:t[1]+.52})}this.render()}blocksPlayer(e,t){return!this.carried&&Math.hypot(e-this.volume.x,t-this.volume.z)<.48}}class ri{constructor(e,t){this.level=e,this.npc=t,this.elder={x:e.elder[0],z:e.elder[2],base:e.elder[1],radius:.62,height:1.8},this.bounds=new Ge}update(){var t,i;const e=this.elder;e.radius=((t=this.npc)==null?void 0:t.mode)==="Working"?.8:.62,e.height=((i=this.npc)==null?void 0:i.mode)==="Working"?1.25:1.8,this.bounds.center.set(e.x,e.base+e.height/2,e.z),this.bounds.halfExtents.set(e.radius,e.height/2,e.radius)}overlaps(e,t,i=.2){const s=this.elder;return Math.hypot(e-s.x,t-s.z)<s.radius+i}projectPoint(e,t=.025){const i=this.elder;if(e.y<i.base-t||e.y>i.base+i.height+t)return!1;const s=e.x-i.x,a=e.z-i.z,n=Math.hypot(s,a),l=i.radius+t;return n>=l?!1:(e.x=i.x+s/(n||1)*l,e.z=i.z+(n?a/n:1)*l,!0)}segmentBlocked(e,t,i=.04){const s=new _(t.x-e.x,t.y-e.y,t.z-e.z),a=s.length();if(!a)return this.overlaps(e.x,e.z,i);const n=this.bounds.clone();n.halfExtents.addScalar(i);const l=new _;return n.intersectsRay(new je(new _(e.x,e.y,e.z),s.mulScalar(1/a)),l)&&l.distance(new _(e.x,e.y,e.z))<=a}netBlocked(e,t){const i=this.elder,s=e.y-.7<i.base+i.height&&e.y+.08>i.base&&this.overlaps(e.x,e.z,.57),a=t.x-e.x,n=t.z-e.z,l=Math.hypot(a,n)||1,r={x:e.x+a/l*3.5,y:t.y,z:e.z+n/l*3.5};return s||this.segmentBlocked(e,r,.055)}safeNet(e,t){const i=this.elder;if(!this.netBlocked(e,t))return e;const s=e.x-t.x,a=e.z-t.z;for(const n of[.45,-.45,.9,-.9,1.4,-1.4,Math.PI]){const l={x:t.x+s*Math.cos(n)-a*Math.sin(n),y:Math.max(e.y,i.base+.9),z:t.z+s*Math.sin(n)+a*Math.cos(n)};if(!this.netBlocked(l,t))return l}return null}}class xe{constructor(e){this.level=e,this.grid=e.navigationGrid??e.rockGrid,this.bank=e.bankBounds??{minX:1.8,maxX:5.6,minZ:-2.65,maxZ:1.6},this.bounds=e.walkBounds,this.radius=.17,this.eyeHeight=1.65}height(e,t){const i=this.grid,s=Math.floor((e-i.minX)/i.cell),a=Math.floor((t-i.minZ)/i.cell),n=s>=0&&a>=0&&s<i.width&&a<i.height?i.heights[a*i.width+s]:null;if(n!==null)return n;const l=this.level.rockGrid,r=Math.floor((e-l.minX)/l.cell),c=Math.floor((t-l.minZ)/l.cell);return r>=0&&c>=0&&r<l.width&&c<l.height?l.heights[c*l.width+r]:null}sample(e,t){const i=this.bank;if(e>i.minX+.15&&e<i.maxX-.15&&t>i.minZ+.15&&t<Math.min(1.6,i.maxZ))return this.level.player[1]-this.eyeHeight;const s=this.height(e,t);if(s===null||s<this.level.waterY+.065)return null;let a=0,n=s;for(let l=0;l<8;l++){const r=l*Math.PI/4,c=this.height(e+Math.cos(r)*this.radius,t+Math.sin(r)*this.radius);c!==null&&c>=this.level.waterY+.065&&Math.abs(c-s)<.4&&(a++,n+=c)}return a>=5?n/(a+1):null}move(e,t,i,{jumpHeight:s=0}={}){const a=this.bounds,n=this.sample(e.x,e.z)??e.y-this.eyeHeight;let l={x:e.x,z:e.z,ground:n};for(const[r,c]of[[e.x+t,e.z+i],[e.x+t,e.z],[e.x,e.z+i]]){if(r<a.minX||r>a.maxX||c<a.minZ||c>a.maxZ)continue;const h=this.sample(r,c);if(h!==null&&this.sample((e.x+r)/2,(e.z+c)/2)!==null&&h-n<.62+Math.min(.45,s)&&h-n>-.85){l={x:r,z:c,ground:h};break}}return l}}class li{constructor(){this.reset()}set(e){this.state=e}update(e){return this.state==="PLAYING"&&(this.time=Math.max(0,this.time-e),this.time===0)?(this.state="RETURN",!0):!1}reset(){this.state="EXPLORE",this.time=60}}const hi=2.45;function ci(o){const e=new xe(o),t=.2,i=o.walkBounds,s=Math.floor((i.maxX-i.minX)/t)+1,a=Math.floor((i.maxZ-i.minZ)/t)+1,n=Array.from({length:s*a},(p,d)=>{const u=i.minX+d%s*t,f=i.minZ+Math.floor(d/s)*t,m=e.sample(u,f);return m===null?null:{x:u,y:m,z:f}});let l=-1,r=1/0;if(n.forEach((p,d)=>{if(p){const u=Math.hypot(p.x-o.player[0],p.z-o.player[2]);u<r&&(l=d,r=u)}}),l<0)throw Error("No walkable fishing bank at the player spawn");const c=new Set([l]),h=[l];for(let p=0;p<h.length;p++){const d=h[p],u=d%s,f=Math.floor(d/s),m=n[d];for(const[v,g]of[[1,0],[-1,0],[0,1],[0,-1]]){const w=u+v,E=f+g,k=E*s+w,x=n[k];w<0||E<0||w>=s||E>=a||c.has(k)||!x||x.y-m.y>.4||x.y-m.y<-.7||e.sample((x.x+m.x)/2,(x.z+m.z)/2)===null||(c.add(k),h.push(k))}}return h.map(p=>n[p])}function di(o,e,t){e.reachableBank??(e.reachableBank=ci(o));const i=[];for(let s=2.2;s<=11;s+=.3)for(let a=-2.5;a<=15.5;a+=.3){if(!e.isClear(a,s,Math.max(.65,t+.12)))continue;let n=null,l=hi;for(const r of e.reachableBank){const c=Math.hypot(r.x-a,r.z-s);c<l&&(l=c,n=r)}n&&i.push({x:a,z:s,anchor:n,distance:l})}if(!i.length)throw Error("No resting water is reachable from the dry fishing bank");return i}function ui(o,e,t=0,i=o.level.player){o.restingLocations??(o.restingLocations=new Map);const s=Math.ceil(e*20)/20;o.restingLocations.has(s)||o.restingLocations.set(s,di(o.level,o,s));const a=i.x??i[0],n=i.z??i[2],l=a+Math.sin(t*2.4)*2.2;let r=null,c=1/0;for(const h of o.restingLocations.get(s)){const p=(o.restingReservations||[]).reduce((u,f)=>u+Math.max(0,e+f.radius+.3-Math.hypot(f.x-h.x,f.z-h.z))*2,0),d=Math.hypot(h.x-l,h.z-(n+2.3))+Math.hypot(h.anchor.x-a,h.anchor.z-n)*.3+h.distance*.1+p;d<c&&(c=d,r=h)}return o.restingReservations=[...o.restingReservations||[],{x:r.x,z:r.z,radius:e}].slice(-12),{x:r.x,z:r.z,anchor:r.anchor}}function be(o,e,t){let i=!1;for(let s=0,a=t.length-1;s<t.length;a=s++){const n=t[s],l=t[a];n[1]>e!=l[1]>e&&o<(l[0]-n[0])*(e-n[1])/(l[1]-n[1])+n[0]&&(i=!i)}return i}class pi{constructor(e){this.level=e,this.river={...e.river,escapes:e.river.escapes||[e.river.escape||[14.5,8],[-2,9.5]]},this.water=e.water,this.grid=e.rockGrid,this.eddies=e.eddies.map(([t,i,s,a])=>({x:t,y:i,z:s,r:a,occupant:null}));for(const t of this.eddies){const i=this.safePoint(t.x,t.z,.52);t.x=i.x,t.z=i.z}}ground(e,t){const i=this.grid,s=Math.floor((e-i.minX)/i.cell),a=Math.floor((t-i.minZ)/i.cell);return s>=0&&s<i.width&&a>=0&&a<i.height?i.heights[a*i.width+s]:null}isClear(e,t,i=.35){if(!be(e,t,this.water.polygon))return!1;for(let c=0;c<12;c++){const h=c*Math.PI/6;if(!be(e+Math.cos(h)*i,t+Math.sin(h)*i,this.water.polygon))return!1}const s=this.grid,a=Math.floor((e-i-s.minX)/s.cell),n=Math.floor((e+i-s.minX)/s.cell),l=Math.floor((t-i-s.minZ)/s.cell),r=Math.floor((t+i-s.minZ)/s.cell);for(let c=l;c<=r;c++)for(let h=a;h<=n;h++){if(h<0||c<0||h>=s.width||c>=s.height||s.heights[c*s.width+h]===null)continue;const p=s.minX+h*s.cell,d=s.minZ+c*s.cell,u=Math.max(p,Math.min(p+s.cell,e)),f=Math.max(d,Math.min(d+s.cell,t));if(Math.hypot(u-e,f-t)<i)return!1}return!0}channelCenter(e,t=.45){for(let i=5.7;i<7.55;i+=.12)if(this.isClear(e,i,t))return i;return 7.3}safePoint(e,t,i=.35){if(this.isClear(e,t,i))return{x:e,z:t};for(let s=.1;s<3;s+=.1)for(let a=0;a<24;a++){const n=a*Math.PI/12,l=e+Math.cos(n)*s,r=t+Math.sin(n)*s;if(this.isClear(l,r,i))return{x:l,z:r}}throw Error("No safe fish position in river volume")}move(e,t,i,s=.35){const a={x:e.x,z:e.z};for(const n of[0,.6,-.6,1.2,-1.2,Math.PI/2,-Math.PI/2]){const l=a.x+t*Math.cos(n)-i*Math.sin(n),r=a.z+t*Math.sin(n)+i*Math.cos(n);if(this.isClear(l,r,s)){e.x=l,e.z=r;return}}}clamp(e,t=.35){if(!this.isClear(e.x,e.z,t)){const i=this.safePoint(e.x,e.z,t);e.x=i.x,e.z=i.z}return e.y=Math.max(this.water.bottomY+.25,Math.min(this.water.surfaceY-.23,e.y)),e}available(e){return this.eddies.find(t=>!t.occupant&&Math.abs(t.x-e.x)<.85&&Math.abs(t.z-e.z)<1.4)}segmentBlocked(e,t){const i=Math.ceil(Math.hypot(t.x-e.x,t.y-e.y,t.z-e.z)/.07);for(let s=1;s<i;s++){const a=s/i,n=e.x+(t.x-e.x)*a,l=e.z+(t.z-e.z)*a,r=e.y+(t.y-e.y)*a,c=this.ground(n,l);if(c!==null&&r<c+.045)return!0}return!1}path(e,t,i=.35,s=!1){const a=Math.max(e.z,t.z)>15,n=a?.45:.3,l=Math.min(...this.water.polygon.map(x=>x[0]))+.05,r=1.8,c=Math.ceil((Math.max(...this.water.polygon.map(x=>x[0]))-l)/n)+1,h=Math.ceil(((a?45:15)-r)/n)+1,p=c*h;this.navigation??(this.navigation=new Map);let d=this.navigation.get(`${i}:${a}`);d||(d=Array.from({length:p},(x,b)=>{const M=l+b%c*n,A=r+Math.floor(b/c)*n;return this.isClear(M,A,i)?{x:M,z:A}:null}),this.navigation.set(`${i}:${a}`,d));let u=-1,f=-1,m=1/0,v=1/0;for(let x=0;x<p;x++){const b=d[x];if(!b)continue;const M=Math.hypot(b.x-t.x,b.z-t.z);M<v&&(!s||b.x>this.river.goalX)&&(v=M,f=x)}if(f<0)return[];const g=new Int32Array(p).fill(-2),w=[f];g[f]=-1;let E=0;for(;E<w.length;){const x=w[E++],b=d[x],M=x%c,A=Math.floor(x/c),S=Math.hypot(b.x-e.x,b.z-e.z);S<m&&(m=S,u=x);for(const[C,R]of[[1,0],[1,1],[1,-1],[0,1],[0,-1],[-1,0],[-1,1],[-1,-1]]){const z=M+C,P=A+R;if(z<0||P<0||z>=c||P>=h)continue;const T=P*c+z,I=d[T];!I||g[T]!==-2||!this.isClear((b.x+I.x)/2,(b.z+I.z)/2,i)||![.25,.75].every(K=>this.isClear(b.x+(I.x-b.x)*K,b.z+(I.z-b.z)*K,i))||(g[T]=x,w.push(T))}}if(u<0)return[];const k=[];for(let x=u;x!==-1;x=g[x])k.push(d[x]);return k}spawnPoint(e=.35,t=!1){if(t&&this.river.upstream){const s=this.river.upstream;return this.safePoint(s.laneMinX+Math.random()*(s.laneMaxX-s.laneMinX),s.spawnZ+Math.random()*5,e)}const i=this.path({x:this.river.spawnX,z:5.9},{x:this.river.goalX+.07,z:6.6},e,!0);if(!i.length)throw Error("River has no connected spawn-to-goal route");return i[0]}restingPoint(e,t=0,i){return ui(this,e,t,i)}clear(){this.restingReservations=[];for(const e of this.eddies)e.occupant=null}}function fi(o,e,t,i,s){var E,k,x,b,M;const a=o.position;t.river.upstream,o.age+=e,o.wiggle+=e*5,o.travelPhase??(o.travelPhase="incoming");const n=((E=o.species)==null?void 0:E.id)==="chinook",l=((k=o.species)==null?void 0:k.id)==="smolt",r=(l?.65:n?1.25:.9)*(1+s*.2)*(o.sizeFactor??1);o.energy??(o.energy=o.stamina??1),o.energy=Math.max(.45,Math.min(o.stamina??1,o.energy+e*((i==null?void 0:i.scoopLock)===o?-.15:.06)));const c=(i==null?void 0:i.submerged)&&Math.hypot(a.x-i.target.x,a.z-i.target.z)<1.7&&(i.speed>2.3||i.scoopLock===o);if(o.dodgeFromNet>0&&(o.dodgeFromNet-=e,o.travelPhase!=="escape"&&(o.travelPhase="escape",o.route=null)),o.travelPhase==="rest")if(o.rest-=e,o.restElapsed=(o.restElapsed??0)+e,o.mode="rest",o.rest<=0||c&&o.restElapsed>2.5)o.travelPhase="escape",o.route=null;else return!1;const h=Math.floor(o.seed??0)%2,p=((x=t.river.escapes)==null?void 0:x[h])??t.river.escape??[1.7,7.3];o.restGoal||(o.restGoal=t.restingPoint(o.radius,o.seed??0,(M=(b=i==null?void 0:i.camera)==null?void 0:b.getPosition)==null?void 0:M.call(b)));const d=o.travelPhase==="escape"?t.safePoint(p[0],p[1],o.radius):o.restGoal;o.route||(o.route=t.path(a,d,o.radius),o.routeIndex=0,o.stuckTime=0);let u=o.route[o.routeIndex];for(;u&&Math.hypot(u.x-a.x,u.z-a.z)<.12;)u=o.route[++o.routeIndex];if(!u){const A=Math.hypot(d.x-a.x,d.z-a.z);if(A>.08){if(A>.65||!t.isClear((d.x+a.x)/2,(d.z+a.z)/2,o.radius))return o.route=null,!1;u=d}else return o.travelPhase==="escape"?!0:(o.approach=!1,o.travelPhase="rest",o.restElapsed=0,o.mode="rest",o.rest=l?5:n?6:7,o.route=null,!1)}let f=u.x-a.x,m=u.z-a.z,v=Math.hypot(f,m)||1;const g={x:a.x,z:a.z};t.move(a,f/v*r*(o.travelPhase==="escape"?1.15+o.energy*.25:1)*e,m/v*r*(o.travelPhase==="escape"?1.15+o.energy*.25:1)*e,o.radius);const w=Math.hypot(a.x-g.x,a.z-g.z);return o.stuckTime=w<.002?(o.stuckTime??0)+e:0,o.stuckTime>.65&&(o.route=null,o.stuckTime=0),a.y=t.water.surfaceY-t.water.fishDepth-.025*Math.sin(o.wiggle*.5),t.clamp(a,o.radius),w>1e-4&&(o.heading=(o.heading??0)+Math.max(-e*150,Math.min(e*150,(Math.atan2(a.x-g.x,a.z-g.z)*180/Math.PI-(o.heading??0)+540)%360-180))),!1}function mi(o,e){return Math.atan2(o,e)*180/Math.PI}function gi(o,e,t,i,s,a=Math.random){var m,v,g;if(o.dodgeFromNet>0&&t.river.upstream&&(o.travelPhase="escape",o.route=null),(o.approach||o.travelPhase)&&t.river.upstream)return fi(o,e,t,i,s);o.age+=e,o.wiggle+=e*(o.mode==="rest"?2:6);const n=o.position,l=o.radius??.35,r=(.8+s*.65)*(((m=o.species)==null?void 0:m.id)==="chinook"?1.3:((v=o.species)==null?void 0:v.id)==="smolt"?.7:1);let c=0,h=0;if(o.mode==="current"&&!o.visited){const w=t.available(n);w&&a()<e*1.8&&(o.eddy=w,w.occupant=o,o.mode="eddy",o.rest=2.5+a()*3,o.route=null)}if(o.mode==="current"||o.mode==="eddy"){if(!o.route){o.stage??(o.stage=0);const E=o.stage===0?t.safePoint(1.25,3.65,l):o.stage===1?t.safePoint(5.8,4.15,l):null,k=o.mode==="eddy"?o.eddy:E??{x:t.river.goalX+.07,z:6.4+Math.sin(o.seed)*.6};o.route=t.path(n,k,l,o.mode==="current"&&!E),o.routeIndex=0}let w=o.route[o.routeIndex];for(;w&&Math.hypot(w.x-n.x,w.z-n.z)<.1;)o.routeIndex++,w=o.route[o.routeIndex];if(w){const E=w.x-n.x,k=w.z-n.z,x=Math.hypot(E,k);c=E/x*r,h=k/x*r}else o.mode==="eddy"?(o.mode="rest",o.route=null):(o.stage??0)<2?(o.stage=(o.stage??0)+1,o.route=null):c=r}o.mode==="rest"&&(o.rest-=e,c=Math.cos(o.wiggle)*.04,h=Math.sin(o.wiggle)*.04,o.rest<=0&&(o.mode="current",o.visited=!0,o.eddy&&(o.eddy.occupant=null),o.eddy=null,o.route=null));const p=i!=null&&i.submerged?Math.hypot(n.x-i.target.x,n.z-i.target.z):99;(i==null?void 0:i.scoopLock)!==o&&p<1.5&&p>.55&&(i.still>1.8||i.speed>6.5||a()<e*s*.25)&&(o.flee=.65,o.mode="flee",o.eddy&&(o.eddy.occupant=null),o.eddy=null,o.visited=!0,o.route=null),o.mode==="flee"&&(o.flee-=e,c=1.6+s,h=Math.sign(n.z-((i==null?void 0:i.target.z)??n.z-1))*.8,o.flee<=0&&(o.mode="current",o.route=null)),((g=o.species)==null?void 0:g.id)==="chinook"&&(i!=null&&i.submerged)&&i.scoopLock===o&&i.holdTime>.6&&Math.sin(o.age*2+o.seed)>.9&&(h+=.6,c+=Math.cos(o.seed)*.5,i.scoopReady=!1,i.beneathTime=0);const d={x:n.x,z:n.z};t.move(n,c*e,h*e,l),n.y=t.water.surfaceY-t.water.fishDepth-.035*Math.sin(o.wiggle*.5+o.seed),t.clamp(n,l);const u=n.x-d.x,f=n.z-d.z;return o.mode==="rest"?o.heading=-90:Math.hypot(u,f)>1e-4&&(o.heading=mi(u,f)),n.x>t.river.goalX}const ue=new Map;function ot(o){var l;if(ue.has(o))return ue.get(o);const e=(l=globalThis.__FRASER_ASSETS)==null?void 0:l[o];if(!e)return o;const t=atob(e),i=new Uint8Array(t.length);for(let r=0;r<t.length;r++)i[r]=t.charCodeAt(r);const s=o.split(".").pop(),a={wav:"audio/wav",glb:"model/gltf-binary",png:"image/png",jpg:"image/jpeg",spz:"application/octet-stream"}[s]??"application/octet-stream",n=URL.createObjectURL(new Blob([i],{type:a}));return ue.set(o,n),delete globalThis.__FRASER_ASSETS[o],n}function at(o,e=1){const t=new ie;return t.diffuse=new L(...o),t.emissive=new L(...o.map(i=>i*.12)),t.metalness=0,t.useMetalness=!0,t.roughness=.8,e<1&&(t.opacity=e,t.blendType=ke,t.depthWrite=!1),t.update(),t}function B(o,e,t,i,s,a,n=1){const l=new O(e);return l.addComponent("render",{type:t}),l.render.material=at(a,n),l.setPosition(...i),l.setLocalScale(...s),o.root.addChild(l),l}function nt(o,e){return e==="fish"?B(o,"Fallback fish","sphere",[0,0,0],[.16,.2,.65],[.75,.3,.2]):e==="elder"?B(o,"Fallback elder","capsule",[0,.85,0],[.55,1.65,.55],[.32,.26,.18]):B(o,"Fallback net pole","cylinder",[0,0,0],[.04,2,.04],[.5,.3,.12])}function Q(o,e,t="container"){return new Promise(i=>{let s=!1;const a=setTimeout(()=>{s||(s=!0,console.warn("Asset timed out",e),i(null))},matchMedia("(pointer: coarse)").matches?18e4:9e4);o.assets.loadFromUrlAndFilename(ot(e),e.split("/").pop(),t,(n,l)=>{s||(s=!0,clearTimeout(a),n&&console.warn("Asset unavailable",e,n),i(n?null:l))})})}function j(o){var e;return(e=o==null?void 0:o.resource)==null?void 0:e.instantiateRenderEntity()}function Se(o,e=1){const t=o.findComponents("render");let i=null,s=!1;for(const r of t)for(const c of r.meshInstances){const h=c.skinInstance?c.mesh.aabb:c.aabb;s||(s=!!c.skinInstance),i?i.add(h):i=h.clone()}if(!i)return o;const a=e/(Math.max(i.halfExtents.x,i.halfExtents.y,i.halfExtents.z)*2),n=new O("Normalized asset");n.addChild(o);const l=o.getLocalPosition().clone();return o.setLocalPosition(l.sub(i.center)),n.setLocalScale(a,a,a),n}function rt(o){var e;return((e=o.resource)==null?void 0:e.name)||o.name||""}function Fe(o,e){return o.findIndex(t=>rt(t).toLowerCase().includes(e.toLowerCase()))}function lt(o,e,t="Swim"){var n;const i=((n=e==null?void 0:e.resource)==null?void 0:n.animations)||[];if(!i.length)return null;o.addComponent("anim",{activate:!0});const s=Math.max(0,Fe(i,t)),a=i.map((l,r)=>({name:"Clip"+r,speed:1,loop:!0}));return o.anim.loadStateGraph({layers:[{name:"Base",states:[{name:"START"},...a],transitions:[{from:"START",to:"Clip"+s}]}],parameters:{}}),i.forEach((l,r)=>o.anim.assignAnimation("Clip"+r,l.resource)),o.anim.baseLayer.play("Clip"+s),{component:o.anim,names:i.map(rt),play:l=>{const r=Fe(i,l);r>=0&&o.anim.baseLayer.transition("Clip"+r,.25)}}}class yi{constructor(e,t,i,s){this.app=e,this.assets=t,this.river=i,this.onPass=s,this.fish=[],this.pool=[],this.clock=0,this.difficulty=.5}spawn(e=null){let t=Math.random();const i=e??(t<.55?Y[0]:t<.75?Y[1]:Y[2]);let s=this.pool.find(l=>l.species.id===i.id);if(s)this.pool.splice(this.pool.indexOf(s),1);else{const l=i.id==="sockeye"?this.assets.sockeye:this.assets.chinook,r=j(l)||nt(this.app,"fish");for(const d of r.findComponents("render"))d.layers=[this.app.gameplayLayer??Ye];const c=l?lt(r,l):null,h=Se(r,i.size),p=new O("Fish "+i.id);p.addChild(h),this.app.root.addChild(p),s={entity:p,visual:h,anim:c,species:i,baseVisualScale:h.getLocalScale().clone()}}Object.assign(s,{position:new _(this.river.river.spawnX,this.river.water.surfaceY-this.river.water.fishDepth,this.river.channelCenter(this.river.river.spawnX,i.size*.56)+Math.random()*.3),restElapsed:0,restGoal:null,route:null,routeIndex:0,travelPhase:null,approach:!!this.river.river.upstream,stage:0,releasedByPlayer:!1,scored:!1,banked:!1,intentionalRelease:!1,radius:i.size*.56,mode:"current",visited:!1,age:0,seed:Math.random()*20,wiggle:0,heading:180,eddy:null,trapped:0});const a=[.82,.94,1,1.08,1.16][Math.floor(Math.random()*5)];s.species={...i,size:i.size*a},s.sizeFactor=a,s.stamina=.7+a*.25+Math.random()*.35,s.energy=s.stamina,s.radius=s.species.size*.56,s.visual.setLocalScale(s.baseVisualScale.clone().mulScalar(a));const n=this.river.spawnPoint(s.radius,!!s.approach);return s.position.x=n.x,s.position.z=n.z,this.river.clamp(s.position,s.radius),we(s),s.entity.enabled=!0,this.fish.push(s),s}remove(e){e.eddy&&(e.eddy.occupant=null),this.fish.splice(this.fish.indexOf(e),1),e.entity.enabled=!1,this.pool.push(e)}update(e,t,i=!0){this.clock-=e,i&&this.clock<=0&&this.fish.filter(s=>s.mode!=="banked").length<13&&(this.spawn(),this.clock=1.15+Math.random()*.7);for(const s of[...this.fish]){if(s.mode==="net"||s.mode==="banked"||s.mode==="airborne"){s.entity.setPosition(s.position);continue}if(gi(s,e,this.river,t,this.difficulty)){this.onPass(s),this.remove(s);continue}s.entity.setPosition(s.position),s.entity.setEulerAngles(0,s.heading,Math.sin(s.wiggle)*3),s.anim&&(s.anim.component.speed=s.mode==="rest"?.6:1.5)}}clear(){for(const e of[...this.fish])this.remove(e);this.river.clear(),this.clock=0}destroy(){for(const e of[...this.fish,...this.pool])e.entity.destroy();this.fish=[],this.pool=[]}}const U=(o=0,e=0,t=0)=>({x:o,y:e,z:t}),vi=o=>Math.hypot(o.x,o.y,o.z),pe=(o,e)=>o.x*e.x+o.y*e.y+o.z*e.z;function fe(o,e){return{x:e.center.x+e.right.x*o.x+e.normal.x*o.y+e.forward.x*o.z,y:e.center.y+e.right.y*o.x+e.normal.y*o.y+e.forward.y*o.z,z:e.center.z+e.right.z*o.x+e.normal.z*o.y+e.forward.z*o.z}}function W(o,e){const t={x:o.x-e.center.x,y:o.y-e.center.y,z:o.z-e.center.z};return{x:pe(t,e.right),y:pe(t,e.normal),z:pe(t,e.forward)}}function re(o={x:0,y:0,z:0}){return{center:{...o},right:U(1,0,0),normal:U(0,1,0),forward:U(0,0,1)}}function wi(o=32,e=8,t=.54,i=.65){const s=[],a=[],n=[],l=[];for(let h=0;h<e;h++){const p=h/e,d=t*Math.sqrt(Math.max(.015,1-p*p));for(let u=0;u<o;u++){const f=u/o*Math.PI*2;s.push(U(Math.cos(f)*d,-i*p,Math.sin(f)*d)),a.push(h===0)}}const r=s.length;s.push(U(0,-i,0)),a.push(!1);const c=(h,p,d,u=!1)=>{const f=s[h],m=s[p];n.push({a:h,b:p,rest:Math.hypot(f.x-m.x,f.y-m.y,f.z-m.z),stiff:d}),u&&l.push([h,p])};for(let h=0;h<e;h++)for(let p=0;p<o;p++){const d=h*o+p,u=h*o+(p+1)%o;c(d,u,.93,!0),h<e-1?(c(d,d+o,.94,!0),c(d,(h+1)*o+(p+1)%o,.48),c(u,d+o,.48)):c(d,r,.94,!0),h<e-2&&c(d,d+2*o,.24)}return{rest:s,pins:a,edges:n,visible:l,sectors:o,rings:e,radius:t,depth:i}}function De(o=.72,e=0,t=.7){return{halfLength:o*.29,radius:o*.16,mass:t,yaw:e,roll:0,velocity:U(),previous:U(),captured:!1}}function xi(o,e,t,i,s,a=.54){const n=W(t,o),l=W(i,e),r=s.radius*.35;return n.y>=-r&&l.y<=r&&l.y>=-.28&&Math.hypot(l.x,l.z)<a-s.radius*.5&&(e.center.y>o.center.y+1e-4||n.y-l.y>.015)}function bi(o,e,t,i){return o.y>i.rimY&&e.y<=i.rimY&&t.y<-.05&&Math.hypot(e.x-i.x,e.z-i.z)<i.radius}function me(o,e,t){const i=(a,n)=>({x:a.x+(n.x-a.x)*t,y:a.y+(n.y-a.y)*t,z:a.z+(n.z-a.z)*t}),s=a=>{const n=Math.hypot(a.x,a.y,a.z)||1;return{x:a.x/n,y:a.y/n,z:a.z/n}};return{center:i(o.center,e.center),right:s(i(o.right,e.right)),normal:s(i(o.normal,e.normal)),forward:s(i(o.forward,e.forward))}}class Si{constructor(e={}){this.lattice=wi(e.sectors??32,e.rings??8,e.radius??.54,e.depth??.65),this.positions=this.lattice.rest.map(t=>({...t})),this.previous=this.positions.map(t=>({...t})),this.pose=re(),this.time=0,this.accumulator=0,this.reset(this.pose)}reset(e){this.pose=me(e,e,1),this.accumulator=0;for(let t=0;t<this.positions.length;t++)Object.assign(this.positions[t],fe(this.lattice.rest[t],e)),Object.assign(this.previous[t],this.positions[t])}step(e,t,{body:i=null,waterY:s=-100,ground:a=null,contain:n=!0,obstacles:l=null}={}){this.obstacles=l,this.accumulator=Math.min(this.accumulator+e,.065);const r=1/120,c=Math.floor((this.accumulator+1e-10)/r);if(!c)return;const h=this.pose,p=c*r;this.frameVelocity={x:(t.center.x-h.center.x)/p,y:(t.center.y-h.center.y)/p,z:(t.center.z-h.center.z)/p};for(let d=1;d<=c;d++)this.substep(r,me(h,t,d/c),i,s,a,n),this.accumulator-=r;this.accumulator=Math.max(0,this.accumulator),this.pose=me(t,t,1)}substep(e,t,i,s,a,n){this.time+=e;const{pins:l,edges:r,rest:c}=this.lattice,h=this.positions,p=this.previous;for(let d=0;d<h.length;d++){if(l[d]){Object.assign(p[d],h[d]),Object.assign(h[d],fe(c[d],t));continue}const u=h[d],f=p[d],m=u.y<s,v=Math.exp(-e*(m?12:1.8)),g=(u.x-f.x)*v,w=(u.y-f.y)*v,E=(u.z-f.z)*v;Object.assign(f,u),u.x+=g+(m?.07:0)*e*e,u.y+=w-9.81*(m?.55:1)*e*e,u.z+=E}if(i){i.onCloth=!1;const d=i.position,u=i.velocity;i.previous={...d};const f=d.y<s,m=Math.exp(-e*(f?3:.35));if(u.x*=m,u.y=u.y*m-9.81*(f?.16:1)*e,u.z*=m,i.captured&&i.allowEscape){const v=W(d,t);u.x-=(t.right.x*v.x+t.forward.x*v.z)*e*5,u.z-=(t.right.z*v.x+t.forward.z*v.z)*e*5}d.x+=u.x*e,d.y+=u.y*e,d.z+=u.z*e}for(let d=0;d<6;d++){for(const u of r){const f=h[u.a],m=h[u.b],v=m.x-f.x,g=m.y-f.y,w=m.z-f.z,E=Math.hypot(v,g,w)||1e-8,k=l[u.a]?0:1,x=l[u.b]?0:1,b=k+x;if(!b)continue;const M=(E-u.rest)/E*u.stiff/b;f.x+=v*M*k,f.y+=g*M*k,f.z+=w*M*k,m.x-=v*M*x,m.y-=g*M*x,m.z-=w*M*x}if(i&&this.collideBody(i,t,n),a)for(let u=this.lattice.sectors;u<h.length;u++){const f=a(h[u].x,h[u].z);f!==null&&h[u].y<f+.012&&(h[u].y=f+.012,p[u].x=h[u].x,p[u].z=h[u].z)}if(this.obstacles)for(let u=this.lattice.sectors;u<h.length;u++)this.obstacles.projectPoint(h[u],.015);for(let u=0;u<this.lattice.sectors;u++)Object.assign(h[u],fe(c[u],t))}if(i){const d=i.position;if(i.velocity.x=(d.x-i.previous.x)/e,i.velocity.y=(d.y-i.previous.y)/e,i.velocity.z=(d.z-i.previous.z)/e,i.allowEscape&&i.onCloth){const f=this.frameVelocity??U(),m=1-Math.exp(-e*10);i.velocity.x+=(f.x-i.velocity.x)*m,i.velocity.z+=(f.z-i.velocity.z)*m,i.velocity.y<f.y&&(i.velocity.y=f.y)}const u=vi(i.velocity);u>6&&(i.velocity.x*=6/u,i.velocity.y*=6/u,i.velocity.z*=6/u)}}collideBody(e,t,i){const s=e.position,a=e.yaw*Math.PI/180,n=U(Math.sin(a),0,Math.cos(a)),l=e.radius;for(let r=this.lattice.sectors;r<this.positions.length;r++){const c=this.positions[r],h=c.x-s.x;c.y-s.y;const p=c.z-s.z,d=Math.max(-e.halfLength,Math.min(e.halfLength,h*n.x+p*n.z)),u=s.x+n.x*d,f=s.z+n.z*d,m=c.x-u,v=c.y-s.y,g=c.z-f,w=Math.hypot(m,v,g);if(w<l&&w>1e-8){const E=(l-w)/w,k=e.allowEscape?1:.98;c.x+=m*E*k,c.y+=v*E*k,c.z+=g*E*k,s.x-=m*E*(1-k),s.y-=v*E*(1-k),s.z-=g*E*(1-k)}}if(i&&t.normal.y>.35){let r=W(s,t);if(e.allowEscape&&r.y<-.1){const u=Math.hypot(r.x,r.z),f=this.lattice.radius*Math.sqrt(Math.max(.1,1-(r.y/.9)**2))-l*.15;if(u>f){const m=(u-f)/u;s.x-=(t.right.x*r.x+t.forward.x*r.z)*m,s.y-=(t.right.y*r.x+t.forward.y*r.z)*m,s.z-=(t.right.z*r.x+t.forward.z*r.z)*m,s.x+=t.normal.x*(u-f)*.35,s.y+=t.normal.y*(u-f)*.35,s.z+=t.normal.z*(u-f)*.35,r=W(s,t)}}if(e.allowEscape&&(Math.hypot(r.x,r.z)>this.lattice.radius-l*.15||r.y>.22))return;let c=0;for(let u=(this.lattice.rings-1)*this.lattice.sectors;u<this.positions.length;u++)c+=W(this.positions[u],t).y;c/=this.lattice.sectors+1,c=Math.max(-1.05,Math.min(-.48,c));const h=Math.hypot(r.x,r.z),p=c*(1-Math.min(.95,(h/this.lattice.radius)**2))+l*.85;if(r.y<p){e.onCloth=!0;const u=p-r.y;s.x+=t.normal.x*u,s.y+=t.normal.y*u,s.z+=t.normal.z*u}if(!e.allowEscape&&r.y>.05){const u=r.y-.05;s.x-=t.normal.x*u,s.y-=t.normal.y*u,s.z-=t.normal.z*u}const d=this.lattice.radius-l*.8;if(!e.allowEscape&&h>d){const u=(h-d)/(h||1);s.x-=(t.right.x*r.x+t.forward.x*r.z)*u,s.y-=(t.right.y*r.x+t.forward.y*r.z)*u,s.z-=(t.right.z*r.x+t.forward.z*r.z)*u}}}get sag(){let e=0;for(let t=(this.lattice.rings-1)*this.lattice.sectors;t<this.positions.length;t++)e+=W(this.positions[t],this.pose).y;return-e/(this.lattice.sectors+1)}}function Ei(o,e,t,i,s){const a=re(o),n=t?.12:i>0?s==="clean"?.12:.055:.025,l=Math.max(-.38,Math.min(.38,-e.x*n)),r=Math.max(-.38,Math.min(.38,-e.z*n)),c=Math.sqrt(Math.max(.1,1-l*l-r*r));a.normal={x:l,y:c,z:r};const h=Math.hypot(c,l);return a.right={x:c/h,y:-l/h,z:0},a.forward={x:-l*r/h,y:-c*r/h,z:h},a}function Ie(o,e,t,{tipping:i=!1,side:s=1,project:a=!1}={}){if(!t)return!1;const n=o.x-t.x,l=o.z-t.z,r=Math.hypot(n,l);if(i||r>=1.24)return!1;const c=e.x-t.x,h=e.z-t.z,p=Math.hypot(c,h)||1,d=-h/p*s,u=c/p*s;return o.x=t.x+(a&&r>.01?n/r:d)*1.26,o.z=t.z+(a&&r>.01?l/r:u)*1.26,o.y=Math.min(o.y,t.rimY+.1),!0}function ki(o,e,t){if(!t||e.y>t.rimY+.12||e.y<t.baseY-.12)return!1;const i=o.x-e.x,s=o.z-e.z,a=Math.hypot(i,s)||1,n=(l,r)=>{const c=l/a*3.5,h=r/a*3.5,p=Math.max(0,Math.min(1,((t.x-e.x)*c+(t.z-e.z)*h)/(3.5*3.5)));return Math.hypot(e.x+c*p-t.x,e.z+h*p-t.z)>.72};if(n(i,s))return!1;for(const l of[.5,-.5,.9,-.9,1.4,-1.4]){const r=i*Math.cos(l)-s*Math.sin(l),c=i*Math.sin(l)+s*Math.cos(l);if(n(r,c))return o.x=e.x+r,o.z=e.z+c,!0}return!1}function zi(o,e,t=.02){if(!e||o.y>e.rimY+t||o.y<e.baseY-t)return!1;const i=o.x-e.x,s=o.z-e.z,a=Math.hypot(i,s),n=.61+t;return a>=n?!1:(o.x=e.x+(a?i/a:1)*n,o.z=e.z+(a?s/a:0)*n,!0)}const Ne={smolt:{period:4.4,start:.32,end:.68},sockeye:{period:3.8,start:.39,end:.61},chinook:{period:3.3,start:.44,end:.56}};class ge{reset(){this.fish=null,this.elapsed=0,this.value=0,this.active=!1,this.ready=!1}constructor(){this.reset()}update(e,t,i,s=!1){t!==this.fish&&(this.reset(),this.fish=t);const a=Ne[t==null?void 0:t.species.id]??Ne.sockeye;Object.assign(this,a);const n=(t==null?void 0:t.stamina)??1,l=(this.end-this.start)/Math.max(.8,n);if(this.start=.5-l/2,this.end=.5+l/2,this.period/=Math.sqrt(n),this.aligned=!!t&&i,this.active=s||this.aligned,!this.active){this.ready=!1;return}this.elapsed+=e;const r=this.elapsed/(this.period/2)%2;this.value=r<=1?r:2-r,this.ready=this.aligned&&this.value>=this.start&&this.value<=this.end}quality(){return this.aligned?this.ready?"clean":this.value>.18&&this.value<.82?"sluggish":"miss":"miss"}}function Mi(o,e,t,i=null,s=!1){const a=n=>{var r;return["net","banked","airborne"].includes(n.mode)||Math.hypot(n.position.x-e.x,n.position.z-e.z)>(n===i?1:.8)?!1:s&&n.position.y<e.y-.15?(n.dodgeFromNet=.8,!1):!((r=t.segmentBlocked)!=null&&r.call(t,{x:e.x,y:Math.max(e.y,n.position.y)+.08,z:e.z},n.position))};return i&&o.includes(i)&&a(i)?i:o.filter(a).sort((n,l)=>Math.hypot(n.position.x-e.x,n.position.z-e.z)-Math.hypot(l.position.x-e.x,l.position.z-e.z))[0]??null}class Pi{constructor(e,t){this.y=t,this.clock=0,this.last=null,this.drops=Array.from({length:72},()=>{const i=B(e,"River spray","sphere",[0,0,0],[.025,.025,.025],[.65,.85,.81],.7);return i.enabled=!1,{entity:i,life:0,v:new _,p:new _}}),this.waves=Array.from({length:5},()=>({age:10,parts:Array.from({length:24},()=>{const i=B(e,"Scoop wake","sphere",[0,0,0],[.08,.009,.035],[.65,.88,.84],.4);return i.enabled=!1,i})}))}impulse(e,t=1){for(let s=0;s<Math.min(22,Math.ceil(t*12));s++){const a=this.drops.find(r=>r.life<=0);if(!a)break;const n=Math.random()*Math.PI*2,l=.3+Math.random()*t;a.p.copy(e),a.p.y=this.y+.025,a.v.set(Math.cos(n)*l,.7+Math.random()*t,Math.sin(n)*l),a.life=.4+Math.random()*.5}const i=this.waves.find(s=>s.age>1.8);i&&(i.age=0,i.x=e.x,i.z=e.z)}update(e,t){this.clock+=e;const i=t.target;this.last&&((this.last.y-this.y)*(i.y-this.y)<0&&this.impulse(i,Math.min(2,.5+Math.abs(i.y-this.last.y)/Math.max(e,.001)*.2)),t.submerged&&t.speed>.15&&this.clock>.22&&(this.impulse(i,Math.min(.65,t.speed*.2)),this.clock=0)),this.last=i.clone();for(const s of this.drops)s.life-=e,s.entity.enabled=s.life>0,s.life>0&&(s.v.y-=9.81*e,s.p.add(s.v.clone().mulScalar(e)),s.p.y<this.y&&(s.life=0),s.entity.setPosition(s.p));for(const s of this.waves){s.age+=e;for(let a=0;a<s.parts.length;a++){const n=s.parts[a];if(n.enabled=s.age<1.8,n.enabled){const l=a/s.parts.length*Math.PI*2,r=.2+s.age*.8;n.setPosition(s.x+Math.cos(l)*r,this.y+.018,s.z+Math.sin(l)*r),n.setLocalScale(.06+r*.05,.009,.025),n.render.material.opacity=(1-s.age/1.8)*.45,n.render.material.update()}}}}destroy(){for(const e of this.drops)e.entity.destroy();for(const e of this.waves)for(const t of e.parts)t.destroy()}}class Ci{constructor(e,t,i){this.app=e,this.physics=t,this.mesh=new te(e.graphicsDevice),this.entity=new O("Simulated woven net");const s=at([.53,.45,.29]);s.cull=se,s.roughness=1,s.update(),this.entity.addComponent("render",{meshInstances:[new Xe(this.mesh,s)],castShadows:!1}),e.root.addChild(this.entity);const a=t.lattice.visible.length;this.positions=new Float32Array(a*12),this.normals=new Float32Array(a*12);const n=[];for(let l=0;l<a;l++){const r=l*4;n.push(r,r+1,r+2,r,r+2,r+3)}this.mesh.setIndices(n),this.mesh.setPositions(this.positions),this.mesh.setNormals(this.normals),this.mesh.update(),this.originalFrame=j(i),this.originalFrame&&e.root.addChild(this.originalFrame),this.frame=[];for(let l=0;l<(this.originalFrame?0:48);l++){const r=B(e,"Pinned cedar hoop","cylinder",[0,0,0],[.023,.07,.023],[.48,.3,.13]);this.frame.push(r)}this.pole=this.originalFrame?null:B(e,"Rigid cedar dip-net pole","cylinder",[0,0,0],[.038,3.2,.038],[.3,.15,.06])}update(e,t,i){const s=this.physics.lattice.visible,a=this.physics.positions,n=i.forward;for(let d=0;d<s.length;d++){const[u,f]=s[d],m=a[u],v=a[f],g=v.x-m.x,w=v.y-m.y,E=v.z-m.z;let k=w*n.z-E*n.y,x=E*n.x-g*n.z,b=g*n.y-w*n.x;const M=Math.hypot(k,x,b)||1,A=.004/M;k*=A,x*=A,b*=A;const S=[m.x-k,m.y-x,m.z-b,m.x+k,m.y+x,m.z+b,v.x+k,v.y+x,v.z+b,v.x-k,v.y-x,v.z-b];this.positions.set(S,d*12);for(let C=0;C<4;C++)this.normals.set([-n.x,-n.y,-n.z],d*12+C*3)}this.mesh.setPositions(this.positions),this.mesh.setNormals(this.normals),this.mesh.update();const l=new _(e.center.x,e.center.y,e.center.z);for(let d=0;d<this.frame.length;d++){const u=d/this.frame.length*Math.PI*2,f=(d+1)/this.frame.length*Math.PI*2,m=E=>new _(l.x+(e.right.x*Math.cos(E)+e.forward.x*Math.sin(E))*.54,l.y+(e.right.y*Math.cos(E)+e.forward.y*Math.sin(E))*.54,l.z+(e.right.z*Math.cos(E)+e.forward.z*Math.sin(E))*.54),v=m(u),g=m(f),w=g.clone().sub(v);this.frame[d].setPosition(v.clone().add(g).mulScalar(.5)),this.frame[d].setLocalScale(.024,w.length(),.024),this.frame[d].setRotation(new q().setFromDirections(_.UP,w.normalize()))}if(this.originalFrame){const d=new _(e.normal.x,e.normal.y,e.normal.z),u=t.clone().sub(l);u.sub(d.clone().mulScalar(u.dot(d))).normalize();const f=new X().setLookAt(l,l.clone().sub(u),d);this.originalFrame.setPosition(l),this.originalFrame.setRotation(new q().setFromMat4(f));return}const r=t.clone().sub(l),c=new _(e.normal.x,e.normal.y,e.normal.z);r.sub(c.mulScalar(r.dot(c))).normalize();const h=l.clone().add(r.mulScalar(.54)),p=h.clone().sub(t).normalize();this.pole.setPosition(h.clone().sub(p.clone().mulScalar(1.6))),this.pole.setRotation(new q().setFromDirections(_.UP,p))}setVisible(e){this.entity.enabled=e,this.originalFrame&&(this.originalFrame.enabled=e),this.pole&&(this.pole.enabled=e);for(const t of this.frame)t.enabled=e}destroy(){var e,t;this.entity.destroy(),this.mesh.destroy(),(e=this.pole)==null||e.destroy(),(t=this.originalFrame)==null||t.destroy();for(const i of this.frame)i.destroy()}}class We{constructor(e=.54){this.radius=e,this.bounds=new Ge(new _(0,-.35,0),new _(e,.55,e)),this.ray=new je(new _,new _(0,-1,0)),this.hit=new _}contains(e,t,i=.1){const s=W(e,t);return this.ray.origin.set(s.x,.35,s.z),this.bounds.intersectsRay(this.ray,this.hit)&&Math.hypot(s.x,s.z)<this.radius-i*.15&&s.y>-.95&&s.y<.28}}class _i{constructor(e,t,i,s,a,n){Object.assign(this,{app:e,camera:t,level:s,onCatch:a,onMessage:n}),this.target=new _,this.pointer={x:innerWidth/2,y:innerHeight/2},this.physics=new Si,this.waterFX=new Pi(e,s.waterY),this.renderer=new Ci(e,this.physics,i),this.zone=new We,this.gauge=new ge,this.pose=re(),this.enabled=!1,this.submerged=!1,this.trapped=[],this.speed=0,this.still=0,this.lift=0,this.clock=0,this.holdTime=0,this.lastPress=-10,this.presses=[],this.blockedUntil=0,this.strain=0,this.initialized=!1;const l=s.basket;this.basket={x:l[0],z:l[2],baseY:l[1],rimY:l[1]+.52,radius:.45}}aim(e,t){var l,r,c,h;const i=this.camera.getPosition(),s=t?this.camera.forward.clone():this.camera.camera.screenToWorld(this.pointer.x,this.pointer.y,50).sub(i).normalize(),a=new _(s.x,0,s.z).normalize(),n=s.y<-.03?F.clamp((this.level.waterY-(((l=this.level.water)==null?void 0:l.fishDepth)??.48)-i.y)/s.y*Math.hypot(s.x,s.z),.9,3.1):2.6;if(this.desired=i.clone().add(a.mulScalar(this.trapped.length?1.15:this.enabled?n:1.4)),this.desired.y=this.trapped.length?i.y-.65:this.submerged?this.level.waterY-.65:this.level.waterY+.48,!this.trapped.length){this.submerged&&this.target.y<this.level.waterY+.04&&this.clock>=this.blockedUntil?(this.scoopLock=Mi((this.fishCandidates??[]).filter(d=>Math.hypot(d.position.x-i.x,d.position.z-i.z)<3.8),this.target,this.river,this.scoopLock,this.holdTime>.55),this.lockedFish=this.scoopLock):this.lift<=0&&(this.lockedFish=null,this.scoopLock=null);const p=this.scoopLock;if(p&&(this.submerged||this.lift>0)){this.desired.x=p.position.x,this.desired.z=p.position.z;const d=(this.sweepInput??0)*.32;this.desired.x+=this.camera.right.x*d,this.desired.z+=this.camera.right.z*d,this.submerged&&(this.desired.y=p.position.y-.2)}}if(this.lift>0&&this.releaseSweep){const p=1-this.lift/(this.liftDuration||1.8),d=Math.sin(Math.max(0,p)*Math.PI)*(this.scoopQuality==="clean"?.13:.3);this.desired.x+=this.releaseSweep.x*d,this.desired.z+=this.releaseSweep.z*d}this.inReach=!!((r=this.river)!=null&&r.isClear(this.desired.x,this.desired.z,.48)),!this.inReach&&!this.submerged&&!this.trapped.length&&(this.desired.y=i.y-.65),this.submerged&&!this.trapped.length&&(!this.inReach||this.initialized&&((h=(c=this.river)==null?void 0:c.segmentBlocked)!=null&&h.call(c,this.target,this.desired)))&&this.desired.copy(this.target)}down(){var t,i;if(!this.enabled||(t=this.basketController)!=null&&t.carried)return;this.clock??(this.clock=0),this.presses??(this.presses=[]),this.lastPress??(this.lastPress=-10),this.strain??(this.strain=0),this.presses=this.presses.filter(s=>this.clock-s<1.1),this.presses.push(this.clock);const e=this.clock-this.lastPress<.28||this.presses.length>=4;if(this.lastPress=this.clock,e){this.blockedUntil=this.clock+.65,this.scoopLock=null,this.lockedFish=null,this.strain=Math.min(1.5,this.strain+.6);const s=this.trapped[0];s&&this.flop(s,!0),this.onMessage("Rapid scoops lose the lock · steady the net");return}if(this.trapped.length){this.onMessage("Carry gently · E tips into the basket · Q releases");return}if(!this.inReach){this.onMessage("Aim at an open channel beside the rocks.");return}(i=this.gauge)==null||i.reset(),this.scoopMiss=!1,this.scoopQuality=null,this.scoopLock=null,this.lockedFish=null,this.submerged=!0,this.holdTime=0,this.beneathTime=0,this.scoopReady=!1,this.lift=0,this.onMessage("Hold to dip · release while the needle is in the green zone")}up(){var e,t;if(this.submerged){if(this.submerged=!1,(e=this.gauge)!=null&&e.quality){this.scoopQuality=this.gauge.quality();const i=this.sweepVelocity??{x:0,z:0},s=Math.hypot(i.x,i.z)||1;this.releaseSweep={x:i.x/s,z:i.z/s},this.scoopMiss=this.scoopQuality==="miss",this.liftingFish=this.scoopLock,this.lift=this.scoopQuality==="clean"?.9:1.8,this.liftDuration=this.lift,this.scoopMiss?(this.scoopLock=null,this.onMessage("Missed · release nearer the center sweet spot")):this.onMessage(this.scoopQuality==="clean"?"Clean scoop · carry gently":"Slow scoop · the fish may slip away");return}if(!this.scoopReady){this.lift=0,this.scoopLock=null,this.blockedUntil=(this.clock??0)+.35,this.onMessage((t=this.gauge)!=null&&t.active?"Missed the green zone · dip and try again":"Keep the hoop beneath a fish until the gauge begins");return}this.liftingFish=this.scoopLock,this.lift=1.1}}deposit(){var t;if(!this.trapped.length||this.tipping)return!1;if((t=this.basketController)!=null&&t.carried)return this.onMessage("Put the basket on dry ground first · F"),!1;const e=this.camera.getPosition();return Math.hypot(e.x-this.basket.x,e.z-this.basket.z)>1.75?(this.onMessage("Carry the fish closer to the basket · E to tip"),!1):(this.tipping=.001,this.tipTilt=0,this.tipReady=!1,this.submerged=!1,this.lift=0,!0)}cancel(){var e,t;for(const i of this.trapped)i.mode="current",i.visited=!0,i.route=null,i.releasePoint&&i.position.copy(i.releasePoint),(e=this.river)==null||e.clamp(i.position,i.radius),we(i);(t=this.gauge)==null||t.reset(),this.trapped=[],this.scoopLock=null,this.lockedFish=null,this.submerged=!1,this.tipping=0,this.tipTilt=0,this.tipReady=!1,this.strain=0}releaseIntentional(){const e=[...this.trapped];for(const t of e){const i=this.camera.getPosition().clone().add(this.camera.forward.clone().mulScalar(2.5));let s;try{s=this.river.safePoint(i.x,i.z,t.radius)}catch{s=t.releasePoint??this.river.spawnPoint(t.radius)}const a=Math.hypot(s.x-t.position.x,s.z-t.position.z),n=Math.max(.65,Math.min(1.4,a/2.5));t.intentionalRelease=!0,t.body.velocity={x:(s.x-t.position.x)/n,y:(this.level.waterY+.05-t.position.y)/n+4.905*n,z:(s.z-t.position.z)/n},this.detach(t)}return e}escape(e){e!=null&&e.body&&this.detach(e)}detach(e){e.mode="airborne",e.body.captured=!1,e.body.released=!0,e.body.airTime=0,e.body.groundTime=0,this.trapped=this.trapped.filter(t=>t!==e),this.tipping=0,this.tipTilt=0,this.tipReady=!1,this.lift=0,this.liftingFish=null,this.scoopLock=null,this.lockedFish=null,this.blockedUntil=(this.clock??0)+.5}capture(e){this.tipping=0,this.tipTilt=0,this.tipReady=!1,this.liftingFish=null,e.releasePoint=e.position.clone(),e.mode="net",e.intentionalRelease=!1,e.eddy&&(e.eddy.occupant=null),e.eddy=null,e.body={...De(e.species.size,e.heading),position:e.position,seed:e.seed,captured:!0,allowEscape:!0,held:0,outside:0,nextFlop:.85,flopAge:2,roll:0,pitch:0},Pe(e),this.trapped=[e],this.scoopLock=null,this.lockedFish=null,this.strain=this.scoopQuality==="sluggish"?.45:.02,e.body.securedUntil=this.scoopQuality==="clean"?2.5:0,this.lift=0,this.onMessage(e.species.id==="smolt"?"Juvenile in the net · carry gently or Q to release":"Fish in the net · carry gently · E tips · Q releases")}flop(e,t=!1){const i=e.body,s=(e.species.id==="chinook"?1.3:e.species.id==="smolt"?.65:1)*(e.energy??e.stamina??1);i.flopAge=0,i.flopCount=(i.flopCount??0)+1;const a=i.flopCount%2?1:-1,n=i.held>12;i.velocity.y=Math.max(i.velocity.y,(t?2.8:n?2.7:1.25)*s+(this.strain??0)*.65),i.velocity.x+=a*(t?1.8:n?.85:.18)*s,i.velocity.z+=(t?.8:.12)*Math.sin(e.seed+i.flopCount),i.rollVelocity=a*(t?90:40),i.nextFlop=.9+(Math.sin(e.seed+i.flopCount)+1)*.3}updateAirborne(e,t){var c,h,p,d,u,f;const i=t.body,s=t.position,a={...s};i.airTime+=e,i.flopAge+=e,i.velocity.y-=9.81*e,s.x+=i.velocity.x*e,s.y+=i.velocity.y*e,s.z+=i.velocity.z*e,(c=this.obstacles)==null||c.projectPoint(s,i.radius);const n=W(a,this.pose),l=W(s,this.pose);if(!t.intentionalRelease&&!this.trapped.length&&!this.stowed&&i.airTime>.18&&this.clock>=this.blockedUntil&&n.y>=0&&l.y<0&&Math.hypot(l.x,l.z)<.48){const m=t.releasePoint;this.capture(t),t.releasePoint=m;return}if(!((h=this.basketController)!=null&&h.carried)&&!t.banked&&bi(a,s,i.velocity,this.basket)){t.banked=!0,this.onCatch(t);return}const r=((p=this.river)==null?void 0:p.ground(s.x,s.z))??null;if(r!==null&&r>this.level.waterY+.065&&s.y<r+i.radius){if(s.y=r+i.radius,i.velocity.y=0,i.velocity.x*=Math.exp(-e*8),i.velocity.z*=Math.exp(-e*8),i.groundTime+=e,i.flopAge>.9){const m=t.releasePoint??s,v=m.x-s.x,g=m.z-s.z,w=Math.hypot(v,g)||1;this.flop(t),i.velocity.x+=v/w*.8,i.velocity.z+=g/w*.8}}else if(s.y<=this.level.waterY-.04&&i.velocity.y<0){this.river.clamp(s,t.radius),t.mode="current",t.visited=!0,t.route=null,we(t),(u=(d=this.waterFX).impulse)==null||u.call(d,s,.7),t.intentionalRelease?(f=this.onReleaseWater)==null||f.call(this,t):this.onMessage("The fish escaped back into the river."),t.intentionalRelease=!1;return}this.renderFish(t,e)}renderFish(e,t){var a,n;const i=e.body,s=Math.sin(i.flopAge*22)*Math.exp(-i.flopAge*5);i.roll=e.mode==="airborne"?(i.roll??0)+(82-(i.roll??0))*(1-Math.exp(-t*6)):(i.roll??0)*Math.exp(-t*4)+s*5,i.roll=F.clamp(i.roll,-85,85),st(e,s*32),e.entity.setPosition(e.position),e.entity.setEulerAngles(i.pitch??0,i.yaw,0),(n=(a=e.entity).rotateLocal)==null||n.call(a,0,0,i.roll)}update(e,t,i){var v,g,w,E,k,x,b,M,A;this.clock=(this.clock??0)+e,this.blockedUntil??(this.blockedUntil=0),this.strain??(this.strain=0),this.zone??(this.zone=new We),this.fishCandidates=t,this.submerged&&(this.holdTime=(this.holdTime??0)+e),this.aim(e,i);const s=this.scoopLock;if(this.submerged&&s){const S=this.target.x-s.position.x,C=this.target.z-s.position.z,R=this.target.y<s.position.y-.1&&Math.hypot(S,C)<.43,z=s.species.id==="chinook"?.75:s.species.id==="smolt"?.16:.35;this.beneathTime=R?(this.beneathTime??0)+e:0,this.gauge??(this.gauge=new ge),this.gauge.update(e,s,R&&this.beneathTime>=z,!0),this.scoopReady=this.gauge.ready}else this.submerged&&(this.gauge??(this.gauge=new ge),this.gauge.update(e,null,!1,!0),this.scoopReady=!1,this.beneathTime=0);const a=this.pose,n=this.target.clone(),l=this.speed??0,r=this.camera.getPosition().clone().add(this.camera.right.clone().mulScalar(.3)).add(this.camera.up.clone().mulScalar(-.6));this.tipping&&(this.tipping+=e,this.desired.set(this.basket.x,this.basket.rimY+1.12,this.basket.z));const c=(v=this.obstacles)==null?void 0:v.elder,h=c&&Math.hypot(this.camera.getPosition().x-c.x,this.camera.getPosition().z-c.z)<1.65;if(this.stowed=!!((g=this.basketController)!=null&&g.carried)||!!(h&&!this.trapped.length),!this.stowed&&this.obstacles){const S=this.obstacles.safeNet(this.desired,r);S?this.desired.set(S.x,S.y,S.z):this.stowed=!0}if(!((w=this.basketController)!=null&&w.carried)){const S=this.desired.x-this.basket.x,C=this.desired.z-this.basket.z,R=r.x-this.basket.x,z=r.z-this.basket.z;Math.hypot(S,C)>1.6&&(this.basketSide=null),this.basketSide??(this.basketSide=-z*S+R*C>=0?1:-1),Ie(this.desired,r,this.basket,{tipping:!!this.tipping,side:this.basketSide})}const d=this.target.clone().lerp(this.target,this.desired,1-Math.exp(-e*(this.lift>0&&this.scoopQuality!=="clean"?2.8:8))).clone().sub(this.target),u=this.trapped.length?(this.tipping?1.4:this.trapped[0].body.held<1.4?1.15:2.7)*e:1/0;if(d.length()>u&&d.normalize().mulScalar(u),this.target.add(d),this.initialized||(this.target.copy(this.desired),this.physics.reset(re(this.target)),this.initialized=!0),this.obstacles&&!this.stowed&&this.obstacles.projectPoint(this.target,.58),!((E=this.basketController)!=null&&E.carried)){const S=this.target.clone();Ie(this.target,r,this.basket,{tipping:!!this.tipping,side:this.basketSide??1,project:!0});const C=this.target.clone().sub(S);if(C.length()>0){for(const R of[this.physics.positions,this.physics.previous])for(const z of R)z.x+=C.x,z.y+=C.y,z.z+=C.z;for(const R of["x","y","z"])this.physics.pose.center[R]+=C[R];this.trapped[0]&&this.trapped[0].position.add(C),n.add(C)}}if(this.speed=n.distance(this.target)/Math.max(e,.001),this.still=this.speed<.2?(this.still??0)+e:0,this.sweepVelocity={x:(this.target.x-n.x)/Math.max(e,.001),z:(this.target.z-n.z)/Math.max(e,.001)},this.pose=Ei(this.target,this.sweepVelocity,this.submerged,this.lift,this.scoopQuality),this.sweepInput=(this.sweepInput??0)*Math.exp(-e*3),this.tipping){this.target.distance(this.desired)<.08&&this.speed<.5&&(this.tipReady=!0),this.tipReady&&(this.tipTilt=(this.tipTilt??0)+e);const S=Math.min(1,(this.tipTilt??0)/1.1)*Math.PI*.07;this.pose.normal={x:Math.sin(S),y:Math.cos(S),z:0},this.pose.right={x:Math.cos(S),y:-Math.sin(S),z:0}}if(!this.scoopMiss&&!this.trapped.length&&this.lift>0&&!this.stowed&&this.clock>=this.blockedUntil)for(const S of t){if(["net","banked","airborne"].includes(S.mode)||(this.liftingFish??this.scoopLock)&&S!==(this.liftingFish??this.scoopLock))continue;const C=De(S.species.size,S.heading);if(xi(a,this.pose,S.position,S.position,C)){this.capture(S);break}}const f=this.trapped[0];if(f){const S=f.body;if(f.energy=Math.max(.4,(f.energy??f.stamina??1)-e*.045),S.held+=e,S.flopAge+=e,S.nextFlop-=e,S.held>Math.max(.8,S.securedUntil??0)&&!this.tipping){const C=Math.abs(this.speed-l)/Math.max(e,.001);this.strain=F.clamp(this.strain+Math.max(0,C-12)*e*.022-e*.22,0,1.5),S.nextFlop<=0&&this.flop(f)}this.tipReady&&(f.position.x+=(this.basket.x-f.position.x)*(1-Math.exp(-e*5)),f.position.z+=(this.basket.z-f.position.z)*(1-Math.exp(-e*5))),(this.tipTilt??0)>.6&&Math.hypot(f.position.x-this.basket.x,f.position.z-this.basket.z)<.3&&(S.velocity.x=0,S.velocity.z=0,S.velocity.y=Math.min(0,S.velocity.y),this.detach(f))}const m=this.trapped[0];if(this.physics.step(e,this.pose,{body:(m==null?void 0:m.body)??null,waterY:this.level.waterY,ground:(S,C)=>{var R;return((R=this.river)==null?void 0:R.ground(S,C))??null},contain:!0,obstacles:{projectPoint:(S,C)=>{var R,z;(R=this.obstacles)==null||R.projectPoint(S,C),(z=this.basketController)!=null&&z.carried||zi(S,this.basket,C)}}}),m){const S=m.body;(k=this.obstacles)==null||k.projectPoint(m.position,S.halfLength+S.radius),S.outside=this.zone.contains(m.position,this.pose,S.radius)?0:S.outside+e,S.outside>.16&&(this.detach(m),this.onMessage("Fish out of the catch zone · it can escape")),this.renderFish(m,e)}for(const S of t)S.mode==="airborne"&&this.updateAirborne(e,S);(x=this.obstacles)!=null&&x.netBlocked(this.target,r)&&(this.stowed=!0),this.waterFX.update(e,this),this.lift=Math.max(0,this.lift-e),(M=(b=this.renderer).setVisible)==null||M.call(b,!this.stowed),(A=this.basketController)!=null&&A.carried||ki(r,this.target,this.basket),this.renderer.update(this.pose,r,this.camera)}destroy(){this.waterFX.destroy(),this.renderer.destroy()}}class Ai{constructor(){this.enabled=!0,this.last={},this.voice=null,document.addEventListener("pointerdown",()=>this.unlock(),{once:!0}),document.addEventListener("keydown",()=>this.unlock(),{once:!0})}unlock(){try{this.context??(this.context=new(window.AudioContext||window.webkitAudioContext)),this.context.resume().catch(()=>{})}catch{}}tone(e=!0){if(!this.enabled)return;this.unlock();const t=this.context;if(!t)return;const i=t.createOscillator(),s=t.createGain();i.type="sine",i.frequency.setValueAtTime(e?520:190,t.currentTime),i.frequency.exponentialRampToValueAtTime(e?850:110,t.currentTime+.2),s.gain.setValueAtTime(.07,t.currentTime),s.gain.exponentialRampToValueAtTime(.001,t.currentTime+.3),i.connect(s).connect(t.destination),i.start(),i.stop(t.currentTime+.32)}say(e){if(!this.enabled)return;const t={begin:"Begin the harvest. Take only what you need.",bank:"Fish banked.",release:"Fish released safely back into the river.",fail:"The fish escaped back into the river.",success:"Fish in the net."};t[e]&&D.speak(t[e])}message(e){/Fish banked/i.test(e)?(this.tone(),this.say("bank")):/Fish in the net|Juvenile in the net/i.test(e)?(this.tone(),this.say("success")):/close escape|fish escaped back into the river/i.test(e)?(this.tone(!1),this.say("fail")):/released safely/i.test(e)?this.say("release"):/round is over|plentiful harvest/i.test(e)&&this.say("finish")}toggle(){var e;return this.enabled=!this.enabled,this.enabled?(this.unlock(),this.say("begin")):(e=this.voice)==null||e.pause(),this.enabled}}class ht{constructor({onReturn:e}={}){this.onReturn=e,this.audio=new Ai,this.root=document.getElementById("ui"),this.root.style.setProperty("--fish-atlas",`url("${new URL(ot("./assets/fishing-badges.png"),document.baseURI).href}")`),this.root.innerHTML='<header><div class="brand"><span class="mark">≈</span><div>FRASER RIVER<small>DIP NET FISHING</small></div></div><nav><button id="sound-toggle" class="quiet">Sound on</button><button id="reset-game" class="quiet">Reset <kbd>R</kbd></button><button id="help" class="quiet">Help <kbd>H</kbd></button><button id="session-menu" class="quiet">Menu <kbd>Esc</kbd></button></nav></header><div class="stats" hidden><div><small>TIME LEFT</small><strong id="timer">180<em>s</em></strong></div><div><small>RIVER REWARD</small><strong id="score">0</strong></div><div><small>HARVEST</small><strong id="catch">0<em>/ 5</em></strong></div><div><small>COMBO</small><strong id="combo">×1</strong></div></div><div id="objective" class="objective">Speak with the elder</div><div id="crosshair">+</div><div id="fish-target" hidden aria-hidden="true"></div><div id="scoop-gauge" hidden><i id="scoop-badge" class="fish-badge"></i><div class="scoop-instructions"><strong id="scoop-name">Find a fish</strong><span id="scoop-hint">Hold to dip</span></div><svg viewBox="0 0 300 136" aria-hidden="true"><path class="gauge-track" d="M30 112 A120 120 0 0 1 270 112" pathLength="100"/><path id="gauge-zone" d="M30 112 A120 120 0 0 1 270 112" pathLength="100"/><g id="gauge-needle"><path d="M150 111 L150 9"/><circle cx="150" cy="112" r="7"/></g><text x="150" y="105" text-anchor="middle" id="gauge-percent">0%</text></svg><small>RELEASE IN THE CENTER SWEET SPOT</small></div><button id="release-fish" class="release-fish" hidden>Q · Release juvenile safely</button><div id="net-status" hidden></div><button id="basket-action" class="basket-action" hidden>F · Pick up basket</button><div id="toast" role="status"></div><div id="popups"></div><div id="elder-marker">ELDER <span>◆</span></div><div id="controls"><span><kbd>W A S D</kbd> Walk</span><span><kbd>Mouse</kbd> Look / aim</span><span><kbd>Hold click</kbd> Dip & sweep</span><span><kbd>Release</kbd> Lift</span><span><kbd>F</kbd> Basket</span><span><kbd>E</kbd> Speak / tip</span><span><kbd>Space</kbd> Jump</span><span><kbd>Ctrl</kbd> Crouch</span><span><kbd>Esc</kbd> Pause</span></div><section id="modal" role="dialog" aria-modal="true"></section><div id="loading"><div class="load-ring"></div><p>Finding our place by the river</p><small id="load-status">Preparing the riverbank…</small></div>',this.modal=document.getElementById("modal"),this.toastTimer=0,document.getElementById("sound-toggle").onclick=()=>{document.getElementById("sound-toggle").textContent=this.audio.toggle()?"Sound on":"Sound off"}}loading(e){document.getElementById("load-status").textContent=e}ready(){document.getElementById("loading").hidden=!0}show(e){this.modal.innerHTML=e,this.modal.hidden=!1,queueMicrotask(()=>{this.modal.hidden||D.speak([...this.modal.querySelectorAll("h1,h2,p,label")].map(t=>t.textContent).join(" "))})}hide(){D.stop(),this.modal.hidden=!0,this.modal.classList.remove("elder-briefing")}intro(e,t){this.audio.say("intro"),this.modal.classList.add("elder-briefing");let i=0;const s=()=>{const a=[["Listen to the river.","Walk the shoreline. Take only what you need, and return to give thanks."],["Choose your catch.","Keep adult salmon. Release young smolts."],["A patient scoop.","Hold to dip. Release in the green sweet spot. Carry the fish to your basket."]],[n,l]=a[i];this.show(`<div class="eyebrow">THE ELDER · ${i+1} / 3</div><h1>${n}</h1><p class="lead">${l}</p>${i===1?'<div class="species"><i class="fish-badge sockeye-badge" title="Sockeye"></i><i class="fish-badge chinook-badge" title="Chinook"></i><i class="fish-badge smolt-badge" title="Release smolts"></i></div>':""}${i===2?'<p>Harvest 5 adults and earn 1,000 points in 3 minutes.</p><label class="difficulty">River pace <select id="difficulty"><option value=".2">Gentle</option><option value=".55" selected>Flowing</option><option value="1">Swift</option></select></label>':""}<button id="begin" class="primary">${i<2?"Continue":"Begin the harvest"}</button><button id="later" class="secondary">Keep exploring</button>`),document.getElementById("begin").onclick=()=>{i<2?(i++,s()):e(Number(document.getElementById("difficulty").value))},document.getElementById("later").onclick=t};s()}help(e){this.show('<div class="eyebrow">READ THE WATER</div><h2>A gentle sweep.</h2><p>Walk toward the river with <b>WASD</b>. Move the mouse to look. Aim down at open water near a fish. The marker follows the hoop, not the camera.</p><ol><li><b>Hold the left mouse button</b> to lower your net.</li><li><b>Sweep gently</b> across a fish. Rushing or waiting too long will spook it.</li><li><b>Release</b> when the gauge needle enters the green target zone. Each fish badge identifies your target; larger fish have narrower windows. Center releases scoop cleanly; outer releases scoop slowly or miss. Carry the loaded net back to the basket and press E to tip the fish in. Only a basket deposit counts.</li></ol><p>Adult sockeye and chinook build your combo. Juveniles cost 50 points when caught; letting them reach the downstream boundary earns 75.</p><p>Catch <b>5 adults</b> and earn <b>1,000 points</b> in 180 seconds. Then walk back to the elder and press <b>E</b>.</p><button id="resume" class="primary">Return to the river →</button><small class="footnote">Arrow keys turn the camera · C shows collision and fish zones · H opens this guide</small>'),document.getElementById("resume").onclick=e}returnPrompt(e){this.message(e.passed?"A plentiful harvest. Return to the elder.":"The round is over. Return to the elder."),document.getElementById("objective").textContent="Return to the elder · press E nearby"}summary(e,t,i){this.modal.classList.add("elder-briefing"),this.audio.say("finish"),this.show(`<div class="eyebrow">THE RIVER GIVES, WE GIVE THANKS</div><h2>${e.rank}</h2><div class="elder-quote"><small>THE ELDER</small><p>“${e.passed?"You have brought back a plentiful reward.":"Every visit to the water offers something to learn."} Let us thank the river for what it has shared, and for the fish that continue their journey.”</p></div><div class="results"><div><strong>${e.score.toLocaleString()}</strong><small>POINTS</small></div><div><strong>${e.caughtCount}</strong><small>ADULT FISH</small></div><div><strong>${e.releasedSmolts}</strong><small>YOUNG FISH PASSED</small></div></div><p class="breakdown">${e.breakdown.sockeye} sockeye · ${e.breakdown.chinook} chinook · ${e.breakdown.smolt} juvenile catches</p><p>“Thank you, river, for this plentiful reward. May the fish continue their journey.”</p><button id="again" class="primary">Fish again →</button><button id="free" class="secondary">Stay by the river</button>`),document.getElementById("again").onclick=t,document.getElementById("free").onclick=i,this.journeyButtons(!0)}update(e){const t=e.net.trapped[0],i=document.getElementById("basket-action"),s=e.basket,a=e.camera.getPosition(),n=document.getElementById("net-status");i.hidden=!!t||!s||e.paused||!this.modal.hidden||!s.carried&&Math.hypot(a.x-s.volume.x,a.z-s.volume.z)>1.6,i.textContent=s!=null&&s.carried?"F · Place basket on dry ground":"F · Pick up basket",i.onclick=()=>s.toggle(e.camera,!!t),n.hidden=!t||e.paused,n.textContent=(e.net.strain??0)>.7?"Fish slipping · slow down and keep it in the net":"Carry gently · fish can flop out";const l=document.getElementById("release-fish");l.hidden=!t||e.paused,l.textContent=(t==null?void 0:t.species.id)==="smolt"?"Q · Release juvenile safely":"Q · Return fish to the river",l.onclick=()=>e.releaseCargo();const r=e.net.lockedFish,c=document.getElementById("fish-target");if(c.hidden=!e.net.submerged||!!t||e.state.state!=="PLAYING"||e.paused||e.net.stowed,!c.hidden){const f=e.camera.camera.worldToScreen(e.net.target);c.hidden=f.z<0,c.style.left=f.x+"px",c.style.top=f.y+"px",c.classList.toggle("scoop-ready",!!e.net.scoopReady)}document.getElementById("crosshair").hidden=e.net.submerged||!!t;const h=document.getElementById("scoop-gauge"),p=e.net.gauge;if(h.hidden=!e.net.submerged&&!t||e.paused||!this.modal.hidden||e.state.state!=="PLAYING",!h.hidden){const f=e.camera.camera.worldToScreen(e.net.target);h.hidden=f.z<0,h.style.left=Math.max(125,Math.min(innerWidth-125,f.x))+"px",h.style.top=Math.max(115,Math.min(innerHeight-135,f.y))+"px";const m=t??r,v=m==null?void 0:m.species.id,g=document.getElementById("scoop-badge");g.className="fish-badge "+(v==="chinook"?"chinook-badge":v==="smolt"?"smolt-badge":v==="sockeye"?"sockeye-badge":"dip-badge"),document.getElementById("scoop-name").textContent=m?m.species.name+(m.stamina?" · "+(m.stamina>1.2?"strong":m.stamina<1?"gentle":"steady"):""):"Find a fish",h.classList.toggle("loaded",!!t),document.getElementById("scoop-hint").textContent=t?"Carry gently · E tip · Q release":r?p!=null&&p.aligned?p.ready?"RELEASE · clean scoop":"Hold · aim for the center":"Hold · settling beneath fish":"Sweep the submerged hoop near a fish",h.classList.toggle("ready",!!(p!=null&&p.ready)),h.classList.toggle("searching",!(p!=null&&p.active)),document.getElementById("gauge-zone").setAttribute("stroke-dasharray",`${(((p==null?void 0:p.end)??.61)-((p==null?void 0:p.start)??.39))*100} 100`),document.getElementById("gauge-zone").setAttribute("stroke-dashoffset",-((p==null?void 0:p.start)??.39)*100),document.getElementById("gauge-needle").setAttribute("transform",`rotate(${-90+((p==null?void 0:p.value)??0)*180} 150 112)`),document.getElementById("gauge-percent").textContent=p!=null&&p.active?Math.round(p.value*100)+"%":"…"}const d=document.getElementById("objective");e.state.state==="PLAYING"&&(d.textContent=s!=null&&s.carried?"Place the basket on dry ground":t?"Carry to the basket · tip the fish":e.net.submerged?"Release in the green sweet spot":"Find a fish · hold to dip");const u=e.score;document.querySelector(".stats").hidden=!["READY","PLAYING","RETURN","SUMMARY"].includes(e.state.state),document.getElementById("timer").innerHTML=Math.ceil(e.state.time)+"<em>s</em>",document.getElementById("timer").classList.toggle("urgent",e.state.time<10),document.getElementById("score").textContent=u.score.toLocaleString(),document.getElementById("catch").innerHTML=u.caughtCount+"<em>/ 5</em>",document.getElementById("combo").textContent="×"+u.combo}message(e){this.audio.message(e);const t=document.getElementById("toast");t.textContent=e,t.classList.add("visible"),clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>t.classList.remove("visible"),2500)}popup(e,t,i,s=""){const a=document.createElement("div");a.className="popup "+s,a.textContent=e,a.style.left=t+"px",a.style.top=i+"px",document.getElementById("popups").append(a),setTimeout(()=>a.remove(),1400)}pauseMenu(e,t=!1){this.audio.say("pause"),this.show(`<div class="eyebrow">${t?"HOW TO PLAY":"EXPERIENCE PAUSED"}</div><h2>${t?"Read the water.":"A moment by the river."}</h2><p>${t?"Move along the dry shoreline. Hold to dip; release in the green sweet spot. Carry to the basket and tip. Release young fish.":"Resume your visit to the river when you are ready."}</p><button id="resume" class="primary">Resume →</button><button id="retry-now" class="secondary">Try the round again</button><button id="reset-now" class="secondary">Reset the whole experience</button><button id="exit-now" class="secondary">Exit experience</button>`),document.getElementById("resume").onclick=e.resume,document.getElementById("retry-now").onclick=e.retry,document.getElementById("reset-now").onclick=e.reset,document.getElementById("exit-now").onclick=e.exit,this.journeyButtons()}exitScreen(e){this.show('<div class="eyebrow">UNTIL NEXT TIME</div><h2>The river will wait.</h2><p>The experience has ended. You can start again here, or close this browser tab.</p><button id="start-again" class="primary">Start experience →</button>'),document.getElementById("start-again").onclick=e,this.journeyButtons()}journeyButtons(e=!1){var i,s,a;if(!this.onReturn)return;if(e){(i=document.getElementById("again"))==null||i.remove(),(s=document.getElementById("free"))==null||s.remove();const n=(a=this.modal.querySelector(".breakdown"))==null?void 0:a.nextElementSibling;(n==null?void 0:n.tagName)==="P"&&n.remove()}const t=(n,l,r,c="secondary")=>{const h=document.createElement("button");h.id=n,h.className=c,h.textContent=l,h.onclick=r,this.modal.append(h)};t("return-pithouse","Return to the pithouse",this.onReturn,e?"primary":"secondary"),e&&t("reset-experience","Reset fishing experience",()=>{var n;return(n=this.onReset)==null?void 0:n.call(this)})}destroy(){clearTimeout(this.toastTimer),this.root.innerHTML=""}}class Ri{constructor(e,t){this.animation=lt(e,t,"Idle"),this.mode="Idle"}setMode(e){var t;this.mode!==e&&(this.mode=e,(t=this.animation)==null||t.play(e))}idle(){this.setMode("Idle")}talk(){this.setMode("Talking")}work(){this.setMode("Working")}facePlayer(e,t,i,s=0){if(!t||this.mode==="Working")return;const a=t.getPosition(),n=Math.atan2(e.x-a.x,e.z-a.z)*180/Math.PI+s,l=t.forward?Math.atan2(-t.forward.x,-t.forward.z)*180/Math.PI:t.getEulerAngles().y,r=(n-l+540)%360-180;t.setEulerAngles(0,l+Math.max(-i*100,Math.min(i*100,r)),0)}update(){}}class Ti{constructor(e,t){this.app=e,this.options=t,this.level=t.level,this.camera=t.playerCamera,this.ui=t.ui||new ht,this.state=new li,this.score=new Yt,this.river=new pi(this.level),this.navigation=new xe(this.level),this.npc=new Ri(t.elder,t.assets.elder),this.obstacles=new ri(this.level,this.npc),this.obstacles.update(),this.basket=new ni(t.basketEntity,this.level,this.navigation,this.obstacles,i=>this.ui.message(i)),this.spawn=new yi(e,t.assets,this.river,i=>{i.species.id==="smolt"&&!i.releasedByPlayer&&(this.score.release(),this.popup(i,"+75 · Young fish passed","steward"))}),this.net=new _i(e,this.camera,t.assets.net,this.level,i=>{if(i.scored)return;i.scored=!0;const s=this.score.catch(i.species);this.popup(i,`${s>0?"+":""}${s} · ${i.species.name}`,s<0?"penalty":""),this.basket.accept(i),this.ui.message("Fish banked!")},i=>this.ui.message(i)),this.net.river=this.river,this.net.basket=this.basket.volume,this.net.basketController=this.basket,this.net.obstacles=this.obstacles,this.net.onReleaseWater=i=>this.confirmRelease(i),this.paused=!1,this.keys=new Set,this.yaw=8,this.pitch=-10,this.locked=!1,this.debug=!1,this.handlers=[],this.previousCamera={position:this.camera.getPosition().clone(),rotation:this.camera.getRotation().clone()},this.bind(),this.mobile=new oi(this),this.updateBound=i=>this.update(i),e.on("update",this.updateBound)}on(e,t,i){e.addEventListener(t,i),this.handlers.push(()=>e.removeEventListener(t,i))}bind(){const e=this.app.graphicsDevice.canvas;this.on(window,"keydown",t=>{var i;if(t.code==="Escape"){this.paused?this.resume():this.pause();return}if(t.code==="KeyR"){this.reset();return}t.target.matches("select,input,button")&&!this.ui.modal.hidden||(this.keys.add(t.code),["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(t.code)&&t.preventDefault(),t.code==="KeyE"&&!t.repeat&&this.interact(),t.code==="KeyF"&&!t.repeat&&!this.paused&&this.ui.modal.hidden&&((i=this.basket)==null||i.toggle(this.camera,!!this.net.trapped.length)),t.code==="KeyQ"&&!t.repeat&&!this.paused&&this.ui.modal.hidden&&this.net.trapped.length&&this.releaseCargo(),t.code==="KeyH"&&!t.repeat&&this.pause(!0),t.code==="KeyC"&&!t.repeat&&this.toggleDebug())}),this.on(window,"keyup",t=>this.keys.delete(t.code)),this.on(window,"blur",()=>{this.keys.clear(),this.net.submerged=!1,this.ui.modal.hidden&&this.state.state!=="EXITED"&&this.pause()}),this.on(document,"visibilitychange",()=>{document.hidden&&this.ui.modal.hidden&&this.pause()}),this.on(document,"pointerlockchange",()=>{this.locked=document.pointerLockElement===e,!this.locked&&this.ui.modal.hidden&&this.state.state!=="EXPLORE"&&this.state.state!=="EXITED"&&this.pause()}),this.on(window,"mousemove",t=>{this.net.pointer={x:t.clientX,y:t.clientY},this.locked&&!this.paused&&(this.net.sweepInput=F.clamp((this.net.sweepInput??0)+t.movementX*.018,-1,1),this.yaw-=t.movementX*.13,this.pitch=F.clamp(this.pitch-t.movementY*.1,-78,55))}),this.on(e,"pointerdown",t=>{t.pointerType==="touch"||t.button!==0||!this.ui.modal.hidden||this.paused||(!this.locked&&!this.pointerFallback&&this.requestLock(),this.state.state==="PLAYING"&&(this.net.aim(1/60,this.locked),this.net.down()))}),this.on(window,"pointerup",t=>{t.button===0&&t.pointerType!=="touch"&&this.net.up()}),document.getElementById("help").onclick=()=>this.pause(!0),document.getElementById("session-menu").onclick=()=>this.pause(),document.getElementById("reset-game").onclick=()=>this.reset()}requestLock(){var t,i;const e=this.app.graphicsDevice.canvas;e.tabIndex=0,e.focus(),!(this.pointerFallback||this.mobileInput)&&((i=(t=e.requestPointerLock)==null?void 0:t.call(e))==null||i.catch(()=>{this.pointerFallback=!0,this.ui.message("Use arrow keys to look; move the mouse to aim.")}))}async start(){this.reset(),this.ui.ready()}reset(){var e,t;this.motion=new Le,this.dialoguePan=null,(e=this.basket)==null||e.reset(!0),this.net.cancel(),this.net.initialized=!1,this.net.enabled=!1,this.spawn.clear(),this.score.reset(),this.state.reset(),this.paused=!1,this.keys.clear(),this.ui.hide(),this.camera.setPosition(...this.level.player),this.yaw=8,this.pitch=-10,this.camera.setEulerAngles(this.pitch,this.yaw,0),this.npc.idle(),this.npc.animation&&(this.npc.animation.component.speed=1),(t=document.exitPointerLock)==null||t.call(document),document.getElementById("objective").textContent="Walk to the elder · E to speak",this.ui.message("Approach the elder to begin. R resets; Esc opens the menu."),this.app.graphicsDevice.canvas.focus()}begin(e=.55){var t,i;if(this.dialoguePan=null,(t=this.ui.audio)==null||t.say("begin"),(i=this.basket)==null||i.reset(!1),this.net.cancel(),this.spawn.clear(),this.spawn.spawn)for(let s=0;s<5;s++){const a=this.spawn.spawn(),n=this.river.restingPoint(a.radius,s,this.camera.getPosition());a.restGoal=n,a.position.set(n.x,this.level.waterY-.48,n.z),a.approach=!1,a.travelPhase="rest",a.mode="rest",a.rest=6+s*.7,a.route=null}this.score.reset(),this.state.time=180,this.state.set("READY"),this.readyTime=2.5,this.spawn.difficulty=e,this.paused=!1,this.ui.hide(),this.npc.work(),this.requestLock(),document.getElementById("objective").textContent="5 adults · 1,000 points · let young fish pass",this.ui.message("Walk along the bank. Dip in open water, away from rocks.")}cancelDialogue(){this.state.set("EXPLORE"),this.ui.hide(),this.npc.idle(),this.requestLock()}resume(){var e,t;if(this.state.state==="EXITED"){this.paused=!1,this.ui.exitScreen(()=>this.reset());return}if(this.paused=!1,this.npc.animation&&(this.npc.animation.component.speed=1),this.state.state==="DIALOGUE"){this.npc.talk(),(t=(e=this.npc).facePlayer)==null||t.call(e,this.camera.getPosition(),this.options.anchorEntity,10,this.level.elderFacingOffset??0),this.ui.intro(i=>this.begin(i),()=>this.cancelDialogue());return}if(this.state.state==="SUMMARY"&&this.summaryResult){this.ui.summary(this.summaryResult,()=>this.begin(this.spawn.difficulty),()=>{this.dialoguePan=null,this.state.set("EXPLORE"),this.npc.idle(),this.ui.hide(),this.requestLock()});return}this.ui.hide(),this.requestLock()}pause(e=!1){var i;if(this.settingsMenu&&!e){this.settingsMenu.open();return}this.paused=!0,this.keys.clear(),this.net.submerged=!1,this.net.lift=0,this.net.scoopLock=null,this.npc.animation&&(this.npc.animation.component.speed=0),(i=document.exitPointerLock)==null||i.call(document);const t={resume:()=>this.resume(),reset:()=>this.reset(),retry:()=>{this.npc.animation&&(this.npc.animation.component.speed=1),this.begin(this.spawn.difficulty)},exit:()=>this.exit()};this.ui.pauseMenu(t,e)}exit(){var e,t;(e=this.basket)==null||e.reset(!0),this.net.cancel(),this.net.enabled=!1,this.spawn.clear(),this.keys.clear(),this.state.set("EXITED"),this.paused=!1,this.npc.idle(),this.npc.animation&&(this.npc.animation.component.speed=1),(t=document.exitPointerLock)==null||t.call(document),this.ui.exitScreen(()=>this.reset()),document.getElementById("objective").textContent="Experience ended"}releaseCargo(){this.net.releaseIntentional(),this.ui.message("Returning the fish to the water…")}confirmRelease(e){e.species.id==="smolt"&&!e.releasedByPlayer?(e.releasedByPlayer=!0,this.score.release(),this.ui.message("Juvenile released safely · +75 stewardship")):this.ui.message("Fish released safely back into the river.")}popup(e,t,i){const s=this.camera.camera.worldToScreen(e.position);s.z>0&&this.ui.popup(t,F.clamp(s.x,120,innerWidth-120),F.clamp(s.y,170,innerHeight-130),i)}interact(){var i,s,a,n,l,r,c,h,p,d,u,f,m,v;if(this.paused||!this.ui.modal.hidden)return;if((i=this.net.trapped)!=null&&i.length){this.net.deposit();return}const e=this.camera.getPosition(),t=this.level.elder;if(Math.hypot(e.x-t[0],e.z-t[2])>(this.level.interactionRadius??1.8)){this.ui.message("Walk closer to the elder, then press E.");return}if(this.state.state==="EXPLORE")this.state.set("DIALOGUE"),(s=this.mobile)!=null&&s.enabled&&innerWidth>innerHeight&&(this.dialoguePan={time:0,origin:this.camera.getPosition().clone(),start:this.camera.getRotation().clone()}),this.npc.talk(),(n=(a=this.npc).facePlayer)==null||n.call(a,this.camera.getPosition(),this.options.anchorEntity,10,this.level.elderFacingOffset??0),this.keys.clear(),(l=document.exitPointerLock)==null||l.call(document),this.ui.intro(g=>this.begin(g),()=>this.cancelDialogue());else if(this.state.state==="RETURN"){this.state.set("SUMMARY"),this.dialoguePan={time:0,origin:((c=(r=this.camera.getPosition()).clone)==null?void 0:c.call(r))??new _(e.x,e.y,e.z),start:((p=(h=this.camera).getRotation)==null?void 0:p.call(h).clone())??new q},this.net.cancel(),this.npc.talk(),(u=(d=this.npc).facePlayer)==null||u.call(d,this.camera.getPosition(),this.options.anchorEntity,10,this.level.elderFacingOffset??0),(f=document.exitPointerLock)==null||f.call(document);const g=this.score.result();this.summaryResult=g,this.ui.summary(g,()=>this.begin(this.spawn.difficulty),()=>{this.dialoguePan=null,this.state.set("EXPLORE"),this.npc.idle(),this.ui.hide(),this.requestLock()}),(v=(m=this.options).onComplete)==null||v.call(m,g)}}toggleDebug(){this.debug=!this.debug;for(const e of this.options.debugEntities||[])e.enabled=this.debug;this.ui.message(this.debug?"Collision and river guides shown":"Guides hidden")}walk(e){var m,v,g,w,E,k,x;const t=this.camera.getPosition().clone(),i=this.keys.has("ControlLeft")||this.keys.has("ControlRight")?.95:this.keys.has("ShiftLeft")?2.7:1.8,s=this.yaw*Math.PI/180;let a=((m=this.mobileInput)==null?void 0:m.axes.x)??0,n=((v=this.mobileInput)==null?void 0:v.axes.z)??0;this.keys.has("KeyW")&&n--,this.keys.has("KeyS")&&n++,this.keys.has("KeyA")&&a--,this.keys.has("KeyD")&&a++;const l=Math.max(1,Math.hypot(a,n)),r=t.clone();r.x+=(a*Math.cos(s)+n*Math.sin(s))/l*i*e,r.z+=(-a*Math.sin(s)+n*Math.cos(s))/l*i*e,this.navigation??(this.navigation=new xe(this.level));const c=this.navigation.move(t,r.x-t.x,r.z-t.z,{jumpHeight:((g=this.motion)==null?void 0:g.offset)??0});r.x=c.x,r.z=c.z;const h=this.level.elder,p=(((w=this.obstacles)==null?void 0:w.elder.radius)??.62)+((k=(E=this.net)==null?void 0:E.trapped)!=null&&k.length||(x=this.basket)!=null&&x.carried?.62:.18),d=Math.hypot(t.x-h[0],t.z-h[2]),u=(b,M)=>{var A;return(Math.hypot(b-h[0],M-h[2])>p||d<p&&Math.hypot(b-h[0],M-h[2])>d+1e-5)&&(!((A=this.basket)!=null&&A.blocksPlayer(b,M))||Math.hypot(t.x-this.basket.volume.x,t.z-this.basket.volume.z)<.48&&Math.hypot(b-this.basket.volume.x,M-this.basket.volume.z)>Math.hypot(t.x-this.basket.volume.x,t.z-this.basket.volume.z)+1e-5)};u(r.x,r.z)?(t.x=r.x,t.z=r.z):u(r.x,t.z)&&this.navigation.sample(r.x,t.z)!==null?t.x=r.x:u(t.x,r.z)&&this.navigation.sample(t.x,r.z)!==null&&(t.z=r.z),this.motion??(this.motion=new Le);const f=this.motion.update(e,this.keys);t.y=F.lerp(t.y,(this.navigation.sample(t.x,t.z)??c.ground)+f,1-Math.exp(-e*14))+(a||n?Math.sin(performance.now()*.008)*.002:0),this.camera.setPosition(t),this.keys.has("ArrowLeft")&&(this.yaw+=e*75),this.keys.has("ArrowRight")&&(this.yaw-=e*75),this.keys.has("ArrowUp")&&(this.pitch=F.clamp(this.pitch+e*55,-78,55)),this.keys.has("ArrowDown")&&(this.pitch=F.clamp(this.pitch-e*55,-78,55)),this.camera.setEulerAngles(this.pitch,this.yaw,0)}update(e){var n,l,r,c,h,p;if(e=Math.min(e,.05),this.dialoguePan){const d=this.level.elder,u=new _(d[0]+.45,d[1]+1.65,d[2]+1.65),f=u,m=Ze({position:[f.x,f.y,f.z],target:[d[0],d[1]+1.25,d[2]]}),v=new q().setFromMat4(new X().setLookAt(f,new _(...m.target),_.UP));this.dialoguePan.time=Math.min(1,this.dialoguePan.time+e/1.1);const g=this.dialoguePan.time*this.dialoguePan.time*(3-2*this.dialoguePan.time);this.camera.setPosition(new _().lerp(this.dialoguePan.origin,u,g)),this.camera.setRotation(new q().slerp(this.dialoguePan.start,v,g));const w=this.camera.getEulerAngles();this.pitch=w.x,this.yaw=w.y}if(!this.paused&&this.ui.modal.hidden&&this.state.state!=="EXITED"){if((n=this.obstacles)==null||n.update(),this.walk(e),(l=this.basket)==null||l.update(this.camera),(c=(r=this.npc).facePlayer)==null||c.call(r,this.camera.getPosition(),this.options.anchorEntity,e,this.level.elderFacingOffset??0),this.state.state==="READY"&&(this.readyTime-=e)<=0&&(this.state.set("PLAYING"),this.net.enabled=!0,this.ui.message("FISH! Hold to dip, release to lift.")),this.state.state==="PLAYING"&&(this.spawn.update(e,this.net),this.state.update(e))){this.net.submerged=!1,this.net.enabled=!1;for(const d of[...this.spawn.fish])d.mode!=="net"&&d.mode!=="banked"&&d.mode!=="airborne"&&this.spawn.remove(d);this.ui.returnPrompt(this.score.result())}this.state.state==="RETURN"&&this.spawn.update(e,this.net,!1),this.net.update(e,this.spawn.fish,this.locked||!!this.mobileInput),(h=this.basket)==null||h.updatePile(e)}this.ui.update(this),(p=this.mobile)==null||p.update();const t=this.net.trapped.length>0,i=t?new _(this.net.basket.x,this.net.basket.rimY+.5,this.net.basket.z):new _(...this.level.elder);t||(i.y+=1.9);const s=this.camera.camera.worldToScreen(i),a=document.getElementById("elder-marker");a.style.left=F.clamp(s.x,60,innerWidth-70)+"px",a.style.top=F.clamp(s.y,140,innerHeight-100)+"px",a.innerHTML=t?"BASKET · E TO TIP <span>◆</span>":"ELDER <span>◆</span>",a.hidden=!t&&!["EXPLORE","RETURN"].includes(this.state.state)||s.z<0}destroy(){var e,t;(e=this.mobile)==null||e.destroy(),this.app.off("update",this.updateBound);for(const i of this.handlers)i();this.spawn.destroy(),this.net.destroy(),this.camera.setPosition(this.previousCamera.position),this.camera.setRotation(this.previousCamera.rotation),(t=document.exitPointerLock)==null||t.call(document),this.ui.destroy()}}function Li(o,e){const t=[],i=[];for(let s=0;s<o.height;s++)for(let a=0;a<o.width;a++){const n=o.heights[s*o.width+a];if(n===null)continue;const l=o.minX+a*o.cell,r=o.minZ+s*o.cell,c=o.cell,h=t.length/3;t.push(l,e,r,l+c,e,r,l+c,e,r+c,l,e,r+c,l,n,r,l+c,n,r,l+c,n,r+c,l,n,r+c);for(const[p,d,u,f]of[[4,7,6,5],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]])i.push(h+p,h+d,h+u,h+p,h+u,h+f)}return{positions:t,indices:i}}const Oe=(o,e,t)=>{const i=Math.max(0,Math.min(1,(t-o)/(e-o)));return i*i*(3-2*i)};function Fi(o,e,t){const i=t.water.polygon;if(!be(o,e,i))return 0;let s=1/0;for(let c=0;c<i.length;c++){const h=i[c],p=i[(c+1)%i.length],d=p[0]-h[0],u=p[1]-h[1],f=Math.max(0,Math.min(1,((o-h[0])*d+(e-h[1])*u)/(d*d+u*u)));s=Math.min(s,Math.hypot(o-h[0]-d*f,e-h[1]-u*f))}const a=t.rockGrid,n=Math.floor((o-a.minX)/a.cell),l=Math.floor((e-a.minZ)/a.cell);let r=.65;for(let c=l-3;c<=l+3;c++)for(let h=n-3;h<=n+3;h++){if(h<0||c<0||h>=a.width||c>=a.height||a.heights[c*a.width+h]===null)continue;const p=a.minX+h*a.cell,d=a.minZ+c*a.cell;r=Math.min(r,Math.hypot(o-Math.max(p,Math.min(p+a.cell,o)),e-Math.max(d,Math.min(d+a.cell,e))))}return Oe(0,.75,s)*Oe(0,.45,r)}function Di(o,e=256){const t=o.rockGrid,i=Math.min(t.minX,...o.water.polygon.map(r=>r[0])),s=Math.min(t.minZ,...o.water.polygon.map(r=>r[1])),a=Math.max(t.minX+t.width*t.cell,...o.water.polygon.map(r=>r[0]))-i,n=Math.max(t.minZ+t.height*t.cell,...o.water.polygon.map(r=>r[1]))-s,l=new Uint8Array(e*e*4);for(let r=0;r<e;r++)for(let c=0;c<e;c++){const h=Fi(i+(c+.5)/e*a,s+(r+.5)/e*n,o),p=(r*e+c)*4,d=Math.round(h*255);l[p]=l[p+1]=l[p+2]=d,l[p+3]=255}return{pixels:l,size:e,bounds:[i,s,a,n]}}const Ii={GAUSSIAN:"gaussian"},ye=new X,Be=new _,J=new _,ve=new zt,Ue=new _,H=new _,qe=new X,He=new X;class ct extends $e{constructor(){super(...arguments);y(this,"sceneCameraEntity",null);y(this,"mode","reflection");y(this,"scale",.5);y(this,"mipmaps",!1);y(this,"mipmapFilter",Ii.GAUSSIAN);y(this,"depth",!0);y(this,"hdr",!1);y(this,"planePoint",new _);y(this,"planeNormal",new _(0,1,0));y(this,"obliqueClipping",!0);y(this,"clipBias",.05);y(this,"_texture",null);y(this,"_viewSpaceClipPlane",[0,0,0,0]);y(this,"_viewProjectionMatrix",new X);y(this,"_ldrColorSettings",null)}get viewProjectionMatrix(){return this._viewProjectionMatrix}initialize(){var a;if(!((a=this.sceneCameraEntity)==null?void 0:a.camera)){console.error("PlanarRenderer script requires sceneCameraEntity attribute to be set.");return}const i=this.entity.camera;if(!i){console.error("PlanarRenderer script requires a camera component on the same entity.");return}const s=this.app.scene.on("postrender",n=>{i===n&&this.entity.fire("onPlanarPostRender")});this.on("destroy",()=>{s.off(),i.calculateProjection=null,this._updateColorSettings(!1),this._destroyRenderTarget()})}_updateColorSettings(t){const i=this.entity.camera;i&&(t&&!this._ldrColorSettings?(this._ldrColorSettings={toneMapping:i.toneMapping,gammaCorrection:i.gammaCorrection},i.toneMapping=xt,i.gammaCorrection=bt):!t&&this._ldrColorSettings&&(i.toneMapping=this._ldrColorSettings.toneMapping,i.gammaCorrection=this._ldrColorSettings.gammaCorrection,this._ldrColorSettings=null))}_destroyRenderTarget(){const t=this.entity.camera;t!=null&&t.renderTarget&&(t.renderTarget.destroy(),t.renderTarget=null),this._texture&&(this._texture.destroy(),this._texture=null)}updateRenderTarget(){var p,d,u;const t=this.sceneCameraEntity.camera,i=this.app.graphicsDevice,s=((p=t.renderTarget)==null?void 0:p.width)??i.width,a=((d=t.renderTarget)==null?void 0:d.height)??i.height,n=Math.min(Math.floor(s*this.scale),i.maxTextureSize),l=Math.min(Math.floor(a*this.scale),i.maxTextureSize),r=this.hdr&&i.textureHalfFloatRenderable?Ae:St,c=this.entity.camera,h=c.renderTarget;(!h||h.width!==n||h.height!==l||((u=this._texture)==null?void 0:u.format)!==r)&&(this._destroyRenderTarget(),this._texture=new ze(i,{name:`${this.entity.name}:PlanarRenderer`,width:n,height:l,format:r,mipmaps:this.mipmaps,addressU:ae,addressV:ae,minFilter:this.mipmaps?Et:oe,magFilter:oe}),c.renderTarget=new kt({colorBuffer:this._texture,depth:this.depth}),this._updateColorSettings(r===Ae)),this._texture.mipmapFilter=this.mipmapFilter}_calculateProjection(t){const i=this.entity.camera,s=i.renderTarget,a=s?s.width/s.height:1;if(t.setPerspective(i.fov,a,i.nearClip,i.farClip,i.horizontalFov),!this.obliqueClipping)return;const[n,l,r,c]=this._viewSpaceClipPlane,h=t.data,p=(Math.sign(n)+h[8])/h[0],d=(Math.sign(l)+h[9])/h[5],u=-1,f=(1+h[10])/h[14],m=2/(n*p+l*d+r*u+c*f);h[2]=n*m,h[6]=l*m,h[10]=r*m+1,h[14]=c*m}_updateViewSpaceClipPlane(){H.copy(this.planeNormal).normalize(),this.mode!=="reflection"&&H.mulScalar(-1),Ue.copy(H).mulScalar(-this.clipBias).add(this.planePoint);const t=-H.dot(Ue),i=this.entity.getWorldTransform().data,s=H.x,a=H.y,n=H.z,l=this._viewSpaceClipPlane;l[0]=i[0]*s+i[1]*a+i[2]*n,l[1]=i[4]*s+i[5]*a+i[6]*n,l[2]=i[8]*s+i[9]*a+i[10]*n,l[3]=i[12]*s+i[13]*a+i[14]*n+t,l[3]>0&&(l[0]=-l[0],l[1]=-l[1],l[2]=-l[2],l[3]=-l[3])}frameUpdate(){const t=this.entity.camera,i=this.sceneCameraEntity;if(!t||!(i!=null&&i.camera))return null;if(this.updateRenderTarget(),t.enabled){const s=i.getPosition();this.mode==="reflection"?(ve.setFromPointNormal(this.planePoint,this.planeNormal),ye.setReflection(ve.normal,ve.distance),ye.transformPoint(s,Be),J.copy(s).add(i.forward),ye.transformPoint(J,J),this.entity.setPosition(Be),this.entity.lookAt(J)):(this.entity.setPosition(s),this.entity.setRotation(i.getRotation()));const a=i.camera;return t.fov=a.fov,t.horizontalFov=a.horizontalFov,t.orthoHeight=a.orthoHeight,t.nearClip=a.nearClip,t.farClip=a.farClip,t.aperture=a.aperture,t.sensitivity=a.sensitivity,t.shutter=a.shutter,t.jitter=a.jitter,this.obliqueClipping?(this._updateViewSpaceClipPlane(),t.calculateProjection||(t.calculateProjection=(n,l)=>this._calculateProjection(n))):t.calculateProjection=null,this._calculateProjection(qe),He.copy(this.entity.getWorldTransform()).invert(),this._viewProjectionMatrix.mul2(qe,He),this._texture}return null}}y(ct,"scriptName","planarRenderer");const Ve=new WeakSet;function Ni(o){if(Ve.has(o))return;Ve.add(o);const e=Te.get(o,At);e.set("fogPS",`
        float dBlendModeFogFactor = 1.0;

        #if (FOG != NONE)
            uniform vec3 fog_color;

            #if (FOG == LINEAR)
                uniform float fog_start;
                uniform float fog_end;
            #else
                uniform float fog_density;
            #endif
        #endif

        #ifdef WATER_HEIGHT_FOG
            uniform float waterFogLevel;
        #endif

        #ifdef VERTEXSHADER
            float getFogFactor(float depth) {
        #else
            float getFogFactor() {
                float depth = gl_FragCoord.z / gl_FragCoord.w;
        #endif

            float fogFactor = 0.0;

            #if (FOG == LINEAR)
                fogFactor = (fog_end - depth) / (fog_end - fog_start);
            #elif (FOG == EXP)
                fogFactor = exp(-depth * fog_density);
            #elif (FOG == EXP2)
                fogFactor = exp(-depth * depth * fog_density * fog_density);
            #endif

            return clamp(fogFactor, 0.0, 1.0);
        }

        #ifdef VERTEXSHADER
            vec3 addFog(vec3 color, float depth) {
                #if (FOG != NONE)
                    return mix(fog_color * dBlendModeFogFactor, color, getFogFactor(depth));
                #endif
                return color;
            }
        #else
            vec3 addFog(vec3 color) {
                #if (FOG != NONE)
                    float fogFactor = getFogFactor();
                    #ifdef WATER_HEIGHT_FOG
                        // no fog above the water level, soft blend across the waterline
                        float below = clamp((waterFogLevel - vPositionW.y) * 4.0, 0.0, 1.0);
                        fogFactor = mix(1.0, fogFactor, below);
                    #endif
                    return mix(fog_color * dBlendModeFogFactor, color, fogFactor);
                #endif
                return color;
            }
        #endif
    `),e.set("litUserDeclarationPS",`
        #if defined(WATER_CAUSTICS) && !defined(SHADOW_PASS) && !defined(PICK_PASS) && !defined(PREPASS_PASS)
            uniform float waterLevel;
            uniform sampler2D waterCausticsMap;
            uniform vec4 waterCausticsParams; // x: tiling, y: speed, z: strength, w: fade depth
            uniform vec3 waterCausticsColor;
            uniform float waterTime;
        #endif
    `),e.set("litUserMainEndPS",`
        #if defined(WATER_CAUSTICS) && !defined(SHADOW_PASS) && !defined(PICK_PASS) && !defined(PREPASS_PASS)
        {
            float depthBelow = waterLevel - vPositionW.y;
            if (depthBelow > 0.0) {
                vec2 cuv = vPositionW.xz * waterCausticsParams.x;
                float ct = waterTime * waterCausticsParams.y;
                float ca = texture2D(waterCausticsMap, cuv + vec2(ct, ct * 0.8)).x;
                float cb = texture2D(waterCausticsMap, cuv * 1.37 + vec2(-ct * 1.1, ct * 0.9)).y;
                float caustic = pow(clamp((ca + cb) * 0.5 * 2.2 - 0.9, 0.0, 1.0), 2.0);

                // fade in just below the waterline, fade out with depth, favor up-facing surfaces
                float gate = exp(-depthBelow / waterCausticsParams.w) * min(depthBelow * 4.0, 1.0);
                gate *= clamp(litArgs_worldNormal.y, 0.0, 1.0);
                gl_FragColor.rgb *= vec3(1.0) + waterCausticsColor * (caustic * waterCausticsParams.z * gate);
            }
        }
        #endif
    `);const t=Te.get(o,Rt);t.set("fogPS",`
        #include "fogMathPS"

        var<private> dBlendModeFogFactor : f32 = 1.0;

        #if (FOG != NONE)
            uniform fog_color : vec3f;

            #if (FOG == LINEAR)
                uniform fog_start : f32;
                uniform fog_end : f32;
            #else
                uniform fog_density : f32;
            #endif
        #endif

        #ifdef WATER_HEIGHT_FOG
            uniform waterFogLevel : f32;
        #endif

        #ifdef VERTEXSHADER
            fn getFogFactor(depth: f32) -> f32 {
        #else
            fn getFogFactor() -> f32 {
                let depth = pcPosition.z / pcPosition.w;
        #endif

            #if (FOG == LINEAR)
                return evaluateFogFactorLinear(depth, uniform.fog_start, uniform.fog_end);
            #elif (FOG == EXP)
                return evaluateFogFactorExp(depth, uniform.fog_density);
            #elif (FOG == EXP2)
                return evaluateFogFactorExp2(depth, uniform.fog_density);
            #else
                return 1.0;
            #endif
        }

        #ifdef VERTEXSHADER
            fn addFog(color: vec3f, depth: f32) -> vec3f {
                #if (FOG != NONE)
                    return mix(uniform.fog_color * dBlendModeFogFactor, color, getFogFactor(depth));
                #else
                    return color;
                #endif
            }
        #else
            fn addFog(color: vec3f) -> vec3f {
                #if (FOG != NONE)
                    var fogFactor = getFogFactor();
                    #ifdef WATER_HEIGHT_FOG
                        // no fog above the water level, soft blend across the waterline
                        let below = clamp((uniform.waterFogLevel - vPositionW.y) * 4.0, 0.0, 1.0);
                        fogFactor = mix(1.0, fogFactor, below);
                    #endif
                    return mix(uniform.fog_color * dBlendModeFogFactor, color, fogFactor);
                #else
                    return color;
                #endif
            }
        #endif
    `),t.set("litUserDeclarationPS",`
        #if defined(WATER_CAUSTICS) && !defined(SHADOW_PASS) && !defined(PICK_PASS) && !defined(PREPASS_PASS)
            uniform waterLevel : f32;
            var waterCausticsMap : texture_2d<f32>;
            var waterCausticsMapSampler : sampler;
            uniform waterCausticsParams : vec4f; // x: tiling, y: speed, z: strength, w: fade depth
            uniform waterCausticsColor : vec3f;
            uniform waterTime : f32;
        #endif
    `),t.set("litUserMainEndPS",`
        #if defined(WATER_CAUSTICS) && !defined(SHADOW_PASS) && !defined(PICK_PASS) && !defined(PREPASS_PASS)
        {
            // no branch here - textureSample requires uniform control flow in WGSL
            let depthBelow: f32 = uniform.waterLevel - vPositionW.y;
            let cuv: vec2f = vPositionW.xz * uniform.waterCausticsParams.x;
            let ct: f32 = uniform.waterTime * uniform.waterCausticsParams.y;
            let ca: f32 = textureSample(waterCausticsMap, waterCausticsMapSampler, cuv + vec2f(ct, ct * 0.8)).x;
            let cb: f32 = textureSample(waterCausticsMap, waterCausticsMapSampler, cuv * 1.37 + vec2f(-ct * 1.1, ct * 0.9)).y;
            let caustic: f32 = pow(clamp((ca + cb) * 0.5 * 2.2 - 0.9, 0.0, 1.0), 2.0);

            // fade in just below the waterline, fade out with depth, favor up-facing surfaces
            var gate: f32 = exp(-max(depthBelow, 0.0) / uniform.waterCausticsParams.w) * clamp(depthBelow * 4.0, 0.0, 1.0);
            gate *= clamp(litArgs_worldNormal.y, 0.0, 1.0);
            output.color = vec4f(output.color.rgb * (vec3f(1.0) + uniform.waterCausticsColor * (caustic * uniform.waterCausticsParams.z * gate)), output.color.a);
        }
        #endif
    `)}const Wi=new _,ee=new L,dt=`
    #ifdef WATER_WAVES
        uniform vec4 uWaveParams;  // x: amplitude, y: frequency, z: speed, w: steepness
        uniform vec2 uWaveDir;
        uniform vec4 uSwellParams; // x: amplitude, y: frequency, z: speed, w: steepness
        uniform vec2 uSwellDir;
        uniform float uTime;

        // per wave octave: x: direction angle offset (rad), y: amplitude mult, z: frequency mult,
        // w: speed mult. Irrational-ish frequency ratios and irregular directions and phases avoid
        // a visible repeating interference pattern.
        const int CHOP_COUNT = 3;
        const vec4 CHOP_OCTAVES[CHOP_COUNT] = vec4[CHOP_COUNT](
            vec4( 0.00, 1.00, 1.00, 1.00),
            vec4( 0.41, 0.55, 1.73, 0.87),
            vec4(-0.87, 0.32, 2.61, 0.79)
        );
        const int SWELL_COUNT = 2;
        const vec4 SWELL_OCTAVES[SWELL_COUNT] = vec4[SWELL_COUNT](
            vec4( 0.00, 1.00, 1.00, 1.00),
            vec4(-0.51, 0.65, 0.63, 1.13)
        );

        vec2 waveRotate(vec2 v, float a) {
            float c = cos(a);
            float s = sin(a);
            return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
        }

        // slowly varying spatial amplitude envelope, different per octave - stops the wave field
        // from looking uniform and repeating over large distances
        float waveEnvelope(vec2 p, vec2 dir, float freq, float seed) {
            vec2 envDir = waveRotate(dir, 1.07);
            return 0.55 + 0.45 * sin(freq * 0.17 * dot(envDir, p) + seed * 4.7);
        }

        vec3 gerstnerDisplace(vec2 p, vec4 octave, vec4 params, vec2 mainDir, float seed) {
            vec2 dir = waveRotate(mainDir, octave.x);
            float freq = params.y * octave.z;
            float amp = params.x * octave.y * waveEnvelope(p, dir, freq, seed);
            float th = freq * dot(dir, p) + params.z * octave.w * freq * uTime + seed * 2.3;
            return vec3(dir.x * params.w * amp * cos(th), amp * sin(th), dir.y * params.w * amp * cos(th));
        }

        // the share of a wave of the given frequency kept at the footprint of a pixel on the water,
        // in world units - a wave shorter than about two pixels aliases into flicker, so it fades
        // out from eight pixels per wave length
        float waveKeep(float freq, float footprint) {
            return 1.0 - smoothstep(0.125, 0.5, footprint * freq * 0.15915494);
        }

        // the normal of a wave, faded out by its share kept at the footprint - the mean square of
        // the slopes faded out is added to the variance
        vec3 gerstnerNormal(vec2 p, vec4 octave, vec4 params, vec2 mainDir, float seed, float footprint, inout float variance) {
            vec2 dir = waveRotate(mainDir, octave.x);
            float freq = params.y * octave.z;
            float amp = params.x * octave.y * waveEnvelope(p, dir, freq, seed);
            float keep = waveKeep(freq, footprint);
            float slope = freq * amp;
            variance += 0.5 * slope * slope * (1.0 - keep * keep);
            amp *= keep;
            float th = freq * dot(dir, p) + params.z * octave.w * freq * uTime + seed * 2.3;
            return vec3(-dir.x * freq * amp * cos(th), -params.w * freq * amp * sin(th), -dir.y * freq * amp * cos(th));
        }

        vec3 waveDisplacement(vec2 p) {
            vec3 d = vec3(0.0);
            for (int i = 0; i < CHOP_COUNT; i++) {
                d += gerstnerDisplace(p, CHOP_OCTAVES[i], uWaveParams, uWaveDir, float(i));
            }
            for (int i = 0; i < SWELL_COUNT; i++) {
                d += gerstnerDisplace(p, SWELL_OCTAVES[i], uSwellParams, uSwellDir, float(i) + 5.0);
            }
            return d;
        }

        // the normal of the waves, with the waves shorter than the footprint of a pixel faded out,
        // and the variance of their slopes, which roughens the surface instead
        vec3 waveNormal(vec2 p, float footprint, out float variance) {
            variance = 0.0;
            vec3 n = vec3(0.0, 1.0, 0.0);
            for (int i = 0; i < CHOP_COUNT; i++) {
                n += gerstnerNormal(p, CHOP_OCTAVES[i], uWaveParams, uWaveDir, float(i), footprint, variance);
            }
            for (int i = 0; i < SWELL_COUNT; i++) {
                n += gerstnerNormal(p, SWELL_OCTAVES[i], uSwellParams, uSwellDir, float(i) + 5.0, footprint, variance);
            }
            return n;
        }
    #endif
`,ut=`
    #ifdef WATER_WAVES
        uniform uWaveParams: vec4f;  // x: amplitude, y: frequency, z: speed, w: steepness
        uniform uWaveDir: vec2f;
        uniform uSwellParams: vec4f; // x: amplitude, y: frequency, z: speed, w: steepness
        uniform uSwellDir: vec2f;
        uniform uTime: f32;

        // per wave octave: x: direction angle offset (rad), y: amplitude mult, z: frequency mult,
        // w: speed mult. Irrational-ish frequency ratios and irregular directions and phases avoid
        // a visible repeating interference pattern.
        const CHOP_COUNT: i32 = 3;
        const CHOP_OCTAVES = array<vec4f, 3>(
            vec4f( 0.00, 1.00, 1.00, 1.00),
            vec4f( 0.41, 0.55, 1.73, 0.87),
            vec4f(-0.87, 0.32, 2.61, 0.79)
        );
        const SWELL_COUNT: i32 = 2;
        const SWELL_OCTAVES = array<vec4f, 2>(
            vec4f( 0.00, 1.00, 1.00, 1.00),
            vec4f(-0.51, 0.65, 0.63, 1.13)
        );

        fn waveRotate(v: vec2f, a: f32) -> vec2f {
            let c: f32 = cos(a);
            let s: f32 = sin(a);
            return vec2f(c * v.x - s * v.y, s * v.x + c * v.y);
        }

        // slowly varying spatial amplitude envelope, different per octave - stops the wave field
        // from looking uniform and repeating over large distances
        fn waveEnvelope(p: vec2f, dir: vec2f, freq: f32, seed: f32) -> f32 {
            let envDir: vec2f = waveRotate(dir, 1.07);
            return 0.55 + 0.45 * sin(freq * 0.17 * dot(envDir, p) + seed * 4.7);
        }

        fn gerstnerDisplace(p: vec2f, octave: vec4f, params: vec4f, mainDir: vec2f, seed: f32) -> vec3f {
            let dir: vec2f = waveRotate(mainDir, octave.x);
            let freq: f32 = params.y * octave.z;
            let amp: f32 = params.x * octave.y * waveEnvelope(p, dir, freq, seed);
            let th: f32 = freq * dot(dir, p) + params.z * octave.w * freq * uniform.uTime + seed * 2.3;
            return vec3f(dir.x * params.w * amp * cos(th), amp * sin(th), dir.y * params.w * amp * cos(th));
        }

        fn waveKeep(freq: f32, footprint: f32) -> f32 {
            return 1.0 - smoothstep(0.125, 0.5, footprint * freq * 0.15915494);
        }

        fn gerstnerNormal(p: vec2f, octave: vec4f, params: vec4f, mainDir: vec2f, seed: f32, footprint: f32, variance: ptr<function, f32>) -> vec3f {
            let dir: vec2f = waveRotate(mainDir, octave.x);
            let freq: f32 = params.y * octave.z;
            let keep: f32 = waveKeep(freq, footprint);
            let fullAmp: f32 = params.x * octave.y * waveEnvelope(p, dir, freq, seed);
            let slope: f32 = freq * fullAmp;
            *variance = *variance + 0.5 * slope * slope * (1.0 - keep * keep);
            let amp: f32 = fullAmp * keep;
            let th: f32 = freq * dot(dir, p) + params.z * octave.w * freq * uniform.uTime + seed * 2.3;
            return vec3f(-dir.x * freq * amp * cos(th), -params.w * freq * amp * sin(th), -dir.y * freq * amp * cos(th));
        }

        fn waveDisplacement(p: vec2f) -> vec3f {
            var d: vec3f = vec3f(0.0);
            for (var i: i32 = 0; i < CHOP_COUNT; i++) {
                d += gerstnerDisplace(p, CHOP_OCTAVES[i], uniform.uWaveParams, uniform.uWaveDir, f32(i));
            }
            for (var i: i32 = 0; i < SWELL_COUNT; i++) {
                d += gerstnerDisplace(p, SWELL_OCTAVES[i], uniform.uSwellParams, uniform.uSwellDir, f32(i) + 5.0);
            }
            return d;
        }

        fn waveNormal(p: vec2f, footprint: f32, variance: ptr<function, f32>) -> vec3f {
            *variance = 0.0;
            var n: vec3f = vec3f(0.0, 1.0, 0.0);
            for (var i: i32 = 0; i < CHOP_COUNT; i++) {
                n += gerstnerNormal(p, CHOP_OCTAVES[i], uniform.uWaveParams, uniform.uWaveDir, f32(i), footprint, variance);
            }
            for (var i: i32 = 0; i < SWELL_COUNT; i++) {
                n += gerstnerNormal(p, SWELL_OCTAVES[i], uniform.uSwellParams, uniform.uSwellDir, f32(i) + 5.0, footprint, variance);
            }
            return n;
        }
    #endif
`,Oi=`
    #ifdef WATER_DEPTH_EFFECTS
        #include "screenDepthPS"
    #endif

    attribute vec3 vertex_position;

    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;

    varying vec3 vWorldPos;
    varying vec4 vScreenPos;
    #ifdef WATER_WAVES
        varying vec2 vWavePos;
    #endif
    #ifdef WATER_DEPTH_EFFECTS
        varying float vViewDepth;
    #endif

    ${dt}

    void main(void) {
        vec4 worldPos = matrix_model * vec4(vertex_position, 1.0);

        #ifdef WATER_WAVES
            vWavePos = worldPos.xz;
            worldPos.xyz += waveDisplacement(worldPos.xz);
        #endif

        vWorldPos = worldPos.xyz;

        vec4 projPos = matrix_viewProjection * worldPos;
        gl_Position = projPos;
        vScreenPos = projPos;

        #ifdef WATER_DEPTH_EFFECTS
            vViewDepth = getLinearDepth(worldPos.xyz);
        #endif
    }
`,Bi=`
    #include "gammaPS"
    #ifdef WATER_DEPTH_EFFECTS
        #include "screenDepthPS"
    #endif
    #ifdef WATER_REFLECTION_SKY
        #include "decodePS"
        #include "envAtlasPS"
        #include "sphericalPS"
    #endif

    #ifndef SCREENSIZE
        #define SCREENSIZE
        uniform vec4 screen_size;
    #endif

    uniform sampler2D uNormalMap;
    #ifdef WATER_REFLECTION_PLANAR
        uniform sampler2D uReflectionMap;
    #endif
    #ifdef WATER_REFLECTION_SKY
        uniform sampler2D texture_envAtlas;
        uniform float uSkyBlur;
    #endif
    #ifdef WATER_REFRACTION
        uniform sampler2D uRefractionMap;
    #endif

    uniform vec3 view_position;
    #ifndef WATER_WAVES
        uniform float uTime;
    #endif

    uniform vec3 uShallowColor;
    uniform vec3 uDeepColor;
    uniform vec3 uLightDir;
    uniform vec3 uLightColor;
    uniform float uRippleTiling;
    uniform float uRippleSpeed;
    uniform float uBumpiness;
    uniform float uDistortion;
    uniform float uFresnelPower;
    uniform float uReflectionStrength;
    uniform float uDepthFade;
    uniform float uShoreSoftness;
    uniform float uOpacity;
    uniform float uSpecularPower;
    uniform float uSpecularIntensity;
    uniform float uWaveFiltering;
    uniform float uDiffuseIntensity;
    uniform float uUnderwaterFogDensity;
    uniform vec3 uUnderwaterFogColor;
    uniform float uCameraBelow;
    uniform float uSnellWindow;
    #ifdef WATER_FOAM
        uniform vec3 uFoamColor;
        uniform float uFoamDepth;
    #endif

    varying vec3 vWorldPos;
    varying vec4 vScreenPos;
    #ifdef WATER_WAVES
        varying vec2 vWavePos;
    #endif
    #ifdef WATER_DEPTH_EFFECTS
        varying float vViewDepth;
    #endif

    ${dt}

    void main(void) {

        // two layers of scrolling detail normals, in tangent space of a horizontal plane. The
        // second layer is rotated, so the tiling of the two never lines up into a visible grid.
        vec2 baseUv = vWorldPos.xz * uRippleTiling;
        float st = uTime * uRippleSpeed;
        vec2 rotUv = vec2(0.79 * baseUv.x - 0.61 * baseUv.y, 0.61 * baseUv.x + 0.79 * baseUv.y);
        vec3 nm1 = texture2D(uNormalMap, baseUv + vec2(st, st * 0.7)).xyz * 2.0 - 1.0;
        vec3 nm2 = texture2D(uNormalMap, rotUv * 1.73 + vec2(-st * 0.8, st * 1.1)).xyz * 2.0 - 1.0;
        vec2 detail = (nm1.xy + nm2.xy) * 0.5 * uBumpiness;

        // combine with the geometry wave normal. The waves are filtered by the footprint of the
        // pixel on the water along its longer axis, which stretches far along the view toward the
        // horizon
        #ifdef WATER_WAVES
            float footprint = max(length(dFdx(vWavePos)), length(dFdy(vWavePos))) * uWaveFiltering;
            float slopeVariance;
            vec3 waveN = waveNormal(vWavePos, footprint, slopeVariance);
        #else
            vec3 waveN = vec3(0.0, 1.0, 0.0);
            float slopeVariance = 0.0;
        #endif
        vec3 N = normalize(vec3(waveN.x + detail.x, waveN.y, waveN.z + detail.y));

        vec3 V = normalize(view_position - vWorldPos);
        float NdotV = max(dot(N, V), 0.0);

        // screen uv to sample the planar textures. The refraction camera matches the main camera,
        // so its texture is sampled without a flip; the reflection camera is mirrored by the
        // water plane, which flips the image vertically.
        vec2 screenUV = gl_FragCoord.xy * screen_size.zw;
        vec2 refractionUV = screenUV + N.xz * uDistortion;
        vec2 reflectionUV = vec2(screenUV.x, 1.0 - screenUV.y) + N.xz * uDistortion;

        // sample the planar / sky reflection textures up front, before any divergent flow
        // (WGSL uniformity). Both the distorted and undistorted refraction samples are taken -
        // the undistorted one is the fallback when the distortion reaches past a silhouette
        // into above-water content
        #ifdef WATER_REFRACTION
            vec3 refrSample = texture2D(uRefractionMap, refractionUV).rgb;
            vec3 refrUndistorted = texture2D(uRefractionMap, screenUV).rgb;
        #else
            vec3 refrSample = uShallowColor;
        #endif
        vec3 reflSample = uDeepColor;
        #ifdef WATER_REFLECTION_PLANAR
            reflSample = texture2D(uReflectionMap, reflectionUV).rgb;
        #endif
        #ifdef WATER_REFLECTION_SKY
            vec3 R = reflect(-V, N);
            R.y = abs(R.y); // no scene below the horizon, mirror the sky instead
            vec2 skyUv = toSphericalUv(R * vec3(-1.0, 1.0, 1.0));
            float level = clamp(uSkyBlur, 0.0, 4.0);
            float ilevel = floor(level);
            vec3 skyA = decodeRGBP(texture2D(texture_envAtlas, mapRoughnessUv(skyUv, ilevel)));
            vec3 skyB = decodeRGBP(texture2D(texture_envAtlas, mapRoughnessUv(skyUv, ilevel + 1.0)));
            reflSample = mix(skyA, skyB, level - ilevel);
        #endif

        // surface seen from below: blend the above-water world (refraction texture, visible in
        // the Snell window overhead) with total internal reflection of the underwater scene
        // (reflection texture), and fade to the underwater fog color with distance. Selected by
        // the camera side rather than per pixel, as at grazing angles the perturbed normal can
        // flip against the view direction, causing speckles
        if (uCameraBelow > 0.5) {
            float NdotUp = max(dot(-N, V), 0.0);
            float windowCenter = 1.0 - uSnellWindow;
            float window = smoothstep(windowCenter - 0.07, windowCenter + 0.07, NdotUp);
            vec3 col = mix(reflSample, refrSample, window);
            float dist = length(view_position - vWorldPos);
            col = mix(uUnderwaterFogColor, col, exp(-dist * uUnderwaterFogDensity));
            gl_FragColor = vec4(gammaCorrectOutput(col), 1.0);
            return;
        }

        // water depth (distance the view ray travels under water) based effects
        float waterDepth = 0.0;
        float absorb = 0.8;
        #ifdef WATER_DEPTH_EFFECTS
            vec2 depthUv = getGrabScreenPos(vScreenPos);
            float sceneDepth = getLinearScreenDepth(depthUv + N.xz * uDistortion);
            if (sceneDepth < vViewDepth) {
                // distorted sample is above the water surface, fall back to undistorted - both
                // for the depth and for the refraction color, so above-water content (or the sky
                // behind clipped geometry) does not leak into the shore line
                sceneDepth = getLinearScreenDepth(depthUv);
                #ifdef WATER_REFRACTION
                    refrSample = refrUndistorted;
                #endif
            }
            waterDepth = max(sceneDepth - vViewDepth, 0.0);
            absorb = 1.0 - exp(-waterDepth / uDepthFade);
        #endif

        // sun diffuse - modulates the water body color
        vec3 L = -uLightDir;
        vec3 sunDiffuse = mix(vec3(1.0), uLightColor * max(dot(N, L), 0.0), uDiffuseIntensity);
        vec3 shallowColor = uShallowColor * sunDiffuse;
        vec3 deepColor = uDeepColor * sunDiffuse;

        // base color of the water body - refracted scene absorbed with depth
        #ifdef WATER_REFRACTION
            vec3 base = mix(refrSample * shallowColor, deepColor, absorb);
        #else
            vec3 base = mix(shallowColor, deepColor, absorb);
        #endif

        // reflection
        vec3 refl = vec3(0.0);
        float hasReflection = 0.0;
        #if defined(WATER_REFLECTION_PLANAR) || defined(WATER_REFLECTION_SKY)
            refl = reflSample;
            hasReflection = 1.0;
        #endif

        // fresnel blend between the water body and the reflection
        float fresnel = mix(0.02, 1.0, pow(1.0 - NdotV, uFresnelPower));
        vec3 color = mix(base, refl, hasReflection * clamp(fresnel * uReflectionStrength, 0.0, 1.0));

        // sun specular. The slopes of the waves filtered out in the distance roughen the surface:
        // added to the mean square slope of the highlight (Beckmann m^2 = 2 / (power + 2)), they
        // widen it into the glitter of the sun on the far waves, with its energy kept
        vec3 H = normalize(L + V);
        float specPower = max(2.0 / (2.0 / (uSpecularPower + 2.0) + slopeVariance) - 2.0, 1.0);
        float specScale = (specPower + 2.0) / (uSpecularPower + 2.0);
        color += uLightColor * pow(max(dot(N, H), 0.0), specPower) * uSpecularIntensity * specScale;

        // foam along the shoreline, lit by the directional light so it dims at night. The extra
        // light-luminance factor keeps the white foam from glowing against the dark night scene
        #if defined(WATER_FOAM) && defined(WATER_DEPTH_EFFECTS)
            float foamNoise = clamp(0.5 + 0.5 * (nm1.x + nm2.y), 0.0, 1.0);
            float foamMask = 1.0 - smoothstep(0.0, uFoamDepth, waterDepth);
            foamMask = smoothstep(0.3, 0.7, foamMask * (0.4 + 0.6 * foamNoise));
            // intensity follows the light luminance, but the foam keeps its own color (no orange
            // foam at sunrise)
            float lightLum = dot(uLightColor, vec3(0.299, 0.587, 0.114));
            float foamAtten = clamp(lightLum, 0.0, 1.0);
            vec3 foamLit = uFoamColor * (max(dot(N, L), 0.0) * lightLum * foamAtten * foamAtten * foamAtten);
            color = mix(color, foamLit, foamMask);
        #endif

        // opacity - fully opaque when refraction supplies the background
        #ifdef WATER_REFRACTION
            float alpha = 1.0;
        #else
            float alpha = mix(uOpacity, 1.0, clamp(fresnel, 0.0, 1.0));
        #endif

        // soft intersection with the geometry along the shoreline
        #ifdef WATER_DEPTH_EFFECTS
            alpha *= clamp(waterDepth / uShoreSoftness, 0.0, 1.0);
        #endif

        gl_FragColor = vec4(gammaCorrectOutput(color), alpha);
    }
`,Ui=`
    #ifdef WATER_DEPTH_EFFECTS
        #include "screenDepthPS"
    #endif

    attribute vertex_position: vec3f;

    uniform matrix_model: mat4x4f;
    uniform matrix_viewProjection: mat4x4f;

    varying vWorldPos: vec3f;
    varying vScreenPos: vec4f;
    #ifdef WATER_WAVES
        varying vWavePos: vec2f;
    #endif
    #ifdef WATER_DEPTH_EFFECTS
        varying vViewDepth: f32;
    #endif

    ${ut}

    @vertex
    fn vertexMain(input: VertexInput) -> VertexOutput {
        var output: VertexOutput;

        var worldPos: vec4f = uniform.matrix_model * vec4f(input.vertex_position, 1.0);

        #ifdef WATER_WAVES
            output.vWavePos = worldPos.xz;
            worldPos = vec4f(worldPos.xyz + waveDisplacement(worldPos.xz), 1.0);
        #endif

        output.vWorldPos = worldPos.xyz;

        let projPos: vec4f = uniform.matrix_viewProjection * worldPos;
        output.position = projPos;
        output.vScreenPos = projPos;

        #ifdef WATER_DEPTH_EFFECTS
            output.vViewDepth = getLinearDepth(worldPos.xyz);
        #endif

        return output;
    }
`,qi=`
    #include "gammaPS"
    #ifdef WATER_DEPTH_EFFECTS
        #include "screenDepthPS"
    #endif
    #ifdef WATER_REFLECTION_SKY
        #include "decodePS"
        #include "envAtlasPS"
        #include "sphericalPS"
    #endif

    #ifndef SCREENSIZE
        #define SCREENSIZE
        uniform screen_size: vec4f;
    #endif

    var uNormalMap: texture_2d<f32>;
    var uNormalMapSampler: sampler;
    #ifdef WATER_REFLECTION_PLANAR
        var uReflectionMap: texture_2d<f32>;
        var uReflectionMapSampler: sampler;
    #endif
    #ifdef WATER_REFLECTION_SKY
        var texture_envAtlas: texture_2d<f32>;
        var texture_envAtlasSampler: sampler;
        uniform uSkyBlur: f32;
    #endif
    #ifdef WATER_REFRACTION
        var uRefractionMap: texture_2d<f32>;
        var uRefractionMapSampler: sampler;
    #endif

    uniform view_position: vec3f;
    #ifndef WATER_WAVES
        uniform uTime: f32;
    #endif

    uniform uShallowColor: vec3f;
    uniform uDeepColor: vec3f;
    uniform uLightDir: vec3f;
    uniform uLightColor: vec3f;
    uniform uRippleTiling: f32;
    uniform uRippleSpeed: f32;
    uniform uBumpiness: f32;
    uniform uDistortion: f32;
    uniform uFresnelPower: f32;
    uniform uReflectionStrength: f32;
    uniform uDepthFade: f32;
    uniform uShoreSoftness: f32;
    uniform uOpacity: f32;
    uniform uSpecularPower: f32;
    uniform uSpecularIntensity: f32;
    uniform uWaveFiltering: f32;
    uniform uDiffuseIntensity: f32;
    uniform uUnderwaterFogDensity: f32;
    uniform uUnderwaterFogColor: vec3f;
    uniform uCameraBelow: f32;
    uniform uSnellWindow: f32;
    #ifdef WATER_FOAM
        uniform uFoamColor: vec3f;
        uniform uFoamDepth: f32;
    #endif

    varying vWorldPos: vec3f;
    varying vScreenPos: vec4f;
    #ifdef WATER_WAVES
        varying vWavePos: vec2f;
    #endif
    #ifdef WATER_DEPTH_EFFECTS
        varying vViewDepth: f32;
    #endif

    ${ut}

    @fragment
    fn fragmentMain(input: FragmentInput) -> FragmentOutput {
        var output: FragmentOutput;

        // two layers of scrolling detail normals, in tangent space of a horizontal plane. The
        // second layer is rotated, so the tiling of the two never lines up into a visible grid.
        let baseUv: vec2f = input.vWorldPos.xz * uniform.uRippleTiling;
        let st: f32 = uniform.uTime * uniform.uRippleSpeed;
        let rotUv: vec2f = vec2f(0.79 * baseUv.x - 0.61 * baseUv.y, 0.61 * baseUv.x + 0.79 * baseUv.y);
        let nm1: vec3f = textureSample(uNormalMap, uNormalMapSampler, baseUv + vec2f(st, st * 0.7)).xyz * 2.0 - 1.0;
        let nm2: vec3f = textureSample(uNormalMap, uNormalMapSampler, rotUv * 1.73 + vec2f(-st * 0.8, st * 1.1)).xyz * 2.0 - 1.0;
        let detail: vec2f = (nm1.xy + nm2.xy) * 0.5 * uniform.uBumpiness;

        // combine with the geometry wave normal, filtered by the footprint of the pixel
        var slopeVariance: f32 = 0.0;
        #ifdef WATER_WAVES
            let footprint: f32 = max(length(dpdx(input.vWavePos)), length(dpdy(input.vWavePos))) * uniform.uWaveFiltering;
            let waveN: vec3f = waveNormal(input.vWavePos, footprint, &slopeVariance);
        #else
            let waveN: vec3f = vec3f(0.0, 1.0, 0.0);
        #endif
        let N: vec3f = normalize(vec3f(waveN.x + detail.x, waveN.y, waveN.z + detail.y));

        let V: vec3f = normalize(uniform.view_position - input.vWorldPos);
        let NdotV: f32 = max(dot(N, V), 0.0);

        // screen uv to sample the planar textures. The refraction camera matches the main camera,
        // so its texture is sampled without a flip; the reflection camera is mirrored by the
        // water plane, which flips the image vertically.
        let screenUV: vec2f = pcPosition.xy * uniform.screen_size.zw;
        let refractionUV: vec2f = screenUV + N.xz * uniform.uDistortion;
        let reflectionUV: vec2f = vec2f(screenUV.x, 1.0 - screenUV.y) + N.xz * uniform.uDistortion;

        // sample the planar / sky reflection textures up front, before any divergent flow
        // (WGSL uniformity). Both the distorted and undistorted refraction samples are taken -
        // the undistorted one is the fallback when the distortion reaches past a silhouette
        // into above-water content
        #ifdef WATER_REFRACTION
            var refrSample: vec3f = textureSample(uRefractionMap, uRefractionMapSampler, refractionUV).rgb;
            let refrUndistorted: vec3f = textureSample(uRefractionMap, uRefractionMapSampler, screenUV).rgb;
        #else
            let refrSample: vec3f = uniform.uShallowColor;
        #endif
        var reflSample: vec3f = uniform.uDeepColor;
        #ifdef WATER_REFLECTION_PLANAR
            reflSample = textureSample(uReflectionMap, uReflectionMapSampler, reflectionUV).rgb;
        #endif
        #ifdef WATER_REFLECTION_SKY
            var R: vec3f = reflect(-V, N);
            R.y = abs(R.y); // no scene below the horizon, mirror the sky instead
            let skyUv: vec2f = toSphericalUv(R * vec3f(-1.0, 1.0, 1.0));
            let level: f32 = clamp(uniform.uSkyBlur, 0.0, 4.0);
            let ilevel: f32 = floor(level);
            let skyA: vec3f = decodeRGBP(textureSample(texture_envAtlas, texture_envAtlasSampler, mapRoughnessUv(skyUv, ilevel)));
            let skyB: vec3f = decodeRGBP(textureSample(texture_envAtlas, texture_envAtlasSampler, mapRoughnessUv(skyUv, ilevel + 1.0)));
            reflSample = mix(skyA, skyB, level - ilevel);
        #endif

        // surface seen from below: blend the above-water world (refraction texture, visible in
        // the Snell window overhead) with total internal reflection of the underwater scene
        // (reflection texture), and fade to the underwater fog color with distance. Selected by
        // the camera side rather than per pixel, as at grazing angles the perturbed normal can
        // flip against the view direction, causing speckles
        if (uniform.uCameraBelow > 0.5) {
            let NdotUp: f32 = max(dot(-N, V), 0.0);
            let windowCenter: f32 = 1.0 - uniform.uSnellWindow;
            let window: f32 = smoothstep(windowCenter - 0.07, windowCenter + 0.07, NdotUp);
            var col: vec3f = mix(reflSample, refrSample, window);
            let dist: f32 = length(uniform.view_position - input.vWorldPos);
            col = mix(uniform.uUnderwaterFogColor, col, exp(-dist * uniform.uUnderwaterFogDensity));
            output.color = vec4f(gammaCorrectOutput(col), 1.0);
            return output;
        }

        // water depth (distance the view ray travels under water) based effects
        var waterDepth: f32 = 0.0;
        var absorb: f32 = 0.8;
        #ifdef WATER_DEPTH_EFFECTS
            let depthUv: vec2f = getGrabScreenPos(input.vScreenPos);
            var sceneDepth: f32 = getLinearScreenDepth(depthUv + N.xz * uniform.uDistortion);
            if (sceneDepth < input.vViewDepth) {
                // distorted sample is above the water surface, fall back to undistorted - both
                // for the depth and for the refraction color, so above-water content (or the sky
                // behind clipped geometry) does not leak into the shore line
                sceneDepth = getLinearScreenDepth(depthUv);
                #ifdef WATER_REFRACTION
                    refrSample = refrUndistorted;
                #endif
            }
            waterDepth = max(sceneDepth - input.vViewDepth, 0.0);
            absorb = 1.0 - exp(-waterDepth / uniform.uDepthFade);
        #endif

        // sun diffuse - modulates the water body color
        let L: vec3f = -uniform.uLightDir;
        let sunDiffuse: vec3f = mix(vec3f(1.0), uniform.uLightColor * max(dot(N, L), 0.0), uniform.uDiffuseIntensity);
        let shallowColor: vec3f = uniform.uShallowColor * sunDiffuse;
        let deepColor: vec3f = uniform.uDeepColor * sunDiffuse;

        // base color of the water body - refracted scene absorbed with depth
        #ifdef WATER_REFRACTION
            let base: vec3f = mix(refrSample * shallowColor, deepColor, absorb);
        #else
            let base: vec3f = mix(shallowColor, deepColor, absorb);
        #endif

        // reflection
        var refl: vec3f = vec3f(0.0);
        var hasReflection: f32 = 0.0;
        #if defined(WATER_REFLECTION_PLANAR) || defined(WATER_REFLECTION_SKY)
            refl = reflSample;
            hasReflection = 1.0;
        #endif

        // fresnel blend between the water body and the reflection
        let fresnel: f32 = mix(0.02, 1.0, pow(1.0 - NdotV, uniform.uFresnelPower));
        var color: vec3f = mix(base, refl, hasReflection * clamp(fresnel * uniform.uReflectionStrength, 0.0, 1.0));

        // sun specular, widened by the slopes of the waves filtered out in the distance
        let H: vec3f = normalize(L + V);
        let specPower: f32 = max(2.0 / (2.0 / (uniform.uSpecularPower + 2.0) + slopeVariance) - 2.0, 1.0);
        let specScale: f32 = (specPower + 2.0) / (uniform.uSpecularPower + 2.0);
        color += uniform.uLightColor * pow(max(dot(N, H), 0.0), specPower) * uniform.uSpecularIntensity * specScale;

        // foam along the shoreline, lit by the directional light so it dims at night. The extra
        // light-luminance factor keeps the white foam from glowing against the dark night scene
        #if defined(WATER_FOAM) && defined(WATER_DEPTH_EFFECTS)
            let foamNoise: f32 = clamp(0.5 + 0.5 * (nm1.x + nm2.y), 0.0, 1.0);
            var foamMask: f32 = 1.0 - smoothstep(0.0, uniform.uFoamDepth, waterDepth);
            foamMask = smoothstep(0.3, 0.7, foamMask * (0.4 + 0.6 * foamNoise));
            // intensity follows the light luminance, but the foam keeps its own color (no orange
            // foam at sunrise)
            let lightLum: f32 = dot(uniform.uLightColor, vec3f(0.299, 0.587, 0.114));
            let foamAtten: f32 = clamp(lightLum, 0.0, 1.0);
            let foamLit: vec3f = uniform.uFoamColor * (max(dot(N, L), 0.0) * lightLum * foamAtten * foamAtten * foamAtten);
            color = mix(color, foamLit, foamMask);
        #endif

        // opacity - fully opaque when refraction supplies the background
        #ifdef WATER_REFRACTION
            var alpha: f32 = 1.0;
        #else
            var alpha: f32 = mix(uniform.uOpacity, 1.0, clamp(fresnel, 0.0, 1.0));
        #endif

        // soft intersection with the geometry along the shoreline
        #ifdef WATER_DEPTH_EFFECTS
            alpha *= clamp(waterDepth / uniform.uShoreSoftness, 0.0, 1.0);
        #endif

        output.color = vec4f(gammaCorrectOutput(color), alpha);
        return output;
    }
`;class pt extends $e{constructor(){super(...arguments);y(this,"cameraEntity",null);y(this,"lightEntity",null);y(this,"normalMap",null);y(this,"causticsMap",null);y(this,"reflectionSource","planar");y(this,"refraction",!0);y(this,"obliqueClipping",!0);y(this,"clipBias",.1);y(this,"textureScale",.5);y(this,"depthEffects",!0);y(this,"shallowColor",new L(.6,.9,.85));y(this,"deepColor",new L(.03,.16,.24));y(this,"depthFade",3);y(this,"shoreSoftness",.3);y(this,"opacity",.8);y(this,"rippleTiling",.1);y(this,"rippleSpeed",.05);y(this,"bumpiness",.5);y(this,"distortion",.03);y(this,"fresnelPower",5);y(this,"reflectionStrength",1);y(this,"skyBlur",0);y(this,"specularPower",256);y(this,"specularIntensity",1);y(this,"diffuseIntensity",.35);y(this,"foam",!0);y(this,"foamColor",new L(1,1,1));y(this,"foamDepth",.5);y(this,"causticsTiling",.09);y(this,"causticsSpeed",.04);y(this,"causticsStrength",1.5);y(this,"causticsDepth",3);y(this,"snellWindow",.35);y(this,"waves",!1);y(this,"waveAmplitude",.15);y(this,"waveLength",8);y(this,"waveSpeed",1);y(this,"waveSteepness",.4);y(this,"waveFiltering",1);y(this,"waveDirection",0);y(this,"swellAmplitude",.25);y(this,"swellLength",35);y(this,"swellSpeed",1);y(this,"swellDirection",40);y(this,"_material",null);y(this,"_originalMaterials",[]);y(this,"_reflectionEntity",null);y(this,"_reflectionRenderer",null);y(this,"_refractionEntity",null);y(this,"_refractionRenderer",null);y(this,"_fallbackNormalMap",null);y(this,"_depthMapRequested",!1);y(this,"_time",0);y(this,"_shallowColorArray",[0,0,0]);y(this,"_deepColorArray",[0,0,0]);y(this,"_lightDirArray",[0,-1,0]);y(this,"_lightColorArray",[0,0,0]);y(this,"_foamColorArray",[0,0,0]);y(this,"_waveParamsArray",[0,0,0,0]);y(this,"_waveDirArray",[1,0]);y(this,"_swellParamsArray",[0,0,0,0]);y(this,"_swellDirArray",[1,0]);y(this,"_causticsParamsArray",[0,0,0,0]);y(this,"_underwaterFogColorArray",[0,0,0])}initialize(){var s;if(!((s=this.cameraEntity)!=null&&s.camera)){console.error("Water script requires cameraEntity attribute to be set to an entity with a camera component.");return}if(!this.entity.render){console.error("Water script requires a render component on the same entity.");return}Ni(this.app.graphicsDevice),this._material=new Mt({uniqueName:"WaterMaterial",vertexGLSL:Oi,fragmentGLSL:Bi,vertexWGSL:Ui,fragmentWGSL:qi,attributes:{vertex_position:Pt}}),this._material.blendType=ke,this._material.depthWrite=!1,this._material.cull=se;const t=this.entity.render.meshInstances;this._originalMaterials=t.map(a=>a.material),t.forEach(a=>{a.material=this._material}),this._fallbackNormalMap=new ze(this.app.graphicsDevice,{name:"waterFlatNormalMap",width:1,height:1,format:Ee}),this._fallbackNormalMap.lock().set([128,128,255,255]),this._fallbackNormalMap.unlock();const i=this.app.on("update",a=>this._frameUpdate(a));this.on("disable",()=>{this._enableCameras(!1),this._requestDepthMap(!1)}),this.on("destroy",()=>{var n,l;i.off(),this._requestDepthMap(!1);const a=this.entity.render;a&&a.meshInstances.forEach((r,c)=>{r.material=this._originalMaterials[c]??r.material}),this._originalMaterials=[],(n=this._reflectionEntity)==null||n.destroy(),this._reflectionEntity=null,(l=this._refractionEntity)==null||l.destroy(),this._refractionEntity=null,this._material.destroy(),this._material=null,this._fallbackNormalMap.destroy(),this._fallbackNormalMap=null})}_getPlanarCameraLayers(){var i;const t=((i=this.entity.render)==null?void 0:i.layers)??[];return this.cameraEntity.camera.layers.filter(s=>!t.includes(s)&&s!==Ct&&s!==_t)}_createPlanarCamera(t,i){const s=this.cameraEntity.camera,a=new O(`${this.entity.name}:${t}`);a.addComponent("camera",{layers:this._getPlanarCameraLayers(),priority:s.priority-1,toneMapping:s.toneMapping,fog:s.fog}),a.addComponent("script");const n=a.script.create(ct,{properties:{sceneCameraEntity:this.cameraEntity,mode:i,scale:this.textureScale,mipmaps:!1,depth:!0}});return this.app.root.addChild(a),{entity:a,renderer:n}}_enableCameras(t){this._reflectionEntity&&(this._reflectionEntity.enabled=t),this._refractionEntity&&(this._refractionEntity.enabled=t)}_requestDepthMap(t){var i,s;this._depthMapRequested!==t&&(this._depthMapRequested=t,(s=(i=this.cameraEntity)==null?void 0:i.camera)==null||s.requestSceneDepthMap(t))}_setDefine(t,i){const s=this._material.defines.has(t)!==i;return this._material.setDefine(t,i),s}_frameUpdate(t){var m;if(!this._material||!((m=this.cameraEntity)!=null&&m.camera))return;this._time+=t;const i=this._material,s=this.reflectionSource==="sky"&&!!this.app.scene.envAtlas,a=this.reflectionSource==="planar";let n=!1;n=this._setDefine("WATER_REFLECTION_PLANAR",a)||n,n=this._setDefine("WATER_REFLECTION_SKY",s)||n,n=this._setDefine("WATER_REFRACTION",this.refraction)||n,n=this._setDefine("WATER_DEPTH_EFFECTS",this.depthEffects)||n,n=this._setDefine("WATER_FOAM",this.foam&&this.depthEffects)||n,n=this._setDefine("WATER_WAVES",this.waves)||n,n&&i.update(),this._requestDepthMap(this.depthEffects);const l=this.entity.getPosition(),r=this.entity.up,c=this.cameraEntity.getPosition(),h=r.dot(c)<r.dot(l),p=h?Wi.copy(r).mulScalar(-1):r;if(a){this._reflectionEntity||({entity:this._reflectionEntity,renderer:this._reflectionRenderer}=this._createPlanarCamera("WaterReflection","reflection")),this._reflectionEntity.enabled=!0,this._reflectionEntity.camera.toneMapping=this.cameraEntity.camera.toneMapping,this._updatePlanarRenderer(this._reflectionRenderer,l,p);const v=this._reflectionRenderer.frameUpdate();v&&i.setParameter("uReflectionMap",v)}else this._reflectionEntity&&(this._reflectionEntity.enabled=!1);if(this.refraction){this._refractionEntity||({entity:this._refractionEntity,renderer:this._refractionRenderer}=this._createPlanarCamera("WaterRefraction","refraction")),this._refractionEntity.enabled=!0,this._refractionEntity.camera.toneMapping=this.cameraEntity.camera.toneMapping,this._updatePlanarRenderer(this._refractionRenderer,l,p);const v=this._refractionRenderer.frameUpdate();v&&i.setParameter("uRefractionMap",v)}else this._refractionEntity&&(this._refractionEntity.enabled=!1);s&&(i.setParameter("texture_envAtlas",this.app.scene.envAtlas),i.setParameter("uSkyBlur",this.skyBlur)),this._updateUniforms();const d=this.app.graphicsDevice.scope,u=r.dot(l);d.resolve("waterLevel").setValue(u);const f=this.waves?this.waveAmplitude*2+this.swellAmplitude*1.7:0;d.resolve("waterFogLevel").setValue(u+(h?f+.5:0)),d.resolve("waterTime").setValue(this._time),d.resolve("waterCausticsMap").setValue(this.causticsMap??this.normalMap??this._fallbackNormalMap),i.setParameter("uCameraBelow",h?1:0),this._causticsParamsArray[0]=this.causticsTiling,this._causticsParamsArray[1]=this.causticsSpeed,this._causticsParamsArray[2]=this.causticsStrength,this._causticsParamsArray[3]=this.causticsDepth,d.resolve("waterCausticsParams").setValue(this._causticsParamsArray),d.resolve("waterCausticsColor").setValue(this._lightColorArray)}_updatePlanarRenderer(t,i,s){t.planePoint.copy(i),t.planeNormal.copy(s),t.scale=this.textureScale,t.obliqueClipping=this.obliqueClipping,t.clipBias=this.clipBias}_linearColor(t,i,s=1){return ee.linear(t),i[0]=ee.r*s,i[1]=ee.g*s,i[2]=ee.b*s,i}_updateUniforms(){var n;const t=this._material;t.setParameter("uNormalMap",this.normalMap??this._fallbackNormalMap),t.setParameter("uTime",this._time),t.setParameter("uShallowColor",this._linearColor(this.shallowColor,this._shallowColorArray)),t.setParameter("uDeepColor",this._linearColor(this.deepColor,this._deepColorArray)),t.setParameter("uRippleTiling",this.rippleTiling),t.setParameter("uRippleSpeed",this.rippleSpeed),t.setParameter("uBumpiness",this.bumpiness),t.setParameter("uDistortion",this.distortion),t.setParameter("uFresnelPower",this.fresnelPower),t.setParameter("uReflectionStrength",this.reflectionStrength),t.setParameter("uDepthFade",this.depthFade),t.setParameter("uShoreSoftness",this.shoreSoftness),t.setParameter("uOpacity",this.opacity),t.setParameter("uSpecularPower",this.specularPower);const i=this.app.scene.fog;t.setParameter("uUnderwaterFogDensity",i.type!==Re?i.density:.06);const s=i.type!==Re?i.color:this.deepColor;t.setParameter("uUnderwaterFogColor",this._linearColor(s,this._underwaterFogColorArray)),t.setParameter("uSnellWindow",this.snellWindow);const a=(n=this.lightEntity)==null?void 0:n.light;if(a){const l=this.lightEntity.up;this._lightDirArray[0]=-l.x,this._lightDirArray[1]=-l.y,this._lightDirArray[2]=-l.z,this._linearColor(a.color,this._lightColorArray,a.intensity),t.setParameter("uSpecularIntensity",this.specularIntensity),t.setParameter("uDiffuseIntensity",this.diffuseIntensity)}else this._lightDirArray[0]=0,this._lightDirArray[1]=-1,this._lightDirArray[2]=0,this._lightColorArray[0]=this._lightColorArray[1]=this._lightColorArray[2]=0,t.setParameter("uSpecularIntensity",0),t.setParameter("uDiffuseIntensity",0);if(t.setParameter("uLightDir",this._lightDirArray),t.setParameter("uLightColor",this._lightColorArray),this.foam&&this.depthEffects&&(t.setParameter("uFoamColor",this._linearColor(this.foamColor,this._foamColorArray)),t.setParameter("uFoamDepth",this.foamDepth)),this.waves){this._waveParamsArray[0]=this.waveAmplitude,this._waveParamsArray[1]=2*Math.PI/Math.max(this.waveLength,.01),this._waveParamsArray[2]=this.waveSpeed,this._waveParamsArray[3]=this.waveSteepness,t.setParameter("uWaveParams",this._waveParamsArray),t.setParameter("uWaveFiltering",this.waveFiltering);const l=this.waveDirection*Math.PI/180;this._waveDirArray[0]=Math.cos(l),this._waveDirArray[1]=Math.sin(l),t.setParameter("uWaveDir",this._waveDirArray),this._swellParamsArray[0]=this.swellAmplitude,this._swellParamsArray[1]=2*Math.PI/Math.max(this.swellLength,.01),this._swellParamsArray[2]=this.swellSpeed,this._swellParamsArray[3]=this.waveSteepness,t.setParameter("uSwellParams",this._swellParamsArray);const r=this.swellDirection*Math.PI/180;this._swellDirArray[0]=Math.cos(r),this._swellDirArray[1]=Math.sin(r),t.setParameter("uSwellDir",this._swellDirArray)}}}y(pt,"scriptName","water");class Hi{constructor(e,t,i,s,a,n,l){this.app=e,this.surface=s,this.rocks=a;const r=e.scene.layers.getLayerByName("World");this.layer=new Ke({name:"River water"}),e.scene.layers.insert(this.layer,e.scene.layers.getTransparentIndex(r)+1),t.camera.layers=[...t.camera.layers,this.layer.id];const c=new ie;c.redWrite=!1,c.greenWrite=!1,c.blueWrite=!1,c.alphaWrite=!1,c.depthWrite=!0,c.cull=se,c.update();for(const P of a.findComponents("render")){P.layers=[Ye];for(const T of P.meshInstances)T.material=c}const h=Li(l.rockGrid,l.water.bottomY),p=new te(e.graphicsDevice);p.setPositions(h.positions),p.setNormals(ce(h.positions,h.indices)),p.setIndices(h.indices),p.update();for(const P of a.findComponents("render"))for(const T of P.meshInstances)T.mesh=p;e.root.addChild(a),e.root.addChild(s);for(const P of s.findComponents("render"))P.layers=[this.layer.id];const d=s.findComponents("render")[0].entity;d.setLocalPosition(0,l.waterY,0);const u=[],f=[],m=l.water.polygon,v=m.reduce((P,T)=>[P[0]+T[0]/m.length,P[1]+T[1]/m.length],[0,0]);u.push(v[0],0,v[1]);for(const P of m)u.push(P[0],0,P[1]);for(let P=0;P<m.length;P++)f.push(0,(P+1)%m.length+1,P+1);const g=new te(e.graphicsDevice);g.setPositions(u),g.setNormals(ce(u,f)),g.setIndices(f),g.update();for(const P of d.render.meshInstances)P.mesh=g;d.addComponent("script"),this.script=d.script.create(pt,{properties:{cameraEntity:t,lightEntity:i,normalMap:n==null?void 0:n.resource,reflectionSource:matchMedia("(pointer: coarse)").matches?"sky":"planar",refraction:!1,obliqueClipping:!0,textureScale:.35,depthEffects:!0,shallowColor:new L(.55,.72,.67),deepColor:new L(.12,.27,.24),depthFade:6,shoreSoftness:.12,opacity:.28,foam:!1,foamDepth:.2,rippleTiling:.65,rippleSpeed:.035,bumpiness:.07,distortion:.008,reflectionStrength:.06,specularIntensity:.12,waves:!0,waveAmplitude:.012,waveLength:2.4,waveSteepness:.08,waveDirection:90,swellAmplitude:.008,swellLength:5}});const w=l.rockGrid;w.width*w.cell,w.height*w.cell;const E=Di(l),k=new ze(e.graphicsDevice,{name:"Feathered shoreline",width:E.size,height:E.size,format:Ee,mipmaps:!1,minFilter:oe,magFilter:oe,addressU:ae,addressV:ae});k.lock().set(E.pixels),k.unlock(),this.mask=k;const x=d.render.meshInstances[0].material,b=x.shaderDesc;x.shaderDesc={...b,fragmentGLSL:b.fragmentGLSL.replace("varying vec3 vWorldPos;",`varying vec3 vWorldPos;
uniform sampler2D riverCoverage;
uniform vec4 riverBounds;`).replace("gl_FragColor = vec4(gammaCorrectOutput(color), alpha);",`vec2 riverUv=(vWorldPos.xz-riverBounds.xy)/riverBounds.zw;
alpha *= texture2D(riverCoverage,riverUv).r;
gl_FragColor = vec4(gammaCorrectOutput(color), alpha);`)},x.setParameter("riverCoverage",k),x.setParameter("riverBounds",new Float32Array(E.bounds)),x.update();const M=d.render.meshInstances[0].mesh,A=[],S=[];M.getPositions(A),M.getIndices(S);const C=[];for(let P=0;P<A.length;P+=3)C.push((A[P]-E.bounds[0])/E.bounds[2],(A[P+2]-E.bounds[1])/E.bounds[3]),A[P+1]=0;const R=new te(e.graphicsDevice);R.setPositions(A),R.setNormals(ce(A,S)),R.setUvs(0,C),R.setIndices(S),R.update();const z=new ie;z.diffuse=new L(.32,.36,.3),z.roughness=1,z.opacity=.08,z.opacityMap=k,z.opacityMapChannel="r",z.blendType=ke,z.depthWrite=!1,z.cull=se,z.setDefine("WATER_CAUSTICS",!0),z.update(),this.bed=new O("Riverbed"),this.bed.addComponent("render",{meshInstances:[new Xe(R,z)]}),this.bed.setPosition(0,l.water.bottomY,0),e.root.addChild(this.bed)}destroy(){this.surface.destroy(),this.rocks.destroy(),this.bed.destroy(),this.mask.destroy(),this.app.scene.layers.remove(this.layer)}}const V=new ht({onReturn:Qe});async function Vi(){const o=document.getElementById("game");o.tabIndex=0;const e=await Tt(o,{deviceTypes:["webgl2"],antialias:!1,alpha:!1}),t=new Lt(o,{graphicsDevice:e});t.setCanvasFillMode(Ft),t.setCanvasResolution(Dt),e.maxPixelRatio=Math.min(devicePixelRatio,matchMedia("(pointer: coarse)").matches?1:1.5),window.addEventListener("resize",()=>t.resizeCanvas()),t.scene.ambientLight=new L(.62,.67,.68);const i=new O("Player");i.addComponent("camera",{clearColor:new L(.5,.63,.67),nearClip:.06,farClip:450,fov:65}),t.root.addChild(i);const s=new Ke({name:"Captured environment"});t.scene.layers.insert(s,0),i.camera.layers=[s.id,...i.camera.layers];const a=new O("River daylight");a.addComponent("light",{type:"directional",intensity:1.4,color:new L(1,.96,.86)}),a.setEulerAngles(50,35,0),t.root.addChild(a),t.start();const n=globalThis.__FRASER_LEVEL??await fetch("./assets/level.json").then(b=>b.json());i.setPosition(...n.player),i.setEulerAngles(-10,8,0),t.loader.getHandler("gsplat").addParser(new ii(t)),V.loading("Loading the riverbank and elder…");const l={net:"dip_net_frame.glb",elder:"npc_fisher_host.glb",basket:"basket.glb",sockeye:"salmon_sockeye.glb",chinook:"salmon_chinook.glb",surface:"river_surface.glb",rocks:"river_rocks.glb"},r={};await Promise.all(Object.entries(l).map(async([b,M])=>r[b]=await Q(t,"./assets/models/"+M)));const c=j(r.elder)||nt(t,"elder"),h=Se(c,1.65),p=new O("Elder at red marker");p.addChild(h),p.setPosition(n.elder[0],n.elder[1]+.825,n.elder[2]),p.setEulerAngles(0,Math.atan2(n.player[0]-n.elder[0],n.player[2]-n.elder[2])*180/Math.PI+(n.elderFacingOffset??0),0),t.root.addChild(p);let d=null;const u=j(r.basket);if(u){const b=Se(u,1.15);b.setPosition(n.basket[0],n.basket[1]+.29,n.basket[2]),t.root.addChild(b),d=b}const f=await Q(t,"./assets/river-panorama.jpg","texture");if(f){const b=B(t,"River panorama","sphere",[0,0,0],[350,350,350],[1,1,1]),M=new ie;M.useLighting=!1,M.emissive=new L(1,1,1),M.emissiveMap=f.resource,M.cull=It,M.depthWrite=!1,M.update(),b.render.layers=[s.id],b.render.material=M,b.setEulerAngles(0,185,0)}V.loading("Opening the local river view…");const m=await Q(t,"./assets/splats/fraser_canyon_bank.spz","gsplat");if(!m)throw Error("The local river splat could not load. Check your connection and reload.");if(!r.net)throw Error("Original dip-net frame is missing from this package.");if(m){const b=new O("Fraser River bank splat");b.addComponent("gsplat",{asset:m,layers:[s.id]}),b.setPosition(...n.splat.position),b.setRotation(new q(...n.splat.rotation)),t.root.addChild(b)}const v=await Q(t,"./assets/water-normal.png","texture"),g=j(r.surface),w=j(r.rocks);if(!g||!w)throw Error("Local river surface/collision assets are missing. Rebuild the project assets.");const E=new Hi(t,i,a,g,w,v,n),k=[];for(const b of n.colliders){if(!b.role)continue;const M=B(t,b.name,"box",b.center,b.size,[.3,.7,.9],.12);M.enabled=!1,k.push(M)}const x=new Ti(t,{level:n,assets:r,ui:V,playerCamera:i,elder:c,anchorEntity:p,debugEntities:k,water:E,basketEntity:d,onComplete:b=>{try{localStorage.setItem("fraser-last-harvest",JSON.stringify(b))}catch{}}});V.onReset=()=>x.reset(),x.settingsMenu=new Bt({onSound:b=>{V.audio.enabled=b},onOpen:()=>{x.wasPausedBeforeSettings=x.paused,x.paused=!0,x.keys.clear(),x.net.submerged=!1},onClose:()=>{x.paused=x.wasPausedBeforeSettings},onRestart:()=>x.reset(),onReturn:Qe}),document.getElementById("session-menu").onclick=()=>x.settingsMenu.open(),await x.start(),Xt(x),window.fishingGame=x,window.fishingApp=t,window.addEventListener("pagehide",()=>x.destroy(),{once:!0})}Vi().catch(o=>{console.error(o),V.ready(),V.show('<h2>Unable to start the local game</h2><p id="error-detail"></p><button class="primary" onclick="location.reload()">Reload</button>'),document.getElementById("error-detail").textContent=o.message});
