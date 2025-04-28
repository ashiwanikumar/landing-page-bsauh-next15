import Link from "next/link";
import React, { useState } from "react";
import classNames from "classnames";
import { Button, Image } from "antd";
import ShareModalOnImage from "../other/ShareModalOnImage";

import { formatDate, removeDash } from "../../common/utils";

function Post({ type, className, style, data, isPast }) {
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

  // Truncate title to 30 characters and add ellipsis if longer
  const truncatedTitle =
    data.title.length > 60 ? data.title.substring(0, 60) + "..." : data.title;

  // State to manage the visibility of the registration form
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Toggle the visibility of the registration form
  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here
  };

  // Function to check if the event date has passed
  const isEventDatePassed = () => {
    const today = new Date();
    const eventDate = new Date(data.eventDate);
    return eventDate < today;
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
                  `/events/${data._id}/${createSlug(data.title)}`
                }
              />
            </div>
          </div>
          <div className="post-inline-content">
            <div className="post-inline-content__meta">
              <p>
                <i className="fal fa-calendar" />
                {formatDate(data.eventDate)}
              </p>
            </div>
            <Link
              href={`/events/${data._id}/${createSlug(data.title)}`}
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
            <Link href={`/events/${data._id}/${createSlug(data.title)}`}>
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
            <Link href={`/events/post/${data.slug}`} className="post-title">
              {data.title}
            </Link>
            <div className="post-info">
              <p className="credit date">{formatDate(data.publicDate)}</p>
              <p className="credit comment">{data.comments.length} Comment</p>
            </div>
            <p className="post-description">{data.shortDescription}</p>
            <Link
              href={`/events/${data._id}/${createSlug(data.title)}`}
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
        <div className="event-card">
          {isEventDatePassed() && (
            <div className="ribbon ribbon-top-left">
              <span>Ended</span>
            </div>
          )}
          <div className="event-card-image">
            <img title={data.title} src={data.coverImage} alt="Event image" />
            <div className="share-button">
              {/* Share button component */}
              <ShareModalOnImage
                url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/${
                  data._id
                }/${createSlug(data.title)}`}
              />
            </div>
          </div>
          <div className="event-card-content">
            <h3 className="event-card-title">{data.title}</h3>
            <div className="event-card-actions">
              <Link
                href={`/events/${data._id}/${createSlug(data.title)}`}
                className="event-card-button ev-read-more"
              >
                Read More
              </Link>
              {!isPast && (
                <Link
                  href={`/events/register-now/${data._id}`}
                  className="event-card-button ev-register-event"
                >
                  Register
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    case "tiny":
      return (
        <div className={`post-tiny ${classNames(className)}`}>
          <div className="post-tiny-image">
            <Link href={`/events/${data._id}/${createSlug(data.title)}`}>
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
              href={`/events/${data._id}/${createSlug(data.title)}`}
              className="post-tiny-title"
            >
              {data.title}
            </Link>
            <p className="post-tiny-date">{formatDate(data.eventDate)}</p>
          </div>
        </div>
      );
    default:
      return (
        <div className={`post -style-two ${classNames(className)}`}>
          <div className="post-image">
            <Link href={`/events/${data._id}/${createSlug(data.title)}`}>
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
              href={`/events/${data._id}/${createSlug(data.title)}`}
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
