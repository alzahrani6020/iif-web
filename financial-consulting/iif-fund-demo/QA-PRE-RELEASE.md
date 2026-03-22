# قائمة الجاهزية — واجهة الصندوق (قبل النشر / مراجعة حرجة)

> **الغرض:** تقليل أخطاء المسارات الحرجة (لوحة التحكم، وضع الإدارة، النشر).  
> **المبدأ:** لا تعتمد على «الملف الواحد» كعذر — نتحقق **سلوكياً** و**آلياً** حيث ينطبق.

---

## 1) فحص آلي (يجب أن ينجح قبل دمج أي تغيير على `index.html` الحرج)

من **جذر المستودع**، مع تشغيل الخادم:

```bash
npm start
```

في طرفية **أخرى**:

```bash
npm run smoke:html
```

**ما يُتحقق منه** (انظر [`../../scripts/smoke-html-check.mjs`](../../scripts/smoke-html-check.mjs)):

| المسار | المعنى |
|--------|--------|
| `.../iif-fund-demo/index.html` | وجود لوحة التحكم في المصدر، علامة النشر، base، شعار |
| `.../index.html?iif_admin_embed=1` | وجود شاشة دخول الإدارة `#iif-embed-entry-screen`، `#dashboard-overlay`، `#auth-overlay` |
| `.../admin.html` | iframe يحمّل `index.html?iif_admin_embed=1` |

**خرج `0`** = نجاح؛ **خرج `1`** = توقف ولا تنشر حتى يُصلح.

اختياري بعد الخادم:

```bash
npm run health
```

(`check-urls` + `smoke:html`)

---

## 2) فحص يدوي سريع (دقيقتان)

بعد `npm start`، افتح بالترتيب:

1. [ ] **الصفحة العامة:**  
   `http://127.0.0.1:3333/financial-consulting/iif-fund-demo/index.html`  
   — يجب أن تظهر واجهة الزائر (هيرو)، وليس خطأ 404.

2. [ ] **وضع الإدارة:**  
   `http://127.0.0.1:3333/financial-consulting/iif-fund-demo/index.html?iif_admin_embed=1`  
   — **لا** يجب أن يظهر هيرو «رؤية ملكية» كأول شاشة دون تفسير؛ يجب أن ترى **شاشة «لوحة التحكم — جاري التحميل»** ثم **نافذة تسجيل الدخول** أو **اللوحة** حسب الجلسة.

3. [ ] **admin.html:**  
   `http://127.0.0.1:3333/financial-consulting/iif-fund-demo/admin.html`  
   — إطار كامل؛ إن ظهرت شاشة بيضاء راجع `vercel.json` / `X-Frame-Options` على الإنتاج فقط.

4. [ ] **علامة النشر (إنتاج):** على النطاق المنشور، افتح الصفحة → **Ctrl+U** → ابحث عن  
   `تحقق-النشر-iif-dashboard-fullpage`  
   — إن لم يوجد: كاش أو **Root Directory** خاطئ في Vercel.

---

## 3) بعد النشر (Vercel أو غيره)

- [ ] النطاق **العام** (مثل `iif-fund.vercel.app`) يعيد **200** لـ `/index.html` — وليس نشراً محمياً بـ 401 لروابط المعاينة فقط.
- [ ] **Settings → General → Root Directory** يشير إلى المجلد الذي يحتوي `index.html` المنشور فعلياً.
- [ ] تحديث قوي للمتصفح **Ctrl+F5** بعد النشر.

---

## 4) ماذا لو فشل شيء؟

| العرض | تحقق |
|--------|------|
| شاشة سوداء طويلة | JS معطّل؟ وحدة تحكم F12 |
| هيرو عام مع `?iif_admin_embed=1` | الكود الحديث يضيف `#iif-embed-entry-screen` — أعد النشر والكاش |
| 401 على نطاق `*-team.vercel.app` | Deployment Protection — استخدم نطاق الإنتاج أو عطّل الحماية للمعاينة |
| `ERR_CONNECTION_REFUSED` على 127.0.0.1:3333 | لم يُشغَّل `npm start` |

---

## 5) مراجع

- [PATHS-NOT-GOOGLE.md](../../PATHS-NOT-GOOGLE.md) — لا تُدخل مسارات المشروع في بحث Google
- [README.md](./README.md) — روابط Vercel و`admin.html`
- [قبل-النشر.md](../../قبل-النشر.md) — قائمة المستودع العامة
- [AGENTS.md](../../AGENTS.md) — أوامر `npm run health` و`smoke:html`
