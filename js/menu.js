const menu = document.getElementById("mobile-menu");
const menuBtn = document.getElementById("mobile-btn");

if (menu && menuBtn) {
  menuBtn.addEventListener("click", onBurgerClick);
  menu.addEventListener("click", onMenuClick);
  document.addEventListener("click", onDocumentClick);
}

/**
 * Toggles the mobile menu when the burger button is clicked.
 * @param {MouseEvent} e
 * @returns {void}
 */
function onBurgerClick(e) {
  e.stopPropagation();
  menu.classList.toggle("is-active");
}

/**
 * Closes the menu when a nav link inside it is clicked.
 * Clicks on the language toggle are handled in `lang.js` and stay inside the menu.
 * @param {MouseEvent} e
 * @returns {void}
 */
function onMenuClick(e) {
  if (e.target.closest(".nav-link")) {
    menu.classList.remove("is-active");
  }
}

/**
 * Closes the menu when the user clicks outside of it and outside the burger button.
 * @param {MouseEvent} e
 * @returns {void}
 */
function onDocumentClick(e) {
  if (menu.classList.contains("is-active") && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.classList.remove("is-active");
  }
}
