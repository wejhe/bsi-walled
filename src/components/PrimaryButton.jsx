const PrimaryButton = ({ text, onClick }) => {
  return <button onClick={onClick} className="primaryButton">{text}</button>;
};

export default PrimaryButton;