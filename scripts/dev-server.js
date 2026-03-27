/**
 * خادم تطوير للصفحات الثابتة + بروكسي SearXNG على /api/searx
 * الاستخدام: npm start  →  http://localhost:3333
 * المحرك: engines/searxng/  →  docker compose up -d  (المضيف 18080 → الحاوية 8080)
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT) || 3333;
const ROOT = path.join(__dirname, '..');
/** upstream SearXNG (Docker) */
const SEARX_UPSTREAM = new URL(process.env.SEARXNG_URL || 'http://127.0.0.1:18080');

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
  const port = Number(SEARX_UPSTREAM.port) || 18080;
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
  /**
   * محلياً فقط: اجعل /admin يذهب مباشرة إلى /admin-direct
   * لتفادي: iframe + تكرار تسجيل الدخول + صفحات فارغة.
   */
  if (urlPath === '/admin') {
    const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>لوحة الإدارة</title>
<script>location.replace('/admin-direct');</script></head><body><a href="/admin-direct">متابعة إلى لوحة الإدارة</a></body></html>`;
    send(res, 200, html, { 'Content-Type': 'text/html; charset=utf-8' });
    return;
  }
  /** دخول مباشر محلي (تطوير فقط): يضبط جلسة المالك ثم يفتح /admin */
  if (urlPath === '/admin-direct') {
    const ownerEmail = String(process.env.IIF_OWNER_EMAIL || 'talalkenani@gmail.com').trim().toLowerCase();
    const adminUrl =
      'http://127.0.0.1:' +
      PORT +
      '/financial-consulting/iif-fund-demo/index.html?iif_admin_portal=1&open_dashboard=1';
    const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>دخول الإدارة (محلي)</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="background:#05070c;color:#e9ddbf;font-family:system-ui,-apple-system,Segoe UI,Arial;padding:18px;">
<h2 style="margin:0 0 10px;font-size:18px;">دخول الإدارة (محلي)</h2>
<p style="margin:0 0 12px;opacity:.9">سيتم فتح لوحة الإدارة تلقائياً. إذا بقيت هذه الصفحة، اضغط الزر:</p>
<p style="margin:0 0 14px;">
  <a href="${adminUrl}" style="display:inline-block;padding:10px 12px;border-radius:12px;border:1px solid rgba(201,162,39,.55);background:rgba(12,14,18,.82);color:#f5e7b6;text-decoration:none;">فتح لوحة الإدارة</a>
</p>
<script>
(function(){
  try {
    localStorage.setItem('iif-user-email', ${JSON.stringify(ownerEmail)});
    localStorage.setItem('iif-logged-in', '1');
    localStorage.setItem('iif-is-admin', '1');
    try { sessionStorage.setItem('iif_admin_portal_mode', '1'); } catch (e) {}
  } catch (e) {}
  try { location.replace(${JSON.stringify(adminUrl)}); } catch (e3) { location.href = ${JSON.stringify(adminUrl)}; }
})();
</script>
<noscript>فعّل JavaScript ثم افتح: <a href="${adminUrl}">${adminUrl}</a></noscript>
</body></html>`;
    send(res, 200, html, { 'Content-Type': 'text/html; charset=utf-8' });
    return;
  }
  /** اختصار محلي: يحوّل إلى index مع #dashboard (يفتح الدخول أو اللوحة حسب الجلسة) */
  if (urlPath === '/dashboard' || urlPath === '/cp') {
    /* بدون # في العنوان — يُفتح من الاستعلام + sessionStorage (تفادي سقوط الهاش من PowerShell/اختصارات) */
    const dashPath =
      '/financial-consulting/iif-fund-demo/index.html?iif_admin_portal=1&open_dashboard=1';
    const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>لوحة التحكم</title><script>location.replace(${JSON.stringify(
      dashPath
    )});</script></head><body><p><a href="${dashPath}">متابعة إلى لوحة التحكم</a></p></body></html>`;
    send(res, 200, html, { 'Content-Type': 'text/html; charset=utf-8' });
    return;
  }
  /** مطابقة netlify.toml — نفس المسارات على الإنتاج والتطوير */
  if (urlPath === '/fund') {
    res.writeHead(302, {
      Location: '/financial-consulting/iif-fund-demo/index.html',
      'Cache-Control': 'no-store',
    });
    res.end();
    return;
  }
  if (urlPath === '/fund-admin') {
    res.writeHead(302, {
      Location:
        '/financial-consulting/iif-fund-demo/index.html?iif_admin_portal=1&open_dashboard=1',
      'Cache-Control': 'no-store',
    });
    res.end();
    return;
  }
  if (urlPath === '/gov') {
    res.writeHead(302, {
      Location: '/financial-consulting/government-search/SIMPLE-GOVERNMENT-PLATFORM.html',
      'Cache-Control': 'no-store',
    });
    res.end();
    return;
  }
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
  let filePath = safeJoin(ROOT, urlPath);
  if (!filePath) {
    send(res, 403, 'Forbidden', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }
  function pipeFile(fp) {
    const ext = path.extname(fp).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    fs.createReadStream(fp).pipe(res);
  }
  fs.stat(filePath, (err, st) => {
    if (err) {
      send(res, 404, 'Not found', { 'Content-Type': 'text/plain; charset=utf-8' });
      return;
    }
    if (st.isDirectory()) {
      const indexInDir = path.join(filePath, 'index.html');
      fs.stat(indexInDir, (e2, st2) => {
        if (!e2 && st2.isFile()) pipeFile(indexInDir);
        else send(res, 404, 'Not found', { 'Content-Type': 'text/plain; charset=utf-8' });
      });
      return;
    }
    if (!st.isFile()) {
      send(res, 404, 'Not found', { 'Content-Type': 'text/plain; charset=utf-8' });
      return;
    }
    pipeFile(filePath);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = new URL(req.url, 'http://localhost').pathname;
  const method = String(req.method || 'GET').toUpperCase();
  /**
   * توحيد المضيف محلياً لتفادي "عدم حفظ الدخول" بسبب اختلاف الـ origin:
   * localhost:3333 ≠ 127.0.0.1:3333 (localStorage منفصل لكل واحد).
   */
  try {
    const host = String(req.headers.host || '');
    if (host.toLowerCase().startsWith('localhost:')) {
      const port = host.split(':')[1] || String(PORT);
      res.writeHead(302, { Location: `http://127.0.0.1:${port}${req.url || '/'}` });
      res.end();
      return;
    }
  } catch (e) { }
  /** CORS / إضافات قد ترسل OPTIONS — بدون ردّ مناسب قد يظهر «Method Not Allowed» */
  if (method === 'OPTIONS') {
    send(res, 204, '', {
      Allow: 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || '*',
    });
    return;
  }
  if (urlPath.startsWith('/api/searx')) {
    if (method !== 'GET' && method !== 'HEAD') {
      send(res, 405, 'Method Not Allowed', { 'Content-Type': 'text/plain; charset=utf-8' });
      return;
    }
    proxySearx(req, res);
    return;
  }
  /**
   * للملفات الثابتة في التطوير: تساهل مع طرق HTTP غير المتوقعة (إضافات/برامج)
   * حتى لا تتوقف الواجهة برسالة 405. نتعامل معها كـ GET عملياً.
   */
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
  console.log('  لوحة (اختصار): /dashboard أو /cp  →  واجهة الصندوق + open_dashboard=1');
  console.log('  مثل Netlify: /fund  /gov  /fund-admin  →  إعادة توجيه 302');
  console.log('  أدمن مباشر (محلي): /admin-direct  →  دخول بدون كلمة مرور (تطوير فقط)');
  console.log('');
});
