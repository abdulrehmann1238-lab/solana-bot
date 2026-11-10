import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { MetricCard } from '../../components/common/MetricCard';
import { EquityCurveChart } from '../../components/charts/EquityCurveChart';
import { MonthlyReturnsBarChart } from '../../components/charts/MonthlyReturnsBarChart';
import { DEFAULT_BACKTEST_RESULT } from '../../data/backtestData';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { TrendingUp, BarChart2, PieChart, ShieldCheck } from 'lucide-react';

export const PerformanceAnalytics: React.FC = () => {
  const { realizedPnl, unrealizedPnl } = useTrading();
  const [timeRange, setTimeRange] = useState<'30D' | '90D' | '180D'>('180D');

  const tokenProfitability = [
    { token: 'BONK', realized: 1420.50, winRate: 78.4, trades: 42, roi: 34.2 },
    { token: 'WIF', realized: 980.20, winRate: 72.0, trades: 28, roi: 28.5 },
    { token: 'SOLCAT', realized: 640.80, winRate: 81.5, trades: 18, roi: 46.2 },
    { token: 'JUP', realized: 480.00, winRate: 85.0, trades: 24, roi: 19.4 },
    { token: 'POPCAT', realized: 310.40, winRate: 64.2, trades: 14, roi: 22.8 },
    { token: 'MEW', realized: -411.10, winRate: 48.0, trades: 12, roi: -8.4 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Performance & Alpha Analytics
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Detailed statistical breakdown of simulated trading performance, risk-adjusted returns, and asset profitability.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-bg-surface border border-border-subtle rounded-fintech shadow-fintech-sm">
          {(['30D', '90D', '180D'] as const).map(tr => (
            <button
              key={tr}
              onClick={() => setTimeRange(tr)}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                timeRange === tr
                  ? 'bg-brand-softGreen text-brand-forest font-semibold'
                  : 'text-text-secondary hover:text-text-main'
              }`}
            >
              {tr}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Win Rate</span>
          <span className="text-xl font-bold font-heading text-financial-positive tabular-nums">
            74.6%
          </span>
          <span className="text-[10px] font-mono text-text-secondary block mt-0.5">212 Wins / 72 Losses</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Profit Factor</span>
          <span className="text-xl font-bold font-heading text-text-main tabular-nums">
            2.94
          </span>
          <span className="text-[10px] font-mono text-financial-positive block mt-0.5">High alpha efficiency</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Avg Win / Loss</span>
          <span className="text-xl font-bold font-heading text-text-main tabular-nums">
            +$184 / -$92
          </span>
          <span className="text-[10px] font-mono text-text-secondary block mt-0.5">2.0x Reward:Risk</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Sharpe Ratio</span>
          <span className="text-xl font-bold font-heading text-brand-forest tabular-nums">
            2.68
          </span>
          <span className="text-[10px] font-mono text-text-muted block mt-0.5">Annualized baseline</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Avg Hold Time</span>
          <span className="text-xl font-bold font-heading text-text-main tabular-nums font-mono">
            28h 40m
          </span>
          <span className="text-[10px] font-mono text-text-muted block mt-0.5">Swing horizon</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-text-main">
                Simulated Equity Curve (6-Month Range)
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Compounded growth with drawdown threshold monitoring
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-financial-positive">
              Net Gain: +$14,840.00
            </span>
          </div>

          <EquityCurveChart data={DEFAULT_BACKTEST_RESULT.equityCurve} height={250} />
        </div>

        <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-text-main">
                Monthly Breakdown
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Simulated return percentages
              </p>
            </div>
          </div>

          <MonthlyReturnsBarChart data={DEFAULT_BACKTEST_RESULT.monthlyReturns} height={250} />
        </div>
      </div>

      {/* Token-Level Profitability Table */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold font-heading text-text-main">
            Token-Level Profitability Attribution
          </h3>
          <span className="text-xs font-mono text-text-muted">
            Simulated P&L grouped by underlying Solana asset
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-[11px] font-mono text-text-muted">
                <th className="pb-3">Token</th>
                <th className="pb-3">Simulated Net P&L</th>
                <th className="pb-3">Win Rate</th>
                <th className="pb-3">Total Trades</th>
                <th className="pb-3 text-right">Avg ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/70">
              {tokenProfitability.map((item, idx) => (
                <tr key={idx} className="hover:bg-bg-subtle/40 transition-colors">
                  <td className="py-3 font-semibold text-text-main font-heading">
                    ${item.token}
                  </td>
                  <td
                    className={`py-3 font-mono font-bold ${
                      item.realized >= 0 ? 'text-financial-positive' : 'text-financial-negative'
                    }`}
                  >
                    {item.realized >= 0 ? '+' : ''}
                    {formatCurrency(item.realized)}
                  </td>
                  <td className="py-3 font-mono text-text-main">
                    {item.winRate}%
                  </td>
                  <td className="py-3 font-mono text-text-secondary">
                    {item.trades}
                  </td>
                  <td
                    className={`py-3 font-mono font-medium text-right ${
                      item.roi >= 0 ? 'text-financial-positive' : 'text-financial-negative'
                    }`}
                  >
                    {item.roi >= 0 ? '+' : ''}
                    {item.roi}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

