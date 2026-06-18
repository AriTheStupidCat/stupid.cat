/* ============================================================
   stupid.cat — language switcher (Catalan / English)
   No dependencies. Remembers your choice. Defaults to Catalan.
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'stupidcat-lang';
  var SUPPORTED = ['ca', 'en'];
  var DEFAULT_LANG = 'ca';

  /* Catalan is always the default. Only an explicit, remembered
     choice can override it — browser language is ignored. */
  function detectLang() {
    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    return DEFAULT_LANG;
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;

    document.documentElement.lang = lang;

    /* Toggle every translatable node. */
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      el.hidden = el.getAttribute('data-i18n') !== lang;
    }

    /* Update the switcher buttons. */
    var btns = document.querySelectorAll('.lang-btn');
    for (var j = 0; j < btns.length; j++) {
      var b = btns[j];
      var active = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  function init() {
    applyLang(detectLang());

    var btns = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        applyLang(this.getAttribute('data-lang'));
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
