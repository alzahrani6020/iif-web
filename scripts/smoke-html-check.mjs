/**
 * فحص سريع: يجلب HTML رئيسية ويتأكد من وجود base وشعار وعدم نقص government-data
 * + لوحة التحكم: admin-standalone، dashboard-entry، اختصارات الخادم، بوابة /dashboard
 * الاستخدام: node scripts/smoke-html-check.mjs (بعد npm start على 3333)
 */
import http from 'http';

const HOST = process.env.CHECK_HOST || '127.0.0.1';
const PORT = Number(process.env.PORT) || 3333;

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: HOST, port: PORT, path, method: 'GET', timeout: 15000 },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (c) => (body += c));
        res.on('end', () =>
          resolve({ status: res.statusCode, body, location: res.headers.location })
        );
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
  const checks = [
    {
      path: '/financial-consulting/iif-fund-demo/index.html?iif_public_site=1',
      mustInclude: [
        '<base id="iif-document-base"',
        'assets/emblem.jpg',
        'id="dashboard-overlay"',
        'iif-dashboard-fullpage-critical-head',
        'dashboard-fullpage-v8-fix-main-close',
        'data-iif-build="v8-fix-main-close"',
        'تحقق-النشر-iif-dashboard-fullpage',
      ],
      label: 'واجهة الصندوق (index)',
    },
    {
      path: '/financial-consulting/government-search/SIMPLE-GOVERNMENT-PLATFORM.html',
      mustInclude: [
        'government-data.js',
        'id="searchInput"',
        'id="gov-countries"',
        'id="gov-geographic"',
      ],
      label: 'المنصة الحكومية',
    },
    {
      path: '/financial-consulting/fund-site/index.html',
      mustInclude: [
        '../government-search/SIMPLE-GOVERNMENT-PLATFORM.html',
        '../iif-fund-demo/index.html',
        'executive-brief.html',
        'sovereign-standards.html',
        '<iframe',
      ],
      label: 'بوابة fund-site (iframe)',
    },
    {
      path: '/executive-brief.html',
      mustInclude: ['موجز للمستويات الرفيعة', 'Executive Brief', 'main id="main"'],
      label: 'موجز للمستويات الرفيعة',
    },
    {
      path: '/sovereign-standards.html',
      mustInclude: ['معايير المستوى السيادي', 'Sovereign-tier standards', 'main id="main"'],
      label: 'معايير المستوى السيادي',
    },
    {
      path: '/financial-consulting/iif-fund-demo/admin-standalone.html',
      mustInclude: [
        'id="dashboard-overlay"',
        'dashboard-fullpage-v8-fix-main-close',
        'iif-dashboard-fullpage-critical-head',
        'id="iif-document-base"',
      ],
      label: 'لوحة مستقلة (admin-standalone)',
    },
    {
      path: '/financial-consulting/iif-fund-demo/dashboard-entry.html',
      mustInclude: ['admin-standalone.html', 'iframe id="dash"', 'open_dashboard=1', 'iif_admin_portal=1'],
      label: 'دخول اللوحة فقط (dashboard-entry)',
    },
  ];

  const redirectChecks = [
    {
      path: '/admin-standalone',
      expectStatus: 302,
      locationIncludes: 'admin-standalone.html',
      label: 'اختصار /admin-standalone',
    },
    {
      path: '/dashboard-entry',
      expectStatus: 302,
      locationIncludes: 'dashboard-entry.html',
      label: 'اختصار /dashboard-entry',
    },
    {
      path: '/fund-admin',
      expectStatus: 302,
      locationIncludes: 'open_dashboard=1',
      label: 'اختصار /fund-admin',
    },
    {
      path: '/financial-consulting/iif-fund-demo/index.html',
      expectStatus: 302,
      locationIncludes: 'dashboard-entry.html',
      label: 'index الصندوق بدون استعلام → دخول اللوحة',
    },
    {
      path: '/fund',
      expectStatus: 302,
      locationIncludes: 'dashboard-entry.html',
      label: 'اختصار /fund → دخول اللوحة',
    },
  ];

  const dashboardGate = [
    {
      path: '/dashboard',
      expectStatus: 200,
      mustInclude: ['open_dashboard=1', 'iif_admin_portal=1', 'location.replace'],
      label: 'بوابة /dashboard (استبدال إلى واجهة الصندوق + فتح اللوحة)',
    },
  ];

  let allOk = true;
  for (const c of checks) {
    let checkOk = true;
    try {
      const { status, body } = await get(c.path);
      if (status !== 200) {
        console.log('FAIL', c.label, c.path, 'HTTP', status);
        allOk = false;
        continue;
      }
      for (const needle of c.mustInclude) {
        if (!body.includes(needle)) {
          console.log('FAIL', c.label, 'ناقص:', needle);
          checkOk = false;
        }
      }
      if (checkOk) {
        console.log('OK ', c.label, c.path);
      } else {
        allOk = false;
      }
    } catch (e) {
      console.log('FAIL', c.path, e.message);
      allOk = false;
    }
  }

  for (const c of redirectChecks) {
    try {
      const { status, location } = await get(c.path);
      if (status !== c.expectStatus) {
        console.log('FAIL', c.label, c.path, 'HTTP', status, 'متوقع', c.expectStatus);
        allOk = false;
        continue;
      }
      const loc = location || '';
      if (!loc.includes(c.locationIncludes)) {
        console.log('FAIL', c.label, 'Location ناقص:', c.locationIncludes, 'المستلم:', loc || '(فارغ)');
        allOk = false;
        continue;
      }
      console.log('OK ', c.label, c.path);
    } catch (e) {
      console.log('FAIL', c.path, e.message);
      allOk = false;
    }
  }

  for (const c of dashboardGate) {
    let checkOk = true;
    try {
      const { status, body } = await get(c.path);
      if (status !== c.expectStatus) {
        console.log('FAIL', c.label, c.path, 'HTTP', status, 'متوقع', c.expectStatus);
        allOk = false;
        continue;
      }
      for (const needle of c.mustInclude) {
        if (!body.includes(needle)) {
          console.log('FAIL', c.label, 'ناقص:', needle);
          checkOk = false;
        }
      }
      if (checkOk) {
        console.log('OK ', c.label, c.path);
      } else {
        allOk = false;
      }
    } catch (e) {
      console.log('FAIL', c.path, e.message);
      allOk = false;
    }
  }

  process.exit(allOk ? 0 : 1);
}

main();
