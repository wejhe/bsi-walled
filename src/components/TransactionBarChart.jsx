import Filter from "./Filter";
import { BarChart } from "@mui/x-charts/BarChart";

const TransactionBarChart = () => {
  return (
    <>
      <div className="chartContainer">
        <div className="chartHeader">
          <p className="chartTitle">Income vs Spending Comparison</p>
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
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
                categoryGapRatio: 0.5,
                barGapRatio: 0.4,
              },
            ]}
            series={[
              { data: [2, 5, 3, 4, 2, 6], label: "Income", color: "#92CF96"},
              { data: [4, 3, 5, 1, 6, 3], label: "Spending", color: "#0061FF"},
            ]}
            height={300}
            grid={{ horizontal: true }}
            borderRadius={8}
          />
        </div>
      </div>
    </>
  );
};

export default TransactionBarChart;
