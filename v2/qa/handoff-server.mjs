import fs from 'node:fs';
import path from 'node:path';
const { createServer } = await import('node:http');
const server = createServer((req,res) => {
 let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
 let f = path.join('dist', pathname);
 if(!fs.existsSync(f) && fs.existsSync(f+'.html')) f += '.html';
 if(fs.existsSync(f) && fs.statSync(f).isDirectory()) f=path.join(f,'index.html');
 if(!fs.existsSync(f)) {f='dist/404.html';res.statusCode=404;}
 const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml'};
 res.setHeader('Content-Type',types[path.extname(f)] || 'application/octet-stream');fs.createReadStream(f).pipe(res);
});
await new Promise(r=>server.listen(Number(process.env.QA_PORT ?? 4348),'127.0.0.1',r));
