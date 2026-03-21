# إعدادات Netlify (لصقها يدوياً إن طلبت الواجهة الحقول)

| الحقل | القيمة |
|--------|--------|
| **Base directory** | *(فارغ — جذر المستودع)* |
| **Build command** | `npm ci --no-audit --fund=false && npm run build` |
| **Publish directory** | `.` |

**بيئة البناء (اختياري — مكرّرة في `netlify.toml`):**

- `NODE_VERSION` = `20`
- `NODE_ENV` = `production`
- `CI` = `true`

بعد ربط GitHub: **Deploy** أو انتظار البناء التلقائي عند الـ push.

للنشر اليدوي من GitHub Actions: أضف الأسرار `NETLIFY_AUTH_TOKEN` و `NETLIFY_SITE_ID` ثم شغّل workflow **Deploy Netlify**.
