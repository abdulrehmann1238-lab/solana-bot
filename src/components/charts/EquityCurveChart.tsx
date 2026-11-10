import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

interface EquityPoint {
  date: string;
  balance: number;
  drawdown: number;
}

interface EquityCurveChartProps {
  data: EquityPoint[];
  height?: number;
}

export const EquityCurveChart: React.FC<EquityCurveChartProps> = ({ data, height = 300 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#315E4B" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#315E4B" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="drawdownFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C46C68" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#C46C68" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7EBE6" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9AA39D', fontSize: 11, fontFamily: 'JetBrains Mono' }}
          />
          <YAxis
            yAxisId="equity"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9AA39D', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            tickFormatter={val => `$${(val / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="drawdown"
            orientation="right"
            reversed
            domain={[0, 20]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#C46C68', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            tickFormatter={val => `-${val}%`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as EquityPoint;
                return (
                  <div className="bg-bg-surface border border-border-subtle p-3 rounded-fintech shadow-fintech-hover text-xs">
                    <div className="text-text-muted font-mono mb-1">{item.date}</div>
                    <div className="font-semibold text-text-main font-heading text-sm">
                      Equity: {formatCurrency(item.balance)}
                    </div>
                    <div className="text-financial-negative font-mono mt-0.5">
                      Drawdown: -{item.drawdown}%
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            yAxisId="equity"
            type="monotone"
            dataKey="balance"
            stroke="#315E4B"
            strokeWidth={2}
            fill="url(#equityFill)"
          />
          <Line
            yAxisId="drawdown"
            type="monotone"
            dataKey="drawdown"
            stroke="#C46C68"
            strokeWidth={1.5}
            strokeDasharray="2 2"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

