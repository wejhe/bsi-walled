import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import InputFieldPassword from "./InputFieldPassword";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isValidEmail, isEmpty, isValidPassword, isValidPhone } from "../utils/validation";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [nameInputValue, setNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [nameIsEmpty, setNameIsEmpty] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailIsEmpty, setEmailIsEmpty] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(true);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [phoneIsEmpty, setPhoneIsEmpty] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleNameChange = (e) => {
    setNameInputValue(e.target.value);
    setNameIsEmpty(isEmpty(e.target.value));
  };

  const handleEmailChange = (e) => {
    setEmailInputValue(e.target.value);
    setEmailIsValid(isValidEmail(e.target.value));
    setEmailIsEmpty(isEmpty(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPasswordInputValue(e.target.value);
    setPasswordIsValid(isValidPassword(e.target.value));
    setPasswordIsEmpty(isEmpty(e.target.value));
  };

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePhoneChange = (e) => {
    setPhoneInputValue(e.target.value);
    setPhoneIsValid(isValidPhone(e.target.value));
    setPhoneIsEmpty(isEmpty(e.target.value));
  };

  return (
    <>
      <div className="forms">
        <img className="authLogo" src={logo} />
        <div className="tighterGroup">
          <InputField
            type="text"
            placeholder="Full Name"
            width="64%"
            onChange={handleNameChange}
          />
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
          <InputField
            type="number"
            placeholder="Phone Number"
            width="64%"
            onChange={handlePhoneChange}
          />
        </div>
        <div className="tighterGroup">
          <PrimaryButton
            text="REGISTER"
            onClick={() => navigate("/dashboard")}
            width="calc(64% + 32px)"
          />
          <p>
            Already have an account?<a href="/"> Login Now</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
