// Mouse gradient effect
document.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--cursor-x", e.clientX + "px");
  document.documentElement.style.setProperty("--cursor-y", e.clientY + "px");
});


// Language switch 
const langBtn = document.querySelector('.lang-btn');
let isDE = false;

const imgs = {
  en_default: '/assets/img/icons/lang_switch_default.svg',
  en_hover: '/assets/img/icons/lang_switch_default_hover.svg',
  de_default: '/assets/img/icons/lang_switch_german.svg',
  de_hover: '/assets/img/icons/lang_switch_german_hover.svg',
}

langBtn.addEventListener('mouseenter', () => {
  langBtn.src = isDE ? imgs.de_hover : imgs.en_hover;
});

langBtn.addEventListener('mouseleave', () => {
  langBtn.src = isDE ? imgs.de_default : imgs.en_default;
});

langBtn.addEventListener('click', () => {
  isDE = !isDE;
  langBtn.src = isDE ? imgs.de_hover : imgs.en_hover;
});




// Dark / Ligth mode
/* const toggle = document.querySelector('#theme-toggle');

toggle.addEventListener('click', () => {
  const html = document.documentElement;
  if (html.dataset.theme === 'light') {
    html.dataset.theme = 'dark';
  } else {
    html.dataset.theme = 'light';
  }
}); */
