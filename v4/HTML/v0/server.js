#!/usr/bin/env node
/**
 * v0 静的サイト用サーバー（実機確認用）
 * - v4/HTML/v0 をドキュメントルートに配信（相対パス src/... で画像が読める）
 * - / と /index.html → v0_kitaura.html
 * - 0.0.0.0:3001 で待ち受け（実機: http://<PCのIP>:3001/ ）
 * - 3000 は Next.js (kitauralakeside-rvpark-newsite) 用に空けておく
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
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
  const urlPath = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
  const isRoot = urlPath === '/' || urlPath === '/index.html';
  const servePath = isRoot ? '/v0_kitaura.html' : urlPath;
  const relativePath = servePath.replace(/^\//, '').split('/').filter(Boolean).join(path.sep);
  if (relativePath.includes('..')) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  const filePath = path.join(ROOT, relativePath);
  const resolved = path.resolve(filePath);
  const rootResolved = path.resolve(ROOT) + path.sep;
  if (!resolved.startsWith(rootResolved)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500);
      res.end(err.code === 'ENOENT' ? 'Not Found' : 'Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': getMime(path.extname(filePath)) });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`[v0 server] http://localhost:${PORT}/ → v0_kitaura.html`);
  console.log(`[v0 server] 実機: http://<このPCのIP>:${PORT}/`);
});
