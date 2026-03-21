/**
 * إعداد IIF — تكامل محرك الويب (SearXNG)
 *
 * حالياً: **مُعطّل** — المحرك مشروع مستقل تحت `engines/searxng/` ولا يُحمَّل من صفحات المنصة.
 *
 * عند إعادة الربط لاحقاً:
 * - أعد تفعيل التحميل من `SIMPLE-GOVERNMENT-PLATFORM.html` إن لزم.
 * - عيّن `window.__IIF_CONFIG__ = { searxngBase: '...', searxngEnabled: true };`
 *   قبل سكربت المنصة، أو أعد تفعيل `ENGINE_WEB_SEARCH_ENABLED` داخل الصفحة.
 */
(function () {
  'use strict';
  window.__IIF_CONFIG__ = window.__IIF_CONFIG__ || {};
  if (typeof window.__IIF_CONFIG__.searxngEnabled === 'undefined') {
    window.__IIF_CONFIG__.searxngEnabled = false;
  }
})();
