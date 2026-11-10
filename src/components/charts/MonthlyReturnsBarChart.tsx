import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';

interface MonthlyItem {
  month: string;
  returnPct: number;
}

interface MonthlyReturnsBarChartProps {
  data: MonthlyItem[];
  height?: number;
}

export const MonthlyReturnsBarChart: React.FC<MonthlyReturnsBarChartProps> = ({
  data,
  height = 200,
}) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7EBE6" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9AA39D', fontSize: 10, fontFamily: 'JetBrains Mono' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9AA39D', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            tickFormatter={val => `${val}%`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as MonthlyItem;
                return (
                  <div className="bg-bg-surface border border-border-subtle p-2.5 rounded-fintech shadow-fintech text-xs">
                    <span className="font-mono text-text-muted">{item.month}</span>
                    <div
                      className={`font-semibold font-mono text-sm mt-0.5 ${
                        item.returnPct >= 0 ? 'text-financial-positive' : 'text-financial-negative'
                      }`}
                    >
                      {item.returnPct >= 0 ? '+' : ''}
                      {item.returnPct}%
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="returnPct" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.returnPct >= 0 ? '#388568' : '#C46C68'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

