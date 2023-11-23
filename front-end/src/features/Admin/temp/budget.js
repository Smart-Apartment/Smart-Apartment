import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";

function monthlyBudget(count = 100) {
  let electricity = count * 1000;
  let water = 5000;
  let services = count * 2000;
  let wage = 50000;
  return [
    { key: "income", value: count * 5000 },
    { key: "budget", value: electricity + water + services + wage },
    { key: "Current", value: (electricity + water + services + wage) * 0.5 },
  ];
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          fontSize: "15px",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <p>{`Key: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index}>{`${entry.name}: ${entry.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
}

function Chart(props) {
  return (
    <BarChart width={props.width} height={270} data={monthlyBudget()}>
      <XAxis dataKey="key" color="#fff" />
      <YAxis dataKey="value" color="#fff" />
      <Tooltip cursor={{ fill: "transparent" }} />
      <Bar dataKey="value" fill="orange" background={{ fill: "#000" }} />
    </BarChart>
  );
}

function VisitorChart(props) {
  const data = [
    { day: "monday", checkIn: 123, checkOut: 140 },
    { day: "Tuesday", checkIn: 145, checkOut: 140 },
    { day: "Wednesday", checkIn: 120, checkOut: 120 },
    { day: "Thursday", checkIn: 70, checkOut: 76 },
    { day: "Friday", checkIn: 102, checkOut: 100 },
    { day: "Saturday", checkIn: 189, checkOut: 90 },
    { day: "Sunday", checkIn: 190, checkOut: 220 },
  ];
  return (
    <LineChart width={props.width} height={200} data={data}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line
        type="monotone"
        dataKey="checkIn"
        color="#fff"
        stroke="rgba(255,0,0,0.6)"
      />
      <Line
        type="monotone"
        dataKey="checkOut"
        color="#fff"
        stroke="rgba(255,255,255,0.6)"
      />
      <Bar dataKey="checkIn" fill="orange" background={{ fill: "#000" }} />
    </LineChart>
  );
}

export { VisitorChart };
export default Chart;
