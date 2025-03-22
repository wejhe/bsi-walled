import { Helmet } from "react-helmet";
import RegisterForm from "../components/RegisterForm";
import AuthLayout from "../layouts/AuthLayout";
import AuthImage from "../components/AuthImage";

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>BSI Walled &ndash; Register</title>
      </Helmet>
      <AuthLayout>
        <RegisterForm />
        <AuthImage />
      </AuthLayout>
    </>
  );
};

export default RegisterPage;
