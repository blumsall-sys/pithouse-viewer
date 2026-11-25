var ct=Object.defineProperty;var dt=(o,e,t)=>e in o?ct(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var y=(o,e,t)=>dt(o,typeof e!="symbol"?e+"":e,t);import{H as ut,W as ke,G as pt,a as ft,P as Pe,b as xe,V as _,Q as U,B as He,R as Ve,E as N,S as te,C as F,c as be,L as Ge,M as ee,d as ie,e as je,f as Y,m as L,g as Ye,T as mt,h as yt,i as Me,j as gt,k as Se,F as se,l as vt,A as oe,n as wt,o as xt,p as bt,q as St,r as Et,s as zt,t as Ce,u as _e,v as kt,w as Pt,x as Xe,y as le,z as Mt,D as Ct,I as _t,J as At,K as Rt}from"./playcanvas-Bznxzm9m.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const Tt="pithouse-ladder-trip",Ft="pithouse-fishing-trip";function Lt(o,e){try{return JSON.parse(o.getItem(e)||"null")}catch{return null}}function Dt(o,e,t){try{return o.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function It(o={}){return{inventory:Array.isArray(o.inventory)?o.inventory.filter(e=>e&&typeof e.id=="string"):[],elderMet:!!o.elderMet,voice:!!o.voice}}function Wt(o,e){const t=new URL("../mobile-playtest/experience/",o);try{const i=new URL(e==null?void 0:e.returnURL);if(i.origin===t.origin&&i.pathname===t.pathname)return i}catch{}return t}function Nt(){const o=Lt(sessionStorage,Ft);Dt(sessionStorage,Tt,{...It(o||{}),outside:!1,fromFishing:!0}),"speechSynthesis"in window&&speechSynthesis.cancel(),location.assign(Wt(location.href,o))}const j=[{id:"sockeye",name:"Adult Sockeye",points:100,size:.72,color:[.8,.2,.17],weight:.55},{id:"chinook",name:"Large Chinook",points:250,size:.95,color:[.55,.75,.8],weight:.2},{id:"smolt",name:"Juvenile Smolt",points:-50,size:.38,color:[.75,.9,.98],weight:.25}];class Ot{constructor(){this.reset()}reset(){this.score=0,this.combo=1,this.caughtCount=0,this.releasedSmolts=0,this.breakdown={sockeye:0,chinook:0,smolt:0}}catch(e){if(this.breakdown[e.id]++,e.id==="smolt")return this.score=Math.max(0,this.score-50),this.combo=1,-50;const t=e.points*this.combo;return this.score+=t,this.combo=Math.min(5,this.combo+1),this.caughtCount++,t}release(){return this.releasedSmolts++,this.score+=75,75}result(){return{score:this.score,caughtCount:this.caughtCount,releasedSmolts:this.releasedSmolts,breakdown:{...this.breakdown},rank:this.caughtCount>=5&&this.score>=1e3?"Plentiful harvest":"A lesson from the river",passed:this.caughtCount>=5&&this.score>=1e3}}}const I=o=>new Promise(e=>setTimeout(e,o*1e3));function Bt(o){if(new URLSearchParams(location.search).get("qa")!=="1")return;const e=document.createElement("section");e.id="browser-playtest",e.style.cssText="position:fixed;left:20px;top:110px;z-index:10000;background:#102a27ee;color:white;padding:12px;max-width:340px;font:13px sans-serif;pointer-events:auto",e.innerHTML='<b>LOCAL BROWSER PLAYTEST</b><p id="qa-result">Ready · uses real render assets and game updates</p><button id="qa-elder">Approach elder</button> <button id="qa-basket">Move basket</button> <button id="qa-catch">Scoop and deposit</button> <button id="qa-release">Release juvenile</button> <button id="qa-spam">Rough handling</button>',document.body.append(e);const t=e.querySelector("#qa-result");let i=!1,s=null;o.requestLock=()=>{o.pointerFallback=!0},o.pointerFallback=!0;const a=p=>{t.textContent=p,console.info("BROWSER_PLAYTEST",p)};async function n(p,d=6,u="state"){const m=performance.now()+d*1e3;for(;!p();){if(performance.now()>m)throw Error("Timed out "+u+": "+(s?s.mode+" fish "+[s.position.x,s.position.y,s.position.z].map(f=>f.toFixed(2)).join(","):"no fish")+" netY "+o.net.target.y.toFixed(2)+" reach "+o.net.inReach+" hold "+o.net.holdTime.toFixed(2));await I(.05)}}function l(p,d){const u=o.level.walkBounds,m=.2,f=Math.ceil((u.maxX-u.minX)/m)+1,g=Math.ceil((u.maxZ-u.minZ)/m)+1,v=o.camera.getPosition(),w=k=>o.navigation.sample(k.x,k.z)!==null&&!o.basket.blocksPlayer(k.x,k.z)&&Math.hypot(k.x-o.level.elder[0],k.z-o.level.elder[2])>o.obstacles.elder.radius+(o.basket.carried?.62:.18),S=Array.from({length:f*g},(k,M)=>({x:u.minX+M%f*m,z:u.minZ+Math.floor(M/f)*m}));let z=-1,E=-1,x=1/0,P=1/0;for(let k=0;k<S.length;k++){const M=S[k];if(!w(M))continue;const T=Math.hypot(M.x-v.x,M.z-v.z),D=Math.hypot(M.x-p,M.z-d);T<x&&(z=k,x=T),D<P&&(E=k,P=D)}const R=new Int32Array(S.length).fill(-2),b=[z];R[z]=-1;let C=0;for(;C<b.length&&R[E]===-2;){const k=b[C++],M=S[k],T=k%f,D=Math.floor(k/f);for(const[$,ht]of[[1,0],[-1,0],[0,1],[0,-1]]){const ne=T+$,re=D+ht;if(ne<0||re<0||ne>=f||re>=g)continue;const K=re*f+ne,X=S[K];R[K]!==-2||!w(X)||!w({x:(X.x+M.x)/2,z:(X.z+M.z)/2})||Math.abs(o.navigation.sample(X.x,X.z)-o.navigation.sample(M.x,M.z))>.35||(R[K]=k,b.push(K))}}if(R[E]===-2)throw Error("No dry route to browser test position");const A=[];for(let k=E;k>=0;k=R[k])A.push(S[k]);return A.reverse()}async function r(p,d){o.ui.hide(),o.paused=!1,o.keys.clear();const u=l(p,d),m=performance.now()+15e3;for(const f of u)for(;;){const g=o.camera.getPosition(),v=f.x-g.x,w=f.z-g.z;if(Math.hypot(v,w)<.12)break;if(performance.now()>m)throw o.keys.clear(),Error("Grounded walking route blocked at "+g.x.toFixed(2)+","+g.z.toFixed(2));o.yaw=Math.atan2(-v,-w)*180/Math.PI,o.keys.add("KeyW"),await I(.04)}o.keys.clear(),await I(.15)}function h(p,d){e.querySelector(p).onclick=async()=>{if(!i){i=!0;try{await d()}catch(u){o.keys.clear(),a("FAIL · "+u.message)}finally{i=!1}}}}h("#qa-elder",async()=>{if(o.reset(),o.requestLock=()=>{o.pointerFallback=!0},await r(3.55,.12),o.interact(),o.state.state!=="DIALOGUE")throw Error("Elder dialogue did not open");a("PASS · walking and elder dialogue")}),h("#qa-basket",async()=>{if(o.ui.hide(),o.paused=!1,o.state.state!=="PLAYING"&&(o.begin(.2),await I(2.7)),await r(4.8,.25),!o.basket.toggle(o.camera,!1))throw Error("Basket pickup failed");if(await r(4.8,.78),o.yaw=180,o.pitch=-25,await I(.15),!o.basket.toggle(o.camera,!1))throw Error("Dry bank placement failed");a("PASS · basket moved to "+o.basket.volume.x.toFixed(2)+", "+o.basket.volume.z.toFixed(2))});async function c(p){o.state.time=180,o.ui.hide(),o.paused=!1,o.state.state!=="PLAYING"&&(o.begin(.2),await I(2.7)),o.spawn.clock=1e6;for(const v of[...o.spawn.fish])v.mode!=="banked"&&o.spawn.remove(v);o.net.cancel(),await r(5.5,2.4);const d=o.spawn.spawn(p),u=o.river.safePoint(5.9,3.95,.5);d.position.set(u.x,o.level.waterY-.48,u.z),d.mode="qa",d.approach=!1,d.travelPhase=null,d.route=null,s=d;const m=o.camera.getPosition(),f=d.position.x-m.x,g=d.position.z-m.z;if(o.yaw=Math.atan2(-f,-g)*180/Math.PI,o.pitch=Math.atan2(d.position.y-m.y,Math.hypot(f,g))*180/Math.PI,o.net.pointer={x:innerWidth/2,y:innerHeight/2},o.net.blockedUntil=0,o.net.lastPress=-10,o.net.presses=[],await I(.6),o.net.down(),await n(()=>o.net.scoopReady,5,"net beneath fish"),o.net.up(),await n(()=>o.net.trapped.includes(d),2,"capture"),await I(1.4),d.mode!=="net")throw Error("A gentle lift lost the fish");return d}h("#qa-catch",async()=>{const p=await c(j[0]),d=o.score.caughtCount;if(a("Captured � tipping toward basket"),!o.net.deposit())throw Error("Basket was out of range");if(await n(()=>p.mode==="banked",7,"basket deposit"),await I(4.5),o.score.caughtCount!==d+1)throw Error("Deposit scoring was not exactly once");if(!o.basket.pile.bodies.every(u=>u.asleep))throw Error("Basket contents did not sleep");a("PASS · actual scoop, deposit, score and sleeping basket fish")}),h("#qa-release",async()=>{const p=await c(j[2]),d=o.score.releasedSmolts;if(o.releaseCargo(),await n(()=>p.mode==="current",3,"water release"),o.score.releasedSmolts!==d+1)throw Error("Water-confirmed juvenile release failed");a("PASS · juvenile release reaches water and earns one reward")}),h("#qa-spam",async()=>{const p=await c(j[0]),d=o.score.caughtCount;for(let u=0;u<5;u++)o.net.down(),o.net.up(),await I(.08);if(await n(()=>p.mode!=="net",3),o.score.caughtCount!==d)throw Error("Escape awarded points");a("PASS · rapid scoops eject fish without basket points")})}const $e=1347635022,Ke=1,Ut=2,H=[0,3,8,15,24],qt=`
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
`,Ht=`
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
`;class Ze{constructor(e,t){y(this,"numSplats");y(this,"fractionalBits");y(this,"shBands");y(this,"shDim");y(this,"antialiased");y(this,"positions");y(this,"alphas");y(this,"colors");y(this,"scales");y(this,"rotations");y(this,"sh");this.numSplats=e.numPoints,this.fractionalBits=e.fractionalBits,this.antialiased=e.antialiased,this.shDim=H[e.shDegree],this.shBands=Math.min(e.shDegree,3),this.positions=t.positions,this.alphas=t.alphas,this.colors=t.colors,this.scales=t.scales,this.rotations=t.rotations,this.sh=t.sh??null}getCenters(){const{numSplats:e,positions:t}=this,i=1/(1<<this.fractionalBits),s=new Float32Array(e*3);for(let a=0;a<e*3;a++){const n=a*3;let l=t[n]|t[n+1]<<8|t[n+2]<<16;l=l<<8>>8,s[a]=l*i}return s}calcAabb(e){const{numSplats:t,positions:i}=this,s=1/(1<<this.fractionalBits),a=new _(1/0,1/0,1/0),n=new _(-1/0,-1/0,-1/0);for(let l=0;l<t;l++)for(let r=0;r<3;r++){const h=(l*3+r)*3;let c=i[h]|i[h+1]<<8|i[h+2]<<16;c=c<<8>>8;const p=c*s,d=r===0?"x":r===1?"y":"z";a[d]=Math.min(a[d],p),n[d]=Math.max(n[d],p)}e.setMinMax(a,n)}}class Vt extends pt{constructor(e,t,i={}){super(e,t,i);const{numSplats:s,shBands:a}=t,n=[{name:"packedTexture",format:Pe},{name:"colorTexture",format:xe}],l=a>0?Math.ceil(H[a]*3/16):0;for(let v=0;v<l;v++)n.push({name:`shTexture${v}`,format:Pe});this._format=new ft(e,n,{readGLSL:qt,readWGSL:Ht}),this.streams.init(this.format,s),this.parameters.set("spzPositionScale",1/(1<<t.fractionalBits));const{positions:r,scales:h,rotations:c,colors:p,alphas:d}=t,u=this.streams.getTexture("packedTexture"),m=u.lock();for(let v=0;v<s;v++){const w=v*9,S=v*3,z=v*4;m[v*4+0]=r[w+0]|r[w+1]<<8|r[w+2]<<16|h[S+0]<<24,m[v*4+1]=r[w+3]|r[w+4]<<8|r[w+5]<<16|h[S+1]<<24,m[v*4+2]=r[w+6]|r[w+7]<<8|r[w+8]<<16|h[S+2]<<24,m[v*4+3]=c[z+0]|c[z+1]<<8|c[z+2]<<16|c[z+3]<<24}u.unlock();const f=this.streams.getTexture("colorTexture"),g=f.lock();for(let v=0;v<s;v++)g[v*4+0]=p[v*3+0],g[v*4+1]=p[v*3+1],g[v*4+2]=p[v*3+2],g[v*4+3]=d[v];if(f.unlock(),a>0){const v=t.sh,w=t.shDim*3,S=H[a]*3;for(let z=0;z<l;z++){const E=this.streams.getTexture(`shTexture${z}`),x=E.lock();for(let P=0;P<s;P++){const R=P*w+z*16;for(let b=0;b<4;b++){let C=0;for(let A=0;A<4;A++){const k=z*16+b*4+A;C|=(k<S?v[R+b*4+A]:128)<<A*8}x[P*4+b]=C}}E.unlock()}}}configureMaterialDefines(e){e.set("SH_BANDS",this.gsplatData.shBands)}}const Qe=o=>{const e=new Uint8Array(o,0,Math.min(2,o.byteLength));return e[0]===31&&e[1]===139},Gt=o=>{const e=new Blob([o]).stream().pipeThrough(new DecompressionStream("gzip"));return new Response(e).arrayBuffer()},jt=o=>{const e=new DataView(o);if(e.byteLength<16)throw new Error("Invalid spz file: too small");if(e.getUint32(0,!0)!==$e)throw new Error(`Invalid spz file: unexpected magic number 0x${e.getUint32(0,!0).toString(16)}`);const t=e.getUint32(4,!0);if(t!==3)throw new Error(`Unsupported spz version ${t}, only versions 3 and 4 are supported`);const i={numPoints:e.getUint32(8,!0),shDegree:e.getUint8(12),fractionalBits:e.getUint8(13),antialiased:(e.getUint8(14)&Ke)!==0};if(i.shDegree>=H.length)throw new Error(`Invalid spz file: unsupported SH degree ${i.shDegree}`);const{numPoints:s}=i,a=H[i.shDegree],n={positions:s*9,alphas:s,colors:s*3,scales:s*3,rotations:s*4,sh:s*a*3},l={};let r=16;for(const h in n){const c=n[h];if(c!==0){if(r+c>e.byteLength)throw new Error(`Invalid spz file: the ${h} stream extends past the end of the file`);l[h]=new Uint8Array(o,r,c),r+=c}}return new Ze(i,l)},Yt=(o,e)=>{const t=new DataView(o);if(t.byteLength<32)throw new Error("Invalid spz file: too small");const i=t.getUint32(0,!0),s=t.getUint32(4,!0);if(i!==$e)throw Qe(o)?new Error("Unsupported spz file: gzip based version, only versions 3 and 4 are supported"):new Error(`Invalid spz file: unexpected magic number 0x${i.toString(16)}`);if(s!==4)throw new Error(`Unsupported spz version ${s}, only versions 3 and 4 are supported`);const a={numPoints:t.getUint32(8,!0),shDegree:t.getUint8(12),fractionalBits:t.getUint8(13),flags:t.getUint8(14),numStreams:t.getUint8(15),tocByteOffset:t.getUint32(16,!0),antialiased:!1};if(a.antialiased=(a.flags&Ke)!==0,a.shDegree>=H.length)throw new Error(`Invalid spz file: unsupported SH degree ${a.shDegree}`);(a.flags&Ut)!==0&&console.warn("SpzParser: file contains extensions which are not supported and will be ignored");const n=a.numPoints,l=H[a.shDegree],r=["positions","alphas","colors","scales","rotations","sh"],h=[n*9,n,n*3,n*3,n*4,n*l*3].filter(u=>u>0);if(a.numStreams!==h.length)throw new Error(`Invalid spz file: expected ${h.length} streams, found ${a.numStreams}`);const c=a.numStreams*16;if(a.tocByteOffset<32||a.tocByteOffset+c>t.byteLength)throw new Error("Invalid spz file: table of contents out of bounds");const p={};let d=a.tocByteOffset+c;for(let u=0;u<a.numStreams;u++){const m=Number(t.getBigUint64(a.tocByteOffset+u*16,!0)),f=Number(t.getBigUint64(a.tocByteOffset+u*16+8,!0));if(f!==h[u])throw new Error(`Invalid spz file: unexpected size of the ${r[u]} stream`);if(d+m>t.byteLength)throw new Error("Invalid spz file: stream extends past the end of the file");const g=new Uint8Array(o,d,m);p[r[u]]=e.decompress(g,f),d+=m}return new Ze(a,p)};class Xt{constructor(e){y(this,"app");this.app=e}canParse(e){return e.ext==="spz"}_shouldAbort(e,t){var i,s;return t||!((i=this.app)!=null&&i.graphicsDevice)||this.app.graphicsDevice._destroyed?!0:!((s=this.app.assets)!=null&&s.get(e.id))}load(e,t,i){let s=!1;i.once("unload",()=>{s=!0});const a=()=>t(null,null),n=r=>{this._shouldAbort(i,s)?a():t(r)},l=r=>{var c;if(this._shouldAbort(i,s)){a();return}let h;try{const p=r(),d=((c=this.app.scene)==null?void 0:c.gsplatCentersEnabled)!==!1;h=new Vt(this.app.graphicsDevice,p,{prepareCenters:d}),h.antiAlias=p.antialiased}catch(p){t(p);return}t(null,h)};this.handler.fetch(e,ut.ResponseType.ARRAY_BUFFER,(r,h)=>{if(r){n(r);return}if(Qe(h)){Gt(h).then(c=>l(()=>jt(c)),n);return}if(!ke.getConfig("ZstdDecoderModule")){n("SpzParser: ZSTD decoder module is not registered. Use WasmModule.setConfig('ZstdDecoderModule', { glueUrl, wasmUrl }) before loading spz version 4 files.");return}ke.getInstance("ZstdDecoderModule",c=>{l(()=>Yt(h,c))})},i)}open(e,t){return t}}function $t(o,e,t=48){const i=Math.hypot(o,e),s=i>t?t/i:1;return{x:o*s/t,z:e*s/t}}class Kt{constructor(e){if(this.game=e,this.enabled=matchMedia("(pointer: coarse)").matches||new URLSearchParams(location.search).has("touch"),!this.enabled)return;document.body.classList.add("touch-mode"),e.pointerFallback=!0,this.axes={x:0,z:0},e.mobileInput=this,this.root=document.createElement("div"),this.root.id="touch-controls",this.root.innerHTML='<div id="move-stick" aria-label="Movement joystick"><span></span></div><div id="look-pad" aria-label="Drag to look"></div><div id="touch-actions"><button id="touch-context">Speak</button><button id="touch-basket">Basket</button><button id="touch-dip">Hold to dip</button><button id="touch-release">Release fish</button><button id="touch-jump">Jump</button><button id="touch-crouch">Crouch</button></div><div id="touch-tip">Left stick moves · drag the view to look</div>',document.getElementById("ui").append(this.root);const t=this.root.querySelector("#move-stick"),i=t.firstElementChild,s=()=>{this.axes={x:0,z:0},i.style.transform="translate(0,0)"};t.onpointerdown=r=>{r.preventDefault(),this.origin={x:r.clientX,y:r.clientY},t.setPointerCapture(r.pointerId),this.stickId=r.pointerId},t.onpointermove=r=>{r.pointerId===this.stickId&&(this.axes=$t(r.clientX-this.origin.x,r.clientY-this.origin.y),i.style.transform=`translate(${this.axes.x*38}px,${this.axes.z*38}px)`)};for(const r of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(r,()=>{this.stickId=null,s()});const a=this.root.querySelector("#look-pad");a.onpointerdown=r=>{this.lookId=r.pointerId,this.last={x:r.clientX,y:r.clientY},a.setPointerCapture(r.pointerId)},a.onpointermove=r=>{if(r.pointerId!==this.lookId||e.paused||!e.ui.modal.hidden)return;const h=r.clientX-this.last.x,c=r.clientY-this.last.y;e.yaw-=h*.17,e.pitch=Math.max(-78,Math.min(55,e.pitch-c*.14)),e.net.sweepInput=Math.max(-1,Math.min(1,(e.net.sweepInput??0)+h*.018)),this.last={x:r.clientX,y:r.clientY}},a.onpointerup=a.onpointercancel=()=>this.lookId=null;const n=(r,h)=>this.root.querySelector(r).onclick=c=>{c.preventDefault(),!e.paused&&e.ui.modal.hidden&&h()};n("#touch-context",()=>e.interact()),n("#touch-basket",()=>e.basket.toggle(e.camera,!!e.net.trapped.length)),n("#touch-release",()=>e.releaseCargo());const l=(r,h,c)=>{const p=this.root.querySelector(r);p.onpointerdown=d=>{d.preventDefault(),!(e.paused||!e.ui.modal.hidden)&&(p.setPointerCapture(d.pointerId),h())},p.onpointerup=d=>{d.preventDefault(),c()},p.onpointercancel=p.onlostpointercapture=c};l("#touch-dip",()=>{e.state.state==="PLAYING"&&(e.net.pointer={x:innerWidth/2,y:innerHeight/2},e.net.aim(1/60,!0),e.net.down())},()=>e.net.up()),l("#touch-jump",()=>e.keys.add("Space"),()=>e.keys.delete("Space")),l("#touch-crouch",()=>e.keys.add("ControlLeft"),()=>e.keys.delete("ControlLeft")),this.blur=()=>{s(),e.keys.delete("Space"),e.keys.delete("ControlLeft"),e.net.up()},window.addEventListener("blur",this.blur)}update(){if(!this.enabled)return;const e=this.game,t=!e.paused&&e.ui.modal.hidden&&!["EXITED","SUMMARY"].includes(e.state.state);if(this.root.hidden=!t,!t){this.axes={x:0,z:0};return}const i=!!e.net.trapped.length;this.root.querySelector("#touch-context").textContent=i?"Tip fish":"Speak",this.root.querySelector("#touch-context").hidden=!i&&!["EXPLORE","RETURN"].includes(e.state.state),this.root.querySelector("#touch-release").hidden=!i,this.root.querySelector("#touch-dip").hidden=i||e.state.state!=="PLAYING";const s=e.camera.getPosition(),a=e.basket.volume;this.root.querySelector("#touch-basket").hidden=i||!e.basket.carried&&Math.hypot(s.x-a.x,s.z-a.z)>1.8,this.root.querySelector("#touch-basket").textContent=e.basket.carried?"Place basket":"Basket"}destroy(){var e;this.blur&&window.removeEventListener("blur",this.blur),(e=this.root)==null||e.remove()}}class Ae{constructor(){this.height=1.65,this.offset=0,this.velocity=0,this.wasJump=!1}update(e,t){const i=t.has("ControlLeft")||t.has("ControlRight"),s=t.has("Space");return this.height+=((i?1.02:1.65)-this.height)*(1-Math.exp(-e*14)),s&&!this.wasJump&&this.offset<=0&&!i&&(this.velocity=4.4),this.wasJump=s,this.velocity-=12*e,this.offset=Math.max(0,this.offset+this.velocity*e),this.offset===0&&(this.velocity=0),this.height+this.offset}}function Ee(o){var e,t,i;if((e=o.anim)!=null&&e.component&&(o.anim.component.enabled=!1),!o.frozenBones){o.frozenBones=[];for(const s of["neck","head","tail_1","tail_2","tail_3","tail_4","tail_5","tail_6"]){const a=(i=(t=o.entity)==null?void 0:t.findByName)==null?void 0:i.call(t,s);a&&o.frozenBones.push({node:a,name:s,rotation:a.getLocalRotation().clone()})}}}function Je(o,e=0){Ee(o);for(const t of o.frozenBones){const i=t.name.startsWith("tail")?.3:-.12;t.node.setLocalRotation(t.rotation.clone().mul(new U().setFromEulerAngles(0,e*i,0)))}}function ge(o){var e;(e=o.anim)!=null&&e.component&&(o.anim.component.enabled=!0,o.anim.component.speed=1.5),o.frozenBones=null}const he=(o,e,t)=>({x:o,y:e,z:t});class Zt{constructor(e){this.volume=e,this.bodies=[],this.accumulator=0}add(e){var h;if(this.bodies.some(c=>c.fish===e))return;Ee(e);const t=this.volume,i=e.heading*Math.PI/180,s=e.species.size*.22,a=e.species.size*.15,n=he(e.position.x-t.x,e.position.y-t.baseY,e.position.z-t.z),l=[-1,0,1].map(c=>({p:he(n.x+Math.sin(i)*s*c,n.y,n.z+Math.cos(i)*s*c),old:he(n.x+Math.sin(i)*s*c,n.y,n.z+Math.cos(i)*s*c)})),r={fish:e,nodes:l,spacing:s,radius:a,asleep:!1,quiet:0,age:0,roll:(((h=e.body)==null?void 0:h.roll)??0)<0?-78:78};for(const c of this.bodies){const p=c.nodes[1].p;Math.hypot(p.x-n.x,p.z-n.z)<.65&&(c.asleep=!1,c.quiet=0)}e.mode="banked",e.banked=!0,this.bodies.push(r)}update(e){for(this.accumulator=Math.min(this.accumulator+e,.065);this.accumulator>=1/120;)this.step(1/120),this.accumulator-=1/120;for(const t of this.bodies)this.render(t)}step(e){const t=this.volume;for(const i of this.bodies)if(!i.asleep){i.age+=e;for(const s of i.nodes){const a=(s.p.x-s.old.x)*.94,n=(s.p.y-s.old.y)*.94,l=(s.p.z-s.old.z)*.94;Object.assign(s.old,s.p),s.p.x+=a,s.p.y+=n-9.81*e*e,s.p.z+=l}i.roll+=((i.roll<0?-82:82)-i.roll)*e*4}for(let i=0;i<6;i++){for(const s of this.bodies)if(!s.asleep){for(const[a,n,l,r]of[[0,1,s.spacing,.9],[1,2,s.spacing,.9],[0,2,s.spacing*2,.08]]){const h=s.nodes[a].p,c=s.nodes[n].p,p=c.x-h.x,d=c.y-h.y,u=c.z-h.z,m=Math.hypot(p,d,u)||1,f=(m-l)/m*.5*r;h.x+=p*f,h.y+=d*f,h.z+=u*f,c.x-=p*f,c.y-=d*f,c.z-=u*f}for(const a of s.nodes){a.p.y=Math.max(.055+s.radius,a.p.y);const n=Math.max(0,Math.min(1,a.p.y/(t.rimY-t.baseY))),l=t.radius*.7+t.radius*.3*n-s.radius,r=Math.hypot(a.p.x,a.p.z);r>l&&(a.p.x*=l/r,a.p.z*=l/r)}}for(let s=0;s<this.bodies.length;s++)for(let a=s+1;a<this.bodies.length;a++){const n=this.bodies[s],l=this.bodies[a];if(!(n.asleep&&l.asleep))for(const r of n.nodes)for(const h of l.nodes){const c=h.p.x-r.p.x,p=h.p.y-r.p.y,d=h.p.z-r.p.z,u=Math.hypot(c,p,d),m=n.radius+l.radius;if(u>=m)continue;n.asleep&&(n.asleep=!1,n.quiet=0),l.asleep&&(l.asleep=!1,l.quiet=0);const f=(m-u)/(u||1)*.5;r.p.x-=c*f,r.p.y-=p*f,r.p.z-=d*f,h.p.x+=c*f,h.p.y+=p*f,h.p.z+=d*f,u<1e-6&&(r.p.y-=m*.25,h.p.y+=m*.25)}}}for(const i of this.bodies){if(i.asleep)continue;const s=Math.max(...i.nodes.map(a=>Math.hypot(a.p.x-a.old.x,a.p.y-a.old.y,a.p.z-a.old.z)/e));if(i.quiet=s<.085?i.quiet+e:0,i.quiet>.45||i.age>4&&s<.2){i.asleep=!0;for(const a of i.nodes)Object.assign(a.old,a.p)}}}render(e){var v,w;const t=e.fish,i=this.volume,s=e.nodes[1].p,a=e.nodes[0].p,n=e.nodes[2].p;t.position.set(i.x+s.x,i.baseY+s.y,i.z+s.z);const l=n.x-a.x,r=n.y-a.y,h=n.z-a.z,c=Math.atan2(l,h)*180/Math.PI,p=-Math.atan2(r,Math.hypot(l,h))*180/Math.PI;t.entity.setPosition(t.position),t.entity.setEulerAngles(Math.max(-22,Math.min(22,p)),c,0),(w=(v=t.entity).rotateLocal)==null||w.call(v,0,0,e.roll);const d=s.x-a.x,u=s.z-a.z,m=n.x-s.x,f=n.z-s.z,g=Math.atan2(d*f-u*m,d*m+u*f)*180/Math.PI;Je(t,Math.max(-45,Math.min(45,g)))}clear(){this.bodies=[],this.accumulator=0}}class Qt{constructor(e,t,i,s,a){Object.assign(this,{entity:e,level:t,navigation:i,obstacles:s,onMessage:a});const n=t.basket;this.start=[...n],this.volume={x:n[0],z:n[2],baseY:n[1],rimY:n[1]+.52,radius:.45},this.pile=new Zt(this.volume),this.carried=!1;const l=this.canPlace(n[0],n[2]);l!==null&&(this.start[1]=l,this.volume.baseY=l,this.volume.rimY=l+.52),this.render()}render(){var e;(e=this.entity)==null||e.setPosition(this.volume.x,this.volume.baseY+.2663,this.volume.z)}canPlace(e,t){var n;if((n=this.obstacles)!=null&&n.overlaps(e,t,.6))return null;const i=this.navigation.sample(e,t);if(i===null||i<(this.level.waterY??-100)+.065)return null;const s=[i];for(let l=0;l<8;l++){const r=l/8*Math.PI*2,h=this.navigation.sample(e+Math.cos(r)*.27,t+Math.sin(r)*.27);h!==null&&h>=(this.level.waterY??-100)+.065&&s.push(h)}if(s.length<7||Math.max(...s)-Math.min(...s)>.3)return null;const a=this.surfaceTop(e,t);return Number.isFinite(a)&&a<(this.level.waterY??-100)+.065?null:Number.isFinite(a)?a:Math.max(...s)}toggle(e,t){if(t)return this.onMessage("Deposit or release the fish before lifting the basket."),!1;const i=e.getPosition();if(this.carried){const s=e.forward,a=Math.hypot(s.x,s.z)||1,n=i.x+s.x/a*.95,l=i.z+s.z/a*.95,r=this.canPlace(n,l);return r===null?(this.onMessage("Set the basket on a flat, dry rock away from the elder."),!1):(Object.assign(this.volume,{x:n,z:l,baseY:r,rimY:r+.52}),this.carried=!1,this.render(),this.onMessage("Basket placed · bring the net over its opening"),!0)}if(Math.hypot(i.x-this.volume.x,i.z-this.volume.z)>1.6)return this.onMessage("Walk closer to the basket · F picks it up"),!1;this.carried=!0;for(const s of this.pile.bodies){s.asleep=!0;for(const a of s.nodes)Object.assign(a.old,a.p)}return this.onMessage("Carrying basket · F places it on dry ground · net stowed"),!0}surfaceTop(e,t){const i=this.level.placementGrid,s=[];if(i)for(let a=-.28;a<=.28;a+=.07)for(let n=-.28;n<=.28;n+=.07){if(Math.hypot(n,a)>.3)continue;const l=Math.floor((e+n-i.minX)/i.cell),r=Math.floor((t+a-i.minZ)/i.cell);if(l<0||r<0||l>=i.width||r>=i.height)continue;const h=i.heights[r*i.width+l];h!==null&&s.push(h)}return s.sort((a,n)=>a-n),s.length?s[Math.floor((s.length-1)*.7)]+.006:-1/0}update(e){var t;if(this.carried){const i=e.getPosition(),s=e.forward,a=e.right,n=Math.hypot(s.x,s.z)||1,l={x:i.x+s.x/n*.65-a.x*.3,y:i.y-1.32,z:i.z+s.z/n*.65-a.z*.3};(t=this.obstacles)==null||t.projectPoint(l,.59),l.y=Math.max(l.y,this.surfaceTop(l.x,l.z)),Object.assign(this.volume,{x:l.x,z:l.z,baseY:l.y,rimY:l.y+.52})}this.render()}updatePile(e){if(!this.carried)this.pile.update(e);else for(const t of this.pile.bodies)this.pile.render(t)}accept(e){this.pile.add(e)}reset(e=!0){if(this.pile.clear(),this.carried=!1,e){const t=this.start;Object.assign(this.volume,{x:t[0],z:t[2],baseY:t[1],rimY:t[1]+.52})}this.render()}blocksPlayer(e,t){return!this.carried&&Math.hypot(e-this.volume.x,t-this.volume.z)<.48}}class Jt{constructor(e,t){this.level=e,this.npc=t,this.elder={x:e.elder[0],z:e.elder[2],base:e.elder[1],radius:.62,height:1.8},this.bounds=new He}update(){var t,i;const e=this.elder;e.radius=((t=this.npc)==null?void 0:t.mode)==="Working"?.8:.62,e.height=((i=this.npc)==null?void 0:i.mode)==="Working"?1.25:1.8,this.bounds.center.set(e.x,e.base+e.height/2,e.z),this.bounds.halfExtents.set(e.radius,e.height/2,e.radius)}overlaps(e,t,i=.2){const s=this.elder;return Math.hypot(e-s.x,t-s.z)<s.radius+i}projectPoint(e,t=.025){const i=this.elder;if(e.y<i.base-t||e.y>i.base+i.height+t)return!1;const s=e.x-i.x,a=e.z-i.z,n=Math.hypot(s,a),l=i.radius+t;return n>=l?!1:(e.x=i.x+s/(n||1)*l,e.z=i.z+(n?a/n:1)*l,!0)}segmentBlocked(e,t,i=.04){const s=new _(t.x-e.x,t.y-e.y,t.z-e.z),a=s.length();if(!a)return this.overlaps(e.x,e.z,i);const n=this.bounds.clone();n.halfExtents.addScalar(i);const l=new _;return n.intersectsRay(new Ve(new _(e.x,e.y,e.z),s.mulScalar(1/a)),l)&&l.distance(new _(e.x,e.y,e.z))<=a}netBlocked(e,t){const i=this.elder,s=e.y-.7<i.base+i.height&&e.y+.08>i.base&&this.overlaps(e.x,e.z,.57),a=t.x-e.x,n=t.z-e.z,l=Math.hypot(a,n)||1,r={x:e.x+a/l*3.5,y:t.y,z:e.z+n/l*3.5};return s||this.segmentBlocked(e,r,.055)}safeNet(e,t){const i=this.elder;if(!this.netBlocked(e,t))return e;const s=e.x-t.x,a=e.z-t.z;for(const n of[.45,-.45,.9,-.9,1.4,-1.4,Math.PI]){const l={x:t.x+s*Math.cos(n)-a*Math.sin(n),y:Math.max(e.y,i.base+.9),z:t.z+s*Math.sin(n)+a*Math.cos(n)};if(!this.netBlocked(l,t))return l}return null}}class Re{constructor(e){this.level=e,this.grid=e.navigationGrid??e.rockGrid,this.bank=e.bankBounds??{minX:1.8,maxX:5.6,minZ:-2.65,maxZ:1.6},this.bounds=e.walkBounds,this.radius=.17,this.eyeHeight=1.65}height(e,t){const i=this.grid,s=Math.floor((e-i.minX)/i.cell),a=Math.floor((t-i.minZ)/i.cell),n=s>=0&&a>=0&&s<i.width&&a<i.height?i.heights[a*i.width+s]:null;if(n!==null)return n;const l=this.level.rockGrid,r=Math.floor((e-l.minX)/l.cell),h=Math.floor((t-l.minZ)/l.cell);return r>=0&&h>=0&&r<l.width&&h<l.height?l.heights[h*l.width+r]:null}sample(e,t){const i=this.bank;if(e>i.minX+.15&&e<i.maxX-.15&&t>i.minZ+.15&&t<Math.min(1.6,i.maxZ))return this.level.player[1]-this.eyeHeight;const s=this.height(e,t);if(s===null||s<this.level.waterY+.065)return null;let a=0,n=s;for(let l=0;l<8;l++){const r=l*Math.PI/4,h=this.height(e+Math.cos(r)*this.radius,t+Math.sin(r)*this.radius);h!==null&&h>=this.level.waterY+.065&&Math.abs(h-s)<.4&&(a++,n+=h)}return a>=5?n/(a+1):null}move(e,t,i,{jumpHeight:s=0}={}){const a=this.bounds,n=this.sample(e.x,e.z)??e.y-this.eyeHeight;let l={x:e.x,z:e.z,ground:n};for(const[r,h]of[[e.x+t,e.z+i],[e.x+t,e.z],[e.x,e.z+i]]){if(r<a.minX||r>a.maxX||h<a.minZ||h>a.maxZ)continue;const c=this.sample(r,h);if(c!==null&&this.sample((e.x+r)/2,(e.z+h)/2)!==null&&c-n<.62+Math.min(.45,s)&&c-n>-.85){l={x:r,z:h,ground:c};break}}return l}}class ei{constructor(){this.reset()}set(e){this.state=e}update(e){return this.state==="PLAYING"&&(this.time=Math.max(0,this.time-e),this.time===0)?(this.state="RETURN",!0):!1}reset(){this.state="EXPLORE",this.time=60}}function ve(o,e,t){let i=!1;for(let s=0,a=t.length-1;s<t.length;a=s++){const n=t[s],l=t[a];n[1]>e!=l[1]>e&&o<(l[0]-n[0])*(e-n[1])/(l[1]-n[1])+n[0]&&(i=!i)}return i}class ti{constructor(e){this.level=e,this.river=e.river,this.water=e.water,this.grid=e.rockGrid,this.eddies=e.eddies.map(([t,i,s,a])=>({x:t,y:i,z:s,r:a,occupant:null}));for(const t of this.eddies){const i=this.safePoint(t.x,t.z,.52);t.x=i.x,t.z=i.z}}ground(e,t){const i=this.grid,s=Math.floor((e-i.minX)/i.cell),a=Math.floor((t-i.minZ)/i.cell);return s>=0&&s<i.width&&a>=0&&a<i.height?i.heights[a*i.width+s]:null}isClear(e,t,i=.35){if(!ve(e,t,this.water.polygon))return!1;for(let h=0;h<12;h++){const c=h*Math.PI/6;if(!ve(e+Math.cos(c)*i,t+Math.sin(c)*i,this.water.polygon))return!1}const s=this.grid,a=Math.floor((e-i-s.minX)/s.cell),n=Math.floor((e+i-s.minX)/s.cell),l=Math.floor((t-i-s.minZ)/s.cell),r=Math.floor((t+i-s.minZ)/s.cell);for(let h=l;h<=r;h++)for(let c=a;c<=n;c++){if(c<0||h<0||c>=s.width||h>=s.height||s.heights[h*s.width+c]===null)continue;const p=s.minX+c*s.cell,d=s.minZ+h*s.cell,u=Math.max(p,Math.min(p+s.cell,e)),m=Math.max(d,Math.min(d+s.cell,t));if(Math.hypot(u-e,m-t)<i)return!1}return!0}channelCenter(e,t=.45){for(let i=5.7;i<7.55;i+=.12)if(this.isClear(e,i,t))return i;return 7.3}safePoint(e,t,i=.35){if(this.isClear(e,t,i))return{x:e,z:t};for(let s=.1;s<3;s+=.1)for(let a=0;a<24;a++){const n=a*Math.PI/12,l=e+Math.cos(n)*s,r=t+Math.sin(n)*s;if(this.isClear(l,r,i))return{x:l,z:r}}throw Error("No safe fish position in river volume")}move(e,t,i,s=.35){const a={x:e.x,z:e.z};for(const n of[0,.6,-.6,1.2,-1.2,Math.PI/2,-Math.PI/2]){const l=a.x+t*Math.cos(n)-i*Math.sin(n),r=a.z+t*Math.sin(n)+i*Math.cos(n);if(this.isClear(l,r,s)){e.x=l,e.z=r;return}}}clamp(e,t=.35){if(!this.isClear(e.x,e.z,t)){const i=this.safePoint(e.x,e.z,t);e.x=i.x,e.z=i.z}return e.y=Math.max(this.water.bottomY+.25,Math.min(this.water.surfaceY-.23,e.y)),e}available(e){return this.eddies.find(t=>!t.occupant&&Math.abs(t.x-e.x)<.85&&Math.abs(t.z-e.z)<1.4)}segmentBlocked(e,t){const i=Math.ceil(Math.hypot(t.x-e.x,t.y-e.y,t.z-e.z)/.07);for(let s=1;s<i;s++){const a=s/i,n=e.x+(t.x-e.x)*a,l=e.z+(t.z-e.z)*a,r=e.y+(t.y-e.y)*a,h=this.ground(n,l);if(h!==null&&r<h+.045)return!0}return!1}path(e,t,i=.35,s=!1){const a=Math.max(e.z,t.z)>15,n=a?.45:.3,l=Math.min(...this.water.polygon.map(E=>E[0]))+.05,r=1.8,h=Math.ceil((Math.max(...this.water.polygon.map(E=>E[0]))-l)/n)+1,c=Math.ceil(((a?45:15)-r)/n)+1,p=h*c;this.navigation??(this.navigation=new Map);let d=this.navigation.get(`${i}:${a}`);d||(d=Array.from({length:p},(E,x)=>{const P=l+x%h*n,R=r+Math.floor(x/h)*n;return this.isClear(P,R,i)?{x:P,z:R}:null}),this.navigation.set(`${i}:${a}`,d));let u=-1,m=-1,f=1/0,g=1/0;for(let E=0;E<p;E++){const x=d[E];if(!x)continue;const P=Math.hypot(x.x-t.x,x.z-t.z);P<g&&(!s||x.x>this.river.goalX)&&(g=P,m=E)}if(m<0)return[];const v=new Int32Array(p).fill(-2),w=[m];v[m]=-1;let S=0;for(;S<w.length;){const E=w[S++],x=d[E],P=E%h,R=Math.floor(E/h),b=Math.hypot(x.x-e.x,x.z-e.z);b<f&&(f=b,u=E);for(const[C,A]of[[1,0],[1,1],[1,-1],[0,1],[0,-1],[-1,0],[-1,1],[-1,-1]]){const k=P+C,M=R+A;if(k<0||M<0||k>=h||M>=c)continue;const T=M*h+k,D=d[T];!D||v[T]!==-2||!this.isClear((x.x+D.x)/2,(x.z+D.z)/2,i)||![.25,.75].every($=>this.isClear(x.x+(D.x-x.x)*$,x.z+(D.z-x.z)*$,i))||(v[T]=E,w.push(T))}}if(u<0)return[];const z=[];for(let E=u;E!==-1;E=v[E])z.push(d[E]);return z}spawnPoint(e=.35,t=!1){if(t&&this.river.upstream){const s=this.river.upstream;return this.safePoint(s.laneMinX+Math.random()*(s.laneMaxX-s.laneMinX),s.spawnZ+Math.random()*5,e)}const i=this.path({x:this.river.spawnX,z:5.9},{x:this.river.goalX+.07,z:6.6},e,!0);if(!i.length)throw Error("River has no connected spawn-to-goal route");return i[0]}clear(){for(const e of this.eddies)e.occupant=null}}function ii(o,e,t,i,s){var E,x;const a=o.position,n=t.river.upstream;o.age+=e,o.wiggle+=e*5,o.travelPhase??(o.travelPhase="incoming");const l=((E=o.species)==null?void 0:E.id)==="chinook",r=((x=o.species)==null?void 0:x.id)==="smolt",h=(r?.65:l?1.25:.9)*(1+s*.2)*(o.sizeFactor??1);o.energy??(o.energy=o.stamina??1),o.energy=Math.max(.45,Math.min(o.stamina??1,o.energy+e*((i==null?void 0:i.scoopLock)===o?-.15:.06)));const c=(i==null?void 0:i.submerged)&&Math.hypot(a.x-i.target.x,a.z-i.target.z)<1.7&&(i.speed>.4||i.scoopLock===o);if(o.dodgeFromNet>0&&(o.dodgeFromNet-=e,o.travelPhase!=="escape"&&(o.travelPhase="escape",o.route=null)),o.travelPhase==="rest")if(o.rest-=e,o.mode="rest",o.rest<=0||c)o.travelPhase="escape",o.route=null;else return!1;const p=t.river.fishingPockets,d=p==null?void 0:p[Math.floor(o.seed??0)%p.length],u=t.river.escape??[1.7,7.3],m=o.travelPhase==="escape"?t.safePoint(u[0],u[1],o.radius):t.safePoint(((d==null?void 0:d[0])??n.targetX)+Math.sin(o.seed??0)*.4,((d==null?void 0:d[1])??n.targetZ)+Math.cos(o.seed??0)*.2,o.radius);o.route||(o.route=t.path(a,m,o.radius),o.routeIndex=0,o.stuckTime=0);let f=o.route[o.routeIndex];for(;f&&Math.hypot(f.x-a.x,f.z-a.z)<.12;)f=o.route[++o.routeIndex];if(!f)return Math.hypot(m.x-a.x,m.z-a.z)>.45?(o.route=null,!1):o.travelPhase==="escape"?!0:(o.approach=!1,o.travelPhase="rest",o.mode="rest",o.rest=r?1.8:l?1.1:1.5,o.route=null,!1);let g=f.x-a.x,v=f.z-a.z,w=Math.hypot(g,v)||1;const S={x:a.x,z:a.z};t.move(a,g/w*h*(o.travelPhase==="escape"?1.15+o.energy*.25:1)*e,v/w*h*(o.travelPhase==="escape"?1.15+o.energy*.25:1)*e,o.radius);const z=Math.hypot(a.x-S.x,a.z-S.z);return o.stuckTime=z<.002?(o.stuckTime??0)+e:0,o.stuckTime>.65&&(o.route=null,o.stuckTime=0),a.y=t.water.surfaceY-t.water.fishDepth-.025*Math.sin(o.wiggle*.5),t.clamp(a,o.radius),z>1e-4&&(o.heading=(o.heading??0)+Math.max(-e*150,Math.min(e*150,(Math.atan2(a.x-S.x,a.z-S.z)*180/Math.PI-(o.heading??0)+540)%360-180))),!1}function si(o,e){return Math.atan2(o,e)*180/Math.PI}function oi(o,e,t,i,s,a=Math.random){var f,g,v;if(o.dodgeFromNet>0&&t.river.upstream&&(o.travelPhase="escape",o.route=null),(o.approach||o.travelPhase)&&t.river.upstream)return ii(o,e,t,i,s);o.age+=e,o.wiggle+=e*(o.mode==="rest"?2:6);const n=o.position,l=o.radius??.35,r=(.8+s*.65)*(((f=o.species)==null?void 0:f.id)==="chinook"?1.3:((g=o.species)==null?void 0:g.id)==="smolt"?.7:1);let h=0,c=0;if(o.mode==="current"&&!o.visited){const w=t.available(n);w&&a()<e*1.8&&(o.eddy=w,w.occupant=o,o.mode="eddy",o.rest=2.5+a()*3,o.route=null)}if(o.mode==="current"||o.mode==="eddy"){if(!o.route){o.stage??(o.stage=0);const S=o.stage===0?t.safePoint(1.25,3.65,l):o.stage===1?t.safePoint(5.8,4.15,l):null,z=o.mode==="eddy"?o.eddy:S??{x:t.river.goalX+.07,z:6.4+Math.sin(o.seed)*.6};o.route=t.path(n,z,l,o.mode==="current"&&!S),o.routeIndex=0}let w=o.route[o.routeIndex];for(;w&&Math.hypot(w.x-n.x,w.z-n.z)<.1;)o.routeIndex++,w=o.route[o.routeIndex];if(w){const S=w.x-n.x,z=w.z-n.z,E=Math.hypot(S,z);h=S/E*r,c=z/E*r}else o.mode==="eddy"?(o.mode="rest",o.route=null):(o.stage??0)<2?(o.stage=(o.stage??0)+1,o.route=null):h=r}o.mode==="rest"&&(o.rest-=e,h=Math.cos(o.wiggle)*.04,c=Math.sin(o.wiggle)*.04,o.rest<=0&&(o.mode="current",o.visited=!0,o.eddy&&(o.eddy.occupant=null),o.eddy=null,o.route=null));const p=i!=null&&i.submerged?Math.hypot(n.x-i.target.x,n.z-i.target.z):99;(i==null?void 0:i.scoopLock)!==o&&p<1.5&&p>.55&&(i.still>1.8||i.speed>6.5||a()<e*s*.25)&&(o.flee=.65,o.mode="flee",o.eddy&&(o.eddy.occupant=null),o.eddy=null,o.visited=!0,o.route=null),o.mode==="flee"&&(o.flee-=e,h=1.6+s,c=Math.sign(n.z-((i==null?void 0:i.target.z)??n.z-1))*.8,o.flee<=0&&(o.mode="current",o.route=null)),((v=o.species)==null?void 0:v.id)==="chinook"&&(i!=null&&i.submerged)&&i.scoopLock===o&&i.holdTime>.6&&Math.sin(o.age*2+o.seed)>.9&&(c+=.6,h+=Math.cos(o.seed)*.5,i.scoopReady=!1,i.beneathTime=0);const d={x:n.x,z:n.z};t.move(n,h*e,c*e,l),n.y=t.water.surfaceY-t.water.fishDepth-.035*Math.sin(o.wiggle*.5+o.seed),t.clamp(n,l);const u=n.x-d.x,m=n.z-d.z;return o.mode==="rest"?o.heading=-90:Math.hypot(u,m)>1e-4&&(o.heading=si(u,m)),n.x>t.river.goalX}const ce=new Map;function ze(o){var l;if(ce.has(o))return ce.get(o);const e=(l=globalThis.__FRASER_ASSETS)==null?void 0:l[o];if(!e)return o;const t=atob(e),i=new Uint8Array(t.length);for(let r=0;r<t.length;r++)i[r]=t.charCodeAt(r);const s=o.split(".").pop(),a={wav:"audio/wav",glb:"model/gltf-binary",png:"image/png",jpg:"image/jpeg",spz:"application/octet-stream"}[s]??"application/octet-stream",n=URL.createObjectURL(new Blob([i],{type:a}));return ce.set(o,n),delete globalThis.__FRASER_ASSETS[o],n}function et(o,e=1){const t=new te;return t.diffuse=new F(...o),t.emissive=new F(...o.map(i=>i*.12)),t.metalness=0,t.useMetalness=!0,t.roughness=.8,e<1&&(t.opacity=e,t.blendType=be,t.depthWrite=!1),t.update(),t}function O(o,e,t,i,s,a,n=1){const l=new N(e);return l.addComponent("render",{type:t}),l.render.material=et(a,n),l.setPosition(...i),l.setLocalScale(...s),o.root.addChild(l),l}function tt(o,e){return e==="fish"?O(o,"Fallback fish","sphere",[0,0,0],[.16,.2,.65],[.75,.3,.2]):e==="elder"?O(o,"Fallback elder","capsule",[0,.85,0],[.55,1.65,.55],[.32,.26,.18]):O(o,"Fallback net pole","cylinder",[0,0,0],[.04,2,.04],[.5,.3,.12])}function Z(o,e,t="container"){return new Promise(i=>{let s=!1;const a=setTimeout(()=>{s||(s=!0,console.warn("Asset timed out",e),i(null))},matchMedia("(pointer: coarse)").matches?18e4:9e4);o.assets.loadFromUrlAndFilename(ze(e),e.split("/").pop(),t,(n,l)=>{s||(s=!0,clearTimeout(a),n&&console.warn("Asset unavailable",e,n),i(n?null:l))})})}function V(o){var e;return(e=o==null?void 0:o.resource)==null?void 0:e.instantiateRenderEntity()}function we(o,e=1){const t=o.findComponents("render");let i=null,s=!1;for(const r of t)for(const h of r.meshInstances){const c=h.skinInstance?h.mesh.aabb:h.aabb;s||(s=!!h.skinInstance),i?i.add(c):i=c.clone()}if(!i)return o;const a=e/(Math.max(i.halfExtents.x,i.halfExtents.y,i.halfExtents.z)*2),n=new N("Normalized asset");n.addChild(o);const l=o.getLocalPosition().clone();return o.setLocalPosition(l.sub(i.center)),n.setLocalScale(a,a,a),n}function it(o){var e;return((e=o.resource)==null?void 0:e.name)||o.name||""}function Te(o,e){return o.findIndex(t=>it(t).toLowerCase().includes(e.toLowerCase()))}function st(o,e,t="Swim"){var n;const i=((n=e==null?void 0:e.resource)==null?void 0:n.animations)||[];if(!i.length)return null;o.addComponent("anim",{activate:!0});const s=Math.max(0,Te(i,t)),a=i.map((l,r)=>({name:"Clip"+r,speed:1,loop:!0}));return o.anim.loadStateGraph({layers:[{name:"Base",states:[{name:"START"},...a],transitions:[{from:"START",to:"Clip"+s}]}],parameters:{}}),i.forEach((l,r)=>o.anim.assignAnimation("Clip"+r,l.resource)),o.anim.baseLayer.play("Clip"+s),{component:o.anim,names:i.map(it),play:l=>{const r=Te(i,l);r>=0&&o.anim.baseLayer.transition("Clip"+r,.25)}}}class ai{constructor(e,t,i,s){this.app=e,this.assets=t,this.river=i,this.onPass=s,this.fish=[],this.pool=[],this.clock=0,this.difficulty=.5}spawn(e=null){let t=Math.random();const i=e??(t<.55?j[0]:t<.75?j[1]:j[2]);let s=this.pool.find(l=>l.species.id===i.id);if(s)this.pool.splice(this.pool.indexOf(s),1);else{const l=i.id==="sockeye"?this.assets.sockeye:this.assets.chinook,r=V(l)||tt(this.app,"fish");for(const d of r.findComponents("render"))d.layers=[this.app.gameplayLayer??Ge];const h=l?st(r,l):null,c=we(r,i.size),p=new N("Fish "+i.id);p.addChild(c),this.app.root.addChild(p),s={entity:p,visual:c,anim:h,species:i,baseVisualScale:c.getLocalScale().clone()}}Object.assign(s,{position:new _(this.river.river.spawnX,this.river.water.surfaceY-this.river.water.fishDepth,this.river.channelCenter(this.river.river.spawnX,i.size*.56)+Math.random()*.3),route:null,routeIndex:0,travelPhase:null,approach:!!this.river.river.upstream,stage:0,releasedByPlayer:!1,scored:!1,banked:!1,intentionalRelease:!1,radius:i.size*.56,mode:"current",visited:!1,age:0,seed:Math.random()*20,wiggle:0,heading:180,eddy:null,trapped:0});const a=[.82,.94,1,1.08,1.16][Math.floor(Math.random()*5)];s.species={...i,size:i.size*a},s.sizeFactor=a,s.stamina=.7+a*.25+Math.random()*.35,s.energy=s.stamina,s.radius=s.species.size*.56,s.visual.setLocalScale(s.baseVisualScale.clone().mulScalar(a));const n=this.river.spawnPoint(s.radius,!!s.approach);return s.position.x=n.x,s.position.z=n.z,this.river.clamp(s.position,s.radius),ge(s),s.entity.enabled=!0,this.fish.push(s),s}remove(e){e.eddy&&(e.eddy.occupant=null),this.fish.splice(this.fish.indexOf(e),1),e.entity.enabled=!1,this.pool.push(e)}update(e,t,i=!0){this.clock-=e,i&&this.clock<=0&&this.fish.filter(s=>s.mode!=="banked").length<13&&(this.spawn(),this.clock=1.15+Math.random()*.7);for(const s of[...this.fish]){if(s.mode==="net"||s.mode==="banked"||s.mode==="airborne"){s.entity.setPosition(s.position);continue}if(oi(s,e,this.river,t,this.difficulty)){this.onPass(s),this.remove(s);continue}s.entity.setPosition(s.position),s.entity.setEulerAngles(0,s.heading,Math.sin(s.wiggle)*3),s.anim&&(s.anim.component.speed=s.mode==="rest"?.6:1.5)}}clear(){for(const e of[...this.fish])this.remove(e);this.river.clear(),this.clock=0}destroy(){for(const e of[...this.fish,...this.pool])e.entity.destroy();this.fish=[],this.pool=[]}}const B=(o=0,e=0,t=0)=>({x:o,y:e,z:t}),ni=o=>Math.hypot(o.x,o.y,o.z),de=(o,e)=>o.x*e.x+o.y*e.y+o.z*e.z;function ue(o,e){return{x:e.center.x+e.right.x*o.x+e.normal.x*o.y+e.forward.x*o.z,y:e.center.y+e.right.y*o.x+e.normal.y*o.y+e.forward.y*o.z,z:e.center.z+e.right.z*o.x+e.normal.z*o.y+e.forward.z*o.z}}function W(o,e){const t={x:o.x-e.center.x,y:o.y-e.center.y,z:o.z-e.center.z};return{x:de(t,e.right),y:de(t,e.normal),z:de(t,e.forward)}}function ae(o={x:0,y:0,z:0}){return{center:{...o},right:B(1,0,0),normal:B(0,1,0),forward:B(0,0,1)}}function ri(o=32,e=8,t=.54,i=.65){const s=[],a=[],n=[],l=[];for(let c=0;c<e;c++){const p=c/e,d=t*Math.sqrt(Math.max(.015,1-p*p));for(let u=0;u<o;u++){const m=u/o*Math.PI*2;s.push(B(Math.cos(m)*d,-i*p,Math.sin(m)*d)),a.push(c===0)}}const r=s.length;s.push(B(0,-i,0)),a.push(!1);const h=(c,p,d,u=!1)=>{const m=s[c],f=s[p];n.push({a:c,b:p,rest:Math.hypot(m.x-f.x,m.y-f.y,m.z-f.z),stiff:d}),u&&l.push([c,p])};for(let c=0;c<e;c++)for(let p=0;p<o;p++){const d=c*o+p,u=c*o+(p+1)%o;h(d,u,.93,!0),c<e-1?(h(d,d+o,.94,!0),h(d,(c+1)*o+(p+1)%o,.48),h(u,d+o,.48)):h(d,r,.94,!0),c<e-2&&h(d,d+2*o,.24)}return{rest:s,pins:a,edges:n,visible:l,sectors:o,rings:e,radius:t,depth:i}}function Fe(o=.72,e=0,t=.7){return{halfLength:o*.29,radius:o*.16,mass:t,yaw:e,roll:0,velocity:B(),previous:B(),captured:!1}}function li(o,e,t,i,s,a=.54){const n=W(t,o),l=W(i,e),r=s.radius*.35;return n.y>=-r&&l.y<=r&&l.y>=-.28&&Math.hypot(l.x,l.z)<a-s.radius*.5&&(e.center.y>o.center.y+1e-4||n.y-l.y>.015)}function hi(o,e,t,i){return o.y>i.rimY&&e.y<=i.rimY&&t.y<-.05&&Math.hypot(e.x-i.x,e.z-i.z)<i.radius}function pe(o,e,t){const i=(a,n)=>({x:a.x+(n.x-a.x)*t,y:a.y+(n.y-a.y)*t,z:a.z+(n.z-a.z)*t}),s=a=>{const n=Math.hypot(a.x,a.y,a.z)||1;return{x:a.x/n,y:a.y/n,z:a.z/n}};return{center:i(o.center,e.center),right:s(i(o.right,e.right)),normal:s(i(o.normal,e.normal)),forward:s(i(o.forward,e.forward))}}class ci{constructor(e={}){this.lattice=ri(e.sectors??32,e.rings??8,e.radius??.54,e.depth??.65),this.positions=this.lattice.rest.map(t=>({...t})),this.previous=this.positions.map(t=>({...t})),this.pose=ae(),this.time=0,this.accumulator=0,this.reset(this.pose)}reset(e){this.pose=pe(e,e,1),this.accumulator=0;for(let t=0;t<this.positions.length;t++)Object.assign(this.positions[t],ue(this.lattice.rest[t],e)),Object.assign(this.previous[t],this.positions[t])}step(e,t,{body:i=null,waterY:s=-100,ground:a=null,contain:n=!0,obstacles:l=null}={}){this.obstacles=l,this.accumulator=Math.min(this.accumulator+e,.065);const r=1/120,h=Math.floor((this.accumulator+1e-10)/r);if(!h)return;const c=this.pose,p=h*r;this.frameVelocity={x:(t.center.x-c.center.x)/p,y:(t.center.y-c.center.y)/p,z:(t.center.z-c.center.z)/p};for(let d=1;d<=h;d++)this.substep(r,pe(c,t,d/h),i,s,a,n),this.accumulator-=r;this.accumulator=Math.max(0,this.accumulator),this.pose=pe(t,t,1)}substep(e,t,i,s,a,n){this.time+=e;const{pins:l,edges:r,rest:h}=this.lattice,c=this.positions,p=this.previous;for(let d=0;d<c.length;d++){if(l[d]){Object.assign(p[d],c[d]),Object.assign(c[d],ue(h[d],t));continue}const u=c[d],m=p[d],f=u.y<s,g=Math.exp(-e*(f?12:1.8)),v=(u.x-m.x)*g,w=(u.y-m.y)*g,S=(u.z-m.z)*g;Object.assign(m,u),u.x+=v+(f?.07:0)*e*e,u.y+=w-9.81*(f?.55:1)*e*e,u.z+=S}if(i){i.onCloth=!1;const d=i.position,u=i.velocity;i.previous={...d};const m=d.y<s,f=Math.exp(-e*(m?3:.35));if(u.x*=f,u.y=u.y*f-9.81*(m?.16:1)*e,u.z*=f,i.captured&&i.allowEscape){const g=W(d,t);u.x-=(t.right.x*g.x+t.forward.x*g.z)*e*5,u.z-=(t.right.z*g.x+t.forward.z*g.z)*e*5}d.x+=u.x*e,d.y+=u.y*e,d.z+=u.z*e}for(let d=0;d<6;d++){for(const u of r){const m=c[u.a],f=c[u.b],g=f.x-m.x,v=f.y-m.y,w=f.z-m.z,S=Math.hypot(g,v,w)||1e-8,z=l[u.a]?0:1,E=l[u.b]?0:1,x=z+E;if(!x)continue;const P=(S-u.rest)/S*u.stiff/x;m.x+=g*P*z,m.y+=v*P*z,m.z+=w*P*z,f.x-=g*P*E,f.y-=v*P*E,f.z-=w*P*E}if(i&&this.collideBody(i,t,n),a)for(let u=this.lattice.sectors;u<c.length;u++){const m=a(c[u].x,c[u].z);m!==null&&c[u].y<m+.012&&(c[u].y=m+.012,p[u].x=c[u].x,p[u].z=c[u].z)}if(this.obstacles)for(let u=this.lattice.sectors;u<c.length;u++)this.obstacles.projectPoint(c[u],.015);for(let u=0;u<this.lattice.sectors;u++)Object.assign(c[u],ue(h[u],t))}if(i){const d=i.position;if(i.velocity.x=(d.x-i.previous.x)/e,i.velocity.y=(d.y-i.previous.y)/e,i.velocity.z=(d.z-i.previous.z)/e,i.allowEscape&&i.onCloth){const m=this.frameVelocity??B(),f=1-Math.exp(-e*10);i.velocity.x+=(m.x-i.velocity.x)*f,i.velocity.z+=(m.z-i.velocity.z)*f,i.velocity.y<m.y&&(i.velocity.y=m.y)}const u=ni(i.velocity);u>6&&(i.velocity.x*=6/u,i.velocity.y*=6/u,i.velocity.z*=6/u)}}collideBody(e,t,i){const s=e.position,a=e.yaw*Math.PI/180,n=B(Math.sin(a),0,Math.cos(a)),l=e.radius;for(let r=this.lattice.sectors;r<this.positions.length;r++){const h=this.positions[r],c=h.x-s.x;h.y-s.y;const p=h.z-s.z,d=Math.max(-e.halfLength,Math.min(e.halfLength,c*n.x+p*n.z)),u=s.x+n.x*d,m=s.z+n.z*d,f=h.x-u,g=h.y-s.y,v=h.z-m,w=Math.hypot(f,g,v);if(w<l&&w>1e-8){const S=(l-w)/w,z=e.allowEscape?1:.98;h.x+=f*S*z,h.y+=g*S*z,h.z+=v*S*z,s.x-=f*S*(1-z),s.y-=g*S*(1-z),s.z-=v*S*(1-z)}}if(i&&t.normal.y>.35){let r=W(s,t);if(e.allowEscape&&r.y<-.1){const u=Math.hypot(r.x,r.z),m=this.lattice.radius*Math.sqrt(Math.max(.1,1-(r.y/.9)**2))-l*.15;if(u>m){const f=(u-m)/u;s.x-=(t.right.x*r.x+t.forward.x*r.z)*f,s.y-=(t.right.y*r.x+t.forward.y*r.z)*f,s.z-=(t.right.z*r.x+t.forward.z*r.z)*f,s.x+=t.normal.x*(u-m)*.35,s.y+=t.normal.y*(u-m)*.35,s.z+=t.normal.z*(u-m)*.35,r=W(s,t)}}if(e.allowEscape&&(Math.hypot(r.x,r.z)>this.lattice.radius-l*.15||r.y>.22))return;let h=0;for(let u=(this.lattice.rings-1)*this.lattice.sectors;u<this.positions.length;u++)h+=W(this.positions[u],t).y;h/=this.lattice.sectors+1,h=Math.max(-1.05,Math.min(-.48,h));const c=Math.hypot(r.x,r.z),p=h*(1-Math.min(.95,(c/this.lattice.radius)**2))+l*.85;if(r.y<p){e.onCloth=!0;const u=p-r.y;s.x+=t.normal.x*u,s.y+=t.normal.y*u,s.z+=t.normal.z*u}if(!e.allowEscape&&r.y>.05){const u=r.y-.05;s.x-=t.normal.x*u,s.y-=t.normal.y*u,s.z-=t.normal.z*u}const d=this.lattice.radius-l*.8;if(!e.allowEscape&&c>d){const u=(c-d)/(c||1);s.x-=(t.right.x*r.x+t.forward.x*r.z)*u,s.y-=(t.right.y*r.x+t.forward.y*r.z)*u,s.z-=(t.right.z*r.x+t.forward.z*r.z)*u}}}get sag(){let e=0;for(let t=(this.lattice.rings-1)*this.lattice.sectors;t<this.positions.length;t++)e+=W(this.positions[t],this.pose).y;return-e/(this.lattice.sectors+1)}}function di(o,e,t,i,s){const a=ae(o),n=t?.12:i>0?s==="clean"?.12:.055:.025,l=Math.max(-.38,Math.min(.38,-e.x*n)),r=Math.max(-.38,Math.min(.38,-e.z*n)),h=Math.sqrt(Math.max(.1,1-l*l-r*r));a.normal={x:l,y:h,z:r};const c=Math.hypot(h,l);return a.right={x:h/c,y:-l/c,z:0},a.forward={x:-l*r/c,y:-h*r/c,z:c},a}function Le(o,e,t,{tipping:i=!1,side:s=1,project:a=!1}={}){if(!t)return!1;const n=o.x-t.x,l=o.z-t.z,r=Math.hypot(n,l);if(i||r>=1.24)return!1;const h=e.x-t.x,c=e.z-t.z,p=Math.hypot(h,c)||1,d=-c/p*s,u=h/p*s;return o.x=t.x+(a&&r>.01?n/r:d)*1.26,o.z=t.z+(a&&r>.01?l/r:u)*1.26,o.y=Math.min(o.y,t.rimY+.1),!0}function ui(o,e,t){if(!t||e.y>t.rimY+.12||e.y<t.baseY-.12)return!1;const i=o.x-e.x,s=o.z-e.z,a=Math.hypot(i,s)||1,n=(l,r)=>{const h=l/a*3.5,c=r/a*3.5,p=Math.max(0,Math.min(1,((t.x-e.x)*h+(t.z-e.z)*c)/(3.5*3.5)));return Math.hypot(e.x+h*p-t.x,e.z+c*p-t.z)>.72};if(n(i,s))return!1;for(const l of[.5,-.5,.9,-.9,1.4,-1.4]){const r=i*Math.cos(l)-s*Math.sin(l),h=i*Math.sin(l)+s*Math.cos(l);if(n(r,h))return o.x=e.x+r,o.z=e.z+h,!0}return!1}function pi(o,e,t=.02){if(!e||o.y>e.rimY+t||o.y<e.baseY-t)return!1;const i=o.x-e.x,s=o.z-e.z,a=Math.hypot(i,s),n=.61+t;return a>=n?!1:(o.x=e.x+(a?i/a:1)*n,o.z=e.z+(a?s/a:0)*n,!0)}const De={smolt:{period:4.4,start:.32,end:.68},sockeye:{period:3.8,start:.39,end:.61},chinook:{period:3.3,start:.44,end:.56}};class fe{reset(){this.fish=null,this.elapsed=0,this.value=0,this.active=!1,this.ready=!1}constructor(){this.reset()}update(e,t,i,s=!1){t!==this.fish&&(this.reset(),this.fish=t);const a=De[t==null?void 0:t.species.id]??De.sockeye;Object.assign(this,a);const n=(t==null?void 0:t.stamina)??1,l=(this.end-this.start)/Math.max(.8,n);if(this.start=.5-l/2,this.end=.5+l/2,this.period/=Math.sqrt(n),this.aligned=!!t&&i,this.active=s||this.aligned,!this.active){this.ready=!1;return}this.elapsed+=e;const r=this.elapsed/(this.period/2)%2;this.value=r<=1?r:2-r,this.ready=this.aligned&&this.value>=this.start&&this.value<=this.end}quality(){return this.aligned?this.ready?"clean":this.value>.18&&this.value<.82?"sluggish":"miss":"miss"}}function fi(o,e,t,i=null,s=!1){const a=n=>{var r;return["net","banked","airborne"].includes(n.mode)||Math.hypot(n.position.x-e.x,n.position.z-e.z)>(n===i?1:.8)?!1:s&&n.position.y<e.y-.15?(n.dodgeFromNet=.8,!1):!((r=t.segmentBlocked)!=null&&r.call(t,{x:e.x,y:Math.max(e.y,n.position.y)+.08,z:e.z},n.position))};return i&&o.includes(i)&&a(i)?i:o.filter(a).sort((n,l)=>Math.hypot(n.position.x-e.x,n.position.z-e.z)-Math.hypot(l.position.x-e.x,l.position.z-e.z))[0]??null}class mi{constructor(e,t){this.y=t,this.clock=0,this.last=null,this.drops=Array.from({length:72},()=>{const i=O(e,"River spray","sphere",[0,0,0],[.025,.025,.025],[.65,.85,.81],.7);return i.enabled=!1,{entity:i,life:0,v:new _,p:new _}}),this.waves=Array.from({length:5},()=>({age:10,parts:Array.from({length:24},()=>{const i=O(e,"Scoop wake","sphere",[0,0,0],[.08,.009,.035],[.65,.88,.84],.4);return i.enabled=!1,i})}))}impulse(e,t=1){for(let s=0;s<Math.min(22,Math.ceil(t*12));s++){const a=this.drops.find(r=>r.life<=0);if(!a)break;const n=Math.random()*Math.PI*2,l=.3+Math.random()*t;a.p.copy(e),a.p.y=this.y+.025,a.v.set(Math.cos(n)*l,.7+Math.random()*t,Math.sin(n)*l),a.life=.4+Math.random()*.5}const i=this.waves.find(s=>s.age>1.8);i&&(i.age=0,i.x=e.x,i.z=e.z)}update(e,t){this.clock+=e;const i=t.target;this.last&&((this.last.y-this.y)*(i.y-this.y)<0&&this.impulse(i,Math.min(2,.5+Math.abs(i.y-this.last.y)/Math.max(e,.001)*.2)),t.submerged&&t.speed>.15&&this.clock>.22&&(this.impulse(i,Math.min(.65,t.speed*.2)),this.clock=0)),this.last=i.clone();for(const s of this.drops)s.life-=e,s.entity.enabled=s.life>0,s.life>0&&(s.v.y-=9.81*e,s.p.add(s.v.clone().mulScalar(e)),s.p.y<this.y&&(s.life=0),s.entity.setPosition(s.p));for(const s of this.waves){s.age+=e;for(let a=0;a<s.parts.length;a++){const n=s.parts[a];if(n.enabled=s.age<1.8,n.enabled){const l=a/s.parts.length*Math.PI*2,r=.2+s.age*.8;n.setPosition(s.x+Math.cos(l)*r,this.y+.018,s.z+Math.sin(l)*r),n.setLocalScale(.06+r*.05,.009,.025),n.render.material.opacity=(1-s.age/1.8)*.45,n.render.material.update()}}}}destroy(){for(const e of this.drops)e.entity.destroy();for(const e of this.waves)for(const t of e.parts)t.destroy()}}class yi{constructor(e,t,i){this.app=e,this.physics=t,this.mesh=new ee(e.graphicsDevice),this.entity=new N("Simulated woven net");const s=et([.53,.45,.29]);s.cull=ie,s.roughness=1,s.update(),this.entity.addComponent("render",{meshInstances:[new je(this.mesh,s)],castShadows:!1}),e.root.addChild(this.entity);const a=t.lattice.visible.length;this.positions=new Float32Array(a*12),this.normals=new Float32Array(a*12);const n=[];for(let l=0;l<a;l++){const r=l*4;n.push(r,r+1,r+2,r,r+2,r+3)}this.mesh.setIndices(n),this.mesh.setPositions(this.positions),this.mesh.setNormals(this.normals),this.mesh.update(),this.originalFrame=V(i),this.originalFrame&&e.root.addChild(this.originalFrame),this.frame=[];for(let l=0;l<(this.originalFrame?0:48);l++){const r=O(e,"Pinned cedar hoop","cylinder",[0,0,0],[.023,.07,.023],[.48,.3,.13]);this.frame.push(r)}this.pole=this.originalFrame?null:O(e,"Rigid cedar dip-net pole","cylinder",[0,0,0],[.038,3.2,.038],[.3,.15,.06])}update(e,t,i){const s=this.physics.lattice.visible,a=this.physics.positions,n=i.forward;for(let d=0;d<s.length;d++){const[u,m]=s[d],f=a[u],g=a[m],v=g.x-f.x,w=g.y-f.y,S=g.z-f.z;let z=w*n.z-S*n.y,E=S*n.x-v*n.z,x=v*n.y-w*n.x;const P=Math.hypot(z,E,x)||1,R=.004/P;z*=R,E*=R,x*=R;const b=[f.x-z,f.y-E,f.z-x,f.x+z,f.y+E,f.z+x,g.x+z,g.y+E,g.z+x,g.x-z,g.y-E,g.z-x];this.positions.set(b,d*12);for(let C=0;C<4;C++)this.normals.set([-n.x,-n.y,-n.z],d*12+C*3)}this.mesh.setPositions(this.positions),this.mesh.setNormals(this.normals),this.mesh.update();const l=new _(e.center.x,e.center.y,e.center.z);for(let d=0;d<this.frame.length;d++){const u=d/this.frame.length*Math.PI*2,m=(d+1)/this.frame.length*Math.PI*2,f=S=>new _(l.x+(e.right.x*Math.cos(S)+e.forward.x*Math.sin(S))*.54,l.y+(e.right.y*Math.cos(S)+e.forward.y*Math.sin(S))*.54,l.z+(e.right.z*Math.cos(S)+e.forward.z*Math.sin(S))*.54),g=f(u),v=f(m),w=v.clone().sub(g);this.frame[d].setPosition(g.clone().add(v).mulScalar(.5)),this.frame[d].setLocalScale(.024,w.length(),.024),this.frame[d].setRotation(new U().setFromDirections(_.UP,w.normalize()))}if(this.originalFrame){const d=new _(e.normal.x,e.normal.y,e.normal.z),u=t.clone().sub(l);u.sub(d.clone().mulScalar(u.dot(d))).normalize();const m=new Y().setLookAt(l,l.clone().sub(u),d);this.originalFrame.setPosition(l),this.originalFrame.setRotation(new U().setFromMat4(m));return}const r=t.clone().sub(l),h=new _(e.normal.x,e.normal.y,e.normal.z);r.sub(h.mulScalar(r.dot(h))).normalize();const c=l.clone().add(r.mulScalar(.54)),p=c.clone().sub(t).normalize();this.pole.setPosition(c.clone().sub(p.clone().mulScalar(1.6))),this.pole.setRotation(new U().setFromDirections(_.UP,p))}setVisible(e){this.entity.enabled=e,this.originalFrame&&(this.originalFrame.enabled=e),this.pole&&(this.pole.enabled=e);for(const t of this.frame)t.enabled=e}destroy(){var e,t;this.entity.destroy(),this.mesh.destroy(),(e=this.pole)==null||e.destroy(),(t=this.originalFrame)==null||t.destroy();for(const i of this.frame)i.destroy()}}class Ie{constructor(e=.54){this.radius=e,this.bounds=new He(new _(0,-.35,0),new _(e,.55,e)),this.ray=new Ve(new _,new _(0,-1,0)),this.hit=new _}contains(e,t,i=.1){const s=W(e,t);return this.ray.origin.set(s.x,.35,s.z),this.bounds.intersectsRay(this.ray,this.hit)&&Math.hypot(s.x,s.z)<this.radius-i*.15&&s.y>-.95&&s.y<.28}}class gi{constructor(e,t,i,s,a,n){Object.assign(this,{app:e,camera:t,level:s,onCatch:a,onMessage:n}),this.target=new _,this.pointer={x:innerWidth/2,y:innerHeight/2},this.physics=new ci,this.waterFX=new mi(e,s.waterY),this.renderer=new yi(e,this.physics,i),this.zone=new Ie,this.gauge=new fe,this.pose=ae(),this.enabled=!1,this.submerged=!1,this.trapped=[],this.speed=0,this.still=0,this.lift=0,this.clock=0,this.holdTime=0,this.lastPress=-10,this.presses=[],this.blockedUntil=0,this.strain=0,this.initialized=!1;const l=s.basket;this.basket={x:l[0],z:l[2],baseY:l[1],rimY:l[1]+.52,radius:.45}}aim(e,t){var l,r,h,c;const i=this.camera.getPosition(),s=t?this.camera.forward.clone():this.camera.camera.screenToWorld(this.pointer.x,this.pointer.y,50).sub(i).normalize(),a=new _(s.x,0,s.z).normalize(),n=s.y<-.03?L.clamp((this.level.waterY-(((l=this.level.water)==null?void 0:l.fishDepth)??.48)-i.y)/s.y*Math.hypot(s.x,s.z),.9,3.1):2.6;if(this.desired=i.clone().add(a.mulScalar(this.trapped.length?1.15:this.enabled?n:1.4)),this.desired.y=this.trapped.length?i.y-.65:this.submerged?this.level.waterY-.65:this.level.waterY+.48,!this.trapped.length){this.submerged&&this.target.y<this.level.waterY+.04&&this.clock>=this.blockedUntil?(this.scoopLock=fi((this.fishCandidates??[]).filter(d=>Math.hypot(d.position.x-i.x,d.position.z-i.z)<3.8),this.target,this.river,this.scoopLock,this.holdTime>.55),this.lockedFish=this.scoopLock):this.lift<=0&&(this.lockedFish=null,this.scoopLock=null);const p=this.scoopLock;if(p&&(this.submerged||this.lift>0)){this.desired.x=p.position.x,this.desired.z=p.position.z;const d=(this.sweepInput??0)*.32;this.desired.x+=this.camera.right.x*d,this.desired.z+=this.camera.right.z*d,this.submerged&&(this.desired.y=p.position.y-.2)}}if(this.lift>0&&this.releaseSweep){const p=1-this.lift/(this.liftDuration||1.8),d=Math.sin(Math.max(0,p)*Math.PI)*(this.scoopQuality==="clean"?.13:.3);this.desired.x+=this.releaseSweep.x*d,this.desired.z+=this.releaseSweep.z*d}this.inReach=!!((r=this.river)!=null&&r.isClear(this.desired.x,this.desired.z,.48)),!this.inReach&&!this.submerged&&!this.trapped.length&&(this.desired.y=i.y-.65),this.submerged&&!this.trapped.length&&(!this.inReach||this.initialized&&((c=(h=this.river)==null?void 0:h.segmentBlocked)!=null&&c.call(h,this.target,this.desired)))&&this.desired.copy(this.target)}down(){var t,i;if(!this.enabled||(t=this.basketController)!=null&&t.carried)return;this.clock??(this.clock=0),this.presses??(this.presses=[]),this.lastPress??(this.lastPress=-10),this.strain??(this.strain=0),this.presses=this.presses.filter(s=>this.clock-s<1.1),this.presses.push(this.clock);const e=this.clock-this.lastPress<.28||this.presses.length>=4;if(this.lastPress=this.clock,e){this.blockedUntil=this.clock+.65,this.scoopLock=null,this.lockedFish=null,this.strain=Math.min(1.5,this.strain+.6);const s=this.trapped[0];s&&this.flop(s,!0),this.onMessage("Rapid scoops lose the lock · steady the net");return}if(this.trapped.length){this.onMessage("Carry gently · E tips into the basket · Q releases");return}if(!this.inReach){this.onMessage("Aim at an open channel beside the rocks.");return}(i=this.gauge)==null||i.reset(),this.scoopMiss=!1,this.scoopQuality=null,this.scoopLock=null,this.lockedFish=null,this.submerged=!0,this.holdTime=0,this.beneathTime=0,this.scoopReady=!1,this.lift=0,this.onMessage("Hold to dip · release while the needle is in the green zone")}up(){var e,t;if(this.submerged){if(this.submerged=!1,(e=this.gauge)!=null&&e.quality){this.scoopQuality=this.gauge.quality();const i=this.sweepVelocity??{x:0,z:0},s=Math.hypot(i.x,i.z)||1;this.releaseSweep={x:i.x/s,z:i.z/s},this.scoopMiss=this.scoopQuality==="miss",this.liftingFish=this.scoopLock,this.lift=this.scoopQuality==="clean"?.9:1.8,this.liftDuration=this.lift,this.scoopMiss?(this.scoopLock=null,this.onMessage("Missed · release nearer the center sweet spot")):this.onMessage(this.scoopQuality==="clean"?"Clean scoop · carry gently":"Slow scoop · the fish may slip away");return}if(!this.scoopReady){this.lift=0,this.scoopLock=null,this.blockedUntil=(this.clock??0)+.35,this.onMessage((t=this.gauge)!=null&&t.active?"Missed the green zone · dip and try again":"Keep the hoop beneath a fish until the gauge begins");return}this.liftingFish=this.scoopLock,this.lift=1.1}}deposit(){var t;if(!this.trapped.length||this.tipping)return!1;if((t=this.basketController)!=null&&t.carried)return this.onMessage("Put the basket on dry ground first · F"),!1;const e=this.camera.getPosition();return Math.hypot(e.x-this.basket.x,e.z-this.basket.z)>1.75?(this.onMessage("Carry the fish closer to the basket · E to tip"),!1):(this.tipping=.001,this.tipTilt=0,this.tipReady=!1,this.submerged=!1,this.lift=0,!0)}cancel(){var e,t;for(const i of this.trapped)i.mode="current",i.visited=!0,i.route=null,i.releasePoint&&i.position.copy(i.releasePoint),(e=this.river)==null||e.clamp(i.position,i.radius),ge(i);(t=this.gauge)==null||t.reset(),this.trapped=[],this.scoopLock=null,this.lockedFish=null,this.submerged=!1,this.tipping=0,this.tipTilt=0,this.tipReady=!1,this.strain=0}releaseIntentional(){const e=[...this.trapped];for(const t of e){const i=this.camera.getPosition().clone().add(this.camera.forward.clone().mulScalar(2.5));let s;try{s=this.river.safePoint(i.x,i.z,t.radius)}catch{s=t.releasePoint??this.river.spawnPoint(t.radius)}const a=Math.hypot(s.x-t.position.x,s.z-t.position.z),n=Math.max(.65,Math.min(1.4,a/2.5));t.intentionalRelease=!0,t.body.velocity={x:(s.x-t.position.x)/n,y:(this.level.waterY+.05-t.position.y)/n+4.905*n,z:(s.z-t.position.z)/n},this.detach(t)}return e}escape(e){e!=null&&e.body&&this.detach(e)}detach(e){e.mode="airborne",e.body.captured=!1,e.body.released=!0,e.body.airTime=0,e.body.groundTime=0,this.trapped=this.trapped.filter(t=>t!==e),this.tipping=0,this.tipTilt=0,this.tipReady=!1,this.lift=0,this.liftingFish=null,this.scoopLock=null,this.lockedFish=null,this.blockedUntil=(this.clock??0)+.5}capture(e){this.tipping=0,this.tipTilt=0,this.tipReady=!1,this.liftingFish=null,e.releasePoint=e.position.clone(),e.mode="net",e.intentionalRelease=!1,e.eddy&&(e.eddy.occupant=null),e.eddy=null,e.body={...Fe(e.species.size,e.heading),position:e.position,seed:e.seed,captured:!0,allowEscape:!0,held:0,outside:0,nextFlop:.85,flopAge:2,roll:0,pitch:0},Ee(e),this.trapped=[e],this.scoopLock=null,this.lockedFish=null,this.strain=this.scoopQuality==="sluggish"?.45:.02,e.body.securedUntil=this.scoopQuality==="clean"?2.5:0,this.lift=0,this.onMessage(e.species.id==="smolt"?"Juvenile in the net · carry gently or Q to release":"Fish in the net · carry gently · E tips · Q releases")}flop(e,t=!1){const i=e.body,s=(e.species.id==="chinook"?1.3:e.species.id==="smolt"?.65:1)*(e.energy??e.stamina??1);i.flopAge=0,i.flopCount=(i.flopCount??0)+1;const a=i.flopCount%2?1:-1,n=i.held>12;i.velocity.y=Math.max(i.velocity.y,(t?2.8:n?2.7:1.25)*s+(this.strain??0)*.65),i.velocity.x+=a*(t?1.8:n?.85:.18)*s,i.velocity.z+=(t?.8:.12)*Math.sin(e.seed+i.flopCount),i.rollVelocity=a*(t?90:40),i.nextFlop=.9+(Math.sin(e.seed+i.flopCount)+1)*.3}updateAirborne(e,t){var h,c,p,d,u,m;const i=t.body,s=t.position,a={...s};i.airTime+=e,i.flopAge+=e,i.velocity.y-=9.81*e,s.x+=i.velocity.x*e,s.y+=i.velocity.y*e,s.z+=i.velocity.z*e,(h=this.obstacles)==null||h.projectPoint(s,i.radius);const n=W(a,this.pose),l=W(s,this.pose);if(!t.intentionalRelease&&!this.trapped.length&&!this.stowed&&i.airTime>.18&&this.clock>=this.blockedUntil&&n.y>=0&&l.y<0&&Math.hypot(l.x,l.z)<.48){const f=t.releasePoint;this.capture(t),t.releasePoint=f;return}if(!((c=this.basketController)!=null&&c.carried)&&!t.banked&&hi(a,s,i.velocity,this.basket)){t.banked=!0,this.onCatch(t);return}const r=((p=this.river)==null?void 0:p.ground(s.x,s.z))??null;if(r!==null&&r>this.level.waterY+.065&&s.y<r+i.radius){if(s.y=r+i.radius,i.velocity.y=0,i.velocity.x*=Math.exp(-e*8),i.velocity.z*=Math.exp(-e*8),i.groundTime+=e,i.flopAge>.9){const f=t.releasePoint??s,g=f.x-s.x,v=f.z-s.z,w=Math.hypot(g,v)||1;this.flop(t),i.velocity.x+=g/w*.8,i.velocity.z+=v/w*.8}}else if(s.y<=this.level.waterY-.04&&i.velocity.y<0){this.river.clamp(s,t.radius),t.mode="current",t.visited=!0,t.route=null,ge(t),(u=(d=this.waterFX).impulse)==null||u.call(d,s,.7),t.intentionalRelease?(m=this.onReleaseWater)==null||m.call(this,t):this.onMessage("The fish escaped back into the river."),t.intentionalRelease=!1;return}this.renderFish(t,e)}renderFish(e,t){var a,n;const i=e.body,s=Math.sin(i.flopAge*22)*Math.exp(-i.flopAge*5);i.roll=e.mode==="airborne"?(i.roll??0)+(82-(i.roll??0))*(1-Math.exp(-t*6)):(i.roll??0)*Math.exp(-t*4)+s*5,i.roll=L.clamp(i.roll,-85,85),Je(e,s*32),e.entity.setPosition(e.position),e.entity.setEulerAngles(i.pitch??0,i.yaw,0),(n=(a=e.entity).rotateLocal)==null||n.call(a,0,0,i.roll)}update(e,t,i){var g,v,w,S,z,E,x,P,R;this.clock=(this.clock??0)+e,this.blockedUntil??(this.blockedUntil=0),this.strain??(this.strain=0),this.zone??(this.zone=new Ie),this.fishCandidates=t,this.submerged&&(this.holdTime=(this.holdTime??0)+e),this.aim(e,i);const s=this.scoopLock;if(this.submerged&&s){const b=this.target.x-s.position.x,C=this.target.z-s.position.z,A=this.target.y<s.position.y-.1&&Math.hypot(b,C)<.43,k=s.species.id==="chinook"?.75:s.species.id==="smolt"?.16:.35;this.beneathTime=A?(this.beneathTime??0)+e:0,this.gauge??(this.gauge=new fe),this.gauge.update(e,s,A&&this.beneathTime>=k,!0),this.scoopReady=this.gauge.ready}else this.submerged&&(this.gauge??(this.gauge=new fe),this.gauge.update(e,null,!1,!0),this.scoopReady=!1,this.beneathTime=0);const a=this.pose,n=this.target.clone(),l=this.speed??0,r=this.camera.getPosition().clone().add(this.camera.right.clone().mulScalar(.3)).add(this.camera.up.clone().mulScalar(-.6));this.tipping&&(this.tipping+=e,this.desired.set(this.basket.x,this.basket.rimY+1.12,this.basket.z));const h=(g=this.obstacles)==null?void 0:g.elder,c=h&&Math.hypot(this.camera.getPosition().x-h.x,this.camera.getPosition().z-h.z)<1.65;if(this.stowed=!!((v=this.basketController)!=null&&v.carried)||!!(c&&!this.trapped.length),!this.stowed&&this.obstacles){const b=this.obstacles.safeNet(this.desired,r);b?this.desired.set(b.x,b.y,b.z):this.stowed=!0}if(!((w=this.basketController)!=null&&w.carried)){const b=this.desired.x-this.basket.x,C=this.desired.z-this.basket.z,A=r.x-this.basket.x,k=r.z-this.basket.z;Math.hypot(b,C)>1.6&&(this.basketSide=null),this.basketSide??(this.basketSide=-k*b+A*C>=0?1:-1),Le(this.desired,r,this.basket,{tipping:!!this.tipping,side:this.basketSide})}const d=this.target.clone().lerp(this.target,this.desired,1-Math.exp(-e*(this.lift>0&&this.scoopQuality!=="clean"?2.8:8))).clone().sub(this.target),u=this.trapped.length?(this.tipping?1.4:this.trapped[0].body.held<1.4?1.15:2.7)*e:1/0;if(d.length()>u&&d.normalize().mulScalar(u),this.target.add(d),this.initialized||(this.target.copy(this.desired),this.physics.reset(ae(this.target)),this.initialized=!0),this.obstacles&&!this.stowed&&this.obstacles.projectPoint(this.target,.58),!((S=this.basketController)!=null&&S.carried)){const b=this.target.clone();Le(this.target,r,this.basket,{tipping:!!this.tipping,side:this.basketSide??1,project:!0});const C=this.target.clone().sub(b);if(C.length()>0){for(const A of[this.physics.positions,this.physics.previous])for(const k of A)k.x+=C.x,k.y+=C.y,k.z+=C.z;for(const A of["x","y","z"])this.physics.pose.center[A]+=C[A];this.trapped[0]&&this.trapped[0].position.add(C),n.add(C)}}if(this.speed=n.distance(this.target)/Math.max(e,.001),this.still=this.speed<.2?(this.still??0)+e:0,this.sweepVelocity={x:(this.target.x-n.x)/Math.max(e,.001),z:(this.target.z-n.z)/Math.max(e,.001)},this.pose=di(this.target,this.sweepVelocity,this.submerged,this.lift,this.scoopQuality),this.sweepInput=(this.sweepInput??0)*Math.exp(-e*3),this.tipping){this.target.distance(this.desired)<.08&&this.speed<.5&&(this.tipReady=!0),this.tipReady&&(this.tipTilt=(this.tipTilt??0)+e);const b=Math.min(1,(this.tipTilt??0)/1.1)*Math.PI*.07;this.pose.normal={x:Math.sin(b),y:Math.cos(b),z:0},this.pose.right={x:Math.cos(b),y:-Math.sin(b),z:0}}if(!this.scoopMiss&&!this.trapped.length&&this.lift>0&&!this.stowed&&this.clock>=this.blockedUntil)for(const b of t){if(["net","banked","airborne"].includes(b.mode)||(this.liftingFish??this.scoopLock)&&b!==(this.liftingFish??this.scoopLock))continue;const C=Fe(b.species.size,b.heading);if(li(a,this.pose,b.position,b.position,C)){this.capture(b);break}}const m=this.trapped[0];if(m){const b=m.body;if(m.energy=Math.max(.4,(m.energy??m.stamina??1)-e*.045),b.held+=e,b.flopAge+=e,b.nextFlop-=e,b.held>Math.max(.8,b.securedUntil??0)&&!this.tipping){const C=Math.abs(this.speed-l)/Math.max(e,.001);this.strain=L.clamp(this.strain+Math.max(0,C-12)*e*.022-e*.22,0,1.5),b.nextFlop<=0&&this.flop(m)}this.tipReady&&(m.position.x+=(this.basket.x-m.position.x)*(1-Math.exp(-e*5)),m.position.z+=(this.basket.z-m.position.z)*(1-Math.exp(-e*5))),(this.tipTilt??0)>.6&&Math.hypot(m.position.x-this.basket.x,m.position.z-this.basket.z)<.3&&(b.velocity.x=0,b.velocity.z=0,b.velocity.y=Math.min(0,b.velocity.y),this.detach(m))}const f=this.trapped[0];if(this.physics.step(e,this.pose,{body:(f==null?void 0:f.body)??null,waterY:this.level.waterY,ground:(b,C)=>{var A;return((A=this.river)==null?void 0:A.ground(b,C))??null},contain:!0,obstacles:{projectPoint:(b,C)=>{var A,k;(A=this.obstacles)==null||A.projectPoint(b,C),(k=this.basketController)!=null&&k.carried||pi(b,this.basket,C)}}}),f){const b=f.body;(z=this.obstacles)==null||z.projectPoint(f.position,b.halfLength+b.radius),b.outside=this.zone.contains(f.position,this.pose,b.radius)?0:b.outside+e,b.outside>.16&&(this.detach(f),this.onMessage("Fish out of the catch zone · it can escape")),this.renderFish(f,e)}for(const b of t)b.mode==="airborne"&&this.updateAirborne(e,b);(E=this.obstacles)!=null&&E.netBlocked(this.target,r)&&(this.stowed=!0),this.waterFX.update(e,this),this.lift=Math.max(0,this.lift-e),(P=(x=this.renderer).setVisible)==null||P.call(x,!this.stowed),(R=this.basketController)!=null&&R.carried||ui(r,this.target,this.basket),this.renderer.update(this.pose,r,this.camera)}destroy(){this.waterFX.destroy(),this.renderer.destroy()}}class vi{constructor(){this.enabled=!0,this.last={},this.voice=null,document.addEventListener("pointerdown",()=>this.unlock(),{once:!0}),document.addEventListener("keydown",()=>this.unlock(),{once:!0})}unlock(){try{this.context??(this.context=new(window.AudioContext||window.webkitAudioContext)),this.context.resume().catch(()=>{})}catch{}}tone(e=!0){if(!this.enabled)return;this.unlock();const t=this.context;if(!t)return;const i=t.createOscillator(),s=t.createGain();i.type="sine",i.frequency.setValueAtTime(e?520:190,t.currentTime),i.frequency.exponentialRampToValueAtTime(e?850:110,t.currentTime+.2),s.gain.setValueAtTime(.07,t.currentTime),s.gain.exponentialRampToValueAtTime(.001,t.currentTime+.3),i.connect(s).connect(t.destination),i.start(),i.stop(t.currentTime+.32)}say(e){var i;if(!this.enabled)return;const t=performance.now();t-(this.last[e]??-1e4)<3e3||(this.last[e]=t,(i=this.voice)==null||i.pause(),this.voice=new Audio(ze("./assets/audio/"+e+".wav")),this.voice.volume=.85,this.voice.play().catch(()=>{}))}message(e){/Fish banked/i.test(e)?(this.tone(),this.say("bank")):/Fish in the net|Juvenile in the net/i.test(e)?(this.tone(),this.say("success")):/close escape|fish escaped back into the river/i.test(e)?(this.tone(!1),this.say("fail")):/released safely/i.test(e)?this.say("release"):/round is over|plentiful harvest/i.test(e)&&this.say("finish")}toggle(){var e;return this.enabled=!this.enabled,this.enabled?(this.unlock(),this.say("begin")):(e=this.voice)==null||e.pause(),this.enabled}}class ot{constructor({onReturn:e}={}){this.onReturn=e,this.audio=new vi,this.root=document.getElementById("ui"),this.root.style.setProperty("--fish-atlas",`url("${new URL(ze("./assets/fishing-badges.png"),document.baseURI).href}")`),this.root.innerHTML='<header><div class="brand"><span class="mark">≈</span><div>FRASER RIVER<small>DIP NET FISHING</small></div></div><nav><button id="sound-toggle" class="quiet">Sound on</button><button id="reset-game" class="quiet">Reset <kbd>R</kbd></button><button id="help" class="quiet">Help <kbd>H</kbd></button><button id="session-menu" class="quiet">Menu <kbd>Esc</kbd></button></nav></header><div class="stats" hidden><div><small>TIME LEFT</small><strong id="timer">180<em>s</em></strong></div><div><small>RIVER REWARD</small><strong id="score">0</strong></div><div><small>HARVEST</small><strong id="catch">0<em>/ 5</em></strong></div><div><small>COMBO</small><strong id="combo">×1</strong></div></div><div id="objective" class="objective">Speak with the elder</div><div id="crosshair">+</div><div id="fish-target" hidden aria-hidden="true"></div><div id="scoop-gauge" hidden><i id="scoop-badge" class="fish-badge"></i><div class="scoop-instructions"><strong id="scoop-name">Find a fish</strong><span id="scoop-hint">Hold to dip</span></div><svg viewBox="0 0 300 136" aria-hidden="true"><path class="gauge-track" d="M30 112 A120 120 0 0 1 270 112" pathLength="100"/><path id="gauge-zone" d="M30 112 A120 120 0 0 1 270 112" pathLength="100"/><g id="gauge-needle"><path d="M150 111 L150 9"/><circle cx="150" cy="112" r="7"/></g><text x="150" y="105" text-anchor="middle" id="gauge-percent">0%</text></svg><small>RELEASE IN THE CENTER SWEET SPOT</small></div><button id="release-fish" class="release-fish" hidden>Q · Release juvenile safely</button><div id="net-status" hidden></div><button id="basket-action" class="basket-action" hidden>F · Pick up basket</button><div id="toast" role="status"></div><div id="popups"></div><div id="elder-marker">ELDER <span>◆</span></div><div id="controls"><span><kbd>W A S D</kbd> Walk</span><span><kbd>Mouse</kbd> Look / aim</span><span><kbd>Hold click</kbd> Dip & sweep</span><span><kbd>Release</kbd> Lift</span><span><kbd>F</kbd> Basket</span><span><kbd>E</kbd> Speak / tip</span><span><kbd>Space</kbd> Jump</span><span><kbd>Ctrl</kbd> Crouch</span><span><kbd>Esc</kbd> Pause</span></div><section id="modal" role="dialog" aria-modal="true"></section><div id="loading"><div class="load-ring"></div><p>Finding our place by the river</p><small id="load-status">Preparing the riverbank…</small></div>',this.modal=document.getElementById("modal"),this.toastTimer=0,document.getElementById("sound-toggle").onclick=()=>{document.getElementById("sound-toggle").textContent=this.audio.toggle()?"Sound on":"Sound off"}}loading(e){document.getElementById("load-status").textContent=e}ready(){document.getElementById("loading").hidden=!0}show(e){this.modal.innerHTML=e,this.modal.hidden=!1}hide(){this.modal.hidden=!0,this.modal.classList.remove("elder-briefing")}intro(e,t){this.audio.say("intro"),this.modal.classList.add("elder-briefing");let i=0;const s=()=>{const a=[["Listen to the river.","Walk the shoreline. Take only what you need, and return to give thanks."],["Choose your catch.","Keep adult salmon. Release young smolts."],["A patient scoop.","Hold to dip. Release in the green sweet spot. Carry the fish to your basket."]],[n,l]=a[i];this.show(`<div class="eyebrow">THE ELDER · ${i+1} / 3</div><h1>${n}</h1><p class="lead">${l}</p>${i===1?'<div class="species"><i class="fish-badge sockeye-badge" title="Sockeye"></i><i class="fish-badge chinook-badge" title="Chinook"></i><i class="fish-badge smolt-badge" title="Release smolts"></i></div>':""}${i===2?'<p>Harvest 5 adults and earn 1,000 points in 3 minutes.</p><label class="difficulty">River pace <select id="difficulty"><option value=".2">Gentle</option><option value=".55" selected>Flowing</option><option value="1">Swift</option></select></label>':""}<button id="begin" class="primary">${i<2?"Continue":"Begin the harvest"}</button><button id="later" class="secondary">Keep exploring</button>`),document.getElementById("begin").onclick=()=>{i<2?(i++,s()):e(Number(document.getElementById("difficulty").value))},document.getElementById("later").onclick=t};s()}help(e){this.show('<div class="eyebrow">READ THE WATER</div><h2>A gentle sweep.</h2><p>Walk toward the river with <b>WASD</b>. Move the mouse to look. Aim down at open water near a fish. The marker follows the hoop, not the camera.</p><ol><li><b>Hold the left mouse button</b> to lower your net.</li><li><b>Sweep gently</b> across a fish. Rushing or waiting too long will spook it.</li><li><b>Release</b> when the gauge needle enters the green target zone. Each fish badge identifies your target; larger fish have narrower windows. Center releases scoop cleanly; outer releases scoop slowly or miss. Carry the loaded net back to the basket and press E to tip the fish in. Only a basket deposit counts.</li></ol><p>Adult sockeye and chinook build your combo. Juveniles cost 50 points when caught; letting them reach the downstream boundary earns 75.</p><p>Catch <b>5 adults</b> and earn <b>1,000 points</b> in 180 seconds. Then walk back to the elder and press <b>E</b>.</p><button id="resume" class="primary">Return to the river →</button><small class="footnote">Arrow keys turn the camera · C shows collision and fish zones · H opens this guide</small>'),document.getElementById("resume").onclick=e}returnPrompt(e){this.message(e.passed?"A plentiful harvest. Return to the elder.":"The round is over. Return to the elder."),document.getElementById("objective").textContent="Return to the elder · press E nearby"}summary(e,t,i){this.modal.classList.add("elder-briefing"),this.audio.say("finish"),this.show(`<div class="eyebrow">THE RIVER GIVES, WE GIVE THANKS</div><h2>${e.rank}</h2><div class="elder-quote"><small>THE ELDER</small><p>“${e.passed?"You have brought back a plentiful reward.":"Every visit to the water offers something to learn."} Let us thank the river for what it has shared, and for the fish that continue their journey.”</p></div><div class="results"><div><strong>${e.score.toLocaleString()}</strong><small>POINTS</small></div><div><strong>${e.caughtCount}</strong><small>ADULT FISH</small></div><div><strong>${e.releasedSmolts}</strong><small>YOUNG FISH PASSED</small></div></div><p class="breakdown">${e.breakdown.sockeye} sockeye · ${e.breakdown.chinook} chinook · ${e.breakdown.smolt} juvenile catches</p><p>“Thank you, river, for this plentiful reward. May the fish continue their journey.”</p><button id="again" class="primary">Fish again →</button><button id="free" class="secondary">Stay by the river</button>`),document.getElementById("again").onclick=t,document.getElementById("free").onclick=i,this.journeyButtons(!0)}update(e){const t=e.net.trapped[0],i=document.getElementById("basket-action"),s=e.basket,a=e.camera.getPosition(),n=document.getElementById("net-status");i.hidden=!!t||!s||e.paused||!this.modal.hidden||!s.carried&&Math.hypot(a.x-s.volume.x,a.z-s.volume.z)>1.6,i.textContent=s!=null&&s.carried?"F · Place basket on dry ground":"F · Pick up basket",i.onclick=()=>s.toggle(e.camera,!!t),n.hidden=!t||e.paused,n.textContent=(e.net.strain??0)>.7?"Fish slipping · slow down and keep it in the net":"Carry gently · fish can flop out";const l=document.getElementById("release-fish");l.hidden=!t||e.paused,l.textContent=(t==null?void 0:t.species.id)==="smolt"?"Q · Release juvenile safely":"Q · Return fish to the river",l.onclick=()=>e.releaseCargo();const r=e.net.lockedFish,h=document.getElementById("fish-target");if(h.hidden=!e.net.submerged||!!t||e.state.state!=="PLAYING"||e.paused||e.net.stowed,!h.hidden){const m=e.camera.camera.worldToScreen(e.net.target);h.hidden=m.z<0,h.style.left=m.x+"px",h.style.top=m.y+"px",h.classList.toggle("scoop-ready",!!e.net.scoopReady)}document.getElementById("crosshair").hidden=e.net.submerged||!!t;const c=document.getElementById("scoop-gauge"),p=e.net.gauge;if(c.hidden=!e.net.submerged&&!t||e.paused||!this.modal.hidden||e.state.state!=="PLAYING",!c.hidden){const m=e.camera.camera.worldToScreen(e.net.target);c.hidden=m.z<0,c.style.left=Math.max(125,Math.min(innerWidth-125,m.x))+"px",c.style.top=Math.max(115,Math.min(innerHeight-135,m.y))+"px";const f=t??r,g=f==null?void 0:f.species.id,v=document.getElementById("scoop-badge");v.className="fish-badge "+(g==="chinook"?"chinook-badge":g==="smolt"?"smolt-badge":g==="sockeye"?"sockeye-badge":"dip-badge"),document.getElementById("scoop-name").textContent=f?f.species.name+(f.stamina?" · "+(f.stamina>1.2?"strong":f.stamina<1?"gentle":"steady"):""):"Find a fish",c.classList.toggle("loaded",!!t),document.getElementById("scoop-hint").textContent=t?"Carry gently · E tip · Q release":r?p!=null&&p.aligned?p.ready?"RELEASE · clean scoop":"Hold · aim for the center":"Hold · settling beneath fish":"Sweep the submerged hoop near a fish",c.classList.toggle("ready",!!(p!=null&&p.ready)),c.classList.toggle("searching",!(p!=null&&p.active)),document.getElementById("gauge-zone").setAttribute("stroke-dasharray",`${(((p==null?void 0:p.end)??.61)-((p==null?void 0:p.start)??.39))*100} 100`),document.getElementById("gauge-zone").setAttribute("stroke-dashoffset",-((p==null?void 0:p.start)??.39)*100),document.getElementById("gauge-needle").setAttribute("transform",`rotate(${-90+((p==null?void 0:p.value)??0)*180} 150 112)`),document.getElementById("gauge-percent").textContent=p!=null&&p.active?Math.round(p.value*100)+"%":"…"}const d=document.getElementById("objective");e.state.state==="PLAYING"&&(d.textContent=s!=null&&s.carried?"Place the basket on dry ground":t?"Carry to the basket · tip the fish":e.net.submerged?"Release in the green sweet spot":"Find a fish · hold to dip");const u=e.score;document.querySelector(".stats").hidden=!["READY","PLAYING","RETURN","SUMMARY"].includes(e.state.state),document.getElementById("timer").innerHTML=Math.ceil(e.state.time)+"<em>s</em>",document.getElementById("timer").classList.toggle("urgent",e.state.time<10),document.getElementById("score").textContent=u.score.toLocaleString(),document.getElementById("catch").innerHTML=u.caughtCount+"<em>/ 5</em>",document.getElementById("combo").textContent="×"+u.combo}message(e){this.audio.message(e);const t=document.getElementById("toast");t.textContent=e,t.classList.add("visible"),clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>t.classList.remove("visible"),2500)}popup(e,t,i,s=""){const a=document.createElement("div");a.className="popup "+s,a.textContent=e,a.style.left=t+"px",a.style.top=i+"px",document.getElementById("popups").append(a),setTimeout(()=>a.remove(),1400)}pauseMenu(e,t=!1){this.audio.say("pause"),this.show(`<div class="eyebrow">${t?"HOW TO PLAY":"EXPERIENCE PAUSED"}</div><h2>${t?"Read the water.":"A moment by the river."}</h2><p>${t?"Move along the dry shoreline. Hold to dip; release in the green sweet spot. Carry to the basket and tip. Release young fish.":"Resume your visit to the river when you are ready."}</p><button id="resume" class="primary">Resume →</button><button id="retry-now" class="secondary">Try the round again</button><button id="reset-now" class="secondary">Reset the whole experience</button><button id="exit-now" class="secondary">Exit experience</button>`),document.getElementById("resume").onclick=e.resume,document.getElementById("retry-now").onclick=e.retry,document.getElementById("reset-now").onclick=e.reset,document.getElementById("exit-now").onclick=e.exit,this.journeyButtons()}exitScreen(e){this.show('<div class="eyebrow">UNTIL NEXT TIME</div><h2>The river will wait.</h2><p>The experience has ended. You can start again here, or close this browser tab.</p><button id="start-again" class="primary">Start experience →</button>'),document.getElementById("start-again").onclick=e,this.journeyButtons()}journeyButtons(e=!1){var i,s,a;if(!this.onReturn)return;if(e){(i=document.getElementById("again"))==null||i.remove(),(s=document.getElementById("free"))==null||s.remove();const n=(a=this.modal.querySelector(".breakdown"))==null?void 0:a.nextElementSibling;(n==null?void 0:n.tagName)==="P"&&n.remove()}const t=(n,l,r,h="secondary")=>{const c=document.createElement("button");c.id=n,c.className=h,c.textContent=l,c.onclick=r,this.modal.append(c)};t("return-pithouse","Return to the pithouse",this.onReturn,e?"primary":"secondary"),e&&t("reset-experience","Reset fishing experience",()=>{var n;return(n=this.onReset)==null?void 0:n.call(this)})}destroy(){clearTimeout(this.toastTimer),this.root.innerHTML=""}}class wi{constructor(e,t){this.animation=st(e,t,"Idle"),this.mode="Idle"}setMode(e){var t;this.mode!==e&&(this.mode=e,(t=this.animation)==null||t.play(e))}idle(){this.setMode("Idle")}talk(){this.setMode("Talking")}work(){this.setMode("Working")}facePlayer(e,t,i,s=0){if(!t||this.mode==="Working")return;const a=t.getPosition(),n=Math.atan2(e.x-a.x,e.z-a.z)*180/Math.PI+s,l=t.forward?Math.atan2(-t.forward.x,-t.forward.z)*180/Math.PI:t.getEulerAngles().y,r=(n-l+540)%360-180;t.setEulerAngles(0,l+Math.max(-i*100,Math.min(i*100,r)),0)}update(){}}class xi{constructor(e,t){this.app=e,this.options=t,this.level=t.level,this.camera=t.playerCamera,this.ui=t.ui||new ot,this.state=new ei,this.score=new Ot,this.river=new ti(this.level),this.navigation=new Re(this.level),this.npc=new wi(t.elder,t.assets.elder),this.obstacles=new Jt(this.level,this.npc),this.obstacles.update(),this.basket=new Qt(t.basketEntity,this.level,this.navigation,this.obstacles,i=>this.ui.message(i)),this.spawn=new ai(e,t.assets,this.river,i=>{i.species.id==="smolt"&&!i.releasedByPlayer&&(this.score.release(),this.popup(i,"+75 · Young fish passed","steward"))}),this.net=new gi(e,this.camera,t.assets.net,this.level,i=>{if(i.scored)return;i.scored=!0;const s=this.score.catch(i.species);this.popup(i,`${s>0?"+":""}${s} · ${i.species.name}`,s<0?"penalty":""),this.basket.accept(i),this.ui.message("Fish banked!")},i=>this.ui.message(i)),this.net.river=this.river,this.net.basket=this.basket.volume,this.net.basketController=this.basket,this.net.obstacles=this.obstacles,this.net.onReleaseWater=i=>this.confirmRelease(i),this.paused=!1,this.keys=new Set,this.yaw=8,this.pitch=-10,this.locked=!1,this.debug=!1,this.handlers=[],this.previousCamera={position:this.camera.getPosition().clone(),rotation:this.camera.getRotation().clone()},this.bind(),this.mobile=new Kt(this),this.updateBound=i=>this.update(i),e.on("update",this.updateBound)}on(e,t,i){e.addEventListener(t,i),this.handlers.push(()=>e.removeEventListener(t,i))}bind(){const e=this.app.graphicsDevice.canvas;this.on(window,"keydown",t=>{var i;if(t.code==="Escape"){this.paused?this.resume():this.pause();return}if(t.code==="KeyR"){this.reset();return}t.target.matches("select,input,button")&&!this.ui.modal.hidden||(this.keys.add(t.code),["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(t.code)&&t.preventDefault(),t.code==="KeyE"&&!t.repeat&&this.interact(),t.code==="KeyF"&&!t.repeat&&!this.paused&&this.ui.modal.hidden&&((i=this.basket)==null||i.toggle(this.camera,!!this.net.trapped.length)),t.code==="KeyQ"&&!t.repeat&&!this.paused&&this.ui.modal.hidden&&this.net.trapped.length&&this.releaseCargo(),t.code==="KeyH"&&!t.repeat&&this.pause(!0),t.code==="KeyC"&&!t.repeat&&this.toggleDebug())}),this.on(window,"keyup",t=>this.keys.delete(t.code)),this.on(window,"blur",()=>{this.keys.clear(),this.net.submerged=!1,this.ui.modal.hidden&&this.state.state!=="EXITED"&&this.pause()}),this.on(document,"visibilitychange",()=>{document.hidden&&this.ui.modal.hidden&&this.pause()}),this.on(document,"pointerlockchange",()=>{this.locked=document.pointerLockElement===e,!this.locked&&this.ui.modal.hidden&&this.state.state!=="EXPLORE"&&this.state.state!=="EXITED"&&this.pause()}),this.on(window,"mousemove",t=>{this.net.pointer={x:t.clientX,y:t.clientY},this.locked&&!this.paused&&(this.net.sweepInput=L.clamp((this.net.sweepInput??0)+t.movementX*.018,-1,1),this.yaw-=t.movementX*.13,this.pitch=L.clamp(this.pitch-t.movementY*.1,-78,55))}),this.on(e,"pointerdown",t=>{t.pointerType==="touch"||t.button!==0||!this.ui.modal.hidden||this.paused||(!this.locked&&!this.pointerFallback&&this.requestLock(),this.state.state==="PLAYING"&&(this.net.aim(1/60,this.locked),this.net.down()))}),this.on(window,"pointerup",t=>{t.button===0&&t.pointerType!=="touch"&&this.net.up()}),document.getElementById("help").onclick=()=>this.pause(!0),document.getElementById("session-menu").onclick=()=>this.pause(),document.getElementById("reset-game").onclick=()=>this.reset()}requestLock(){var t,i;const e=this.app.graphicsDevice.canvas;e.tabIndex=0,e.focus(),!(this.pointerFallback||this.mobileInput)&&((i=(t=e.requestPointerLock)==null?void 0:t.call(e))==null||i.catch(()=>{this.pointerFallback=!0,this.ui.message("Use arrow keys to look; move the mouse to aim.")}))}async start(){this.reset(),this.ui.ready()}reset(){var e,t;this.motion=new Ae,this.dialoguePan=null,(e=this.basket)==null||e.reset(!0),this.net.cancel(),this.net.initialized=!1,this.net.enabled=!1,this.spawn.clear(),this.score.reset(),this.state.reset(),this.paused=!1,this.keys.clear(),this.ui.hide(),this.camera.setPosition(...this.level.player),this.yaw=8,this.pitch=-10,this.camera.setEulerAngles(this.pitch,this.yaw,0),this.npc.idle(),this.npc.animation&&(this.npc.animation.component.speed=1),(t=document.exitPointerLock)==null||t.call(document),document.getElementById("objective").textContent="Walk to the elder · E to speak",this.ui.message("Approach the elder to begin. R resets; Esc opens the menu."),this.app.graphicsDevice.canvas.focus()}begin(e=.55){var t,i,s,a,n,l;if(this.dialoguePan=null,(t=this.ui.audio)==null||t.say("begin"),(i=this.basket)==null||i.reset(!1),this.net.cancel(),this.spawn.clear(),this.spawn.spawn)for(let r=0;r<5;r++){const h=this.spawn.spawn(),c=this.river.safePoint(((a=(s=this.level.river.fishingPockets)==null?void 0:s[r%4])==null?void 0:a[0])??(r%2?5.8:4.9),((l=(n=this.level.river.fishingPockets)==null?void 0:n[r%4])==null?void 0:l[1])??4.2+r*.48,h.radius);h.position.set(c.x,this.level.waterY-.48,c.z),h.approach=!1,h.travelPhase=r===4?"escape":"rest",h.mode="rest",h.rest=1.2+r*.25,h.route=null}this.score.reset(),this.state.time=180,this.state.set("READY"),this.readyTime=2.5,this.spawn.difficulty=e,this.paused=!1,this.ui.hide(),this.npc.work(),this.requestLock(),document.getElementById("objective").textContent="5 adults · 1,000 points · let young fish pass",this.ui.message("Walk along the bank. Dip in open water, away from rocks.")}cancelDialogue(){this.state.set("EXPLORE"),this.ui.hide(),this.npc.idle(),this.requestLock()}resume(){var e,t;if(this.state.state==="EXITED"){this.paused=!1,this.ui.exitScreen(()=>this.reset());return}if(this.paused=!1,this.npc.animation&&(this.npc.animation.component.speed=1),this.state.state==="DIALOGUE"){this.npc.talk(),(t=(e=this.npc).facePlayer)==null||t.call(e,this.camera.getPosition(),this.options.anchorEntity,10,this.level.elderFacingOffset??0),this.ui.intro(i=>this.begin(i),()=>this.cancelDialogue());return}if(this.state.state==="SUMMARY"&&this.summaryResult){this.ui.summary(this.summaryResult,()=>this.begin(this.spawn.difficulty),()=>{this.dialoguePan=null,this.state.set("EXPLORE"),this.npc.idle(),this.ui.hide(),this.requestLock()});return}this.ui.hide(),this.requestLock()}pause(e=!1){var i;this.paused=!0,this.keys.clear(),this.net.submerged=!1,this.net.lift=0,this.net.scoopLock=null,this.npc.animation&&(this.npc.animation.component.speed=0),(i=document.exitPointerLock)==null||i.call(document);const t={resume:()=>this.resume(),reset:()=>this.reset(),retry:()=>{this.npc.animation&&(this.npc.animation.component.speed=1),this.begin(this.spawn.difficulty)},exit:()=>this.exit()};this.ui.pauseMenu(t,e)}exit(){var e,t;(e=this.basket)==null||e.reset(!0),this.net.cancel(),this.net.enabled=!1,this.spawn.clear(),this.keys.clear(),this.state.set("EXITED"),this.paused=!1,this.npc.idle(),this.npc.animation&&(this.npc.animation.component.speed=1),(t=document.exitPointerLock)==null||t.call(document),this.ui.exitScreen(()=>this.reset()),document.getElementById("objective").textContent="Experience ended"}releaseCargo(){this.net.releaseIntentional(),this.ui.message("Returning the fish to the water…")}confirmRelease(e){e.species.id==="smolt"&&!e.releasedByPlayer?(e.releasedByPlayer=!0,this.score.release(),this.ui.message("Juvenile released safely · +75 stewardship")):this.ui.message("Fish released safely back into the river.")}popup(e,t,i){const s=this.camera.camera.worldToScreen(e.position);s.z>0&&this.ui.popup(t,L.clamp(s.x,120,innerWidth-120),L.clamp(s.y,170,innerHeight-130),i)}interact(){var i,s,a,n,l,r,h,c,p,d,u,m,f;if(this.paused||!this.ui.modal.hidden)return;if((i=this.net.trapped)!=null&&i.length){this.net.deposit();return}const e=this.camera.getPosition(),t=this.level.elder;if(Math.hypot(e.x-t[0],e.z-t[2])>(this.level.interactionRadius??1.8)){this.ui.message("Walk closer to the elder, then press E.");return}if(this.state.state==="EXPLORE")this.state.set("DIALOGUE"),this.npc.talk(),(a=(s=this.npc).facePlayer)==null||a.call(s,this.camera.getPosition(),this.options.anchorEntity,10,this.level.elderFacingOffset??0),this.keys.clear(),(n=document.exitPointerLock)==null||n.call(document),this.ui.intro(g=>this.begin(g),()=>this.cancelDialogue());else if(this.state.state==="RETURN"){this.state.set("SUMMARY"),this.dialoguePan={time:0,origin:((r=(l=this.camera.getPosition()).clone)==null?void 0:r.call(l))??new _(e.x,e.y,e.z),start:((c=(h=this.camera).getRotation)==null?void 0:c.call(h).clone())??new U},this.net.cancel(),this.npc.talk(),(d=(p=this.npc).facePlayer)==null||d.call(p,this.camera.getPosition(),this.options.anchorEntity,10,this.level.elderFacingOffset??0),(u=document.exitPointerLock)==null||u.call(document);const g=this.score.result();this.summaryResult=g,this.ui.summary(g,()=>this.begin(this.spawn.difficulty),()=>{this.dialoguePan=null,this.state.set("EXPLORE"),this.npc.idle(),this.ui.hide(),this.requestLock()}),(f=(m=this.options).onComplete)==null||f.call(m,g)}}toggleDebug(){this.debug=!this.debug;for(const e of this.options.debugEntities||[])e.enabled=this.debug;this.ui.message(this.debug?"Collision and river guides shown":"Guides hidden")}walk(e){var f,g,v,w,S,z,E;const t=this.camera.getPosition().clone(),i=this.keys.has("ControlLeft")||this.keys.has("ControlRight")?.95:this.keys.has("ShiftLeft")?2.7:1.8,s=this.yaw*Math.PI/180;let a=((f=this.mobileInput)==null?void 0:f.axes.x)??0,n=((g=this.mobileInput)==null?void 0:g.axes.z)??0;this.keys.has("KeyW")&&n--,this.keys.has("KeyS")&&n++,this.keys.has("KeyA")&&a--,this.keys.has("KeyD")&&a++;const l=Math.max(1,Math.hypot(a,n)),r=t.clone();r.x+=(a*Math.cos(s)+n*Math.sin(s))/l*i*e,r.z+=(-a*Math.sin(s)+n*Math.cos(s))/l*i*e,this.navigation??(this.navigation=new Re(this.level));const h=this.navigation.move(t,r.x-t.x,r.z-t.z,{jumpHeight:((v=this.motion)==null?void 0:v.offset)??0});r.x=h.x,r.z=h.z;const c=this.level.elder,p=(((w=this.obstacles)==null?void 0:w.elder.radius)??.62)+((z=(S=this.net)==null?void 0:S.trapped)!=null&&z.length||(E=this.basket)!=null&&E.carried?.62:.18),d=Math.hypot(t.x-c[0],t.z-c[2]),u=(x,P)=>{var R;return(Math.hypot(x-c[0],P-c[2])>p||d<p&&Math.hypot(x-c[0],P-c[2])>d+1e-5)&&(!((R=this.basket)!=null&&R.blocksPlayer(x,P))||Math.hypot(t.x-this.basket.volume.x,t.z-this.basket.volume.z)<.48&&Math.hypot(x-this.basket.volume.x,P-this.basket.volume.z)>Math.hypot(t.x-this.basket.volume.x,t.z-this.basket.volume.z)+1e-5)};u(r.x,r.z)?(t.x=r.x,t.z=r.z):u(r.x,t.z)&&this.navigation.sample(r.x,t.z)!==null?t.x=r.x:u(t.x,r.z)&&this.navigation.sample(t.x,r.z)!==null&&(t.z=r.z),this.motion??(this.motion=new Ae);const m=this.motion.update(e,this.keys);t.y=L.lerp(t.y,(this.navigation.sample(t.x,t.z)??h.ground)+m,1-Math.exp(-e*14))+(a||n?Math.sin(performance.now()*.008)*.002:0),this.camera.setPosition(t),this.keys.has("ArrowLeft")&&(this.yaw+=e*75),this.keys.has("ArrowRight")&&(this.yaw-=e*75),this.keys.has("ArrowUp")&&(this.pitch=L.clamp(this.pitch+e*55,-78,55)),this.keys.has("ArrowDown")&&(this.pitch=L.clamp(this.pitch-e*55,-78,55)),this.camera.setEulerAngles(this.pitch,this.yaw,0)}update(e){var n,l,r,h,c,p;if(e=Math.min(e,.05),this.dialoguePan){const d=this.level.elder,u=new _(d[0]+.45,d[1]+1.65,d[2]+1.65),m=u,f=new U().setFromMat4(new Y().setLookAt(m,new _(d[0],d[1]+1.25,d[2]),_.UP));this.dialoguePan.time=Math.min(1,this.dialoguePan.time+e/1.1);const g=this.dialoguePan.time*this.dialoguePan.time*(3-2*this.dialoguePan.time);this.camera.setPosition(new _().lerp(this.dialoguePan.origin,u,g)),this.camera.setRotation(new U().slerp(this.dialoguePan.start,f,g));const v=this.camera.getEulerAngles();this.pitch=v.x,this.yaw=v.y}if(!this.paused&&this.ui.modal.hidden&&this.state.state!=="EXITED"){if((n=this.obstacles)==null||n.update(),this.walk(e),(l=this.basket)==null||l.update(this.camera),(h=(r=this.npc).facePlayer)==null||h.call(r,this.camera.getPosition(),this.options.anchorEntity,e,this.level.elderFacingOffset??0),this.state.state==="READY"&&(this.readyTime-=e)<=0&&(this.state.set("PLAYING"),this.net.enabled=!0,this.ui.message("FISH! Hold to dip, release to lift.")),this.state.state==="PLAYING"&&(this.spawn.update(e,this.net),this.state.update(e))){this.net.submerged=!1,this.net.enabled=!1;for(const d of[...this.spawn.fish])d.mode!=="net"&&d.mode!=="banked"&&d.mode!=="airborne"&&this.spawn.remove(d);this.ui.returnPrompt(this.score.result())}this.state.state==="RETURN"&&this.spawn.update(e,this.net,!1),this.net.update(e,this.spawn.fish,this.locked||!!this.mobileInput),(c=this.basket)==null||c.updatePile(e)}this.ui.update(this),(p=this.mobile)==null||p.update();const t=this.net.trapped.length>0,i=t?new _(this.net.basket.x,this.net.basket.rimY+.5,this.net.basket.z):new _(...this.level.elder);t||(i.y+=1.9);const s=this.camera.camera.worldToScreen(i),a=document.getElementById("elder-marker");a.style.left=L.clamp(s.x,60,innerWidth-70)+"px",a.style.top=L.clamp(s.y,140,innerHeight-100)+"px",a.innerHTML=t?"BASKET · E TO TIP <span>◆</span>":"ELDER <span>◆</span>",a.hidden=!t&&!["EXPLORE","RETURN"].includes(this.state.state)||s.z<0}destroy(){var e,t;(e=this.mobile)==null||e.destroy(),this.app.off("update",this.updateBound);for(const i of this.handlers)i();this.spawn.destroy(),this.net.destroy(),this.camera.setPosition(this.previousCamera.position),this.camera.setRotation(this.previousCamera.rotation),(t=document.exitPointerLock)==null||t.call(document),this.ui.destroy()}}function bi(o,e){const t=[],i=[];for(let s=0;s<o.height;s++)for(let a=0;a<o.width;a++){const n=o.heights[s*o.width+a];if(n===null)continue;const l=o.minX+a*o.cell,r=o.minZ+s*o.cell,h=o.cell,c=t.length/3;t.push(l,e,r,l+h,e,r,l+h,e,r+h,l,e,r+h,l,n,r,l+h,n,r,l+h,n,r+h,l,n,r+h);for(const[p,d,u,m]of[[4,7,6,5],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]])i.push(c+p,c+d,c+u,c+p,c+u,c+m)}return{positions:t,indices:i}}const We=(o,e,t)=>{const i=Math.max(0,Math.min(1,(t-o)/(e-o)));return i*i*(3-2*i)};function Si(o,e,t){const i=t.water.polygon;if(!ve(o,e,i))return 0;let s=1/0;for(let h=0;h<i.length;h++){const c=i[h],p=i[(h+1)%i.length],d=p[0]-c[0],u=p[1]-c[1],m=Math.max(0,Math.min(1,((o-c[0])*d+(e-c[1])*u)/(d*d+u*u)));s=Math.min(s,Math.hypot(o-c[0]-d*m,e-c[1]-u*m))}const a=t.rockGrid,n=Math.floor((o-a.minX)/a.cell),l=Math.floor((e-a.minZ)/a.cell);let r=.65;for(let h=l-3;h<=l+3;h++)for(let c=n-3;c<=n+3;c++){if(c<0||h<0||c>=a.width||h>=a.height||a.heights[h*a.width+c]===null)continue;const p=a.minX+c*a.cell,d=a.minZ+h*a.cell;r=Math.min(r,Math.hypot(o-Math.max(p,Math.min(p+a.cell,o)),e-Math.max(d,Math.min(d+a.cell,e))))}return We(0,.75,s)*We(0,.45,r)}function Ei(o,e=256){const t=o.rockGrid,i=Math.min(t.minX,...o.water.polygon.map(r=>r[0])),s=Math.min(t.minZ,...o.water.polygon.map(r=>r[1])),a=Math.max(t.minX+t.width*t.cell,...o.water.polygon.map(r=>r[0]))-i,n=Math.max(t.minZ+t.height*t.cell,...o.water.polygon.map(r=>r[1]))-s,l=new Uint8Array(e*e*4);for(let r=0;r<e;r++)for(let h=0;h<e;h++){const c=Si(i+(h+.5)/e*a,s+(r+.5)/e*n,o),p=(r*e+h)*4,d=Math.round(c*255);l[p]=l[p+1]=l[p+2]=d,l[p+3]=255}return{pixels:l,size:e,bounds:[i,s,a,n]}}const zi={GAUSSIAN:"gaussian"},me=new Y,Ne=new _,Q=new _,ye=new xt,Oe=new _,q=new _,Be=new Y,Ue=new Y;class at extends Ye{constructor(){super(...arguments);y(this,"sceneCameraEntity",null);y(this,"mode","reflection");y(this,"scale",.5);y(this,"mipmaps",!1);y(this,"mipmapFilter",zi.GAUSSIAN);y(this,"depth",!0);y(this,"hdr",!1);y(this,"planePoint",new _);y(this,"planeNormal",new _(0,1,0));y(this,"obliqueClipping",!0);y(this,"clipBias",.05);y(this,"_texture",null);y(this,"_viewSpaceClipPlane",[0,0,0,0]);y(this,"_viewProjectionMatrix",new Y);y(this,"_ldrColorSettings",null)}get viewProjectionMatrix(){return this._viewProjectionMatrix}initialize(){var a;if(!((a=this.sceneCameraEntity)==null?void 0:a.camera)){console.error("PlanarRenderer script requires sceneCameraEntity attribute to be set.");return}const i=this.entity.camera;if(!i){console.error("PlanarRenderer script requires a camera component on the same entity.");return}const s=this.app.scene.on("postrender",n=>{i===n&&this.entity.fire("onPlanarPostRender")});this.on("destroy",()=>{s.off(),i.calculateProjection=null,this._updateColorSettings(!1),this._destroyRenderTarget()})}_updateColorSettings(t){const i=this.entity.camera;i&&(t&&!this._ldrColorSettings?(this._ldrColorSettings={toneMapping:i.toneMapping,gammaCorrection:i.gammaCorrection},i.toneMapping=mt,i.gammaCorrection=yt):!t&&this._ldrColorSettings&&(i.toneMapping=this._ldrColorSettings.toneMapping,i.gammaCorrection=this._ldrColorSettings.gammaCorrection,this._ldrColorSettings=null))}_destroyRenderTarget(){const t=this.entity.camera;t!=null&&t.renderTarget&&(t.renderTarget.destroy(),t.renderTarget=null),this._texture&&(this._texture.destroy(),this._texture=null)}updateRenderTarget(){var p,d,u;const t=this.sceneCameraEntity.camera,i=this.app.graphicsDevice,s=((p=t.renderTarget)==null?void 0:p.width)??i.width,a=((d=t.renderTarget)==null?void 0:d.height)??i.height,n=Math.min(Math.floor(s*this.scale),i.maxTextureSize),l=Math.min(Math.floor(a*this.scale),i.maxTextureSize),r=this.hdr&&i.textureHalfFloatRenderable?Me:gt,h=this.entity.camera,c=h.renderTarget;(!c||c.width!==n||c.height!==l||((u=this._texture)==null?void 0:u.format)!==r)&&(this._destroyRenderTarget(),this._texture=new Se(i,{name:`${this.entity.name}:PlanarRenderer`,width:n,height:l,format:r,mipmaps:this.mipmaps,addressU:oe,addressV:oe,minFilter:this.mipmaps?vt:se,magFilter:se}),h.renderTarget=new wt({colorBuffer:this._texture,depth:this.depth}),this._updateColorSettings(r===Me)),this._texture.mipmapFilter=this.mipmapFilter}_calculateProjection(t){const i=this.entity.camera,s=i.renderTarget,a=s?s.width/s.height:1;if(t.setPerspective(i.fov,a,i.nearClip,i.farClip,i.horizontalFov),!this.obliqueClipping)return;const[n,l,r,h]=this._viewSpaceClipPlane,c=t.data,p=(Math.sign(n)+c[8])/c[0],d=(Math.sign(l)+c[9])/c[5],u=-1,m=(1+c[10])/c[14],f=2/(n*p+l*d+r*u+h*m);c[2]=n*f,c[6]=l*f,c[10]=r*f+1,c[14]=h*f}_updateViewSpaceClipPlane(){q.copy(this.planeNormal).normalize(),this.mode!=="reflection"&&q.mulScalar(-1),Oe.copy(q).mulScalar(-this.clipBias).add(this.planePoint);const t=-q.dot(Oe),i=this.entity.getWorldTransform().data,s=q.x,a=q.y,n=q.z,l=this._viewSpaceClipPlane;l[0]=i[0]*s+i[1]*a+i[2]*n,l[1]=i[4]*s+i[5]*a+i[6]*n,l[2]=i[8]*s+i[9]*a+i[10]*n,l[3]=i[12]*s+i[13]*a+i[14]*n+t,l[3]>0&&(l[0]=-l[0],l[1]=-l[1],l[2]=-l[2],l[3]=-l[3])}frameUpdate(){const t=this.entity.camera,i=this.sceneCameraEntity;if(!t||!(i!=null&&i.camera))return null;if(this.updateRenderTarget(),t.enabled){const s=i.getPosition();this.mode==="reflection"?(ye.setFromPointNormal(this.planePoint,this.planeNormal),me.setReflection(ye.normal,ye.distance),me.transformPoint(s,Ne),Q.copy(s).add(i.forward),me.transformPoint(Q,Q),this.entity.setPosition(Ne),this.entity.lookAt(Q)):(this.entity.setPosition(s),this.entity.setRotation(i.getRotation()));const a=i.camera;return t.fov=a.fov,t.horizontalFov=a.horizontalFov,t.orthoHeight=a.orthoHeight,t.nearClip=a.nearClip,t.farClip=a.farClip,t.aperture=a.aperture,t.sensitivity=a.sensitivity,t.shutter=a.shutter,t.jitter=a.jitter,this.obliqueClipping?(this._updateViewSpaceClipPlane(),t.calculateProjection||(t.calculateProjection=(n,l)=>this._calculateProjection(n))):t.calculateProjection=null,this._calculateProjection(Be),Ue.copy(this.entity.getWorldTransform()).invert(),this._viewProjectionMatrix.mul2(Be,Ue),this._texture}return null}}y(at,"scriptName","planarRenderer");const qe=new WeakSet;function ki(o){if(qe.has(o))return;qe.add(o);const e=_e.get(o,kt);e.set("fogPS",`
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
    `);const t=_e.get(o,Pt);t.set("fogPS",`
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
    `)}const Pi=new _,J=new F,nt=`
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
`,rt=`
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
`,Mi=`
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

    ${nt}

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
`,Ci=`
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

    ${nt}

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
`,_i=`
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

    ${rt}

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
`,Ai=`
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

    ${rt}

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
`;class lt extends Ye{constructor(){super(...arguments);y(this,"cameraEntity",null);y(this,"lightEntity",null);y(this,"normalMap",null);y(this,"causticsMap",null);y(this,"reflectionSource","planar");y(this,"refraction",!0);y(this,"obliqueClipping",!0);y(this,"clipBias",.1);y(this,"textureScale",.5);y(this,"depthEffects",!0);y(this,"shallowColor",new F(.6,.9,.85));y(this,"deepColor",new F(.03,.16,.24));y(this,"depthFade",3);y(this,"shoreSoftness",.3);y(this,"opacity",.8);y(this,"rippleTiling",.1);y(this,"rippleSpeed",.05);y(this,"bumpiness",.5);y(this,"distortion",.03);y(this,"fresnelPower",5);y(this,"reflectionStrength",1);y(this,"skyBlur",0);y(this,"specularPower",256);y(this,"specularIntensity",1);y(this,"diffuseIntensity",.35);y(this,"foam",!0);y(this,"foamColor",new F(1,1,1));y(this,"foamDepth",.5);y(this,"causticsTiling",.09);y(this,"causticsSpeed",.04);y(this,"causticsStrength",1.5);y(this,"causticsDepth",3);y(this,"snellWindow",.35);y(this,"waves",!1);y(this,"waveAmplitude",.15);y(this,"waveLength",8);y(this,"waveSpeed",1);y(this,"waveSteepness",.4);y(this,"waveFiltering",1);y(this,"waveDirection",0);y(this,"swellAmplitude",.25);y(this,"swellLength",35);y(this,"swellSpeed",1);y(this,"swellDirection",40);y(this,"_material",null);y(this,"_originalMaterials",[]);y(this,"_reflectionEntity",null);y(this,"_reflectionRenderer",null);y(this,"_refractionEntity",null);y(this,"_refractionRenderer",null);y(this,"_fallbackNormalMap",null);y(this,"_depthMapRequested",!1);y(this,"_time",0);y(this,"_shallowColorArray",[0,0,0]);y(this,"_deepColorArray",[0,0,0]);y(this,"_lightDirArray",[0,-1,0]);y(this,"_lightColorArray",[0,0,0]);y(this,"_foamColorArray",[0,0,0]);y(this,"_waveParamsArray",[0,0,0,0]);y(this,"_waveDirArray",[1,0]);y(this,"_swellParamsArray",[0,0,0,0]);y(this,"_swellDirArray",[1,0]);y(this,"_causticsParamsArray",[0,0,0,0]);y(this,"_underwaterFogColorArray",[0,0,0])}initialize(){var s;if(!((s=this.cameraEntity)!=null&&s.camera)){console.error("Water script requires cameraEntity attribute to be set to an entity with a camera component.");return}if(!this.entity.render){console.error("Water script requires a render component on the same entity.");return}ki(this.app.graphicsDevice),this._material=new bt({uniqueName:"WaterMaterial",vertexGLSL:Mi,fragmentGLSL:Ci,vertexWGSL:_i,fragmentWGSL:Ai,attributes:{vertex_position:St}}),this._material.blendType=be,this._material.depthWrite=!1,this._material.cull=ie;const t=this.entity.render.meshInstances;this._originalMaterials=t.map(a=>a.material),t.forEach(a=>{a.material=this._material}),this._fallbackNormalMap=new Se(this.app.graphicsDevice,{name:"waterFlatNormalMap",width:1,height:1,format:xe}),this._fallbackNormalMap.lock().set([128,128,255,255]),this._fallbackNormalMap.unlock();const i=this.app.on("update",a=>this._frameUpdate(a));this.on("disable",()=>{this._enableCameras(!1),this._requestDepthMap(!1)}),this.on("destroy",()=>{var n,l;i.off(),this._requestDepthMap(!1);const a=this.entity.render;a&&a.meshInstances.forEach((r,h)=>{r.material=this._originalMaterials[h]??r.material}),this._originalMaterials=[],(n=this._reflectionEntity)==null||n.destroy(),this._reflectionEntity=null,(l=this._refractionEntity)==null||l.destroy(),this._refractionEntity=null,this._material.destroy(),this._material=null,this._fallbackNormalMap.destroy(),this._fallbackNormalMap=null})}_getPlanarCameraLayers(){var i;const t=((i=this.entity.render)==null?void 0:i.layers)??[];return this.cameraEntity.camera.layers.filter(s=>!t.includes(s)&&s!==Et&&s!==zt)}_createPlanarCamera(t,i){const s=this.cameraEntity.camera,a=new N(`${this.entity.name}:${t}`);a.addComponent("camera",{layers:this._getPlanarCameraLayers(),priority:s.priority-1,toneMapping:s.toneMapping,fog:s.fog}),a.addComponent("script");const n=a.script.create(at,{properties:{sceneCameraEntity:this.cameraEntity,mode:i,scale:this.textureScale,mipmaps:!1,depth:!0}});return this.app.root.addChild(a),{entity:a,renderer:n}}_enableCameras(t){this._reflectionEntity&&(this._reflectionEntity.enabled=t),this._refractionEntity&&(this._refractionEntity.enabled=t)}_requestDepthMap(t){var i,s;this._depthMapRequested!==t&&(this._depthMapRequested=t,(s=(i=this.cameraEntity)==null?void 0:i.camera)==null||s.requestSceneDepthMap(t))}_setDefine(t,i){const s=this._material.defines.has(t)!==i;return this._material.setDefine(t,i),s}_frameUpdate(t){var f;if(!this._material||!((f=this.cameraEntity)!=null&&f.camera))return;this._time+=t;const i=this._material,s=this.reflectionSource==="sky"&&!!this.app.scene.envAtlas,a=this.reflectionSource==="planar";let n=!1;n=this._setDefine("WATER_REFLECTION_PLANAR",a)||n,n=this._setDefine("WATER_REFLECTION_SKY",s)||n,n=this._setDefine("WATER_REFRACTION",this.refraction)||n,n=this._setDefine("WATER_DEPTH_EFFECTS",this.depthEffects)||n,n=this._setDefine("WATER_FOAM",this.foam&&this.depthEffects)||n,n=this._setDefine("WATER_WAVES",this.waves)||n,n&&i.update(),this._requestDepthMap(this.depthEffects);const l=this.entity.getPosition(),r=this.entity.up,h=this.cameraEntity.getPosition(),c=r.dot(h)<r.dot(l),p=c?Pi.copy(r).mulScalar(-1):r;if(a){this._reflectionEntity||({entity:this._reflectionEntity,renderer:this._reflectionRenderer}=this._createPlanarCamera("WaterReflection","reflection")),this._reflectionEntity.enabled=!0,this._reflectionEntity.camera.toneMapping=this.cameraEntity.camera.toneMapping,this._updatePlanarRenderer(this._reflectionRenderer,l,p);const g=this._reflectionRenderer.frameUpdate();g&&i.setParameter("uReflectionMap",g)}else this._reflectionEntity&&(this._reflectionEntity.enabled=!1);if(this.refraction){this._refractionEntity||({entity:this._refractionEntity,renderer:this._refractionRenderer}=this._createPlanarCamera("WaterRefraction","refraction")),this._refractionEntity.enabled=!0,this._refractionEntity.camera.toneMapping=this.cameraEntity.camera.toneMapping,this._updatePlanarRenderer(this._refractionRenderer,l,p);const g=this._refractionRenderer.frameUpdate();g&&i.setParameter("uRefractionMap",g)}else this._refractionEntity&&(this._refractionEntity.enabled=!1);s&&(i.setParameter("texture_envAtlas",this.app.scene.envAtlas),i.setParameter("uSkyBlur",this.skyBlur)),this._updateUniforms();const d=this.app.graphicsDevice.scope,u=r.dot(l);d.resolve("waterLevel").setValue(u);const m=this.waves?this.waveAmplitude*2+this.swellAmplitude*1.7:0;d.resolve("waterFogLevel").setValue(u+(c?m+.5:0)),d.resolve("waterTime").setValue(this._time),d.resolve("waterCausticsMap").setValue(this.causticsMap??this.normalMap??this._fallbackNormalMap),i.setParameter("uCameraBelow",c?1:0),this._causticsParamsArray[0]=this.causticsTiling,this._causticsParamsArray[1]=this.causticsSpeed,this._causticsParamsArray[2]=this.causticsStrength,this._causticsParamsArray[3]=this.causticsDepth,d.resolve("waterCausticsParams").setValue(this._causticsParamsArray),d.resolve("waterCausticsColor").setValue(this._lightColorArray)}_updatePlanarRenderer(t,i,s){t.planePoint.copy(i),t.planeNormal.copy(s),t.scale=this.textureScale,t.obliqueClipping=this.obliqueClipping,t.clipBias=this.clipBias}_linearColor(t,i,s=1){return J.linear(t),i[0]=J.r*s,i[1]=J.g*s,i[2]=J.b*s,i}_updateUniforms(){var n;const t=this._material;t.setParameter("uNormalMap",this.normalMap??this._fallbackNormalMap),t.setParameter("uTime",this._time),t.setParameter("uShallowColor",this._linearColor(this.shallowColor,this._shallowColorArray)),t.setParameter("uDeepColor",this._linearColor(this.deepColor,this._deepColorArray)),t.setParameter("uRippleTiling",this.rippleTiling),t.setParameter("uRippleSpeed",this.rippleSpeed),t.setParameter("uBumpiness",this.bumpiness),t.setParameter("uDistortion",this.distortion),t.setParameter("uFresnelPower",this.fresnelPower),t.setParameter("uReflectionStrength",this.reflectionStrength),t.setParameter("uDepthFade",this.depthFade),t.setParameter("uShoreSoftness",this.shoreSoftness),t.setParameter("uOpacity",this.opacity),t.setParameter("uSpecularPower",this.specularPower);const i=this.app.scene.fog;t.setParameter("uUnderwaterFogDensity",i.type!==Ce?i.density:.06);const s=i.type!==Ce?i.color:this.deepColor;t.setParameter("uUnderwaterFogColor",this._linearColor(s,this._underwaterFogColorArray)),t.setParameter("uSnellWindow",this.snellWindow);const a=(n=this.lightEntity)==null?void 0:n.light;if(a){const l=this.lightEntity.up;this._lightDirArray[0]=-l.x,this._lightDirArray[1]=-l.y,this._lightDirArray[2]=-l.z,this._linearColor(a.color,this._lightColorArray,a.intensity),t.setParameter("uSpecularIntensity",this.specularIntensity),t.setParameter("uDiffuseIntensity",this.diffuseIntensity)}else this._lightDirArray[0]=0,this._lightDirArray[1]=-1,this._lightDirArray[2]=0,this._lightColorArray[0]=this._lightColorArray[1]=this._lightColorArray[2]=0,t.setParameter("uSpecularIntensity",0),t.setParameter("uDiffuseIntensity",0);if(t.setParameter("uLightDir",this._lightDirArray),t.setParameter("uLightColor",this._lightColorArray),this.foam&&this.depthEffects&&(t.setParameter("uFoamColor",this._linearColor(this.foamColor,this._foamColorArray)),t.setParameter("uFoamDepth",this.foamDepth)),this.waves){this._waveParamsArray[0]=this.waveAmplitude,this._waveParamsArray[1]=2*Math.PI/Math.max(this.waveLength,.01),this._waveParamsArray[2]=this.waveSpeed,this._waveParamsArray[3]=this.waveSteepness,t.setParameter("uWaveParams",this._waveParamsArray),t.setParameter("uWaveFiltering",this.waveFiltering);const l=this.waveDirection*Math.PI/180;this._waveDirArray[0]=Math.cos(l),this._waveDirArray[1]=Math.sin(l),t.setParameter("uWaveDir",this._waveDirArray),this._swellParamsArray[0]=this.swellAmplitude,this._swellParamsArray[1]=2*Math.PI/Math.max(this.swellLength,.01),this._swellParamsArray[2]=this.swellSpeed,this._swellParamsArray[3]=this.waveSteepness,t.setParameter("uSwellParams",this._swellParamsArray);const r=this.swellDirection*Math.PI/180;this._swellDirArray[0]=Math.cos(r),this._swellDirArray[1]=Math.sin(r),t.setParameter("uSwellDir",this._swellDirArray)}}}y(lt,"scriptName","water");class Ri{constructor(e,t,i,s,a,n,l){this.app=e,this.surface=s,this.rocks=a;const r=e.scene.layers.getLayerByName("World");this.layer=new Xe({name:"River water"}),e.scene.layers.insert(this.layer,e.scene.layers.getTransparentIndex(r)+1),t.camera.layers=[...t.camera.layers,this.layer.id];const h=new te;h.redWrite=!1,h.greenWrite=!1,h.blueWrite=!1,h.alphaWrite=!1,h.depthWrite=!0,h.cull=ie,h.update();for(const M of a.findComponents("render")){M.layers=[Ge];for(const T of M.meshInstances)T.material=h}const c=bi(l.rockGrid,l.water.bottomY),p=new ee(e.graphicsDevice);p.setPositions(c.positions),p.setNormals(le(c.positions,c.indices)),p.setIndices(c.indices),p.update();for(const M of a.findComponents("render"))for(const T of M.meshInstances)T.mesh=p;e.root.addChild(a),e.root.addChild(s);for(const M of s.findComponents("render"))M.layers=[this.layer.id];const d=s.findComponents("render")[0].entity;d.setLocalPosition(0,l.waterY,0);const u=[],m=[],f=l.water.polygon,g=f.reduce((M,T)=>[M[0]+T[0]/f.length,M[1]+T[1]/f.length],[0,0]);u.push(g[0],0,g[1]);for(const M of f)u.push(M[0],0,M[1]);for(let M=0;M<f.length;M++)m.push(0,(M+1)%f.length+1,M+1);const v=new ee(e.graphicsDevice);v.setPositions(u),v.setNormals(le(u,m)),v.setIndices(m),v.update();for(const M of d.render.meshInstances)M.mesh=v;d.addComponent("script"),this.script=d.script.create(lt,{properties:{cameraEntity:t,lightEntity:i,normalMap:n==null?void 0:n.resource,reflectionSource:matchMedia("(pointer: coarse)").matches?"sky":"planar",refraction:!1,obliqueClipping:!0,textureScale:.35,depthEffects:!0,shallowColor:new F(.55,.72,.67),deepColor:new F(.12,.27,.24),depthFade:6,shoreSoftness:.12,opacity:.28,foam:!1,foamDepth:.2,rippleTiling:.65,rippleSpeed:.035,bumpiness:.07,distortion:.008,reflectionStrength:.06,specularIntensity:.12,waves:!0,waveAmplitude:.012,waveLength:2.4,waveSteepness:.08,waveDirection:90,swellAmplitude:.008,swellLength:5}});const w=l.rockGrid;w.width*w.cell,w.height*w.cell;const S=Ei(l),z=new Se(e.graphicsDevice,{name:"Feathered shoreline",width:S.size,height:S.size,format:xe,mipmaps:!1,minFilter:se,magFilter:se,addressU:oe,addressV:oe});z.lock().set(S.pixels),z.unlock(),this.mask=z;const E=d.render.meshInstances[0].material,x=E.shaderDesc;E.shaderDesc={...x,fragmentGLSL:x.fragmentGLSL.replace("varying vec3 vWorldPos;",`varying vec3 vWorldPos;
uniform sampler2D riverCoverage;
uniform vec4 riverBounds;`).replace("gl_FragColor = vec4(gammaCorrectOutput(color), alpha);",`vec2 riverUv=(vWorldPos.xz-riverBounds.xy)/riverBounds.zw;
alpha *= texture2D(riverCoverage,riverUv).r;
gl_FragColor = vec4(gammaCorrectOutput(color), alpha);`)},E.setParameter("riverCoverage",z),E.setParameter("riverBounds",new Float32Array(S.bounds)),E.update();const P=d.render.meshInstances[0].mesh,R=[],b=[];P.getPositions(R),P.getIndices(b);const C=[];for(let M=0;M<R.length;M+=3)C.push((R[M]-S.bounds[0])/S.bounds[2],(R[M+2]-S.bounds[1])/S.bounds[3]),R[M+1]=0;const A=new ee(e.graphicsDevice);A.setPositions(R),A.setNormals(le(R,b)),A.setUvs(0,C),A.setIndices(b),A.update();const k=new te;k.diffuse=new F(.32,.36,.3),k.roughness=1,k.opacity=.08,k.opacityMap=z,k.opacityMapChannel="r",k.blendType=be,k.depthWrite=!1,k.cull=ie,k.setDefine("WATER_CAUSTICS",!0),k.update(),this.bed=new N("Riverbed"),this.bed.addComponent("render",{meshInstances:[new je(A,k)]}),this.bed.setPosition(0,l.water.bottomY,0),e.root.addChild(this.bed)}destroy(){this.surface.destroy(),this.rocks.destroy(),this.bed.destroy(),this.mask.destroy(),this.app.scene.layers.remove(this.layer)}}const G=new ot({onReturn:Nt});async function Ti(){const o=document.getElementById("game");o.tabIndex=0;const e=await Mt(o,{deviceTypes:["webgl2"],antialias:!1,alpha:!1}),t=new Ct(o,{graphicsDevice:e});t.setCanvasFillMode(_t),t.setCanvasResolution(At),e.maxPixelRatio=Math.min(devicePixelRatio,matchMedia("(pointer: coarse)").matches?1:1.5),window.addEventListener("resize",()=>t.resizeCanvas()),t.scene.ambientLight=new F(.62,.67,.68);const i=new N("Player");i.addComponent("camera",{clearColor:new F(.5,.63,.67),nearClip:.06,farClip:450,fov:65}),t.root.addChild(i);const s=new Xe({name:"Captured environment"});t.scene.layers.insert(s,0),i.camera.layers=[s.id,...i.camera.layers];const a=new N("River daylight");a.addComponent("light",{type:"directional",intensity:1.4,color:new F(1,.96,.86)}),a.setEulerAngles(50,35,0),t.root.addChild(a),t.start();const n=globalThis.__FRASER_LEVEL??await fetch("./assets/level.json").then(x=>x.json());i.setPosition(...n.player),i.setEulerAngles(-10,8,0),t.loader.getHandler("gsplat").addParser(new Xt(t)),G.loading("Loading the riverbank and elder…");const l={net:"dip_net_frame.glb",elder:"npc_fisher_host.glb",basket:"basket.glb",sockeye:"salmon_sockeye.glb",chinook:"salmon_chinook.glb",surface:"river_surface.glb",rocks:"river_rocks.glb"},r={};await Promise.all(Object.entries(l).map(async([x,P])=>r[x]=await Z(t,"./assets/models/"+P)));const h=V(r.elder)||tt(t,"elder"),c=we(h,1.65),p=new N("Elder at red marker");p.addChild(c),p.setPosition(n.elder[0],n.elder[1]+.825,n.elder[2]),p.setEulerAngles(0,Math.atan2(n.player[0]-n.elder[0],n.player[2]-n.elder[2])*180/Math.PI+(n.elderFacingOffset??0),0),t.root.addChild(p);let d=null;const u=V(r.basket);if(u){const x=we(u,1.15);x.setPosition(n.basket[0],n.basket[1]+.29,n.basket[2]),t.root.addChild(x),d=x}const m=await Z(t,"./assets/river-panorama.jpg","texture");if(m){const x=O(t,"River panorama","sphere",[0,0,0],[350,350,350],[1,1,1]),P=new te;P.useLighting=!1,P.emissive=new F(1,1,1),P.emissiveMap=m.resource,P.cull=Rt,P.depthWrite=!1,P.update(),x.render.layers=[s.id],x.render.material=P,x.setEulerAngles(0,185,0)}G.loading("Opening the local river view…");const f=await Z(t,"./assets/splats/fraser_canyon_bank.spz","gsplat");if(!f)throw Error("The local river splat could not load. Check your connection and reload.");if(!r.net)throw Error("Original dip-net frame is missing from this package.");if(f){const x=new N("Fraser River bank splat");x.addComponent("gsplat",{asset:f,layers:[s.id]}),x.setPosition(...n.splat.position),x.setRotation(new U(...n.splat.rotation)),t.root.addChild(x)}const g=await Z(t,"./assets/water-normal.png","texture"),v=V(r.surface),w=V(r.rocks);if(!v||!w)throw Error("Local river surface/collision assets are missing. Rebuild the project assets.");const S=new Ri(t,i,a,v,w,g,n),z=[];for(const x of n.colliders){if(!x.role)continue;const P=O(t,x.name,"box",x.center,x.size,[.3,.7,.9],.12);P.enabled=!1,z.push(P)}const E=new xi(t,{level:n,assets:r,ui:G,playerCamera:i,elder:h,anchorEntity:p,debugEntities:z,water:S,basketEntity:d,onComplete:x=>{try{localStorage.setItem("fraser-last-harvest",JSON.stringify(x))}catch{}}});G.onReset=()=>E.reset(),await E.start(),Bt(E),window.fishingGame=E,window.fishingApp=t,window.addEventListener("pagehide",()=>E.destroy(),{once:!0})}Ti().catch(o=>{console.error(o),G.ready(),G.show('<h2>Unable to start the local game</h2><p id="error-detail"></p><button class="primary" onclick="location.reload()">Reload</button>'),document.getElementById("error-detail").textContent=o.message});
