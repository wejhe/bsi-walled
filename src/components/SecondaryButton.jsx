const SecondaryButton = ({ text, onClick, width }) => {
  return (
    <button
      style={{ width: width }}
      onClick={onClick}
      className="modalButtonSecondary"
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
