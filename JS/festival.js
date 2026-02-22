// js/tacf.js
(function () {
  function qs(sel, root = document) { return root.querySelector(sel); }

  // Lightweight marquee animation
  const track = qs("[data-marquee]");
  if (track) {
    let x = 0;
    const speed = 0.35; // slow, non-overwhelming

    function tick() {
      x -= speed;
      const first = track.firstElementChild;
      if (first) {
        const firstWidth = first.getBoundingClientRect().width + 10; // gap
        // When we've shifted past one item, reset x to keep loop stable
        if (Math.abs(x) >= firstWidth) x += firstWidth;
      }
      track.style.transform = `translate3d(${x}px,0,0)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Mailto form helper (no backend)
  window.TACF = window.TACF || {};
  window.TACF.mailto = function (form) {
    const org = (form.org?.value || "").trim();
    const audience = (form.audience?.value || "").trim();
    const city = (form.city?.value || "").trim();
    const format = (form.format?.value || "").trim();
    const goals = (form.goals?.value || "").trim();

    const subject = encodeURIComponent(`TACF request: ${org || "Organisation"}`);
    const body = encodeURIComponent(
`Hello Civic Games Lab,

We would like to host TACF.

Organisation: ${org}
Audience: ${audience}
City: ${city}
Preferred format: ${format}

Goals / themes:
${goals}

Please share the deck / proposal and next steps.

Thanks,`
    );

    // Replace with your real email later
    const to = "civicgameslab@smartngo.org";
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    return false;
  };
})();