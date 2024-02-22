import { Fragment, useState } from "react";
import "./LoginToggle.css";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

const LoginToggle = () => {
  const [loginBtn, setLoginBtn] = useState(true);

  const registerBtnClickHandler = () => {
    setLoginBtn(false);
  };

  const loginBtnClickHandler = () => {
    setLoginBtn(true);
  };

  return (
    <Fragment>
      <div class="button-box">
        <div id={loginBtn === true ? "btn" : "btn2"}></div>
        <button
          className="toggle-btn"
          type="button"
          onClick={loginBtnClickHandler}
        >
          Login
        </button>
        <button
          className="toggle-btn"
          type="button"
          onClick={registerBtnClickHandler}
        >
          Signup
        </button>
      </div>

      <GoBackButton />
    </Fragment>
  );
};

export default LoginToggle;
