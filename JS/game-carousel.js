// js/game-carousel.js
(function () {
  const carousels = document.querySelectorAll("[data-carousel]");
  if (!carousels.length) return;

  carousels.forEach((root) => {
    const track = root.querySelector(".car-track");
    const items = Array.from(root.querySelectorAll(".car-item"));
    const prev = root.querySelector("[data-prev]");
    const next = root.querySelector("[data-next]");
    const dotsWrap = root.querySelector("[data-dots]");

    if (!track || items.length === 0) return;

    let index = 0;

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = items.map((_, i) =>
        `<button class="car-dot ${i === 0 ? "is-active" : ""}" type="button" aria-label="Go to slide ${i+1}" data-dot="${i}"></button>`
      ).join("");
      dotsWrap.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-dot]");
        if (!btn) return;
        index = Number(btn.getAttribute("data-dot"));
        render();
      });
    }

    function setButtons() {
      if (prev) prev.disabled = index <= 0;
      if (next) next.disabled = index >= items.length - 1;
    }

    function setDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll(".car-dot").forEach((d, i) => {
        d.classList.toggle("is-active", i === index);
      });
    }

    function render() {
      const itemWidth = items[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap || "0");
      const x = (itemWidth + gap) * index;
      track.style.transform = `translateX(${-x}px)`;
      setButtons();
      setDots();
    }

    function bind() {
      if (prev) prev.addEventListener("click", () => { index = Math.max(0, index - 1); render(); });
      if (next) next.addEventListener("click", () => { index = Math.min(items.length - 1, index + 1); render(); });
      window.addEventListener("resize", render, { passive: true });
    }

    buildDots();
    bind();
    render();
  });
})();