const PrimaryButton = ({ text, onClick, width }) => {
  return <button style={{width:width}} onClick={onClick} className="primaryButton">{text}</button>;
};

export default PrimaryButton;