import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=fileURLToPath(new URL('../dist/',import.meta.url));
const port=Number(process.env.PORT||8170);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.wav':'audio/wav','.glb':'model/gltf-binary','.wasm':'application/wasm'};
http.createServer((req,res)=>{
  let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
  const file=path.resolve(root,'.'+pathname);
  if(file!==path.resolve(root)&&!file.startsWith(path.resolve(root)+path.sep)){res.writeHead(403).end();return;}
  fs.stat(file,(error,stat)=>{
    if(error){res.writeHead(404).end('Not found');return;}
    if(stat.isDirectory()){
      if(!pathname.endsWith('/')){res.writeHead(302,{Location:pathname+'/'+new URL(req.url,'http://localhost').search}).end();return;}
      const index=path.join(file,'index.html');
      if(!fs.existsSync(index)){res.writeHead(404).end();return;}
      res.writeHead(200,{'Content-Type':types['.html'],'Cache-Control':'no-cache'});fs.createReadStream(index).pipe(res);return;
    }
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(file).pipe(res);
  });
}).listen(port,'127.0.0.1',()=>console.log('Journey preview: http://127.0.0.1:'+port+'/experience/'));
