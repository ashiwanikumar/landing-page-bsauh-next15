import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SectionTitle from "../other/SectionTitle";

const TestimonialArea = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    // Add Slick slider CSS if not already loaded
    const slickCssLoaded = document.getElementById("slick-slider-css");
    if (!slickCssLoaded) {
      const slickCss = document.createElement("link");
      slickCss.id = "slick-slider-css";
      slickCss.rel = "stylesheet";
      slickCss.href =
        "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css";
      document.head.appendChild(slickCss);

      const slickThemeCss = document.createElement("link");
      slickThemeCss.rel = "stylesheet";
      slickThemeCss.href =
        "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css";
      document.head.appendChild(slickThemeCss);
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseMove = (e) => {
    const scrollY = window.scrollY || window.pageYOffset;
    setIsMoving(e.target.closest(".testimonial_ref"));
    if (isMoving) {
      setMousePosition({ x: e.clientX, y: e.clientY + scrollY });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    className: "testimonial-slider", // Add a custom class
  };

  const testimonials = [
    {
      name: "Surya Patel",
      title: "Community Member",
      review:
        "I'm amazed by the incredible efforts of Bihar Samaj Abu Dhabi in promoting cultural integration and fostering unity. Their events are a beautiful showcase of our heritage!",
    },
    {
      name: "Priya Kumari",
      title: "Community Member",
      review:
        "Joining Bihar Samaj Abu Dhabi has been a transformative experience. It's more than a community; it's a family that supports and celebrates each other's success and heritage.",
    },
    {
      name: "Raj Singhania",
      title: "Community Member",
      review:
        "The cultural events and festivals organized by Bihar Samaj Abu Dhabi are a true reflection of the diverse and rich cultures of Bihar, Jharkhand, and Uttar Pradesh. Absolutely heartwarming!",
    },
    {
      name: "Anjali Rao",
      title: "Community Member",
      review:
        "Bihar Samaj Abu Dhabi stands out for its commitment to empowering the community and fostering unity. Their support in job search, housing, and social welfare is commendable.",
    },
    {
      name: "Vivek Mishra",
      title: "Community Member",
      review:
        "If you're from Bihar, Jharkhand, or Uttar Pradesh and living in the UAE, Bihar Samaj Abu Dhabi is the perfect place to connect with your roots and build a supportive network.",
    },
    {
      name: "Nisha Chauhan",
      title: "Community Member",
      review:
        "The vision and mission of Bihar Samaj Abu Dhabi are inspiring. They are truly making a difference in creating a culturally rich and inclusive environment for everyone in the UAE.",
    },
    {
      name: "Arjun Pandey",
      title: "Community Member",
      review:
        "Bihar Samaj Abu Dhabi is crafting a legacy of unity and cultural harmony that resonates deeply with me. Proud to be part of this incredible community!",
    },
    {
      name: "Simran Jain",
      title: "Community Member",
      review:
        "The Chhath Puja and Holi celebrations by Bihar Samaj Abu Dhabi are just a glimpse of the vibrant cultural tapestry they offer. It's a wonderful way to keep our traditions alive and thriving in the UAE!",
    },
    {
      name: "Aman Gupta",
      title: "Community Member",
      review:
        "Bihar Samaj Abu Dhabi is a beacon of cultural heritage and community support in the UAE. Their efforts in bridging cultures and building community are truly remarkable.",
    },
    {
      name: "Ritu Sharma",
      title: "Community Member",
      review:
        "Bihar Samaj Abu Dhabi is a vibrant hub that celebrates the rich traditions of Bihar, Jharkhand, and Uttar Pradesh in the UAE. A fantastic community that truly embodies cultural unity and support!",
    },
    {
      name: "Abhishek",
      title: "Admin Member",
      review:
        "As an admin of Bihar Samaj Abu Dhabi, I am privileged to work with a team that is dedicated to the enrichment and welfare of our community. It's inspiring to see how our cultural activities and support services bring people together and foster a sense of belonging.",
    },
    {
      name: "Aditya",
      title: "Admin Member",
      review:
        "My role in Bihar Samaj Abu Dhabi has given me the opportunity to engage with and contribute to our community's growth. The dedication to preserving our cultural heritage while embracing the diversity of the UAE is what makes this organization so special.",
    },
    {
      name: "Manoj",
      title: "Admin Member",
      review:
        "Working with Bihar Samaj Abu Dhabi has been a fulfilling experience, helping to coordinate events that celebrate our rich traditions. It's rewarding to see the joy and unity our events bring to the community, enhancing the cultural landscape of the UAE.",
    },
  ];

  return (
    <div className="testimonial-area">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial__container">
            <div className="title-container-testimonial">
              <SectionTitle title="Empowering Connections: Voices of Bihar Samaj Abu Dhabi Members" />
            </div>
            <p className="testimonial__text">''{testimonial.review}''</p>
            <div className="testimonial__info">
              <h4>{testimonial.name}</h4>
              <span>{testimonial.title}</span>
              <div className="testimonial__rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialArea;
