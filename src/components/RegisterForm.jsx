import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import InputFieldPassword from "./InputFieldPassword";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  isValidEmail,
  isEmpty,
  isValidPassword,
  isValidPhone,
} from "../utils/validation";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [nameInputValue, setNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [avatarInputValue, setAvatarInputValue] = useState("");
  const [nameIsEmpty, setNameIsEmpty] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailIsEmpty, setEmailIsEmpty] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(true);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [phoneIsEmpty, setPhoneIsEmpty] = useState(true);
  const [avatarIsEmpty, setAvatarIsEmpty] = useState(true);
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

  const handleAvatarChange = (e) => {
    setAvatarInputValue(e.target.value);
    setAvatarIsEmpty(isEmpty(e.target.value));
  };

  const isAnyEmpty = () =>
    nameIsEmpty ||
    emailIsEmpty ||
    passwordIsEmpty ||
    phoneIsEmpty ||
    avatarIsEmpty;

  const handleRegister = () => {
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
    } else if (!passwordIsValid) {
      Swal.fire({
        toast: true,
        position: "bottom-start",
        icon: "warning",
        title: "Your password must be a combination of letters and numbers with minimum 8 characters",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (!phoneIsValid) {
      Swal.fire({
        toast: true,
        position: "bottom-start",
        icon: "warning",
        title: "Please enter a valid phone number before proceeding",
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
            isVisible={isPasswordVisible}
          />
          <InputField
            type="number"
            placeholder="Phone Number"
            width="64%"
            onChange={handlePhoneChange}
          />
          <InputField
            type="text"
            placeholder="Avatar URL"
            width="64%"
            onChange={handleAvatarChange}
          />
        </div>
        <div className="tighterGroup">
          <PrimaryButton
            text="REGISTER"
            onClick={handleRegister}
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
