import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import InputSpan from "../components/InputSpan";
import BalInfo from "../components/BalInfo";
import DropDown from "../components/DropDown";
import ReactDOM from "react-dom/client";
import Swal from "sweetalert2";
import PinField from "react-pin-field";
import { useState } from "react";

const TopupForm = () => {
  const [pinInputValue, setPinInputValue] = useState("");

  const handlePinChange = (value) => {
    setPinInputValue(value);
  };

  return (
    <>
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
                title: "Top-Up Success",
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

export default TopupForm;
