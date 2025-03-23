const TransactionInputLayout = ({ children }) => {
  return (
    <>
      <div className="transactionSection">
        <div className="transactionInputGroup">
            {{children}}
        </div>
      </div>
    </>
  );
};

export default GreetingsLayout;
