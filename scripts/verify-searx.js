/**
 * يتحقق من أن SearXNG يستجيب على SEARXNG_URL (افتراضيًا 127.0.0.1:18080).
 * الاستخدام: npm run verify:searx
 */
'use strict';

const http = require('http');
const { URL } = require('url');

const DEFAULT = 'http://127.0.0.1:18080';
const base = process.env.SEARXNG_URL || DEFAULT;
let u;
try {
  u = new URL(base);
} catch {
  console.error('SEARXNG_URL غير صالح:', base);
  process.exit(1);
}
const port = Number(u.port) || 18080;
const host = u.hostname;

function probe(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: host,
        port,
        path,
        method: 'GET',
        timeout: 10000,
      },
      (res) => {
        res.resume();
        resolve(res.statusCode);
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('timeout'));
    });
    req.end();
  });
}

(async () => {
  try {
    const code = await probe('/');
    console.log('OK  SearXNG على ' + base + ' — HTTP ' + code);
    process.exit(0);
  } catch (e) {
    console.error('FAIL  لا يوجد رد من SearXNG على ' + base);
    console.error('      ' + (e && e.message ? e.message : e));
    console.error('      شغّل: cd engines/searxng  ثم  docker compose up -d');
    process.exit(1);
  }
})();
