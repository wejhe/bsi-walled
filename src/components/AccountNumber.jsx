import { useEffect, useState } from "react";
import api from "../utils/api";

const AccountNumber = () => {
  const [accountNumber, setAccountNumber] = useState(null);

  useEffect(() => {
    const fetchAccountNumberData = async () => {
      try {
        const response = await api.get("/api/users/me");
        setAccountNumber(response.data.data.wallet.accountNumber);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAccountNumberData();
  }, []);

  return (
    <div className="accno">
      <p>Account Number</p>
      <strong className="info">{accountNumber}</strong>
    </div>
  );
};

export default AccountNumber;
