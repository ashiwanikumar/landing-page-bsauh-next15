import React, { useEffect, useState } from "react";
import { Col, Row, Tabs } from "antd";
import { NextSeo } from "next-seo";
import { getAllGalleryImagesApproved } from "../../../apis/gallery";
import axios from "axios";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import FacebookPostEmbed from "../../../components/FacebookPostEmbed/FacebookPostEmbed";

const { TabPane } = Tabs;

export default function Gallery() {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [instagramImages, setInstagramImages] = useState([]);

  const fetchGalleryImages = async () => {
    try {
      const galleryImagesResponse = await getAllGalleryImagesApproved();
      const galleryImages = galleryImagesResponse.data?.reduce((acc, image) => {
        if (acc[image.category.name]) {
          acc[image.category.name].push(image.image);
        } else {
          acc[image.category.name] = [image.image];
        }
        return acc;
      }, {});
      setImages(galleryImages);
      const categories = galleryImagesResponse.data?.map(
        (image) => image.category.name
      );
      const uniqueCategories = [...new Set(categories)];
      setCategories(uniqueCategories);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchInstagramMedia = async () => {
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    const fields = "id,media_type,media_url,permalink";
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`
      );
      const fetchedMedia = response.data.data;
      setInstagramImages(fetchedMedia);
    } catch (error) {
      console.error("Failed to fetch Instagram media:", error);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
    fetchInstagramMedia();

    const script = document.createElement("script");
    script.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <NextSeo
        title="Gallery | Bihar Samaj Abu Dhabi - Cultural Celebrations"
        description="Explore our gallery at Bihar Samaj Abu Dhabi to witness the vibrant cultural celebrations, events, and activities of our community in the UAE."
        canonical="https://www.biharsamajabudhabi.com/resources/gallery"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/resources/gallery",
          title: "Gallery | Bihar Samaj Abu Dhabi - Cultural Celebrations",
          description:
            "Explore our gallery at Bihar Samaj Abu Dhabi to witness the vibrant cultural celebrations, events, and activities of our community in the UAE.",
          site_name: "Bihar Samaj Abu Dhabi",
          images: [
            {
              url: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/main.jpg",
              width: 800,
              height: 600,
              alt: "Blog | Bihar Samaj Abu Dhabi - Insights and Stories",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Gallery | Bihar Samaj Abu Dhabi - Cultural Celebrations",
          description:
            "Explore our gallery at Bihar Samaj Abu Dhabi to witness the vibrant cultural celebrations, events, and activities of our community in the UAE.",
          image:
            "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/main.jpg", // Replace with the URL of a relevant image for the gallery page
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
              "Bihar Samaj Abu Dhabi Gallery, Cultural Celebrations Photos, Community Events Images, UAE Indian Community, Bihar Jharkhand UP Culture, Vibrant Celebrations Gallery, Cultural Festivities Photos, Abu Dhabi Indian Community",
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

      <LayoutOne title="Gallery">
        <Container>
          <div className="gallery-page">
            <Tabs defaultActiveKey="facebook" centered={true}>
              {categories.map((category) => (
                <TabPane tab={category} key={category}>
                  <Row gutter={[16, 16]}>
                    {images[category] && images[category].length > 0 ? (
                      images[category].map((image, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                          <div className="gallery-image">
                            <img
                              src={image}
                              alt={`Gallery image ${index}`}
                              className="responsive-image"
                            />
                          </div>
                        </Col>
                      ))
                    ) : (
                      <div className="no-images">No images found</div>
                    )}
                  </Row>
                </TabPane>
              ))}

              <TabPane tab="Instagram" key="instagram">
                <Row gutter={[16, 16]}>
                  {instagramImages.length === 0 ? (
                    <div className="no-images">No Instagram images found</div>
                  ) : (
                    instagramImages.map((item, index) => (
                      <Col xs={24} sm={12} md={8} key={index}>
                        <a
                          href={item.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="instagram-image">
                            {item.media_type === "VIDEO" ? (
                              <video className="responsive-video" controls>
                                <source src={item.media_url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <img
                                src={item.media_url}
                                alt={`Instagram post ${index}`}
                                className="responsive-image"
                              />
                            )}
                          </div>
                        </a>
                      </Col>
                    ))
                  )}
                </Row>
              </TabPane>

              <TabPane tab="Facebook Events" key="facebook">
                <Row gutter={[16, 16]} justify="center">
                  {[
                    "https://www.facebook.com/100063745592613/posts/1122877156513794/",
                    "https://www.facebook.com/100063745592613/posts/1091644742970369/",
                    "https://www.facebook.com/100063745592613/posts/851462030321976/",
                    "https://www.facebook.com/100063745592613/posts/1129259085875601/",
                    "https://www.facebook.com/100063745592613/posts/1133667498768093/",
                  ].map((postUrl, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                      <FacebookPostEmbed postUrl={postUrl} />
                    </Col>
                  ))}
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Container>
      </LayoutOne>
    </>
  );
}
