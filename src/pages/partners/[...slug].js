import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { Breadcrumb, Tabs } from "antd";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import { partners } from "./index";
import MarkdownIt from "markdown-it";

const { TabPane } = Tabs;

const md = new MarkdownIt();

const PartnerDetail = ({ partner, contentHtml }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!partner) {
    return (
      <LayoutOne title="Partner Not Found">
        <Container>
          <h1>Partner Not Found</h1>
          <p>Sorry, we couldn't find the partner you're looking for.</p>
          <Link href="/partners">Back to Partners</Link>
        </Container>
      </LayoutOne>
    );
  }

  return (
    <LayoutOne title={partner.name}>
      <NextSeo
        title={`${partner.name} | Bihar Samaj Abu Dhabi Partners`}
        description={`Learn more about ${partner.name}, a valued partner of Bihar Samaj Abu Dhabi. ${partner.description}`}
        canonical={`https://www.biharsamajabudhabi.com/partners/${partner.slug}`}
        openGraph={{
          url: `https://www.biharsamajabudhabi.com/partners/${partner.slug}`,
          title: `${partner.name} | Bihar Samaj Abu Dhabi Partners`,
          description: `Discover ${partner.name}, a partner dedicated to fostering community and cultural unity.`,
          site_name: "Bihar Samaj Abu Dhabi",
          type: "website", // Added og:type property
          images: [
            {
              url: partner.logo,
              width: 1200,
              height: 630,
              alt: `${partner.name} logo`,
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: `${partner.name} | Bihar Samaj Abu Dhabi Partners`,
          description: `Explore ${partner.name}, a partner committed to community engagement and cultural unity.`,
          image: partner.logo,
        }}
      />

      <div className="partner-detail-page">
        <div
          className="partner-detail-hero"
          style={{ backgroundImage: `url(${partner.logo})` }}
        >
          <Container>
            <h1 className="partner-detail-hero__title">{partner.name}</h1>
          </Container>
        </div>

        <Container>
          <Breadcrumb separator=">" className="partner-detail-breadcrumb">
            <Breadcrumb.Item>
              <Link href="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href="/partners">Partners</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{partner.name}</Breadcrumb.Item>
          </Breadcrumb>

          <div className="partner-detail-content">
            <div className="partner-detail-content__main">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Overview" key="1">
                  <h2 className="partner-detail-content__category">
                    {partner.category}
                  </h2>
                  <p className="partner-detail-content__description">
                    {partner.description}
                  </p>
                </TabPane>
                <TabPane tab="Detailed Information" key="2">
                  <div
                    className="markdown-content"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                </TabPane>
              </Tabs>
            </div>
            <div className="partner-detail-content__sidebar">
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="partner-detail-content__logo"
              />
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-detail-content__cta-button"
                >
                  Visit Website
                </a>
              )}
              {partner.socialMedia && (
                <div className="partner-detail-content__social-media">
                  <h3>Connect with {partner.name}</h3>
                  <ul>
                    {partner.socialMedia.map((social, index) => (
                      <li key={index}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {social.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </LayoutOne>
  );
};

export async function getStaticPaths() {
  const paths = partners.map((partner) => ({
    params: { slug: [partner.slug] },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const slug = params.slug[0];
  const partner = partners.find((p) => p.slug === slug);

  if (!partner) {
    return { notFound: true };
  }

  // Process the Markdown content
  const contentHtml = md.render(partner.content);

  return { props: { partner, contentHtml } };
}

export default PartnerDetail;
