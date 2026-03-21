#!/usr/bin/env node
/**
 * تثبيت خطاف Git لتشغيل التحقق أوتوماتيكياً عند كل commit.
 * شغّل مرة واحدة: node scripts/install-validate-hook.js
 */
var fs = require('fs');
var path = require('path');

var root = path.join(__dirname, '..');
var hookDir = path.join(root, '.git', 'hooks');
var hookPath = path.join(hookDir, 'pre-commit');
var sourcePath = path.join(root, 'githooks', 'pre-commit');

var hookContent = '#!/bin/sh\n# Auto-validate on commit (IIF)\nroot="$(git rev-parse --show-toplevel 2>/dev/null)"\n[ -n "$root" ] && [ -f "$root/scripts/validate-site.js" ] && node "$root/scripts/validate-site.js" || true\nexit 0\n';

try {
  if (!fs.existsSync(path.join(root, '.git'))) {
    console.log('لا يوجد مجلد .git — المشروع ليس مستودع git. التحقق التلقائي عند commit غير متاح.');
    process.exit(0);
    return;
  }
  if (!fs.existsSync(hookDir)) fs.mkdirSync(hookDir, { recursive: true });
  fs.writeFileSync(hookPath, hookContent, 'utf8');
  try { fs.chmodSync(hookPath, 0o755); } catch (e) {}
  console.log('تم تثبيت الخطاف: عند كل git commit سيُشغّل تحقق الموقع أوتوماتيكياً.');
} catch (e) {
  console.error('تعذر التثبيت:', e.message);
  process.exit(1);
}
