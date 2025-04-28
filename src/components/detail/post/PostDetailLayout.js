import { Button } from "antd";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import ShareModal from "../../other/ShareModal";
import React, { useState } from "react";

function PostDetailContent({ blog }) {
  const router = useRouter();
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
  // Construct the absolute URL for the cover image
  const coverImageUrl = `${blog?.coverImage}`;

  // Handlers for button actions
  const handleBackToList = () => {
    router.push("/blog"); // Update this URL as per your routing
  };

  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  const navigateBack = () => {
    router.push("/blog"); // Update this URL to the blog list page
  };
  const handleShare = () => {
    setIsShareModalVisible(true); // Show the ShareModal
  };

  const handleCloseShareModal = () => {
    setIsShareModalVisible(false); // Hide the ShareModal
  };

  // Apply css to images
  const applyCssToImages = (content) => {
    return content.replace(/<img/g, '<img style="width:100%;"');
  };

  // Parsed content
  const parsedContent =
    blog.version === "v1" || blog.version === undefined
      ? parse(applyCssToImages(draftToHtml(JSON.parse(blog.content))))
      : parse(applyCssToImages(blog.content));

  return (
    <>
      <NextSeo
        title={blog?.title}
        description={blog?.description}
        canonical={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${
          blog._id
        }/${createSlug(blog.title)}`}
        openGraph={{
          type: "article",
          article: {
            publishedTime: blog.publishedDate,
            modifiedTime: blog.updatedAt,
            tags: blog.tags.map((tag) => tag.name),
          },
          url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${
            blog._id
          }/${createSlug(blog.title)}`,
          title: blog?.title,
          description: blog?.description,
          site_name: "Bihar Samaj Abu Dhabi",
          images: [
            {
              url: coverImageUrl,
              width: 800,
              height: 600,
              alt: blog?.title,
              type: "image/jpeg",
            },
            {
              url: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/658202dc78355991e36b49ee/IMG_4069-1705316825251.jpg",
              width: 800,
              height: 600,
              alt: "Blog | Bihar Samaj Abu Dhabi - Insights and Stories",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          image: coverImageUrl,
          title: blog?.title,
        }}
        additionalLinkTags={[
          {
            rel: "me",
            href: "https://www.instagram.com/biharsamaj_official/",
          },
          {
            rel: "me",
            href: "https://www.youtube.com/@biharsamaj_official",
          },
          {
            rel: "me",
            href: "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
          },
        ]}
        additionalMetaTags={[
          {
            name: "keywords",
            content: blog.tags.map((tag) => tag.name),
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
        ]}
      />

      <div className="event-detail-back-button-container">
        {/* Back to Blog List Button at the top */}
        <Button
          onClick={navigateBack}
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fff"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
              />
              <path
                fill="#fff"
                d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
              />
            </svg>
          }
        >
          Back to Blog List
        </Button>
        <ShareModal
          isVisible={isShareModalVisible}
          onClose={handleCloseShareModal}
        />
      </div>

      <div className="post-detail-content">
        <div className="post-detail-content__main">
          <h1 className="event-post-title">{blog?.title} </h1>
          <img
            title={blog?.title}
            src={blog?.coverImage}
            alt="Post image"
            style={{
              width: "100%",
            }}
            className="post-detail-image"
          />
          <p className="sa-post-content">{parsedContent}</p>
        </div>

        <div className="post-detail-content__footer">
          <div className="post-detail-content__footer-tags">
            {blog?.tags?.map((item, index) => (
              <Button key={index}>{item?.name}</Button>
            ))}
          </div>

          <div className="post-detail-content__footer-share">
            <ShareModal
              isVisible={isShareModalVisible}
              onClose={handleCloseShareModal}
              // Include any other necessary props for ShareModal
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(PostDetailContent);
