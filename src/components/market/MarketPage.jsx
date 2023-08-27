import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, ButtonGroup } from "react-bootstrap";

import Offer from "./Offer";
import { offerTypes } from "../js/kittyConstants";
import { OfferEventDismiss, selectOfferIdsByType } from "./offerSlice";
import { MarketTransType } from "./offerSaga";
import { Button } from "antd";

export default function MarketPage() {
  const dispatch = useDispatch();
  const [currOfferType, setCurrOfferType] = useState(offerTypes.sell);
  const offerIds = useSelector((state) =>
    selectOfferIdsByType(state, currOfferType)
  );

  const eventData = useSelector((state) => state.offers.event);
  let eventAlert = null;
  if (eventData) {
    let msg = "";
    switch (eventData.TxType) {
      case MarketTransType.sellOfferPurchased:
        msg = `Successfully purchased kitty #${eventData.tokenId}`;
        break;
      case MarketTransType.offerCancelled:
        msg = `Offer for kitty #${eventData.tokenId} cancelled!`;
        break;
      default:
        msg = `${eventData.TxType} kitty #${eventData.tokenId}`;
    }
    eventAlert = (
      <Alert
        variant="info"
        dismissible
        show={Boolean(eventData)}
        onClose={() => dispatch(OfferEventDismiss())}
      >
        {msg}
      </Alert>
    );
  }

  const offerBoxes = offerIds.map((id) => <Offer key={id} tokenId={id} />);

  return (
    <div className="p-5 bg-pink-100">
      <div className="flex gap-4 items-start mb-3">
        <div>
          <h1>Kitty Marketplace</h1>
          <p>Buy and sell kitties!</p>
          {eventAlert}
        </div>
        <ButtonGroup className="mb-2 gap-2">
          <Button
            danger
            size="large"
            type={currOfferType === offerTypes.sell ? "primary" : "default"}
            onClick={() => setCurrOfferType(offerTypes.sell)}
          >
            Kitties For Sale
          </Button>
          <Button
            danger
            size="large"
            type={currOfferType === offerTypes.sire ? "primary" : "default"}
            onClick={() => setCurrOfferType(offerTypes.sire)}
          >
            Sire Offers
          </Button>
        </ButtonGroup>
      </div>

      <div className="grid grid-cols-4 gap-y-4">{offerBoxes}</div>
    </div>
  );
}
