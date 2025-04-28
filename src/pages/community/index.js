import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Space,
  Typography,
  Breadcrumb,
  Pagination,
  Button,
} from "antd";
import { NextSeo } from "next-seo";
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import Link from "next/link";

const { Title, Paragraph } = Typography;

const CommunityGroup = (props) => {
  const router = useRouter();
  const { communityMembers, paginationData } = props;
  const [page, setPage] = useState(Number(router.query.page || 1));

  const onPaginationChange = (current) => {
    setPage(current);
    router.push(`/community?page=${current}`);
  };

  const renderSocialIcons = (socialMedia) => {
    return (
      <Space>
        {socialMedia.facebook && (
          <a
            href={socialMedia.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
        )}
        {socialMedia.linkedin && (
          <a
            href={socialMedia.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        )}
        {socialMedia.instagram && (
          <a
            href={socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        )}
        {socialMedia.twitter && (
          <a
            href={socialMedia.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
        )}
      </Space>
    );
  };

  const createSlug = (title) => {
    return title
      ?.toLowerCase()
      .replace(/[^\w-]+/g, "")
      .replace(/\s+/g, "-");
  };

  const truncateReviewMessage = (message, limit = 120) => {
    if (message.length <= limit) return message;
    return message.slice(0, limit).trim() + "...";
  };

  return (
    <>
      <NextSeo
        title="Community Members - Bihar Samaj Abu Dhabi"
        description="Connect and engage with the vibrant community of Bihar Samaj in Abu Dhabi. Explore the experiences and contributions of our community members."
        canonical="https://www.biharsamajabudhabi.com/community"
      />

      <LayoutOne title="Community Members">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Community Members</Breadcrumb.Item>
          </Breadcrumb>

          <div className="member-card-title">
            Engage with Our Vibrant Community Members:
          </div>

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

          <Row gutter={[16, 16]}>
            {communityMembers.length > 0 ? (
              communityMembers.map((member) => (
                <Col xs={24} sm={12} md={8} lg={6} key={member._id}>
                  <div className="member-card-wrapper">
                    <div className="card-container">
                      <div className="bg"></div>
                      <div className="blob"></div>
                      <div className="community-member-custom-card">
                        <img
                          className="card-image"
                          alt={member.name}
                          src={member.profilePicture}
                        />
                        <div className="card-content">
                          <h4 className="card-title">{member.name}</h4>
                          <p className="member-review-message">
                            {truncateReviewMessage(member.reviewMessage)}
                            {member.reviewMessage.length > 120 && (
                              <span className="read-more"> Read more</span>
                            )}
                          </p>
                          <div className="social-icons-members">
                            {renderSocialIcons(member.socialMedia)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/community/${member._id}/${createSlug(
                        member.name
                      )}`}
                      className="member-link-overlay"
                      aria-label={`View ${member.name}'s profile`}
                    />
                  </div>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Card
                  style={{
                    textAlign: "center",
                    boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
                  }}
                >
                  <Title level={4}>No Community Members Found</Title>
                  <Paragraph>
                    Currently, there are no members to display in the community
                    group.
                  </Paragraph>
                </Card>
              </Col>
            )}
          </Row>

          {communityMembers.length > 0 && (
            <Row style={{ marginTop: 20 }}>
              <Col span={24} style={{ textAlign: "center" }}>
                <Pagination
                  onChange={onPaginationChange}
                  defaultCurrent={page}
                  pageSize={paginationData.perPage}
                  total={paginationData.totalCommunityMembers}
                />
              </Col>
            </Row>
          )}
        </Container>
      </LayoutOne>

      <style jsx global>{`
        .member-card-wrapper {
          position: relative;
          cursor: pointer;
        }

        .member-link-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const page = query.page ? query.page : 1;
    const perPage = 8;

    const communityMembersRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/community-members-approved-paginated?page=${page}&perPage=${perPage}`
    );
    const communityMembersData = communityMembersRes.data;

    return {
      props: {
        communityMembers: communityMembersData.communityMembers,
        paginationData: communityMembersData.paginationData,
      },
    };
  } catch (error) {
    return { props: { communityMembers: [], paginationData: {} } };
  }
}

export default React.memo(CommunityGroup);
