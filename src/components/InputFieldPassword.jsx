import { Eye, EyeOff } from "lucide-react";

const InputFieldPassword = ({
  type,
  placeholder,
  width,
  onChange,
  onClick,
  isVisible,
  value,
  name,
}) => {
  return (
    <>
      <div className="inputFieldPasswordWrapper">
        <input
          style={{ width: width }}
          className="inputFieldText"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
        />
        <button className="wHideIcon" onClick={onClick}>
          {isVisible ? (
            <Eye size={24} color="#c0c0c0" />
          ) : (
            <EyeOff size={24} color="#c0c0c0" />
          )}
        </button>
      </div>
    </>
  );
};

export default InputFieldPassword;
