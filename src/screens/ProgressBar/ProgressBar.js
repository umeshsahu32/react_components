import React, { Fragment, useState, useEffect } from "react";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import "./ProgressBar.css";

const ProgressBarComponent = ({ value, onComplete }) => {
  const [percentage, setPercentage] = useState(value);
  const MAX = 100;
  const MIN = 0;

  useEffect(() => {
    setPercentage(Math.min(MAX, Math.max(value, MIN)));
    if (value >= MAX) {
      onComplete();
    }
  }, [value, onComplete]);

  return (
    <Fragment>
      <div className="progress">
        <span style={{ color: percentage > 49 ? "white" : "black" }}>
          {percentage?.toFixed()}%
        </span>
        <div
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage?.toFixed()}
        ></div>
      </div>
    </Fragment>
  );
};

const ProgressBar = () => {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setValue((val) => val + 1);
    }, 100);
  }, []);

  const resetBtnClickHandler = () => {
    setSuccess(false);
    setValue(0);
  };

  return (
    <Fragment>
      <div className="progress_bar_body">
        <h3>Progress Bar</h3>
        <ProgressBarComponent
          value={value}
          onComplete={() => setSuccess(true)}
        />
        <span>{success ? "Complete!" : "Loading..."}</span>
      </div>
      <GoBackButton />
      <button className="reset_button" onClick={resetBtnClickHandler}>
        Reset
      </button>
    </Fragment>
  );
};

export default ProgressBar;
