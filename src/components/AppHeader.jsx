import { Button } from "antd";
import { Barcode, Shop, UserOctagon } from "iconsax-react";
import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Wallet from "./wallet/Wallet";
import { selectOnSupportedNetwork } from "./wallet/walletSlice";
import { useLocation } from "react-router-dom";

export default function AppHeader() {
  const onSupportedNetwork = useSelector(selectOnSupportedNetwork);
  const account = useSelector((state) => state.wallet.account);
  const isOwner = useSelector((state) => state.wallet.isOwner);
  const isKittyCreator = useSelector((state) => state.wallet.isKittyCreator);

  const location = useLocation();

  // only show nav links if there is a connected account
  const links =
    account && onSupportedNetwork ? (
      <>
        <NavLink to="/kitties" className="no-underline">
          <Button
            style={{
              background:
                location.pathname === "/" ||
                location.pathname.startsWith("/kitties")
                  ? "#FBA1B7"
                  : "transparent",
            }}
            className="flex items-center outline-none"
            type="text"
            icon={
              <img alt="my cats" src="/images/cat.png" width={24} height={24} />
            }
            size="large"
          >
            My Kitties
          </Button>
        </NavLink>
        <NavLink to="/breed" className="no-underline">
          <Button
            style={{
              background: location.pathname.startsWith("/breed")
                ? "#FBA1B7"
                : "transparent",
            }}
            className="flex items-center outline-none"
            type="text"
            icon={
              <img alt="breed" src="/images/breed.svg" width={24} height={24} />
            }
            size="large"
          >
            Breed
          </Button>
        </NavLink>

        <NavLink to="/market" className="no-underline">
          <Button
            style={{
              background: location.pathname.startsWith("/market")
                ? "#FBA1B7"
                : "transparent",
            }}
            className="flex items-center outline-none"
            type="text"
            icon={<Shop size="24" color="#BB2525" variant="Bulk" />}
            size="large"
          >
            Marketplace
          </Button>
        </NavLink>
      </>
    ) : null;

  // only Kitty Creators can create gen zero kitties
  const factory = isKittyCreator ? (
    <NavLink to="/factory" className="no-underline">
      <Button
        style={{
          background: location.pathname.startsWith("/factory")
            ? "#FBA1B7"
            : "transparent",
        }}
        className="flex items-center outline-none"
        type="text"
        icon={<Barcode size="24" color="#f47373" variant="Bold" />}
        size="large"
      >
        Factory
      </Button>
    </NavLink>
  ) : null;

  const admin = isOwner ? (
    <NavLink to="/admin" className="no-underline">
      <Button
        style={{
          background: location.pathname.startsWith("/admin")
            ? "#FBA1B7"
            : "transparent",
        }}
        className="flex items-center outline-none"
        type="text"
        icon={<UserOctagon size="24" color="#f47373" variant="Bold" />}
        size="large"
      >
        Admin
      </Button>
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
