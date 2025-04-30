import DataTable from "react-data-table-component";

const RecentTransaction = ({data}) => {
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "white",
        padding: "16px 20px",
        color: "black",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        padding: "16px 20px",
        color: "black",
        fontSize: "14px",
      },
    },
  };

  const columns = [
    {
      name: "Time",
      selector: (row) => row.datetime,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      width: "100px",
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
    },
  ];

  return (
    <div className="recentTransactionContainer">
      <p className="miniTableTitle">Recent Transaction</p>
      <DataTable
        columns={columns}
        data={data? data : []}
        customStyles={customStyles}
      />
    </div>
  );
};

export default RecentTransaction;
