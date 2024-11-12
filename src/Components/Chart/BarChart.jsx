import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", user: 80, driver: 65 },
  { name: "Feb", user: 70, driver: 50 },
  { name: "Mar", user: 50, driver: 30 },
  { name: "Apr", user: 60, driver: 40 },
  { name: "May", user: 30, driver: 25 },
  { name: "Jun", user: 20, driver: 15 },
  { name: "Jul", user: 45, driver: 35 },
  { name: "Aug", user: 36, driver: 28 },
  { name: "Sep", user: 53, driver: 45 },
  { name: "Oct", user: 69, driver: 55 },
  { name: "Nov", user: 78, driver: 60 },
  { name: "Dec", user: 36, driver: 30 },
];

const Bar_Chart = () => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}K`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={30} // Adjust the gap between bars if necessary
        >
          <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            axisLine={{
              stroke: "#F5382C", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
            tickMargin={16}
          />
          {/* Add several horizontal black lines using ReferenceLine */}
          <ReferenceLine y={20} stroke="#22222255" strokeWidth={0.5} />
          <ReferenceLine y={40} stroke="#22222255" strokeWidth={0.5} />
          <ReferenceLine y={60} stroke="#22222255" strokeWidth={0.5} />
          <ReferenceLine y={80} stroke="#22222255" strokeWidth={0.5} />
          <ReferenceLine y={100} stroke="#22222255" strokeWidth={0.5} />
          <Bar
            dataKey="user"
            fill="#989898" // Color for user bar
            barSize={14} // Width of each bar for user
            radius={[10, 10, 0, 0]} // Rounded top corners
          />
          <Bar
            dataKey="driver"
            fill="#2B4257" // Color for driver bar
            barSize={14} // Width of each bar for driver
            radius={[10, 10, 0, 0]} // Rounded top corners
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;
