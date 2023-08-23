import { Button } from "antd";
import { Shop } from "iconsax-react";
import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Wallet from "./wallet/Wallet";
import { selectOnSupportedNetwork } from "./wallet/walletSlice";

export default function AppHeader() {
  const onSupportedNetwork = useSelector(selectOnSupportedNetwork);
  const account = useSelector((state) => state.wallet.account);
  const isOwner = useSelector((state) => state.wallet.isOwner);
  const isKittyCreator = useSelector((state) => state.wallet.isKittyCreator);

  // only show nav links if there is a connected account
  const links =
    account && onSupportedNetwork ? (
      <>
        <NavLink to="/kitties" className="no-underline">
          <Button
            className="flex items-center outline-none"
            type="text"
            icon={
              <img alt="breed" src="/images/cat.png" width={20} height={20} />
            }
            size="large"
          >
            My Kitties
          </Button>
        </NavLink>
        <NavLink to="/breed" className="no-underline">
          <Button
            className="flex items-center outline-none"
            type="text"
            icon={
              <img alt="breed" src="/images/breed.svg" width={20} height={20} />
            }
            size="large"
          >
            Breed
          </Button>
        </NavLink>

        <NavLink to="/market" className="no-underline">
          <Button
            className="flex items-center outline-none"
            type="text"
            icon={<Shop size="20" color="#F47373" variant="Bold" />}
            size="large"
          >
            Marketplace
          </Button>
        </NavLink>
      </>
    ) : null;

  // only Kitty Creators can create gen zero kitties
  const factory = isKittyCreator ? (
    <NavLink to="/factory" className="btn nav-link">
      Factory
    </NavLink>
  ) : null;

  const admin = isOwner ? (
    <NavLink to="/admin" className="btn nav-link">
      Admin
    </NavLink>
  ) : null;

  return (
    <Nav
      variant="pills"
      className="bg-pink-200 flex items-center px-3 py-2 gap-3"
    >
      <NavLink
        to="/"
        className="navbar-brand btn flex items-center gap-2 mr-auto"
      >
        <img src="logo.svg" alt="React" width="50" height="50" />
        <div className="font-bold text-2xl text-orange-400">
          Crypto<span className="text-pink-500">Meow</span>
        </div>
      </NavLink>
      {links}
      {factory}
      {admin}
      <Wallet />
    </Nav>
  );
}
