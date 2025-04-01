const InputFieldPassword = ({ type, placeholder, width, onChange, onClick }) => {
  return (
    <>
      <div className="inputFieldPasswordWrapper">
        <input
          style={{ width: width }}
          className="inputFieldText"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
        <button className="wHideIcon" onClick={onClick}></button>
      </div>
    </>
  );
};

export default InputFieldPassword;
