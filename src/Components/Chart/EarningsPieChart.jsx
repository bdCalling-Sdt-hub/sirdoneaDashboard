import { Cell, Pie, PieChart, Text } from "recharts";

export default function EarningsPieChart() {
  const data = [
    { name: "Done", value: 45 },
    { name: "Left", value: 30 },
  ];

  const COLORS = {
    Done: "#1B7443",
    Left: "#60CF92",
  };

  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
    // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const RADIAN = Math.PI / 180;
    const x = cx + outerRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + outerRadius * Math.sin(-midAngle * RADIAN);
    const arrowLength = 16; // Increased arrow length
    const endX =
      cx + (outerRadius + arrowLength) * Math.cos(-midAngle * RADIAN);
    const endY =
      cy + (outerRadius + arrowLength) * Math.sin(-midAngle * RADIAN);
    const textPadding = 10; // Padding between arrow and text
    const textX = endX + textPadding * Math.cos(-midAngle * RADIAN);
    const textY = endY + textPadding * Math.sin(-midAngle * RADIAN);
    return (
      <>
        <path
          d={`M${x},${y}L${endX},${endY}`}
          stroke="white"
          strokeWidth={2}
          fill="#222222"
        />
        <polygon
          points={`${endX},${endY} ${endX - 5},${endY - 5} ${endX + 5},${
            endY - 5
          }`}
          fill="#222222"
        />
        <Text
          x={textX}
          y={textY}
          fill="#222222"
          textAnchor={textX > cx ? "start" : "end"}
          style={{ fontWeight: "bold", fontSize: 14 }}
        >
          {`${value}%`}
        </Text>
      </>
    );
  };

  return (
    <div className="mt-1">
      <PieChart width={250} height={200}>
        <Pie
          data={[{ name: "Center", value: 1 }]}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#60CF92"
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={100}
          labelLine={false}
          // label={renderCustomLabel}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
