// src/components/CssLoadingFix.js
import { useEffect } from "react";

export default function CssLoadingFix() {
  useEffect(() => {
    // Function to check if CSS is properly loaded
    const checkCssLoading = () => {
      let cssFound = false;
      // Check for Next.js CSS files
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const sheet = document.styleSheets[i];
          if (
            sheet.href &&
            (sheet.href.includes("_next/static/css/") ||
              sheet.href.includes("main.css"))
          ) {
            cssFound = true;
            break;
          }
        } catch (e) {
          continue;
        }
      }

      // If CSS is loaded, remove loading class
      if (cssFound) {
        document.documentElement.classList.remove("loading");
      } else {
        // Keep checking
        setTimeout(checkCssLoading, 50);
      }
    };

    // Start checking for CSS loading
    checkCssLoading();

    // Failsafe - remove loading class after 2 seconds
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove("loading");
    }, 2000);

    // Clean up timeout
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
