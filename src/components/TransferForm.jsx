import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import InputSpan from "../components/InputSpan";
import BalInfo from "../components/BalInfo";
import ReactDOM from "react-dom/client";
import Swal from "sweetalert2";
import PinField from "react-pin-field";
import { useState } from "react";
import { isEmpty } from "../utils/validation";

const TransferForm = () => {
  const [pinInputValue, setPinInputValue] = useState("");
  const [pinIsEmpty, setPinIsEmpty] = useState(true);

  const handlePinChange = (value) => {
    setPinInputValue(value);
    setPinIsEmpty(isEmpty(value));
  };

  return (
    <>
      <BalInfo />
      <div className="tighterGroup">
        <div className="inputGroupWithSpan">
          <InputSpan text="&#127917; Recipient" width="25%" />
          <InputField type="text" placeholder="Account Number" width="75%" />
        </div>
        <div className="inputGroupWithSpan">
          <InputSpan text="&#128176; Amount" width="25%" />
          <InputField type="text" placeholder="Transfer Amount" width="75%" />
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
            title: "Transaction Pin",
            html: "<p>Please enter your 6 digit transaction pin</p><br><br><div id='pinInputContainer'></div><br>",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "CONFIRM",
            cancelButtonText: "CANCEL",
            customClass: {
              popup: "modalRadius",
              confirmButton: "modalButton",
              cancelButton: "modalButtonSecondary",
            },
            willOpen: () => {
              const container = document.getElementById("pinInputContainer");
              const root = ReactDOM.createRoot(container); // Membuat root React untuk container
              root.render(
                <PinField
                  autoComplete="one-time-code"
                  autoCorrect="off"
                  className="wPinField"
                  dir="ltr"
                  length={6}
                  type="password"
                  autoFocus
                  onChange={handlePinChange}
                />
              );
            },
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Transfer Success",
                text: "Your request has been successfullly processed",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "PRINT",
                cancelButtonText: "DISMISS",
                customClass: {
                  popup: "modalRadius",
                  confirmButton: "modalButton",
                  cancelButton: "modalButtonSecondary",
                },
              });
            }
          })
        }
        width="calc(100% + 32px)"
      />
    </>
  );
};

export default TransferForm;
