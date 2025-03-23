import { Helmet } from "react-helmet";
import BodyLayout from "../layouts/BodyLayout";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import InputSpan from "../components/InputSpan";

const TransferPage = () => {
  return (
    <>
      <Helmet>
        <title>BSI Walled &ndash; Transfer</title>
      </Helmet>
      <BodyLayout>
        <h1 className="pageTitle">Transfer Money to Others</h1>
        <div className="transactionSection">
          <div className="transactionInputGroup">
            <div className="balInfo">
              &#128302;&nbsp;&nbsp;Walled Balance : Rp980.572.000
            </div>
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
                <InputField
                  type="text"
                  placeholder="Transfer Note"
                  width="75%"
                />
              </div>
            </div>
            <PrimaryButton
              text="TRANSFER"
              onClick={() => navigate("/dashboard")}
              width="calc(100% + 32px)"
            />
          </div>
        </div>
      </BodyLayout>
    </>
  );
};

export default TransferPage;
