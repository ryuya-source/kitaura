#!/usr/bin/env node
/**
 * v0 静的サイト用サーバー（実機確認用）
 * - 必ずこのファイルがある v4/HTML/v0 をルートに配信
 * - / と /index.html → v0_kitaura.html を返す
 * - 0.0.0.0:3000 で待ち受け（同一Wi-Fiの実機から http://<PCのIP>:3000/ でアクセス可）
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0';
const ROOT = path.resolve(__dirname);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function getMime(ext) {
  return MIME[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
  if (urlPath === '/' || urlPath === '/index.html') {
    urlPath = '/v0_kitaura.html';
  }
  const filePath = path.join(ROOT, path.join('/', urlPath));

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': getMime(ext) });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`[v0 server] http://${HOST}:${PORT}/ → v0_kitaura.html`);
  console.log(`[v0 server] 実機: http://<このPCのIP>:${PORT}/`);
});
