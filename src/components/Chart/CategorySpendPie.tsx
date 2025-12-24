import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const CategorySpendPie = () => {
  const data = [
    { category: "Food", value: 1200 },
    { category: "Rent", value: 8000 },
    { category: "Shopping", value: 2500 },
    { category: "Travel", value: 1800 },
    { category: "Others", value: 600 }
  ];

  const COLORS = ["#6366F1", "#F43F5E", "#22C55E", "#EAB308", "#38BDF8"];
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60}   // makes it donut
            paddingAngle={3}
            stroke="#111827"
            strokeWidth={2}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => `₹${value}`}
            contentStyle={{
              background: "#7494daff",
              border: "1px solid #374151",
              color: "#fff"
            }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategorySpendPie;