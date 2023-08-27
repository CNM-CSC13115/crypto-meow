import React from "react";
import { Alert, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { approveMarket } from "../wallet/walletSlice";
import { Button } from "antd";

const KittyAlert = styled(Alert)`
  width: 19rem;
`;

export default function ApproveMarket({ show = true, handleApproveCancel }) {
  const dispatch = useDispatch();

  if (!show) {
    return null;
  }

  const onApproveClicked = () => {
    dispatch(approveMarket());
    handleApproveCancel();
  };

  return (
    <Col>
      <KittyAlert variant="info">
        In order to sell your kitties you need to give the Marketplace
        permission to transfer your kitties on your behalf. This is required so
        the buyer and seller do not need to be online at the same time.
      </KittyAlert>
      <Button
        type="primary"
        onClick={onApproveClicked}
        className="mr-3 bg-blue-500"
      >
        YES. It&apos;s OK. You are approved!
      </Button>
      <Button variant="warning" onClick={handleApproveCancel}>
        Cancel
      </Button>
    </Col>
  );
}

ApproveMarket.propTypes = {
  handleApproveCancel: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

ApproveMarket.defaultProps = {
  show: true,
};
