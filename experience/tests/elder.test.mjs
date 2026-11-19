import test from 'node:test';
import assert from 'node:assert/strict';
import * as pc from 'playcanvas';
import { dialogueAnimation, configureElderMaterials, validateArmature } from '../elder-runtime.js';
import { AdventureRuntime } from '../adventure-runtime.js';
import fs from 'node:fs';
const scene=JSON.parse(fs.readFileSync(new URL('../data/pithouse-scene.json',import.meta.url)));

test('only explicit Elder dialogue owns animation, including stale topic fields',()=>{
  for(const node of [null,{}, {speaker:'Elder'}, {selected:'warmthDetail'}, {character:'annotation',animation:'FireWork'}])assert.equal(dialogueAnimation(node),'Idle');
  assert.equal(dialogueAnimation(scene.dialogue.welcome),'Talk');
  assert.equal(dialogueAnimation(scene.dialogue.warmth),'Talk');
  assert.equal(dialogueAnimation(scene.dialogue.warmthDetail),'FireWork');
  assert.equal(dialogueAnimation(scene.dialogue.topics),'Talk');
});

test('MASK writes opaque-pass depth and preserves texture alpha and imported sidedness',()=>{
  const source=new pc.StandardMaterial();
  source.blendType=pc.BLEND_NORMAL;source.depthWrite=false;
  source.cull=pc.CULLFACE_NONE;source.twoSidedLighting=true;
  source.opacityMapChannel='a';
  const meshes=[{material:source},{material:source}];
  configureElderMaterials(pc,meshes,{mode:'mask',alphaCutoff:.1});
  const material=meshes[0].material;
  assert.notEqual(material,source);assert.equal(material,meshes[1].material);
  assert.equal(material.blendType,pc.BLEND_NONE);assert.equal(material.depthWrite,true);
  assert.equal(material.alphaTest,.1);assert.equal(material.cull,source.cull);
  assert.equal(material.twoSidedLighting,true);assert.equal(material.opacityMapChannel,'a');
  assert.equal(source.depthWrite,false);assert.equal(source.blendType,pc.BLEND_NORMAL);
});

test('original rig scale and quaternion preserved; normalized and reversed rotation rejected',()=>{
  const root=new pc.Entity('Elder_Armature_AnimMaster');
  root.setLocalScale(.01,.01,.01);root.setLocalRotation(Math.SQRT1_2,0,0,Math.SQRT1_2);
  const before=root.getLocalTransform().clone();validateArmature(root);
  assert.deepEqual(root.getLocalTransform(),before);
  root.setLocalScale(1,1,1);assert.throws(()=>validateArmature(root),/damaged/);
  root.setLocalScale(.01,.01,.01);root.setLocalRotation(-Math.SQRT1_2,0,0,Math.SQRT1_2);
  assert.throws(()=>validateArmature(root),/damaged/);
});

test('annotation interruption cancels Elder shot and retains original exploration pose',()=>{
  const original={position:new pc.Vec3(1,2,3),rotation:new pc.Quat(),fov:78,navYaw:12,navPitch:3,groundFoot:.4};
  const calls=[];
  const runtime={savedPose:original,poseFromShot:()=>null,moveTo:(...args)=>calls.push(args)};
  AdventureRuntime.prototype.enterDialogue.call(runtime,{},null);
  assert.equal(runtime.savedPose,original);assert.equal(runtime.currentShot,null);
  assert.equal(calls.length,1);assert.equal(calls[0][1],true);
  assert.equal(calls[0][0].position,original.position);
});

test('subsequent Elder topics keep inventory discussion available',()=>{
  const runtime={inventory:[{name:'Study Stone'}]};
  const decorated=AdventureRuntime.prototype.decorateDialogue.call(runtime,'topics',scene.dialogue.topics);
  assert.ok(decorated.choices.some(choice=>choice.next==='stoneDiscussion'));
  assert.equal(scene.dialogue.topics.choices.length,3);
});

test('all authored speaking nodes have explicit animation ownership',()=>{
  for(const node of Object.values(scene.dialogue)){
    assert.equal(node.character,'elder');
    assert.ok(['Talk','FireWork'].includes(node.animation));
  }
  assert.equal(Object.values(scene.dialogue).filter(node=>node.animation==='FireWork').length,1);
});
