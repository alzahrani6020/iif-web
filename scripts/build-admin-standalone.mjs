/**
 * يولّد financial-consulting/iif-fund-demo/admin-standalone.html من index.html
 * بحذف <main id="main-content">…</main> والتذييل — ملف لوحة بلا صفحة رئيسية.
 * شغّل بعد تغييرات كبيرة على index.html: node scripts/build-admin-standalone.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'financial-consulting', 'iif-fund-demo');
const indexPath = path.join(root, 'index.html');
const outPath = path.join(root, 'admin-standalone.html');

const lines = fs.readFileSync(indexPath, 'utf8').split(/\r?\n/);
// 1-based line numbers من نسخة index الحالية: احذف من سطر main-content حتى نهاية footer
const START = 10272; // <main id="main-content">
const END = 14367; // </footer>
const merged = [...lines.slice(0, START - 1), ...lines.slice(END)];
let text = merged.join('\n');

const inject = `  <script>
    /* admin-standalone: فرض معاملات فتح اللوحة على الجهاز المحلي فقط */
    (function () {
      try {
        var h = location.hostname || '';
        if (location.protocol === 'file:') return;
        if (h !== '127.0.0.1' && h !== 'localhost' && h !== '[::1]') return;
        var u = new URL(location.href);
        u.searchParams.set('local_dashboard', '1');
        u.searchParams.set('iif_admin_portal', '1');
        u.searchParams.set('open_dashboard', '1');
        history.replaceState(null, '', u.pathname + u.search + (u.hash || ''));
      } catch (e) {}
    })();
  </script>
`;
text = text.replace('<head>', '<head>\n' + inject, 1);
text = text.replace(
  '<title>International Investment Fund · FII · Paris</title>',
  '<title>لوحة التحكم — IIF (ملف مستقل)</title>',
  1
);
text = text.replace(
  `            path === '/dashboard')\n        ) {`,
  `            path === '/dashboard' ||\n            path === '/financial-consulting/iif-fund-demo/admin-standalone.html')\n        ) {`,
  1
);

fs.writeFileSync(outPath, text, 'utf8');
console.log('Wrote', outPath);
