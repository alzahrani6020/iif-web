# روابط الإنتاج المعتمدة

مرجع واحد لتفادي خلط النطاقات القديمة مع الحالية.

## واجهة الصندوق + اللوحة (`#dashboard`)

| المنصة | الرابط المعتمد |
|--------|----------------|
| **Vercel** (فريق `dr-talal`، مشروع `iif-fund`) | `https://iif-fund-dr-talal.vercel.app/index.html` — اللوحة: `…/index.html#dashboard` |
| **Netlify** (موقع مربوط بالريبو، `fluffy-meerkat-eff966`) | `https://fluffy-meerkat-eff966.netlify.app/fund` (يحوّل إلى واجهة الصندوق) — أو مع هاش: `…/index.html#dashboard` حسب المسار المنشور |

## ملاحظات

- **`iif-fund.vercel.app`:** قد يكون مربوطاً بمشروع Vercel آخر أو نسخة قديمة. لتوحيد الاسم القصير انقل الـ alias من لوحة Vercel (انظر [VERCEL-DEPLOY.md](./VERCEL-DEPLOY.md)).
- **لا تلصق التوكنات** في الكود؛ الأسرار في GitHub فقط — راجع [SECURITY.md](./SECURITY.md).

## صيانة سريعة قبل الدمج

1. من جذر المشروع: `npm run verify` (أو `npm run verify:full`).
2. تأكد أن **CI** على `main` أخضر بعد `git push`.
3. في PowerShell على ويندوز: فضّل الفصل بـ **`;`** بين الأوامر بدل **`&&`** إن ظهرت أخطاء.
4. إن اعتمدت على SearXNG محلياً (Docker): `npm run verify:stack`.
5. عند إضافة حزم: `npm audit` من حين لآخر.

تفاصيل إضافية: [AGENTS.md](./AGENTS.md) (قسم «صيانة دورية»). قائمة تحقق أوسع (جهاز + منصات + مساعد): [قائمة-تحقق-قبل-الدمج.md](./قائمة-تحقق-قبل-الدمج.md).
