import React from "react";
import axios from "axios";
import { Breadcrumb, Row, Col } from "antd";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import BlogSidebar from "../../components/blog/BlogSidebar";
import PostDetailLayout from "../../components/detail/post/PostDetailLayout";

const BlogDetails = (props) => {
  const { blog, blogCategories, tags, recentBlogs } = props;

  return (
    <LayoutOne title="Blog details">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Blog details</Breadcrumb.Item>
          <Breadcrumb.Item>{blog?.title}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="blog-detail">
          <Row gutter={30}>
            <Col xs={24} lg={6}>
              <BlogSidebar
                recentBlogs={recentBlogs}
                blogCategories={blogCategories}
                blogTags={tags}
              />
            </Col>
            <Col xs={24} lg={18}>
              <PostDetailLayout blog={blog} />
            </Col>
          </Row>
        </div>
      </Container>
    </LayoutOne>
  );
};

export async function getServerSideProps({ query }) {
  const { slug } = query;
  const blogId = slug[0]; // The first part of the slug is the blog ID

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/blog/${blogId}/cats-tags`
    );
    const blogCatsTags = res.data;
    return {
      props: blogCatsTags,
    };
  } catch (error) {
    console.error("FETCH_BLOG_BY_ID_ERROR", error);
    return { props: {} };
  }
}

export default BlogDetails;
