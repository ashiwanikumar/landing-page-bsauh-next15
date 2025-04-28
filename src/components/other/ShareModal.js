import React, { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import Slider from "react-slick";
import { ShareAltOutlined, CloseOutlined } from "@ant-design/icons";
import ReactModal from "react-modal";

ReactModal.setAppElement("#__next"); // Replace with your app element id

const ShareModal = ({ url }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentShareLink, setCurrentShareLink] = useState(`${currentUrl}`);

  const handleShareClick = (e) => {
    e.stopPropagation();
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // If url !== ""
    if (url !== undefined) {
      setCurrentUrl(process.env.NEXT_PUBLIC_FRONTEND_URL + "/" + url);
      setCurrentShareLink(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL + "/" + url}`
      );

      return;
    } else {
      setCurrentUrl(window.location.href);
      setCurrentShareLink(`${window.location.href}`);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth <= 500;
      setIsMobile(width);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shareOptions = [
    {
      icon: "fa fa-clone",
      text: "Plain Link",
      link: `${currentUrl}`,
      color: "#3b5998",
    },
    {
      icon: "fab fa-facebook",
      text: "Facebook",
      link: `https://www.facebook.com/sharer.php?u=${currentUrl}`,
      color: "#3b5998",
    },
    {
      icon: "fab fa-linkedin",
      text: "Linkedin",
      link: `https://www.linkedin.com/shareArticle?url=${currentUrl}`,
      color: "#0e76a8",
    },
    {
      icon: "fab fa-instagram",
      text: "Instagram",
      link: `https://www.instagram.com/biharsamajabudhabi_official/${currentUrl}`,
      color: "#405de6",
      gradient:
        "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)",
    },
    {
      icon: "fab fa-twitter",
      text: "Twitter",
      link: `https://twitter.com/intent/tweet?url=${currentUrl}`,
      color: "#00acee",
    },
    {
      icon: "fab fa-whatsapp",
      text: "WhatsApp",
      link: `https://web.whatsapp.com/send/?text=${currentUrl}`, // Replace with your WhatsApp URL
      color: "#25d366",
    },

    // Add more share options here
  ];

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 4 : 6,
    slidesToScroll: isMobile ? 4 : 6,
    prevArrow: (
      <div>
        <i className="fas fa-arrow-left left-icon"></i>
      </div>
    ),
    nextArrow: (
      <div>
        <i className="fas fa-arrow-right right-icon"></i>
      </div>
    ),
  };

  const handleCopyClick = () => {
    try {
      // Create a temporary input element
      const tempInput = document.createElement("input");
      // Set its value to the currentShareLink
      tempInput.value = currentShareLink;
      // Append the input element to the DOM
      document.body.appendChild(tempInput);
      // Select the input's content
      tempInput.select();
      // Copy the selected content to the clipboard
      document.execCommand("copy");
      // Remove the input element from the DOM
      document.body.removeChild(tempInput);

      message.success("Link copied to clipboard");
    } catch (error) {
      // If copying to clipboard fails, show an error message
      message.error("Failed to copy link to clipboard");
    }
  };

  // Handle share click
  const handleShareIconClick = (e, link) => {
    e.stopPropagation();
    setCurrentShareLink(link);
  };

  useEffect(() => {
    if (modalVisible) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is opened
    } else {
      document.body.style.overflow = "unset"; // Enable scrolling when modal is closed
    }

    return () => {
      document.body.style.overflow = "unset"; // Enable scrolling when component unmounts
    };
  }, [modalVisible]);

  return (
    <>
      <Button
        type="primary"
        className="share-btn"
        onClick={(e) => handleShareClick(e)}
        icon={<ShareAltOutlined style={{ color: "#ffff" }} />}
      >
        Share
      </Button>

      <ReactModal
        isOpen={modalVisible}
        onRequestClose={handleModalClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // this will give a semi-transparent black background
            backdropFilter: "blur(3px)", // this will blur the background behind the modal
            zIndex: "999",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "50%", // Adjust width
            height: "30%", // Adjust height
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "8px",
            outline: "none",
            padding: "20px",
            backgroundColor: "#dfd6ca",
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            position: "relative",
            padding: "20px 10px",
            transition: "all 2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleModalClose}
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "none",
              border: "none",
            }}
          >
            <CloseOutlined
              style={{
                height: "35px",
                width: "auto",
              }}
            />
          </button>
          {modalVisible && (
            <Slider
              {...settings}
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {shareOptions.map(
                ({ icon, text, link, color, gradient }, index) => (
                  <div className="share-option-icon" key={index}>
                    <a
                      key={icon}
                      className="icon"
                      onClick={(e) => handleShareIconClick(e, link)}
                      style={{
                        color: gradient ? gradient : color,
                        fontSize: "24px",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        textFillColor: "transparent",
                        border: "none",
                      }}
                    >
                      <i className={icon}></i>
                    </a>
                    <span>{text}</span>
                  </div>
                )
              )}
            </Slider>
          )}
          <div className="share-copy-input">
            <Input
              readOnly
              suffix={
                <Button className="copy-btn" onClick={handleCopyClick}>
                  Copy
                </Button>
              }
              span={24}
              style={{ borderRadius: "6px" }}
              value={currentShareLink}
              className="input"
            />
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default ShareModal;
