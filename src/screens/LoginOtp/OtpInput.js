import React, { Fragment, useState, useRef, useEffect } from "react";
import styles from "./LoginOtp.module.css";

const OtpInput = ({ otpLength, onOtpSubmit }) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // ? HANDLER CHANGE FUNCTION FOR OTP
  const handleChangeFn = (index, e) => {
    const value = e.target.value;

    if (isNaN(value)) {
      return;
    }

    const newOtp = [...otp];
    // ! ALLOW ONLY ONE INPUT
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    // MOVED TO NEXT INPUT FIELD IF CURRENT FIELD IS FILLED
    if (value && index < otpLength - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === otpLength) {
      onOtpSubmit(combinedOtp);
    }
  };

  // ? HANDLER CLICK FUNCTION ON OTP INPUT
  const handleClickFn = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  // ? HANDLE KEY DOWN FUNCTION
  const handleKeyDownFn = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  // ? JSX START
  return (
    <Fragment>
      {otp.map((item, index) => {
        return (
          <input
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            type="text"
            value={item}
            onChange={(e) => handleChangeFn(index, e)}
            onClick={() => handleClickFn(index)}
            onKeyDown={(e) => handleKeyDownFn(index, e)}
            className={styles.otpInput}
          />
        );
      })}
    </Fragment>
  );
};

export default OtpInput;
