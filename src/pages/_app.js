import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import Head from "next/head";
import CssLoadingFix from "../components/CssLoadingFix";
import ScriptOptimizer from "../components/ScriptOptimizer";

// Import main.scss which contains all styles
import "../styles/main.scss";

import withReduxStore from "../common/withReduxStore";

function MyApp({ Component, pageProps, reduxStore }) {
  // Force a CSS reload to avoid FOUC (Flash of Unstyled Content)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      // Check if we can find Next.js CSS
      let cssFound = false;

      // Look for stylesheets from Next.js
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const sheet = document.styleSheets[i];
          if (sheet.href && sheet.href.includes("_next/static/css/")) {
            cssFound = true;
            break;
          }
        } catch (e) {
          // CORS may prevent access to some stylesheets
          continue;
        }
      }

      // If CSS not found, try loading it directly
      if (!cssFound) {
        console.warn("No Next.js CSS detected, attempting to load directly");

        // Try to find the main CSS file and load it directly
        const links = document.getElementsByTagName("link");
        for (let i = 0; i < links.length; i++) {
          if (links[i].href && links[i].href.includes("_next/static/css/")) {
            const cssPath = links[i].href;

            // Create a new link element
            const newLink = document.createElement("link");
            newLink.rel = "stylesheet";
            newLink.href = cssPath;
            document.head.appendChild(newLink);

            break;
          }
        }
      }

      // Remove loading class after a short delay
      setTimeout(() => {
        document.documentElement.classList.remove("loading");
      }, 500);
    }
  }, []);

  return (
    <Provider store={reduxStore}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#084680",
          },
        }}
      >
        <CssLoadingFix />
        <ScriptOptimizer />
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}

export default withReduxStore(MyApp);
