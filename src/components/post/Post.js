import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { Button, Image } from "antd";
import ShareModalOnImage from "../other/ShareModalOnImage";

import { formatDate, removeDash } from "../../common/utils";

function Post({ type, className, style, data }) {
  // Create slug based on title
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
        ""
      )
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  switch (type) {
    case "inline":
      return (
        <div className={`post-inline ${classNames(className)}`}>
          <div className="post-inline-image">
            <img title={data.title} src={data.coverImage} alt="Post image" />
            <div
              style={{
                position: "absolute",
                top: "30px",
                right: "25px",
              }}
            >
              <ShareModalOnImage
                url={
                  process.env.NEXT_PUBLIC_FRONTEND_URL +
                  `/blog/${data._id}/${createSlug(data.title)}`
                }
              />
            </div>
          </div>
          <div className="post-inline-content">
            <div className="post-inline-content__meta">
              <p>
                <i className="fal fa-calendar" />
                {formatDate(data.publishedDate)}
              </p>
            </div>
            <Link
              href={`/blog/${data._id}/${createSlug(data.title)}`}
              className="post-title"
            >
              {data.title}
            </Link>
          </div>
        </div>
      );

    case "row":
      return (
        <div className={`post -style-one ${classNames(className)}`}>
          <div className="post-image">
            <Link href={`/blog/${data._id}/${createSlug(data.title)}`}>
              <Image
                title={data.title}
                src={data.coverImage}
                alt="Post image"
                placeholder
              />
            </Link>
          </div>
          <div className="post-content">
            <Button type="primary" className="post-category">
              {removeDash(data.category)}
            </Button>
            <Link href={`/blog/post/${data.slug}`} className="post-title">
              {data.title}
            </Link>
            <div className="post-info">
              <p className="credit date">{formatDate(data.publicDate)}</p>
              <p className="credit comment">{data.comments.length} Comment</p>
            </div>
            <p className="post-description">{data.shortDescription}</p>
            <Link
              href={`/blog/${data._id}/${createSlug(data.title)}`}
              className="post-readmore"
            >
              Read More
              <span>
                <i className="arrow_carrot-2right" />
              </span>
            </Link>
          </div>
        </div>
      );
    case "column-full":
      return (
        <div
          className={`post -style-three ${classNames(className)}`}
          style={{
            marginBottom: "50px",
          }}
        >
          <div className="post-image">
            <img title={data.title} src={data.coverImage} alt="Post image" />
            <div
              style={{
                position: "absolute",
                top: "30px",
                right: "25px",
              }}
            >
              <ShareModalOnImage
                url={
                  process.env.NEXT_PUBLIC_FRONTEND_URL +
                  `/blog/${data._id}/${createSlug(data.title)}`
                }
              />
            </div>
          </div>
          <div className="post-content">
            <div className="post-info">
              <p className="credit date">{formatDate(data.publishedDate)}</p>
              {data.author?.name}
            </div>
            <h3 className="post-title">
              <Link
                href={`/blog/${data._id}/${createSlug(data.title)}`}
                className="post-title"
              >
                {data.title}
              </Link>
            </h3>
            <p className="post-description">{data.description}</p>
            <Link
              href={`/blog/${data._id}/${createSlug(data.title)}`}
              className="post-readmore"
            >
              Read More
              <span>
                <i className="arrow_carrot-2right" />
              </span>
            </Link>
          </div>
        </div>
      );
    case "tiny":
      return (
        <div className={`post-tiny ${classNames(className)}`}>
          <div className="post-tiny-image">
            <Link href={`/blog/${data._id}/${createSlug(data.title)}`}>
              <Image
                width="100%"
                title={data.title}
                src={data.coverImage}
                alt="Post image"
                placeholder
              />
            </Link>
          </div>
          <div className="post-tiny-content">
            <Link
              href={`/blog/${data._id}/${createSlug(data.title)}`}
              className="post-tiny-title"
            >
              {data.title}
            </Link>
            <p className="post-tiny-date">{formatDate(data.publishedDate)}</p>
          </div>
        </div>
      );
    default:
      return (
        <div className={`post -style-two ${classNames(className)}`}>
          <div className="post-image">
            <Link href={`/blog/${data._id}/${createSlug(data.title)}`}>
              <Image
                title={data.title}
                src={data.coverImage}
                alt="Post image"
                placeholder
              />
            </Link>
          </div>
          <div className="post-content">
            <Button type="primary" className="post-category">
              {removeDash(data.category)}
            </Button>
            <Link
              href={`/blog/${data._id}/${createSlug(data.title)}`}
              className="post-title"
            >
              {data.title}
            </Link>
            <div className="post-info">
              <p className="credit date">{formatDate(data.publicDate)}</p>
              <p className="credit comment">{data.comments.length} Comment</p>
            </div>
          </div>
        </div>
      );
  }
}

export default React.memo(Post);
