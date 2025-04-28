import { useState, useEffect } from "react";
import { Card, Button, Spin } from "antd";
import { useRouter } from "next/router";
import {
  unsubscribeFromEmail,
  resubscribeToEmail,
  getUnsubscribeStatus,
} from "../../../apis/email";

const UnsubscribeEmail = () => {
  const router = useRouter();
  const { email, campaignId, campaignName } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unsubscribeStatus, setUnsubscribeStatus] = useState(null);

  useEffect(() => {
    if (email) {
      getUnsubscribeStatus(email)
        .then((res) => {
          setUnsubscribeStatus(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("ERROR", err);
          setError(err.response?.data?.message);
          setLoading(false);
        });
    }
  }, [email]);

  const handleCampaignUnsubscribe = async () => {
    try {
      setLoading(true);
      await unsubscribeFromEmail({
        email,
        campaignId,
        type: "campaign",
        metadata: {
          source: "link",
          timestamp: new Date(),
        },
      });

      const newStatus = await getUnsubscribeStatus(email);
      setUnsubscribeStatus(newStatus.data);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribeAll = async () => {
    try {
      setLoading(true);
      await unsubscribeFromEmail({
        email,
        type: "all",
        metadata: {
          source: "link",
          timestamp: new Date(),
        },
      });

      const newStatus = await getUnsubscribeStatus(email);
      setUnsubscribeStatus(newStatus.data);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResubscribe = async () => {
    try {
      setLoading(true);
      if (unsubscribeStatus?.globallyUnsubscribed) {
        await resubscribeToEmail({ email });
      } else {
        await resubscribeToEmail({ email, campaignId });
      }

      const newStatus = await getUnsubscribeStatus(email);
      setUnsubscribeStatus(newStatus.data);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (!email || !campaignId || !campaignName) {
    return (
      <div className="bsad-unsubscribe-wrapper">
        <div className="bsad-status-message">
          <h1 className="bsad-status-message__title">
            Invalid unsubscribe link
          </h1>
          <p className="bsad-status-message__text">
            This link appears to be invalid or expired.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bsad-unsubscribe-wrapper">
        <div className="bsad-status-message">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (unsubscribeStatus?.globallyUnsubscribed) {
      return (
        <>
          <h1 className="bsad-fade-in">You're unsubscribed from all emails</h1>
          <div className="bsad-fade-in">
            <p>
              Would you like to receive emails again?{" "}
              <Button
                type="link"
                onClick={handleResubscribe}
                className="bsad-action-button--link"
              >
                Resubscribe
              </Button>
            </p>
          </div>
        </>
      );
    }

    const isUnsubscribedFromCampaign =
      unsubscribeStatus?.campaignUnsubscribes?.some(
        (u) => u.campaignId === campaignId
      );

    return (
      <>
        <h1 className="bsad-fade-in">{decodeURIComponent(campaignName)}</h1>

        {isUnsubscribedFromCampaign ? (
          <div className="bsad-fade-in">
            <p>
              You've unsubscribed from this campaign.{" "}
              <Button
                type="link"
                onClick={handleResubscribe}
                className="bsad-action-button--link"
              >
                Undo
              </Button>
            </p>
          </div>
        ) : (
          <Button
            onClick={handleCampaignUnsubscribe}
            className="bsad-action-button--unsubscribe bsad-fade-in"
          >
            Unsubscribe from this campaign
          </Button>
        )}

        <div className="bsad-divider">
          <div className="bsad-divider__content">
            <p>
              Though we'd hate to lose touch, you can opt out of all emails
              here:
            </p>
            <Button
              onClick={handleUnsubscribeAll}
              className="bsad-action-button--secondary"
            >
              Unsubscribe from all emails*
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="bsad-unsubscribe-wrapper">
      <div className="flex justify-center">
        <Card className="bsad-unsubscribe-card">
          <div className="bsad-unsubscribe-card__content">
            <div className="text-center">
              {renderContent()}

              <div className="bsad-divider">
                <div className="bsad-preferences">
                  <p className="bsad-preferences__text">
                    We'd never want to be just more clutter in your inbox, so
                    we've made it easier for you to pick and choose how you'd
                    like to hear from us.
                  </p>
                  <Button
                    type="primary"
                    className="bsad-preferences__button"
                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/information/sitemap`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Update your preferences
                  </Button>
                </div>
              </div>

              <div className="bsad-footer">
                <p className="bsad-footer__notice">
                  Please note: It can take up to 72 hours for your request to be
                  processed.
                </p>
                <p className="bsad-footer__notice">
                  *You will still receive account-related emails including
                  payment, security, and legal information. Furthermore, this
                  will not affect your email subscriptions on other platforms.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UnsubscribeEmail;
