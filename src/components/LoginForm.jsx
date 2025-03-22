import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import logo from "/logo.svg";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="forms">
        <img className="authLogo" src={logo} />
        <div className="tighterGroup">
          <InputField type="text" placeholder="Email" />
          <InputField type="password" placeholder="Password" />
        </div>
        <div className="tighterGroup">
          <PrimaryButton text="LOGIN" onClick={() => navigate('/dashboard')} />
          <p>Don't have any account?<a href="/register"> Register Now</a></p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
