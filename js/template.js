/**
 * Returns the HTML for one entry in the textual project list.
 * @param {Object} project A project descriptor from `projects.json`.
 * @returns {string} HTML markup.
 */
export const getProjectList = (project) => {
  const techList = project.technologies
    .map((tech) => tech.name)
    .join(` <img src="/assets/img/icons/spacer.svg" alt="" /> `);
  return `
    <div class="project-item" data-project="${project.title.toLowerCase()}">
      <div class="project-title">
        <h2>${project.title}</h2>
        <img class="arrow-outward" src="/assets/img/icons/arrow_outward.svg" alt="" />
      </div>
      <div>
        ${techList}
      </div>
    </div>
  `;
};

/**
 * Returns the HTML for one preview-icon shown next to the project list.
 * @param {Object} project A project descriptor from `projects.json`.
 * @param {number} index Zero-based index of the project (controls vertical position).
 * @param {number} total Total project count (currently unused, kept for API stability).
 * @returns {string} HTML markup.
 */
export const getProjectPrev = (project, index, total) => {
  const positions = ["top-1", "top-1/3", "top-3/5", "top-3/4"];
  const posClass = positions[index] || "top-0";

  return `
    <div class="project-icon ${posClass}" data-project="${project.title.toLowerCase()}">
      <img src="/assets/img/icons/sub_bg.svg" alt="" />
      <img class="absolute -top-5 -left-5" src="${project.image}" alt="${project.title}" />
    </div>
  `;
};

/**
 * Returns the HTML for the project-detail overlay.
 * @param {Object} project The project to display.
 * @param {string} nextProjectName Title of the next project (rendered into the "Next" link).
 * @param {boolean} isEnglish Whether the UI is currently in English.
 * @returns {string} HTML markup.
 */
export const getOverlay = (project, nextProjectName, isEnglish) => {
  const description = isEnglish ? project.content.en.description : project.content.de.description;
  const headline = isEnglish ? "What is this project about?" : "Worum geht es in diesem Projekt?";
  const nextText = isEnglish ? "Next Project" : "Nächstes Projekt";
  const techHtml = project.technologies
    .map(
      (tech) => `
    <div class="tech-item">
      <img src="${tech.icon}" alt="" />
      <span>${tech.name}</span>
    </div>
  `
    )
    .join("");

  return `
    <div id="project-overlay" class="fixed inset-0 z-100 overflow-y-auto p-4 xl:overflow-hidden xl:flex xl:items-center xl:justify-center xl:p-0">
      <div class="relative w-full max-w-135 mx-auto xl:mx-0 xl:w-312 xl:max-w-none xl:h-164 xl:overflow-visible bg-[linear-gradient(45deg,var(--color-bg)_40%,var(--color-bg-second)_100%)] rounded-4xl border-1 border-accent flex flex-col xl:flex-row xl:items-stretch gap-6 xl:gap-22 px-6 py-10 xl:px-22 xl:py-20">

        <!-- Close button: absolute top-right -->
        <div onclick="closeOverlay()" class="group absolute top-5 right-5 xl:top-20 xl:right-22 w-10 xl:w-12 cursor-pointer z-20">
          <img src="/assets/img/icons/x_default.svg" />
          <img class="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity" src="/assets/img/icons/x_hover.svg">
        </div>

        <!-- Image side: first on mobile, right on desktop -->
        <div class="order-1 xl:order-2 xl:w-1/2 xl:h-full xl:flex xl:flex-col xl:items-end xl:justify-between pt-10 xl:pt-0">
          <div class="hidden xl:block h-12"></div>
          <img class="w-full max-w-123 mx-auto xl:mx-0" src="${project.image}" alt="" />
          <div onclick="openNextProject('${nextProjectName}')" class="hidden xl:flex group gap-2 cursor-pointer items-center text-accent text-2xl hover:text-white duration-200 ease">
            <span>${nextText}</span>
            <img class="transition-transform duration-200 ease group-hover:translate-x-1 group-hover:scale-[1.1]" src="/assets/img/icons/arrow_forward_hover.svg" alt="" />
          </div>
        </div>

        <!-- Text side: below image on mobile, left on desktop -->
        <div class="order-2 xl:order-1 xl:w-1/2 xl:h-full flex flex-col gap-6 xl:gap-0 xl:justify-between">
          <div class="flex flex-col">
            <h1 class="text-7xl xl:text-9xl font-bold text-accent tracking-tight">${String(project.id).padStart(2, "0")}</h1>
            <h2 class="text-4xl xl:text-6xl font-second-bold tracking-tight">${project.title}</h2>
          </div>
          <div class="flex flex-col gap-4 xl:gap-6">
            <h3 class="font-second-bold text-xl xl:text-2xl text-accent">${headline}</h3>
            <span>${description}</span>
            <div class="flex flex-wrap gap-4">${techHtml}</div>
          </div>
          <div class="flex gap-4 xl:gap-8">
            <a href="${project.links.github}" target="_blank" class="overlay-button">GitHub <img src="/assets/img/icons/arrow_outward_aquamarine.svg" /></a>
            <a href="${project.links.liveTest}" target="_blank" class="overlay-button">Live Test <img src="/assets/img/icons/arrow_outward_aquamarine.svg" /></a>
          </div>
          <div onclick="openNextProject('${nextProjectName}')" class="flex xl:hidden group gap-2 cursor-pointer items-center self-end text-accent text-xl hover:text-white duration-200 ease">
            <span>${nextText}</span>
            <img class="transition-transform duration-200 ease group-hover:translate-x-1 group-hover:scale-[1.1]" src="/assets/img/icons/arrow_forward_hover.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  `;
};
