import React from "react";
import { useRouter } from "next/router";
import SectionTitle from "../other/SectionTitle";

function NonProfit() {
  const router = useRouter();

  return (
    <div className="non-profit-preview">
      <div className="title-container">
        <SectionTitle title={"Empowering Community, Enriching Lives"} />
      </div>

      {/* Highlight the non-profit nature of the community */}
      <p className="non-profit-statement">
        💖 As a non-profit community organization, we dedicate ourselves to
        meaningful social impact, fostering growth and solidarity.
      </p>
      <h4>🌟 Community Welfare at Heart</h4>
      <p>
        🤲 Dedicated to social welfare, we focus on uplifting the lives of our
        members through various community support programs.
      </p>

      <h4>🌱 Fostering Education and Health</h4>
      <p>
        📚🩺 We believe in the power of education and health, organizing events
        and initiatives aimed at enhancing learning and well-being.
      </p>

      <h4>💪 Volunteerism and Engagement</h4>
      <p>
        🙌 With a robust volunteer network, we drive change through active
        engagement and selfless service within the community.
      </p>

      <h4>🤝 Solidarity and Support</h4>
      <p>
        🏠 We provide essential support in areas such as housing and job
        assistance, ensuring every member feels supported and valued.
      </p>

      <h4>🎭 Preserving Cultural Heritage</h4>
      <p>
        🎨 Emphasizing the importance of cultural heritage, we organize events
        that celebrate our traditions and promote cultural understanding.
      </p>
    </div>
  );
}

export default NonProfit;
