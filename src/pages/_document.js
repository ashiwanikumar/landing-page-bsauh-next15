// src/pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const assetPrefix = process.env.NEXT_PUBLIC_FRONTEND_URL || "";

    return (
      <Html lang="en" className="loading">
        <Head>
          <meta name="emotion-insertion-point" content="" />

          {/* Critical CSS */}
          <link rel="preload" href="/critical.css" as="style" />
          <link rel="stylesheet" href="/critical.css" />

          {/* Preconnect to external resources */}
          <link
            rel="preconnect"
            href="https://cdnjs.cloudflare.com"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          {/* External CSS with optimized loading */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
            media="print"
            onLoad="this.media='all'"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
            media="print"
            onLoad="this.media='all'"
          />
          <link
            href="https://kit-pro.fontawesome.com/releases/v5.13.0/css/pro.min.css"
            rel="stylesheet"
            media="print"
            onLoad="this.media='all'"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
            media="print"
            onLoad="this.media='all'"
          />

          {/* Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
            media="print"
            onLoad="this.media='all'"
          />

          {/* Site assets */}
          <link rel="icon" href={`${assetPrefix}/fav.png`} />
          <link
            href={`${assetPrefix}/assets/css/elegant-icon.css`}
            rel="stylesheet"
            media="print"
            onLoad="this.media='all'"
          />

          {/* Initial CSS loading handler - inline for performance */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Mark page as loading initially
                document.documentElement.classList.add('loading');
                
                // Remove loading class when all resources are loaded
                window.addEventListener('load', function() {
                  document.documentElement.classList.remove('loading');
                });
                
                // Failsafe - always show content after 2 seconds
                setTimeout(function() {
                  document.documentElement.classList.remove('loading');
                }, 2000);
              `,
            }}
          />

          {/* Noscript fallbacks */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=280178354850098&ev=PageView&noscript=1"
            />
          </noscript>
        </Head>

        <body>
          {/* Loading screen */}
          <div className="loading-screen">
            <h2>Loading Bihar Samaj Abu Dhabi...</h2>
            <p>Please wait while we prepare the content</p>
          </div>

          {/* Google Tag Manager noscript */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MHH8LNGX"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>

          <Main />
          <div id="subpages-sidebar" />
          <NextScript />

          {/* Note: All scripts have been moved to the ScriptOptimizer component */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
