import { Helmet } from "react-helmet";
import BodyLayout from "../layouts/BodyLayout";
import TransactionInputLayout from "../layouts/TransactionInputLayout";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import InputSpan from "../components/InputSpan";
import PageTitle from "../components/PageTitle";
import BalInfo from "../components/BalInfo";
import Swal from "sweetalert2";

const TransferPage = () => {
  return (
    <>
      <Helmet>
        <title>BSI Walled &ndash; Transfer</title>
      </Helmet>
      <BodyLayout>
        <PageTitle text="Transfer Money to Others" />
        <TransactionInputLayout>
          <BalInfo />
          <div className="tighterGroup">
            <div className="inputGroupWithSpan">
              <InputSpan text="&#127917; Recipient" width="25%" />
              <InputField
                type="text"
                placeholder="Account Number"
                width="75%"
              />
            </div>
            <div className="inputGroupWithSpan">
              <InputSpan text="&#128176; Amount" width="25%" />
              <InputField
                type="text"
                placeholder="Transfer Amount"
                width="75%"
              />
            </div>
            <div className="inputGroupWithSpan">
              <InputSpan text="&#128221; Note" width="25%" />
              <InputField type="text" placeholder="Transfer Note" width="75%" />
            </div>
          </div>
          <PrimaryButton
            text="TRANSFER"
            onClick={() =>
              Swal.fire({
                title: "Transfer Success",
                text: "Your request has been successfullly processed",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "PRINT",
                cancelButtonText: "DISMISS",
                customClass: {
                  popup: 'modalRadius',
                  confirmButton: 'modalButton',
                  cancelButton: "modalButtonSecondary"
                }
              })
            }
            width="calc(100% + 32px)"
          />
        </TransactionInputLayout>
      </BodyLayout>
    </>
  );
};

export default TransferPage;
