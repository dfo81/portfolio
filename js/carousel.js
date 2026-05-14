const cards = Array.from(document.querySelectorAll(".card"));
const dots = document.querySelectorAll(".dot");
const order = [2, 0, 1];
const classes = ["left", "center", "right"];
let isAnimating = false;

applyClasses();
updateDots();

const nextBtn = document.querySelector(".arrow-forward-default");
const prevBtn = document.querySelector(".arrow-back-default");

if (nextBtn && nextBtn.parentElement) {
  nextBtn.parentElement.addEventListener("click", () => go(1));
}

if (prevBtn && prevBtn.parentElement) {
  prevBtn.parentElement.addEventListener("click", () => go(-1));
}

/**
 * Re-applies the position classes (left / center / right) to all carousel cards
 * based on the current `order` array.
 * @returns {void}
 */
function applyClasses() {
  cards.forEach((card, i) => {
    card.className = "card " + classes[order.indexOf(i)];
  });
}

/**
 * Advances the carousel one step in the given direction.
 * @param {1|-1} dir 1 to advance forward, -1 to advance back.
 * @returns {void}
 */
function go(dir) {
  if (isAnimating) return;
  isAnimating = true;
  const exitIndex = order[dir === 1 ? 0 : 2];
  cards[exitIndex].className = "card " + (dir === 1 ? "far-right" : "far-left");
  if (dir === 1) order.push(order.shift());
  else order.unshift(order.pop());
  requestAnimationFrame(() => requestAnimationFrame(commitCarouselStep));
}

/**
 * Commits the carousel step after the exit class has been applied:
 * snaps the remaining cards to their new positions, then releases the animation lock.
 * @returns {void}
 */
function commitCarouselStep() {
  applyClasses();
  updateDots();
  setTimeout(() => {
    isAnimating = false;
  }, 500);
}

/**
 * Marks the dot underneath the centered carousel card as active.
 * @returns {void}
 */
function updateDots() {
  const centerIndex = order[1];
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === centerIndex);
  });
}
