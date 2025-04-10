import Swal from "sweetalert2";
import ReactDOM from "react-dom/client";
import PinField from "react-pin-field";
import { isPinComplete, isPinNumberOnly } from "../utils/validation";

export const promptCreatePIN = () => {
  return new Promise((resolve, reject) => {
    let pinValue = "";
    let confirmPinValue = "";

    const handlePinChange = (field) => (value) => {
      if (field === "pin") pinValue = value;
      if (field === "confirmPin") confirmPinValue = value;

      // Real-time validation
      const helperElement = document.getElementById("realtimePinHelper");

      if (pinValue && confirmPinValue) {
        if (pinValue !== confirmPinValue) {
          helperElement.style.display = "block";
        } else {
          helperElement.style.display = "none";
        }
      } else {
        helperElement.style.display = "none";
      }
    };

    Swal.fire({
      title: "Create New PIN",
      html: `
        <div style="text-align: center; font-size: 16px; margin-bottom: 16px; line-height: 2.2;">
          <p style="margin-bottom: 12px; line-height: 1.8">Please create a new transaction PIN for your walled account with 6 digits of numbers</p>
          <hr style="border-top: 1px solid #ccc; margin: 20px 0">
          <label>PIN</label>
          <div id='pinInputContainer1' style="margin-bottom: 16px; margin-top: 8px;"></div>
          <label>Confirm PIN</label>
          <div id='pinInputContainer2' style="margin-top: 8px;"></div>
        </div>
        <div id="pinErrorMessage" style="font-size: 16px; color: red; display: none;">
          &#9888; Error: PIN must be filled with number only and matched
        </div>
        <div id="realtimePinHelper" style="font-size: 16px; color: red; display: none;">
          &#9888; Error: PIN is not matched
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "CONFIRM",
      cancelButtonText: "CANCEL",
      willOpen: () => {
        const container1 = document.getElementById("pinInputContainer1");
        const container2 = document.getElementById("pinInputContainer2");

        ReactDOM.createRoot(container1).render(
          <PinField
            autoComplete="one-time-code"
            className="wPinField"
            length={6}
            dir="ltr"
            type="password"
            autoFocus
            onChange={handlePinChange("pin")}
          />
        );

        ReactDOM.createRoot(container2).render(
          <PinField
            autoComplete="one-time-code"
            className="wPinField"
            length={6}
            type="password"
            onChange={handlePinChange("confirmPin")}
          />
        );
      },
      preConfirm: () => {
        const isValid =
          isPinComplete(pinValue) &&
          isPinComplete(confirmPinValue) &&
          pinValue === confirmPinValue &&
          isPinNumberOnly(pinValue);

        if (!isValid) {
          const errorElement = document.getElementById("pinErrorMessage");
          errorElement.style.display = "block";
          errorElement.classList.add("bounce");
          setTimeout(() => errorElement.classList.remove("bounce"), 1000);
          return false;
        }

        return true;
      },
      customClass: {
        popup: "modalRadius",
        confirmButton: "modalButton",
        cancelButton: "modalButtonSecondary",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(pinValue);
      } else {
        reject("User cancelled");
      }
    });
  });
};

export default promptCreatePIN;
