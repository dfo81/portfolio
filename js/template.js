const getProjectList = (project) => { 
  const techList = project.technologies
    .map(tech => tech.name)
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

const getProjectPrev = (project, index, total) => {
  // Berechnet die vertikale Position basierend auf dem Index
  const positions = ["top-1", "top-1/3", "top-3/5", "top-3/4"];
  const posClass = positions[index] || "top-0";

  return `
    <div class="project-icon ${posClass}" data-project="${project.title.toLowerCase()}">
      <img src="/assets/img/icons/sub_bg.svg" alt="" />
      <img class="absolute -top-5 -left-5" src="${project.image}" alt="${project.title}" />
    </div>
  `;
};

const getOverlay = (project, nextProjectName) => {
  // 1. Die richtige Beschreibung wählen
  const description = isEnglish ? project.content.en.decription : project.content.de.decription;
  
  // 2. Statische Texte basierend auf isEnglish wählen
  const headline = isEnglish ? "What is this project about?" : "Worum geht es in diesem Projekt?";
  const nextText = isEnglish ? "Next Project" : "Nächstes Projekt";

  const techHtml = project.technologies.map(tech => `
    <div class="tech-item">
      <img src="${tech.icon}" alt="" />
      <span>${tech.name}</span>
    </div>
  `).join('');

  return `
    <div id="project-overlay" class="fixed inset-0 w-full h-full z-100 items-center justify-center">
      <div class="overlay">
        <div class="flex h-full flex-col w-1/2 justify-between">
          <div class="flex flex-col">
            <h1 class="text-9xl font-bold text-accent tracking-tight">${String(project.id).padStart(2, '0')}</h1>
            <h2 class="text-6xl font-second-bold tracking-tight">${project.title}</h2>
          </div>
          <div class="flex flex-col gap-6">
            <h3 class="font-second-bold text-2xl text-accent">${headline}</h3>
            <span>${description}</span>
            <div class="flex gap-4">${techHtml}</div>
          </div>
          <div class="flex gap-8">
            <a href="${project.links.github}" target="_blank" class="overlay-button">GitHub <img src="/assets/img/icons/arrow_outward_aquamarine.svg" /></a>
            <a href="${project.links.liveTest}" target="_blank" class="overlay-button">Live Test <img src="/assets/img/icons/arrow_outward_aquamarine.svg" /></a>
          </div>
        </div>
        <div class="w-1/2 h-full flex flex-col items-end justify-between">
          <div onclick="closeOverlay()" class="group w-12 cursor-pointer relative">
            <img src="/assets/img/icons/x_default.svg" />
            <img class="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity" src="/assets/img/icons/x_hover.svg">
          </div>
          
          <img class="w-full" src="${project.image}" alt="" />

          <div onclick="openNextProject('${nextProjectName}')" class="group flex gap-2 cursor-pointer items-center text-accent text-2xl hover:text-white duration-200 ease">
            <span>${nextText}</span>
            <img class="transition-transform duration-200 ease group-hover:translate-x-1 group-hover:scale-[1.1]" src="/assets/img/icons/arrow_forward_hover.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  `;
};