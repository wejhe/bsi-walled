import PrimaryButton from "../components/PrimaryButton";
import ReactDOM from "react-dom/client";
import Swal from "sweetalert2";
import PinField from "react-pin-field";
import { useState, useEffect, useRef } from "react";
import { isEmpty, isPinComplete } from "../utils/validation";
import InputCurrency from "./InputCurrency";
import { formatCurrency } from "../utils/formatter";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "./SecondaryButton";
import InfaqImage from "./InfaqImage";
import InfaqTitle from "./InfaqTitle";

const InfaqForm = () => {
  const navigate = useNavigate();
  const [pinInputValue, setPinInputValue] = useState("");
  const [pinIsEmpty, setPinIsEmpty] = useState(true);
  const [pinIsComplete, setPinIsComplete] = useState(false);

  const [infaqAmount, setInfaqAmount] = useState("");

  const pinIsEmptyRef = useRef(pinIsEmpty);
  const pinIsCompleteRef = useRef(pinIsComplete);

  useEffect(() => {
    pinIsEmptyRef.current = pinIsEmpty;
    pinIsCompleteRef.current = pinIsComplete;
  }, [pinIsEmpty, pinIsComplete]);

  const handleAmountClick = (amount) => {
    setInfaqAmount(amount.toString());
  };

  const goToHome = () => {
    navigate("/dashboard");
  };

  const handleTopUpClick = () => {
    if (!infaqAmount || infaqAmount === "") {
      Swal.fire({
        toast: true,
        position: "bottom-start",
        icon: "warning",
        title: "Please enter infaq amount before proceeding",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "Confirmation",
        html: `
                <div style="text-align: left; font-size: 16px; line-height: 2.2; padding-bottom: 16px">
                  <p>Infaq Amount <span style="float: right; font-weight: bold;">Rp ${formatCurrency(
                    infaqAmount
                  )}</span></p>
                  <p>Source<span style="float: right;">E-walled</span></p>
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
                          infaqAmount
                        )}</span></p>
                        <p>Transaction ID<span style="float: right;">338818239039011</span></p>
                        <p>Sender<span style="float: right;">E-walled</span></p>
                        <p>Recipient<span style="float: right;">Badan Amal Infaq</span></p>
                        <p>Note<span style="float: right;">Infaq</span></p>
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
              goToHome();
            }
          });
        }
      });
    }
  };

  const handleInputChange = (value) => {
    setInfaqAmount(value);
  };

  const handlePinChange = (value) => {
    setPinInputValue(value);
    setPinIsEmpty(isEmpty(value));
    setPinIsComplete(isPinComplete(value));
  };

  return (
    <>
      <div className="infaqHeader">
        <InfaqImage />
        <InfaqTitle />
      </div>
      <div className="full-width-infaq">
        <div className="inputAmount">
          <div className="quickAmountGroup">
            {[5000, 10000, 25000, 50000].map((amount) => (
              <button
                key={amount}
                className={`amountOption ${
                  Number(infaqAmount) === amount ? "selected" : ""
                }`}
                onClick={() => handleAmountClick(amount)}
              >
                {formatCurrency(amount.toString())}
              </button>
            ))}
          </div>

          <div className="customAmountGroup">
            <InputCurrency
              value={infaqAmount}
              placeholder="Infaq Amount"
              width="100%"
              onChange={handleInputChange}
              bgColor="#ffffff"
              strokeColor="#D7D7D7"
            />
          </div>
        </div>
        <div className="infaqButtonGroup">
          <PrimaryButton
            text="CONFIRM"
            onClick={handleTopUpClick}
            width="100%"
          />
          <SecondaryButton
            text="CONTINUE WITHOUT INFAQ"
            width="100%"
            onClick={goToHome}
          />
        </div>
      </div>
    </>
  );
};

export default InfaqForm;
