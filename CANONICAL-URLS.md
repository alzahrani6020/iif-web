# روابط الإنتاج المعتمدة

مرجع واحد لتفادي خلط النطاقات القديمة مع الحالية.

## واجهة الصندوق + اللوحة (`#dashboard`)

- **بدون جلسة:** الصفحة تفتح **تسجيل الدخول** أولاً؛ بعد نجاح الدخول تُفتح اللوحة تلقائياً إن بقي `#dashboard` (أو الهاش السري في `IIF_CONFIG`) في العنوان.
- **محلياً:** يمكن أيضاً `http://127.0.0.1:3333/dashboard` أو `/admin` (خادم التطوير فقط) — **أعد تشغيل `npm start`** بعد تحديث `dev-server.js`.
- **إن بقي الموقع الرئيسي فقط:** حدّث قوياً (**Ctrl+F5**) أو نافذة خاصة؛ على الإنتاج انتظر نشراً ناجحاً ثم أعد المحاولة.

### حلّان شائعان (خطأ في العنوان أو خادم قديم)

1. **`ERR_NAME_NOT_RESOLVED` واسم مضيف مثل `financial-consulting`**  
   وضعتَ في الشريط **مسار الملف فقط** (`financial-consulting/iif-fund-demo/index.html#dashboard`) دون عنوان الخادم. المتصفح يفسر `financial-consulting` كاسم موقع على الإنترنت — وليس مجلداً.  
   **الصحيح محلياً:** الصق الرابط **كاملاً** (مع `http://` والمنفذ):

   `http://127.0.0.1:3333/financial-consulting/iif-fund-demo/index.html#dashboard`

2. **`127.0.0.1:3333/dashboard` يعرض «Not found» ونصاً قديماً عن الرابط المعتمد**  
   عملية **`node`** التي تشغّل المنفذ 3333 ما زالت من **نسخة قديمة** من `scripts/dev-server.js` (قبل اختصار `/dashboard`).  
   **الحل:** من جذر المشروع نفّذ `git pull` إن لزم، ثم **أوقف** الخادم (Ctrl+C في نافذة `npm start`) و**شغّل من جديد** `npm start`. بعدها جرّب مرة أخرى `/dashboard` أو الرابط الكامل أعلاه.

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
