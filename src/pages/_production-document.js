import React from "react";

// This component only runs in production mode
export default function ProductionDocument({ children }) {
  // Only run in production and client-side
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    React.useEffect(() => {
      // Force-load a direct CSS fix
      const loadCssFix = () => {
        // Create a direct CSS link
        const cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href = "/css-fix.css";
        document.head.appendChild(cssLink);

        // Check for main CSS
        let cssFound = false;
        for (let i = 0; i < document.styleSheets.length; i++) {
          try {
            const sheet = document.styleSheets[i];
            if (sheet.href && sheet.href.includes("_next/static/css/")) {
              cssFound = true;
              break;
            }
          } catch (e) {
            continue; // CORS issues
          }
        }

        // If no Next.js CSS found, force apply direct styles
        if (!cssFound) {
          console.warn("No Next.js CSS detected, applying direct styles");
          const directStyles = document.createElement("style");
          directStyles.textContent = `
            body { font-family: 'Manrope', sans-serif; margin: 0; padding: 0; }
            .top-bar-wrapper { background-color: #73c97c; color: #fff; padding: 10px 0; }
            .header-area { background-color: #fff; }
            a { color: inherit; text-decoration: none; }
            .container { width: 90%; max-width: 1200px; margin: 0 auto; }
          `;
          document.head.appendChild(directStyles);
        }

        // Remove loading class
        document.documentElement.classList.remove("loading");
      };

      // Execute CSS fix after a short delay to ensure DOM is ready
      setTimeout(loadCssFix, 100);

      // Failsafe - always show content after 2.5 seconds
      setTimeout(() => {
        document.documentElement.classList.remove("loading");
      }, 2500);
    }, []);
  }

  return children;
}
