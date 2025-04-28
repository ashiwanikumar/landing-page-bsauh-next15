import React, { useEffect, useState } from "react";
import { Card, Typography, Spin, Breadcrumb } from "antd";
import { useRouter } from "next/router";
import LayoutOne from "../../../../components/layout/LayoutOne";
import Container from "../../../../components/other/Container";
import { verifyWhatsappRegistrationByEmail } from "../../../../apis/whatsappRegister";
const { Title, Paragraph } = Typography;

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      handleVerifyToken(token);
    }
  }, [token]);

  const handleVerifyToken = async (token) => {
    setLoading(true);
    try {
      const response = await verifyWhatsappRegistrationByEmail(token);
      if (response.status === 200) {
        setVerificationStatus(response.data.type[0].message);
      } else {
        setVerificationStatus("Verification failed. Invalid or expired token.");
      }
    } catch (error) {
      console.error("Error during email verification:", error);
      setVerificationStatus("Verification failed. An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutOne title="Email Verification">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Email Verification</Breadcrumb.Item>
        </Breadcrumb>

        <div className="member-card-title">Verify Your Email</div>
        <Card
          style={{
            textAlign: "center",
            marginTop: "50px",
            boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
          }}
        >
          <Title level={4}>Email Verification</Title>
          {loading ? (
            <Spin tip="Verifying..."></Spin>
          ) : (
            <Paragraph>{verificationStatus}</Paragraph>
          )}
        </Card>
      </Container>
    </LayoutOne>
  );
};

export default React.memo(VerifyEmail);
