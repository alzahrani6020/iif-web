/**
 * خادم تطوير للصفحات الثابتة + بروكسي SearXNG على /api/searx
 * الاستخدام: npm start  →  http://localhost:3333
 * المحرك: engines/searxng/  →  docker compose up -d  (منفذ 8080)
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT) || 3333;
const ROOT = path.join(__dirname, '..');
/** upstream SearXNG (Docker) */
const SEARX_UPSTREAM = new URL(process.env.SEARXNG_URL || 'http://127.0.0.1:8080');

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

function proxySearx(req, res) {
  const u = new URL(req.url, 'http://127.0.0.1');
  const subPath = u.pathname.replace(/^\/api\/searx/, '') || '/';
  const targetPath = subPath + u.search;
  const port = Number(SEARX_UPSTREAM.port) || 8080;
  const headers = {};
  for (const k of Object.keys(req.headers)) {
    const lk = k.toLowerCase();
    if (lk === 'host' || lk === 'connection') continue;
    headers[k] = req.headers[k];
  }
  headers.host = `${SEARX_UPSTREAM.hostname}:${port}`;
  const preq = http.request(
    {
      hostname: SEARX_UPSTREAM.hostname,
      port,
      path: targetPath,
      method: req.method,
      headers,
      /** أطول من مهلة المتصفح في SIMPLE-GOVERNMENT-PLATFORM (SearXNG قد يستغرق >30 ث مع عدة محركات / Tor) */
      timeout: 100000,
    },
    (pres) => {
      res.writeHead(pres.statusCode, pres.headers);
      pres.pipe(res);
    }
  );
  preq.on('timeout', () => {
    preq.destroy();
    if (!res.headersSent) {
      send(res, 504, 'انتهت مهلة الاتصال بـ SearXNG', { 'Content-Type': 'text/plain; charset=utf-8' });
    }
  });
  preq.on('error', (e) => {
    if (!res.headersSent) {
      send(
        res,
        502,
        'SearXNG غير متاح: ' +
          e.message +
          '\n\nشغّل المحرك من: engines/searxng\n  docker compose up -d\n',
        { 'Content-Type': 'text/plain; charset=utf-8' }
      );
    }
  });
  req.pipe(preq);
}

function serveStatic(req, res) {
  let urlPath = new URL(req.url, 'http://localhost').pathname;
  /** مجلدات: /legal/ → /legal/index.html (مثل Netlify) */
  if (urlPath !== '/' && urlPath.endsWith('/')) {
    urlPath = urlPath.slice(0, -1) + '/index.html';
  }
  /** اختصارات مثل netlify.toml — للتطوير المحلي */
  const shortPaths = {
    '/privacy': '/legal/privacy.html',
    '/disclaimer': '/legal/disclaimer.html',
    '/contact': '/legal/contact.html',
    '/legal': '/legal/index.html',
    '/executive': '/executive-brief.html',
    '/brief': '/executive-brief.html',
    '/sovereign': '/sovereign-standards.html',
    '/charter': '/sovereign-standards.html',
  };
  if (shortPaths[urlPath]) {
    urlPath = shortPaths[urlPath];
  }
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
  const urlPath = new URL(req.url, 'http://localhost').pathname;
  if (urlPath.startsWith('/api/searx')) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      send(res, 405, 'Method Not Allowed');
      return;
    }
    proxySearx(req, res);
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(res, 405, 'Method Not Allowed');
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log('');
  console.log('  الواجهة: http://127.0.0.1:' + PORT + '/');
  console.log('  موجز للمستويات الرفيعة: /executive-brief.html أو /executive');
  console.log('  معايير سيادية: /sovereign-standards.html أو /sovereign');
  console.log('  المنصة: …/government-search/SIMPLE-GOVERNMENT-PLATFORM.html');
  console.log('  بروكسي SearXNG: /api/searx/*  →  ' + SEARX_UPSTREAM.origin + '/*');
  console.log('  المحرك: cd engines/searxng && docker compose up -d');
  console.log('');
});
