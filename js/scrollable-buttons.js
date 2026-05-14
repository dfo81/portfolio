const PX_PER_SECOND = { out: 200, in: 1300 };

/**
 * Returns the animation duration in seconds needed to travel a given pixel distance
 * at a constant pixel-per-second speed.
 * @param {number} width Distance to travel in pixels.
 * @param {number} speed Speed in pixels per second.
 * @returns {number} Duration in seconds.
 */
const getScrollDuration = (width, speed) => width / speed;

/**
 * Starts the hover-in animation on a button: the content slides out while
 * the scrolling text loops continuously after the slide-out completes.
 * @param {HTMLElement} content The static button label that slides out.
 * @param {HTMLElement} text The scrolling label that loops on hover.
 * @returns {void}
 */
const startScroll = (content, text) => {
  const contentDuration = getScrollDuration(content.offsetWidth, PX_PER_SECOND.out);
  const textDuration = getScrollDuration(text.offsetWidth * 2, PX_PER_SECOND.out);

  content.style.animation = `scrollOut ${contentDuration}s linear forwards`;
  text.style.animation = `scroll ${textDuration}s linear ${contentDuration}s infinite`;
};

/**
 * Reverses the hover animation: slides the static content back into view
 * and cancels the scrolling text loop.
 * @param {HTMLElement} content The static button label that slides back in.
 * @param {HTMLElement} text The scrolling label whose animation will be cleared.
 * @returns {void}
 */
const stopScroll = (content, text) => {
  const duration = getScrollDuration(content.offsetWidth, PX_PER_SECOND.in);

  content.style.animation = `scrollIn ${duration}s linear forwards`;
  text.style.animation = "none";
};

/**
 * Wires the mouseenter/mouseleave handlers on a single button wrapper.
 * @param {HTMLElement} wrapper A `.button-wrapper` element.
 * @returns {void}
 */
const initWrapper = (wrapper) => {
  const content = wrapper.querySelector(".content");
  const text = wrapper.querySelector(".scroll-content");

  wrapper.addEventListener("mouseenter", () => startScroll(content, text));
  wrapper.addEventListener("mouseleave", () => stopScroll(content, text));
};

document.querySelectorAll(".button-wrapper").forEach(initWrapper);
