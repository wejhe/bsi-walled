import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isValidEmail } from "../utils/validation";

const LoginForm = () => {
  const navigate = useNavigate();
  const [emailInputValue, setEmailInputValue] = useState("");

  const handleEmailChange = (e) => {
    setEmailInputValue(e.target.value);
    console.log(isValidEmail(e.target.value));
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
          <InputField type="password" placeholder="Password" width="64%" />
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
