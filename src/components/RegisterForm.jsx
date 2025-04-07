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

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    avatar: "",
  });

  const [pinData, setPinData] = useState({
    pin: "",
    confirmPin: "",
  });

  const [visibility, setVisibility] = useState({
    password: false,
  });

  const refs = {
    pinIsEmpty: useRef(true),
    pinIsComplete: useRef(false),
    confirmPinIsEmpty: useRef(true),
    confirmPinIsComplete: useRef(false),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordVisibility = () => {
    setVisibility((prev) => ({ ...prev, password: !prev.password }));
  };

  const handlePinChange = (field) => (value) => {
    setPinData((prev) => ({ ...prev, [field]: value }));

    if (field === "pin") {
      refs.pinIsEmpty.current = isEmpty(value);
      refs.pinIsComplete.current = isPinComplete(value);
    } else {
      refs.confirmPinIsEmpty.current = isEmpty(value);
      refs.confirmPinIsComplete.current = isPinComplete(value);
    }
  };

  useEffect(() => {
    const errorElement = document.getElementById("pinErrorMessage");
    const isValid =
      !refs.pinIsEmpty.current &&
      refs.pinIsComplete.current &&
      !refs.confirmPinIsEmpty.current &&
      refs.confirmPinIsComplete.current &&
      pinData.pin === pinData.confirmPin;

    if (errorElement) {
      if (isValid) {
        errorElement.style.display = "none";
      } else {
        errorElement.style.display = "block";
      }
    }
  }, [pinData]); // trigger setiap kali pinData berubah

  const validateForm = () => {
    const validations = {
      name: !isEmpty(formData.name),
      email: isValidEmail(formData.email),
      password: isValidPassword(formData.password),
      phone: isValidPhone(formData.phone),
      avatar: !isEmpty(formData.avatar),
    };

    const errors = Object.entries(validations).filter(([, valid]) => !valid);

    if (errors.length > 0) {
      const field = errors[0][0];
      const messages = {
        name: "Please fill out all of the field before proceeding",
        email: "Please enter a valid email address before proceeding",
        password:
          "Your password must be a combination of letters and numbers with minimum 8 characters",
        phone: "Please enter a valid phone number before proceeding",
        avatar: "Please fill out all of the field before proceeding",
      };

      Swal.fire({
        toast: true,
        position: "bottom-start",
        icon: "warning",
        title: messages[field],
        showConfirmButton: false,
        timer: 3000,
      });
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    Swal.fire({
      title: "Create Your PIN",
      html: `
        <div style="text-align: center; font-size: 16px; margin-bottom: 16px; line-height: 2.2;">
          <p style="margin-bottom: 12px;">Please create a PIN to secure your account. PIN must be 6 digits long and only contain numbers</p>
          <hr style="border-top: 1px solid #ccc; margin: 20px 0">
          <label>PIN</label>
          <div id='pinInputContainer1' style="margin-bottom: 16px; margin-top: 8px;"></div>
          <label>Confirm PIN</label>
          <div id='pinInputContainer2' style="margin-top: 8px;"></div>
        </div>
        <div id="pinErrorMessage" style="font-size: 14px; color: red; display: none; margin-top: 16px;">⚠️ Error: PIN must be filled, complete, and matched</div>
      `,
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
            onChange={handlePinChange("pin")}
          />
        );

        ReactDOM.createRoot(container2).render(
          <PinField
            autoComplete="one-time-code"
            className="wPinField"
            length={6}
            type="password"
            onChange={handlePinChange("confirmPin")}
          />
        );
      },
      preConfirm: () => {
        const pinInputs = document.querySelectorAll(
          "#pinInputContainer1 input"
        );
        const confirmPinInputs = document.querySelectorAll(
          "#pinInputContainer2 input"
        );

        const pin = Array.from(pinInputs)
          .map((input) => input.value)
          .join("");
        const confirmPin = Array.from(confirmPinInputs)
          .map((input) => input.value)
          .join("");

        const isValid =
          pin.length === 6 &&
          confirmPin.length === 6 &&
          pin === confirmPin &&
          /^\d{6}$/.test(pin);

        if (!isValid) {
          const errorElement = document.getElementById("pinErrorMessage");
          errorElement.style.display = "block";
          errorElement.classList.add("bounce");
          setTimeout(() => errorElement.classList.remove("bounce"), 1000);
          return false;
        }

        // Simpan PIN ke state
        setPinData({ pin, confirmPin });

        return true;
      },
      customClass: {
        popup: "modalRadius",
        confirmButton: "modalButton",
        cancelButton: "modalButtonSecondary",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("PIN Value:", pinData.pin); // ⚠️ ini tetap bisa kosong karena async

        // SOLUSI: ambil langsung lagi aja dari DOM juga
        const pinInputs = document.querySelectorAll(
          "#pinInputContainer1 input"
        );
        const pin = Array.from(pinInputs)
          .map((input) => input.value)
          .join("");

        console.log("PIN Value:", pin);
        // Lanjutkan proses registrasi di sini
      }
    });
  };

  return (
    <div className="forms">
      <img className="authLogo" src={logo} />
      <div className="tighterGroup">
        <InputField
          type="text"
          name="name"
          placeholder="Full Name"
          width="64%"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="email"
          placeholder="Email"
          width="64%"
          value={formData.email}
          onChange={handleChange}
        />
        <InputFieldPassword
          type={visibility.password ? "text" : "password"}
          name="password"
          placeholder="Password"
          width="100%"
          value={formData.password}
          onChange={handleChange}
          onClick={handlePasswordVisibility}
          isVisible={visibility.password}
        />
        <InputField
          type="number"
          name="phone"
          placeholder="Phone Number"
          width="64%"
          value={formData.phone}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          width="64%"
          value={formData.avatar}
          onChange={handleChange}
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
  );
};

export default RegisterForm;
