import Filter from "./Filter";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";
import api from "../utils/api";
import useAuthStore from "../stores/authStore";

const TransactionBarChart = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [monthlySpending, setMonthlySpending] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [filter, setFilter] = useState("weekly");

  const { userData } = useAuthStore();

  useEffect(() => {
    const fetchTransactionHistoryData = async () => {
      try {
        const response = await api.get("/api/transactions/me");
        setTransactionHistory(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTransactionHistoryData();
  }, []);

  useEffect(() => {
    if (!Array.isArray(transactionHistory)) return;

    const userWalletId = userData.wallet.id;
    const now = new Date();

    const getStartOfWeek = (date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      d.setDate(diff);
      return new Date(d.setHours(0, 0, 0, 0));
    };

    const mappingData = () => {
      let labels = [];
      let incomeData = [];
      let spendingData = [];

      if (filter === "weekly") {
        const startOfWeek = getStartOfWeek(now);
        for (let i = 0; i < 7; i++) {
          const day = new Date(startOfWeek);
          day.setDate(day.getDate() + i);
          labels.push(day.toLocaleDateString("en-GB", { weekday: "short" }));
          incomeData.push(0);
          spendingData.push(0);
        }

        transactionHistory.forEach((tx) => {
          const txDate = new Date(tx.transactionDate);
          const dayDiff = Math.floor(
            (txDate - startOfWeek) / (1000 * 60 * 60 * 24)
          );

          if (dayDiff >= 0 && dayDiff < 7) {
            const isIncome =
              tx.transactionType === "TOP_UP" ||
              (tx.transactionType === "TRANSFER" &&
                tx.recipientWalletId === userWalletId);
            const isSpending =
              tx.transactionType === "TRANSFER" && tx.walletId === userWalletId;

            if (isIncome) incomeData[dayDiff] += tx.amount;
            if (isSpending) spendingData[dayDiff] += tx.amount;
          }
        });
      }

      if (filter === "monthly") {
        labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
        incomeData = [0, 0, 0, 0];
        spendingData = [0, 0, 0, 0];

        transactionHistory.forEach((tx) => {
          const txDate = new Date(tx.transactionDate);
          if (
            txDate.getMonth() === now.getMonth() &&
            txDate.getFullYear() === now.getFullYear()
          ) {
            const dayOfMonth = txDate.getDate();
            const weekIndex = Math.min(Math.floor((dayOfMonth - 1) / 7), 3);

            const isIncome =
              tx.transactionType === "TOP_UP" ||
              (tx.transactionType === "TRANSFER" &&
                tx.recipientWalletId === userWalletId);
            const isSpending =
              tx.transactionType === "TRANSFER" && tx.walletId === userWalletId;

            if (isIncome) incomeData[weekIndex] += tx.amount;
            if (isSpending) spendingData[weekIndex] += tx.amount;
          }
        });
      }

      if (filter === "quarterly") {
        const currentQuarter = Math.floor(now.getMonth() / 3);
        const firstMonth = currentQuarter * 3;

        labels = [];
        incomeData = [0, 0, 0];
        spendingData = [0, 0, 0];

        for (let i = 0; i < 3; i++) {
          const month = new Date(now.getFullYear(), firstMonth + i);
          labels.push(month.toLocaleString("default", { month: "short" }));
        }

        transactionHistory.forEach((tx) => {
          const txDate = new Date(tx.transactionDate);
          const txMonth = txDate.getMonth();
          const txQuarter = Math.floor(txMonth / 3);

          if (
            txQuarter === currentQuarter &&
            txDate.getFullYear() === now.getFullYear()
          ) {
            const monthIndex = txMonth - firstMonth;

            const isIncome =
              tx.transactionType === "TOP_UP" ||
              (tx.transactionType === "TRANSFER" &&
                tx.recipientWalletId === userWalletId);
            const isSpending =
              tx.transactionType === "TRANSFER" && tx.walletId === userWalletId;

            if (isIncome) incomeData[monthIndex] += tx.amount;
            if (isSpending) spendingData[monthIndex] += tx.amount;
          }
        });
      }

      setXLabels(labels);
      setMonthlyIncome(incomeData);
      setMonthlySpending(spendingData);
    };

    mappingData();
  }, [transactionHistory, filter]);

  return (
    <div className="chartContainer">
      <div className="chartHeader">
        <p className="chartTitle">Income vs Spending Comparison</p>
        <Filter
          options={[
            { value: "weekly", label: "This Week" },
            { value: "monthly", label: "This Month" },
            { value: "quarterly", label: "This Quarter" },
          ]}
          onChange={(selectedOption) => setFilter(selectedOption.value)}
        />
      </div>
      <br />
      <hr style={{ borderTop: "1px solid #D0D5DD" }} />
      <br />
      <div className="chartBody">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: xLabels,
              categoryGapRatio: 0.5,
              barGapRatio: 0.4,
            },
          ]}
          series={[
            { data: monthlyIncome, label: "Income", color: "#92CF96" },
            { data: monthlySpending, label: "Spending", color: "#0061FF" },
          ]}
          height={300}
          grid={{ horizontal: true }}
          borderRadius={8}
        />
      </div>
    </div>
  );
};

export default TransactionBarChart;
