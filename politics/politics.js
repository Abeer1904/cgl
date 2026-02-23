// js/pages/politics.js

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// What-if data (political oriented)
const WHATIFS = [
  {
    text: "What if a flagship promise becomes fiscally contested within 18 months?",
    branch: [
      { pill: "IF", line: "IF revenues tighten and administrative resistance increases", meta: "Signal: delays, cost inflation, and blame-shifting between departments." },
      { pill: "THEN", line: "THEN delivery gaps widen and credibility becomes fragile", meta: "Second-order: opposition narratives harden and beneficiary trust drops." },
      { pill: "STAKEHOLDERS", line: "Finance, line departments, local representatives, media, beneficiaries", meta: "Power dynamic: gatekeepers in implementation hold leverage." },
      { pill: "DILEMMA", line: "Protect the promise or redesign the pathway?", meta: "Trade-off between purity of messaging and practical delivery." }
    ]
  },
  {
    text: "What if cadre messaging fragments across constituencies?",
    branch: [
      { pill: "IF", line: "IF local incentives reward improvisation over coherence", meta: "Signal: contradictions across speeches, WhatsApp scripts, and rallies." },
      { pill: "THEN", line: "THEN narrative integrity weakens and internal disputes rise", meta: "Second-order: trust erosion, factionalism, and reduced mobilisation." },
      { pill: "STAKEHOLDERS", line: "Cadre, local leaders, central campaign team, volunteer networks", meta: "Information intermediaries become decisive." },
      { pill: "DILEMMA", line: "Local adaptation versus message integrity", meta: "Uniformity can reduce relevance; flexibility can break coherence." }
    ]
  },
  {
    text: "What if community engagement drops despite high outreach spend?",
    branch: [
      { pill: "IF", line: "IF participation becomes performative and people disengage", meta: "Signal: lower meeting attendance, reduced volunteer energy, rumours rise." },
      { pill: "THEN", line: "THEN mobilisation declines and feedback loops collapse", meta: "Second-order: programmes misread sentiment and policy gets mis-targeted." },
      { pill: "STAKEHOLDERS", line: "Community groups, youth, SHGs, local media nodes, field teams", meta: "Trust holders matter more than formal authority." },
      { pill: "DILEMMA", line: "Speed of rollout versus legitimacy and trust", meta: "Fast execution can produce long-term non-compliance." }
    ]
  }
];

// Module wiring
let currentIndex = 0;

const barText = document.getElementById('barText');
const barTag = document.getElementById('barTag');
const hintText = document.getElementById('hintText');
const ifthenBtn = document.getElementById('btnIfThen');
const genBtn = document.getElementById('btnGenerate');
const ifthenPanel = document.getElementById('ifthenPanel');
const branchArea = document.getElementById('branchArea');

function renderScenario() {
  const item = WHATIFS[currentIndex];
  if (barText) barText.textContent = item.text;
  if (barTag) barTag.textContent = "WHAT IF";

  const isOpen = ifthenPanel?.classList.contains('open');

  if (!isOpen) {
    if (hintText) hintText.textContent = "IF THEN stays closed unless you open it.";
    if (branchArea) branchArea.innerHTML = "";
    if (ifthenPanel) ifthenPanel.setAttribute('aria-hidden', 'true');
    if (ifthenBtn) ifthenBtn.setAttribute('aria-expanded', 'false');
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

  if (hintText) hintText.textContent = "This is a miniature rehearsal. In engagements, branches are grounded in your context, constraints, and signals.";
  if (ifthenPanel) ifthenPanel.setAttribute('aria-hidden', 'false');
  if (ifthenBtn) ifthenBtn.setAttribute('aria-expanded', 'true');
}

function nextScenario() {
  currentIndex = (currentIndex + 1) % WHATIFS.length;
  renderScenario();
}

if (genBtn) {
  genBtn.addEventListener('click', () => {
    nextScenario();
  });
}

if (ifthenBtn && ifthenPanel) {
  ifthenBtn.addEventListener('click', () => {
    const willOpen = !ifthenPanel.classList.contains('open');
    ifthenPanel.classList.toggle('open', willOpen);
    renderScenario();
  });
}

// Initial
renderScenario();