import React from "react";
import BodyLayout from "../layouts/BodyLayout";
import TransactionTableLayout from "../layouts/TransactionTableLayout";
import TransactionTable from "../components/TransactionTable";
import PageTitle from "../components/PageTitle";
import { Helmet } from "react-helmet";

const TransactionHistoryPage = () => {
  return (
    <>
      <Helmet>
        <title>BSI Walled &ndash; History</title>
      </Helmet>
      <BodyLayout>
        <PageTitle text="Transaction History" />
        <TransactionTableLayout>
          <TransactionTable />
        </TransactionTableLayout>
      </BodyLayout>
    </>
  );
};

export default TransactionHistoryPage;
