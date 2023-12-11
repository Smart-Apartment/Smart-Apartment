import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          padding: "10px",
          backgroundColor: "white",
          fontSize: "15px",
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
  const [budget, setBudget] = useState({});
  async function getBudgetData() {
    await axios(
      `https://smartapartmentserver.onrender.com/admin/getBudgetData/${new Date().getFullYear()}`
    ).then((res) => {
      res = res.data[0][0];
      let d = [
        { key: "Budget", value: res["totalCostPerSquareFeet"] * res["sqft"] },
        {
          key: "Expense",
          value:
            res["psqftQuaterly"] * res["sqft"] +
            res["psqftHalf"] * res["sqft"] +
            res["psqftYearly"] * res["sqft"] +
            res["otherExpenses"],
        },
      ];
      setBudget(d);
    });
  }

  useEffect(() => {
    getBudgetData();
  }, []);

  return (
    <ResponsiveContainer height="75%" width="80%">
      <BarChart width={props.width} height={props.height} data={budget}>
        <XAxis dataKey="key" style={{ color: "black" }} />
        <YAxis dataKey="value" />
        <Tooltip
          cursor={{ fill: "#000" }}
          style={{ backgroundColor: "#000" }}
        />
        <Bar dataKey="value" fill="orange" background={{ fill: "#000" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function VisitorChart(props) {
  const [visitors, setVisitors] = useState(0);
  async function getData() {
    await axios
      .get("https://smartapartmentserver.onrender.com/admin/visitorsChart")
      .then((res) => {
        setVisitors(res.data[0]);
      });
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <LineChart width={props.width} height={230} data={visitors}>
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
