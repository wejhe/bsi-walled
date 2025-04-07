import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import InputSpan from "../components/InputSpan";
import BalInfo from "../components/BalInfo";
import DropDown from "../components/DropDown";
import ReactDOM from "react-dom/client";
import Swal from "sweetalert2";
import PinField from "react-pin-field";
import { useState, useEffect, useRef } from "react";
import { isEmpty, isPinComplete } from "../utils/validation";
import InputCurrency from "./InputCurrency";
import { formatCurrency } from "../utils/formatter";
import { useNavigate } from "react-router-dom";

const TopupForm = () => {
  const navigate = useNavigate();
  const [pinInputValue, setPinInputValue] = useState("");
  const [pinIsEmpty, setPinIsEmpty] = useState(true);
  const [pinIsComplete, setPinIsComplete] = useState(false);

  const [topUpSource, setTopUpSource] = useState(
    "Bank Syariah Indonesia (BSI)"
  );
  const [topUpAmount, setTopUpAmount] = useState("");

  const pinIsEmptyRef = useRef(pinIsEmpty);
  const pinIsCompleteRef = useRef(pinIsComplete);

  useEffect(() => {
    pinIsEmptyRef.current = pinIsEmpty;
    pinIsCompleteRef.current = pinIsComplete;
  }, [pinIsEmpty, pinIsComplete]);

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
        title: "Confirmation",
        html: `
                <div style="text-align: left; font-size: 16px; line-height: 2.2; padding-bottom: 16px">
                  <p>Top-Up Amount <span style="float: right; font-weight: bold;">Rp ${formatCurrency(
                    topUpAmount
                  )}</span></p>
                  <p>Source<span style="float: right;">${topUpSource}</span></p>
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
              '<span style="color: #4CAF50; font-weight: 600; padding:0; margin: 0;">Top-Up Success</span>',
            html: `
                      <div style="text-align: left; font-size: 16px; line-height: 2.2; padding-bottom: 16px">
                        <p>Amount<span style="float: right; font-weight: bold;">Rp ${formatCurrency(
                          topUpAmount
                        )}</span></p>
                        <p>Transaction ID<span style="float: right;">338818239039011</span></p>
                        <p>Sender<span style="float: right;">${topUpSource}</span></p>
                        <p>Recipient<span style="float: right;">1234005001</span></p>
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
          }).then((res) => {
            if (res.isConfirmed) {
              navigate("/infaq");
            }
          });
        }
      });
    }
  };

  const handleSourceChange = (e) => {
    setTopUpSource(e.target.selectedOptions[0].label);
  };

  const handleInputChange = (value) => {
    setTopUpAmount(value);
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
            onChange={handleSourceChange}
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
