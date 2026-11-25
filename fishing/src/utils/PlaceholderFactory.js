import {localAssetUrl} from './LocalAssets.js';
import * as pc from 'playcanvas';

export function material(color,opacity=1){const m=new pc.StandardMaterial();m.diffuse=new pc.Color(...color);m.emissive=new pc.Color(...color.map(v=>v*.12));m.metalness=0;m.useMetalness=true;m.roughness=.8;if(opacity<1){m.opacity=opacity;m.blendType=pc.BLEND_NORMAL;m.depthWrite=false;}m.update();return m;}

export function primitive(app,name,type,pos,scale,color,opacity=1){const e=new pc.Entity(name);e.addComponent('render',{type});e.render.material=material(color,opacity);e.setPosition(...pos);e.setLocalScale(...scale);app.root.addChild(e);return e;}

export function fallback(app,type){if(type==='fish')return primitive(app,'Fallback fish','sphere',[0,0,0],[.16,.2,.65],[.75,.3,.2]);if(type==='elder')return primitive(app,'Fallback elder','capsule',[0,.85,0],[.55,1.65,.55],[.32,.26,.18]);return primitive(app,'Fallback net pole','cylinder',[0,0,0],[.04,2,.04],[.5,.3,.12]);}

export function safeLoad(app,url,type='container'){return new Promise(resolve=>{let settled=false;const timeout=setTimeout(()=>{if(!settled){settled=true;console.warn('Asset timed out',url);resolve(null);}},matchMedia('(pointer: coarse)').matches?180000:90000);app.assets.loadFromUrlAndFilename(localAssetUrl(url),url.split('/').pop(),type,(err,asset)=>{if(settled)return;settled=true;clearTimeout(timeout);if(err)console.warn('Asset unavailable',url,err);resolve(err?null:asset);});});}

export function instantiate(asset){return asset?.resource?.instantiateRenderEntity();}

export function normalize(entity,size=1){const renders=entity.findComponents('render');let bb=null;let skinned=false;for(const r of renders)for(const mi of r.meshInstances){const bound=mi.skinInstance?mi.mesh.aabb:mi.aabb;skinned ||= !!mi.skinInstance;if(bb)bb.add(bound);else bb=bound.clone();}if(!bb)return entity;const s=size/(Math.max(bb.halfExtents.x,bb.halfExtents.y,bb.halfExtents.z)*2);const wrapper=new pc.Entity('Normalized asset');wrapper.addChild(entity);const original=entity.getLocalPosition().clone();entity.setLocalPosition(original.sub(bb.center));wrapper.setLocalScale(s,s,s);return wrapper;}

export function animationName(asset){return asset.resource?.name||asset.name||'';}
export function findAnimation(clips,word){return clips.findIndex(a=>animationName(a).toLowerCase().includes(word.toLowerCase()));}
export function animate(entity,asset,preferred='Swim'){const clips=asset?.resource?.animations||[];if(!clips.length)return null;entity.addComponent('anim',{activate:true});const index=Math.max(0,findAnimation(clips,preferred));const states=clips.map((a,i)=>({name:'Clip'+i,speed:1,loop:true}));entity.anim.loadStateGraph({layers:[{name:'Base',states:[{name:'START'},...states],transitions:[{from:'START',to:'Clip'+index}]}],parameters:{}});clips.forEach((a,i)=>entity.anim.assignAnimation('Clip'+i,a.resource));entity.anim.baseLayer.play('Clip'+index);return {component:entity.anim,names:clips.map(animationName),play:(word)=>{const i=findAnimation(clips,word);if(i>=0)entity.anim.baseLayer.transition('Clip'+i,.25);}};}
