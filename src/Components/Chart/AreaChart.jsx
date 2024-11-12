/* eslint-disable no-unused-vars */
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", uv: 475 },
  { name: "Feb", uv: 580 },
  { name: "Mar", uv: 300 },
  { name: "Apr", uv: 525 },
  { name: "May", uv: 375 },
  { name: "Jun", uv: 450 },
  { name: "Jul", uv: 575 },
  { name: "Aug", uv: 360 },
  { name: "Sep", uv: 200 },
  { name: "Oct", uv: 400 },
  { name: "Nov", uv: 300 },
  { name: "Dec", uv: 600 },
];

const Area_Chart = () => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            tickMargin={16}
            axisLine={{
              stroke: "#F5382C", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="25.38%" stopColor="#FAA39EAA" stopOpacity={1} />
              <stop offset="100%" stopColor="#F5382CEE" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Tooltip
            formatter={(value, name, props) => [`${value}K`, "UV"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Area type="monotone" dataKey="uv" stroke="" fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Area_Chart;
