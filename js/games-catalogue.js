// js/games-catalogue.js
(function () {
  const grid = document.getElementById("gamesGrid");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".game-card"));
  const chips = Array.from(document.querySelectorAll("[data-filter]"));
  const search = document.getElementById("gameSearch");

  let active = "all";
  let q = "";

  function apply() {
    const query = q.trim().toLowerCase();

    cards.forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const title = (card.getAttribute("data-title") || "").toLowerCase();

      const passFilter = active === "all" ? true : tags.includes(active);
      const passSearch = query ? (title.includes(query) || tags.includes(query)) : true;

      card.style.display = (passFilter && passSearch) ? "" : "none";
    });
  }

  chips.forEach((btn) => {
    btn.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("is-active"));
      btn.classList.add("is-active");
      active = btn.getAttribute("data-filter") || "all";
      apply();
    });
  });

  if (search) {
    search.addEventListener("input", (e) => {
      q = e.target.value || "";
      apply();
    });
  }

  apply();
})();