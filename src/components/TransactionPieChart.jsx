import Filter from "./Filter";
import { PieChart } from "@mui/x-charts/PieChart";
import RecentTransaction from "./RecentTransaction";

const TransactionPieChart = () => {
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
          <div className="pieChartDivider">
            <div className="pieChart">
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 80, color: "#0061ff", label: "A" },
                      { id: 1, value: 20, color: "#D0D5DD", label: "B" },
                    ],
                    innerRadius: 80,
                    outerRadius: 100,
                    paddingAngle: 2,
                    cornerRadius: 4,
                    startAngle: 0,
                  },
                ]}
                /* width={200}
                height={200} */
              />
            </div>
            <div className="recentTransactionHistory">
              <RecentTransaction />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionPieChart;
