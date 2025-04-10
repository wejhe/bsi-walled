import topup from "/topup.png";
import transfer from "/transfer.png";
import history from "/history.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AccountInfo = () => {
  const [balanceVisible, setBalanceVisible] = useState(false);

  const handleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  return (
    <div className="accinfo">
      <div className="accbalance">
        <p>Account Balance</p>
        <div className="balanceamount">
          <strong className="info">
            Rp {balanceVisible ? "980.572.000" : "**********"}
          </strong>
          <a className="clickableicon" onClick={handleBalanceVisibility}>
            {balanceVisible ? (
              <Eye size={32} color="#c0c0c0" />
            ) : (
              <EyeOff size={32} color="#c0c0c0" />
            )}
          </a>
        </div>
      </div>
      <div className="accaction">
        <div className="accactionbtn">
          <a className="clickableicon" href="/history">
            <img src={history} />
          </a>
          History
        </div>
        <div className="accactionbtn">
          <a className="clickableicon" href="/topup">
            <img src={topup} />
          </a>
          Top-Up
        </div>
        <div className="accactionbtn">
          <a className="clickableicon" href="/transfer">
            <img src={transfer} />
          </a>
          Transfer
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
