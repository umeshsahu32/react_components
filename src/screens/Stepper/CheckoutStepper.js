/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

const CheckoutStepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  //   const widthForFill = {}
  //   const widthForFill = calc(100% - (margins.marginLeft + margins.marginRight);
  //   console.log(`${widthForFill}%`);

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  const resetHandler = () => {
    setCurrentStep(1);
    setIsComplete(false);
  };

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`step ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? "active" : ""} `}
            >
              <div className="step-number">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}

        <div
          className="progress-bar"
          style={{
            // width: `calc(100%-${margins.marginLeft + margins.marginRight}px)`,
            width: "94%",
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <div className="text_div">
        <ActiveComponent />
        <div>
          <GoBackButton />
          {!isComplete && (
            <button className="stepper_btn" onClick={handleNext}>
              {currentStep === stepsConfig.length ? "Finish" : "Next"}
            </button>
          )}

          {isComplete && (
            <button className="stepper_btn" onClick={resetHandler}>
              Reset
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutStepper;
