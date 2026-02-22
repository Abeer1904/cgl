// js/sigma.js
(function () {
  const featured = [
    // Issue 1 examples you listed earlier; replace hrefs once you have stable URLs
    { title: "The Octopus", author: "Add author", section: "Storytelling", href: "#" },
    { title: "The Ghost", author: "Add author", section: "Storytelling", href: "#" },
    { title: "Grandmother’s Tale", author: "Add author", section: "Storytelling", href: "#" },
    { title: "Exploring Habitat Futures", author: "Add author", section: "Imagination", href: "#" },
    { title: "Democracy’s Handmaiden: Humour", author: "Add author", section: "Imagination", href: "#" },
    { title: "Luma World: Why Analogue Games", author: "Add author", section: "Games", href: "#" },
    { title: "Kreeda: Bringing Back the Magic", author: "Add author", section: "Games", href: "#" },
    { title: "Reviving Dastangoi", author: "Add author", section: "Multimedia & Arts", href: "#" },
    { title: "Social Change Through Interactive Storytelling", author: "Add author", section: "Multimedia & Arts", href: "#" },
  ];

  function qs(sel, root = document) { return root.querySelector(sel); }
  function qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

  function buildFeaturedCarousel() {
    const track = qs('[data-carousel-id="sigmaFeatured"] .carousel-track');
    if (!track) return;

    track.innerHTML = featured.map((item) => {
      const safeTitle = escapeHtml(item.title);
      const safeAuthor = escapeHtml(item.author);
      const safeSection = escapeHtml(item.section);
      const href = item.href || "#";

      return `
        <article class="card slide" role="listitem">
          <span class="tag">${safeSection}</span>
          <h3>${safeTitle}</h3>
          <p class="byline">${safeAuthor}</p>
          <a href="${href}">Open piece →</a>
        </article>
      `;
    }).join("");
  }

  function attachCarouselControls() {
    const controls = qsa('[data-carousel="sigmaFeatured"]');
    const track = qs('[data-carousel-id="sigmaFeatured"] .carousel-track');
    if (!track || controls.length === 0) return;

    controls.forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        const card = track.querySelector(".slide");
        const step = card ? (card.getBoundingClientRect().width + 12) : 320;

        if (action === "prev") {
          track.scrollBy({ left: -step, behavior: "smooth" });
        } else {
          track.scrollBy({ left: step, behavior: "smooth" });
        }
      });
    });
  }

  function autoRotateFeatured() {
    const track = qs('[data-carousel-id="sigmaFeatured"] .carousel-track');
    if (!track) return;

    let timer = null;
    const intervalMs = 6500;

    function start() {
      stop();
      timer = setInterval(() => {
        const card = track.querySelector(".slide");
        const step = card ? (card.getBoundingClientRect().width + 12) : 320;

        // If near the end, loop back gently
        const maxScroll = track.scrollWidth - track.clientWidth - 8;
        if (track.scrollLeft >= maxScroll) {
          track.scrollTo({ left: 0, behavior: "smooth" });
          return;
        }
        track.scrollBy({ left: step, behavior: "smooth" });
      }, intervalMs);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    // Pause rotation on user interaction
    track.addEventListener("mouseenter", stop);
    track.addEventListener("mouseleave", start);
    track.addEventListener("touchstart", stop, { passive: true });
    track.addEventListener("touchend", start, { passive: true });

    start();
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // Init
  document.addEventListener("DOMContentLoaded", () => {
    buildFeaturedCarousel();
    attachCarouselControls();
    autoRotateFeatured();
  });
})();