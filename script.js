async function loadLanguage(lang) {
  const res = await fetch(`lang/${lang}.json`);
  const translations = await res.json();
  
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    el.textContent = translations[key];
  });
}

loadLanguage("de");

document.getElementById("lang-switch").addEventListener("click", () => {
  const current = document.documentElement.lang;
  const next = current === "de" ? "en" : "de";
  document.documentElement.lang = next;
  loadLanguage(next);
  document.getElementById("lang-de").classList.toggle("active", next === "de");
  document.getElementById("lang-en").classList.toggle("active", next === "en");
});