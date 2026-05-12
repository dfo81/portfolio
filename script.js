const buttons = document.querySelectorAll(".toggle-btn");
let isEnglish = localStorage.getItem("lang") === "true";
let translations = null;
let allProjects = []; 

renderLang();
renderProject();

// --- Funktionen für Sprache ---
buttons.forEach(btn => btn.addEventListener("click", toggle));

async function toggle() {
  isEnglish = !isEnglish;
  localStorage.setItem("lang", isEnglish);
  await renderLang();
}

async function renderLang() {
  buttons.forEach(btn => btn.classList.toggle("active", isEnglish));
  
  // 1. Übersetzungen laden, falls Englisch aktiv ist
  if (isEnglish && !translations) {
    try {
      translations = await fetch("/json/en.json").then(r => r.json());
    } catch (e) {
      console.error("EN-JSON konnte nicht geladen werden", e);
    }
  }

  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.dataset.lang;

    // 2. WICHTIG: Speichere den deutschen Text als "Original", falls noch nicht geschehen
    if (!el.dataset.original) {
      if (el.placeholder) {
        el.dataset.original = el.placeholder;
      } else {
        el.dataset.original = el.textContent;
      }
    }

    // 3. Bestimme das Ziel-Wort: 
    // Wenn Englisch -> nimm Wert aus JSON (oder Original als Fallback)
    // Wenn Deutsch -> nimm IMMER das gespeicherte Original
    const targetText = isEnglish 
      ? (translations ? translations[key] : el.dataset.original) 
      : el.dataset.original;

    // 4. Den Text nur zuweisen, wenn targetText auch wirklich existiert
    if (targetText !== undefined) {
      if (el.placeholder !== undefined && el.hasAttribute('placeholder')) {
        el.placeholder = targetText;
      } else {
        el.textContent = targetText;
      }
    }
  });
}

// --- Funktionen für Projekte ---
async function renderProject() {
  const listContainer = document.getElementById('project-list');
  const iconContainer = document.getElementById('project-preview');

  if (!listContainer || !iconContainer) return;
  try {
    let response = await fetch('./json/projects.json');
    let data = await response.json();
    allProjects = data.projects; 
    
    listContainer.innerHTML = "";
    iconContainer.innerHTML = "";

    allProjects.forEach((project, index) => {
      listContainer.innerHTML += getProjectList(project);
      iconContainer.innerHTML += getProjectPrev(project, index, allProjects.length);
    });

    initHoverEffects();
    initClickEffects(allProjects); 

  } catch (error) {
    console.error('Fehler beim Laden der Daten:', error);
  }
}

function initHoverEffects() {
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const key = item.dataset.project;
      const icon = document.querySelector(`.project-icon[data-project="${key}"]`);
      if (icon) icon.classList.add("visible");
    });
    item.addEventListener("mouseleave", () => {
      const key = item.dataset.project;
      const icon = document.querySelector(`.project-icon[data-project="${key}"]`);
      if (icon) icon.classList.remove("visible");
    });
  });
}

function initClickEffects(projects) {
  const items = document.querySelectorAll(".project-item");
  items.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      const projectData = projects[index];
      const nextIndex = (index + 1) % projects.length;
      const nextProjectName = projects[nextIndex].title;

      renderOverlay(projectData, nextProjectName);
    });
  });
}

function renderOverlay(projectData, nextProjectName) {
  const existingOverlay = document.getElementById("project-overlay");
  if (existingOverlay) existingOverlay.remove();

  document.body.insertAdjacentHTML("beforeend", getOverlay(projectData, nextProjectName));
  document.body.style.overflow = "hidden";

  const overlayWrapper = document.getElementById("project-overlay");
  overlayWrapper.addEventListener("click", (e) => {
    if (e.target === overlayWrapper) closeOverlay();
  });
}

function openNextProject(projectName) {
  const index = allProjects.findIndex(p => p.title === projectName);
  const projectData = allProjects[index];
  const nextIndex = (index + 1) % allProjects.length;
  const nextProjectName = allProjects[nextIndex].title;
  renderOverlay(projectData, nextProjectName);
}

function closeOverlay(isBackAction = false) {
  const overlay = document.getElementById("project-overlay");
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = "auto";
    document.body.style.opacity = 1;
    if (!isBackAction && window.location.hash === "#projects") {
      history.back();
    }
  }
}

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

// cards order
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

// automatische größe
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
