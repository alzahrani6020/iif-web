# تكامل IIF + المنصة الحكومية + محرك البحث

## الوضع الحالي (مبدّل مؤقتاً)

| الموضوع | الحالة |
|---------|--------|
| **محرك SearXNG** | مشروع **منفصل** تحت **`engines/searxng/`** — يُبنى ويُختبر هناك **دون دمج** مع صفحات الصندوق أو المنصة. |
| **المنصة `SIMPLE-GOVERNMENT-PLATFORM.html`** | بحث **محلي** في الجهات فقط. تفعيل نتائج الويب عبر `ENGINE_WEB_SEARCH_ENABLED` داخل الملف عند الجاهزية. |
| **`iif-config.js`** | لا يُحمَّل من المنصة حالياً؛ مُعدّ للتكامل لاحقاً (`searxngEnabled: false`). |
| **خادم `npm start`** | يقدّم ملفات ثابتة **فقط** — **لا** يوجد بروكسي `/api/searx`. |

## تشغيل المحرك (منفصل)

```bash
cd engines/searxng
docker compose up -d
```

→ [http://127.0.0.1:8080](http://127.0.0.1:8080)

## عند إعادة الربط لاحقاً (مخطط)

1. إكمال اختبار SearXNG في `engines/searxng/`.
2. في `SIMPLE-GOVERNMENT-PLATFORM.html`: تعيين `ENGINE_WEB_SEARCH_ENABLED = true` وإظهار `#webSearchGroup`.
3. إعادة تحميل `iif-config.js` أو تعيين `window.__IIF_CONFIG__` مع `searxngBase` و `searxngEnabled: true`.
4. إن لزم بروكسي على نفس النطاق (CORS): يُضاف في خادم الإنتاج أو سكربت تطوير منفصل — **ليس** مطلوباً أثناء بناء المحرك كمشروع مستقل.

## مراجع

- `engines/searxng/README.md`
- `README.md` (جذر المشروع)
