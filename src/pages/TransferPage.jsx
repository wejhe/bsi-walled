import { Helmet } from "react-helmet";
import BodyLayout from "../layouts/BodyLayout";
import TransactionInputLayout from "../layouts/TransactionInputLayout";
import PageTitle from "../components/PageTitle";
import TransferForm from "../components/TransferForm";

const TransferPage = () => {
  return (
    <>
      <Helmet>
        <title>BSI Walled &ndash; Transfer</title>
      </Helmet>
      <BodyLayout>
        <PageTitle text="Transfer Money to Others" />
        <TransactionInputLayout>
          <TransferForm />
        </TransactionInputLayout>
      </BodyLayout>
    </>
  );
};

export default TransferPage;
