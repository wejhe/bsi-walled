const DropDown = ({ name, value, options, onChange }) => {
  return (
    <select
      className="dropdownInput"
      name={name}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
