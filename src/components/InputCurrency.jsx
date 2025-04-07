import React from "react";
import { formatCurrency } from "../utils/formatter";

const InputCurrency = ({
  placeholder,
  width,
  onChange,
  bgColor = "#fafbfd",
  strokeColor = "transparent",
  value = "",
}) => {
  // const [value, setValue] = useState("");

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ""); // hanya angka
    if (onChange) onChange(rawValue);
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
        />
        <button className="wCurrencyIcon">Rp</button>
      </div>
    </>
  );
};

export default InputCurrency;
