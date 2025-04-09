import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import InputFieldPassword from "./InputFieldPassword";
import PromptCreatePIN from "./PromptCreatePIN";
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    avatar: "",
  });

  const [visibility, setVisibility] = useState({
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordVisibility = () => {
    setVisibility((prev) => ({ ...prev, password: !prev.password }));
  };

  const validateForm = () => {
    const validations = {
      complete:
        !isEmpty(formData.name) &&
        !isEmpty(formData.email) &&
        !isEmpty(formData.password) &&
        !isEmpty(formData.avatar),
      email: isValidEmail(formData.email),
      password: isValidPassword(formData.password),
      phone: isValidPhone(formData.phone),
    };

    const errors = Object.entries(validations).filter(([, valid]) => !valid);

    if (errors.length > 0) {
      const field = errors[0][0];
      const messages = {
        complete: "Please fill out all of the field before proceeding",
        email: "Please enter a valid email address before proceeding",
        password:
          "Your password must be a combination of letters and numbers with minimum 8 characters",
        phone: "Please enter a valid phone number before proceeding",
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

  const handleRegister = async () => {
    if (!validateForm()) return;

    const pin = await PromptCreatePIN();

    if (!pin) {
      console.log("User cancelled PIN creation.");
      return;
    }

    console.log("PIN berhasil dibuat:", pin);

    Swal.fire({
      icon: "success",
      title: "Account Registered!",
      text: `Your account has been created with PIN ${pin}`,
    });

    navigate("/dashboard");
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
