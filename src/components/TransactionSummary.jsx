import Filter from "./Filter";
import { PieChart } from "@mui/x-charts/PieChart";
import RecentTransaction from "./RecentTransaction";
import { useEffect, useRef } from "react";

const TransactionSummary = () => {
  return (
    <>
      <div className="chartContainer">
        <div className="chartHeader">
          <p className="chartTitle">Transaction Summary</p>
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
          <div className="summaryDivider">
            <div className="summaryItem">
              <p style={{ fontSize:"20px", marginBottom:"4px" }}>Income</p>
              <h2 style={{ fontSize:"28px", color:"#0061FF" }}>Rp7.100.000</h2>
            </div>
            <div className="verticalLine"></div>
            <div className="summaryItem">
              <p style={{ fontSize:"20px", marginBottom:"4px" }}>Spending</p>
              <h2 style={{ fontSize:"28px", color:"#CA3D00" }}>Rp3.550.000</h2>
            </div>
            <div className="verticalLine"></div>
            <div className="summaryItem">
              <p style={{ fontSize:"20px", marginBottom:"4px" }}>Savings Rate</p>
              <h2 style={{ fontSize:"28px", color:"#008B5E" }}>50%</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionSummary;
