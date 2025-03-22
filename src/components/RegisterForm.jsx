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
          <InputField type="text" placeholder="Full Name" />
          <InputField type="text" placeholder="Email" />
          <InputField type="password" placeholder="Password" />
          <InputField type="text" placeholder="Phone Number" />
        </div>
        <div className="tighterGroup">
          <PrimaryButton text="REGISTER" onClick={() => navigate('/dashboard')} />
          <p>Already have an account?<a href="/"> Login Now</a></p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
