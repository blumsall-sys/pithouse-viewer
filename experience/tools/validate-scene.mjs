/**
 * Run: node experience/tools/validate-scene.mjs
 * No dependencies. Validates authored scene JSON and narrative references.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const scenePath=path.resolve(dir,'../data/pithouse-scene.json');
const scene=JSON.parse(fs.readFileSync(scenePath,'utf8'));
let errors=0,warnings=0;
function error(text){errors++;console.error('ERROR:',text)}
function warn(text){warnings++;console.warn('WARN:',text)}
function vec(v,n=3){return Array.isArray(v)&&v.length===n&&v.every(Number.isFinite)}
function unique(items,key,label) {
  const ids=new Set();
  for(const item of items){
    const id=item[key];
    if(typeof id!=='string'||!id)error(label+' missing '+key);
    else if(ids.has(id))error(label+' repeated '+key+': '+id);
    else ids.add(id);
  }
}
if(scene.version!==1)error('scene.version should be 1');
if(!vec(scene.spawn?.position)||!vec(scene.spawn?.lookAt))error('spawn must have position/lookAt XYZ arrays');
if(typeof scene.environment?.splat!=='string'||!scene.environment.splat.endsWith('.sog'))error('environment.splat must reference a .sog');
if(!scene.dialogue||!scene.dialogue.welcome)error('Missing dialogue.welcome entry');
for(const [id,node] of Object.entries(scene.dialogue||{})){
  if(!node.text||typeof node.text!=='string')error(id+' missing text');
  if(node.focus&&!vec(node.focus))error(id+' invalid camera focus');
  if(!Array.isArray(node.choices))error(id+' missing choices array');
  if(node.minDecisionSeconds!==undefined&&(node.minDecisionSeconds<0||node.minDecisionSeconds>15))warn(id+' delay outside 0–15 seconds; runtime clamps it');
  if(node.choices?.length>3)warn(id+' has >3 choices, but keyboard supports keys 1–3');
  for(const c of(node.choices||[])){
    if(!c.text)error(id+' choice missing text');
    if(c.next&&!scene.dialogue[c.next])error(id+' points to missing node '+c.next);
    if(c.action==='annotation'&&(!Number.isInteger(c.annotationIndex)||c.annotationIndex<0))error(id+' invalid annotationIndex');
    if(!c.next&&!c.mode&&!c.action)warn(id+' choice has no action');
  }
}
const chars=scene.characters||[],hots=scene.hotspots||[],items=scene.collectibles||[],walls=scene.colliders||[];
unique(chars,'id','NPC');unique(hots,'id','hotspot');unique(items,'id','collectible');
for(const [label,list] of [['NPC',chars],['hotspot',hots],['collectible',items]]){
  for(const i of list)if(!vec(i.position))error(label+' '+i.id+' invalid position');
}
for(const i of [...chars,...hots])if(i.dialogue&&!scene.dialogue?.[i.dialogue])error(i.id+' references missing dialogue '+i.dialogue);
for(const c of walls) {
  if(!vec(c.center)||!vec(c.size)||c.size.some(x=>x<=0))error('Bad AABB collider '+c.id);
  if(!['solid','floor','trigger'].includes(c.kind))warn('Unknown collider kind '+c.id);
}
for(const [label,asset] of [['splat',scene.environment?.splat],['props',scene.environment?.propsGlb]]) {
  if(typeof asset==='string'&&!/^(https?:)?\/\//.test(asset)) {
    const file=path.resolve(dir,'..',asset);
    if(!fs.existsSync(file))error(label+' asset not found: '+asset);
  }
}
for(const c of chars){if(typeof c.model==='string'){
  const file=path.resolve(dir,'..',c.model);
  if(!fs.existsSync(file))warn('NPC model not found (will use placeholder): '+c.model);
}}
console.log('Pithouse scene:',chars.length,'NPCs,',hots.length,'hotspots,',items.length,'items,',walls.length,'colliders,',Object.keys(scene.dialogue||{}).length,'dialogue nodes');
console.log('Validation complete:',errors,'errors,',warnings,'warnings.');
if(errors)process.exitCode=1;
