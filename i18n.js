/**
 * Shreeji Construction — Form-Scoped i18n Engine
 * Translates ONLY elements inside #form-i18n-scope.
 * Rest of the page always stays in English.
 * Default language: Hindi (hi)
 */

(function () {
  'use strict';

  const SCOPE_ID    = 'form-i18n-scope';
  const STORAGE_KEY = 'sc_form_lang';
  const SUPPORTED   = ['en', 'hi'];
  const DEFAULT_LANG = 'hi';   // Form defaults to Hindi

  let currentLang   = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  let translations  = {};

  /* ── Load translation JSON ── */
  async function loadTranslations(lang) {
    const res = await fetch(`locales/${lang}.json`);
    if (!res.ok) throw new Error(`i18n: failed to load locales/${lang}.json`);
    return res.json();
  }

  /* ── Apply translations scoped to #form-i18n-scope ── */
  function applyTranslations(t) {
    const scope = document.getElementById(SCOPE_ID);
    if (!scope) return;

    // Text content
    scope.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    // Placeholders
    scope.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    // Select options — data-i18n-select holds comma-separated keys matching option order
    scope.querySelectorAll('[data-i18n-select]').forEach(select => {
      const keys    = select.getAttribute('data-i18n-select').split(',');
      const options = select.querySelectorAll('option');
      keys.forEach((key, idx) => {
        if (options[idx] && t[key.trim()] !== undefined) {
          options[idx].textContent = t[key.trim()];
        }
      });
    });

    // Hindi font: add class to the scope container only (not body)
    if (currentLang === 'hi') {
      scope.classList.add('lang-hi');
    } else {
      scope.classList.remove('lang-hi');
    }

    // Update all toggle buttons inside the scope
    scope.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('lang-btn--active', btn.getAttribute('data-lang') === currentLang);
    });
  }

  /* ── Switch language ── */
  async function switchLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    try {
      translations = await loadTranslations(lang);
      applyTranslations(translations);
    } catch (e) {
      console.warn(e.message);
    }
  }

  /* ── Init ── */
  async function init() {
    try {
      translations = await loadTranslations(currentLang);
      applyTranslations(translations);
    } catch (e) {
      console.warn(e.message);
    }

    // Attach toggle buttons (only inside scope)
    const scope = document.getElementById(SCOPE_ID);
    if (!scope) return;
    scope.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang && lang !== currentLang) switchLang(lang);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);

  // Global accessor if needed
  window.scI18n = { switchLang };
})();
