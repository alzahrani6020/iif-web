# المساهمة والتشغيل — iif-fund-demo

## المتطلبات

- Node.js **20+**

## التثبيت

```bash
npm ci
```

## التطوير المحلي

1. تشغيل الخادم:

   ```bash
   npm start
   ```

   يعمل عادة على `http://127.0.0.1:3333`.

2. اختصارات مفيدة:

   - واجهة الصندوق الرئيسية: `/` أو  
     `/financial-consulting/iif-fund-demo/index.html`
   - لوحة التحكم (محلي): `/cp` أو `/dashboard` أو ملف  
     `OPEN-ADMIN-DASHBOARD.bat` في جذر المشروع.

## فحوصات الجودة (قبل الدمج أو النشر)

| الأمر | الوظيفة |
|--------|---------|
| `npm run verify` | بناء `government-data` + التحقق من صياغة السكربتات |
| `npm run maintenance:audit` | صياغة JS + JSON + روابط داخلية (بدون خادم) |
| `npm run health` | يتطلب `npm start` في نافذة أخرى: تدقيق + `check-urls` + `smoke` |
| `npm run maintenance:full` | `verify` + تدقيق كامل + `smoke-with-server` + `check-urls` |

### روابط خارجية (اختياري، يعتمد على الشبكة)

```bash
node scripts/maintenance-full-audit.mjs --external
```

لجعل فشل أي رابط خارجي يوقف الخروج بخطأ:

```bash
# Linux / macOS
EXTERNAL_URL_STRICT=1 node scripts/maintenance-full-audit.mjs --external
```

```powershell
# Windows PowerShell
$env:EXTERNAL_URL_STRICT='1'; node scripts/maintenance-full-audit.mjs --external
```

## مسار الإنتاج

الواجهة المعتمدة: **`financial-consulting/iif-fund-demo/index.html`** مع الأصول تحت  
`financial-consulting/iif-fund-demo/assets/`.

مجلد **`archive/`** يحتوي نسخ HTML قديمة للمرجع فقط — لا يُستخدم في النشر.

## CI

عند الدفع إلى `main` أو `master` أو عند فتح Pull Request، يعمل GitHub Actions  
(`.github/workflows/ci.yml`) على `npm ci` ثم `npm run verify` و`maintenance-full-audit.mjs`.
