import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isValidEmail, isEmpty, isValidPassword } from "../utils/validation";
import InputFieldPassword from "./InputFieldPassword";
import Swal from "sweetalert2";
import apiconfig from "../utils/apiconfig";
import useAuthStore from "../stores/authStore";
import promptCreatePIN from "./PromptCreatePIN";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasPIN, setHasPIN] = useState(true);
  const { setTokens } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    emailIsValid: false,
    emailIsEmpty: false,
    passwordIsEmpty: false,
  });

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setFormError((prev) => ({
      ...prev,
      ...(name === "email" && { emailIsValid: isValidEmail(value) }),
    }));
  };

  const isAnyEmpty = () => {
    return formData.email === "" || formData.password === "";
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

  const handleLogin = async () => {
    if (isAnyEmpty()) {
      showToast("Please fill out all of the field before proceeding");
    } else if (!formError.emailIsValid) {
      showToast("Please enter a valid email address before proceeding");
    } else {
      const endpoint = `${apiconfig.BASE_URL}/auth/login`;
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.responseCode === 200) {
            const {accessToken, refreshToken} = data.data;
            setTokens({accessToken, refreshToken});
            navigate("/dashboard");
          } else if (data.responseCode === 401) {
            showToast("The email and password you entered is incorrect");
          } else {
            showToast("An unexpected error occurred");
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
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
            placeholder="Email"
            width="64%"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
          <InputFieldPassword
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            width="100%"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
