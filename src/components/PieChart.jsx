import Filter from "./Filter";

const PieChart = () => {
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
            onChange={() => {}}
          />
        </div>
        <br />
        <hr style={{ borderTop: "1px solid #D0D5DD" }} />
        <br />
        <div className="chartBody">
          body pie chart
        </div>
      </div>
    </>
  );
};

export default PieChart;
