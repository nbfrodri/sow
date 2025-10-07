// Toggle header fade and nav fixed state when header scrolls out of view.
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const nav = document.querySelector(".sticky-menu");

  if (!header || !nav || !("IntersectionObserver" in window)) return;

  // Ensure initial state
  header.classList.add("fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Header is visible: nav should be sticky in normal flow
          nav.classList.remove("fixed");
          header.classList.remove("fade-out");
          header.classList.add("fade-in");
        } else {
          // Header is not visible: pin the nav and fade the header
          nav.classList.add("fixed");
          header.classList.remove("fade-in");
          header.classList.add("fade-out");
        }
      });
    },
    {
      root: null,
      threshold: 0,
      rootMargin: `-${nav.offsetHeight}px 0px 0px 0px`,
    }
  );

  observer.observe(header);
});

// Back to top button
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  const showThreshold = 300; // px scrolled before showing

  function onScroll() {
    if (window.scrollY > showThreshold) btn.classList.add("show");
    else btn.classList.remove("show");
  }

  // initial check
  onScroll();

  window.addEventListener("scroll", onScroll, { passive: true });

  btn.addEventListener("click", function () {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    btn.blur();
  });
});
