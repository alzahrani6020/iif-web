# إرشادات للمساعدين (بشر / ذكاء اصطناعي)

## الهدف

مشروع **واجهات ثابتة** (HTML/CSS/JS) + خادم تطوير Node — **بدون إطار عمل** في الجذر. المستودع على GitHub: **`alzahrani6020/iif-web`**.

**مسارات مثل** `financial-consulting/.../README.md` **ليست روابط ويب** — لا تُبحث في Google؛ راجع [PATHS-NOT-GOOGLE.md](./PATHS-NOT-GOOGLE.md).

**الرؤية (للمستخدمين والثقافات والأنظمة):** مذكورة في [README.md](./README.md) — عند إضافة ميزات، راعِ الخصوصية والامتثال حيث ينطبق.

## أين الملفات المهمة

| المسار | المحتوى |
|--------|---------|
| `financial-consulting/government-search/` | المنصة الحكومية، `government-data.json` → يُولَّد `government-data.js` |
| `financial-consulting/iif-fund-demo/` | واجهة الصندوق الأصلية (ملفات كثيرة) — **قبل نشر تغييرات حرجة:** [QA-PRE-RELEASE.md](./financial-consulting/iif-fund-demo/QA-PRE-RELEASE.md) |
| `financial-consulting/fund-site/` | واجهة أبسط |
| `executive-brief.html`، `sovereign-standards.html` (جذر المستودع) | موجز للمستويات الرفيعة + معايير سيادية؛ اختصارات `/executive`، `/sovereign`، `/charter` |
| `scripts/dev-server.js` | خادم التطوير (`3333`) + بروكسي `/api/searx` → SearXNG على `18080` |
| `engines/searxng/` | **Tor + SearXNG** (Docker) — `npm start` → `/api/searx`؛ محركات `.onion` عبر حاوية `tor` |

## الأوامر (من جذر المشروع)

**ويندوز — تشغيل كامل:** `START-IIF-FULL.bat` (Docker + خادم 3333 + فتح المنصة الحكومية).

```bash
npm start          # خادم التطوير
npm run build      # توليد government-data.js من JSON
npm run validate   # نفس البناء
npm run verify       # build + فحص صياغة dev-server و check-urls و smoke-with-server (بدون تشغيل خادم)
npm run verify:full  # نفس verify ثم تشغيل خادم مؤقت + smoke:html (تحقق كامل بأمر واحد)
npm run smoke:with-server  # خادم مؤقت + smoke فقط (إن كان المنفذ 3333 مشغولاً: `set PORT=3334` ثم نفس الأمر)
npm run check-urls # بعد تشغيل الخادم — يتحقق من `/` و`iif-fund-demo/index.html` والمنصة وغيرها (انظر scripts/check-urls.js)
npm run health        # بعد `npm start`: check-urls + smoke:html (يشمل index + صفحات حرجة أخرى)
npm run verify:searx  # هل SearXNG يستجيب على 18080؟ (بعد docker compose)
npm run verify:stack  # verify + verify:searx
npm run qa:iif-fund   # نفس smoke:html — اسم صريح لواجهة الصندوق
```

- **Node:** `>=20` (`.nvmrc`).

## النشر

- **Netlify:** الإعداد في `netlify.toml`؛ الطبقة المجانية: راجع `NETLIFY-FREE-TIER.md` و`[skip netlify]` في رسالة الـ commit عند تعديل التوثيق فقط.
- **Vercel** (مثلاً `iif-fund.vercel.app`): بعد `git push` تحقق من المصدر أن الملف يحتوي `iif-dashboard-fullpage-critical-head` — راجع قسم **هـ** في [قبل-النشر.md](./قبل-النشر.md).
- لا تضف تعقيداً على Netlify بدون حاجة (لا دوال جذر إن لم تُستخدم).

## تفضيلات العمل

1. **نفّذ الأوامر** عند الحاجة (تثبيت، بناء، فحص) — لا تكتفِ بنصائح نظرية إن كان البيئة حقيقية.
2. **العربية** مفضّلة للمستخدم في الشرح؛ أسماء الملفات والكود قد تبقى كما هي في المشروع.
3. **لا تكرّر** نسخ المشروع بين أقراص دون داعٍ؛ قد يكون المسار `C:\Users\vip\iif-fund-demo` أو `D:\iif-fund-demo` — اعتمد على **المجلد المفتوح في Cursor**.

## أخطاء شائعة

- تعديل `government-data.js` يدوياً دائماً — المصدر هو **`government-data.json`** ثم `npm run build`.
- خلط إعدادات Netlify بين الجذر و`financial-consulting/iif-fund-demo/netlify.toml` — النشر من الجذر يقرأ **`netlify.toml`** في الجذر.

## قواعد Cursor

راجع `.cursor/rules/` للقواعد المختصرة المفعّلة تلقائياً.

### ملف `.cursorignore` (اختياري)

انسخ **`cursorignore.example`** إلى **`.cursorignore`** في الجذر (أو انسخ المحتوى يدوياً).

### عندما يقول المستخدم «أكمل اللازم»

راجع **[اكمل-اللازم-قائمة.md](./اكمل-اللازم-قائمة.md)** — البناء، Git نظيف، دفع، عدم إخفاء الأخطاء.

### عندما يقترب النشر أو يقول «المحتوى مكتمل»

راجع **[قبل-النشر.md](./قبل-النشر.md)** — محتوى، `npm run verify`، توقّعات Netlify/SearXNG.
