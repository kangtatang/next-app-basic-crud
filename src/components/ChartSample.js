import React from "react";

const ProgressChart = ({ label, value }) => {
  return (
    <div className="progress-chart">
      <div className="label">{label}</div>
      <div className="value">{value}%</div>
      <div className="chart">
        <div
          className="progress"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
      <div className="description">{value} selesai dari 100 data</div>
    </div>
  );
};

export default function ChartSample() {
  return (
    <div className="container">
      <ProgressChart label="UKO" value={40} />
      <ProgressChart label="DDB" value={40} />
      <ProgressChart label="PO" value={40} />
    </div>
  );
}
