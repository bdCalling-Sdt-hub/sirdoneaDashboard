/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetAllEarningAmountByYearQuery } from "../../Redux/api/dashboardApi";

// const data = [
//   { month: "Jan", income: 475 },
//   { month: "Feb", income: 580 },
//   { month: "Mar", income: 300 },
//   { month: "Apr", income: 525 },
//   { month: "May", income: 375 },
//   { month: "Jun", income: 450 },
//   { month: "Jul", income: 575 },
//   { month: "Aug", income: 360 },
//   { month: "Sep", income: 200 },
//   { month: "Oct", income: 400 },
//   { month: "Nov", income: 300 },
//   { month: "Dec", income: 600 },
// ];

const Area_Chart = ({year}) => {
  // console.log("dasfafaf",{year});
  
  // Formatter function to add 'K' suffix to Y-axis values
  const {data:alldata, isLoading} = useGetAllEarningAmountByYearQuery(year);
  // console.log({data?.data});
  // console.log('data.data', alldata?.data);
  
  
  const yAxisTickFormatter = (value) => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <AreaChart
          data={alldata?.data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <XAxis dataKey="month" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            tickMargin={16}
          />
          <defs>
            <linearGradient id="colorName" x1="0" y1="0" x2="0" y2="1">
              <stop offset="60%" stopColor="#B4E4A3" stopOpacity={1} />
              <stop offset="100%" stopColor="#E8FFE300" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Tooltip
            formatter={(value, month, props) => [`${value}K`, "income"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke=""
            fill="url(#colorName)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Area_Chart;
