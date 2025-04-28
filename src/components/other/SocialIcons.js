import React from "react";
import classNames from "classnames";
import { Button } from "antd";

export default function SocialIcons({ className, type = "link", shape }) {
  return (
    <ul
      className={`social-icons ${classNames(className)}`}
      style={{
        marginTop: "5px",
        alignItems: "center",
      }}
    >
      {/* Google */}

      {/* Facebook */}
      <li>
        <Button
          type={type}
          shape={shape}
          href="https://www.facebook.com/BiharSamajAbuDhabiOfficial/"
          target="_blank"
          style={{
            lineHeight: shape === "circle" ? "3rem" : "1.5rem",
          }}
        >
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
              d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"
            ></path>
          </svg>
        </Button>
      </li>
      {/* LinkedIn */}
      <li>
        <Button
          type={type}
          shape={shape}
          href="https://www.linkedin.com/showcase/biharsamajabudhabiofficial/"
          target="_blank"
          style={{
            lineHeight: shape === "circle" ? "3rem" : "1.5rem",
          }}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#0076b2"
              d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3z"
            ></path>
            <path
              fill="#fff"
              d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 1 1-10.5 10.49a10.5 10.5 0 0 1 10.5-10.49m20.41 29h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"
            ></path>
          </svg>
        </Button>
      </li>
      {/* Instagram */}
      <li>
        <Button
          type={type}
          shape={shape}
          href="https://www.instagram.com/biharsamajabudhabi_official"
          target="_blank"
          style={{
            lineHeight: shape === "circle" ? "3rem" : "1.5rem",
          }}
        >
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
                d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604h.031Zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563v.025Zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12v.004Zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355h.002Zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334Z"
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
        </Button>
      </li>
      {/* Threads */}
      <li>
        <Button
          type={type}
          shape={shape}
          href="https://www.threads.net/@biharsamajabudhabi_official"
          target="_blank"
          style={{
            lineHeight: shape === "circle" ? "3rem" : "1.5rem",
          }}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#000000"
              d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802c.756-1.081 1.753-1.502 3.132-1.502c.975 0 1.803.327 2.394.948c.591.621.928 1.509 1.005 2.644c.328.138.63.299.905.484c1.109.745 1.719 1.86 1.719 3.137c0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994C1 2.034 4.482 0 8.044 0C9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79c0 4.143 2.254 6.343 5.63 6.343c2.777 0 4.847-1.443 4.847-3.556c0-1.438-1.208-2.127-1.27-2.127c-.236 1.234-.868 3.31-3.644 3.31c-1.618 0-3.013-1.118-3.013-2.582c0-2.09 1.984-2.847 3.55-2.847c.586 0 1.294.04 1.663.114c0-.637-.54-1.728-1.9-1.728c-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416c0 .878 1.043 1.168 1.6 1.168c1.02 0 2.067-.282 2.232-2.423a6.217 6.217 0 0 0-1.528-.161"
            ></path>
          </svg>
        </Button>
      </li>
      {/* YouTube */}
      <li>
        <Button
          type={type}
          shape={shape}
          href="https://www.youtube.com/@BiharSamajAbudhabiOffical"
          target="_blank"
          style={{
            lineHeight: shape === "circle" ? "3rem" : "1.5rem",
          }}
        >
          <svg
            width="1.23em"
            height="1em"
            viewBox="0 0 256 180"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="red"
              d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
            ></path>
            <path
              fill="#FFF"
              d="m102.421 128.06l66.328-38.418l-66.328-38.418z"
            ></path>
          </svg>
        </Button>
      </li>
      {/*Twitter */}
      <li>
        <Button
          type={type}
          shape={shape}
          href="https://twitter.com/samaj_bihar"
          target="_blank"
          style={{
            lineHeight: shape === "circle" ? "3rem" : "1.5rem",
          }}
        >
          <svg
            width="1em"
            height="0.9em"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z"></path>
          </svg>
        </Button>
      </li>
    </ul>
  );
}
