/**
 * خادم تطوير للصفحات الثابتة فقط (بدون دمج محرك بحث خارجي)
 * الاستخدام: npm start  →  http://localhost:3333
 * المحرك (SearXNG) مشروع منفصل: engines/searxng/
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT) || 3333;
const ROOT = path.join(__dirname, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'Cache-Control': 'no-store',
    ...headers,
  });
  res.end(body);
}

function safeJoin(base, reqPath) {
  const decoded = decodeURIComponent(reqPath.split('?')[0]);
  const target = path.normalize(path.join(base, decoded));
  if (!target.startsWith(base)) return null;
  return target;
}

function serveStatic(req, res) {
  let urlPath = new URL(req.url, 'http://localhost').pathname;
  if (urlPath === '/' || urlPath === '/index.html') {
    const primary = path.join(ROOT, 'financial-consulting', 'iif-fund-demo', 'index.html');
    urlPath = fs.existsSync(primary)
      ? '/financial-consulting/iif-fund-demo/index.html'
      : '/financial-consulting/fund-site/index.html';
  }
  const filePath = safeJoin(ROOT, urlPath);
  if (!filePath) {
    send(res, 403, 'Forbidden', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }
  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) {
      send(res, 404, 'Not found', { 'Content-Type': 'text/plain; charset=utf-8' });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(res, 405, 'Method Not Allowed');
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log('');
  console.log('  الواجهة: http://127.0.0.1:' + PORT + '/  (الصندوق + المنصة — بدون بروكسي محرك)');
  console.log('  المنصة مباشرة: …/government-search/SIMPLE-GOVERNMENT-PLATFORM.html');
  console.log('  المحرك منفصل: engines/searxng/  →  docker compose up -d  (منفذ 8080)');
  console.log('');
});
