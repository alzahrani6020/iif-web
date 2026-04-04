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

## VPS: Translator (Docker)

See: `deploy/translator/`

```bash
cd deploy/translator
docker compose up -d
```

Expose it via HTTPS as `https://translator.example.com`.

