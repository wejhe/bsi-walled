const Filter = ({ options, onChange }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(option => option.value === selectedValue);
    onChange(selectedOption);
  };

  return (
    <select className="dropdownFilter" onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Filter;