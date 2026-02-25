const PX_PER_SECOND = { out: 200, in: 1300 };

const getScrollDuration = (width, speed) => width / speed;

const startScroll = (content, text) => {
  const contentDuration = getScrollDuration(content.offsetWidth, PX_PER_SECOND.out);
  const textDuration = getScrollDuration(text.offsetWidth * 2, PX_PER_SECOND.out);

  content.style.animation = `scrollOut ${contentDuration}s linear forwards`;
  text.style.animation = `scroll ${textDuration}s linear ${contentDuration}s infinite`;
};

const stopScroll = (content, text) => {
  const duration = getScrollDuration(content.offsetWidth, PX_PER_SECOND.in);

  content.style.animation = `scrollIn ${duration}s linear forwards`;
  text.style.animation = "none";
};

const initWrapper = (wrapper) => {
  const content = wrapper.querySelector(".content");
  const text = wrapper.querySelector(".scroll-text");

  wrapper.addEventListener("mouseenter", () => startScroll(content, text));
  wrapper.addEventListener("mouseleave", () => stopScroll(content, text));
};

document.querySelectorAll(".wrapper").forEach(initWrapper);