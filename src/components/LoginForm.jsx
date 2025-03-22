import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import logo from "/logo.svg";

const LoginForm = () => {
  return (
    <>
      <div className="loginForm">
        <img className="authLogo" src={logo} />
        <div className="tighterGroup">
          <InputField type="text" placeholder="Email" />
          <InputField type="password" placeholder="Password" />
        </div>
        <div className="tighterGroup">
          <PrimaryButton text="LOGIN" />
          <p>Belum punya akun?<a href=""> Daftar Sekarang</a></p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
