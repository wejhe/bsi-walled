import { Helmet } from "react-helmet";
import LoginForm from "../components/LoginForm";
import AuthLayout from "../layouts/AuthLayout";
import AuthImage from "../components/AuthImage";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>BSI Walled &ndash; Login</title>
      </Helmet>
      <AuthLayout>
        <LoginForm />
        <AuthImage />
      </AuthLayout>
    </>
  );
};

export default LoginPage;
