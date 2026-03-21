# مؤشر بيئة التطوير

- **`README.md`** — تشغيل الواجهات (`npm start`) + المحرك المنفصل (`engines/searxng/`).
- **`engines/searxng/README.md`** — SearXNG كمشروع مستقل (Docker، المنفذ 8080).

## بيئة عامة (Docker + أدوات)

- Docker Desktop يجب أن يكون شغّالاً لتشغيل **SearXNG** من `engines/searxng/`.
- Node.js لخادم التطوير على **3333** (صفحات ثابتة فقط).

## عناوين سريعة

- خادم IIF: **http://127.0.0.1:3333/**
- SearXNG (إن شغّلت المشروع المنفصل): **http://127.0.0.1:8080/**
