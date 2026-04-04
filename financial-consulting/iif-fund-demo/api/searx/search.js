/**
 * Vercel Serverless: يمرّر طلبات JSON إلى مثيل SearXNG (بدون CORS من المتصفح مباشرة).
 * متغير بيئة اختياري: SEARX_UPSTREAM (مثال: https://searx.tiekoetter.com)
 */
const DEFAULT_UPSTREAM = 'https://searx.tiekoetter.com';
const MAX_Q = 2000;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Max-Age', '86400');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed', results: [] });
  }

  const q = String(req.query.q || '').trim();
  if (!q) {
    return res.status(200).json({ results: [] });
  }
  if (q.length > MAX_Q) {
    return res.status(400).json({ error: 'Query too long', results: [] });
  }

  const format = String(req.query.format || 'json');
  const language = String(req.query.language || 'en');
  const categories = String(req.query.categories || 'general');
  const upstream = String(process.env.SEARX_UPSTREAM || DEFAULT_UPSTREAM).replace(/\/$/, '');

  const params = new URLSearchParams({
    q,
    format,
    language,
    categories,
  });
  const url = `${upstream}/search?${params.toString()}`;

  try {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'IIF-Searx-Proxy/1.0 (Vercel)',
        Accept: 'application/json, text/plain;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
    });
    const body = await r.text();
    const ct = r.headers.get('content-type') || 'application/json; charset=utf-8';
    res.status(r.status);
    res.setHeader('Content-Type', ct);
    return res.send(body);
  } catch (e) {
    return res.status(502).json({
      error: 'Upstream fetch failed',
      results: [],
      details: process.env.NODE_ENV === 'development' ? String(e && e.message) : undefined,
    });
  }
};
