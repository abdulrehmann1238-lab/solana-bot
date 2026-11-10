import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { MetricCard } from '../../components/common/MetricCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  formatCurrency,
  formatPercent,
  formatNumber,
} from '../../utils/formatters';
import { PieChart, Sliders, ArrowUpRight, ShieldAlert } from 'lucide-react';

export const PortfolioPositions: React.FC = () => {
  const {
    portfolioBalance,
    availableBalance,
    realizedPnl,
    unrealizedPnl,
    positions,
    setSelectedPosition,
    closePosition,
  } = useTrading();

  const investedCapital = positions.reduce((acc, p) => acc + p.investedValueUsd, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Portfolio & Open Positions
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Real-time simulated position sizing, live unrealized gains, and dynamic exit controls.
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-brand-forest bg-brand-softGreen px-3 py-1 rounded-full border border-brand-sage/20 self-start sm:self-auto">
          {positions.length} ACTIVE POSITIONS
        </span>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Total Portfolio</span>
          <span className="text-lg font-bold font-heading text-text-main tabular-nums">
            {formatCurrency(portfolioBalance)}
          </span>
          <span className="text-[10px] font-mono text-financial-positive block mt-0.5">+16.5% Net</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Available Balance</span>
          <span className="text-lg font-bold font-heading text-text-main tabular-nums">
            {formatCurrency(availableBalance)}
          </span>
          <span className="text-[10px] font-mono text-text-muted block mt-0.5">Liquid capital</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Invested Capital</span>
          <span className="text-lg font-bold font-heading text-text-main tabular-nums">
            {formatCurrency(investedCapital)}
          </span>
          <span className="text-[10px] font-mono text-text-secondary block mt-0.5">In 8 positions</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Realized P&L</span>
          <span className="text-lg font-bold font-heading text-financial-positive tabular-nums">
            +{formatCurrency(realizedPnl)}
          </span>
          <span className="text-[10px] font-mono text-financial-positive block mt-0.5">+18.2%</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Unrealized P&L</span>
          <span
            className={`text-lg font-bold font-heading tabular-nums ${
              unrealizedPnl >= 0 ? 'text-financial-positive' : 'text-financial-negative'
            }`}
          >
            {unrealizedPnl >= 0 ? '+' : ''}
            {formatCurrency(unrealizedPnl)}
          </span>
          <span className="text-[10px] font-mono text-financial-positive block mt-0.5">+5.8% Float</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Avg Position Risk</span>
          <span className="text-lg font-bold font-heading text-brand-forest tabular-nums">
            2.4%
          </span>
          <span className="text-[10px] font-mono text-text-muted block mt-0.5">Per-trade max</span>
        </div>
      </div>

      {/* Positions Table */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold font-heading text-text-main">
            Open Portfolio Holdings
          </h3>
          <span className="text-xs font-mono text-text-muted">
            All prices and P&L updated in memory
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-[11px] font-mono text-text-muted">
                <th className="pb-3">Asset</th>
                <th className="pb-3">Entry Price</th>
                <th className="pb-3">Current Price</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Position Value</th>
                <th className="pb-3">Unrealized P&L</th>
                <th className="pb-3">Stop-Loss</th>
                <th className="pb-3">Take-Profit</th>
                <th className="pb-3">Hold Time</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/70">
              {positions.map(pos => {
                const isPosProfit = pos.unrealizedPnl >= 0;
                return (
                  <tr
                    key={pos.id}
                    onClick={() => setSelectedPosition(pos)}
                    className="hover:bg-bg-subtle/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3">
                      <div>
                        <span className="font-semibold text-text-main group-hover:text-brand-forest transition-colors block font-heading">
                          {pos.tokenTicker}
                        </span>
                        <span className="text-[10px] text-text-muted">{pos.strategyName}</span>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-text-secondary">
                      {formatCurrency(pos.entryPrice, pos.entryPrice < 0.01 ? 6 : 4)}
                    </td>
                    <td className="py-3 font-mono text-text-main font-semibold">
                      {formatCurrency(pos.currentPrice, pos.currentPrice < 0.01 ? 6 : 4)}
                    </td>
                    <td className="py-3 font-mono text-text-secondary">
                      {formatNumber(pos.quantity, pos.entryPrice < 0.01 ? 0 : 2)}
                    </td>
                    <td className="py-3 font-mono text-text-main font-medium">
                      {formatCurrency(pos.currentValueUsd)}
                    </td>
                    <td className="py-3 font-mono">
                      <span
                        className={`font-bold ${
                          isPosProfit ? 'text-financial-positive' : 'text-financial-negative'
                        }`}
                      >
                        {isPosProfit ? '+' : ''}
                        {formatCurrency(pos.unrealizedPnl)} ({formatPercent(pos.unrealizedPnlPct)})
                      </span>
                    </td>
                    <td className="py-3 font-mono text-text-muted">
                      {formatCurrency(pos.stopLossPrice, pos.stopLossPrice < 0.01 ? 6 : 4)}
                    </td>
                    <td className="py-3 font-mono text-text-muted">
                      {formatCurrency(pos.takeProfitPrice, pos.takeProfitPrice < 0.01 ? 6 : 4)}
                    </td>
                    <td className="py-3 font-mono text-text-secondary">
                      {pos.holdingDuration}
                    </td>
                    <td className="py-3 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedPosition(pos)}
                          className="text-xs"
                        >
                          Manage
                        </Button>
                        <Button
                          variant="danger-outline"
                          size="sm"
                          onClick={() => closePosition(pos.id)}
                          className="text-xs"
                        >
                          Exit
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

