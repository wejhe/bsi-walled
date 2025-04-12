import topup from "/topup.png";
import transfer from "/transfer.png";
import history from "/history.png";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../utils/api";
import { formatCurrency } from "../utils/formatter";

const AccountInfo = () => {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [accountBalance, setAccountBalance] = useState(null);

  useEffect(() => {
    const fetchAccountBalanceData = async () => {
      try {
        const response = await api.get("/api/users/me");
        const formattedBalance = formatCurrency(
          response.data.data.wallet.balance.toString()
        );
        setAccountBalance(formattedBalance);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAccountBalanceData();
  }, []);

  const handleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  return (
    <div className="accinfo">
      <div className="accbalance">
        <p>Account Balance</p>
        <div className="balanceamount">
          <strong className="info">
            Rp {balanceVisible ? accountBalance : "**********"}
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
