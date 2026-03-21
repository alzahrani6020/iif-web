# إرشادات للمساعدين (بشر / ذكاء اصطناعي)

## الهدف

مشروع **واجهات ثابتة** (HTML/CSS/JS) + خادم تطوير Node — **بدون إطار عمل** في الجذر. المستودع على GitHub: **`alzahrani6020/iif-web`**.

## أين الملفات المهمة

| المسار | المحتوى |
|--------|---------|
| `financial-consulting/government-search/` | المنصة الحكومية، `government-data.json` → يُولَّد `government-data.js` |
| `financial-consulting/iif-fund-demo/` | واجهة الصندوق الأصلية (ملفات كثيرة) |
| `financial-consulting/fund-site/` | واجهة أبسط |
| `scripts/dev-server.js` | خادم التطوير (افتراضي المنفذ `3333`) |
| `engines/searxng/` | **مشروع منفصل** (Docker) — **غير مدمج** في صفحات المنصة حالياً |

## الأوامر (من جذر المشروع)

```bash
npm start          # خادم التطوير
npm run build      # توليد government-data.js من JSON
npm run validate   # نفس البناء
npm run check-urls # بعد تشغيل الخادم — التحقق من الروابط
```

- **Node:** `>=20` (`.nvmrc`).

## النشر

- **Netlify:** الإعداد في `netlify.toml`؛ الطبقة المجانية: راجع `NETLIFY-FREE-TIER.md` و`[skip netlify]` في رسالة الـ commit عند تعديل التوثيق فقط.
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
