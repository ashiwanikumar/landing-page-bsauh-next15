import React from "react";
import classNames from "classnames";
import { Col, Row, Empty, Rate } from "antd";
import Link from "next/link";
import SectionTitle from "../../other/SectionTitle";

function CommunityMember({ data }) {
  return (
    <div
      className={"categories-one"}
      style={{
        marginBottom: "100px",
      }}
    >
      <SectionTitle
        title={"Global Voices, Local Hearts"}
        className={classNames("-center -coffee")}
      />
      <Row gutter={[{ sm: 0, md: 15 }]} className={"row-container"}>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <div className={"categories-one-item"}>
                <div
                  className={classNames(
                    "categories-one-item__image",
                    "up-down-anim-hover"
                  )}
                >
                  <img
                    src={item.profilePicture}
                    alt={item.profilePicture + " image"}
                  />
                </div>
                <div className={"categories-one-item__info"}>
                  <h3 className="reviewer-name">{item?.name}</h3>
                  <Rate disabled defaultValue={item?.rating} />
                  <p>{item?.review}</p>
                </div>
                <div className={"community-card"}>
                  <h4>{item.title}</h4>
                  <p>{item.reviewMessage}</p>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Row>

      <Link
        href="/community"
        className={classNames("view-all-link", "-center -coffee")}
      >
        View All Community Members
      </Link>
    </div>
  );
}

export default React.memo(CommunityMember);
