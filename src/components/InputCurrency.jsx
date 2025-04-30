import React from "react";
import { formatCurrency } from "../utils/formatter";

const InputCurrency = ({
  placeholder,
  width,
  onChange,
  bgColor = "#fafbfd",
  strokeColor = "transparent",
  value = "",
  name = "",
}) => {
  // const [value, setValue] = useState("");

  const handleChange = (e) => {
    let rawValue = e.target.value.replace(/[^0-9]/g, ""); // hanya angka
  
    // Hindari angka yang hanya '0' atau diawali dengan '0'
    if (rawValue === "0") {
      rawValue = ""; // Kosongkan jika hanya '0'
    } else if (rawValue.length > 1 && rawValue.startsWith("0")) {
      rawValue = rawValue.replace(/^0+/, ""); // Hapus leading zeros jika lebih dari satu digit
    }
  
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: rawValue,
        },
      });
    }
  };
  

  const formattedValue = formatCurrency(value);

  return (
    <>
      <div className="inputFieldCurrencyWrapper">
        <input
          style={{
            width: width,
            backgroundColor: bgColor,
            borderColor: strokeColor,
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          className="inputFieldCurrency"
          type="text"
          placeholder={placeholder}
          value={formattedValue}
          onChange={handleChange}
          name={name}
        />
        <button className="wCurrencyIcon">Rp</button>
      </div>
    </>
  );
};

export default InputCurrency;
