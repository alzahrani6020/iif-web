# تكامل IIF + المنصة الحكومية + محرك البحث

## الوضع الحالي (مبدّل مؤقتاً)

| الموضوع | الحالة |
|---------|--------|
| **محرك SearXNG** | مشروع **منفصل** تحت **`engines/searxng/`** — يُبنى ويُختبر هناك **دون دمج** مع صفحات الصندوق أو المنصة. |
| **المنصة `SIMPLE-GOVERNMENT-PLATFORM.html`** | بحث محلي + **بحث ويب** على `localhost`/`127.0.0.1` فقط (يتطلب SearXNG + `npm start`). على الاستضافة العامة يبقى محلياً فقط ما لم يُضف بروكسي إنتاج. |
| **`iif-config.js`** | لا يُحمَّل من المنصة حالياً؛ مُعدّ للتكامل لاحقاً (`searxngEnabled: false`). |
| **خادم `npm start`** | يقدّم ملفات ثابتة + **بروكسي** `/api/searx` → `127.0.0.1:8080` (SearXNG). |

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
4. **التطوير المحلي:** البروكسي مضاف في `scripts/dev-server.js` (`/api/searx`). **الإنتاج (Netlify):** لا يوجد بروكسي افتراضياً — بحث الويب مُعطّل على النطاق العام ما لم تُضف دالة أو خادماً يوجّه لـ SearXNG.

## مراجع

- `engines/searxng/README.md`
- `README.md` (جذر المشروع)
