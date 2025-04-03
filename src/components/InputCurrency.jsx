import React from "react";
import { useState } from "react";

const InputCurrency = ({ placeholder, width, onChange }) => {
  const [value, setValue] = useState("");

  const formatCurrency = (input) => {
    const numericValue = input.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
