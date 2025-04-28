import React from "react";
import classNames from "classnames";
import { Button } from "antd";
import { useDispatch } from "react-redux";

import {
  setCurrentCategory,
  setCurrentTag,
} from "../../redux/actions/eventFilterActions";
import EventPost from "../../components/post/EventPost";

const EventSidebarSection = ({ children, title, className }) => {
  return (
    <div className={`blog-sidebar-section ${classNames(className)}`}>
      <div className="blog-sidebar-section__header">
        <h5>{title}</h5>
      </div>
      <div className="blog-sidebar-section__content">{children}</div>
    </div>
  );
};

const EventSidebar = ({ recentEvents, eventCategories, eventTags }) => {
  const dispatch = useDispatch();

  const onChooseCategory = (e, val) => {
    e.preventDefault();
    dispatch(setCurrentCategory(val));
  };

  const onChooseTag = (val) => {
    dispatch(setCurrentTag(val));
  };

  return (
    <div className="blog-sidebar">
      <EventSidebarSection className="-categories" title="Categories">
        <ul>
          {eventCategories?.length > 0 && (
            <li className={""}>
              <a onClick={(e) => onChooseCategory(e, "")} href="#">
                All Events
              </a>
            </li>
          )}

          {eventCategories?.length > 0 ? (
            eventCategories.map((item, index) => (
              <li className={""} key={index}>
                <a onClick={(e) => onChooseCategory(e, item.name)} href="#">
                  {item.name}
                </a>
              </li>
            ))
          ) : (
            <div>
              <p>No Event Categories Found</p>
            </div>
          )}
        </ul>
      </EventSidebarSection>

      <EventSidebarSection className="-recent-post" title="Recent Events">
        {recentEvents?.length > 0 ? (
          recentEvents.map((item, index) => (
            <EventPost key={index} type="tiny" data={item} />
          ))
        ) : (
          <div>
            <p>No Recent Events Found</p>
          </div>
        )}
      </EventSidebarSection>

      <EventSidebarSection className="-tags" title="Popular Tags">
        {eventTags?.length > 0 ? (
          eventTags.map((item, index) => (
            <Button
              className={""}
              onClick={() => onChooseTag(item.name)}
              key={index}
            >
              {item.name}
            </Button>
          ))
        ) : (
          <div>
            <p>No Event Tags Found</p>
          </div>
        )}
      </EventSidebarSection>
    </div>
  );
};

export default React.memo(EventSidebar);
