/**
 * Fills language <select>s from IIF_I18N.codes + langs; optional combobox UI with search.
 * Expects IIF_I18N after i18n.js. Call IIF_initLangPickerUI() before applying saved language.
 */
(function () {
  function fillSelect(sel) {
    if (!sel || !window.IIF_I18N) return;
    var codes = IIF_I18N.codes || [];
    var L = IIF_I18N.langs || {};
    sel.innerHTML = '';
    for (var i = 0; i < codes.length; i++) {
      var c = codes[i];
      var opt = document.createElement('option');
      opt.value = c;
      var inf = L[c];
      opt.textContent = inf && inf.name ? inf.name : c;
      sel.appendChild(opt);
    }
  }

  function syncInputFromSelect(sel, input) {
    if (!sel || !input) return;
    var o = sel.options[sel.selectedIndex];
    input.value = o ? o.textContent : '';
  }

  function initCombobox(cfg) {
    var wrap = document.getElementById(cfg.wrapId);
    if (wrap && wrap.getAttribute('data-iif-combobox-init') === '1') return;
    var sel = document.getElementById(cfg.selectId);
    var input = document.getElementById(cfg.inputId);
    var list = document.getElementById(cfg.listId);
    var toggle = cfg.toggleId ? document.getElementById(cfg.toggleId) : null;
    if (!sel || !input || !list) return;
    if (wrap) wrap.setAttribute('data-iif-combobox-init', '1');

    fillSelect(sel);

    /* Reduce Chrome password-manager attachment to this field */
    try {
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('data-lpignore', 'true');
      input.setAttribute('data-1p-ignore', 'true');
      input.setAttribute('data-bwignore', 'true');
    } catch (eRO) { }

    if (wrap) {
      wrap.addEventListener(
        'pointerdown',
        function () {
          try {
            input.removeAttribute('readonly');
          } catch (eU) { }
        },
        { capture: true, passive: true }
      );
    }

    var items = [];
    function rebuildList() {
      list.innerHTML = '';
      items = [];
      for (var i = 0; i < sel.options.length; i++) {
        var o = sel.options[i];
        var li = document.createElement('li');
        li.setAttribute('role', 'option');
        li.setAttribute('data-value', o.value);
        li.id = cfg.listId + '-opt-' + o.value;
        li.textContent = o.textContent + ' · ' + o.value;
        list.appendChild(li);
        items.push(li);
      }
    }
    rebuildList();

    var activeIdx = -1;

    function visibleItems() {
      var out = [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].style.display !== 'none') out.push(items[i]);
      }
      return out;
    }

    function setActive(li) {
      for (var i = 0; i < items.length; i++) {
        items[i].setAttribute('aria-selected', items[i] === li ? 'true' : 'false');
        items[i].classList.toggle('iif-lang-combobox__opt--active', items[i] === li);
      }
    }

    function filterItems(q) {
      q = (q || '').trim().toLowerCase();
      for (var i = 0; i < items.length; i++) {
        var li = items[i];
        var t = li.textContent.toLowerCase();
        li.style.display = !q || t.indexOf(q) >= 0 ? '' : 'none';
      }
      var vis = visibleItems();
      list.hidden = vis.length === 0;
      activeIdx = vis.length ? 0 : -1;
      setActive(activeIdx >= 0 ? vis[activeIdx] : null);
    }

    function setExpanded(on) {
      var v = on ? 'true' : 'false';
      input.setAttribute('aria-expanded', v);
      if (toggle) toggle.setAttribute('aria-expanded', v);
    }

    function openList() {
      list.hidden = false;
      list.style.display = 'block';
      setExpanded(true);
    }

    function closeList() {
      list.hidden = true;
      list.style.display = 'none';
      setExpanded(false);
      activeIdx = -1;
      setActive(null);
      try {
        input.setAttribute('readonly', 'readonly');
      } catch (eC) { }
    }

    /**
     * When opening for browsing, do NOT filter by the displayed language name —
     * that hides all other languages (input shows e.g. "English").
     */
    function openAllLanguages() {
      openList();
      filterItems('');
    }

    function chooseValue(code) {
      if (sel.querySelector('option[value="' + code + '"]')) {
        sel.value = code;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
      closeList();
      syncInputFromSelect(sel, input);
    }

    input.addEventListener('focus', function () {
      try {
        input.removeAttribute('readonly');
      } catch (eF) { }
      openAllLanguages();
    });

    input.addEventListener('click', function () {
      try {
        input.removeAttribute('readonly');
      } catch (eC2) { }
      openAllLanguages();
    });

    input.addEventListener('input', function () {
      openList();
      filterItems(input.value);
    });

    input.addEventListener('keydown', function (e) {
      var vis = visibleItems();
      if (e.key === 'Escape') {
        closeList();
        syncInputFromSelect(sel, input);
        e.preventDefault();
        return;
      }
      if (e.key === 'ArrowDown') {
        if (list.hidden) openAllLanguages();
        vis = visibleItems();
        if (!vis.length) return;
        activeIdx = Math.min(activeIdx + 1, vis.length - 1);
        if (activeIdx < 0) activeIdx = 0;
        setActive(vis[activeIdx]);
        e.preventDefault();
        return;
      }
      if (e.key === 'ArrowUp') {
        vis = visibleItems();
        if (!vis.length) return;
        activeIdx = Math.max(activeIdx - 1, 0);
        setActive(vis[activeIdx]);
        e.preventDefault();
        return;
      }
      if (e.key === 'Enter') {
        vis = visibleItems();
        if (!list.hidden && activeIdx >= 0 && vis[activeIdx]) {
          chooseValue(vis[activeIdx].getAttribute('data-value'));
          e.preventDefault();
        }
      }
    });

    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        try {
          input.removeAttribute('readonly');
        } catch (eT) { }
        var closed = list.hidden;
        if (closed) {
          input.focus();
          openAllLanguages();
        } else {
          closeList();
          syncInputFromSelect(sel, input);
        }
      });
    }

    list.addEventListener('mousedown', function (e) {
      e.preventDefault();
    });

    list.addEventListener('click', function (e) {
      var li = e.target.closest('li[role="option"]');
      if (!li || li.style.display === 'none') return;
      chooseValue(li.getAttribute('data-value'));
    });

    var wrapEl = document.getElementById(cfg.wrapId);
    document.addEventListener('click', function (e) {
      if (wrapEl && !wrapEl.contains(e.target)) closeList();
    });

    window.addEventListener('iif-lang-change', function () {
      syncInputFromSelect(sel, input);
    });

    syncInputFromSelect(sel, input);
    setExpanded(false);
  }

  window.IIF_fillLangSelectFromI18n = fillSelect;

  window.IIF_initLangPickerUI = function () {
    if (!window.IIF_I18N) return;
    var dash = document.getElementById('iif-lang-picker-dashboard');
    if (dash) fillSelect(dash);

    if (document.getElementById('iif-lang-combobox-wrap')) {
      initCombobox({
        wrapId: 'iif-lang-combobox-wrap',
        selectId: 'iif-lang-picker',
        inputId: 'iif-lang-picker-input',
        listId: 'iif-lang-picker-list',
        toggleId: 'iif-lang-picker-toggle'
      });
    }

    if (document.getElementById('iif-lang-combobox-wrap-dashboard')) {
      initCombobox({
        wrapId: 'iif-lang-combobox-wrap-dashboard',
        selectId: 'iif-lang-picker-dashboard',
        inputId: 'iif-lang-picker-dashboard-input',
        listId: 'iif-lang-picker-dashboard-list',
        toggleId: 'iif-lang-picker-dashboard-toggle'
      });
    }
  };
})();
