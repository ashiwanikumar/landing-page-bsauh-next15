import React, { useState } from "react";
import axios from "axios";
import LayoutOne from "../../../components/layout/LayoutOne";
import RegisterNow from "../../../components/event/RegisterNow";
import Container from "../../../components/other/Container";
import { NextSeo } from "next-seo";

const EventRegister = (props) => {
  const { event } = props;

  return (
    <>
      <NextSeo
        title={`${event.title} | Bihar Samaj Abu Dhabi - Event Registration`}
        description={`Join us for ${event.title}. Discover the rich heritage of Bihar, Jharkhand, and Uttar Pradesh through this event.`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/${event._id}`,
          title: `${event.title} | Bihar Samaj Abu Dhabi - Event Registration`,
          description: `Join us for ${event.title}. Discover the rich heritage of Bihar, Jharkhand, and Uttar Pradesh through this event.`,
          images: [
            {
              url:
                event.coverImage ||
                "https://www.biharsamajabudhabi.com/assets/images/websiteaboutus/bsadabout.png",
              width: 1200,
              height: 628,
              alt: event.title,
              type: "image/png",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          image:
            event.coverImage || // Corrected from images to image
            "https://www.biharsamajabudhabi.com/assets/images/websiteaboutus/bsadabout.png", // Ensure this is singular
        }} // Ensure this is closed properly
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
      <LayoutOne>
        <Container>
          <RegisterNow event={event} />
        </Container>
      </LayoutOne>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const slug = context.params.slug; // Ensure you're getting the slug correctly
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/event/${slug[0]}`
    );
    const event = res.data;

    return { props: { event } };
  } catch (error) {
    console.error("FETCH_EVENT_BY_ID_ERROR", error);
    return { props: {} }; // Return empty props in case of an error
  }
}

export default EventRegister;
