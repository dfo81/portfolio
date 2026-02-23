// Maus-Gradient Effekt
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
  document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
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


document.querySelectorAll('.marquee-button').forEach(button => {
  const content = button.querySelector('.marquee-content');
  const spans = content.querySelectorAll('span');
  const textWidth = spans[0].offsetWidth;
  const buttonWidth = button.offsetWidth;

  const gap = buttonWidth + 20;
  const translateAmount = -(textWidth + gap);
  const speed = 90; // px/s

  // Duration auf exakt ganzzahlige Frameanzahl (60hz) anpassen
  const rawDuration = Math.abs(translateAmount) / speed;
  const frames = Math.round(rawDuration * 60);
  const duration = frames / 60;

  content.style.setProperty('--marquee-gap', gap + 'px');
  content.style.setProperty('--marquee-translate', translateAmount + 'px');
  button.style.setProperty('--marquee-duration', duration + 's');
});