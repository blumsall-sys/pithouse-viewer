import {Quat} from 'playcanvas';
export function freezeFish(f){if(f.anim?.component)f.anim.component.enabled=false;if(!f.frozenBones){f.frozenBones=[];for(const name of ['neck','head','tail_1','tail_2','tail_3','tail_4','tail_5','tail_6']){const node=f.entity?.findByName?.(name);if(node)f.frozenBones.push({node,name,rotation:node.getLocalRotation().clone()});}}}
export function bendFish(f,bend=0){freezeFish(f);for(const b of f.frozenBones){const weight=b.name.startsWith('tail')?.3:-.12;b.node.setLocalRotation(b.rotation.clone().mul(new Quat().setFromEulerAngles(0,bend*weight,0)));}}
export function thawFish(f){if(f.anim?.component){f.anim.component.enabled=true;f.anim.component.speed=1.5;}f.frozenBones=null;}
