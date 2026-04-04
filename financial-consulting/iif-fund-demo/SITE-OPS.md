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

## Vercel — SearX JSON proxy

- File: `api/searx/search.js` (deployed with this directory as the Vercel project root).
- Optional env: **`SEARX_UPSTREAM`** = `https://your-favorite-searx.example` (default: `https://searx.tiekoetter.com`).
- Redeploy after adding env vars.

## GitHub Pages

- Workflow **excludes** `api/` from the static artifact so serverless source is not published as raw files on Pages.
- Site URL pattern: `https://<user>.github.io/<repo>/`

## Cloudflare (optional, in front of Pages or origin)

1. Create a proxied DNS record to your GitHub Pages (or custom domain CNAME).
2. Enable **Auto minify** (HTML/CSS/JS) if desired.
3. Caching: “Standard” or a Page Rule to cache static assets longer than HTML.
4. **Alternative proxy**: see `ops/cloudflare-searx-proxy.js` (template) if you prefer Workers instead of Vercel for `/api/searx/search`.

## Monitoring

- Workflow **Uptime ping** checks the GitHub Pages home URL and `privacy.html`, and performs an informational request to the Vercel proxy URL.

## Modularization (phased)

- `index.html` is intentionally monolithic for now. Safer splits: move rare sections into separate HTML pages (like `privacy.html` / `about-institution.html`) and link from the footer or nav; avoid breaking inline script IDs.

## Abuse note (open proxy)

- The SearX proxy is a **GET forwarder**. Monitor Vercel logs; consider rate limits or auth if traffic grows.
