import React from "react";
import { useRouter } from "next/router";
import SectionTitle from "../other/SectionTitle";

// Import the CSS Module
import styles from "../../styles/module/about-us-preview.module.scss";

const AboutUsPreview = () => {
  const router = useRouter();

  const handleMoreClick = () => {
    router.push("/about/about-us"); // Navigate to the full About Us page
  };

  return (
    <div className={styles["about-us-preview"]}>
      <div className={styles["title-container"]}>
        <SectionTitle title={"Bridging Cultures, Building Community"} />
      </div>

      <p>
        🤗 Since 2019, Bihar Samaj Abu Dhabi has been a vibrant community
        representing Bihar, Jharkhand, and Uttar Pradesh in the UAE. We
        celebrate our diverse heritage and connect people globally 🌍🌟.
      </p>

      <p>
        🎉 Organizing cultural events and festivals, we highlight our rich
        traditions, from Holi to Chhath Puja, reinforcing our cultural roots 🙏.
      </p>

      <p>
        🏠 Offering support in job search, housing, and social welfare, we aim
        to create a nurturing environment for our members in the UAE.
      </p>

      <p>
        ❤️ Join us in celebrating unity and cultural harmony, crafting a legacy
        in the heart of the UAE. #BiharSamajGlobal #UnityInDiversity
        #CulturalHarmony
      </p>

      <p>
        🌍 Engaging in community-driven initiatives, we strive to foster a sense
        of belonging and mutual support among our members, creating a home away
        from home.
      </p>

      <div className={styles["button-container"]}>
        <button className={styles["know-more-btn"]} onClick={handleMoreClick}>
          Know More About Us
        </button>
      </div>
    </div>
  );
};

export default AboutUsPreview;
