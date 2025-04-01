import { Helmet } from "react-helmet";
import BodyLayout from "../layouts/BodyLayout";
import TransactionInputLayout from "../layouts/TransactionInputLayout";
import PageTitle from "../components/PageTitle";
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
