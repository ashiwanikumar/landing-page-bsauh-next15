import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
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

          {/* Load critical CSS first */}
          <link rel="stylesheet" href="/critical.css" precedence="high" />

          {/* Rest of your existing styles */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
          />
          <link
            href="https://kit-pro.fontawesome.com/releases/v5.13.0/css/pro.min.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />

          {/* Font preloading */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />

          <link rel="icon" href={`${assetPrefix}/fav.png`} />
          <link
            href={`${assetPrefix}/assets/css/elegant-icon.css`}
            rel="stylesheet"
          />

          {/* CSS loading script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  function checkCssLoaded() {
                    var mainCssLoaded = false;
                    
                    // Check for Next.js CSS
                    for (var i = 0; i < document.styleSheets.length; i++) {
                      try {
                        var sheet = document.styleSheets[i];
                        if (sheet.href && (sheet.href.includes('_next/static/css/') || 
                            sheet.href.includes('main.css'))) {
                          mainCssLoaded = true;
                          break;
                        }
                      } catch(e) {
                        continue;
                      }
                    }
                    
                    if (mainCssLoaded) {
                      // All styles loaded - show content
                      document.documentElement.classList.remove('loading');
                    } else {
                      // Keep checking
                      setTimeout(checkCssLoaded, 50);
                    }
                  }
                  
                  // Start checking
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', checkCssLoaded);
                  } else {
                    checkCssLoaded();
                  }
                  
                  // Failsafe - show content after 2.5 seconds regardless
                  setTimeout(function() {
                    document.documentElement.classList.remove('loading');
                  }, 2500);
                })();
              `,
            }}
          />

          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MHH8LNGX');`,
            }}
          />

          {/* Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-6L9LWQMFFC"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-6L9LWQMFFC');
              `,
            }}
          />

          {/* Facebook Pixel Code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '280178354850098'); fbq('track', 'PageView');`,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=280178354850098&ev=PageView&noscript=1"
            />
          </noscript>

          {/* LinkedIn Insight Tag */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                _linkedin_partner_id = "6974377";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
                (function(l) {
                  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                  window.lintrk.q=[]}
                  var s = document.getElementsByTagName("script")[0];
                  var b = document.createElement("script");
                  b.type = "text/javascript";b.async = true;
                  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                  s.parentNode.insertBefore(b, s);
                })(window.lintrk);
              `,
            }}
          />
        </Head>

        <body>
          {/* Loading screen */}
          <div className="loading-screen">
            <h2>Loading Bihar Samaj Abu Dhabi...</h2>
            <p>Please wait while we prepare the content</p>
          </div>

          {/* Google Tag Manager (noscript) */}
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

          {/* CSS fix script - add for production only */}
          {process.env.NODE_ENV === "production" && (
            <Script
              id="css-fix"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    // Create a style element to force CSS recomputation
                    var styleEl = document.createElement('style');
                    styleEl.textContent = ' ';
                    document.head.appendChild(styleEl);
                    
                    // Force reflow
                    document.body.offsetHeight;
                    
                    // Clean up
                    document.head.removeChild(styleEl);
                  })();
                `,
              }}
            />
          )}

          {/* Conferbot widget */}
          <Script
            id="conferbot-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function (d, s, id) {
                  var js, el = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) {
                    return;
                  }
                  js = d.createElement(s);
                  js.id = id;
                  js.src = 'https://s3.ap-south-1.amazonaws.com/conferbot.defaults/dist/v1/widget.min.js';
                  js.charset = 'UTF-8';
                  js.async = true;
                  el.parentNode.insertBefore(js, el);
                  js.onload = function () {
                    if (!window.isIntroVideoPlaying) {
                      window.ConferbotWidget && window.ConferbotWidget("657d56d6b3d7f38922aee331", "live_chat");
                    }
                  };
                })(document, 'script', 'conferbot-js');
              `,
            }}
          />

          {/* Google AdSense Script */}
          <Script
            id="google-adsense"
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6470306183626989"
            crossOrigin="anonymous"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
