// js/pages/index.js
(() => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const willOpen = !navLinks.classList.contains("open");
      navLinks.classList.toggle("open", willOpen);
      navToggle.setAttribute("aria-expanded", String(willOpen));
    });
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Hero rotator
  const heroRotator = document.getElementById("heroRotator");
  const heroLines = [
    "From research to deployment. From story to system.",
    "Structured play as decision infrastructure.",
    "Systems you can enter, test, and rehearse.",
    "Better vocabulary. Better decisions."
  ];
  let heroIdx = 0;

  function setHeroLine(next) {
    if (!heroRotator) return;
    heroRotator.classList.add("fade");
    heroRotator.classList.remove("show");
    window.setTimeout(() => {
      heroRotator.textContent = next;
      heroRotator.classList.add("show");
    }, 160);
  }

  if (heroRotator) {
    heroRotator.classList.add("fade", "show");
    window.setInterval(() => {
      heroIdx = (heroIdx + 1) % heroLines.length;
      setHeroLine(heroLines[heroIdx]);
    }, 5200);
  }

  // What-if / If-then data
  const WHATIFS = [
    {
      text: "What if a district faces two consecutive years of climate stress and migration accelerates?",
      branch: [
        { pill: "IF", line: "IF revenue drops while demand for services rises", meta: "Signal: budget compression and service strain." },
        { pill: "THEN", line: "THEN planning priorities shift and conflict over allocation increases", meta: "Second-order: legitimacy and compliance risks." },
        { pill: "STAKEHOLDERS", line: "Elected reps, officials, youth, SHGs, local media, contractors", meta: "Power asymmetries shape what gets funded." },
        { pill: "DILEMMA", line: "Immediate relief versus structural adaptation", meta: "Short-term fixes can weaken long-term resilience." }
      ]
    },
    {
      text: "What if trust declines and participation drops in a community intervention?",
      branch: [
        { pill: "IF", line: "IF participation is perceived as extractive or performative", meta: "Signal: attendance falls and rumours rise." },
        { pill: "THEN", line: "THEN uptake declines and backlash becomes likely", meta: "Second-order: reputational and operational risk." },
        { pill: "STAKEHOLDERS", line: "Community leaders, frontline staff, beneficiaries, local gatekeepers", meta: "Trust intermediaries become decisive." },
        { pill: "DILEMMA", line: "Speed of rollout versus procedural legitimacy", meta: "Fast execution can reduce long-term adoption." }
      ]
    },
    {
      text: "What if a policy incentive produces compliance theatre instead of outcomes?",
      branch: [
        { pill: "IF", line: "IF metrics reward checklist completion over quality", meta: "Signal: reporting improves while reality does not." },
        { pill: "THEN", line: "THEN frontline behaviour shifts to gaming the system", meta: "Second-order: trust erosion and weaker services." },
        { pill: "STAKEHOLDERS", line: "Frontline workers, supervisors, auditors, beneficiaries, leaders", meta: "Incentives up the chain drive behaviour." },
        { pill: "DILEMMA", line: "Ease of verification versus real-world complexity", meta: "Rigid metrics can punish honest reporting." }
      ]
    }
  ];

  let currentIndex = -1;
  const whatifText = document.getElementById("whatifText");
  const hintText = document.getElementById("hintText");
  const ifthenBtn = document.getElementById("btnIfThen");
  const genBtn = document.getElementById("btnGenerate");
  const ifthenPanel = document.getElementById("ifthenPanel");
  const branchArea = document.getElementById("branchArea");

  function render() {
    if (currentIndex < 0) return;
    const item = WHATIFS[currentIndex];
    if (whatifText) whatifText.textContent = item.text;

    const isOpen = ifthenPanel?.classList.contains("open");
    if (!isOpen) {
      if (hintText) hintText.textContent = "IF-THEN stays closed unless you choose to open it.";
      if (branchArea) branchArea.innerHTML = "";
      if (ifthenPanel) ifthenPanel.setAttribute("aria-hidden", "true");
      if (ifthenBtn) ifthenBtn.setAttribute("aria-expanded", "false");
      return;
    }

    if (branchArea) {
      branchArea.innerHTML = item.branch.map(b => `
        <div class="branch-row">
          <div class="pill">${b.pill}</div>
          <div class="content">
            <div class="line">${b.line}</div>
            <div class="meta">${b.meta}</div>
          </div>
        </div>
      `).join("");
    }

    if (hintText) hintText.textContent = "This is a miniature rehearsal. Full engagements ground branches in research and institutional constraints.";
    if (ifthenPanel) ifthenPanel.setAttribute("aria-hidden", "false");
    if (ifthenBtn) ifthenBtn.setAttribute("aria-expanded", "true");
  }

  function nextWhatIf() {
    currentIndex = (currentIndex + 1) % WHATIFS.length;
    render();
  }

  if (genBtn) {
    genBtn.addEventListener("click", () => {
      if (currentIndex === -1) currentIndex = 0;
      else nextWhatIf();
      render();
    });
  }

  if (ifthenBtn && ifthenPanel) {
    ifthenBtn.addEventListener("click", () => {
      if (currentIndex === -1) currentIndex = 0;
      const willOpen = !ifthenPanel.classList.contains("open");
      ifthenPanel.classList.toggle("open", willOpen);
      render();
    });
  }

  // Initialize with first prompt visible, IF-THEN closed
  if (WHATIFS.length && whatifText) {
    currentIndex = 0;
    ifthenPanel?.classList.remove("open");
    render();
  }

  // Supporters scroll
  const supTrack = document.getElementById("supportersTrack");
  const supPrev = document.getElementById("supPrev");
  const supNext = document.getElementById("supNext");

  function scrollSupporters(dir) {
    if (!supTrack) return;
    supTrack.scrollBy({ left: dir * 260, behavior: "smooth" });
  }

  supPrev?.addEventListener("click", () => scrollSupporters(-1));
  supNext?.addEventListener("click", () => scrollSupporters(1));
})();