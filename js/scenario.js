// js/scenarios.js
(() => {
  "use strict";

  // -----------------------------
  // Scenario rotator (top section)
  // -----------------------------
  const rotator = document.querySelector('[data-rotator="scenarios"]');

  if (rotator) {
    const panels = Array.from(rotator.querySelectorAll(".scenario-panel"));
    const dots = Array.from(rotator.querySelectorAll(".dot"));
    const pauseBtn = rotator.querySelector('[data-action="pause"]');

    let idx = 0;
    let isPaused = false;
    let timer = null;
    const INTERVAL_MS = 6500;

    const setActive = (nextIdx) => {
      idx = nextIdx;
      panels.forEach((p, i) => p.classList.toggle("is-active", i === idx));
      dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    };

    const next = () => setActive((idx + 1) % panels.length);

    const start = () => {
      stop();
      timer = window.setInterval(() => {
        if (!isPaused) next();
      }, INTERVAL_MS);
    };

    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const n = Number(dot.getAttribute("data-dot"));
        if (!Number.isNaN(n)) setActive(n);
      });
    });

    if (pauseBtn) {
      pauseBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? "Play" : "Pause";
      });
    }

    // Pause on hover (doesn't change layout)
    rotator.addEventListener("mouseenter", () => {
      isPaused = true;
      if (pauseBtn) pauseBtn.textContent = "Play";
    });
    rotator.addEventListener("mouseleave", () => {
      isPaused = false;
      if (pauseBtn) pauseBtn.textContent = "Pause";
    });

    setActive(0);
    start();
  }

  // ---------------------------------------
  // Branching flow diagram (end-of-page)
  // ---------------------------------------
  const flow = document.querySelector(".flow");

  if (flow) {
    const nodes = Array.from(flow.querySelectorAll(".flow-node"));
    const detail = flow.querySelector("[data-detail]");

    const copy = {
      research: {
        title: "Research",
        text:
          "Ground the system in evidence. Field inquiry, sector reading, policy context, and institutional constraints."
      },
      signals: {
        title: "Signals",
        text:
          "Identify early indicators of change. Regulation, capital movement, adoption curves, ecological stress, trust shifts."
      },
      whatif: {
        title: "What-If",
        text:
          "Introduce disciplined counterfactual pressure. Define the shock condition the system must absorb."
      },
      ifthen: {
        title: "If-Then",
        text:
          "Trace branching consequences. Map second and third order effects across interconnected variables."
      },
      rules: {
        title: "Rules",
        text:
          "Encode assumptions as constraints. Budgets, time, policy limits, capacity ceilings, political trade-offs."
      },
      dilemmas: {
        title: "Dilemmas",
        text:
          "Make trade-offs explicit. Speed vs consultation, efficiency vs equity, survival vs resilience."
      },
      stakeholders: {
        title: "Stakeholders",
        text:
          "Define roles and incentives. Position actors with real constraints and competing objectives."
      },
      stress: {
        title: "Stress-Test",
        text:
          "Run the rehearsal. Decisions are made inside constraint. Consequences follow. Outputs become legible."
      }
    };

    const setNode = (key) => {
      nodes.forEach((n) =>
        n.classList.toggle("is-active", n.getAttribute("data-node") === key)
      );

      if (!detail) return;

      const payload = copy[key] || copy.research;
      detail.innerHTML =
        `<p class="flow-title">${payload.title}</p>` +
        `<p class="flow-text">${payload.text}</p>`;
    };

    nodes.forEach((n) => {
      const key = n.getAttribute("data-node") || "research";

      n.setAttribute("tabindex", "0");
      n.setAttribute("role", "button");
      n.setAttribute("aria-label", `Flow node: ${key}`);

      n.addEventListener("click", () => setNode(key));
      n.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setNode(key);
        }
      });
    });

    setNode("research");
  }
})();