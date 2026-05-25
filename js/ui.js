// --- Mouse gradient effect ---
// Start hidden until the first mousemove tells us where the cursor is.
document.body.classList.add("cursor-hidden");

const EDGE_THRESHOLD = 30;

/**
 * Hides the cursor gradient by re-adding the cursor-hidden class on body.
 * @returns {void}
 */
function hideCursor() {
  document.body.classList.add("cursor-hidden");
}

document.addEventListener("mousemove", (e) => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const nearEdge =
    e.clientX < EDGE_THRESHOLD ||
    e.clientY < EDGE_THRESHOLD ||
    e.clientX > w - EDGE_THRESHOLD ||
    e.clientY > h - EDGE_THRESHOLD;

  if (nearEdge) {
    hideCursor();
    return;
  }

  document.documentElement.style.setProperty("--cursor-x", e.clientX + "px");
  document.documentElement.style.setProperty("--cursor-y", e.clientY + "px");
  document.body.classList.remove("cursor-hidden");
});

// Multiple safety nets so the gradient never lingers when the cursor really left.
document.documentElement.addEventListener("mouseleave", hideCursor);
document.addEventListener("mouseleave", hideCursor);
window.addEventListener("blur", hideCursor);

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
