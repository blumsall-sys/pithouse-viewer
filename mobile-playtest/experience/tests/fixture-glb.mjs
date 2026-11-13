// Synthetic control fixture ONLY, served by browser route interception. Never
// installed as elder.glb or used as a fallback in the experience.
export function fixtureGlb() {
  const buffers=[],views=[],accessors=[];let offset=0;
  function accessor(values,Type,type,count,extras={}) {
    const bytes=Buffer.from(new Type(values).buffer);
    views.push({buffer:0,byteOffset:offset,byteLength:bytes.length});
    buffers.push(bytes);offset+=bytes.length;
    const padding=(4-offset%4)%4;if(padding){buffers.push(Buffer.alloc(padding));offset+=padding;}
    accessors.push({bufferView:views.length-1,componentType:Type===Float32Array?5126:5123,type,count,...extras});
    return accessors.length-1;
  }
  const positions=accessor([-25,-15,0,25,-15,0,25,15,0,-25,15,0,-25,-15,-100,25,-15,-100,25,15,-100,-25,15,-100],Float32Array,'VEC3',8,{min:[-25,-15,-100],max:[25,15,0]});
  const joints=accessor(Array(32).fill(0),Uint16Array,'VEC4',8);
  const weights=accessor(Array.from({length:32},(_,i)=>i%4===0?1:0),Float32Array,'VEC4',8);
  const indices=accessor([0,1,2,0,2,3,4,6,5,4,7,6,0,4,5,0,5,1,1,5,6,1,6,2,2,6,7,2,7,3,3,7,4,3,4,0],Uint16Array,'SCALAR',36);
  const matrices=accessor(Array.from({length:33*16},(_,i)=>i%16%5===0?1:0),Float32Array,'MAT4',33);
  const times=accessor([0,1],Float32Array,'SCALAR',2,{min:[0],max:[1]});
  const translations=accessor([0,0,0,3,0,0],Float32Array,'VEC3',2);
  const nodes=[{name:'Elder_Armature_AnimMaster',scale:[.01,.01,.01],rotation:[Math.SQRT1_2,0,0,Math.SQRT1_2],children:[1,2]}, {name:'CONTROL_FIXTURE_NOT_ELDER',mesh:0,skin:0},...Array.from({length:33},(_,i)=>({name:'joint'+i,...(i<32?{children:[i+3]}:{})}))];
  const doc={asset:{version:'2.0'},scene:0,scenes:[{nodes:[0]}],nodes,
    buffers:[{byteLength:offset}],bufferViews:views,accessors,
    meshes:[{primitives:[{attributes:{POSITION:positions,JOINTS_0:joints,WEIGHTS_0:weights},indices,material:0}]}],
    skins:[{joints:Array.from({length:33},(_,i)=>i+2),inverseBindMatrices:matrices,skeleton:2}],
    materials:[{name:'CONTROL_ALPHA_BLEND',alphaMode:'BLEND',doubleSided:true,pbrMetallicRoughness:{baseColorFactor:[.6,.3,.1,.8],metallicFactor:0,roughnessFactor:.5}}],
    animations:['mixamo.com_Idle','NlaTrack_Talking','NlaTrack_Working'].map(name=>({name,samplers:[{input:times,output:translations}],channels:[{sampler:0,target:{node:2,path:'translation'}}]}))};
  let json=Buffer.from(JSON.stringify(doc));json=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)]);
  const bin=Buffer.concat(buffers),header=Buffer.alloc(20),binHeader=Buffer.alloc(8);
  header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(28+json.length+bin.length,8);header.writeUInt32LE(json.length,12);header.writeUInt32LE(0x4e4f534a,16);
  binHeader.writeUInt32LE(bin.length,0);binHeader.writeUInt32LE(0x004e4942,4);
  return Buffer.concat([header,json,binHeader,bin]);
}
