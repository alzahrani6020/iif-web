(function () {
  var STORAGE_KEY = 'iif-header-section-links-hidden';

  function closeAuxMenus() {
    var govBtn = document.getElementById('gov-menu-btn');
    var govMenu = document.getElementById('gov-menu');
    if (govMenu) govMenu.style.display = 'none';
    if (govBtn) govBtn.setAttribute('aria-expanded', 'false');
    ['about-dropdown-trigger', 'services-dropdown-trigger', 'more-dropdown-trigger'].forEach(function (tid) {
      var t = document.getElementById(tid);
      if (t) t.setAttribute('aria-expanded', 'false');
    });
    ['about-dropdown-wrap', 'services-dropdown-wrap', 'more-dropdown-wrap'].forEach(function (wid) {
      var w = document.getElementById(wid);
      if (w) w.classList.remove('is-open');
    });
    var ad = document.getElementById('about-dropdown');
    var sd = document.getElementById('services-dropdown');
    var md = document.getElementById('more-dropdown');
    if (ad) ad.setAttribute('aria-hidden', 'true');
    if (sd) sd.setAttribute('aria-hidden', 'true');
    if (md) md.setAttribute('aria-hidden', 'true');
  }

  function init() {
    var btn = document.getElementById('iif-toggle-section-links');
    if (!btn) return;
    var targets = document.querySelectorAll('.iif-header-collapsible-target');
    if (!targets.length) return;

    function setCollapsed(collapsed) {
      targets.forEach(function (el) {
        if (collapsed) el.setAttribute('hidden', '');
        else el.removeAttribute('hidden');
      });
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      var hideLbl = btn.querySelector('[data-iif-toggle-label="hide"]');
      var showLbl = btn.querySelector('[data-iif-toggle-label="show"]');
      if (hideLbl) hideLbl.hidden = collapsed;
      if (showLbl) showLbl.hidden = !collapsed;
      try {
        if (collapsed) localStorage.setItem(STORAGE_KEY, '1');
        else localStorage.removeItem(STORAGE_KEY);
      } catch (e) { /* ignore */ }
      if (collapsed) closeAuxMenus();
    }

    function storedCollapsed() {
      try {
        return localStorage.getItem(STORAGE_KEY) === '1';
      } catch (e) {
        return false;
      }
    }

    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      setCollapsed(expanded);
    });

    setCollapsed(storedCollapsed());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
