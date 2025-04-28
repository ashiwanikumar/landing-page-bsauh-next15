import React from "react";
import { Skeleton, Empty } from "antd";
import classNames from "classnames";
import Slider from "react-slick";

import SectionTitle from "../../other/SectionTitle";
import Post from "../../post/Post";

export default function BlogSlide({
  data,
  postType,
  postClassName,
  headerTitle,
  headerClass,
  className,
}) {
  const settings = {
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div
      className={`blog-slide ${classNames(className)}`}
      style={{
        marginBottom: "100px",
      }}
    >
      <SectionTitle title={headerTitle} className={classNames(headerClass)} />
      <div className="blog-slide-content">
        {data.loading ? (
          <Skeleton active />
        ) : data.length > 0 ? (
          <Slider {...settings}>
            {data.map((item, index) => (
              <div key={index} className="slide-item">
                <Post
                  data={item}
                  type={postType}
                  className={classNames(postClassName)}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Blog In This Category"
          />
        )}
      </div>
    </div>
  );
}
