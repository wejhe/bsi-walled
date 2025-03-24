import DataTable from "react-data-table-component";
import InputField from "../components/InputField";

const TransactionTable = () => {
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
      datetime: "Beetlejuice",
      type: "1988",
      fromto: "100",
      description: "Anjay",
      amount: "100",
    },
  ];

  return (
    <div className="tableContainer">
      <InputField type="text" placeholder="&#128270;&nbsp; Search transaction history by description" width="calc(100% - 64px + 32px)" />
      <br /><br />
      <DataTable
        pagination
        columns={columns}
        data={data}
        customStyles={customStyles}
      />
    </div>
  );
};

export default TransactionTable;
