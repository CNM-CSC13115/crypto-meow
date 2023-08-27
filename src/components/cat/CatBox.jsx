import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import styled from "styled-components";

import Cat from "./Cat";
import CatFeatures from "./CatFeatures";
import { CatModel } from "../js/catFactory";

export default function CatBox({ model }) {
  if (!model) {
    return <></>;
  }

  return (
    <div className="m-2 shadow bg-[#febbcc] rounded-2xl p-[20px] transition-all hover:scale-105 flex flex-col items-center">
      <div className="mx-auto">
        <Cat model={model} />
      </div>
      <CatFeatures model={model} />
    </div>
  );
}

CatBox.propTypes = {
  model: PropTypes.instanceOf(CatModel).isRequired,
};
