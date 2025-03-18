const Greet = ({nickName}) => {
  return (
    <div>
      <h1 className="greet">Hello, {nickName}!</h1>
      <p className="subgreet">
        Check all your incoming and outgoing transactions here
      </p>
    </div>
  );
};

export default Greet;
