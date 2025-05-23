import React from "react";
import { useRouter } from "next/router";
import SectionTitle from "../other/SectionTitle";

const Group = () => {
  const router = useRouter();

  const handleGroupMoreClick = (groupPath) => {
    // Use the passed URL for navigation
    router.push(groupPath);
  };

  return (
    <div
      className="group-preview"
      style={{
        marginBottom: "100px",
      }}
    >
      <div className="title-container">
        <SectionTitle title={"Connect with Our Community"} />
      </div>

      <div className="group-card-container">
        {/* WhatsApp Group Card */}
        <div className="group-card">
          <svg
            width="2em"
            height="2em"
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
              d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416Zm40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513l10.706-39.082Z"
            ></path>
            <path
              fill="#FFF"
              d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
            ></path>
          </svg>

          <h4>🌍 WhatsApp Group</h4>
          <p>
            📱 Join our WhatsApp group to stay updated and connected with the
            community. 🌐🤝
          </p>

          <button
            className="know-more-btn"
            onClick={() => handleGroupMoreClick("/information/registration/")}
          >
            Know More About WhatsApp Group
          </button>
          {/* Twitter Group Card */}

          <div className="group-card">
            <svg
              width="1.7em"
              height="1.7em"
              viewBox="0 0 128 128"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z"></path>
            </svg>

            <h4>🌍 Twitter</h4>
            <p>
              🐦 Follow our Twitter page to get the latest updates and engage
              with our community online.
            </p>
            <button
              className="know-more-btn"
              onClick={() =>
                window.open("https://twitter.com/samaj_bihar", "_blank")
              }
            >
              Follow Us
            </button>
          </div>
        </div>

        {/* LinkedIn Group Card */}
        <div className="group-card">
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* LinkedIn SVG Path */}
            <path
              fill="#0A66C2"
              d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009c-.002-12.157 9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
            ></path>
          </svg>

          <h4>🔗 LinkedIn Group</h4>
          <p>
            💼 Join our LinkedIn group to network and share professional
            insights with the community.
          </p>

          <button
            className="know-more-btn"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
                "_blank"
              )
            }
          >
            🤝 Join Group
          </button>

          {/* Facebook Group Card */}
          <div className="group-card">
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#1877F2"
                d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
              ></path>
              <path
                fill="#FFF"
                d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"
              ></path>
            </svg>

            <h4>🔗 Facebook Group</h4>
            <p>
              📘 Join our Facebook group to connect, share, and engage with
              community members.
            </p>
            <button
              className="know-more-btn"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/BiharSamajAbuDhabiOfficial",
                  "_blank"
                )
              }
            >
              🤝 Join Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
