import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isValidEmail, isEmpty } from "../utils/validation";
import InputFieldPassword from "./InputFieldPassword";
import Swal from "sweetalert2";

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

  const handleLogin = () => {
    if (isAnyEmpty()) {
      Swal.fire({
        toast: true,
        position: "bottom-start",
        icon: "warning",
        title: "Please fill out all of the field before proceeding",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (!emailIsValid) {
      Swal.fire({
        toast: true,
        position: "bottom-start",
        icon: "warning",
        title: "Please enter a valid email address before proceeding",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      navigate("/dashboard");
    }
  };

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
            isVisible={isPasswordVisible}
          />
        </div>
        <div className="tighterGroup">
          <PrimaryButton
            text="LOGIN"
            onClick={handleLogin}
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
