import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import InputSpan from "../components/InputSpan";
import BalInfo from "../components/BalInfo";
import ReactDOM from "react-dom/client";
import Swal from "sweetalert2";
import PinField from "react-pin-field";
import { useState, useEffect, useRef } from "react";
import { isEmpty, isPinComplete } from "../utils/validation";
import DropDown from "../components/DropDown";
import InputCurrency from "./InputCurrency";
import { formatCurrency } from "../utils/formatter";

const TransferForm = () => {
  const [pinInputValue, setPinInputValue] = useState("");
  const [pinIsEmpty, setPinIsEmpty] = useState(true);
  const [pinIsComplete, setPinIsComplete] = useState(false);

  const [recipient, setRecipient] = useState("Alif - 5651929834");
  const [transferAmount, setTransferAmount] = useState("");

  const pinIsEmptyRef = useRef(pinIsEmpty);
  const pinIsCompleteRef = useRef(pinIsComplete);

  useEffect(() => {
    pinIsEmptyRef.current = pinIsEmpty;
    pinIsCompleteRef.current = pinIsComplete;
  }, [pinIsEmpty, pinIsComplete]);

  const handleTransferClick = () => {
    if (!transferAmount || transferAmount === "") {
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
        title: "Confirmation",
        html: `
                <div style="text-align: left; font-size: 16px; line-height: 2.2; padding-bottom: 16px">
                  <p>Transfer Amount <span style="float: right; font-weight: bold;">Rp ${formatCurrency(
                    transferAmount
                  )}</span></p>
                  <p>Recipient<span style="float: right;">${recipient}</span></p>
                </div>
                <hr style="border-top: 1px solid #ccc;">
                <br><p style="font-size: 16px">Please enter your 6 digit transaction pin to proceed</p>
                <br><div id='pinInputContainer'></div>
                <div id="pinErrorMessage" style="font-size: 16px; color: red; display: none;">&#9888; Error : Your pin is either empty or incomplete</div>
              `,
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
        preConfirm: () => {
          if (pinIsEmptyRef.current || !pinIsCompleteRef.current) {
            const errorMessageElement =
              document.getElementById("pinErrorMessage");
            errorMessageElement.style.display = "block";
            errorMessageElement.classList.add("bounce");
            setTimeout(function () {
              errorMessageElement.classList.remove("bounce");
            }, 1000);
            return false;
          }
          return true;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:
              '<span style="color: #4CAF50; font-weight: 600; padding:0; margin: 0;">Transfer Success</span>',
            html: `
                        <div style="text-align: left; font-size: 16px; line-height: 2.2; padding-bottom: 16px">
                          <p>Amount<span style="float: right; font-weight: bold;">Rp ${formatCurrency(
                            transferAmount
                          )}</span></p>
                          <p>Transaction ID<span style="float: right;">338818239039011</span></p>
                          <p>Sender<span style="float: right;">1234005001</span></p>
                          <p>Recipient<span style="float: right;">${recipient}</span></p>
                          <p>Note<span style="float: right;">Bayar hutang dan beli Bakso</span></p>
                        </div>
                        <hr style="border-top: 1px solid #ccc;">
                        <button class="shareReceipt"></button>
                        <button class="downloadReceipt"></button>
                      `,
            icon: "success",
            confirmButtonText: "CONTINUE",
            customClass: {
              popup: "modalRadius",
              confirmButton: "modalButtonFull",
            },
          });
        }
      });
    }
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.selectedOptions[0].label);
  };

  const handleInputChange = (value) => {
    setTransferAmount(value);
  };

  const handlePinChange = (value) => {
    setPinInputValue(value);
    setPinIsEmpty(isEmpty(value));
    setPinIsComplete(isPinComplete(value));
  };

  return (
    <>
      <BalInfo />
      <div className="tighterGroup">
        <div className="inputGroupWithSpan">
          <InputSpan text="&#127917; Recipient" width="25%" />
          <DropDown
            options={[
              {
                value: "alif",
                label: "Alif - 5651929834",
              },
              {
                value: "wahyu",
                label: "Wahyu - 565192545",
              },
              {
                value: "dandi",
                label: "Dandi - 576797901",
              },
            ]}
            onChange={handleRecipientChange}
          />
        </div>
        <div className="inputGroupWithSpan">
          <InputSpan text="&#128176; Amount" width="25%" />
          <InputCurrency
            value={transferAmount}
            placeholder="Tansfer Amount"
            width="100%"
            onChange={handleInputChange}
          />
        </div>
        <div className="inputGroupWithSpan">
          <InputSpan text="&#128221; Note" width="25%" />
          <InputField type="text" placeholder="Transfer Note" width="75%" />
        </div>
      </div>
      <PrimaryButton
        text="TRANSFER"
        onClick={handleTransferClick}
        width="calc(100% + 32px)"
      />
    </>
  );
};

export default TransferForm;
