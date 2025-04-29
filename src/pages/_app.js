import { useEffect } from "react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import Head from "next/head";

import "../styles/main.scss";
import withReduxStore from "../common/withReduxStore";

function MyApp({ Component, pageProps, reduxStore }) {
  // Force stylesheet recalculation on client-side
  useEffect(() => {
    // Function to fix CSS flickering in production
    const fixCSSFlicker = () => {
      // Force a browser reflow to ensure styles are applied
      document.body.offsetHeight;

      // Add a minimal style element to force CSS recalculation
      const styleEl = document.createElement("style");
      styleEl.textContent = " ";
      document.head.appendChild(styleEl);

      // Remove it after a tiny delay
      setTimeout(() => {
        document.head.removeChild(styleEl);
      }, 100);

      // Remove loading class if still present
      document.documentElement.classList.remove("loading");
    };

    // Execute after a short delay to ensure CSS is loaded
    setTimeout(fixCSSFlicker, 100);

    // Also run on route changes (useful for Next.js page transitions)
    const handleRouteChange = () => {
      setTimeout(fixCSSFlicker, 100);
    };

    // Clean up event listeners on unmount
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  return (
    <Provider store={reduxStore}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Add additional viewport controls */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Force CSS recalculation metatag */}
        <meta name="css-refresh" content={Date.now()} />
      </Head>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#084680",
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}

export default withReduxStore(MyApp);
