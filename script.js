// Language switch 
const button = document.getElementById('toggle-btn');
let isEn = localStorage.getItem('toggleState') === 'true';

updateButton(isEn);

button.addEventListener('click', () => {
  isEn = !isEn;
  localStorage.setItem('toggleState', isEn);
  updateButton(isEn);
});

function updateButton(state) {
  button.classList.toggle('active', state);
}

// Language switch by enter keydown
button.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    button.click();
  }
});


// Hover click event
button.addEventListener('click', (e) => {
  const rect = button.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const half = rect.width / 2;

  if (isEn && clickX > half) return;
  if (!isEn && clickX < half) return;

  isEn = !isEn;
  localStorage.setItem('toggleState', isEn);
  updateButton(isEn);
});






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
