const buttons = document.querySelectorAll(".toggle-btn");
let isEnglish = localStorage.getItem("lang") === "true";
let translations = null;

buttons.forEach((btn) => btn.addEventListener("click", toggle));

/**
 * Reports whether English is currently the active language.
 * @returns {boolean}
 */
export function getIsEnglish() {
  return isEnglish;
}

/**
 * Switches the active language and re-renders all translatable content.
 * @param {Event} [e] Optional click event whose default/propagation will be suppressed.
 * @returns {Promise<void>}
 */
export async function toggle(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  isEnglish = !isEnglish;
  localStorage.setItem("lang", isEnglish);
  await renderLang();
}

/**
 * Renders all [data-lang] elements in the currently selected language.
 * Lazily loads the EN translation file the first time English is activated.
 * @returns {Promise<void>}
 */
export async function renderLang() {
  buttons.forEach((btn) => btn.classList.toggle("active", isEnglish));
  if (isEnglish && !translations) await loadTranslations();
  document.querySelectorAll("[data-lang]").forEach(applyTranslation);
}

/**
 * Fetches the English translation dictionary into the `translations` module variable.
 * @returns {Promise<void>}
 */
async function loadTranslations() {
  try {
    translations = await fetch("/json/en.json").then((r) => r.json());
  } catch (e) {
    console.error("EN-JSON could not be loaded", e);
  }
}

/**
 * Applies the current-language text to a single [data-lang] element.
 * On first run, caches the original (German) text on the element for later restoration.
 * @param {HTMLElement} el The element to translate.
 * @returns {void}
 */
function applyTranslation(el) {
  const key = el.dataset.lang;
  if (!el.dataset.original) {
    el.dataset.original = el.placeholder || el.textContent;
  }
  const target = isEnglish && translations ? translations[key] : el.dataset.original;
  if (target === undefined) return;
  if (el.hasAttribute("placeholder")) el.placeholder = target;
  else el.textContent = target;
}
