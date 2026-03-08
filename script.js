// Mouse gradient effect
document.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--cursor-x", e.clientX + "px");
  document.documentElement.style.setProperty("--cursor-y", e.clientY + "px");
});

document.addEventListener('mouseleave', () => {
  document.documentElement.style.setProperty('--cursor-opacity', '0');
});

document.addEventListener('mouseenter', () => {
  document.documentElement.style.setProperty('--cursor-opacity', '1');
});


// Language switch 
const wrapper = document.querySelector('.lang-wrapper');
let isDE = false;
let isClicking = false;

const show = (selector) => {
  document.querySelectorAll('.lang-img').forEach(img => img.style.opacity = '0');
  document.querySelector(selector).style.opacity = '1';
};

show('.lang-en-default');

wrapper.addEventListener('mouseenter', () => {
  show(isDE ? '.lang-de-hover' : '.lang-en-hover');
});

wrapper.addEventListener('mouseleave', () => {
  if (isClicking) return;
  show(isDE ? '.lang-de-default' : '.lang-en-default');
});

wrapper.addEventListener('mousedown', () => {
  isClicking = true;
});

wrapper.addEventListener('click', () => {
  isDE = !isDE;
  show(isDE ? '.lang-de-hover' : '.lang-en-hover');
  setTimeout(() => { isClicking = false; }, 50);
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
