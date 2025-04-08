import DataTable from "react-data-table-component";

const RecentTransaction = () => {
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
      sortable: true,
    },
    {
      name: "Type",
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
    {
      id: 2,
      datetime: "Beetlejuice",
      type: "1988",
      fromto: "100",
      description: "Anjay",
      amount: "100",
    },
    {
      id: 3,
      datetime: "Beetlejuice",
      type: "1988",
      fromto: "100",
      description: "Anjay",
      amount: "100",
    },
  ];

  return (
    <div className="recentTransactionContainer">
      <p className="miniTableTitle">Recent Transaction</p>
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
      />
    </div>
  );
};

export default RecentTransaction;
