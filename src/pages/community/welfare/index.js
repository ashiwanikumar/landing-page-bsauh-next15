import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import dynamic from "next/dynamic";

// Layout Components
import { LayoutOne, Container, WelfareRegistrationForm } from "@components";
import { Breadcrumb } from "antd";

// Dynamically import components that might use browser APIs
const GoogleOAuthProvider = dynamic(
  () => import("@react-oauth/google").then((mod) => mod.GoogleOAuthProvider),
  { ssr: false }
);

const TestimonialArea = dynamic(
  () => import("@components/Home/TestimonialArea"),
  { ssr: false }
);

const WelfarePage = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Enhanced JSON-LD structured data for SEO
  const welfareJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Welfare Services - Bihar Samaj Abu Dhabi",
    description:
      "Access comprehensive welfare support services offered by Bihar Samaj Abu Dhabi, including visa assistance, employment guidance, and emergency support.",
    provider: {
      "@type": "Organization",
      name: "Bihar Samaj Abu Dhabi",
      url: "https://www.biharsamajabudhabi.com",
      logo: "https://www.biharsamajabudhabi.com/assets/images/logo.png",
      sameAs: [
        "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
        "https://twitter.com/samaj_bihar",
        "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
        "https://www.threads.net/@biharsamajabudhabi_official",
        "https://www.tiktok.com/@biharsamajabudhabi",
        "https://www.instagram.com/biharsamajabudhabi_official",
      ],
    },
    offers: {
      "@type": "Offer",
      itemOffered: [
        {
          "@type": "Service",
          name: "Visa Assistance",
          description: "Support with visa processing and documentation",
        },
        {
          "@type": "Service",
          name: "Employment Support",
          description: "Job search assistance and career guidance",
        },
        {
          "@type": "Service",
          name: "Emergency Support",
          description: "24/7 emergency assistance for community members",
        },
      ],
    },
    mainEntity: {
      "@type": "Organization",
      name: "Bihar Samaj Abu Dhabi Welfare Department",
      description:
        "Dedicated welfare support division of Bihar Samaj Abu Dhabi",
      areaServed: {
        "@type": "City",
        name: "Abu Dhabi",
        containedIn: "United Arab Emirates",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Bihar Samaj Abu Dhabi",
      logo: {
        "@type": "ImageObject",
        url: "https://www.biharsamajabudhabi.com/assets/images/logo.png",
        width: 500,
        height: 500,
      },
    },
    inLanguage: "en-AE",
    datePublished: "2024-12-24",
    dateModified: "2024-12-24",
  };

  const seoConfig = {
    defaultTitle: "Welfare Services & Support | Bihar Samaj Abu Dhabi",
    titleTemplate: "%s | Bihar Samaj Abu Dhabi",
    noindex: false,
    nofollow: false,
    robotsProps: {
      nosnippet: false,
      notranslate: false,
      noimageindex: false,
      noarchive: false,
      maxSnippet: 320,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
    title: "Welfare Services & Support | Bihar Samaj Abu Dhabi",
    description:
      "Access comprehensive welfare support services, including visa assistance, employment guidance, and emergency support. Join our supportive community today.",
    canonical: "https://www.biharsamajabudhabi.com/community/welfare",
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: "https://www.biharsamajabudhabi.com/community/welfare",
      title: "Welfare Services & Support | Bihar Samaj Abu Dhabi",
      description:
        "Access comprehensive welfare support services including visa assistance, employment guidance, and emergency support. Bihar Samaj Abu Dhabi is committed to supporting our community members' well-being and success.",
      images: [
        {
          url: "https://www.biharsamajabudhabi.com/assets/images/welfare/welfare-support.png",
          width: 1200,
          height: 630,
          alt: "Bihar Samaj Abu Dhabi Welfare Services",
          type: "image/png",
        },
        {
          url: "https://www.biharsamajabudhabi.com/assets/images/welfare/welfare-support.png",
          width: 1200,
          height: 630,
          alt: "Community Support Services",
          type: "image/png",
        },
      ],
      site_name: "Bihar Samaj Abu Dhabi",
    },
    twitter: {
      handle: "@samaj_bihar",
      site: "@samaj_bihar",
      cardType: "summary_large_image",
    },
    additionalMetaTags: [
      {
        name: "keywords",
        content:
          "welfare services, community support, visa assistance, employment guidance, Bihar Samaj Abu Dhabi, emergency support, community welfare",
      },
      {
        name: "author",
        content: "Bihar Samaj Abu Dhabi",
      },
      {
        property: "article:publisher",
        content: "https://www.facebook.com/biharsamajabudhabi",
      },
    ],
    additionalLinkTags: [
      {
        rel: "icon",
        href: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/fav.png",
      },
    ],
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(welfareJsonLd) }}
        />
      </Head>
      <NextSeo {...seoConfig} />

      <LayoutOne title="Welfare Support">
        <Container>
          <div className="welfare-container">
            {/* Header Section */}
            <Breadcrumb
              separator=">"
              items={[
                {
                  title: <i className="fas fa-home" />,
                },
                {
                  title: "Community Welfare",
                },
              ]}
            />

            <div className="event-code-title">
              Providing essential welfare support and guidance to our community
              members across UAE.
            </div>

            {/* Content Background Container */}
            <div
              style={{
                padding: "20px",
                background: "#fff", // or any background color/image you prefer
              }}
            >
              {/* Registration Form Component */}
              {isBrowser ? (
                <GoogleOAuthProvider
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                >
                  <WelfareRegistrationForm />
                </GoogleOAuthProvider>
              ) : (
                <div>Loading form...</div>
              )}
            </div>
          </div>
        </Container>

        {/* Testimonial Area - Only render on client side */}
        {isBrowser && <TestimonialArea />}
      </LayoutOne>
    </>
  );
};

export default WelfarePage;
