// Shared static-site behaviour for the promoted CGL site.
(function () {
  const year = new Date().getFullYear();
  document.querySelectorAll(".year").forEach((el) => {
    el.textContent = year;
  });

  const grid = document.getElementById("gamesGrid");
  if (!grid) return;

  const count = document.getElementById("filterCount");
  const empty = document.getElementById("emptyState");
  const chips = Array.from(document.querySelectorAll("[data-filter]"));

  const games = [
    {
      title: "The Poll",
      slug: "the-poll",
      domain: "governance",
      year: "2018",
      image: "assets/img/games/the-poll.png",
      desc: "Public opinion, persuasion, and electoral behaviour as a playable civic system."
    },
    {
      title: "Fix It!",
      slug: "fix-it",
      domain: "governance",
      year: "2019",
      image: "assets/img/games/fix-it.png",
      desc: "Urban air pollution, land use, regulation, and stakeholder trade-offs."
    },
    {
      title: "Reset / Better World",
      slug: "reset-better-world",
      domain: "governance",
      year: "2020",
      image: "assets/img/games/gameplay-general.png",
      desc: "A futures simulation for rebuilding institutions under uncertainty and shocks."
    },
    {
      title: "Engines of Growth",
      slug: "engines-of-growth",
      domain: "governance",
      year: "2021",
      image: "assets/img/games/engines-of-growth.png",
      desc: "Policy, skills, finance, infrastructure, and MSME ecosystem growth."
    },
    {
      title: "Chuppi Todo",
      slug: "chuppi-todo",
      domain: "health",
      year: "2021",
      image: "assets/img/games/chuppi-todo.png",
      desc: "Domestic violence literacy, referral pathways, and frontline response practice."
    },
    {
      title: "Poshan ki Potli",
      slug: "poshan-ki-potli",
      domain: "health",
      year: "2022",
      image: "assets/img/games/poshan-ki-potli.jpg",
      desc: "Nutrition literacy through food groups, local recipes, and dietary diversity."
    },
    {
      title: "Purak Ahaar",
      slug: "purak-ahaar",
      domain: "health",
      year: "2022",
      image: "assets/img/games/purak-ahaar.png",
      desc: "Complementary nutrition and early-life food practices as a playable framework."
    },
    {
      title: "Farzi",
      slug: "farzi",
      domain: "digital",
      year: "2020",
      image: "assets/img/games/farzi.png",
      desc: "Misinformation, verification, and social incentives as a community game."
    },
    {
      title: "Kartik",
      slug: "kartik",
      domain: "governance",
      year: "2020",
      image: "assets/img/games/kartik.png",
      desc: "Character-driven civic exploration through democratic decision contexts."
    },
    {
      title: "Kritika",
      slug: "kritika",
      domain: "digital",
      year: "2020",
      image: "assets/img/games/kritika.png",
      desc: "Digital rights, youth agency, and civic action as a playable system."
    },
    {
      title: "It's in the Water",
      slug: "its-in-the-water",
      domain: "health",
      year: "2023",
      image: "assets/img/games/its-in-the-water.png",
      desc: "A civic water story that surfaces behaviour, incentives, and risk."
    },
    {
      title: "Climate Crusaders",
      slug: "climate-crusaders",
      domain: "climate",
      year: "2023",
      image: "assets/img/games/climate-crusaders.png",
      desc: "Spot climate signals through riddles and rapid recognition."
    },
    {
      title: "Climate Quest",
      slug: "climate-quest",
      domain: "climate",
      year: "2023",
      image: "assets/img/games/climate-quest.png",
      desc: "Causes, effects, and actions for building climate vocabulary."
    },
    {
      title: "Gram Vikas",
      slug: "gram-vikas",
      domain: "governance",
      year: "2024",
      image: "assets/img/games/gram-vikas.png",
      desc: "Panchayat governance simulation for planning, budgets, roles, and trade-offs."
    },
    {
      title: "Splinternet",
      slug: "splinternet",
      domain: "digital",
      year: "2024",
      image: "assets/img/games/splinternet.png",
      desc: "Geopolitics of internet fragmentation as a rules-based playable system."
    },
    {
      title: "Digital Naagrik",
      slug: "digital-naagrik",
      domain: "digital",
      year: "2024",
      image: "assets/img/games/digital-naagrik.png",
      desc: "Digital citizenship, rights, responsibilities, and platform behaviour."
    },
    {
      title: "Water Management",
      slug: "water-management",
      domain: "governance",
      year: "2024",
      image: "assets/img/games/gameplay-general.png",
      desc: "Commons governance, allocation, and scarcity as a playable decision space."
    }
  ];

  let active = "all";

  function card(game) {
    return `
      <article class="game-card" data-domain="${game.domain}">
        <a href="games/${game.slug}.html" aria-label="Open ${game.title}">
          <div class="game-card-media">
            <img src="${game.image}" alt="${game.title} cover" loading="eager" decoding="async">
          </div>
          <div class="game-card-body">
            <div class="game-card-kicker">${game.domain} · ${game.year}</div>
            <h2 class="game-card-title">${game.title}</h2>
            <p class="game-card-desc">${game.desc}</p>
          </div>
        </a>
      </article>`;
  }

  function render() {
    const visible = games.filter((game) => active === "all" || game.domain === active);
    grid.innerHTML = visible.map(card).join("");
    if (empty) empty.style.display = visible.length ? "none" : "";
    if (count) count.textContent = `${visible.length} shown`;
  }

  chips.forEach((button) => {
    button.addEventListener("click", () => {
      chips.forEach((chip) => chip.classList.remove("is-active"));
      button.classList.add("is-active");
      active = button.getAttribute("data-filter") || "all";
      render();
    });
  });

  render();
})();
