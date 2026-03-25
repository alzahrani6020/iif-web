# نشر Vercel والتحقق من آخر نسخة

## الروابط المعتمدة حالياً (2026)

| المنصة | رابط الإنتاج الفعلي |
|--------|---------------------|
| **Vercel (فريق `dr-talal`، مشروع `iif-fund`)** | `https://iif-fund-dr-talal.vercel.app/index.html` |
| **Netlify (موقع مربوط بالريبو)** | `https://fluffy-meerkat-eff966.netlify.app` |

**لوحة التحكم (المعتمد):** أضف `#dashboard` إلى `index.html` على أي من النطاقين أعلاه.

### عن `iif-fund.vercel.app`

قد يكون الاسم `iif-fund.vercel.app` **مخصصاً لمشروع Vercel آخر**؛ إن حاولت ربط alias بنفس الاسم يظهر: *«already in use»*.  
لتوحيد الاسم: من حساب Vercel الذي يملك **`iif-fund.vercel.app`** احذف الـ alias من المشروع القديم أو انقل النطاق إلى مشروع `dr-talal/iif-fund`، ثم عيّن الـ alias من لوحة Vercel.

## التحقق السريع

1. بعد الـ deploy، افتح الرابط أعلاه ثم **Ctrl+U** (عرض المصدر).
2. ابحث عن **`v8-fix-main-close`** أو **`dashboard-fullpage-v8-fix-main-close`** أو التعليق **`تحقق-النشر-iif-dashboard-fullpage`**.

## إعداد المشروع في Vercel

1. **Settings → Git:** المستودع `alzahrani6020/iif-web`، الفرع **`main`**, تفعيل **Automatic deployments**.
2. **Root Directory:** `financial-consulting/iif-fund-demo` (حيث `index.html` الكبير و`vercel.json`).
3. **Deployments:** إن لم يتحدث الإنتاج بعد `git push`، استخدم **Redeploy**.

## أوامر CLI (من مجلد الواجهة)

```bash
cd financial-consulting/iif-fund-demo
npx vercel deploy --prod --yes
```

## نشر اختياري من GitHub Actions

الملف: `.github/workflows/vercel-deploy.yml`  
يحتاج أسرار: `VERCEL_TOKEN`، `VERCEL_ORG_ID`، `VERCEL_PROJECT_ID` (يمكن إنشاء التوكن من [Vercel → Account → Tokens](https://vercel.com/account/tokens)).
