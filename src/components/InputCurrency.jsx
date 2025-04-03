import React from "react";
import { useState } from "react";
import { formatCurrency } from "../utils/formatter";

const InputCurrency = ({ placeholder, width, onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const rawValue = e.target.value;
    const formatValue = formatCurrency(rawValue);
    setValue(formatValue);
    if (onChange) onChange(rawValue.replace(/,/g, ""));
  };

  return (
    <>
      <div className="inputFieldCurrencyWrapper">
        <input
          style={{ width: width }}
          className="inputFieldCurrency"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <button className="wCurrencyIcon">Rp</button>
      </div>
    </>
  );
};

export default InputCurrency;
