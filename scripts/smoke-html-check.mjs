/**
 * فحص سريع: يجلب HTML رئيسية ويتأكد من وجود base وشعار وعدم نقص government-data
 * + مسارات حرجة لواجهة الصندوق: ?iif_admin_embed=1 و admin.html
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
        res.on('end', () => resolve({ status: res.statusCode, body }));
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
      path: '/financial-consulting/iif-fund-demo/index.html',
      mustInclude: [
        '<base id="iif-document-base"',
        'assets/emblem.jpg',
        'id="dashboard-overlay"',
        'iif-dashboard-fullpage-critical-head',
        'تحقق-النشر-iif-dashboard-fullpage',
      ],
      label: 'واجهة الصندوق (index)',
    },
    {
      path: '/financial-consulting/iif-fund-demo/index.html?iif_admin_embed=1',
      mustInclude: [
        'iif-embed-entry-screen',
        'iifInjectEmbedEntryScreen',
        'id="dashboard-overlay"',
        'id="auth-overlay"',
        'تحقق-النشر-iif-dashboard-fullpage',
      ],
      label: 'وضع الإدارة ?iif_admin_embed=1 (لوحة + دخول)',
    },
    {
      path: '/financial-consulting/iif-fund-demo/admin.html',
      mustInclude: ['iif-admin-frame', 'index.html?iif_admin_embed=1', '<iframe'],
      label: 'admin.html — إطار لوحة الإدارة',
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
  process.exit(allOk ? 0 : 1);
}

main();
