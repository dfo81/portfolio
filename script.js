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



// Project icons visibility
const projectItems = document.querySelectorAll('.project-item');

projectItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const key = item.dataset.project;
    document.querySelector(`.project-icon[data-project="${key}"]`).classList.add('visible');
  });

  item.addEventListener('mouseleave', () => {
    const key = item.dataset.project;
    document.querySelector(`.project-icon[data-project="${key}"]`).classList.remove('visible');
  });
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



const cards = Array.from(document.querySelectorAll(".card"));
const order = [2, 0, 1]; // slots: left, center, right
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

  // Karte die rausfliegt sofort auf far-Seite teleportieren
  const exitIndex = order[dir === 1 ? 0 : 2]; // left raus bei next, right raus bei prev
  cards[exitIndex].className = "card " + (dir === 1 ? "far-right" : "far-left");

  // Reihenfolge rotieren
  if (dir === 1) order.push(order.shift());
  else           order.unshift(order.pop());

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      applyClasses();
      updateDots();
      setTimeout(() => { isAnimating = false; }, 500);
    });
  });
}

const dots = document.querySelectorAll(".dot");

function updateDots() {
  const centerIndex = order[1]; // wer ist gerade center?
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === centerIndex);
  });
}

applyClasses();
updateDots();
document.querySelector(".arrow-forward-default").parentElement.addEventListener("click", () => go(1));
document.querySelector(".arrow-back-default").parentElement.addEventListener("click", () => go(-1));

// checkbox changes
document.querySelectorAll('.checkbox').forEach(el => {
  el.addEventListener('click', () => el.classList.toggle('active'));
});