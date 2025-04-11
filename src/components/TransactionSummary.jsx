import Filter from "./Filter";
import { useEffect, useState } from "react";
import api from "../utils/api";
import useAuthStore from "../stores/authStore";
import { formatCurrency } from "../utils/formatter";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

const TransactionSummary = () => {
  const [transactionHistory, setTransactionHistory] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0);
  const [filter, setFilter] = useState("weekly");
  const { userData } = useAuthStore();

  dayjs.extend(isBetween);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);

  const filterTransactionsByDate = (transactions, filterType) => {
    const now = dayjs();
    let startDate, endDate;
  
    switch (filterType) {
      case "weekly":
        startDate = now.startOf("week");
        endDate = now.endOf("week");
        break;
      case "monthly":
        startDate = now.startOf("month");
        endDate = now.endOf("month");
        break;
      case "quarterly":
        const quarter = Math.floor((now.month()) / 3);
        startDate = dayjs().quarter(quarter + 1).startOf("quarter");
        endDate = dayjs().quarter(quarter + 1).endOf("quarter");
        break;
      default:
        return transactions;
    }
  
    return transactions.filter(tx => {
      const date = dayjs(tx.transactionDate);
      return date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate);
    });
  };

  useEffect(() => {
    const fetchTransactionHistoryData = async () => {
      try {
        const response = await api.get("/api/transactions/me");
        setTransactionHistory(response.data.data);
        console.log("Transaction History:", response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTransactionHistoryData();
  }, []);

  useEffect(() => {
    if (!transactionHistory) return;
  
    const mappingData = () => {
      const userWalletId = userData.wallet.id;
  
      const filteredTransactions = filterTransactionsByDate(transactionHistory, filter);
  
      const totalIncome = filteredTransactions.reduce((total, tx) => {
        if (
          tx.transactionType === "TOP_UP" ||
          (tx.transactionType === "TRANSFER" &&
            tx.recipientWalletId === userWalletId)
        ) {
          return total + tx.amount;
        }
        return total;
      }, 0);
  
      const totalSpending = filteredTransactions.reduce((total, tx) => {
        if (tx.transactionType === "TRANSFER" && tx.walletId === userWalletId) {
          return total + tx.amount;
        }
        return total;
      }, 0);
  
      setTotalIncome(totalIncome);
      setTotalSpending(totalSpending);
  
      const savingsRate =
        totalIncome > 0
          ? 100 - ((totalSpending / totalIncome) * 100).toFixed(0)
          : 0;
  
      setSavingsRate(savingsRate);
    };
  
    mappingData();
  }, [transactionHistory, filter]);  

  return (
    <>
      <div className="chartContainer">
        <div className="chartHeader">
          <p className="chartTitle">Transaction Summary</p>
          <Filter
            options={[
              {
                value: "weekly",
                label: "This Week",
              },
              {
                value: "monthly",
                label: "This Month",
              },
              {
                value: "quarterly",
                label: "This Quarter",
              },
            ]}
            onChange={(selectedOption) => setFilter(selectedOption.value)}
          />
        </div>
        <br />
        <hr style={{ borderTop: "1px solid #D0D5DD" }} />
        <br />
        <div className="chartBody">
          <div className="summaryDivider">
            <div className="summaryItem">
              <p style={{ fontSize: "20px", marginBottom: "4px" }}>Income</p>
              <h2 style={{ fontSize: "28px", color: "#0061FF" }}>
                {formatCurrency(totalIncome.toString())}
              </h2>
            </div>
            <div className="verticalLine"></div>
            <div className="summaryItem">
              <p style={{ fontSize: "20px", marginBottom: "4px" }}>Spending</p>
              <h2 style={{ fontSize: "28px", color: "#CA3D00" }}>
                {formatCurrency(totalSpending.toString())}
              </h2>
            </div>
            <div className="verticalLine"></div>
            <div className="summaryItem">
              <p style={{ fontSize: "20px", marginBottom: "4px" }}>
                Savings Rate
              </p>
              <h2 style={{ fontSize: "28px", color: "#008B5E" }}>
                {savingsRate}%
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionSummary;
