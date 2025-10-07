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

// Image modal (lightbox) functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("image-modal");
  const modalImg = modal && modal.querySelector(".image-modal__img");
  const images = Array.from(
    document.querySelectorAll(".image-grid .image-cell")
  );
  let lastFocused = null;

  if (!modal || !modalImg) return;

  function openModal(src, alt, triggerEl) {
    lastFocused = triggerEl || document.activeElement;
    modalImg.src = src;
    modalImg.alt = alt || "";
    modal.setAttribute("aria-hidden", "false");
    // prevent background scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    // set focus to modal for accessibility
    modal.setAttribute("tabindex", "-1");
    modal.focus();
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    // restore focus to the element that opened the modal
    try {
      lastFocused && lastFocused.focus();
    } catch (e) {}
  }

  images.forEach((img) => {
    img.addEventListener("click", function (e) {
      const src = img.src || img.getAttribute("src");
      const alt = img.alt || img.getAttribute("alt") || "";
      openModal(src, alt, img);
    });
    img.setAttribute("tabindex", "0");
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        img.click();
      }
    });
  });

  // close interactions: click on overlay (outside the image)
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  // Escape key closes the modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });
});
