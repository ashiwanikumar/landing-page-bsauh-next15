// src/components/ScriptOptimizer.js
import { useEffect } from "react";
import Script from "next/script";

export default function ScriptOptimizer() {
  // Handle initial loading and cleanup
  useEffect(() => {
    // Track script initialization state
    window.scriptsInitialized = true;

    // Check for any existing video players
    const checkVideoState = () => {
      return !!document.querySelector("video[playing]");
    };

    window.isIntroVideoPlaying = checkVideoState();

    // Cleanup function
    return () => {
      window.scriptsInitialized = false;
    };
  }, []);

  return (
    <>
      {/* Analytics scripts - load with priority */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MHH8LNGX');
          `,
        }}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-6L9LWQMFFC"
      />

      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6L9LWQMFFC');
          `,
        }}
      />

      {/* Marketing scripts - load after analytics */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '280178354850098'); 
            fbq('track', 'PageView');
          `,
        }}
      />

      <Script
        id="linkedin-insight-tag"
        strategy="afterInteractive"
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

      {/* CSS fix script - production only */}
      {process.env.NODE_ENV === "production" && (
        <Script
          id="css-fix"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Add small delay to ensure DOM is ready
                setTimeout(function() {
                  // Force CSS recomputation
                  var styleEl = document.createElement('style');
                  styleEl.textContent = ' ';
                  document.head.appendChild(styleEl);
                  
                  // Trigger reflow
                  document.body.offsetHeight;
                  
                  // Clean up
                  document.head.removeChild(styleEl);
                  
                  // Remove loading class if still present
                  document.documentElement.classList.remove('loading');
                }, 100);
              })();
            `,
          }}
        />
      )}

      {/* Chat and widget scripts - load last */}
      <Script
        id="conferbot-widget"
        strategy="lazyOnload"
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

      {/* AdSense - Lowest priority */}
      <Script
        id="google-adsense"
        strategy="lazyOnload"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6470306183626989"
        crossOrigin="anonymous"
      />
    </>
  );
}
