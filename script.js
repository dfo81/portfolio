// Language switch
const button = document.getElementById("toggle-btn");
let isEn = localStorage.getItem("toggleState") === "true";

updateButton(isEn);

button.addEventListener("click", () => {
  isEn = !isEn;
  localStorage.setItem("toggleState", isEn);
  updateButton(isEn);
});

function updateButton(state) {
  button.classList.toggle("active", state);
}

// Language switch by enter keydown
button.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    button.click();
  }
});

// Hover click event
button.addEventListener("click", (e) => {
  const rect = button.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const half = rect.width / 2;

  if (isEn && clickX > half) return;
  if (!isEn && clickX < half) return;

  isEn = !isEn;
  localStorage.setItem("toggleState", isEn);
  updateButton(isEn);
});

// Mouse gradient effect
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

// Project icons visibility
const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const key = item.dataset.project;
    document.querySelector(`.project-icon[data-project="${key}"]`).classList.add("visible");
  });

  item.addEventListener("mouseleave", () => {
    const key = item.dataset.project;
    document.querySelector(`.project-icon[data-project="${key}"]`).classList.remove("visible");
  });
});

// carousell
const cards = Array.from(document.querySelectorAll(".card"));
const order = [2, 0, 1]; 
const classes = ["left", "center", "right"];
let isAnimating = false;

function applyClasses() {
  cards.forEach((card, i) => {
    card.className = "card " + classes[order.indexOf(i)];
  });
}

function go(dir) {
  if (isAnimating) return;
  isAnimating = true;
  const exitIndex = order[dir === 1 ? 0 : 2];
  cards[exitIndex].className = "card " + (dir === 1 ? "far-right" : "far-left");
  if (dir === 1) order.push(order.shift());
  else order.unshift(order.pop());
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      applyClasses();
      updateDots();
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    });
  });
}

const dots = document.querySelectorAll(".dot");

function updateDots() {
  const centerIndex = order[1];
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === centerIndex);
  });
}

applyClasses();
updateDots();
const nextBtn = document.querySelector(".arrow-forward-default");
const prevBtn = document.querySelector(".arrow-back-default");

if (nextBtn && nextBtn.parentElement) {
  nextBtn.parentElement.addEventListener("click", () => go(1));
}

if (prevBtn && prevBtn.parentElement) {
  prevBtn.parentElement.addEventListener("click", () => go(-1));
}

// checkbox changes
document.querySelectorAll(".checkbox").forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("active");
    document.querySelector("#say-hallo-btn").classList.toggle("active");
  });
});

// logo ruft index.html auf
const logos = document.querySelectorAll(".logo-wrapper");

logos.forEach((logo) => {
  logo.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

// overlay opener
document.addEventListener("DOMContentLoaded", () => {
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      document.body.insertAdjacentHTML("beforeend", getOverlay());
      document.body.style.overflow = "hidden";
      history.pushState({ state: "overlayOpen" }, "", "#projects");
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }

      const overlayWrapper = document.getElementById("project-overlay");
      overlayWrapper.addEventListener("click", (e) => {
        if (e.target === overlayWrapper) {
          closeOverlay();
        }
      });
    });
  });
});

//close overlay
function closeOverlay(isBackAction = false) {
  const overlay = document.getElementById("project-overlay");
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = "auto";

    if (!isBackAction && window.location.hash === "#projects") {
      history.back();
    }
  }
}

//close overlay by escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeOverlay();
  }
});

// back stop
window.addEventListener("popstate", (event) => {
  const overlay = document.getElementById("project-overlay");
  if (overlay) {
    closeOverlay(true);
  }
});

function autoResize(textarea) {
  textarea.style.height = "auto";
  const maxHeight = 164;
  const newHeight = Math.min(textarea.scrollHeight, maxHeight);
  textarea.style.height = newHeight + "px";
  if (textarea.scrollHeight > maxHeight) {
    textarea.style.overflowY = "auto";
  } else {
    textarea.style.overflowY = "hidden";
  }
}
const messageArea = document.querySelector("textarea");
if (messageArea) {
  messageArea.addEventListener("input", () => autoResize(messageArea));
}
