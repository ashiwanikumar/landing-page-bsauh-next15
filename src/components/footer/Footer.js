import React from "react";
import { Row, Col } from "antd";
import classNames from "classnames";

import Container from "../other/Container";
import FooterQuickLinks from "./elements/FooterQuickLinks";
import FooterInformation from "./elements/FooterInformation";
import FooterSubscribeInput from "./elements/FooterSubscribeInput";

const Footer = ({ containerFluid, className }) => {
  const handleSubscribeNewsletter = (email) => {
    // Handle subscription logic here
    console.log("Subscribing email:", email);
  };

  return (
    <footer className={`newFooter ${classNames(className)}`}>
      <div className="newFooter__top">
        <Container fluid={containerFluid}>
          <Row gutter={[30, 30]}>
            <Col xs={24} md={8} lg={6}>
              <FooterInformation />
            </Col>
            <Col xs={24} md={16} lg={18}>
              <FooterQuickLinks colSize={{ xs: 24, sm: 12, md: 8 }} />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="newFooter__subscribe">
        <Container>
          <Row align="middle" gutter={[30, 30]}>
            <Col xs={24} md={14}>
              <div className="newFooter__subscribeContent">
                <h3>Stay Connected with Bihar Samaj Abu Dhabi</h3>
                <p>
                  Join our community and stay updated on upcoming events,
                  cultural programs, and exclusive offers. Your journey with us
                  begins here!
                </p>
              </div>
            </Col>
            <Col xs={24} md={10}>
              <FooterSubscribeInput onSubscribe={handleSubscribeNewsletter} />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="newFooter__bottom">
        <Container>
          <Row justify="space-between" align="middle">
            <Col xs={24} md={12}>
              <p className="newFooter__copyright">
                Crafted with passion by
                <a
                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/ashiwani-kumar`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ashiwani Kumar
                </a>
                . © {new Date().getFullYear()} Bihar Samaj Abu Dhabi. All rights
                reserved.
              </p>
            </Col>
            <Col xs={24} md={12} className="newFooter__legal">
              <a href="/information/privacy-policy">Privacy Policy</a>
              <a href="/information/terms-service">Terms of Service</a>
              <button
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/do-not-sell-my-information`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="newFooter__doNotSell"
              >
                Do Not Sell My Information
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
