import React, { Fragment, useState } from "react";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import styles from "./LoginOtp.module.css";
import OtpInput from "./OtpInput";
import { string } from "yup";

const LoginOtp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState(null);
  const [userOtp, setUserOtp] = useState("");

  // ? VALIDATION SCHEMA FOR PHONE NUMBER
  const validationSchema = string()
    .required("Please Enter valid phone number")
    .min(10, "Please Enter valid phone number")
    .max(10, "Please Enter valid phone number");

  // ? PHONE NUMBER CHANGE HANDLER
  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  // ? GET OTP BUTTON CLICK HANDLER
  const getOtpClickHandler = async (event) => {
    event.preventDefault();
    setError();
    try {
      await validationSchema.validate(phoneNumber, {
        abortEarly: false,
      });
      setShowOtpInput(true);
    } catch (error) {
      setError(error.inner[0].message);
    }
  };

  //? GET OTP FUNCTION TO GET OTP FROM OTP_INPUT COMPONENT
  const getOtp = (otp) => {
    setUserOtp(otp);
  };

  // ? VERIFY OTP BUTTON CLICK HANDLER
  const verifyOtpClickHandler = () => {
    alert(userOtp);
    setPhoneNumber("");
    setShowOtpInput(false);
    setUserOtp("");
  };

  //? JSX START
  return (
    <Fragment>
      <div className={styles.login_otp_container}>
        <h1>Login with Phone</h1>
        {!showOtpInput && (
          <div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
                maxLength={10}
              />
            </div>
            {error && <div className={styles.error_text}>{error}</div>}
          </div>
        )}

        {showOtpInput && (
          <div className={styles.inputOtp_container}>
            <div>
              <span className={styles.first_span}>Enter OTP is sent to </span>
              <span className={styles.second_span}>{phoneNumber}</span>{" "}
            </div>
            <div>
              <OtpInput otpLength={4} onOtpSubmit={getOtp} />
            </div>
          </div>
        )}
        <div className={styles.btn_container}>
          {!showOtpInput && (
            <button className={styles.get_otp_btn} onClick={getOtpClickHandler}>
              Get OTP
            </button>
          )}
          {showOtpInput && (
            <button
              className={styles.get_otp_btn}
              onClick={verifyOtpClickHandler}
            >
              Verify OTP
            </button>
          )}
          <GoBackButton />
        </div>
      </div>
    </Fragment>
  );
};

export default LoginOtp;
