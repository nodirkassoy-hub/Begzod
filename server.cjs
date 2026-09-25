/* ============================================================
   BALANS AI — zero-dependency static server
   Usage: node server.js [port]
   ============================================================ */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = parseInt(process.env.PORT || process.argv[2] || '4173', 10);
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(url.parse(req.url).pathname);
  } catch (e) {
    res.writeHead(400); res.end('Bad request'); return;
  }
  if (pathname === '/') pathname = '/index.html';

  const file = path.normalize(path.join(ROOT, pathname));
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }

  fs.readFile(file, (err, buf) => {
    if (err) {
      // SPA-ish fallback for unknown deep links
      fs.readFile(path.join(ROOT, 'index.html'), (e2, html) => {
        if (e2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-cache' });
        res.end(html);
      });
      return;
    }
    const ext = path.extname(file).toLowerCase();
    const immutable = /\.[0-9a-f]{8,}\./.test(file) || ext === '.woff2';
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(buf);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`BALANS AI presentation running on http://0.0.0.0:${PORT}`);
});
