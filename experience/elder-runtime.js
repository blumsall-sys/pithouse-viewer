// Elder policies shared by the app and the regression harness. No rig transforms
// or inverse-bind matrices are modified here.
export function dialogueAnimation(node) {
  if (node?.character !== 'elder') return 'Idle';
  return ['Idle','FireWork'].includes(node.animation) ? node.animation : 'Talk';
}

export function validateArmature(root) {
  if (!root) throw new Error('Elder GLB is missing Elder_Armature_AnimMaster.');
  const s = root.getLocalScale(), q = root.getLocalRotation();
  const expected = Math.SQRT1_2;
  if (![s.x,s.y,s.z].every(v => Math.abs(v-.01)<1e-5) ||
      Math.abs(Math.abs(q.x)-expected)>1e-5 || Math.abs(q.y)>1e-5 ||
      Math.abs(q.z)>1e-5 || Math.abs(Math.abs(q.w)-expected)>1e-5 || q.x*q.w<0) {
    throw new Error('Elder armature transform is damaged. Install the unmodified Elder_NLA_wMesh.glb; never normalize its root without rebaking skin bind matrices.');
  }
}

export function configureElderMaterials(pc, meshes, policy = {}) {
  const mode = policy.mode || 'source';
  if (!['source','mask','opaque'].includes(mode)) throw new Error('Unknown Elder material mode: '+mode);
  const cutoff = policy.alphaCutoff ?? .1;
  if (!Number.isFinite(cutoff) || cutoff<=0 || cutoff>=1) throw new Error('Elder alphaCutoff must be between 0 and 1.');
  const materials = new Map();
  for (const mesh of meshes) {
    const original = mesh.material;
    if (!materials.has(original)) {
      const material = original.clone();
      // MASK retains the imported RGBA opacity map/UVs and two-sided lighting,
      // but puts the body in the opaque depth-writing pass before the splat.
      // Opaque is a diagnostic comparison only; source restores glTF behavior.
      if (mode !== 'source') {
        material.blendType = pc.BLEND_NONE;
        material.depthWrite = true;
        material.depthTest = true;
        material.alphaTest = mode === 'mask' ? cutoff : 0;
      }
      material.update();
      materials.set(original, material);
    }
    mesh.material = materials.get(original);
  }
  return [...materials.values()];
}

export function elderSnapshot(meshes) {
  return meshes.map(mesh => {
    const box = mesh.aabb;
    return {
      node: mesh.node.name, skinned: Boolean(mesh.skinInstance),
      visible: mesh.visible, visibleThisFrame: mesh.visibleThisFrame, cull: mesh.cull,
      center: box.center.toArray(), halfExtents: box.halfExtents.toArray(),
      blendType: mesh.material.blendType, depthWrite: mesh.material.depthWrite,
      depthTest: mesh.material.depthTest, alphaTest: mesh.material.alphaTest
    };
  });
}
