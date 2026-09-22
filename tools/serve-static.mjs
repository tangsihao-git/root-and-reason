import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('out');
const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const port = Number(process.env.PORT || 4321);
const types = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.woff':'font/woff','.wasm':'application/wasm' };
http.createServer((req,res)=>{
 try {
  let url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if(base && url.startsWith(base+'/'))url=url.slice(base.length);
  let file=path.resolve(root,'.'+url);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(fs.existsSync(path.join(root,'404.html'))?fs.readFileSync(path.join(root,'404.html')):'Not found');return;}
  const contentType = file.endsWith('.txt') ? 'text/plain; charset=utf-8' : types[path.extname(file)] || 'application/octet-stream';
  res.writeHead(200,{'Content-Type':contentType,'Cache-Control':'no-cache'});
  fs.createReadStream(file).pipe(res);
 }catch{res.writeHead(400);res.end('Bad request');}
}).listen(port,'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${port}${base}/`));
