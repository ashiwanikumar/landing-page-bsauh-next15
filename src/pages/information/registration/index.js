import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NextSeo } from "next-seo";
import RegistrationForm from "../../../components/forms/whatsapp/RegistrationForm";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import SectionTitle from "../../../components/other/SectionTitle";
import Head from "next/head";
import { Breadcrumb } from "antd";

const RegistrationPage = () => {
  const registrationSchema = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: "Join Bihar Samaj Abu Dhabi - Online Registration",
    description:
      "Register now to become a part of Bihar Samaj Abu Dhabi in just 4 easy steps: Personal Information, Social Media, Permanent Address, and Present Address.",
    url: "https://www.biharsamajabudhabi.com/information/registration",
    sameAs: [
      "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
      "https://www.instagram.com/biharsamajabudhabi_official",
      "https://twitter.com/samaj_bihar",
      "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
      "https://www.threads.net/@biharsamajabudhabi_official",
      "https://www.tiktok.com/@biharsamajabudhabi",
      "https://www.youtube.com/@BiharSamajAbudhabiOffical",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@biharsamajabudhabi.com",
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: "English",
      },
    ],
  };

  return (
    <>
      <NextSeo
        title="Join Bihar Samaj Abu Dhabi - Online Registration"
        description="Register now to become a part of Bihar Samaj Abu Dhabi in just 4 easy steps: Personal Information, Social Media, Permanent Address, and Present Address. Our simple online registration process connects you with the community."
        canonical="https://www.biharsamajabudhabi.com/information/registration"
        openGraph={{
          type: "website",
          url: "https://www.biharsamajabudhabi.com/information/registration",
          title: "Join Bihar Samaj Abu Dhabi - Online Registration",
          description:
            "Register now to become a part of Bihar Samaj Abu Dhabi in just 4 easy steps: Personal Information, Social Media, Permanent Address, and Present Address. Our simple online registration process connects you with the community.",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/join/bsad-join-us.png",
              width: 1200,
              height: 630,
              alt: "Bihar Samaj Abu Dhabi Registration Banner",
              type: "image/png",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
          updated_time: new Date().toISOString(),
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/join/bsad-join-us.png",
              width: 1200,
              height: 630,
              alt: "Bihar Samaj Abu Dhabi Registration Banner",
              type: "image/png",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Bihar Samaj Abu Dhabi, Online Registration, Community Events, Indian Community in UAE, Cultural Community Membership, Bihar Culture in Abu Dhabi, Social Group Registration, Registration Steps",
          },
          {
            name: "author",
            content: "Bihar Samaj Abu Dhabi",
          },
          {
            name: "robots",
            content: "index, follow",
          },
          {
            name: "googlebot",
            content: "index, follow",
          },
          {
            name: "language",
            content: "English",
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          },
          {
            httpEquiv: "Content-Type",
            content: "text/html; charset=utf-8",
          },
          {
            property: "fb:app_id",
            content: "201164943018968",
          },
          {
            name: "twitter:image",
            content:
              "https://www.biharsamajabudhabi.com/assets/images/join/bsad-join-us.png",
          },
          {
            name: "twitter:image:alt",
            content: "Bihar Samaj Abu Dhabi Registration Banner",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "me",
            href: "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
          },
          {
            rel: "icon",
            href: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/fav.png",
            sizes: "32x32",
          },
          {
            rel: "me",
            href: "https://www.instagram.com/biharsamajabudhabi_official",
          },
          {
            rel: "me",
            href: "https://twitter.com/samaj_bihar",
          },
          {
            rel: "me",
            href: "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
          },
        ]}
      />

      <Head>
        <script type="application/ld+json">
          {JSON.stringify(registrationSchema)}
        </script>
      </Head>

      <LayoutOne title="Join Bihar Samaj Abu Dhabi">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Community Registration</Breadcrumb.Item>
          </Breadcrumb>
          <SectionTitle title="Community Registration" className="-center" />
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            <RegistrationForm />
          </GoogleOAuthProvider>
        </Container>
      </LayoutOne>
    </>
  );
};

export default RegistrationPage;
