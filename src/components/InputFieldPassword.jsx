const InputFieldPassword = ({ placeholder, width, onChange }) => {
  return (
    <>
      <div style={{display:"flex", width:"calc(64% + 32px)", gap:"24px"}}>
        <input
          style={{ width: width }}
          className="inputFieldText"
          type="password"
          placeholder={placeholder}
          onChange={onChange}
        />
        anjay
      </div>
    </>
  );
};

export default InputFieldPassword;
