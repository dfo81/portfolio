// Maus-Gradient Effekt
const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
  cursorFollower.style.left = (e.clientX - 150) + 'px';
  cursorFollower.style.top = (e.clientY - 150) + 'px';
});

document.addEventListener('mouseleave', () => {
  cursorFollower.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursorFollower.style.opacity = '1';
});

