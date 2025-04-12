import { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";
import axios from "axios";
import apiconfig from "../utils/apiconfig";
import api from "../utils/api";

const BalInfo = () => {
  const [balance, setBalance] = useState(0);
  // const accessToken = useAuthStore((state) => state.accessToken);

  const formatToRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const fetchBalance = async () => {
    try {
      const response = await api.get("/api/wallets/balance");
      const balance = response.data.data.balance;
      setBalance(balance);
    } catch (error) {
      setBalance(0);
      console.error("Gagal ambil data:", error);
    }
  };

  fetchBalance();

  return (
    <div className="balInfo">
      &#128302;&nbsp;&nbsp;Walled Balance :{" "}
      {balance ? formatToRupiah(balance) : 0}
    </div>
  );
};

export default BalInfo;
