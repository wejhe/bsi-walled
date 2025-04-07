import React from "react";
import BodyLayout from "../layouts/BodyLayout";
import TransactionTableLayout from "../layouts/TransactionTableLayout";
import TransactionTable from "../components/TransactionTable";
import PageTitle from "../components/PageTitle";

const TransactionHistoryPage = () => {
  return (
    <div>
      <BodyLayout>
        <PageTitle text="Transaction History" />
        <TransactionTableLayout>
          <TransactionTable />
        </TransactionTableLayout>
      </BodyLayout>
    </div>
  );
};

export default TransactionHistoryPage;
