import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import InputSpan from "../components/InputSpan";
import BalInfo from "../components/BalInfo";
import DropDown from "../components/DropDown";
import ReactDOM from "react-dom/client";
import Swal from "sweetalert2";
import PinField from "react-pin-field";
import { useState } from "react";
import { isEmpty } from "../utils/validation";
import InputCurrency from "./InputCurrency";

const TopupForm = () => {
  const [pinInputValue, setPinInputValue] = useState("");
  const [pinIsEmpty, setPinIsEmpty] = useState(true);

  const [topUpAmount, setTopUpAmount] = useState("");

  const handleTopUpClick = () => {
    if (!topUpAmount || topUpAmount === "") {
      Swal.fire({
        toast: true,
        position: "bottom-start",
        icon: "warning",
        title: "Please enter transaction amount before proceeding",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
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
          const root = ReactDOM.createRoot(container);
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
            title:
              '<span style="color: #4CAF50; font-weight: 600; padding:0; margin: 0;">Top-Up Success</span>',
            html: `
                      <div style="text-align: left; font-size: 16px; line-height: 2.4; padding-top: 16px; padding-bottom: 16px">
                        <p><strong>Amount</strong> <span style="float: right; font-weight: bold;">1.000.000</span></p>
                        <p><strong>Transaction ID</strong> <span style="float: right;">338818239039011</span></p>
                        <p><strong>Sender</strong> <span style="float: right;">11234001000</span></p>
                        <p><strong>Recipient</strong> <span style="float: right;">1234005001</span></p>
                        <p><strong>Description</strong><span style="float: right;"> Bayar hutang dan beli Bakso</span></p>
                      </div>
                    `,
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
      });
    }
  };

  const handleInputChange = (value) => {
    setTopUpAmount(value);
  };

  const handlePinChange = (value) => {
    setPinInputValue(value);
    setPinIsEmpty(isEmpty(value));
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
          <InputCurrency
            value={topUpAmount}
            placeholder="Top-Up Amount"
            width="100%"
            onChange={handleInputChange}
          />
        </div>
        <div className="inputGroupWithSpan">
          <InputSpan text="&#128221; Note" width="25%" />
          <InputField type="text" placeholder="Top-Up Note" width="75%" />
        </div>
      </div>
      <PrimaryButton
        text="TOP-UP"
        onClick={handleTopUpClick}
        width="calc(100% + 32px)"
      />
    </>
  );
};

export default TopupForm;
