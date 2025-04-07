const InputField = ({ type, placeholder, width, onChange, value = "", name = "" }) => {
  return (
    <input
      style={{ width: width }}
      className="inputFieldText"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
    />
  );
};

export default InputField;
