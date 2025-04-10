import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import InputFieldPassword from "./InputFieldPassword";
import PromptCreatePIN from "./PromptCreatePIN";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuthStore from "../stores/authStore";

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

  const showToast = (message) => {
    Swal.fire({
      toast: true,
      position: "bottom-start",
      icon: "warning",
      title: message,
      showConfirmButton: false,
      timer: 3000,
    });
  };

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

      showToast(messages[field]);
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.name,
          password: formData.password,
          phoneNumber: formData.phone,
          // avatar: formData.avatar
        }),
      });

      const data = await response.json();
      if (data.responseCode === 201) {
        // REGISTER USER
        // IF REGISTER SUCCESSFUL, CREATE WALLET
        const createWallet = await fetch("http://localhost:8080/api/wallets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.data.accessToken}`,
          },
        });

        // IF CREATE WALLET SUCCESSFUL, SET TOKENS AND CREATE PIN
        if (createWallet.ok) {
          const { accessToken, refreshToken } = data.data;
          const setTokens = useAuthStore.getState().setTokens;
          setTokens({ accessToken, refreshToken });

          const pin = await PromptCreatePIN();

          if (!pin) {
            console.log("User cancelled PIN creation.");
            return;
          }

          const pinRes = await fetch("http://localhost:8080/auth/set-pin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              pin: pin,
            }),
          });

          const pinData = await pinRes.json();
          if (pinRes.ok) {
            Swal.fire({
              icon: "success",
              title: "PIN Created!",
              text: `Your PIN has been created successfully`,
            });
            navigate("/dashboard");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: pinData.message,
            });
          }
        }
      }
      if (data.responseCode == 400) {
        showToast(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "An error occurred during registration. Please try again.",
      });
    }
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
