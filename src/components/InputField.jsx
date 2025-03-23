const InputField = ({ type, placeholder, width }) => {
  return <input style={{width:width}} className="inputField" type={type} placeholder={placeholder} />;
};

export default InputField;
