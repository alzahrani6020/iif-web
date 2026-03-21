const CORS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, max-age=300, stale-while-revalidate=600'
};

function getFeeds(targetLang, targetCat, targetCountry) {
  const FEEDS_EN = [
    { url: 'https://feeds.bbci.co.uk/news/business/rss.xml', name: 'BBC Business' },
    { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', name: 'BBC World' },
    { url: 'https://feeds.reuters.com/reuters/businessNews', name: 'Reuters Business' },
    { url: 'https://feeds.reuters.com/reuters/worldNews', name: 'Reuters World' },
    { url: 'https://www.cnbc.com/id/10001147/device/rss/rss.html', name: 'CNBC World' }
  ];
  const FEEDS_AR = [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.aleqt.com/rss.xml', name: 'Al Eqtisadiah' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ];
  const FEEDS_CN = [
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP Economy' },
    { url: 'https://www.caixinglobal.com/rss.xml', name: 'Caixin Global' }
  ];
  const FEEDS_ASIAN = [
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP' },
    { url: 'https://www.caixinglobal.com/rss.xml', name: 'Caixin Global' },
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://feeds.reuters.com/reuters/INbusinessNews', name: 'Reuters' },
    { url: 'https://www.cnbc.com/id/10001147/device/rss/rss.html', name: 'CNBC' }
  ];
  /* أسواق فقط — مصادر اقتصادية/مالية دون أخبار عامة (موقع اقتصادي) */
  const FEEDS_ASIAN_MARKETS = [
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP Economy' },
    { url: 'https://www.caixinglobal.com/rss.xml', name: 'Caixin Global' },
    { url: 'https://feeds.reuters.com/reuters/businessNews', name: 'Reuters Business' },
    { url: 'https://feeds.reuters.com/reuters/INbusinessNews', name: 'Reuters Asia' },
    { url: 'https://www.cnbc.com/id/10001147/device/rss/rss.html', name: 'CNBC' }
  ];
  /* أسواق عربية فقط — مصادر اقتصادية/مالية (مربوطة بالأسواق كالآسيوية) */
  const FEEDS_AR_MARKETS = [
    { url: 'https://www.aleqt.com/rss.xml', name: 'الاقتصادية' },
    { url: 'https://www.arabnews.com/rss', name: 'Arab News' },
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' }
  ];
  if (targetCat === 'arabic') {
    if (targetCountry) {
      const countryFeeds = FEEDS_BY_COUNTRY[targetCountry];
      if (countryFeeds && countryFeeds.length) return [...countryFeeds, ...FEEDS_AR_MARKETS];
    }
    return FEEDS_AR_MARKETS;
  }
  if (targetCat === 'asian') {
    const countryFeeds = FEEDS_BY_ASIAN_COUNTRY[targetCountry];
    if (countryFeeds && countryFeeds.length) return [...countryFeeds, ...FEEDS_ASIAN_MARKETS];
    return FEEDS_ASIAN_MARKETS;
  }
  if (targetCat === 'chinese') return FEEDS_CN;
  if (targetCat === 'global') return FEEDS_EN;
  if (targetCat === 'all') {
    if (targetLang === 'ar') return [...FEEDS_AR, ...FEEDS_EN, ...FEEDS_CN];
    return [...FEEDS_EN, ...FEEDS_CN];
  }
  if (targetLang === 'ar') return [...FEEDS_AR, ...FEEDS_EN, ...FEEDS_CN];
  return [...FEEDS_EN, ...FEEDS_CN];
}

const FEEDS_BY_COUNTRY = {
  SA: [
    { url: 'https://www.arabnews.com/rss', name: 'Arab News' },
    { url: 'https://www.aleqt.com/rss.xml', name: 'الاقتصادية' }
  ],
  AE: [
    { url: 'https://www.thenationalnews.com/rss', name: 'The National' },
    { url: 'https://www.aleqt.com/rss.xml', name: 'الاقتصادية' }
  ],
  EG: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  QA: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' }
  ],
  KW: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.aleqt.com/rss.xml', name: 'الاقتصادية' }
  ],
  BH: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.aleqt.com/rss.xml', name: 'الاقتصادية' }
  ],
  OM: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.aleqt.com/rss.xml', name: 'الاقتصادية' }
  ],
  JO: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  MA: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  LB: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  IQ: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  TN: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  DZ: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  SD: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  YE: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  PS: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  SY: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  LY: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ],
  MR: [
    { url: 'https://www.aljazeera.net/aljazeera/rss', name: 'Al Jazeera' },
    { url: 'https://www.bbc.com/arabic/index.xml', name: 'BBC Arabic' }
  ]
};

const FEEDS_BY_ASIAN_COUNTRY = {
  CN: [
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP' },
    { url: 'https://www.caixinglobal.com/rss.xml', name: 'Caixin Global' }
  ],
  JP: [
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://feeds.reuters.com/reuters/INbusinessNews', name: 'Reuters' }
  ],
  IN: [
    { url: 'https://feeds.reuters.com/reuters/INbusinessNews', name: 'Reuters India' },
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' }
  ],
  KR: [
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://feeds.reuters.com/reuters/worldNews', name: 'Reuters' }
  ],
  ID: [
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://feeds.reuters.com/reuters/worldNews', name: 'Reuters' }
  ],
  MY: [
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP' },
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' }
  ],
  TH: [
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://feeds.reuters.com/reuters/worldNews', name: 'Reuters' }
  ],
  VN: [
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP' }
  ],
  PK: [
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://feeds.reuters.com/reuters/worldNews', name: 'Reuters' }
  ],
  SG: [
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP' },
    { url: 'https://feeds.reuters.com/reuters/worldNews', name: 'Reuters' }
  ],
  PH: [
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP' }
  ],
  BD: [
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://feeds.reuters.com/reuters/worldNews', name: 'Reuters' }
  ],
  LK: [
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://feeds.reuters.com/reuters/worldNews', name: 'Reuters' }
  ],
  MM: [
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP' }
  ],
  KH: [
    { url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml', name: 'BBC Asia' },
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP' }
  ],
  TW: [
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP' },
    { url: 'https://feeds.reuters.com/reuters/worldNews', name: 'Reuters' }
  ],
  HK: [
    { url: 'https://www.scmp.com/rss/91/feed', name: 'SCMP' },
    { url: 'https://feeds.reuters.com/reuters/worldNews', name: 'Reuters' }
  ]
};

function parseRssItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const titleMatch = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || block.match(/<title>(.*?)<\/title>/);
    const linkMatch = block.match(/<link>(.*?)<\/link>/);
    const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'").trim() : '';
    const link = linkMatch ? linkMatch[1].trim() : '';
    if (title && link) items.push({ title, link });
  }
  return items;
}

async function translateTitles(list, lang) {
  if (lang !== 'ar') return list;
  const translate = async (t) => {
    const q = encodeURIComponent(String(t).slice(0, 500));
    const resp = await fetch(`https://api.mymemory.translated.net/get?q=${q}&langpair=${encodeURIComponent('auto|' + lang)}`);
    if (!resp.ok) return t;
    const j = await resp.json();
    const out = (j && j.response && j.response.translatedText) || (j && j.responseData && j.responseData.translatedText) || '';
    return out || t;
  };
  const slice = list.slice(0, 12);
  return Promise.all(slice.map(async (it) => ({
    title: await translate(it.title),
    link: it.link,
    source: it.source
  })));
}

export async function GET(request) {
  const url = new URL(request.url);
  const urlLang = url.searchParams.get('lang') || url.searchParams.get('l') || '';
  const urlCat = url.searchParams.get('cat') || url.searchParams.get('category') || '';
  const urlCountry = (url.searchParams.get('country') || '').toUpperCase().trim();
  const targetLang = (String(urlLang || '').toLowerCase() === 'ar') ? 'ar' : 'en';
  const targetCat = (String(urlCat || '').toLowerCase()) || 'all';
  const targetCountry = urlCountry && /^[A-Z]{2}$/.test(urlCountry) ? urlCountry : '';

  try {
    const all = [];
    const feeds = getFeeds(targetLang, targetCat, targetCountry);
    for (const feed of feeds) {
      try {
        const resp = await fetch(feed.url, { headers: { 'User-Agent': 'IIF-News-Widget/1.0' } });
        if (!resp.ok) continue;
        const xml = await resp.text();
        const items = parseRssItems(xml).slice(0, 8).map(({ title, link }) => ({ title, link, source: feed.name }));
        all.push(...items);
      } catch (e) { /* ignore */ }
    }
    const uniqueByLink = [...new Map(all.map((i) => [i.link, i])).values()];
    let list = uniqueByLink.slice(0, 15);
    list = await translateTitles(list, targetLang);
    return new Response(JSON.stringify({ items: list }), { status: 200, headers: CORS });
  } catch (e) {
    return new Response(JSON.stringify({ items: [] }), { status: 200, headers: CORS });
  }
}
