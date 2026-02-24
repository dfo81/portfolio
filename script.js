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
  const gap = button.offsetWidth;
  const translateAmount = -(content.querySelector('span').offsetWidth + gap);
  
  content.style.setProperty('--marquee-gap', gap + 'px');
  content.style.setProperty('--marquee-translate', translateAmount + 'px');
});

function setMarqueeDuration(button, speed = 120) {
  const translateAmount = parseFloat(button.querySelector('.marquee-content').style.getPropertyValue('--marquee-translate'));
  const frames = Math.round(Math.abs(translateAmount) / speed * 60);
  button.style.setProperty('--marquee-duration', (frames / 60) + 's');
}

document.querySelectorAll('.marquee-button').forEach(button => setMarqueeDuration(button));

// Marquee Button Mouse Leave Animation
document.querySelectorAll('.marquee-button').forEach(button => {
  button.addEventListener('mouseleave', () => {
    button.classList.add('leaving');
    
    // Entferne die "leaving" Klasse nach der Animation
    button.addEventListener('animationend', () => {
      button.classList.remove('leaving');
    }, { once: true });
  });
});