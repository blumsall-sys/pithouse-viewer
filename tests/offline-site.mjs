import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const types={mjs:'text/javascript',js:'text/javascript',html:'text/html',json:'application/json',css:'text/css',jpg:'image/jpeg',png:'image/png',wav:'audio/wav'};
// Fully offline browser verification: no listening port or network connection.
export async function installOfflineSite(page){
  await page.route('http://127.0.0.1:8170/**',async route=>{
    let pathname=decodeURIComponent(new URL(route.request().url()).pathname);
    if(pathname.endsWith('/'))pathname+='index.html';
    const file=path.resolve(root,'.'+pathname);
    if(!file.startsWith(path.resolve(root)+path.sep))return route.fulfill({status:403,body:''});
    await route.fulfill({path:file,contentType:types[file.split('.').pop()]||'application/octet-stream'});
  });
}
