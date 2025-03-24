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

const TopupPage = () => {
  return (
    <>
      <Helmet>
        <title>BSI Walled &ndash; Top-Up</title>
      </Helmet>
      <BodyLayout>
        <PageTitle text="Top-Up My Walled" />
        <TransactionInputLayout>
          <BalInfo />
          <div className="tighterGroup">
            <div className="inputGroupWithSpan">
              <InputSpan text="&#127917; Source" width="25%" />
              <DropDown
                options={[
                  {
                    value: "bsi",
                    label: "Bank Syariah Indonesia (BSI)",
                  },
                  {
                    value: "bca",
                    label: "Bank Central Asia (BCA)",
                  },
                  {
                    value: "bri",
                    label: "Bank Rakyat Indonesia (BRI)",
                  },
                ]}
              />
            </div>
            <div className="inputGroupWithSpan">
              <InputSpan text="&#128176; Amount" width="25%" />
              <InputField type="text" placeholder="Top-Up Amount" width="75%" />
            </div>
            <div className="inputGroupWithSpan">
              <InputSpan text="&#128221; Note" width="25%" />
              <InputField type="text" placeholder="Top-Up Note" width="75%" />
            </div>
          </div>
          <PrimaryButton
            text="TOP-UP"
            onClick={() =>
              Swal.fire({
                title: "Top-Up Success",
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

export default TopupPage;
