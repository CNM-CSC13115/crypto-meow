import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "antd";
import { offerTypes } from "../js/kittyConstants";
import ApproveMarket from "../market/ApproveMarket";
import { buyOffer, cancelOffer } from "../market/offerSaga";
import {
  selectOfferByKittyId,
  sellKitty,
  sireKitty,
} from "../market/offerSlice";
import { selectIsApproved } from "../wallet/walletSlice";
import CatAction from "./CatAction";
import { Button } from "antd";

export default function CatActions({ kittyId, isBuyMode }) {
  const dispatch = useDispatch();

  const [offerType, setOfferType] = useState(undefined);
  const offer = useSelector((state) => selectOfferByKittyId(state, kittyId));
  useEffect(() => {
    if (offer) {
      const theOfferType = offer.isSireOffer
        ? offerTypes.sire
        : offerTypes.sell;
      setOfferType(theOfferType);
    }
  }, [offer]);

  const approved = useSelector(selectIsApproved);
  const [askForApproval, setAskForApproval] = useState(false);
  useEffect(() => {
    // hide the approval button after approval given
    if (askForApproval && approved) {
      setAskForApproval(false);
    }
  }, [askForApproval, approved]);

  const onActionClicked = async (type) => {
    if (!approved) {
      setAskForApproval(true);
    }
    setOfferType(type);
  };

  const handleApproveCancel = () => setAskForApproval(false);

  const createSaleOffer = async (price) => {
    if (approved) {
      dispatch(sellKitty({ kittyId, price }));
    } else {
      setAskForApproval(true);
    }
  };

  const createSireOffer = async (price) =>
    dispatch(sireKitty({ kittyId, price }));
  const handleCancelOffer = async () => dispatch(cancelOffer({ kittyId }));
  const handleBuyKittyClicked = async () => dispatch(buyOffer({ offer }));
  const handleBackClicked = () => setOfferType(undefined);

  // sire offers handled in the breed page
  // by navigating there with the sireId as a query param
  const handleBuySireOfferClicked = async () => Promise.resolve(true);

  let action;

  switch (offerType) {
    case offerTypes.sell:
      action = (
        <CatAction
          offer={offer}
          btnText="Sell"
          btnTextPlural="Selling"
          isBuyMode={isBuyMode}
          kittyId={kittyId}
          handleBackClicked={handleBackClicked}
          handleCreateOfferClicked={createSaleOffer}
          handleBuyOfferClicked={handleBuyKittyClicked}
          handleCancelOffer={handleCancelOffer}
        />
      );
      break;

    case offerTypes.sire:
      action = (
        <CatAction
          offer={offer}
          btnText="Sire"
          btnTextPlural="Siring"
          isBuyMode={isBuyMode}
          kittyId={kittyId}
          handleBackClicked={handleBackClicked}
          handleCreateOfferClicked={createSireOffer}
          handleBuyOfferClicked={handleBuySireOfferClicked}
          handleCancelOffer={handleCancelOffer}
        />
      );
      break;

    default:
      break;
  }

  return (
    <div>
      {action}
      <div className="flex gap-2">
        {Object.keys(offerTypes).map((keyName) => (
          <Button
            key={keyName}
            className="flex-1 bg-[#fd9bb3] hover:bg-red-400 text-white font-medium hover:border-none"
            size="large"
            onClick={() => onActionClicked(offerTypes[keyName])}
          >
            {offerTypes[keyName]}
          </Button>
        ))}
      </div>
      {askForApproval ? (
        <Modal open footer={null}>
          <ApproveMarket handleApproveCancel={handleApproveCancel} />
        </Modal>
      ) : (
        offerType && (
          <Modal
            open
            title={offerType === offerTypes.sell ? "Sell" : "Sire"}
            footer={null}
          >
            {action}
          </Modal>
        )
      )}
    </div>
  );
}

CatActions.propTypes = {
  kittyId: PropTypes.string.isRequired,
  isBuyMode: PropTypes.bool.isRequired,
};
