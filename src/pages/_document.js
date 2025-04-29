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
      <Html lang="en">
        <Head>
          <meta name="emotion-insertion-point" content="" />

          {/* Force stylesheet loading before rendering content */}
          <link rel="stylesheet" href="/critical.css" />

          {/* Add nonce for security (optional) */}
          <meta property="csp-nonce" content="random-nonce-value" />

          {/* Preload key stylesheets to ensure they load first */}
          <link
            rel="preload"
            href={`${assetPrefix}/assets/css/elegant-icon.css`}
            as="style"
          />
          <link
            rel="preload"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
            as="style"
            crossOrigin="anonymous"
          />

          {/* Force style recalculation to prevent FOUC */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.documentElement.classList.add('loading');
                
                // Check for CSS loading
                (function() {
                  function ensureStylesLoaded() {
                    var allStylesLoaded = true;
                    var links = document.getElementsByTagName('link');
                    for (var i = 0; i < links.length; i++) {
                      var link = links[i];
                      if (link.rel === 'stylesheet' && !link.sheet) {
                        allStylesLoaded = false;
                        break;
                      }
                    }
                    
                    if (allStylesLoaded) {
                      document.documentElement.classList.remove('loading');
                    } else {
                      setTimeout(ensureStylesLoaded, 50);
                    }
                  }
                  
                  if (document.readyState === 'complete') {
                    ensureStylesLoaded();
                  } else {
                    window.addEventListener('load', ensureStylesLoaded);
                  }
                  
                  // Failsafe - always show content after 2 seconds
                  setTimeout(function() {
                    document.documentElement.classList.remove('loading');
                  }, 2000);
                })();
              `,
            }}
          />

          {/* Site assets */}
          <link rel="icon" href={`${assetPrefix}/fav.png`} />

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
          {/* Add a loading mask that shows until CSS is ready */}
          <div
            id="__loading-mask"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#fff",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>Loading Bihar Samaj Abu Dhabi...</h2>
          </div>

          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.addEventListener('load', function() {
                setTimeout(function() {
                  var mask = document.getElementById('__loading-mask');
                  if (mask) {
                    mask.style.display = 'none';
                  }
                }, 300);
              });
            `,
            }}
          />

          <Main />
          <NextScript />
          {process.env.NODE_ENV === "production" && (
            <script src="/production-fix.js" />
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
