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
import { verifyPIN } from "../utils/verifyPIN";
import api from "../utils/api";

const InfaqForm = () => {
  const navigate = useNavigate();

  const pinInputValueRef = useRef("");
  const pinIsEmptyRef = useRef(true);
  const pinIsCompleteRef = useRef(false);

  const [formData, setFormData] = useState({
    recipientWalletId: null,
    amount: "",
    description: "Infaq",
    isSedekah: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmountClick = (amount) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount.toString(),
    }));
  };

  const handlePinChange = (value) => {
    pinInputValueRef.current = value;
    pinIsEmptyRef.current = isEmpty(value);
    pinIsCompleteRef.current = isPinComplete(value);
  };

  const goToHome = () => {
    navigate("/dashboard");
  };

  const showToast = (message) => {
    Swal.fire({
      toast: true,
      position: "bottom-start",
      icon: "warning",
      title: message,
      showConfirmButton: false,
      timer: 3000,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("api/transactions/transfer", formData);

      Swal.fire({
        title:
          '<span style="color: #4CAF50; font-weight: 600; padding:0; margin: 0;">Top-Up Success</span>',
        html: `
                      <div style="text-align: left; font-size: 16px; line-height: 2.2; padding-bottom: 16px">
                        <p>Amount<span style="float: right; font-weight: bold;">Rp ${formatCurrency(
                          formData.amount
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
      })
        .then((res) => {
          if (res.isConfirmed) {
            goToHome();
          }
        })
        .then((res) => {
          if (res.isConfirmed) {
            navigate("/dashboard");
          }
        });
      console.log("Infaq berhasil", response.data);
    } catch (error) {
      showToast("Infaq failed", error.message);
      console.log(formData);

      // console.log("ini AMOUNT INFAQ",formData.amount);
      // console.log("RECIPIENT WALLET", formData.recipientWalletId);
      // console.log("DESCRIPTION", formData.description);
      // console.log("IS SEDEKAH", formData.isSedekah);
    }
  };

  const handleTopUpClick = () => {
    if (!formData.amount || formData.amount === "") {
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
                    formData.amount
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
        preConfirm: async () => {
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
          try {
            const result = await verifyPIN(pinInputValueRef.current);
            if (result.responseCode === 200) {
              console.log("input formData");
              return true;
            } else {
              showToast("Incorrect PIN, please try again");
              return false;
            }
          } catch (error) {
            showToast("Incorrect PIN, please try again");
            return false;
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          handleSubmit();
        }
      });
    }
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
                  Number(formData.amount) === amount ? "selected" : ""
                }`}
                onClick={() => handleAmountClick(amount)}
              >
                {formatCurrency(amount.toString())}
              </button>
            ))}
          </div>

          <div className="customAmountGroup">
            <InputCurrency
              value={formData.amount}
              name="infaq"
              placeholder="Infaq Amount"
              width="100%"
              onChange={handleChange}
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
