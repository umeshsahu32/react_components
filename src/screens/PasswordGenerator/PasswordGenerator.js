import React, { Fragment, useState } from "react";
import styles from "./PasswordGenerator.module.css";
import usePasswordGenerator from "./PasswordGeneratorHook";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { useNavigate } from "react-router-dom";

//? CHECK BOX COMPONENT
const Checkbox = ({ title, state, onChange }) => {
  return (
    <div>
      <input id={title} type="checkbox" onChange={onChange} checked={state} />
      <label htmlFor={title}>{title}</label>
    </div>
  );
};

// ? PASSWORD GENERATOR COMPONENT
const PasswordGenerator = () => {
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  // ? HANDLE CHECKBOX CHANGE
  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  // ? HANDLE COPY BUTTON
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // ? HANDLE GO BACK BUTTON
  const handleBack = () => {
    navigate(-1);
  };

  // ? JSX START
  return (
    <Fragment>
      <h3 className={styles.password_text_heading}>Generate Password</h3>
      <div className={styles.container}>
        {password && (
          <div className={styles.header}>
            <div className={styles.password_text}>{password}</div>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {`${copied ? "Copied!" : "Copy"}`}
            </button>
          </div>
        )}
        {/* Character Length */}
        <div className={styles.password_length}>
          <span>
            <label>Character Length</label>
            <label>{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        {/* Checkboxes */}
        <div className={styles.checkboxes}>
          {checkboxData.map((checkbox, index) => {
            return (
              <Checkbox
                key={index}
                title={checkbox.title}
                onChange={() => handleCheckboxChange(index)}
                state={checkbox.state}
              />
            );
          })}
        </div>
        {/* Strength */}
        <PasswordStrengthIndicator password={password} />

        {/* Error Handling */}
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        {/* Generate Button */}
        <button
          className={styles.generateBtn}
          onClick={() => generatePassword(checkboxData, length)}
        >
          Generate Password
        </button>
      </div>
      <div className={styles.back__button__container}>
        <button onClick={handleBack} className={styles.back_btn}>
          Go Back
        </button>
      </div>
    </Fragment>
  );
};

export default PasswordGenerator;
