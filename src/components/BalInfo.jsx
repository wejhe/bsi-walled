import { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";
import axios from "axios";
import apiconfig from "../utils/apiconfig";

const BalInfo = () => {
  const [balance, setBalance] = useState(0);
  const accessToken = useAuthStore((state) => state.accessToken);

  const formatToRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    // const accessToken = useAuthStore.getState().accessToken;

    axios
      .get(`${apiconfig.BASE_URL}/api/wallets/balance`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // console.log("Full response:", response.data.data.balance);
        // console.log("Ini balance", response.data.balance);
        setBalance(response.data.data.balance);

        // console.log("Balance: ", balance);
      })
      .catch((error) => {
        setBalance(0);
        console.error("Gagal ambil data:", error);
      });
  }, [accessToken]);

  return (
    <div className="balInfo">
      &#128302;&nbsp;&nbsp;Walled Balance :{" "}
      {balance ? formatToRupiah(balance) : 0}
    </div>
  );
};

export default BalInfo;
