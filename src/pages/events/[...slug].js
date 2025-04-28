import React from "react";
import axios from "axios";
import { Breadcrumb } from "antd";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import EventPostDetailLayout from "../../components/detail/post/EventPostDetailLayout";

const EventDetails = (props) => {
  const { event, eventCategories, tags, recentEvents } = props;

  return (
    <LayoutOne title={`${event?.title} | Bihar Samaj Abu Dhabi Events`}>
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Events</Breadcrumb.Item>
          <Breadcrumb.Item>{event?.title}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="event-detail">
          <EventPostDetailLayout
            event={event}
            recentEvents={recentEvents}
            eventCategories={eventCategories}
          />
        </div>
      </Container>
    </LayoutOne>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const eventId = slug[0];

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/event/${eventId}/cats-tags`
    );
    const eventCatsTags = res.data;
    return {
      props: eventCatsTags,
    };
  } catch (error) {
    console.error("FETCH_EVENT_BY_ID_ERROR", error);
    return { props: {} };
  }
}

export default EventDetails;
