import React from "react";
import styles from "../styles/ProgressChart.module.css";
// const ProgressChartContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const Label = styled.span`
//   font-size: 18px;
//   font-weight: bold;
//   margin-bottom: 10px;
// `;

// const Value = styled.span`
//   font-size: 24px;
//   font-weight: bold;
//   color: #333;
//   margin-bottom: 10px;
// `;

// const ChartContainer = styled.div`
//   width: 100%;
//   height: 20px;
//   background-color: #f0f0f0;
//   border-radius: 10px;
//   overflow: hidden;
// `;

// const Progress = styled.div`
//   width: 0%;
//   height: 100%;
//   background-color: #4caf50;
//   transition: width 0.5s ease-in-out;
// `;

// const Description = styled.span`
//   font-size: 14px;
//   color: #666;
//   margin-top: 10px;
// `;

const PChart = ({ label, value }) => {
  return (
    <div className={styles.progressChart}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}%</div>
      <div className={styles.chart}>
        <div
          className={styles.progress}
          style={{
            width: `${value}%`,
          }}
        />
      </div>
      <div className={styles.description}>{value} selesai dari 100 data</div>
    </div>
  );
};

export default function ProggressChart() {
  return (
    <div className="container">
      <PChart label="UKO" value={40} />
      <PChart label="DDB" value={40} />
      <PChart label="PO" value={40} />
    </div>
  );
}
