import view from "/view.svg";
import topup from "/topup.png";
import transfer from "/transfer.png";

const AccountInfo = () => {
  return (
    <div className="accinfo">
      <div className="accbalance">
        <p>Account Balance</p>
        <div className="balanceamount">
          <h2>Rp980.572.000</h2>
          <a className="clickableicon" href="#">
            <img src={view} />
          </a>
        </div>
      </div>
      <div className="accaction">
        <div className="accactionbtn">
          <a className="clickableicon" href="#">
            <img src={topup} />
          </a>
          Top-Up
        </div>
        <div className="accactionbtn">
          <a className="clickableicon" href="#">
            <img src={transfer} />
          </a>
          Transfer
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
