import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import axios from "axios";

function Chart(props) {
  const [budget, setBudget] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  function onPieEnter(_, index) {
    setActiveIndex(index);
  }

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#fff"
        >{`${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#fff"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  async function getBudget() {
    await axios
      .get(
        `http://localhost:8000/admin/getBudgetData/${new Date().getFullYear()}`
      )
      .then((res) => {
        let d = [
          {
            value:
              res["data"][0][0]["psqftQuaterly"] * res["data"][0][0]["sqft"],
            name: "Quaterly",
          },
          {
            value: res["data"][0][0]["psqftHalf"] * res["data"][0][0]["sqft"],
            name: "Half Yearly",
          },
          {
            value: res["data"][0][0]["psqftYearly"] * res["data"][0][0]["sqft"],
            name: "Yearly",
          },
          { value: res["data"][0][0]["otherExpenses"], name: "Maintenance" },
        ];
        setBudget(d);
      });
  }

  useEffect(() => {
    getBudget();
  }, []);

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <PieChart width={props.width} height={props.height}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={budget}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="orange"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Chart;
