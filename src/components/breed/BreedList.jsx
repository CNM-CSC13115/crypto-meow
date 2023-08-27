import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Badge, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import CatBox from "../cat/CatBox";
import { MediumCatContainer } from "../cat/CatBoxContainers";
import { selectKittyById } from "../cat/catSlice";
import { CatModel } from "../js/catFactory";
import Service from "../js/service";
import { selectOfferByKittyId } from "../market/offerSlice";

export const BreedListType = {
  user: "Your Kitties",
  sire: "Buy Sire",
};

function useCurrentKitty(kittyId) {
  const kitty = useSelector((state) => selectKittyById(state, kittyId));
  const offer = useSelector((state) => selectOfferByKittyId(state, kittyId));

  return {
    kitty: kitty ? new CatModel(kitty) : null,
    offer,
  };
}

export default function BreedList({
  listType,
  kittyId,
  disabled: rawDisabled,
  onClick,
}) {
  const model = useCurrentKitty(kittyId);

  // const isSireList = useCallback(
  //   () => listType === BreedListType.sire,
  //   [listType]
  // );

  const isOnCoolDown = useCallback(() => {
    if (model.kitty) {
      const now = moment();
      const cooldownEnd = moment.unix(model.kitty.cat.cooldownEndTime);
      return now.isBefore(cooldownEnd);
    }

    return false;
  }, [model]);

  const [onCooldown, setOnCooldown] = useState(isOnCoolDown());

  useEffect(() => {
    setOnCooldown(isOnCoolDown());
    let timer;
    if (isOnCoolDown()) {
      timer = setInterval(() => {
        setOnCooldown(isOnCoolDown());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOnCoolDown, onCooldown, model]);

  const readyStatus = {
    isReady: false,
    msg: "",
  };

  if (model.offer && listType !== BreedListType.sire) {
    readyStatus.msg = model.offer.isSireOffer
      ? "Not Ready: Siring"
      : "Not Ready: On Sale";
  } else if (onCooldown) {
    readyStatus.msg = "Not Ready: On Cooldown";
  } else {
    readyStatus.isReady = true;
    readyStatus.msg = "Ready";
  }

  const disabled = rawDisabled || !readyStatus.isReady;

  return (
    <div
      onClick={() => !disabled && onClick(model)}
      style={{ cursor: disabled ? "default" : "pointer" }}
      className="d-flex flex-column align-items-center"
    >
      <Row>
        <span>
          {model.offer
            ? `${Service.web3.utils.fromWei(model.offer.price)} ETH `
            : ""}
        </span>
        <Badge
          variant={readyStatus.isReady ? "success" : "secondary"}
          className="m-1"
        >
          {readyStatus.msg}
        </Badge>
      </Row>
      <div className="relative flex items-center justify-center">
        {disabled && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-80 z-10 rounded-[32px]"></div>
        )}
        <MediumCatContainer>
          <CatBox model={model.kitty} />
        </MediumCatContainer>
      </div>
    </div>
  );
}
