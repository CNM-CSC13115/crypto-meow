import React from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "antd";
import Cat from "./components/cat/Cat";
import GenZeroCounter from "./components/cat/GenZeroCounter";
import { CatModel } from "./components/js/catFactory";
import { connect } from "./components/wallet/walletSaga";

export default function Home() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);

  const featured = [
    "3840837671829324",
    "9092334640245223",
    "1929825512645025",
    "4485804221431312",
    "1013934222421341",
  ];

  const featuredCats = featured.map((genes) => {
    const cat = new CatModel({ genes });
    return (
      <div key={genes} className="bg-pink-200 p-10 rounded-3xl shadow-sm">
        <Cat model={cat} />
      </div>
    );
  });

  return (
    <div className="d-flex flex-column align-items-center justify-center min-h-[calc(100vh-200px)] bg-pink-100 py-5">
      <div align="center" className="mt-2 text-3xl text-pink-500 font-medium">
        <h1 className="font-bold mb-2">Crypto Kitties</h1>
        <p className="text-xl">
          Collect and breed furrever friends!
          <br />
          <GenZeroCounter msg="geneneration zero Kittes already created. Get yours before they're all gone!" />
        </p>
      </div>
      {!wallet.isConnected && wallet.web3ProviderAvailable ? (
        <Button
          onClick={() => dispatch(connect())}
          className="mt-3"
          type="primary"
          size="large"
          danger
        >
          Connect to get started
        </Button>
      ) : null}
      {!wallet.web3ProviderAvailable ? (
        <Alert variant="danger">
          Web 3 provider not detected.{" "}
          <a
            href="https://metamask.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Please install Metamask
          </a>{" "}
          to get started.
        </Alert>
      ) : null}

      <div className="horizontal-container my-5 px-5">
        <div className="horizontal-scrolling-items">
          <div className="horizontal-scrolling-items__item flex gap-5">
            {featuredCats}
          </div>
          <div className="horizontal-scrolling-items__item flex gap-5 ml-[20px]">
            {featuredCats}
          </div>
        </div>
      </div>
    </div>
  );
}
