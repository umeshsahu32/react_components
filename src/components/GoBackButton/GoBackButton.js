import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./GoBackButton.css";

const GoBackButton = () => {
  const navigate = useNavigate();

  const goBackClickHandler = () => {
    navigate(-1);
  };

  return (
    <Fragment>
      <button className="go_back_btn" onClick={goBackClickHandler}>
        Go Back
      </button>
    </Fragment>
  );
};

export default GoBackButton;
