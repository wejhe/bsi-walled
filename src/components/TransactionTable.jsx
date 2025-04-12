import DataTable from "react-data-table-component";
import InputField from "../components/InputField";
import { useState, useEffect, use } from "react";
import api from "../utils/api";

const TransactionTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [transactionHistory, setTransactionHistory] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchTransactionHistoryData = async () => {
      try {
        const response = await api.get("/api/transactions/me");

        const sortedData = response.data.data.sort(
          (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
        );

        const mappedData = sortedData.map((item) => {
          const dateObj = new Date(item.transactionDate);
          const datetime = dateObj
            .toLocaleString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
            .replace(/\./g, ":")
            .replace(",", "");

          let fromto = "-";
          let sign = "+";

          if (item.transactionType === "TRANSFER") {
            if (item.recipientWalletId !== 9) {
              fromto = item.recipientWalletId;
              sign = "-";
            } else {
              fromto = item.walletId;
              sign = "+";
            }
          }

          return {
            id: item.id,
            datetime,
            timestamp: dateObj.getTime(),
            type: item.transactionType
              .replace("_", "-")
              .toLowerCase()
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            fromto,
            description: item.description,
            amount: `${sign} ${item.amount}`,
          };
        });

        setTransactionHistory(mappedData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTransactionHistoryData();
  }, []);

  useEffect(() => {
    if (!transactionHistory) return;
    const filteredData = transactionHistory.filter((item) =>
      [
        item.description,
        item.type,
        item.fromto,
        item.amount,
        item.datetime,
      ].some((val) =>
        String(val).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  }, [transactionHistory, searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "white",
        padding: "16px 24px",
        color: "black",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        padding: "16px 24px",
        color: "black",
        fontSize: "14px",
      },
    },
    pagination: {
      style: {
        position: "relative",
        top: "auto",
        right: "auto",
        padding: "4px 20px",
        height: "auto",
        fontSize: "14px",
        justifyContent: "flex-start",
        borderBottomLeftRadius: "16px",
        borderBottomRightRadius: "16px",
      },
    },
  };

  const columns = [
    {
      name: "Date and Time",
      selector: (row) => row.datetime,
      sortable: true,
      sortFunction: (a, b) => b.timestamp - a.timestamp,
    },
    {
      name: "Transaction Type",
      selector: (row) => row.type,
    },
    {
      name: "From / To",
      selector: (row) => row.fromto,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
  ];

  return (
    <div className="tableContainer">
      <InputField
        type="text"
        placeholder="&#128270;&nbsp; Search transaction history by description, amount, etc."
        width="calc(100% - 64px + 32px)"
        value={searchValue}
        onChange={handleSearch}
      />
      <br />
      <br />
      <DataTable
        pagination
        columns={columns}
        data={filteredData || []}
        customStyles={customStyles}
      />
    </div>
  );
};

export default TransactionTable;
