import fs from 'node:fs';
import crypto from 'node:crypto';

// Read-only checks: the installer copies the original bytes, never rewrites GLB.
export function inspectElder(file) {
  const bytes=fs.readFileSync(file);
  if(bytes.readUInt32LE(0)!==0x46546c67 || bytes.readUInt32LE(4)!==2 || bytes.readUInt32LE(8)!==bytes.length)throw new Error('Invalid GLB v2 header/length');
  if(bytes.readUInt32LE(16)!==0x4e4f534a)throw new Error('Missing GLB JSON chunk');
  const doc=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)).toString());
  const roots=(doc.nodes||[]).filter(n=>n.name==='Elder_Armature_AnimMaster');
  const root=roots[0], near=(a,b)=>Array.isArray(a)&&a.length===b.length&&a.every((v,i)=>Math.abs(v-b[i])<1e-5);
  if(roots.length!==1 || !near(root.scale,[.01,.01,.01]) ||
    !(near(root.rotation,[Math.SQRT1_2,0,0,Math.SQRT1_2])||near(root.rotation,[-Math.SQRT1_2,0,0,-Math.SQRT1_2])))throw new Error('Damaged/missing original armature transforms; use the unmodified Blender export');
  if(doc.meshes?.length!==1 || doc.skins?.length!==1 || doc.skins[0].joints?.length!==33 || !Number.isInteger(doc.skins[0].inverseBindMatrices))throw new Error('Expected one mesh and one 33-joint skin with inverse binds');
  const names=(doc.animations||[]).map(a=>a.name);
  for(const name of ['mixamo.com_Idle','NlaTrack_Talking','NlaTrack_Working'])if(!names.includes(name))throw new Error('Missing animation: '+name);
  const rootIndex=doc.nodes.indexOf(root);
  for(const anim of doc.animations)if(anim.channels.some(c=>c.target.node===rootIndex))throw new Error('Animation targets placement-sensitive armature root: '+anim.name);
  return {bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),animations:names,
    materials:doc.materials?.map(m=>({name:m.name,alphaMode:m.alphaMode||'OPAQUE',doubleSided:m.doubleSided||false})),
    rootAnimationChannels:0};
}
