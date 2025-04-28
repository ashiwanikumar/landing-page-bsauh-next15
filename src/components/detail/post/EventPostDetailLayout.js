import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import ShareModal from "../../other/ShareModal";

// Helper function to convert UTC to local time
function convertUTCToLocal(utcDateString) {
  const date = new Date(utcDateString);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

// Helper function to create URL-friendly slugs
function createSlug(title) {
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
}

// Countdown Timer Component
function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    const localTargetDate = convertUTCToLocal(targetDate);
    const difference = localTargetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (Object.keys(timeLeft).length === 0) {
    return <span className="epdl-countdown-expired">Time's Up!</span>;
  }

  return (
    <div className="epdl-countdown">
      <div className="epdl-countdown-item">
        <span className="epdl-countdown-value">
          {String(timeLeft.days).padStart(2, "0")}
        </span>
        <span className="epdl-countdown-label">Days</span>
      </div>
      <div className="epdl-countdown-item">
        <span className="epdl-countdown-value">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="epdl-countdown-label">Hours</span>
      </div>
      <div className="epdl-countdown-item">
        <span className="epdl-countdown-value">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="epdl-countdown-label">Minutes</span>
      </div>
      <div className="epdl-countdown-item">
        <span className="epdl-countdown-value">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="epdl-countdown-label">Seconds</span>
      </div>
    </div>
  );
}

// Event Status Display Component
function EventStatusDisplay({ event }) {
  const now = new Date();
  const eventDate = convertUTCToLocal(event.eventDate);
  const regCloseDate = convertUTCToLocal(event.registrationDetails.closingDate);

  const isEventEnded = now > eventDate;
  const isRegistrationClosed = now > regCloseDate;

  if (isEventEnded) {
    return (
      <div className="epdl-event-status-display event-ended">
        <div className="status-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="status-content">
          <h3 className="status-title">Event Has Ended</h3>
          <p className="status-date">
            Event Date: {eventDate.toLocaleString()}
          </p>
          <div className="status-message">
            Thank you for your interest. This event has concluded. Stay tuned
            for upcoming events!
          </div>
        </div>
      </div>
    );
  }

  if (isRegistrationClosed) {
    return (
      <div className="epdl-event-status-display registration-closed">
        <div className="status-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <div className="status-content">
          <h3 className="status-title">Registration Closed</h3>
          <p className="status-date">
            Closed on: {regCloseDate.toLocaleString()}
          </p>
          <div className="status-message">
            Event is happening in:
            <div className="time-remaining">
              <CountdownTimer targetDate={event.eventDate} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="epdl-countdown-section">
      <h3 className="epdl-countdown-title">Registration Closes In:</h3>
      <CountdownTimer targetDate={event.registrationDetails.closingDate} />
    </div>
  );
}

// Main Layout Component
function EventPostDetailLayout({ event, recentEvents, eventCategories }) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigateBack = () => router.push("/events");
  const navigateToRegister = () =>
    router.push(`/events/register-now/${event._id}`);

  if (!event) {
    return <div className="epdl-loading">Loading...</div>;
  }

  const eventRegStatus =
    new Date() > convertUTCToLocal(event.registrationDetails.closingDate) ||
    new Date() > convertUTCToLocal(event.eventDate);

  return (
    <div className="epdl-container">
      <NextSeo
        title={
          event.metaTitle || `${event.title} | Bihar Samaj Abu Dhabi Events`
        }
        description={event.metaDescription || event.description}
        canonical={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/${
          event._id
        }/${createSlug(event.title)}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/${
            event._id
          }/${createSlug(event.title)}`,
          title:
            event.metaTitle || `${event.title} | Bihar Samaj Abu Dhabi Events`,
          description: event.metaDescription || event.description,
          site_name: "Bihar Samaj Abu Dhabi",
          images: [
            {
              url: event.coverImage, // Ensure coverImage is included
              width: 1200,
              height: 630,
              alt: event.coverImageAlt || event.title,
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title:
            event.metaTitle || `${event.title} | Bihar Samaj Abu Dhabi Events`,
          description: event.metaDescription || event.description,
          image: event.coverImage, // Ensure coverImage is included for Twitter
        }}
        additionalLinkTags={[
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
              "Bihar Samaj Abu Dhabi, Cultural Unity UAE, Bihar Culture, Jharkhand Culture, UP Culture, Community Events, Cultural Festivals, Indian Community UAE, Bihar Heritage",
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

      <div className="epdl-header">
        <button
          className="epdl-register-button"
          onClick={navigateToRegister}
          disabled={eventRegStatus}
        >
          {eventRegStatus ? "Registration Closed" : "Register Now"}
        </button>
      </div>

      <img
        src={event.coverImage}
        alt={event.coverImageAlt || event.title}
        className={`epdl-cover-image ${imageLoaded ? "loaded" : ""}`}
        onLoad={() => setImageLoaded(true)}
      />

      <h1 className="epdl-title">{event.title}</h1>

      <div className="epdl-tags">
        {event.tags.map((tag) => (
          <span key={tag._id} className="epdl-tag">
            {tag.name}
          </span>
        ))}
      </div>

      <div className="epdl-details">
        <div className="epdl-detail-item">
          <span className="epdl-detail-title">Date & Time:</span>
          <span className="epdl-detail-value">
            {convertUTCToLocal(event.eventDate).toLocaleString()}
          </span>
        </div>
        <div className="epdl-detail-item">
          <span className="epdl-detail-title">Location:</span>
          <span className="epdl-detail-value">{event.location}</span>
        </div>
        <div className="epdl-detail-item">
          <span className="epdl-detail-title">Attendance Mode:</span>
          <span className="epdl-detail-value">{event.eventAttendanceMode}</span>
        </div>
        <div className="epdl-detail-item">
          <span className="epdl-detail-title">Price:</span>
          <span className="epdl-detail-value">
            {event.offers?.price} {event.offers?.priceCurrency}
          </span>
        </div>
      </div>

      <div className="epdl-divider"></div>

      <div className="epdl-event-details">
        <h2 className="epdl-section-title">Event Details</h2>

        <EventStatusDisplay event={event} />

        <div className="epdl-event-details-grid">
          <div className="epdl-event-details-column">
            <div className="epdl-event-detail-item">
              <span className="epdl-detail-label">Organizer:</span>
              <span className="epdl-detail-value">Bihar Samaj Abu Dhabi</span>
            </div>
            <div className="epdl-event-detail-item">
              <span className="epdl-detail-label">Performer:</span>
              <span className="epdl-detail-value">{event.performer}</span>
            </div>
            <div className="epdl-event-detail-item">
              <span className="epdl-detail-label">Event Status:</span>
              <span className="epdl-detail-value">{event.eventStatus}</span>
            </div>
          </div>

          <div className="epdl-event-details-column">
            <div className="epdl-event-detail-item">
              <span className="epdl-detail-label">Availability:</span>
              <span className="epdl-detail-value">
                {eventRegStatus ? "Not Available" : event.offers?.availability}
              </span>
            </div>
            <div className="epdl-event-detail-item">
              <span className="epdl-detail-label">Registration Status:</span>
              <span className="epdl-detail-value">
                {eventRegStatus ? "Closed" : "Open"}
              </span>
            </div>
          </div>

          <div className="epdl-event-details-column">
            <div className="epdl-event-detail-item">
              <span className="epdl-detail-label">Registration Opens:</span>
              <span className="epdl-detail-value">
                {convertUTCToLocal(
                  event.registrationDetails?.openingDate
                ).toLocaleString()}
              </span>
            </div>
            <div className="epdl-event-detail-item">
              <span className="epdl-detail-label">Registration Closes:</span>
              <span className="epdl-detail-value">
                {convertUTCToLocal(
                  event.registrationDetails?.closingDate
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="epdl-divider"></div>

      <div className="epdl-description">
        {parse(event.content || "<p>No description available.</p>")}
      </div>

      <div className="epdl-divider"></div>

      <div className="epdl-carousel">
        <h2>Recent Events</h2>
        <div className="epdl-carousel-container">
          {recentEvents.map((recentEvent, index) => (
            <div
              key={index}
              className="epdl-carousel-item"
              onClick={() =>
                router.push(
                  `/events/${recentEvent._id}/${createSlug(recentEvent.title)}`
                )
              }
            >
              <img
                src={recentEvent.coverImage}
                alt={recentEvent.title}
                className="epdl-carousel-image"
                loading="lazy"
              />
              <h4 className="epdl-carousel-title">{recentEvent.title}</h4>
              <p className="epdl-carousel-date">
                {new Date(recentEvent.eventDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="epdl-divider"></div>

      <div className="epdl-footer">
        <button
          className="epdl-footer-button epdl-back-button"
          onClick={navigateBack}
        >
          Back to Event List
        </button>
        <ShareModal />
      </div>
    </div>
  );
}

export default EventPostDetailLayout;
