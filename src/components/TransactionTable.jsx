import DataTable from "react-data-table-component";
import InputField from "../components/InputField";
import { useState } from "react";

const TransactionTable = () => {
  const [searchValue, setSearchValue] = useState("");

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

  const data = [
    {
      id: 1,
      datetime: "10/11/2023",
      type: "Top Up",
      fromto: "Your Account",
      description: "Anjay",
      amount: "50.000",
    },
    {
      id: 2,
      datetime: "11/11/2023",
      type: "Top Up",
      fromto: "Your Account",
      description: "Anjay",
      amount: "50.000",
    },
    {
      id: 3,
      datetime: "12/11/2023",
      type: "Transfer",
      fromto: "100",
      description: "Anjay",
      amount: "100",
    },
    {
      id: 4,
      datetime: "13/11/2023",
      type: "Transfer",
      fromto: "100",
      description: "Anjay",
      amount: "100",
    },
    {
      id: 5,
      datetime: "14/11/2023",
      type: "Transfer",
      fromto: "100",
      description: "Anjay",
      amount: "100",
    },
  ];

  const filteredData = data.filter((item) =>
    [item.description, item.type, item.fromto, item.amount, item.datetime].some(
      (val) => val.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

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
        data={filteredData}
        customStyles={customStyles}
      />
    </div>
  );
};

export default TransactionTable;
