import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

type TimeFilter = '1H' | '24H' | '7D' | '30D' | '90D';

const CHART_DATA_BY_TIMEFRAME: Record<TimeFilter, { time: string; balance: number; pnl: number }[]> = {
  '1H': [
    { time: '05:00', balance: 24780, pnl: 614 },
    { time: '05:10', balance: 24810, pnl: 644 },
    { time: '05:20', balance: 24795, pnl: 629 },
    { time: '05:30', balance: 24830, pnl: 664 },
    { time: '05:40', balance: 24825, pnl: 659 },
    { time: '05:50', balance: 24850, pnl: 684.2 },
  ],
  '24H': [
    { time: '06:00', balance: 24120, pnl: -46 },
    { time: '10:00', balance: 24350, pnl: 184 },
    { time: '14:00', balance: 24290, pnl: 124 },
    { time: '18:00', balance: 24540, pnl: 374 },
    { time: '22:00', balance: 24680, pnl: 514 },
    { time: '02:00', balance: 24720, pnl: 554 },
    { time: '06:00', balance: 24850, pnl: 684.2 },
  ],
  '7D': [
    { time: 'Nov 04', balance: 22800, pnl: -1366 },
    { time: 'Nov 05', balance: 23150, pnl: -1016 },
    { time: 'Nov 06', balance: 23600, pnl: -566 },
    { time: 'Nov 07', balance: 23940, pnl: -226 },
    { time: 'Nov 08', balance: 24200, pnl: 34 },
    { time: 'Nov 09', balance: 24610, pnl: 444 },
    { time: 'Nov 10', balance: 24850, pnl: 684.2 },
  ],
  '30D': [
    { time: 'Oct 12', balance: 20400, pnl: -3766 },
    { time: 'Oct 17', balance: 21150, pnl: -3016 },
    { time: 'Oct 22', balance: 21900, pnl: -2266 },
    { time: 'Oct 27', balance: 22650, pnl: -1516 },
    { time: 'Nov 01', balance: 23400, pnl: -766 },
    { time: 'Nov 06', balance: 24100, pnl: -66 },
    { time: 'Nov 10', balance: 24850, pnl: 684.2 },
  ],
  '90D': [
    { time: 'Aug 12', balance: 16500, pnl: -7666 },
    { time: 'Aug 27', balance: 17800, pnl: -6366 },
    { time: 'Sep 11', balance: 19100, pnl: -5066 },
    { time: 'Sep 26', balance: 20450, pnl: -3716 },
    { time: 'Oct 11', balance: 21900, pnl: -2266 },
    { time: 'Oct 26', balance: 23300, pnl: -866 },
    { time: 'Nov 10', balance: 24850, pnl: 684.2 },
  ],
};

export const PortfolioAreaChart: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('24H');
  const data = CHART_DATA_BY_TIMEFRAME[timeFilter];

  const minVal = Math.min(...data.map(d => d.balance));
  const maxVal = Math.max(...data.map(d => d.balance));
  const padding = (maxVal - minVal) * 0.15 || 50;

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold font-heading text-text-main">
              Portfolio Performance
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-bg-subtle text-text-muted">
              SIMULATED EQUITY
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Simulated portfolio balance and net unrealized curve over selected interval
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-1 p-1 bg-bg-subtle border border-border-subtle rounded-fintech-sm self-start sm:self-auto">
          {(['1H', '24H', '7D', '30D', '90D'] as TimeFilter[]).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeFilter(tf)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                timeFilter === tf
                  ? 'bg-bg-surface text-brand-forest shadow-fintech-sm font-semibold'
                  : 'text-text-secondary hover:text-text-main'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#315E4B" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#315E4B" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7EBE6" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9AA39D', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            />
            <YAxis
              domain={[minVal - padding, maxVal + padding]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9AA39D', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              tickFormatter={val => `$${(val / 1000).toFixed(1)}k`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-bg-surface border border-border-subtle p-3 rounded-fintech shadow-fintech-hover text-xs">
                      <div className="text-text-muted font-mono mb-1">{item.time}</div>
                      <div className="font-semibold text-text-main font-heading text-sm">
                        {formatCurrency(item.balance)}
                      </div>
                      <div className="text-financial-positive font-mono mt-0.5">
                        P&L: +${item.pnl.toFixed(2)}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#315E4B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#portfolioGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

