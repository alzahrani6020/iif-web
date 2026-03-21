# IIF Fund Demo — المنصة الحكومية + الصندوق

> **محرك البحث (SearXNG)** مشروع **منفصل** تحت `engines/searxng/` — **لا يُدمج** حالياً مع صفحات الصندوق أو المنصة حتى اكتمال بنائه.

**للمبتدئين — رفع المشروع إلى GitHub ثم Netlify (بدون مصطلحات معقدة):** [دليل-المبتدئ-النشر.md](./دليل-المبتدئ-النشر.md)

**المستودع على GitHub:** [alzahrani6020/iif-web](https://github.com/alzahrani6020/iif-web)

**للمساعد الذكاء الاصطناعي (Cursor / غيره):** اقرأ [AGENTS.md](./AGENTS.md) ومجلد `.cursor/rules/`.

**تعريف «أكمل اللازم» (للمساعد وللمستخدم):** [اكمل-اللازم-قائمة.md](./اكمل-اللازم-قائمة.md)  

**فهرسة Cursor أسرع:** انسخ [cursorignore.example](./cursorignore.example) إلى `.cursorignore` في الجذر.

## موقع المشروع (اتفاق)

| | |
|---|---|
| **العمل والتخزين (مفضّل)** | **`D:\iif-fund-demo`** — لا تكرّر المشروع على **C:** بلا داعٍ (توفير مساحة). |
| **نسخة على C: (مثلاً Cursor)** | **`C:\Users\...\iif-fund-demo`** مقبولة إن كان هذا المجلد المفتوح في Cursor — نعمل على **المجلد المفتوح فعلياً**. |
| **البرامج** | استخدم **Node، Docker، Cursor، Git**… كالمعتاد؛ تثبيتها على C: طبيعي. |
| **Cursor** | **Open Folder** → مجلد المشروع (D: أو C: حسب نسختك). |
| **Git** | من مجلد المشروع. تفاصيل: [WORKSPACE-D-DRIVE.md](./WORKSPACE-D-DRIVE.md). |
| **نسخة قديمة على C:** | بعد التأكد من النسخة الصحيحة — [scripts/optional-remove-c-copy.bat](./scripts/optional-remove-c-copy.bat) (قالب آمن، لا يحذف تلقائياً). |

---

## التشغيل السريع

### 1) خادم التطوير (الواجهات الثابتة)

يتطلب **Node.js 20+** (انظر `.nvmrc`):

```bash
npm start
```

**قبل فتح الروابط في المتصفح** (في طرفية أخرى):

```bash
npm run check-urls
```

ثم افتح:

- **الجذر:** [http://localhost:3333/](http://localhost:3333/)  
- **الصندوق الكامل (الأصلية):** [http://localhost:3333/financial-consulting/iif-fund-demo/index.html](http://localhost:3333/financial-consulting/iif-fund-demo/index.html)

> **للمطورين:** المنصة الحكومية مباشرة:  
> `…/financial-consulting/government-search/SIMPLE-GOVERNMENT-PLATFORM.html`  
> (بحث **محلي** في الجهات؛ نتائج الويب مُعطّلة حتى ربط المحرك لاحقاً.)

### 2) محرك البحث (اختياري — مشروع مستقل)

من **`engines/searxng/`** (ليس من جذر IIF):

```bash
cd engines/searxng
docker compose up -d
```

- الواجهة: [http://127.0.0.1:8080](http://127.0.0.1:8080)  
- التفاصيل: [engines/searxng/README.md](./engines/searxng/README.md)

### 3) ويندوز — تشغيل ومتصفح

انقر نقراً مزدوجاً **`START-IIF-DEMO.bat`** (يفتح الخادم ثم الصفحة).

---

## الملفات المهمة

| المسار | الوظيفة |
|--------|---------|
| `financial-consulting/government-search/SIMPLE-GOVERNMENT-PLATFORM.html` | المنصة الحكومية (بحث محلي؛ محرك الويب لاحقاً) |
| `financial-consulting/government-search/government-data.json` | بيانات الجهات |
| `financial-consulting/government-search/government-data.js` | يُولَّد من JSON |
| `financial-consulting/government-search/iif-config.js` | جاهز للتكامل لاحقاً مع المحرك (حالياً بدون ربط) |
| `financial-consulting/iif-fund-demo/` | **واجهة الصندوق الأصلية** |
| `financial-consulting/fund-site/index.html` | واجهة تجريبية أبسط |
| `scripts/dev-server.js` | خادم تطوير ثابت (بدون بروكسي محرك) |
| `engines/searxng/` | **Docker + توثيق المحرك المستقل** |

تفاصيل الربط المستقبلي: [financial-consulting/government-search/README-IIF-INTEGRATION.md](./financial-consulting/government-search/README-IIF-INTEGRATION.md).

### تحديث بيانات الجهات

1. عدّل `government-data.json`.
2. من جذر المشروع: `npm run build:gov-data` لتوليد `government-data.js`.
3. أعد تحميل الصفحة.

---

## Netlify (ربط GitHub)

- الإعدادات في **`netlify.toml`** (أمر البناء: `npm ci && npm run build`، النشر: **`.`**).
- **قائمة خطوات جاهزة:** [NETLIFY-CHECKLIST.md](./NETLIFY-CHECKLIST.md)
- لصق حقول الواجهة يدوياً: [NETLIFY-UI-SETTINGS.md](./NETLIFY-UI-SETTINGS.md)
- **اختصارات بعد النشر:** `/fund` → واجهة الصندوق، `/gov` → المنصة الحكومية
- نشر يدوي من GitHub: workflow **`Deploy Netlify`** (اختياري) يحتاج الأسرار `NETLIFY_AUTH_TOKEN` و `NETLIFY_SITE_ID`.

> **ملاحظة:** إذا ربطت Netlify بمستودع `iif-web` على الفرع `main`، كل **push** يُعيد بناء الموقع تلقائياً — لا تحتاج أسرار Actions لذلك.

**توفير الطبقة المجانية (Netlify / Actions):** [NETLIFY-FREE-TIER.md](./NETLIFY-FREE-TIER.md)

---

## متغيرات اختيارية

| المتغير | المعنى |
|---------|--------|
| `PORT` | منفذ خادم التطوير (افتراضي `3333`) |

```bash
set PORT=4000
npm start
```
