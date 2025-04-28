import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Breadcrumb, Row, Col, Card } from "antd";
import ReactPlayer from "react-player";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import { NextSeo } from "next-seo";
import YouTubePlaylist from "../../../components/youtube/YouTubePlaylist"; // Adjust the path as necessary
const QRCodeImages = [
  { name: "facebook", image: "/assets/images/qr-code/facebook_qr_code.png" },
  { name: "instagram", image: "/assets/images/qr-code/instagram_qr_code.png" },
  { name: "linkedIn", image: "/assets/images/qr-code/linkedin_qr_code.png" },
  { name: "twitter", image: "/assets/images/qr-code/twitter_qr_code.png" },
];

export const InstagramSVG = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <rect
        width="256"
        height="256"
        fill="url(#skillIconsInstagram0)"
        rx="60"
      ></rect>
      <rect
        width="256"
        height="256"
        fill="url(#skillIconsInstagram1)"
        rx="60"
      ></rect>
      <path
        fill="#fff"
        d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"
      ></path>
      <defs>
        <radialGradient
          id="skillIconsInstagram0"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FD5"></stop>
          <stop offset=".1" stopColor="#FD5"></stop>
          <stop offset=".5" stopColor="#FF543E"></stop>
          <stop offset="1" stopColor="#C837AB"></stop>
        </radialGradient>
        <radialGradient
          id="skillIconsInstagram1"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3771C8"></stop>
          <stop offset=".128" stopColor="#3771C8"></stop>
          <stop offset="1" stopColor="#60F" stopOpacity="0"></stop>
        </radialGradient>
      </defs>
    </g>
  </svg>
);

const CommunityGroup = () => {
  const router = useRouter();

  const TwitterCard = () => {
    useEffect(() => {
      const loadTwitterScript = () => {
        if (!window.twttr) {
          const script = document.createElement("script");
          script.src = "https://platform.twitter.com/widgets.js";
          script.async = true;
          document.body.appendChild(script);
        } else {
          window.twttr.widgets.load();
        }
      };

      loadTwitterScript();
    }, []);

    return (
      <Col xs={24} sm={12} md={6}>
        <Card
          bordered={false}
          hoverable
          className="social-media-card twitter-page-card"
        >
          <div className="card-content">
            <a
              className="twitter-timeline"
              href="https://twitter.com/samaj_bihar?ref_src=twsrc%5Etfw"
            >
              Tweets by samaj_bihar
            </a>
          </div>
        </Card>
      </Col>
    );
  };

  const handleGroupMoreClick = (url) => {
    window.open(url, "_blank");
  };

  // QR Code Card component
  const QRCodeCard = ({ qrImagePath, platform, SVGIcon }) => {
    const platformClass = `${platform.toLowerCase()}-card`;
    return (
      <Col xs={24} sm={12} md={6}>
        <Card
          className={`qr-code-card ${platformClass}`}
          hoverable
          cover={<img alt={`${platform} QR Code`} src={qrImagePath} />}
          style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
        >
          <Card.Meta
            avatar={<SVGIcon />}
            title={platform.charAt(0).toUpperCase() + platform.slice(1)}
          />
        </Card>
      </Col>
    );
  };

  return (
    <>
      <NextSeo
        title="Social Media | Bihar Samaj Abu Dhabi - Connect with Us Online"
        description="Follow Bihar Samaj Abu Dhabi on social media to stay updated with our latest events, cultural activities, and community news. Connect with our vibrant community on various platforms."
        canonical="https://www.biharsamajabudhabi.com/resources/social-media"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/resources/social-media",
          title:
            "Social Media | Bihar Samaj Abu Dhabi - Connect with Us Online",
          description:
            "Follow Bihar Samaj Abu Dhabi on social media to stay updated with our latest events, cultural activities, and community news. Connect with our vibrant community on various platforms.",
          site_name: "Bihar Samaj Abu Dhabi",
          images: [
            {
              url: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/main.jpg",
              width: 800,
              height: 600,
              alt: "Social Media | Bihar Samaj Abu Dhabi - Connect with Us Online",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title:
            "Social Media | Bihar Samaj Abu Dhabi - Connect with Us Online",
          description:
            "Follow Bihar Samaj Abu Dhabi on social media to stay updated with our latest events, cultural activities, and community news. Connect with our vibrant community on various platforms.",
          image:
            "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/main.jpg", // Replace with the URL of a relevant image for the social media page
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
              "Bihar Samaj Abu Dhabi Social Media, Community Updates, Cultural Events Online, Social Media Engagement, Connect with Bihar Community, Indian Community in UAE, Social Networking, Community News and Updates",
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

      <LayoutOne title="Community Group Social Platform">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Community Connection Point: </Breadcrumb.Item>
          </Breadcrumb>

          <div className="qr-code-title">Join the Cultural Harmony</div>

          <Row
            gutter={[16, 16]}
            style={{
              marginBottom: "50px",
            }}
          >
            {/* Twitter */}
            <TwitterCard />

            {/* WhatsApp */}
            <SocialMediaCard
              className="qr-code-card"
              title="Our WhatsApp Group"
              SVGIcon={WhatsAppSVG}
              description="Join our community group on WhatsApp to stay updated."
              actionText="Join Us"
              actionLink="/information/registration"
            />

            {/* LinkedIn */}
            <SocialMediaCard
              className="qr-code-card"
              title="Our Linkedin Group"
              SVGIcon={LinkedInSVG}
              description="Join our community group on Linkedin to stay updated."
              actionText="Join Us"
              actionLink="https://www.linkedin.com/showcase/biharsamajabudhabiofficial/"
            />
            <SocialMediaCard
              className="qr-code-card"
              title="Our Facebook Group"
              SVGIcon={FacebookSVG}
              description="Connect with us on Facebook for community events and updates."
              actionText="Join Group"
              actionLink="https://www.facebook.com/BiharSamajAbuDhabiOfficial"
            />
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              {/* QR Codes Social Media Cards */}
              <div className="qr-code-title">Join Us Through QR Codes</div>

              <Card className="qr-code-title-card">
                <Row gutter={[16, 16]}>
                  {QRCodeImages?.map((item, index) => (
                    <QRCodeCard
                      qrImagePath={item.image}
                      platform={item.name}
                      SVGIcon={resolveIcon(item.name)}
                    />
                  ))}
                </Row>
              </Card>

              {/* YouTube Video */}
              <Col span={24} className="social-custom-card">
                <Card className="youtube-card" style={{ border: "none" }}>
                  <ReactPlayer
                    url="https://youtu.be/TupfNgT5kAw?si=us1HWt3yDWga2C5Y"
                    playing={true}
                    loop
                    muted
                    width="100%"
                    height="100%"
                    controls={true}
                    style={{ position: "absolute", top: 0, left: 0 }}
                  />
                  <div style={{ paddingTop: "56.25%" }} /> {/* Aspect Ratio */}
                </Card>
              </Col>
              {/* YouTube Video */}
              <Col span={24} className="social-custom-card">
                <Card className="youtube-card" style={{ border: "none" }}>
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=RM4c8AEmmEw"
                    playing={true}
                    loop
                    muted
                    width="100%"
                    height="100%"
                    controls={true}
                    style={{ position: "absolute", top: 0, left: 0 }}
                  />
                  <div style={{ paddingTop: "56.25%" }} /> {/* Aspect Ratio */}
                </Card>
              </Col>
              {/* YouTube Playlist */}
              <Col span={24} className="social-custom-card">
                <YouTubePlaylist />
              </Col>
            </Col>
          </Row>
        </Container>
      </LayoutOne>
    </>
  );
};

export default React.memo(CommunityGroup);

const SocialMediaCard = ({
  title,
  SVGIcon,
  href,
  linkText,
  onClick,
  description,
  customContent,
  actionText,
  actionLink,
  className,
}) => (
  <Col xs={24} sm={12} md={6}>
    <Card
      className={`twitter-page-card ${className}`} // Apply the class here
      title={
        <span>
          <SVGIcon /> {title}
        </span>
      }
      bordered={false}
      hoverable
      onClick={onClick}
    >
      {customContent ? (
        customContent
      ) : (
        <>
          <p>{description}</p>
          {href && (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {linkText}
            </a>
          )}
          {actionText && (
            <a href={actionLink} className="social-media-action-button">
              {actionText}
            </a>
          )}
        </>
      )}
    </Card>
  </Col>
);

// Helper function to resolve the correct SVG Icon based on the platform name
const resolveIcon = (platformName) => {
  switch (platformName.toLowerCase()) {
    case "facebook":
      return FacebookSVG;
    case "instagram":
      return InstagramSVG; // Make sure you have this SVG component
    case "linkedin":
      return LinkedInSVG;
    case "twitter":
      return TwitterSVG;
    // Add more cases for other platforms if needed
    default:
      return DefaultIconSVG; // Fallback icon, you need to define this
  }
};

// SVG code for Twitter
export const TwitterSVG = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z"></path>
  </svg>
);

// SVG code for WhatsApp
export const WhatsAppSVG = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 256 258"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="logosWhatsappIcon0"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#1FAF38"></stop>
        <stop offset="100%" stopColor="#60D669"></stop>
      </linearGradient>
      <linearGradient
        id="logosWhatsappIcon1"
        x1="50%"
        x2="50%"
        y1="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#F9F9F9"></stop>
        <stop offset="100%" stopColor="#FFF"></stop>
      </linearGradient>
    </defs>
    <path
      fill="url(#logosWhatsappIcon0)"
      d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
    ></path>
    <path
      fill="url(#logosWhatsappIcon1)"
      d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"
    ></path>
    <path
      fill="#FFF"
      d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
    ></path>
  </svg>
);

// SVG code for LinkedIn
export const LinkedInSVG = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#0A66C2"
      d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009c-.002-12.157 9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
    ></path>
  </svg>
);

// SVG code for Facebook
export const FacebookSVG = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#1877F2"
      d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
    ></path>
    <path
      fill="#FFF"
      d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z"
    ></path>
  </svg>
);

// SVG code for YouTube
export const YouTubeSVG = (props) => (
  <svg
    width="1.43em"
    height="1em"
    viewBox="0 0 256 180"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="red"
      d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"
    ></path>
    <path fill="#FFF" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"></path>
  </svg>
);

//SVG code for TikTok

export const TiktokSVG = (props) => (
  <svg
    width="0.89em"
    height="1em"
    viewBox="0 0 256 290"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#FF004F"
      d="M189.72 104.421c18.678 13.345 41.56 21.197 66.273 21.197v-47.53a67.115 67.115 0 0 1-13.918-1.456v37.413c-24.711 0-47.59-7.851-66.272-21.195v96.996c0 48.523-39.356 87.855-87.9 87.855c-18.113 0-34.949-5.473-48.934-14.86c15.962 16.313 38.222 26.432 62.848 26.432c48.548 0 87.905-39.332 87.905-87.857v-96.995zm17.17-47.952c-9.546-10.423-15.814-23.893-17.17-38.785v-6.113h-13.189c3.32 18.927 14.644 35.097 30.358 44.898M69.673 225.607a40.008 40.008 0 0 1-8.203-24.33c0-22.192 18.001-40.186 40.21-40.186a40.313 40.313 0 0 1 12.197 1.883v-48.593c-4.61-.631-9.262-.9-13.912-.801v37.822a40.268 40.268 0 0 0-12.203-1.882c-22.208 0-40.208 17.992-40.208 40.187c0 15.694 8.997 29.281 22.119 35.9"
    ></path>
    <path d="M175.803 92.849c18.683 13.344 41.56 21.195 66.272 21.195V76.631c-13.794-2.937-26.005-10.141-35.186-20.162c-15.715-9.802-27.038-25.972-30.358-44.898h-34.643v189.843c-.079 22.132-18.049 40.052-40.21 40.052c-13.058 0-24.66-6.221-32.007-15.86c-13.12-6.618-22.118-20.206-22.118-35.898c0-22.193 18-40.187 40.208-40.187c4.255 0 8.356.662 12.203 1.882v-37.822c-47.692.985-86.047 39.933-86.047 87.834c0 23.912 9.551 45.589 25.053 61.428c13.985 9.385 30.82 14.86 48.934 14.86c48.545 0 87.9-39.335 87.9-87.857z"></path>
    <path
      fill="#00F2EA"
      d="M242.075 76.63V66.516a66.285 66.285 0 0 1-35.186-10.047a66.47 66.47 0 0 0 35.186 20.163M176.53 11.57a67.788 67.788 0 0 1-.728-5.457V0h-47.834v189.845c-.076 22.13-18.046 40.05-40.208 40.05a40.06 40.06 0 0 1-18.09-4.287c7.347 9.637 18.949 15.857 32.007 15.857c22.16 0 40.132-17.918 40.21-40.05V11.571zM99.966 113.58v-10.769a88.787 88.787 0 0 0-12.061-.818C39.355 101.993 0 141.327 0 189.845c0 30.419 15.467 57.227 38.971 72.996c-15.502-15.838-25.053-37.516-25.053-61.427c0-47.9 38.354-86.848 86.048-87.833"
    ></path>
  </svg>
);
