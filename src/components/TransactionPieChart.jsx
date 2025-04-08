import Filter from "./Filter";
import { PieChart } from "@mui/x-charts/PieChart";
import RecentTransaction from "./RecentTransaction";
import { useEffect, useRef } from "react";

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
                      { id: 0, value: 80, color: "#0061ff" },
                      { id: 1, value: 20, color: "#D0D5DD" },
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
