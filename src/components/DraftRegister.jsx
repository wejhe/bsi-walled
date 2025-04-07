import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import InputFieldPassword from "./InputFieldPassword";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import ReactDOM from "react-dom/client";
import PinField from "react-pin-field";

import {
  isValidEmail,
  isEmpty,
  isValidPassword,
  isValidPhone,
  isPinComplete,
} from "../utils/validation";

const DraftRegister = () => {
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
  const [pinInputValue, setPinInputValue] = useState("");
  const [pinIsEmpty, setPinIsEmpty] = useState(true);
  const [pinIsComplete, setPinIsComplete] = useState(false);

  const pinIsEmptyRef = useRef(pinIsEmpty);
  const pinIsCompleteRef = useRef(pinIsComplete);

  const [confirmPinInputValue, setConfirmPinInputValue] = useState("");
  const confirmPinIsEmptyRef = useRef(true);
  const confirmPinIsCompleteRef = useRef(false);

  useEffect(() => {
    pinIsEmptyRef.current = pinIsEmpty;
    pinIsCompleteRef.current = pinIsComplete;
  }, [pinIsEmpty, pinIsComplete]);

  useEffect(() => {
    confirmPinIsEmptyRef.current = isEmpty(confirmPinInputValue);
    confirmPinIsCompleteRef.current = isPinComplete(confirmPinInputValue);
  }, [confirmPinInputValue]);

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

  const handlePinChange = (value) => {
    setPinInputValue(value);
    setPinIsEmpty(isEmpty(value));
    setPinIsComplete(isPinComplete(value));
  };

  // const handlePinConfirmChange = (value) => {
  //   confirmPinInputValue(value);
  //   confirmPinIsEmptyRef(isEmpty(value));
  //   confirmPinIsCompleteRef(isPinComplete(value));
  // };

  const consolePinValue = () => {
    console.log("PIN Value:", pinInputValue);
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
        title:
          "Your password must be a combination of letters and numbers with minimum 8 characters",
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
      Swal.fire({
        title: "Create Your PIN",
        html: `
              <div style="text-align: center; font-size: 16px; margin-bottom: 16px; line-height: 2.2;">
                <p style="margin-bottom: 12px;">Please create a PIN to secure your account. PIN must be 6 digits long and only contain numbers</p>
              <hr style="border-top: 1px solid #ccc; margin: 20px 0">
                <label style="margin-bottom: 12px;">PIN</label>
                <div id='pinInputContainer1' style="margin-bottom: 16px; margin-top: 8px;"></div>
                <label style="margin-bottom: 12px;">Confirm PIN</label>
                <div id='pinInputContainer2' style="margin-top: 8px;"></div>
              </div>
              <div id="pinErrorMessage" style="font-size: 14px; color: red; display: none; margin-top: 16px;">&#9888; Error: PIN must be filled, complete, and matched</div>
      `,
        // icon: "warning",
        showCancelButton: true,
        confirmButtonText: "CONFIRM",
        cancelButtonText: "CANCEL",
        willOpen: () => {
          const container1 = document.getElementById("pinInputContainer1");
          const container2 = document.getElementById("pinInputContainer2");

          ReactDOM.createRoot(container1).render(
            <PinField
              autoComplete="one-time-code"
              className="wPinField"
              length={6}
              type="password"
              autoFocus
              onChange={handlePinChange}
            />
          );

          ReactDOM.createRoot(container2).render(
            <PinField
              autoComplete="one-time-code"
              className="wPinField"
              length={6}
              type="password"
              onChange={handlePinChange}
            />
          );
        },
        preConfirm: () => {
          const pin = pinInputValue;
          const confirmPin = confirmPinInputValue;

          const isValid =
            !pinIsEmptyRef.current &&
            pinIsCompleteRef.current &&
            !confirmPinIsEmptyRef.current &&
            confirmPinIsCompleteRef.current &&
            pin === confirmPin;

          if (!isValid) {
            const errorElement = document.getElementById("pinErrorMessage");
            errorElement.style.display = "block";
            errorElement.classList.add("bounce");
            setTimeout(() => {
              errorElement.classList.remove("bounce");
            }, 1000);
            return false;
          }

          return true;
        },
        customClass: {
          popup: "modalRadius",
          confirmButton: "modalButton",
          cancelButton: "modalButtonSecondary",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          consolePinValue();
        }
      });
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

export default DraftRegister;
