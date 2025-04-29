// Production CSS fix for Bihar Samaj
(function () {
  // Only run in production
  if (window.location.hostname === "localhost") return;

  // This function ensures styles are applied consistently
  function applyStyles() {
    // Force browser to recompute styles
    document.body.offsetHeight;

    // Make sure critical elements have proper styles
    const headerElements = document.querySelectorAll(
      ".header-area, .top-bar-wrapper"
    );
    headerElements.forEach((el) => {
      if (el) {
        // Force style recalculation
        const display = getComputedStyle(el).display;
        el.style.display = "none";
        el.offsetHeight; // Force reflow
        el.style.display = display;
      }
    });

    // Remove loading classes
    document.documentElement.classList.remove("loading");
    const loadingMask = document.getElementById("__loading-mask");
    if (loadingMask) loadingMask.style.display = "none";
  }

  // Run this fix when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyStyles);
  } else {
    applyStyles();
  }

  // Also run after all resources are loaded
  window.addEventListener("load", function () {
    setTimeout(applyStyles, 100);
  });
})();
