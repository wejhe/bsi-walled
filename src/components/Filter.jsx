const Filter = ({ options, onChange }) => {
  return (
    <select className="dropdownFilter" onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Filter;
