import { Helmet } from "react-helmet";
import BodyLayout from "../layouts/BodyLayout";
import TransactionInputLayout from "../layouts/TransactionInputLayout";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import InputSpan from "../components/InputSpan";
import PageTitle from "../components/PageTitle";
import BalInfo from "../components/BalInfo";
import DropDown from "../components/DropDown";
import Swal from "sweetalert2";
import TopupForm from "../components/TopupForm";

const TopupPage = () => {
  return (
    <>
      <Helmet>
        <title>BSI Walled &ndash; Top-Up</title>
      </Helmet>
      <BodyLayout>
        <PageTitle text="Top-Up My Walled" />
        <TransactionInputLayout>
          <TopupForm />
        </TransactionInputLayout>
      </BodyLayout>
    </>
  );
};

export default TopupPage;
