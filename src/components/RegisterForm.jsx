import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import logo from "/logo.svg";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="forms">
        <img className="authLogo" src={logo} />
        <div className="tighterGroup">
          <InputField type="text" placeholder="Full Name" width="64%" />
          <InputField type="text" placeholder="Email" width="64%" />
          <InputField type="password" placeholder="Password" width="64%" />
          <InputField type="text" placeholder="Phone Number" width="64%" />
        </div>
        <div className="tighterGroup">
          <PrimaryButton text="REGISTER" onClick={() => navigate('/dashboard')} width="calc(64% + 32px)" />
          <p>Already have an account?<a href="/"> Login Now</a></p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
