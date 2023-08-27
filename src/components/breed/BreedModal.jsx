import React, { useMemo, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { selectKittiesByOwner } from "../cat/catSlice";
import {
  selectOfferByKittyId,
  selectSireOfferForBreeding,
} from "../market/offerSlice";
import BreedList, { BreedListType } from "./BreedList";
import { approveParent } from "./breedSaga";
import { ParentType } from "./breedSlice";

import { Button, Modal } from "antd";

const PlaceHolder = styled.div`
  color: white;
  border-radius: 5px;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BreedModal = ({ type, open, onClose, onOk }) => {
  const [listType, setListType] = useState(BreedListType.user);
  // from a market sire offer
  // should lock the dad selection
  // breed button should buy the offer
  const dispatch = useDispatch();

  const {
    dadId,
    mumId,
    sireOfferId,
    // error TODO: display errors
  } = useSelector((state) => state.breed);

  const wallet = useSelector((state) => state.wallet);
  const kittyList = useSelector((state) =>
    selectKittiesByOwner(state, wallet.account)
  );
  const sireList = useSelector((state) =>
    selectSireOfferForBreeding(state, wallet.account)
  );

  const [model, setModel] = useState(null);

  const list = useMemo(() => {
    return listType === BreedListType.user ? kittyList : sireList;
  }, [listType, kittyList, sireList]);

  const handleOnSetParent = () => {
    if (type === ParentType.MUM) {
      dispatch(
        approveParent({
          parentId: model.kitty.cat.kittyId,
          parentType: ParentType.MUM,
        })
      );
    } else {
      dispatch(
        approveParent({
          parentId: model.kitty.cat.kittyId,
          parentType:
            listType === BreedListType.sire ? ParentType.SIRE : ParentType.DAD,
        })
      );
    }
    onClose();
  };

  return (
    <Modal
      width={1000}
      title="Breed List"
      open={open}
      onOk={onOk}
      onCancel={onClose}
      footer={null}
    >
      <ButtonGroup className="gap-3 mb-4 w-full">
        <Button
          danger
          size="large"
          type={listType === BreedListType.user ? "primary" : "default"}
          onClick={() => setListType(BreedListType.user)}
        >
          My Kitties
        </Button>
        <Button
          danger
          size="large"
          type={listType === BreedListType.sire ? "primary" : "default"}
          onClick={() => setListType(BreedListType.sire)}
        >
          Sire Offers
        </Button>
        {model && (
          <Button
            size="large"
            className="capitalize"
            onClick={() => setModel(null)}
          >
            Reset
          </Button>
        )}

        {model && (
          <div className="text-2xl text-pink-400 font-bold ml-auto">
            Chose Kitty #{model.kitty.cat.kittyId}
          </div>
        )}
        <Button
          disabled={!model}
          danger
          size="large"
          type="primary"
          className="ml-auto capitalize"
          onClick={handleOnSetParent}
        >
          Set {type}
        </Button>
      </ButtonGroup>
      <div className="grid grid-cols-3 gap-y-4 min-h-[400px]">
        {list.map((item) => (
          <BreedList
            key={item.kittyId}
            kittyId={item.kittyId}
            disabled={item.kittyId == dadId || item.kittyId == mumId}
            onClick={setModel}
            listType={listType}
          />
        ))}
      </div>
    </Modal>
  );
};

export default BreedModal;
