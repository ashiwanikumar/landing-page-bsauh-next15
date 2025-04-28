import React from "react";
import Link from "next/link";
import { Row, Col } from "antd";

import footerLinks from "../../../data/footer-links.json";

function FooterQuickLinks({ colSize }) {
  return (
    <div className="newFooter__links">
      <Row gutter={[30, 30]}>
        {footerLinks.map((group, index) => (
          <Col key={index} {...colSize}>
            <div className="newFooter__linkGroup">
              <h4>{group.title}</h4>
              <ul>
                {group.items.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>
                      {link.title}
                      {(link.title === "Website Feedback" ||
                        link.title === "Talent Registration") && (
                        <span className="newFooter__newBadge">New</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default React.memo(FooterQuickLinks);
