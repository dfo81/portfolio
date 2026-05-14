// --- Mouse gradient effect ---
document.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--cursor-x", e.clientX + "px");
  document.documentElement.style.setProperty("--cursor-y", e.clientY + "px");
});

document.addEventListener("mouseleave", () => {
  document.documentElement.style.setProperty("--cursor-opacity", "0");
});

document.addEventListener("mouseenter", () => {
  document.documentElement.style.setProperty("--cursor-opacity", "1");
});

// --- Contact-form checkbox / submit button ---
document.querySelectorAll(".checkbox").forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("active");
    document.querySelector("#say-hallo-btn")?.classList.toggle("active");
  });
});

// --- Logo navigates back to the start page ---
document.querySelectorAll(".logo-wrapper").forEach((logo) => {
  logo.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

/**
 * Resizes a textarea to fit its content, capped at a fixed maximum height.
 * @param {HTMLTextAreaElement} textarea The textarea to resize.
 * @returns {void}
 */
function autoResize(textarea) {
  textarea.style.height = "auto";
  const maxHeight = 164;
  textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
  textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
}

// Inline `oninput="autoResize(this)"` in HTML needs this as a global.
window.autoResize = autoResize;
