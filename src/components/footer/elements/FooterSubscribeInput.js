import React from "react";
import { Form, Input, Button } from "antd";

const FooterSubscribeInput = ({ email, setEmail }) => {
  return (
    <>
      <Form name="basic" className="footer-subscribe__form">
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="subscribe-button"
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}/information/newsletter-subscription`,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Subscribe Newsletter
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FooterSubscribeInput;
