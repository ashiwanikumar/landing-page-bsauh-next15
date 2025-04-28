import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Row, Col, Rate, Button } from "antd";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";

// Dynamically import components that might use browser APIs
const TestimonialArea = dynamic(
  () => import("../../components/Home/TestimonialArea"),
  { ssr: false }
);

const createSlug = (name) => {
  return name
    ?.toLowerCase()
    .replace(/[^\w-]+/g, "")
    .replace(/ /g, "-");
};

const CommunityMemberDetail = ({ member, error, notFound }) => {
  const router = useRouter();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (notFound || !member) {
    return <div>Member not found. Please check the URL and try again.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const memberUrl = `https://www.biharsamajabudhabi.com/community/${
    member._id
  }/${createSlug(member.name)}`;

  return (
    <>
      <NextSeo
        title={`${member.name || "Community Member"} - Bihar Samaj Abu Dhabi`}
        description={
          member.metaDescription ||
          member.bio ||
          member.reviewMessage ||
          `Learn more about ${member.name}'s contributions to Bihar Samaj Abu Dhabi.`
        }
        canonical={memberUrl}
        openGraph={{
          type: "profile",
          profile: {
            firstName: member.name?.split(" ")[0],
            lastName: member.name?.split(" ").slice(1).join(" "),
            username: createSlug(member.name),
          },
          url: memberUrl,
          title: `${member.name || "Community Member"} - Bihar Samaj Abu Dhabi`,
          description:
            member.bio ||
            member.reviewMessage ||
            `Discover ${member.name}'s journey and contributions to our vibrant community.`,
          images: [
            {
              url: member.profilePicture
                ? `${member.profilePicture}?v=2`
                : "https://www.biharsamajabudhabi.com/assets/images/logo.png",
              width: 1200,
              height: 630,
              alt: `${member.name || "Community Member"}'s Profile`,
            },
          ],
          siteName: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: `${member.name || "Community Member"} - Bihar Samaj Abu Dhabi`,
          description:
            member.bio ||
            member.reviewMessage ||
            `Discover ${member.name}'s journey and contributions to our vibrant community.`,
          image: member.profilePicture
            ? `${member.profilePicture}?v=2`
            : "https://www.biharsamajabudhabi.com/assets/images/logo.png",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/fav.png",
            sizes: "32x32",
          },
          {
            rel: "me",
            href: "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
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
            content: `Bihar Samaj Abu Dhabi, Community Member, ${member.name}, ${member.role}, Cultural Unity UAE, Bihar Culture, Jharkhand Culture, UP Culture, Community Events, Cultural Festivals, Indian Community UAE`,
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
      <LayoutOne title={`${member.name || "Community Member"}`}>
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Community Members</Breadcrumb.Item>
            <Breadcrumb.Item>{member.name}</Breadcrumb.Item>
          </Breadcrumb>

          <div className="submit-review-button-container">
            <Button
              type="primary"
              size="large"
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/community/member-feedback`,
                  "_blank"
                )
              }
            >
              Submit Member Review
            </Button>
          </div>

          <div className="member-card-title">
            Explore Real Stories: Celebrating Community and Culture at Bihar
            Samaj Abu Dhabi
          </div>
          <div className="member-detail-page">
            <Row gutter={30} justify="center">
              <Col xs={24} md={20} lg={18}>
                <div className="member-info">
                  <div className="member-profile-image-container">
                    <img
                      src={member.profilePicture || "/default-profile.jpg"}
                      alt={member.name}
                      className="member-profile-image"
                    />
                  </div>
                  <h1 className="member-name">
                    {member.name || "Unknown Member"}
                  </h1>
                  <p className="member-role">
                    {member.role || "Role not specified"}
                  </p>
                  <div className="member-rating">
                    <Rate allowHalf value={member.rating} disabled />
                    <p className="member-rating-count">
                      ({member.rating.toFixed(1)})
                    </p>
                  </div>
                  <p className="member-review">
                    {member.reviewMessage || "No review message available."}
                  </p>
                  <p className="member-bio">
                    {member.bio || "No bio available."}
                  </p>
                  <div className="member-social-media">
                    {member.socialMedia.facebook && (
                      <a
                        href={member.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/assets/images/social-icons/fb.png`}
                          alt="Facebook"
                        />
                      </a>
                    )}
                    {member.socialMedia.instagram && (
                      <a
                        href={member.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/assets/images/social-icons/instagram.png`}
                          alt="Instagram"
                        />
                      </a>
                    )}
                    {member.socialMedia.twitter && (
                      <a
                        href={member.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/assets/images/social-icons/twitter.png`}
                          alt="Twitter"
                        />
                      </a>
                    )}
                    {member.socialMedia.linkedin && (
                      <a
                        href={member.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/assets/images/social-icons/linkedin.png`}
                          alt="LinkedIn"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        {/* Only render TestimonialArea on client side */}
        {isBrowser && <TestimonialArea />}
      </LayoutOne>
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  try {
    // Extract the memberId from the slug parameter
    if (!params || !params.slug || params.slug.length < 1) {
      return { props: { notFound: true } };
    }

    const memberId = params.slug[0]; // First part of the slug is the member ID

    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/community-member/${memberId}`;
    const response = await axios.get(apiUrl);
    const member = response.data;

    if (!member) {
      console.error("No member data received");
      return { props: { notFound: true } };
    }

    return { props: { member } };
  } catch (error) {
    console.error("Error in getServerSideProps:", error.message);
    return {
      props: { error: "Failed to fetch member data", member: null },
    };
  }
}

export default CommunityMemberDetail;
