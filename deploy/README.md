# Deploy (Recommended: Netlify + VPS)

This project is **static-first**. For best results:

- **Netlify** hosts the UI (static files + lightweight Netlify Functions).
- **VPS** hosts:
  - **SearXNG** (Docker)
  - **Translator** (NLLB-200 service)

The UI should keep working even if Translator is down (fallback: no translation).

## Netlify: required environment variables

Set these in Netlify **Site settings → Environment variables**:

- `SEARXNG_URL` = your hosted SearXNG base URL  
  Example: `https://searx.example.com`
- `IIF_TRANSLATE_URL` = your hosted translator base URL  
  Example: `https://translator.example.com`

Optional:

- `IIF_SEARX_TIMEOUT_MS` (default 15000)
- `IIF_TRANSLATE_TIMEOUT_MS` (default 180000)

## VPS: SearXNG (Docker)

Use the existing compose:

- Folder: `engines/searxng/`
- Command:

```bash
docker compose up -d
```

Then put a reverse proxy (Nginx/Caddy) in front and serve it via HTTPS.

**Examples in this repo:**

- Caddy: [`deploy/caddy/Caddyfile.example`](./caddy/Caddyfile.example)
- Nginx: [`deploy/nginx-searx.conf.example`](./nginx-searx.conf.example)
- Netlify env names (copy into UI): [`deploy/netlify.environment.example`](./netlify.environment.example)

After Netlify is configured, verify from your PC (PowerShell):

```bash
$env:PROXY_BASE="https://YOUR_SITE.netlify.app"; npm run verify:proxy
```

To probe SearXNG directly (local Docker or your HTTPS URL):

```bash
npm run verify:searx
# or
$env:SEARXNG_URL="https://search.example.com"; npm run verify:searx
```

## VPS: Translator (Docker)

See: `deploy/translator/`

```bash
cd deploy/translator
docker compose up -d
```

Expose it via HTTPS as `https://translator.example.com`.

