// FIX 12: things with class="reveal" fade and slide in when you scroll to them
// (if someone's device is set to "reduce motion", everything just shows normally)
document.documentElement.classList.add("js-reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.08 } // FIX 34: fades in as soon as it starts coming on screen
);

document.querySelectorAll(".reveal").forEach(function (element) {
  revealObserver.observe(element);
});
