import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isValidEmail, isEmpty } from "../utils/validation";
import InputFieldPassword from "./InputFieldPassword";

const LoginForm = () => {
  const navigate = useNavigate();
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailIsEmpty, setEmailIsEmpty] = useState(true);
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleEmailChange = (e) => {
    setEmailInputValue(e.target.value);
    setEmailIsValid(isValidEmail(e.target.value));
    setEmailIsEmpty(isEmpty(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPasswordInputValue(e.target.value);
    setPasswordIsEmpty(isEmpty(e.target.value));
  };

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isAnyEmpty = () => emailIsEmpty || passwordIsEmpty;

  return (
    <>
      <div className="forms">
        <img className="authLogo" src={logo} />
        <div className="tighterGroup">
          <InputField
            type="text"
            placeholder="Email"
            width="64%"
            onChange={handleEmailChange}
          />
          <InputFieldPassword
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            width="100%"
            onChange={handlePasswordChange}
            onClick={handleShowPassword}
          />
        </div>
        <div className="tighterGroup">
          <PrimaryButton
            text="LOGIN"
            onClick={() => navigate("/dashboard")}
            width="calc(64% + 32px)"
          />
          <p>
            Don't have any account?<a href="/register"> Register Now</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
