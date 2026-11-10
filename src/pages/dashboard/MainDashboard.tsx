import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { MetricCard } from '../../components/common/MetricCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { PortfolioAreaChart } from '../../components/charts/PortfolioAreaChart';
import {
  formatCurrency,
  formatCompactNumber,
  formatPercent,
  formatNumber,
} from '../../utils/formatters';
import {
  RotateCcw,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface MainDashboardProps {
  onOpenSwap: (ticker?: string) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({ onOpenSwap }) => {
  const {
    portfolioBalance,
    availableBalance,
    realizedPnl,
    unrealizedPnl,
    activePositionsCount,
    positions,
    tokens,
    activityFeed,
    setSelectedWallet,
    setSelectedToken,
    setSelectedPosition,
    wallets,
    closePosition,
    addToast,
  } = useTrading();

  const handleRefresh = () => {
    addToast({
      title: 'Metrics Synchronized',
      message: 'Demonstration feed refreshed with latest simulated block state.',
      type: 'info',
    });
  };

  return (
    <div className="space-y-6">
      {/* 7.1 Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Trading Overview
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Monitor smart money activity, trading performance and market opportunities.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRefresh}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Refresh Data
          </Button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-fintech bg-bg-surface border border-border-subtle text-xs font-mono text-text-main shadow-fintech-sm">
            <span className="w-2 h-2 rounded-full bg-brand-forest animate-pulse" />
            <span>PAPER TRADING ACTIVE</span>
          </div>
        </div>
      </div>

      {/* 7.2 Portfolio Summary Cards (5 Premium Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Portfolio Balance"
          value={formatCurrency(portfolioBalance)}
          change="+12.4% (30D)"
          isPositive={true}
          subtext="Simulated equity"
          sparklineData={[22000, 22600, 23400, 24100, 24600, 24850]}
        />
        <MetricCard
          title="Total Realized P&L"
          value={`+${formatCurrency(realizedPnl)}`}
          change="+18.2%"
          isPositive={true}
          subtext="Closed paper trades"
          sparklineData={[1200, 1600, 2100, 2700, 3100, 3420]}
        />
        <MetricCard
          title="Unrealized P&L"
          value={`${unrealizedPnl >= 0 ? '+' : ''}${formatCurrency(unrealizedPnl)}`}
          change="+5.8%"
          isPositive={unrealizedPnl >= 0}
          subtext="8 Open positions"
          sparklineData={[320, 480, 420, 590, 640, 684.2]}
        />
        <MetricCard
          title="Active Positions"
          value={activePositionsCount}
          change="8 Open / 0 Pending"
          isPositive={true}
          subtext="Risk managed"
        />
        <MetricCard
          title="Available Balance"
          value={formatCurrency(availableBalance)}
          change="50.1% Capital Free"
          isPositive={true}
          subtext="Ready for execution"
        />
      </div>

      {/* 7.3 Portfolio Performance Chart */}
      <PortfolioAreaChart />

      {/* Two Column Grid: 7.4 Smart Money Activity & 7.5 Trending Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7.4 Smart Money Activity */}
        <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-forest" />
                <h3 className="text-sm font-bold font-heading text-text-main uppercase tracking-wider">
                  Smart Money Activity Feed
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-subtle text-text-muted">
                LIVE MOCK RADAR
              </span>
            </div>

            <div className="space-y-3">
              {activityFeed.map(item => (
                <div
                  key={item.id}
                  className="p-3 rounded-fintech bg-bg-subtle/50 hover:bg-bg-subtle border border-border-subtle/80 flex items-center justify-between text-xs transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.action === 'BOUGHT'
                          ? 'bg-emerald-50 text-financial-positive'
                          : item.action === 'SOLD'
                          ? 'bg-rose-50 text-financial-negative'
                          : 'bg-bg-softBlue text-brand-blueGray'
                      }`}
                    >
                      {item.action}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-semibold text-text-main">
                          {item.walletAddress}
                        </span>
                        {item.walletLabel && (
                          <span className="text-[10px] text-text-muted">({item.walletLabel})</span>
                        )}
                      </div>
                      <span className="text-text-secondary text-[11px]">
                        Target: <span className="font-semibold text-text-main">{item.tokenTicker}</span> ({item.tokenName})
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-semibold text-text-main">
                      {formatCurrency(item.tradeValueUsd)}
                    </div>
                    <span className="text-[10px] font-mono text-text-muted block">
                      {item.relativeTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
            <span className="text-text-muted text-[11px] font-mono">
              Events are simulated demonstration signals.
            </span>
            <button
              onClick={() => {
                const w = wallets[0];
                if (w) setSelectedWallet(w);
              }}
              className="text-brand-forest hover:underline font-medium"
            >
              Inspect Wallet #1 Alpha
            </button>
          </div>
        </div>

        {/* 7.5 Trending Opportunities Table */}
        <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-sage" />
                <h3 className="text-sm font-bold font-heading text-text-main uppercase tracking-wider">
                  Trending Opportunities
                </h3>
              </div>
              <span className="text-[10px] font-mono text-text-muted">6 MONITORED TOKENS</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-[11px] font-mono text-text-muted">
                    <th className="pb-2 font-medium">Token</th>
                    <th className="pb-2 font-medium">Price</th>
                    <th className="pb-2 font-medium">24h</th>
                    <th className="pb-2 font-medium">Volume</th>
                    <th className="pb-2 font-medium">Signal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/60">
                  {tokens.slice(0, 6).map(tok => (
                    <tr
                      key={tok.id}
                      onClick={() => setSelectedToken(tok)}
                      className="hover:bg-bg-subtle/60 cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 font-semibold text-text-main font-heading">
                        <div className="flex items-center gap-1.5">
                          <span>{tok.ticker}</span>
                          <span className="text-[10px] text-text-muted font-normal hidden sm:inline">
                            {tok.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 font-mono text-text-main">
                        {formatCurrency(tok.price, tok.price < 0.01 ? 6 : 2)}
                      </td>
                      <td
                        className={`py-2.5 font-mono font-medium ${
                          tok.change24h >= 0 ? 'text-financial-positive' : 'text-financial-negative'
                        }`}
                      >
                        {formatPercent(tok.change24h)}
                      </td>
                      <td className="py-2.5 font-mono text-text-secondary">
                        {formatCompactNumber(tok.volume24h)}
                      </td>
                      <td className="py-2.5">
                        <Badge variant="signal" value={tok.signal} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle text-right">
            <span className="text-xs text-text-muted">Click any row to open full token radar</span>
          </div>
        </div>
      </div>

      {/* 7.6 Active Positions Table */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold font-heading text-text-main">
              Simulated Active Positions
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Live paper positions with automated stop-loss & take-profit tracking
            </p>
          </div>
          <span className="text-xs font-mono text-brand-forest font-semibold">
            8 OPEN POSITIONS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-[11px] font-mono text-text-muted">
                <th className="pb-3 font-medium">Token</th>
                <th className="pb-3 font-medium">Entry Price</th>
                <th className="pb-3 font-medium">Current Price</th>
                <th className="pb-3 font-medium">Position Value</th>
                <th className="pb-3 font-medium">Unrealized P&L</th>
                <th className="pb-3 font-medium">Stop-Loss</th>
                <th className="pb-3 font-medium">Take-Profit</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/70">
              {positions.map(pos => {
                const isPosProfit = pos.unrealizedPnl >= 0;
                return (
                  <tr key={pos.id} className="hover:bg-bg-subtle/40 transition-colors">
                    <td className="py-3 font-semibold text-text-main">
                      <div className="flex items-center gap-1.5">
                        <span>{pos.tokenTicker}</span>
                        <span className="text-[10px] text-text-muted hidden sm:inline">
                          ({pos.strategyName})
                        </span>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-text-secondary">
                      {formatCurrency(pos.entryPrice, pos.entryPrice < 0.01 ? 6 : 4)}
                    </td>
                    <td className="py-3 font-mono text-text-main font-medium">
                      {formatCurrency(pos.currentPrice, pos.currentPrice < 0.01 ? 6 : 4)}
                    </td>
                    <td className="py-3 font-mono text-text-main">
                      {formatCurrency(pos.currentValueUsd)}
                    </td>
                    <td className="py-3 font-mono">
                      <span
                        className={`font-semibold ${
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
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPosition(pos)}
                          className="text-xs"
                        >
                          View
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

      {/* 7.7 System Health Panel */}
      <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-forest" />
            <span className="text-xs font-mono font-bold uppercase text-text-main">
              Platform System Status
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono text-text-secondary">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-financial-positive" />
              <span>Wallet Monitoring: Simulated</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-financial-positive" />
              <span>Signal Engine: Demo Ready</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-financial-positive" />
              <span>Execution Engine: Paper Mode</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-financial-positive" />
              <span>Risk Engine: Demo Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-blueGray" />
              <span>Data Provider: Mock Data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

