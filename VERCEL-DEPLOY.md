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

#### خطوات من لوحة Vercel (بدون تغيير كود)

1. سجّل الدخول إلى [Vercel Dashboard](https://vercel.com/dashboard) بالحساب الذي يملك المشروع الهدف (`dr-talal` → `iif-fund`) **أو** الحساب الذي يظهر عنده الاسم المشغول.
2. **اعثر على المشروع الحالي لـ `iif-fund.vercel.app`:** من القائمة **All Projects** ابحث عن مشروع يعرض هذا النطاق في المعاينة، أو افتح **Project → Settings → Domains** وابحث عن `iif-fund.vercel.app`.
3. **حرّر الاسم من المشروع القديم:** في المشروع الذي يشغل الاسم حالياً: **Settings → Domains** → أزل `iif-fund.vercel.app` (أو احذف/أعد تسمية المشروع التجريبي إن لم يعد مستخدماً).
4. **أضف الاسم للمشروع المعتمد:** افتح مشروع **`iif-fund`** ضمن الفريق **`dr-talal`** → **Settings → Domains** → **Add** → أدخل `iif-fund.vercel.app` واتبع التحقق إن طُلب.
5. بعد النجاح، حدّث [CANONICAL-URLS.md](./CANONICAL-URLS.md) إن أصبحت الروابط الرسمية تستخدم الاسم القصير فقط.

إن كان الاسم مربوطاً بحساب لا تملكه، يلزم نقل المشروع بين الفرق/الحسابات من إعدادات الفريق أو التواصل مع مالك ذلك الحساب — لا يُحل ذلك من المستودع وحده.

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

### ازدواجية نشر محتملة

إن كان المشروع **مربوطاً بـ Git** في Vercel مع **Automatic deployments**، وفي نفس الوقت مفعّل workflow **Deploy Vercel (optional)** مع أسرار `VERCEL_*`، فقد يُنفَّذ **نشران** إلى نفس المشروع عند كل `push` إلى `main`. لتقليل الازدواجية: عطّل أحدهما — إما تعطيل الـ workflow من **Actions** (أو إزالة/تعليق الأسرار)، أو الاعتماد على نشر Vercel من Git فقط وتعطيل تشغيل الـ workflow على `push` إن رغبت (يتطلب تعديل الملف أو الإعدادات).
