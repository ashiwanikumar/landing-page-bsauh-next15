import React from "react";
import classNames from "classnames";
import { Button } from "antd";
import { useDispatch } from "react-redux";

import {
  setCurrentCategory,
  setCurrentTag,
} from "../../redux/actions/blogFilterActions";
import Post from "../../components/post/Post";

const BlogSidebarSection = ({ children, title, className }) => {
  return (
    <div className={`blog-sidebar-section ${classNames(className)}`}>
      <div className="blog-sidebar-section__header">
        <h5>{title}</h5>
      </div>
      <div className="blog-sidebar-section__content">{children}</div>
    </div>
  );
};

const BlogSidebar = ({ recentBlogs, blogCategories, blogTags }) => {
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
      <BlogSidebarSection className="-categories" title="Categories">
        <ul>
          {blogCategories?.length > 0 && (
            <li className={""}>
              <a onClick={(e) => onChooseCategory(e, "")} href="#">
                All Blogs
              </a>
            </li>
          )}

          {blogCategories?.length > 0 ? (
            blogCategories.map((item, index) => (
              <li className={""} key={index}>
                <a onClick={(e) => onChooseCategory(e, item.name)} href="#">
                  {item.name}
                </a>
              </li>
            ))
          ) : (
            <div>
              <p>No Blog Categories Found</p>
            </div>
          )}
        </ul>
      </BlogSidebarSection>

      <BlogSidebarSection className="-recent-post" title="Recent Blogs">
        {recentBlogs?.length > 0 ? (
          recentBlogs.map((item, index) => (
            <Post key={index} type="tiny" data={item} />
          ))
        ) : (
          <div>
            <p>No Recent Blogs Found</p>
          </div>
        )}
      </BlogSidebarSection>

      <BlogSidebarSection className="-tags" title="Popular Tags">
        {blogTags?.length > 0 ? (
          blogTags.map((item, index) => (
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
            <p>No Blog Tags Found</p>
          </div>
        )}
      </BlogSidebarSection>
    </div>
  );
};

export default React.memo(BlogSidebar);
