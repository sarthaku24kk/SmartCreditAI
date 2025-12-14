import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  score: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ score }) => {
  // Determine color based on score
  let color = '#ef4444'; // Red (Low)
  if (score > 50) color = '#f59e0b'; // Amber (Medium)
  if (score > 75) color = '#22c55e'; // Green (High)

  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  return (
    <div className="relative h-48 w-full flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell key="score" fill={color} cornerRadius={6} />
            <Cell key="bg" fill="#e2e8f0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-4 left-0 right-0 text-center flex flex-col items-center">
        <span className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Eligibility Score</span>
        <span className="text-5xl font-bold text-gray-800">{score}%</span>
      </div>
    </div>
  );
};

export default GaugeChart;