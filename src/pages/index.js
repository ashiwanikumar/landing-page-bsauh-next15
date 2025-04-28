import { useState, useEffect, useRef } from "react";
import LayoutOne from "../components/layout/LayoutOne";
import CommunityMember from "../components/sections/communityMembers/CommunityMember";
import Container from "../components/other/Container";
import { NextSeo } from "next-seo";
import BlogSlide from "../components/sections/blog/BlogSlide";
import EventSlide from "../components/sections/event/EventSlide";
import dynamic from "next/dynamic";
import AboutUsPreview from "../components/aboutUs/AboutUsPreview";
import NonProfit from "../components/aboutUs/NonProfit";
import SocialGroup from "../components/socialGroup/SocialGroup";
import axios from "axios";
import { saveVisitor } from "../apis/visitor";
import { getAllAnnouncementsApproved } from "../apis/announcement";
// TestimonialArea is now dynamically imported below

// Import confetti dynamically to prevent server-side rendering
const confetti = dynamic(() => import("canvas-confetti"), { ssr: false });

// Import HeroSliderFour dynamically with SSR disabled to prevent useLayoutEffect warnings
const HeroSliderFour = dynamic(
  () => import("../components/sections/hero-slider/HeroSliderFour"),
  {
    ssr: false,
    loading: () => (
      <div
        className="hero-slider-placeholder"
        style={{
          height: "500px",
          background: "linear-gradient(to right, #336633, #4a934a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "15px" }}>
            Loading Bihar Samaj Abu Dhabi...
          </div>
          <div style={{ fontSize: "16px" }}>
            Please wait while we prepare the content
          </div>
        </div>
      </div>
    ),
  }
);

// Also dynamically import these components that might use browser APIs
const YouTubeVideo = dynamic(() => import("../components/video/YouTubeVideo"), {
  ssr: false,
});
const TestimonialArea = dynamic(
  () => import("../components/Home/TestimonialArea"),
  { ssr: false }
);

const Home = ({ recentBlogs, recentEvents, communityMembers, heroImages }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const [introVideoFinished, setIntroVideoFinished] = useState(false);

  // Announcement
  const [modalAnnouncement, setModalAnnouncement] = useState();
  const [showAnnouncementCard, setShowAnnouncementCard] = useState(false);

  // Mark when we're on the client side
  useEffect(() => {
    setIsBrowser(true);

    // Remove or update the cookie check since we don't need the video
    setModalVisible(false);
    setLoading(false);

    // Always allow scrolling
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    if (!isBrowser) return; // Skip server-side execution

    if (document.cookie.indexOf("CO_DVIS") === -1) {
      getData();
    }

    fetchAnnouncements();
  }, [isBrowser]);

  const startConfetti = () => {
    if (!isBrowser || !confetti) return; // Skip server-side execution

    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleExploreClick = () => {
    setModalVisible(false);
    setIntroVideoFinished(true);

    if (isBrowser) {
      // Set the "introVideoPlayed" cookie with an expiry of 15 mins
      setCookie("introVideoPlayed", "true", 60 * 15);
    }

    // Set loading to false to show the hero images
    setLoading(false);

    // Start the rocket cracker effect
    startRocketCrackerEffect();
  };

  const startRocketCrackerEffect = () => {
    if (!isBrowser || !confetti) return; // Skip server-side execution

    // Function to simulate the rocket launch
    const launchRocket = () => {
      const launchDuration = 3000; // Duration for the rocket to reach the top
      const launchEnd = Date.now() + launchDuration;

      const launchFrame = () => {
        const timeLeft = launchEnd - Date.now();

        if (timeLeft <= 0) {
          createBurst(); // Create the burst effect at the end
          return;
        }

        const particleCount = 5;
        confetti({
          particleCount,
          startVelocity: 100,
          spread: 10,
          origin: { x: 0.5, y: 1 - timeLeft / launchDuration }, // Rocket moving upwards
          colors: [
            "#FF0000",
            "#FF7F00",
            "#FFFF00",
            "#00FF00",
            "#0000FF",
            "#4B0082",
            "#9400D3",
          ], // Gradient colors from red to violet
          shapes: ["circle"],
          gravity: 0.2,
          scalar: 1.2,
          zIndex: 1000,
        });

        requestAnimationFrame(launchFrame);
      };

      launchFrame();
    };

    // Function to create the burst effect
    const createBurst = () => {
      confetti({
        particleCount: 200,
        startVelocity: 30,
        spread: 360,
        origin: { x: 0.5, y: 0 }, // Burst from the top center
        colors: [
          "#ff0000",
          "#ff7f00",
          "#ffff00",
          "#00ff00",
          "#0000ff",
          "#4b0082",
          "#9400d3",
        ], // Rainbow colors
        zIndex: 1000,
      });
    };

    // Start the confetti effect
    startConfetti();
  };

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await getAllAnnouncementsApproved();

      // Find a modal announcement
      const modalAnnouncement = res.data.find(
        (announcement) => announcement.announcementType === "modal"
      );

      setModalAnnouncement(modalAnnouncement);

      if (modalAnnouncement) {
        setShowAnnouncementCard(true);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  // Function to close the announcement modal
  const handleCloseAnnouncementCard = () => {
    setShowAnnouncementCard(false);
  };

  // Get visitor data
  const getData = async () => {
    if (!isBrowser) return; // Skip server-side execution

    try {
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      if (ipResponse.status === 200 && ipResponse.data.ip) {
        const ip = ipResponse.data.ip;
        const locationResponse = await axios.get(
          `https://api.incolumitas.com/?q=${ip}`
        );
        if (locationResponse.status === 200 && locationResponse.data.location) {
          const locationData = locationResponse.data.location;

          // Rename 'country' to 'country_name' and add 'IPv4'
          const dataToSave = {
            ...locationData,
            country_name: locationData.country,
            IPv4: ip,
          };
          delete dataToSave.country; // Remove the original 'country' key

          // Get the current URL
          const url = window.location.href;

          // Check if the URL contains the ignored pattern
          if (!url.includes("/?cid=")) {
            if (document.cookie.indexOf("CO_DVIS") === -1) {
              // Save the modified location data and IP
              saveVisitor(dataToSave, url);

              // Save only once per session with 3 hours expiry
              document.cookie = `CO_DVIS=true; expires=${new Date(
                Date.now() + 10800000
              ).toUTCString()}; path=/`;
            }
          }
        }
      }
    } catch (err) {
      console.error("Error fetching location data:", err);
    }
  };

  // Remove or update the modal visibility effect
  useEffect(() => {
    if (!isBrowser) return; // Skip server-side execution

    // Always allow scrolling
    document.body.style.overflow = "auto";
  }, [modalVisible, isBrowser]);

  const styles = {
    card: {
      padding: "15px",
      borderRadius: "15px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "transparent",
      backgroundImage:
        "linear-gradient(to right, rgba(255, 165, 0, 0.7), rgba(255, 255, 255, 0.7), rgba(0, 128, 0, 0.7), rgba(255, 0, 0, 0.7), rgba(0, 0, 0, 0.7))", // Gradient with saffron (India), white (both), green (both), red (UAE), and black (UAE)
      width: "450px",
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 5,
      opacity: showMessage ? 1 : 0, // Update opacity based on showMessage state
      animation: showMessage ? "fadeIn 3s" : "none",
    },

    modal: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: "40px", // Add space for the footer
      left: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      zIndex: 999,
      background: "#F5F5F5",
    },
    video: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      minWidth: "100%",
      minHeight: "100%",
      width: "auto",
      height: "auto",
      zIndex: 0,
      objectFit: "contain", // changed from cover to contain
    },
    button: {
      width: "180px",
      height: "40px",
      backgroundColor: "#ffffff",
      borderRadius: "4px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      marginTop: "20px",
      zIndex: 1, // previously: not set
      opacity: showMessage ? 1 : 0, // Update opacity based on showMessage state
      animation: showMessage ? "fadeIn 1s" : "none",
    },

    text: {
      position: "relative",
      zIndex: "10",
      right: "22%",
      opacity: showMessage ? 1 : 0, // Update opacity based on showMessage state
      animation: showMessage ? "fadeIn 1s" : "none",
    },
    textH1: {
      fontSize: "3em",
      fontWeight: "800",
      color: "#0a236e", // Dark gray for contrast
      lineHeight: "1em",
      marginBottom: "15px",
      fontFamily: "Times New Roman, Arial, sans-serif",
    },
    textH2: {
      fontSize: "4em",
      fontWeight: "800",
      color: "#FFA965", // Slightly lighter gray
      lineHeight: "1em",
      marginBottom: "15px",
    },
    textH3: {
      fontSize: "3em",
      fontWeight: "700",
      color: "#340c66", // Even lighter gray to differentiate hierarchy
      lineHeight: "1em",
      textTransform: "uppercase",
      marginBottom: "15px",
    },
    textP: {
      fontSize: "0.9em",
      color: "#999", // Soft gray for paragraph
      margin: "20px 0",
      fontWeight: "400",
      maxWidth: "700px",
    },
    textA: {
      display: "inline-block",
      fontSize: "1em",
      background: "linear-gradient(to right, #c31432, #240b36)",
      padding: "10px 20px",
      textTransform: "uppercase",
      textDecoration: "none",
      fontWeight: "500",
      marginTop: "10px",
      color: "#ffffff",
      letterSpacing: "2px",
      transition: "0.2s",
      borderRadius: "5px",
      boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
    },
    legalLinks: {
      marginTop: "10px",
    },
    legalLink: {
      color: "#fff",
      textDecoration: "none",
    },
    videoLegalLinks: {
      display: "none", // Hide the old legal links
    },
    footerRibbon: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      background: "#336633",
      padding: "8px 16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      borderTop: "1px solid rgba(153, 204, 102, 0.3)",
    },
    footerLink: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "14px",
      padding: "0 8px",
      transition: "opacity 0.2s",
      opacity: 0.8,
      "&:hover": {
        opacity: 1,
        textDecoration: "none",
      },
    },
    footerDivider: {
      color: "#ffffff",
      opacity: 0.5,
      margin: "0 8px",
      fontSize: "14px",
    },
    copyrightText: {
      color: "#ffffff",
      fontSize: "14px",
      opacity: 0.8,
      position: "absolute",
      left: "16px",
    },
    footerLinksContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    purposeCard: {
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      width: "700px",
      textAlign: "left",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 5,
      opacity: 1, // Always visible
      transition: "opacity 0.5s ease",
      border: "1px solid rgba(51, 102, 51, 0.2)",
      display: "flex",
      flexDirection: "column",
    },
    purposeMainTitle: {
      color: "#0a236e",
      fontSize: "48px",
      fontWeight: "800",
      textAlign: "center",
      marginBottom: "10px",
      fontFamily: "Times New Roman, Arial, sans-serif",
    },
    purposeSubTitle: {
      color: "#340c66",
      fontSize: "36px",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "30px",
      textTransform: "uppercase",
    },
    purposeTitle: {
      color: "#336633", // Dark green color
      fontSize: "28px",
      fontWeight: "600",
      marginBottom: "20px",
      textAlign: "center",
      borderBottom: "2px solid rgba(51, 102, 51, 0.2)",
      paddingBottom: "15px",
    },
    purposeText: {
      color: "#333333", // Dark gray for better readability
      fontSize: "16px",
      lineHeight: "1.8",
      marginBottom: "20px",
    },
    purposeHighlight: {
      color: "#336633", // Dark green for emphasis
      fontWeight: "600",
    },
    purposeList: {
      color: "#333333",
      fontSize: "16px",
      lineHeight: "1.8",
      marginTop: "20px",
      paddingLeft: "20px",
    },
    purposeListItem: {
      marginBottom: "15px",
      position: "relative",
      paddingLeft: "15px",
      "&::before": {
        content: "''",
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: "6px",
        height: "6px",
        backgroundColor: "#336633",
        borderRadius: "50%",
      },
    },
    purposeButton: {
      alignSelf: "center",
      marginTop: "20px",
      padding: "12px 30px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#ffffff",
      backgroundColor: "#336633",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "1px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        backgroundColor: "#2a552a",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      },
    },
  };

  useEffect(() => {
    if (!isBrowser) return; // Skip server-side execution

    const videoElement = videoRef.current;

    // Ensure videoElement is not null or undefined
    if (!videoElement) return;

    // Play the video when modal is visible
    if (modalVisible) {
      videoElement.play();
    } else {
      videoElement.pause();
    }

    // Function to display the message after 6 seconds
    const displayMessage = () => {
      const showMessageTimeout = setTimeout(() => {
        if (modalVisible) {
          setShowMessage(true);
        }
      }, 6000); // 6 seconds

      return showMessageTimeout; // Return the timeout ID for clearing later
    };

    // Initially call displayMessage to start the timer for the first time
    const initialTimeout = displayMessage();

    // Loop the video if it reaches 156 seconds
    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= 100) {
        videoElement.currentTime = 0; // Reset video to the start
        setShowMessage(false); // Hide the message and card
        clearTimeout(initialTimeout); // Clear the initial timeout
        displayMessage(); // Start a new 6-second timer
      }
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      clearTimeout(initialTimeout); // Clear initial timeout on component unmount
      videoElement.removeEventListener("timeupdate", handleTimeUpdate); // Remove event listener on unmount
    };
  }, [modalVisible, isBrowser]);

  useEffect(() => {
    if (!isBrowser) return; // Skip server-side execution

    // Ensure videoRef.current is not null or undefined
    if (!videoRef.current) return;

    let timer;
    if (isPlaying) {
      videoRef.current.play();
      timer = setTimeout(() => {
        setShowMessage(true);
      }, 9000); // 9 seconds
    } else {
      videoRef.current.pause();
      clearTimeout(timer); // Clear the timer if video is paused
    }
    return () => clearTimeout(timer); // Clear the timer when component is unmounted
  }, [isPlaying, isBrowser]);

  const setCookie = (name, value, seconds) => {
    if (!isBrowser) return; // Skip server-side execution

    const d = new Date();
    d.setTime(d.getTime() + seconds * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  // Get current year dynamically - do this only on client-side
  const currentYear = isBrowser ? new Date().getFullYear() : 2024;

  return (
    <>
      {/* SEO */}
      <NextSeo
        title="Bihar Samaj Abu Dhabi - Uniting Cultures in the UAE"
        description="Bihar Samaj Abu Dhabi represents the rich cultural heritage of Bihar, Jharkhand, and Uttar Pradesh (UP) in the UAE. Join our community for vibrant cultural events and support."
        canonical="https://www.biharsamajabudhabi.com"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com",
          title: "Bihar Samaj Abu Dhabi - Uniting Cultures in the UAE",
          description:
            "Bihar Samaj Abu Dhabi symbolizes cultural unity in the UAE, celebrating the heritage of Bihar, Jharkhand, and Uttar Pradesh (UP) with vibrant events and communal support.",
          site_name: "Bihar Samaj Abu Dhabi",
          type: "website", // Specifying the type of the website
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/bsadcover.png", // Path to your default share image
              width: 800,
              height: 600,
              alt: "Bihar Samaj Abu Dhabi",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Bihar Samaj Abu Dhabi - Uniting Cultures in the UAE",
          description:
            "Bihar Samaj Abu Dhabi represents the rich cultural heritage of Bihar, Jharkhand, and Uttar Pradesh (UP) in the UAE. Join our community for vibrant cultural events and support.",
          image: "https://www.biharsamajabudhabi.com/bsadcover.png", // Path to your default share image
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://www.biharsamajabudhabi.com/img/icon/favicon/favicon.ico", // Path to your favicon
          },
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
              "Bihar Samaj Abu Dhabi, Cultural Unity UAE, Bihar Jharkhand Uttar Pradesh (UP) Heritage, Indian Community Abu Dhabi, Cultural Events, Community Support, Cultural Harmony, Bihar Samaj Global",
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

      {/* Comment out the entire initial modal section */}
      {/* {modalVisible && !introVideoFinished && (
        <>
          <div style={styles.modal}>
            <video
              ref={videoRef}
              style={styles.video}
              autoPlay
              loop
              muted
              playsInline
              onEnded={() => setIntroVideoFinished(true)}
            >
              <source
                src="https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-videos-bucket/main4.mp4"
                type="video/mp4"
              />
            </video>

            <div style={styles.purposeCard}>
              <h1 style={styles.purposeMainTitle}>Bihar Samaj</h1>
              <h2 style={styles.purposeSubTitle}>Abu Dhabi</h2>
              <h3 style={styles.purposeTitle}>Welcome to Our Community</h3>
              <p style={styles.purposeText}>
                <span style={styles.purposeHighlight}>
                  Bihar Samaj Abu Dhabi
                </span>{" "}
                is a distinguished community organization established in 2019.
                We are dedicated to uniting and supporting people from Bihar,
                Jharkhand, and Uttar Pradesh residing in the UAE.
              </p>
              <p style={styles.purposeText}>
                As a registered non-profit organization, we serve as a bridge
                between our cultural heritage and our life in the UAE,
                fostering a strong sense of community and mutual support.
              </p>
              <p style={styles.purposeText}>
                Our platform provides comprehensive support through:
              </p>
              <ul style={styles.purposeList}>
                <li style={styles.purposeListItem}>
                  <span style={styles.purposeHighlight}>
                    Community Support Services
                  </span>
                  : Comprehensive assistance with housing, employment
                  opportunities, and social welfare programs
                </li>
                <li style={styles.purposeListItem}>
                  <span style={styles.purposeHighlight}>
                    Cultural Heritage Preservation
                  </span>
                  : Organization of traditional festivals and cultural events
                  including Chhath Puja and Holi celebrations
                </li>
                <li style={styles.purposeListItem}>
                  <span style={styles.purposeHighlight}>
                    Professional Networking
                  </span>
                  : Facilitating connections between professionals and
                  families from our regions
                </li>
                <li style={styles.purposeListItem}>
                  <span style={styles.purposeHighlight}>Resource Center</span>:
                  Providing guidance and information about UAE regulations,
                  lifestyle, and integration
                </li>
              </ul>
              <button 
                style={styles.purposeButton}
                onClick={handleExploreClick}
              >
                Explore Bihar Samaj ➡
              </button>
            </div>

            <div className="control-bar">
              <div
                className="control-button"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <>
                    <PauseCircleFilled
                      style={{ fontSize: "30px", marginRight: "6px" }}
                    />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayCircleFilled
                      style={{ fontSize: "30px", marginRight: "6px" }}
                    />
                    Play
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )} */}

      {/* Announcement Modal - Only render on client-side */}
      {isBrowser && showAnnouncementCard && !modalVisible && (
        <div className="announcementCard">
          <img
            src={modalAnnouncement?.modalImage}
            alt="Announcement"
            className="announcementImage"
          />
          <div className="announcementText">
            <p>{modalAnnouncement?.message}</p>
            {modalAnnouncement?.hyperlink && (
              <a
                href={modalAnnouncement?.hyperlink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn announcementLink" // Apply the 'btn' class
              >
                More Information
              </a>
            )}
            <div className="socialLinks">
              <a
                href="https://www.facebook.com/BiharSamajAbuDhabiOfficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/biharsamajabudhabi_official/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://twitter.com/samaj_bihar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://youtube.com/@BiharSamajAbudhabiOffical?si=N-9zqYUu1aIFYPu1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <button
            onClick={handleCloseAnnouncementCard}
            className="btn closeButton" // Apply the 'btn' class
          >
            Close
          </button>
        </div>
      )}

      <div
        className={
          isBrowser && showAnnouncementCard && !modalVisible
            ? "blur-background"
            : ""
        }
      >
        <LayoutOne>
          {/* Hero Slider */}
          {!loading && <HeroSliderFour data={heroImages} />}

          {/* About Us Preview */}
          <Container>
            <AboutUsPreview />
          </Container>

          {/* Non-Profit Preview */}
          <Container>
            <NonProfit />
          </Container>

          {/* YouTube Video */}
          <YouTubeVideo videoUrl="https://www.youtube.com/watch?v=RM4c8AEmmEw" />

          {/* Social-Media Preview */}
          <Container>
            <SocialGroup />
          </Container>

          {/* Community Members Preview */}
          {communityMembers && communityMembers.length >= 3 && (
            <Container>
              <CommunityMember data={communityMembers} />
            </Container>
          )}

          {/* Recent 3 Blogs Preview */}

          {recentBlogs && recentBlogs.length > 0 && (
            <Container>
              <BlogSlide
                data={recentBlogs}
                postType="inline"
                postClassName={`-coffee ${
                  recentBlogs.length === 1
                    ? "single-blog"
                    : recentBlogs.length === 2
                    ? "double-blog"
                    : ""
                }`}
                headerTitle="Our Recent Blogs"
                headerClass="-center -coffee"
              />
            </Container>
          )}

          {/* Recent 3 Events Preview */}

          {recentEvents && recentEvents.length > 0 && (
            <Container>
              <EventSlide
                data={recentEvents}
                postType="inline"
                postClassName={`-coffee ${
                  recentEvents.length === 1
                    ? "single-event"
                    : recentEvents.length === 2
                    ? "double-event"
                    : ""
                }`}
                headerTitle="Our Recent Events"
                headerClass="-center -coffee"
              />
            </Container>
          )}

          {/* Testimonial Area Preview */}
          <TestimonialArea />
        </LayoutOne>
      </div>

      {/* Permanent Footer - Always visible */}
      <div style={styles.footerRibbon}>
        <span style={styles.copyrightText}>
          © {currentYear}, Bihar Samaj Abu Dhabi
        </span>
        <div style={styles.footerLinksContainer}>
          <a
            href="/information/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.footerLink}
          >
            Privacy Policy
          </a>
          <span style={styles.footerDivider}>|</span>
          <a
            href="/information/terms-service"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.footerLink}
          >
            Terms of Service
          </a>
          <span style={styles.footerDivider}>|</span>
          <a
            href="/do-not-sell-my-information"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.footerLink}
          >
            Do Not Sell My Information
          </a>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const page = query.page ? query.page : 1;

    // Fetching blogs
    const blogsRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/blogs-approved-paginated?page=${page}`
    );
    const blogsData = blogsRes.data;

    // Fetching events
    const eventsRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/events-approved-paginated?page=${page}`
    );
    const eventsData = eventsRes.data;

    // Fetching community-members
    const communityMembersRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/community-members-featured`
    );
    const communityMembersData = communityMembersRes.data;

    // Fetch the hero images
    const heroImages = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/hero/images/approved`
    );

    const heroImagesData = heroImages.data;

    // Pass blogs, events and community-members data as props
    return {
      props: {
        recentBlogs: blogsData.blogs,
        recentEvents: eventsData.events,
        communityMembers: communityMembersData,
        heroImages: heroImagesData,
      },
    };
  } catch (error) {
    console.error("FETCH_DATA_ERROR", error);

    // Return empty props in case of an error
    return { props: {} };
  }
}

export default Home;
