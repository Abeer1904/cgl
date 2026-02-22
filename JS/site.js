// js/site.js
// Practical JS only: search + live count (no rendering)

(function () {
  const grid = document.getElementById("gamesGrid");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll("[data-game]"));
  const search = document.getElementById("gamesSearch");
  const count = document.getElementById("gamesCount");
  const empty = document.getElementById("gamesEmpty");

  function updateCount(visibleCards) {
    const n = visibleCards.length;
    count.textContent = `${n} game${n === 1 ? "" : "s"}`;
    empty.hidden = n !== 0;
  }

  function normalise(s) {
    return String(s || "").trim().toLowerCase();
  }

  function filter() {
    const q = normalise(search.value);
    const visible = [];

    for (const card of cards) {
      const text = normalise(card.innerText);
      const show = !q || text.includes(q);
      card.style.display = show ? "" : "none";
      if (show) visible.push(card);
    }
    updateCount(visible);
  }

  // Init
  updateCount(cards);

  if (search) {
    search.addEventListener("input", filter);
  }
})();