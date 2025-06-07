
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AssetAllocation = () => {
  const data = [
    { name: 'Stocks', value: 60, color: '#3b82f6' },
    { name: 'Bonds', value: 25, color: '#10b981' },
    { name: 'Real Estate', value: 10, color: '#f59e0b' },
    { name: 'Cash', value: 5, color: '#6b7280' },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, value }) => `${name} ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssetAllocation;
