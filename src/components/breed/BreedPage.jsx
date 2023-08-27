import React, { useEffect, useMemo, useState } from "react";

import { Heart } from "iconsax-react";
import BreedModal from "./BreedModal";
import { useDispatch, useSelector } from "react-redux";
import { selectKittyById } from "../cat/catSlice";
import { CatModel } from "../js/catFactory";
import { MediumCatContainer } from "../cat/CatBoxContainers";
import CatBox from "../cat/CatBox";
import { breed, sire } from "./breedSaga";
import { selectOfferByKittyId } from "../market/offerSlice";
import { BreedProgress, breedReset } from "./breedSlice";
import { Modal } from "antd";

export default function BreedPage() {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    dadId,
    mumId,
    kittenId,
    progress,
    sireOfferId,
    // error TODO: display errors
  } = useSelector((state) => state.breed);

  const dadKitty = useSelector((state) => selectKittyById(state, dadId));
  const dad = useMemo(() => {
    if (dadKitty) {
      return new CatModel(dadKitty);
    }
    return null;
  }, [dadKitty]);

  const mumKitty = useSelector((state) => selectKittyById(state, mumId));
  const mum = useMemo(() => {
    if (mumKitty) {
      return new CatModel(mumKitty);
    }
    return null;
  }, [mumKitty]);

  const sireOffer = useSelector((state) =>
    selectOfferByKittyId(state, sireOfferId)
  );

  const newKitty = useSelector((state) => selectKittyById(state, kittenId));
  const kitten = useMemo(() => {
    if (newKitty) {
      return new CatModel(newKitty);
    }
    return null;
  }, [newKitty]);

  const onResetParents = () => {
    dispatch(breedReset());
  };

  const onBreedClicked = async () => {
    if (loading) return;
    setLoading(true);
    if (sireOffer) {
      dispatch(sire({ offer: sireOffer, matronId: mumId }));
    } else {
      dispatch(breed({ mumId, dadId }));
    }
    setOpen(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    console.log(progress);
    if (progress === BreedProgress.BIRTH) {
      setLoading(false);
    }
  }, [progress]);

  const sireCostTxt = sireOffer
    ? ` (${Service.web3.utils.fromWei(sireOffer.price, "ether")} ETH)`
    : "";

  return (
    <div>
      <div className="py-20 bg-pink-50">
        <div className="text-4xl font-bold text-center">Breed Cat</div>
        <div className="text-2xl font-medium text-center mt-4">
          These two lovely Kitties will soon be parents!
        </div>
        <div className="flex justify-center gap-10 mt-8">
          <div className="flex flex-col gap-2 cursor-pointer">
            <div className="font-bold text-lg text-center">DAD</div>
            <div className="font-medium text-gray-500 text-lg text-center">
              Choose a Dad cat
            </div>
            {!dad ? (
              <div
                onClick={() => setType("dad")}
                className="w-[400px] h-[500px] bg-orange-100 border-2 border-dashed rounded-2xl border-gray-300 hover:bg-orange-200 hover:border-orange-400"
              ></div>
            ) : (
              <div onClick={() => setType("dad")} className="cursor-pointer">
                <MediumCatContainer>
                  <CatBox model={dad} />
                </MediumCatContainer>
              </div>
            )}
          </div>
          <div className="self-center relative w-[60px]">
            <Heart
              size="60"
              color="#f47373"
              variant="Bold"
              className="absolute animate-ping"
            />
            <Heart
              size="60"
              color="#f47373"
              variant="Bold"
              style={{ animationDelay: "0.3s" }}
              className="absolute animate-ping"
            />
          </div>
          <div className="flex flex-col gap-2 cursor-pointer">
            <div className="font-bold text-lg text-center">MUM</div>
            <div className="font-medium text-gray-500 text-lg text-center">
              Choose a Mum cat
            </div>
            {!mum ? (
              <div
                onClick={() => setType("mum")}
                className="w-[400px] h-[500px] bg-pink-100 border-2 border-dashed rounded-2xl border-gray-300 hover:bg-pink-200 hover:border-pink-400"
              ></div>
            ) : (
              <div onClick={() => setType("mum")} className="cursor-pointer">
                <MediumCatContainer>
                  <CatBox model={mum} />
                </MediumCatContainer>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 justify-center mt-10 h-[300px] mb-20">
          {sireCostTxt && (
            <div className="text-center text-red-500 font-bold">
              {sireCostTxt}
            </div>
          )}
          <button
            disabled={loading || !dadKitty || !mumKitty}
            onClick={onBreedClicked}
            style={{
              cursor: loading || !dadKitty || !mumKitty ? "default" : "pointer",
              background:
                loading || !dadKitty || !mumKitty ? "#yellow" : "#FBA1B7",
            }}
            className="w-[600px] uppercase text-xl rounded-2xl py-8 text-white font-bold border-[#FFD1DA] bg-[#FBA1B7] border-4 hover:border-b-8 transition-all"
          >
            {!loading ? "Click to breeding" : "Loading..."}
          </button>
          <button
            onClick={onResetParents}
            className="w-[600px] uppercase text-xl rounded-2xl py-8 bg-white font-bold border-[#FFD1DA] text-[#FBA1B7] border-4 hover:border-b-8 transition-all"
          >
            Reset breeding
          </button>
        </div>
      </div>
      {["mum", "dad"].includes(type) && (
        <BreedModal
          open
          type={type}
          onClose={() => setType("")}
          onOk={() => setType("")}
        />
      )}
      {progress === BreedProgress.BIRTH && (
        <Modal
          open={open}
          width={800}
          title="Breeding Result"
          onCancel={() => {
            setOpen(false);
            onResetParents();
          }}
          footer={null}
        >
          <div className="flex flex-col items-center gap-3">
            <p className="text-success text-center">
              Cogratulations! Your parent kitties now need a rest.
            </p>
            <div className="d-flex flex-column align-items-center mt-4 text-success">
              <h5>A new kitten is born!</h5>
              <CatBox model={kitten} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
