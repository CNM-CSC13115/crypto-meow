import React from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./walletSaga";
import { selectOnSupportedNetwork } from "./walletSlice";
import { Button } from "antd";
import { SecuritySafe } from "iconsax-react";

export default function Wallet() {
  const dispatch = useDispatch();
  const { account, network, isApproved, isConnected, web3ProviderAvailable } =
    useSelector((state) => state.wallet);
  const isSupportedNetwork = useSelector(selectOnSupportedNetwork);

  const checkMark = isApproved ? (
    <span aria-label="approved" className="ml-1">
      🗸
    </span>
  ) : null;

  let content;
  if (isConnected && account && network) {
    content = (
      <h6>
        <Badge
          className="m-2"
          variant={isSupportedNetwork ? "secondary" : "danger"}
        >
          {account.substring(0, 4)}
          ...
          {account.substring(account.length - 4)}
          {checkMark}
          <br />
          {network.name}
        </Badge>
      </h6>
    );
  } else if (web3ProviderAvailable) {
    content = (
      <Button
        type="primary"
        onClick={() => dispatch(connect())}
        size="large"
        className="outline-none flex items-center"
        icon={<SecuritySafe size="24" variant="Bold" />}
        danger
      >
        Connect
      </Button>
    );
  }

  return <div>{content}</div>;
}
