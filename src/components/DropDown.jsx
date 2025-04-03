const DropDown = ({ options, onChange, selectedValue }) => {
  return (
    <select className="dropdownInput" onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
