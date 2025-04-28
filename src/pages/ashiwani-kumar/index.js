import { Row, Col, Card, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import { NextSeo } from "next-seo";

function LeadershipTeam() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    document.body.style.overflow = 'hidden';
  };

  const hideModal = () => {
    setIsModalVisible(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    // Load LinkedIn script
    const script = document.createElement('script');
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const handleEsc = (event) => {
      if (event.keyCode === 27) hideModal();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <NextSeo
        title="Ashiwani Kumar - Technical Architect at Bihar Samaj Abu Dhabi"
        description="Discover how Ashiwani Kumar drives digital innovation within the Bihar Samaj community in Abu Dhabi, enhancing our digital engagement and community interaction."
        canonical="https://www.biharsamajabudhabi.com/ashiwani-kumar"
        openGraph={{
          type: "website",
          url: "https://www.biharsamajabudhabi.com/ashiwani-kumar/",
          title:
            "Ashiwani Kumar - Technical Architect at Bihar Samaj Abu Dhabi",
          description:
            "Discover how Ashiwani Kumar drives digital innovation within the Bihar Samaj community in Abu Dhabi.",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/img/testimonial/ashiwani-kumar.png",
              width: 1200,
              height: 630,
              alt: "Ashiwani Kumar at Bihar Samaj Abu Dhabi",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@theashvanikumar",
          site: "@theashvanikumar",
          cardType: "summary_large_image",
          title:
            "Ashiwani Kumar - Technical Architect at Bihar Samaj Abu Dhabi",
          description:
            "Discover how Ashiwani Kumar drives digital innovation within the Bihar Samaj community in Abu Dhabi.",
          image:
            "https://www.biharsamajabudhabi.com/img/testimonial/ashiwani-kumar.png",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/fav.png",
            sizes: "32x32",
          },
        ]}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Ashiwani Kumar, Bihar Samaj, Abu Dhabi, Digital Innovation, Community Leadership, Technical Advancements",
          },
          {
            name: "author",
            content: "Ashiwani Kumar",
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
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          },
          {
            httpEquiv: "Content-Type",
            content: "text/html; charset=utf-8",
          },
          {
            name: "theme-color",
            content: "#ffffff",
          },
          {
            name: "twitter:creator",
            content: "@theashvanikumar",
          },
          {
            property: "og:see_also",
            content: "https://x.com/theashvanikumar",
          },
          {
            property: "og:see_also",
            content: "https://www.facebook.com/terminalrootuser",
          },
          {
            property: "og:see_also",
            content: "https://www.instagram.com/lsblk_a/",
          },
          {
            property: "og:see_also",
            content: "https://www.linkedin.com/in/ashiwanikumar/",
          },
        ]}
      />
      <LayoutOne title="Developer">
        <div className="leadership-container">
          <Container>
            <Breadcrumb separator=">" className="breadcrumb">
              <Breadcrumb.Item>
                <i className="fas fa-home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Driving tech-led community growth
              </Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="member-card-title">
              Transforming community engagement through advanced technology solutions
            </h1>
            <Row justify="center">
              <Col span={24}>
                <Card className="leader-card">
                  <div className="bubble-container left">
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                  </div>
                  <Row gutter={[32, 32]} align="stretch">
                    <Col xs={24} md={12}>
                      <div className="text-container">
                        <div className="quote-container">
                          <i className="fas fa-quote-left quote-icon"></i>
                          <p className="banner-one-cnt">
                            Adept technical contributions have played a pivotal role in propelling our community to the forefront of digital innovation, significantly enhancing our digital presence and engagement.
                          </p>
                        </div>
                        <div className="leader-info">
                          <span className="name">
                            <a onClick={showModal} className="ash-name-link">Ashiwani Kumar</a>
                          </span>
                          <span className="title">Developer</span>
                        </div>
                        <div className="social-media-links">
                          {renderSocialMediaLinks()}
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="linkedin-badge-container">
                        <div
                          className="badge-base LI-profile-badge"
                          data-locale="en_US"
                          data-size="large"
                          data-theme="light"
                          data-type="VERTICAL"
                          data-vanity="ashiwanikumar"
                          data-version="v1"
                        ></div>
                      </div>
                      <a
                        className="libutton"
                        href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=ashiwanikumar"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Follow on LinkedIn
                      </a>
                    </Col>
                  </Row>
                  <div className="bubble-container right">
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutOne>
      {isModalVisible && (
        <div className="ash-modal-overlay" onClick={hideModal}>
          <div className="ash-custom-modal" onClick={e => e.stopPropagation()}>
            <span className="ash-close-icon" onClick={hideModal}>&times;</span>
            <article className="ash-modal-content">
              <header>
                <img src="/img/testimonial/ashiwani.png" alt="Ashiwani Kumar" className="ash-modal-image" />
                <h2>Ashiwani Kumar</h2>
                <p className="ash-modal-title">Developer</p>
              </header>
              <section className="ash-modal-message">
                <p>
                  As a dedicated developer at Bihar Samaj Abu Dhabi, I leverage cutting-edge technologies to create innovative solutions that drive our community forward. My focus is on bridging complex technical concepts with user-friendly applications, enhancing our digital presence and member engagement.
                </p>
                <ul>
                  <li>Developed and maintained the official Bihar Samaj Abu Dhabi website</li>
                  <li>Implemented secure member management systems</li>
                  <li>Volunteering my skills to build stronger relationships within our community, without any charges</li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      )}
    </>
  );
}

function renderSocialMediaLinks() {
  const socialMedia = [
    {
      name: "Twitter",
      url: "https://x.com/theashvanikumar",
      logo: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-gallery-bucket/tw.png",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/terminalrootuser",
      logo: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-gallery-bucket/facebook-logo-transparent-black.png",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/lsblk_a/",
      logo: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-gallery-bucket/instagram-logo-transparent-black.png",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ashiwanikumar/",
      logo: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-gallery-bucket/linkedin.png",
    },
  ];

  return (
    <div className="social-icons">
      {socialMedia.map((media) => (
        <a
          key={media.name}
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={media.logo}
            alt={media.name}
            style={{ height: "18px", width: "18px", marginRight: "10px" }}
          />
        </a>
      ))}
    </div>
  );
}

export default React.memo(LeadershipTeam);
