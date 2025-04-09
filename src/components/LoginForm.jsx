import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isValidEmail, isEmpty, isValidPassword } from "../utils/validation";
import InputFieldPassword from "./InputFieldPassword";
import Swal from "sweetalert2";
import promptCreatePIN from "./PromptCreatePIN";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasPIN, setHasPIN] = useState(false);

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
      [`${name}IsEmpty`]: isEmpty(value),
      ...(name === "email" && { emailIsValid: isValidEmail(value) }),
      ...(name === "password" && { passwordIsEmpty: isEmpty(value) }),
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
    } else if (formError.passwordIsEmpty) {
      showToast("Please fill password before proceeding");
    } else if (!hasPIN) {
      const pin = await promptCreatePIN();

      if (pin) {
        Swal.fire({
          icon: "success",
          title: "Account Registered!",
          text: `Your account has been created with PIN ${pin}`,
        });

        // Update state PIN (misalnya kamu mau simpan di localStorage, backend, dll)
        setHasPIN(true);

        navigate("/dashboard");
      } else {
        showToast("PIN creation was cancelled");
      }
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
