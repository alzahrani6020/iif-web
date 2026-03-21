/**
 * تحقق أن خادم التطوير يقدّم الصفحات (شغّل بعد: npm start)
 * الاستخدام: npm run check-urls
 */
'use strict';

const http = require('http');

const HOST = process.env.CHECK_HOST || '127.0.0.1';
const PORT = Number(process.env.PORT) || 3333;

const PATHS = [
  '/',
  '/financial-consulting/fund-site/index.html',
  '/financial-consulting/government-search/SIMPLE-GOVERNMENT-PLATFORM.html',
  '/financial-consulting/government-search/iif-config.js',
];

/** مسارات اختيارية: فشلها لا يوقف السكربت (مثلاً SearXNG غير مشغّل) */
const SOFT_PATHS = [{ path: '/api/searx/', note: 'بروكسي → SearXNG (شغّل Docker من engines/searxng)' }];

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: HOST, port: PORT, path, method: 'GET', timeout: 10000 },
      (res) => {
        res.resume();
        resolve({ path, status: res.statusCode });
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

async function main() {
  console.log('التحقق من http://' + HOST + ':' + PORT + ' (شغّل npm start أولاً)\n');
  let failed = false;
  for (const p of PATHS) {
    try {
      const { status } = await get(p);
      if (status === 200) {
        console.log('  OK', status, p);
      } else {
        console.log('  BAD', status, p);
        failed = true;
      }
    } catch (e) {
      console.log('  FAIL', p, '—', e.message);
      failed = true;
    }
  }

  console.log('');
  console.log('  اختياري — بروكسي المحرك:');
  for (const item of SOFT_PATHS) {
    try {
      const { status } = await get(item.path);
      if (status === 200) {
        console.log('  OK', status, item.path, '← SearXNG يستجيب عبر البروكسي');
      } else if (status === 502) {
        console.log('  …', status, item.path, '—', item.note);
      } else {
        console.log('  ?', status, item.path);
      }
    } catch (e) {
      console.log('  …', item.path, '—', e.message, '(طبيعي إن لم يُشغَّل الخادم أو Docker)');
    }
  }
  console.log('');
  if (failed) {
    console.log('بعض الطلبات فشلت. تأكد: npm start يعمل من مجلد المشروع.');
    process.exit(1);
  }
  console.log('كل الروابط جاهزة — يمكنك فتح المتصفح.');
  process.exit(0);
}

main();
