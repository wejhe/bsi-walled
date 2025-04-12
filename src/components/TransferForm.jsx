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
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { verifyPIN } from "../utils/verifyPIN";

const TransferForm = () => {
  const navigate = useNavigate();

  const pinInputValueRef = useRef("");
  const pinIsEmptyRef = useRef(true);
  const pinIsCompleteRef = useRef(false);
  // const [pinInputValue, setPinInputValue] = useState("");
  // const [pinIsEmpty, setPinIsEmpty] = useState(true);
  // const [pinIsComplete, setPinIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    recipientWalletId: "",
    amount: "",
    description: "",
    isSedekah: false,
  });

  const [balance, setBalance] = useState(0);

  const [dataRecipient, setDataRecipient] = useState([]);

  useEffect(() => {
  const fetchRecipient = async () => {
    try {
      const response = await api.get("api/users");
      setDataRecipient(response.data.data);
      console.log("INI RESPONS",response.data.data)
    } catch (error) {
      console.error("Gagal fetch users", error);
    }
  };

  fetchRecipient();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await api.get("/api/wallets/balance");
      const balance = response.data.data.balance;
      setBalance(balance);
    } catch (error) {
      setBalance(0);
      console.error("Gagal ambil data:", error);
    }
  };

  fetchBalance();

  const recipientOptions = dataRecipient
    ? dataRecipient
        .filter(item => item.user && item.wallet)
        .map(item => ({
          value: item.wallet.id,
          label: `${item.user.fullName} - ${item.wallet.accountNumber}`,
        }))
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePinChange = (value) => {
    pinInputValueRef.current = value;
    pinIsEmptyRef.current = isEmpty(value);
    pinIsCompleteRef.current = isPinComplete(value);
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
      const data = response.data.data;

      Swal.fire({
        title:
          '<span style="color: #4CAF50; font-weight: 600;">Transfer Success</span>',
        html: `
          <div style="text-align: left; font-size: 16px; line-height: 2.2; padding-bottom: 16px">
            <p>Amount<span style="float: right; font-weight: bold;">Rp ${formatCurrency(
              formData.amount
            )}</span></p>
            <p>Transaction ID<span style="float: right;">${data.id}</span></p>
            <p>Source<span style="float: right;">${formData.source}</span></p>
            <p>Recipient<span style="float: right;">
              ${formData.recipientWalletId}
            </span></p>
            <p>Note<span style="float: right;">${
              formData.description
            }</span></p>
          </div>
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
      // console.log("Infaq berhasil", response.data);
    } catch (error) {
      showToast("Transfer failed", error.message);
      console.log(formData);
    }
  };

  const handleTransferClick = () => {
    if (balance < formData.amount) {
      Swal.fire({
        toast: true,
        position: "bottom-start",
        icon: "warning",
        title: "Wallet balance is not enough!",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (!formData.amount || formData.amount === "") {
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
                    formData.amount
                  )}</span></p>
                  <p>Source<span style="float: right;">${
                    formData.source
                  }</span></p>
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

  // const handleRecipientChange = (e) => {
  //   setRecipient(e.target.selectedOptions[0].label);
  // };

  // const handleInputChange = (value) => {
  //   setTransferAmount(value);
  // };

  console.log("dataRecipient", dataRecipient);

  return (
    <>
      <BalInfo />
      <div className="tighterGroup">
        <div className="inputGroupWithSpan">
          <InputSpan text="&#127917; Recipient" width="25%" />
          <DropDown
            name="recipientWalletId"
            value={formData.recipientWalletId}
            options={recipientOptions}
            onChange={handleChange}
          />
        </div>
        <div className="inputGroupWithSpan">
          <InputSpan text="&#128176; Amount" width="25%" />
          <InputCurrency
            value={formData.amount}
            name="amount"
            placeholder="Tansfer Amount"
            width="100%"
            onChange={handleChange}
          />
        </div>
        <div className="inputGroupWithSpan">
          <InputSpan text="&#128221; Note" width="25%" />
          <InputField
            type="text"
            placeholder="Transfer Note"
            width="75%"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
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
