// Maus-Gradient Effekt
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
  document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
});

// Dark / Ligth mode 
/* const toggle = document.querySelector('#theme-toggle');

toggle.addEventListener('click', () => {
  const html = document.documentElement;
  if (html.dataset.theme === 'light') {
    html.dataset.theme = 'dark';
  } else {
    html.dataset.theme = 'light';
  }
}); */

/* function applyTranslations() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[key]) el.textContent = translations[key];
      });
      document.documentElement.lang = currentLang;
    }

    async function switchLanguage(lang) {
      currentLang = lang;
      localStorage.setItem('lang', lang);
      await loadLanguage(lang);
      applyTranslations();

      // Button-Styles aktualisieren
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });
    }

    // ── Events ───────────────────────────────────────────────────
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });

    // ── Init ─────────────────────────────────────────────────────
    (async () => {
      await loadLanguage(currentLang);
      applyTranslations();
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
      });
    })(); */