import { Button, Card, CardContent, Divider } from "@material-ui/core";
import CardSpacer from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import Skeleton from "@saleor/components/Skeleton";
import GiftCardExpirySelect from "@saleor/giftCards/components/GiftCardExpirySelect";
import GiftCardTagInput from "@saleor/giftCards/components/GiftCardTagInput";
import React from "react";
import { useIntl } from "react-intl";

import useGiftCardDetails from "../hooks/useGiftCardDetails";
import useGiftCardUpdateForm from "../hooks/useGiftCardUpdateForm";
import GiftCardUpdateDetailsBalanceSection from "./GiftCardUpdateDetailsBalanceSection";
import { giftCardUpdateDetailsCardMessages as messages } from "./messages";

interface GiftCardUpdateDetailsCardProps {
  onSetBalanceButtonClick: () => void;
}

const GiftCardUpdateDetailsCard: React.FC<GiftCardUpdateDetailsCardProps> = ({
  onSetBalanceButtonClick
}) => {
  const intl = useIntl();

  const { loading } = useGiftCardDetails();

  const {
    change,
    data: { expiryType, expiryPeriodAmount, expiryPeriodType, tag },
    formErrors
  } = useGiftCardUpdateForm();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(messages.title)}
        toolbar={
          <Button
            data-test-id="set-balance-button"
            color="primary"
            onClick={onSetBalanceButtonClick}
          >
            {intl.formatMessage(messages.setBalanceButtonLabel)}
          </Button>
        }
      />
      <CardContent>
        <Skeleton>
          {!loading && (
            <>
              <GiftCardUpdateDetailsBalanceSection />
              <CardSpacer />
              <Divider />
              <CardSpacer />
              <GiftCardTagInput
                error={formErrors?.tag}
                name="tag"
                withTopLabel
                value={tag}
                change={change}
              />
              <CardSpacer />
              <GiftCardExpirySelect
                errors={formErrors}
                change={change}
                expiryType={expiryType}
                expiryPeriodAmount={expiryPeriodAmount}
                expiryPeriodType={expiryPeriodType}
              />
            </>
          )}
        </Skeleton>
      </CardContent>
    </Card>
  );
};

export default GiftCardUpdateDetailsCard;