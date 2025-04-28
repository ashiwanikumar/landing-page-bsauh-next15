import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { Row, Col, Breadcrumb, Pagination } from "antd";
import axios from "axios";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import BlogSidebar from "../../components/blog/BlogSidebar";
import Post from "../../components/post/Post";
import { useRouter } from "next/router";
import Head from "next/head";

const Blogs = ({
  blogs,
  paginationData,
  blogCategories,
  tags,
  recentBlogs,
}) => {
  const router = useRouter();
  const [page, setPage] = useState(Number(router.query.page || 1));

  const onPaginationChange = (current) => {
    setPage(current);
    router.push(`/blog?page=${current}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router.asPath]);

  // JSON-LD structured data for SEO enhancement
  const blogJsonLd = {
    "@context": "http://schema.org",
    "@type": "Blog",
    headline: "Blog | Bihar Samaj Abu Dhabi - Insights and Stories",
    description:
      "Explore the latest articles, insights, and stories on the Bihar Samaj Abu Dhabi blog. Dive into the rich cultural heritage and community experiences of Bihar, Jharkhand, and Uttar Pradesh in the UAE.",
    url: "https://www.biharsamajabudhabi.com/blog",
    image: "https://www.biharsamajabudhabi.com/assets/images/logo.png",
    author: {
      "@type": "Organization",
      name: "Bihar Samaj Abu Dhabi",
    },
    publisher: {
      "@type": "Organization",
      name: "Bihar Samaj Abu Dhabi",
      logo: {
        "@type": "ImageObject",
        url: "https://www.biharsamajabudhabi.com/assets/images/logo.png",
      },
    },
    sameAs: [
      "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
      "https://www.instagram.com/biharsamajabudhabi_official",
      "https://twitter.com/samaj_bihar",
      "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
      "https://www.tiktok.com/@biharsamajabudhabi",
      "https://www.threads.net/@biharsamajabudhabi_official",
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
      <Head>
        <script type="application/ld+json">{JSON.stringify(blogJsonLd)}</script>
      </Head>
      <NextSeo
        title="Blog | Bihar Samaj Abu Dhabi - Insights and Stories"
        description="Explore the latest articles, insights, and stories on the Bihar Samaj Abu Dhabi blog. Dive into the rich cultural heritage and community experiences of Bihar, Jharkhand, and Uttar Pradesh in the UAE."
        canonical="https://www.biharsamajabudhabi.com/blog"
        openGraph={{
          type: "website",
          url: "https://www.biharsamajabudhabi.com/blog",
          title: "Blog | Bihar Samaj Abu Dhabi - Insights and Stories",
          description:
            "Explore the latest articles, insights, and stories on the Bihar Samaj Abu Dhabi blog. Dive into the rich cultural heritage and community experiences of Bihar, Jharkhand, and Uttar Pradesh in the UAE.",
          site_name: "Bihar Samaj Abu Dhabi",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/websiteblock/bsadblock.png",
              width: 800,
              height: 600,
              alt: "Blog | Bihar Samaj Abu Dhabi - Insights and Stories",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Blog | Bihar Samaj Abu Dhabi - Insights and Stories",
          description:
            "Explore the latest articles, insights, and stories on the Bihar Samaj Abu Dhabi blog. Dive into the rich cultural heritage and community experiences of Bihar, Jharkhand, and Uttar Pradesh in the UAE.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/websiteblock/bsadblock.png", // Replace with the URL of your desired image for the blog page
        }}
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
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Bihar Samaj Abu Dhabi Blog, Cultural Insights, Community Stories, Bihar Heritage, Jharkhand Culture, Uttar Pradesh Culture, UAE Indian Community, Cultural Experiences",
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
            content: "201164943018968", // Your Facebook App ID
          },
        ]}
      />

      <LayoutOne title="Blogs list">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Explore Our Curated Selection of Blog Posts:
            </Breadcrumb.Item>
          </Breadcrumb>

          <div className="event-code-title">
            Discover the Latest in Our Blog Collection:{" "}
          </div>

          <div className="blog">
            <Row gutter={30}>
              <Col xs={24} lg={6}>
                <BlogSidebar
                  recentBlogs={recentBlogs}
                  blogCategories={blogCategories}
                  blogTags={tags}
                />
              </Col>

              <Col xs={24} lg={18}>
                <div className="event-content">
                  <Row className="event-cards-container">
                    {blogs?.length > 0 ? (
                      blogs?.map((item, index) => (
                        <Col key={index} span={24}>
                          <Post type="column-full" data={item} />
                        </Col>
                      ))
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 30,
                        }}
                      >
                        <div class="no-event-card">
                          <h1>
                            No blogs are listed right now! Keep an eye on this
                            space for new additions soon!
                          </h1>
                        </div>
                      </div>
                    )}
                  </Row>
                </div>

                {blogs?.length > 0 && (
                  <Pagination
                    onChange={onPaginationChange}
                    defaultCurrent={page}
                    pageSize={paginationData.perPage}
                    total={paginationData.totalBlogs}
                  />
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </LayoutOne>
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const page = query.page ? query.page : 1;

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/blogs-approved-paginated?page=${page}`
    );

    const response = res.data;

    // Pass the response data as props
    return { props: response };
  } catch (error) {
    console.error("FETCH_BLOGS_ERROR", error);

    // Return empty props in case of an error
    return { props: {} };
  }
}

export default Blogs;
