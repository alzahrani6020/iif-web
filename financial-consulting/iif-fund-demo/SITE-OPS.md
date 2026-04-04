# Site operations — IIF public interface (`iif-fund-demo`)

## Meta tags (backup checklist)

| Meta | Role |
|------|------|
| `iif-app-base` | Optional manual base path for assets (usually empty; `index.html` computes base). |
| `iif-searx-public-url` | Public SearXNG UI URL for the header link on GitHub Pages. |
| `iif-searx-proxy-base` | HTTPS origin that serves **`/api/searx/search`** (Vercel serverless or Worker). Used by in-page **web analysis** fetch on non-localhost hosts. |
| `iif-funcs-base` | External serverless/API base (existing integrations). |
| `iif-build` | Deployment fingerprint for support / debugging. |

After changing hosts, update **`iif-searx-proxy-base`** to match your live proxy (e.g. `https://your-project.vercel.app`).

### نسخة احتياطية سريعة (للصق في مستند داخلي)

```
iif-searx-public-url:    (من <meta name="iif-searx-public-url" content="...">)
iif-searx-proxy-base:    (من <meta name="iif-searx-proxy-base" content="...">)
iif-funcs-base:          (من <meta name="iif-funcs-base" content="...">)
GitHub Pages URL:        https://<user>.github.io/<repo>/
Vercel project URL:      (لوحة Vercel → Domains)
```

## Vercel — SearX JSON proxy

- File: `api/searx/search.js` (deployed with this directory as the Vercel project root).
- Optional env: **`SEARX_UPSTREAM`** = `https://your-favorite-searx.example` (default: `https://searx.tiekoetter.com`).
- **تحديد معدل (ذاكرة لكل عقدة serverless):** `IIF_PROXY_RL_MAX` (افتراضي 45 طلباً)، `IIF_PROXY_RL_WINDOW_MS` (افتراضي 60000)، أو `IIF_PROXY_RL_OFF=1` لتعطيل الحد مؤقتاً.
- Redeploy after adding env vars.
- مثال محلي: انسخ `.env.example` إلى `.env` وعدّل القيم عند استخدام `vercel dev` (لا ترفع `.env`).

### قائمة تحقق بعد النشر

1. `curl -sI "https://<vercel>/api/searx/search?q=test&format=json"` → HTTP 200 (أو 4xx من upstream وليس 404 من المسار).
2. من موقع GitHub Pages: ميزة التحليل التي تستدعي `fetchSearxPack` تعمل دون خطأ CORS.
3. راجع **Logs** في Vercel إذا ازدادت الطلبات غير المتوقعة.

## GitHub Pages

- Workflow **excludes** `api/` from the static artifact so serverless source is not published as raw files on Pages.
- Site URL pattern: `https://<user>.github.io/<repo>/`

## Cloudflare (optional, in front of Pages or origin)

1. Create a proxied DNS record to your GitHub Pages (or custom domain CNAME).
2. Enable **Auto minify** (HTML/CSS/JS) if desired.
3. Caching: “Standard” or a Page Rule to cache static assets longer than HTML.
4. **Alternative proxy (Cloudflare Worker)**:
   - الكود: `ops/cloudflare-searx-proxy.js`
   - الإعداد: `ops/wrangler.toml`
   - من المجلد `ops`: `npx wrangler@3 deploy` ثم اربط **Route** (مثل `api.example.com/api/searx/*`).
   - سر اختياري: `npx wrangler secret put SEARX_UPSTREAM`

## Monitoring

- Workflow **Uptime ping** checks the GitHub Pages home URL and `privacy.html`, and performs an informational request to the Vercel proxy URL.
- في GitHub: **Settings → Notifications → Actions** — فعّل إشعار فشل سير العمل إن رغبت (لا يُضبط من المستودع).

## Modularization (phased)

- `index.html` is intentionally monolithic for now. Safer splits: move rare sections into separate HTML pages (like `privacy.html` / `about-institution.html`) and link from the footer or nav; avoid breaking inline script IDs.

## مسار المستخدم (داخلي)

- راجع `USER-JOURNEY.md` لتدريب الفريق على تسلسل زائر → تسجيل → لوحة التحكم.

## Abuse note (open proxy)

- The SearX proxy is a **GET forwarder**. Monitor Vercel logs; consider rate limits or auth if traffic grows.
