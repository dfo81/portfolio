import { getProjectList, getProjectPrev, getOverlay } from "./template.js";
import { getIsEnglish } from "./lang.js";

let allProjects = [];

/**
 * Fetches the project list and renders both the list and preview-icon containers.
 * @returns {Promise<void>}
 */
export async function renderProject() {
  const listContainer = document.getElementById("project-list");
  const iconContainer = document.getElementById("project-preview");
  if (!listContainer || !iconContainer) return;
  try {
    const data = await fetch("./json/projects.json").then((r) => r.json());
    allProjects = data.projects;
    populateProjectViews(listContainer, iconContainer);
    initHoverEffects();
    initClickEffects(allProjects);
  } catch (error) {
    console.error("Failed to load project data:", error);
  }
}

/**
 * Builds the project list HTML and the preview-icon HTML and assigns them in one pass,
 * avoiding the repeated DOM rebuilds caused by `innerHTML +=` inside a loop.
 * @param {HTMLElement} listContainer Container for the textual project list.
 * @param {HTMLElement} iconContainer Container for the preview icons.
 * @returns {void}
 */
function populateProjectViews(listContainer, iconContainer) {
  let listHTML = "";
  let iconHTML = "";
  allProjects.forEach((project, index) => {
    listHTML += getProjectList(project);
    iconHTML += getProjectPrev(project, index, allProjects.length);
  });
  listContainer.innerHTML = listHTML;
  iconContainer.innerHTML = iconHTML;
}

/**
 * Binds hover events on every project item to toggle its preview icon.
 * @returns {void}
 */
function initHoverEffects() {
  document.querySelectorAll(".project-item").forEach(bindProjectHover);
}

/**
 * Binds mouseenter/mouseleave on a single project item to show/hide its preview icon.
 * @param {HTMLElement} item The project list item.
 * @returns {void}
 */
function bindProjectHover(item) {
  const icon = document.querySelector(`.project-icon[data-project="${item.dataset.project}"]`);
  if (!icon) return;
  item.addEventListener("mouseenter", () => icon.classList.add("visible"));
  item.addEventListener("mouseleave", () => icon.classList.remove("visible"));
}

/**
 * Binds click handlers on every project item to open the project overlay.
 * @param {Array<Object>} projects The full project list.
 * @returns {void}
 */
function initClickEffects(projects) {
  document.querySelectorAll(".project-item").forEach((item, index) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      const nextIndex = (index + 1) % projects.length;
      renderOverlay(projects[index], projects[nextIndex].title);
    });
  });
}

/**
 * Injects the project overlay into the body and wires up its backdrop-click close handler.
 * @param {Object} projectData The project to display.
 * @param {string} nextProjectName Title of the following project (for the "next" button).
 * @returns {void}
 */
function renderOverlay(projectData, nextProjectName) {
  const existing = document.getElementById("project-overlay");
  if (existing) existing.remove();
  document.body.insertAdjacentHTML("beforeend", getOverlay(projectData, nextProjectName, getIsEnglish()));
  document.body.style.overflowY = "hidden";
  const overlay = document.getElementById("project-overlay");
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });
}

/**
 * Opens the overlay for the project that follows the given one in the list.
 * @param {string} projectName Title of the currently displayed project.
 * @returns {void}
 */
export function openNextProject(projectName) {
  const index = allProjects.findIndex((p) => p.title === projectName);
  const nextIndex = (index + 1) % allProjects.length;
  renderOverlay(allProjects[index], allProjects[nextIndex].title);
}

/**
 * Removes the project overlay and restores body scroll and opacity.
 * @param {boolean} [isBackAction=false] Set to true when invoked as part of a popstate flow to suppress an extra `history.back()`.
 * @returns {void}
 */
export function closeOverlay(isBackAction = false) {
  const overlay = document.getElementById("project-overlay");
  if (!overlay) return;
  overlay.remove();
  document.body.style.overflowY = "auto";
  document.body.style.opacity = 1;
  if (!isBackAction && window.location.hash === "#projects") {
    history.back();
  }
}

// Inline handlers inside the overlay template call these as globals; expose them.
window.closeOverlay = closeOverlay;
window.openNextProject = openNextProject;

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOverlay();
});
