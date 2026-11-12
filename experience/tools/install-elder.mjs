import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inspectElder } from './elder-asset.mjs';
const destination=fileURLToPath(new URL('../assets/elder.glb',import.meta.url));
try {
  const source=process.argv[2];
  if(!source)throw new Error('Usage: node experience/tools/install-elder.mjs "C:\\path\\Elder_NLA_wMesh.glb"');
  const report=inspectElder(source);
  fs.mkdirSync(path.dirname(destination),{recursive:true});
  if(path.resolve(source)!==destination)fs.copyFileSync(source,destination);
  console.log('Installed original Elder bytes unchanged:',JSON.stringify(report,null,2));
} catch(error) {console.error(error.message);process.exitCode=1;}
