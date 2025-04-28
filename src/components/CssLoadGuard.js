import { useEffect } from "react";

export default function CssLoadGuard({ children }) {
  useEffect(() => {
    // Function to check if stylesheets are loaded
    const checkStylesheetsLoaded = () => {
      let cssLoaded = false;

      // Look for stylesheets from Next.js
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const sheet = document.styleSheets[i];
          if (
            sheet.href &&
            (sheet.href.includes("_next/static/css/") ||
              sheet.href.includes("main.css"))
          ) {
            cssLoaded = true;
            break;
          }
        } catch (e) {
          // CORS may prevent access to some stylesheets
          continue;
        }
      }

      if (cssLoaded) {
        // Remove loading class when CSS is detected
        document.documentElement.classList.remove("css-loading");
        // Force a repaint to ensure styles are applied
        const style = document.createElement("style");
        style.textContent = " ";
        document.head.appendChild(style);
        document.body.offsetHeight; // Force reflow
        document.head.removeChild(style);
      } else {
        // Check again in 50ms if not loaded
        setTimeout(checkStylesheetsLoaded, 50);
      }
    };

    // Start checking once component mounts
    checkStylesheetsLoaded();

    // Fallback: Remove loading class after 2.5 seconds regardless
    const fallbackTimer = setTimeout(() => {
      document.documentElement.classList.remove("css-loading");
    }, 2500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return children;
}
