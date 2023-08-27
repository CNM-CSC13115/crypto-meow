import React, { useState } from "react";
import { useSelector } from "react-redux";

import { EmptyWallet, More, MoreCircle } from "iconsax-react";
import { CatModel } from "../js/catFactory";
import CatActions from "./CatActions";
import CatBox from "./CatBox";
import { MediumCatContainer } from "./CatBoxContainers";
import { selectKittiesByOwner } from "./catSlice";
import { Button } from "antd";

export default function CatList() {
  const [show, setShow] = useState(false);

  const wallet = useSelector((state) => state.wallet);
  const kitties = useSelector((state) =>
    selectKittiesByOwner(state, wallet.account)
  );

  if (!kitties.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 relative bg-pink-50 overflow-hidden">
        <div className="-z-0 w-[800px] h-[800px] rounded-full mx-auto bg-[#ffe6ec] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="-z-0 w-[600px] h-[600px] rounded-full mx-auto bg-[#febbcc] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="-z-0 w-[400px] h-[400px] rounded-full mx-auto bg-[#fd9bb3] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative flex flex-col items-center">
          <EmptyWallet size="200" color="#ffffff" variant="Bulk" />
          <p className="text-center text-white text-xl font-bold">
            You have no kittes!
            <br /> Go to the Marketplace to adpot some!
          </p>
        </div>
      </div>
    );
  }

  const catBoxes = kitties.map((kitty) => {
    const model = new CatModel(kitty);
    console.log(model);
    return (
      <MediumCatContainer
        key={kitty.kittyId}
        className="bg-[#fecdd9] p-8 rounded-[32px]"
      >
        <div className="mb-4">
          <CatBox model={model} />
        </div>
        <CatActions kittyId={kitty.kittyId} isBuyMode={false} />
      </MediumCatContainer>
    );
  });

  return (
    <div className="bg-pink-100 px-[100px] py-20">
      <div className="grid grid-cols-3 gap-y-4">{catBoxes}</div>
    </div>
  );
}
