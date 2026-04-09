getOverlay = () =>
    `<div id="project-overlay" class="fixed inset-0 w-full h-full z-100 items-center justify-center">
      <div class="overlay">
      <div class="flex h-full flex-col w-1/2 justify-between">
        <div class="flex flex-col">
          <h1 class="text-9xl font-bold text-accent tracking-tight">01</h1>
          <h2 class="text-6xl font-second-bold tracking-tight">Join</h2>
        </div>
        <div class="flex flex-col gap-6">
          <h3 class="font-second-bold text-2xl text-accent">What is this project about?</h3>
          <span>Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.</span>
          <div class="flex gap-4">
            <div class="tech-item">
              <img src="/assets/img/icons/css.svg" alt="" />
              <span>CSS</span>
            </div>
            <div class="tech-item">
              <img src="/assets/img/icons/html.svg" alt="" />
              <span>HTML</span>
            </div>
            <div class="tech-item">
              <img src="/assets/img/icons/javascript.svg" alt="" />
              <span>JavaScript</span>
            </div>
            <div class="tech-item">
              <img src="/assets/img/icons/firebase.svg" alt="" />
              <span>Firebase</span>
            </div>
          </div>
        </div>
        <div class="flex gap-8">
          <div class="overlay-button">
            GitHub
            <img src="/assets/img/icons/arrow_outward_aquamarine.svg" alt="" />
          </div>
          <div class="overlay-button">
            Live Test
            <img src="/assets/img/icons/arrow_outward_aquamarine.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="w-1/2 h-full flex flex-col items-end justify-between">
        <div onclick="closeOverlay()" class="group w-12 cursor-pointer relative">
          <img src="/assets/img/icons/x_default.svg" alt="" />
          <img class="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease" src="/assets/img/icons/x_hover.svg" alt="">
        </div>
        <img class="w-full" src="/assets/img/icons/sub_join.svg" alt="" />
        <div class="group flex gap-2 cursor-pointer items-center text-accent text-2xl hover:text-white duration-200 ease">
          Next Project
          <img class="transition-transform duration-200 ease group-hover:translate-x-1 group-hover:scale-[1.1]" src="/assets/img/icons/arrow_forward_hover.svg" alt="" />
        </div>
      </div>
     </div>
    </div>
      `
      ;
      