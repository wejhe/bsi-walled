import Filter from "./Filter";
import { PieChart } from "@mui/x-charts/PieChart";
import RecentTransaction from "./RecentTransaction";
import { useEffect, useRef } from "react";
import { useState } from "react";
import api from "../utils/api";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import useAuthStore from "../stores/authStore";
import { formatCurrency, convertToUTC7 } from "../utils/formatter";

const TransactionPieChart = () => {
  const [transactionHistory, setTransactionHistory] = useState(null);
  const [last3TransactionHistory, setLast3TransactionHistory] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const [spendingRate, setSpendingRate] = useState(0);
  const [filter, setFilter] = useState("weekly");
  const [allUsersData, setAllUsersData] = useState(null);
  const { userData } = useAuthStore();

  dayjs.extend(isBetween);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(quarterOfYear);

  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        const response = await api.get("/api/users");

        setAllUsersData(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllUsersData();
  }, []);

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
        const quarter = Math.floor(now.month() / 3);
        startDate = dayjs()
          .quarter(quarter + 1)
          .startOf("quarter");
        endDate = dayjs()
          .quarter(quarter + 1)
          .endOf("quarter");
        break;
      default:
        return transactions;
    }

    return transactions.filter((tx) => {
      const date = dayjs(tx.transactionDate);
      return date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate);
    });
  };

  useEffect(() => {
    const fetchTransactionHistoryData = async () => {
      try {
        const response = await api.get("/api/transactions/me");

        const utc7transactionHistory = convertToUTC7(response.data.data);

        setTransactionHistory(utc7transactionHistory);
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

      const filteredTransactions = filterTransactionsByDate(
        transactionHistory,
        filter
      );

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

      const spendingRate =
        totalIncome > 0 ? ((totalSpending / totalIncome) * 100).toFixed(0) : 0;

      setSpendingRate(spendingRate);
    };

    mappingData();
  }, [transactionHistory, filter]);

  useEffect(() => {
    if (!transactionHistory || !allUsersData) return;

    const sortedData = [...transactionHistory].sort(
      (a, b) =>
        new Date(b.transactionDate).getTime() -
        new Date(a.transactionDate).getTime()
    );

    const mappedData = sortedData.map((item) => {
      const userWalletId = userData.wallet.id;
      const dateObj = new Date(item.transactionDate);
      const datetime = dateObj
        .toLocaleString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(/\./g, ":")
        .replace(",", "");

      let fromto = "-";
      let sign = "+";

      if (item.transactionType === "TRANSFER") {
        if (item.recipientWalletId === null) {
          fromto = "BSI LAZIS";
          sign = "-";
        } else if (item.recipientWalletId !== userWalletId) {
          fromto = item.recipientWalletId;
          sign = "-";
        } else {
          fromto = item.walletId;
          sign = "+";
        }
      } else {
        fromto = "Top-Up Provider";
      }

      let fromtoName = "-";
      if (typeof fromto === "number") {
        const userMatch = allUsersData.find(
          (entry) => entry.wallet.id === fromto
        );
        if (userMatch) {
          fromtoName = userMatch.user.fullName;
        }
      } else {
        fromtoName = fromto;
      }

      return {
        id: item.id,
        datetime,
        timestamp: dateObj.getTime(),
        type: item.transactionType
          .replace("_", "-")
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        fromto: fromtoName,
        description: item.description,
        amount: `${sign} ${formatCurrency(item.amount.toString())}`,
      };
    });

    setLast3TransactionHistory(mappedData.slice(0, 3));
  }, [transactionHistory, filter, allUsersData]);

  return (
    <>
      <div className="chartContainer">
        <div className="chartHeader">
          <p className="chartTitle">Your Spending Statistic</p>
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
          <div className="pieChartDivider">
            <div className="pieChart">
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: "#0061ff",
                  }}
                >
                  {spendingRate}%
                </div>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: totalSpending, color: "#0061ff" },
                        {
                          id: 1,
                          value: totalIncome - totalSpending,
                          color: "#D0D5DD",
                        },
                      ],
                      innerRadius: 80,
                      outerRadius: 100,
                      paddingAngle: 2,
                      cornerRadius: 4,
                      startAngle: 0,
                    },
                  ]}
                  width={250}
                  height={250}
                />
              </div>
              <p></p>
              <p style={{ marginBottom: "8px" }}>
                You've spent {spendingRate}% of your income
              </p>
              <p style={{ marginBottom: "24px" }}>
                <b>
                  Rp{formatCurrency((totalIncome - totalSpending).toString())}
                </b>{" "}
                is remaining
              </p>
            </div>
            <div className="recentTransactionHistory">
              <RecentTransaction data={last3TransactionHistory} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionPieChart;
