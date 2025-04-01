const InputField = ({ type, placeholder, width, onChange }) => {
  return <input style={{width:width}} className="inputField" type={type} placeholder={placeholder} onChange={onChange} />;
};

export default InputField;
