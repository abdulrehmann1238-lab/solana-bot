import React, { useState } from 'react';
import { Drawer } from '../common/Drawer';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Wallet } from '../../types';
import { useTrading } from '../../context/TradingContext';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { Copy, Star, Check, ExternalLink, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface WalletDetailDrawerProps {
  wallet: Wallet | null;
  onClose: () => void;
}

export const WalletDetailDrawer: React.FC<WalletDetailDrawerProps> = ({ wallet, onClose }) => {
  const { toggleWatchlist, toggleCopyTrading, addToast } = useTrading();
  const [copied, setCopied] = useState(false);

  if (!wallet) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(wallet.fullAddress);
    setCopied(true);
    addToast({
      title: 'Address Copied',
      message: `${wallet.fullAddress} copied to clipboard`,
      type: 'info',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Drawer
      isOpen={!!wallet}
      onClose={onClose}
      title={wallet.label || wallet.address}
      subtitle={`Rank #${wallet.rank} • Smart Money Intelligence Profile`}
      width="lg"
    >
      <div className="space-y-6 text-xs">
        {/* Address and Actions Bar */}
        <div className="p-4 rounded-fintech bg-bg-subtle/80 border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-text-muted uppercase block">
              Full Demonstration Address
            </span>
            <span className="font-mono text-xs font-semibold text-text-main break-all">
              {wallet.fullAddress}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyAddress}
              icon={copied ? <Check className="w-3.5 h-3.5 text-financial-positive" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button
              variant={wallet.isWatchlisted ? 'soft' : 'secondary'}
              size="sm"
              onClick={() => toggleWatchlist(wallet.id)}
              icon={<Star className={`w-3.5 h-3.5 ${wallet.isWatchlisted ? 'fill-brand-forest' : ''}`} />}
            >
              {wallet.isWatchlisted ? 'Watchlisted' : 'Watchlist'}
            </Button>
            <Button
              variant={wallet.isCopied ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => toggleCopyTrading(wallet.id)}
            >
              {wallet.isCopied ? 'Copying' : 'Copy Trade'}
            </Button>
          </div>
        </div>

        {/* Quality Score Breakdown (Section 8.6) */}
        <div className="p-5 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold font-heading text-text-main">
                Wallet Quality Score
              </h4>
              <p className="text-[11px] text-text-secondary">
                Multivariate scoring algorithm based on on-chain consistency & alpha
              </p>
            </div>
            <div className="flex items-baseline gap-1 bg-brand-softGreen px-3 py-1.5 rounded-fintech border border-brand-sage/20">
              <span className="text-2xl font-bold font-heading text-brand-forest tabular-nums">
                {wallet.qualityScore.overall}
              </span>
              <span className="text-xs font-mono text-brand-forest">/100</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-border-subtle">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-text-secondary">Profitability (25% weight)</span>
                <span className="font-mono font-semibold">{wallet.qualityScore.profitability} / 25</span>
              </div>
              <div className="w-full h-1.5 bg-bg-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-forest rounded-full"
                  style={{ width: `${(wallet.qualityScore.profitability / 25) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-text-secondary">Consistency (25% weight)</span>
                <span className="font-mono font-semibold">{wallet.qualityScore.consistency} / 25</span>
              </div>
              <div className="w-full h-1.5 bg-bg-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-forest rounded-full"
                  style={{ width: `${(wallet.qualityScore.consistency / 25) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-text-secondary">Risk-Adjusted Alpha (20% weight)</span>
                <span className="font-mono font-semibold">{wallet.qualityScore.riskAdjusted} / 20</span>
              </div>
              <div className="w-full h-1.5 bg-bg-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-forest rounded-full"
                  style={{ width: `${(wallet.qualityScore.riskAdjusted / 20) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-text-secondary">Trading History Depth (15% weight)</span>
                <span className="font-mono font-semibold">{wallet.qualityScore.tradingHistory} / 15</span>
              </div>
              <div className="w-full h-1.5 bg-bg-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-forest rounded-full"
                  style={{ width: `${(wallet.qualityScore.tradingHistory / 15) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-text-secondary">Liquidity Awareness (15% weight)</span>
                <span className="font-mono font-semibold">{wallet.qualityScore.liquidityAwareness} / 15</span>
              </div>
              <div className="w-full h-1.5 bg-bg-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-forest rounded-full"
                  style={{ width: `${(wallet.qualityScore.liquidityAwareness / 15) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 6-Month Cumulative Realized P&L Chart */}
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="text-xs font-bold font-heading text-text-main uppercase tracking-wider">
                Historical Realized P&L
              </h4>
              <span className="text-[11px] font-mono text-financial-positive font-semibold">
                +{formatCurrency(wallet.realizedPnl)} (Simulated)
              </span>
            </div>
            <Badge variant="risk" value={wallet.riskScore} />
          </div>

          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wallet.pnlHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="walletPnlFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#388568" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#388568" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9AA39D', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9AA39D', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  tickFormatter={val => `$${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="bg-bg-surface border border-border-subtle p-2 rounded shadow text-xs">
                          <span className="text-text-muted font-mono">{item.date}</span>
                          <div className="text-financial-positive font-mono font-bold mt-0.5">
                            +{formatCurrency(item.pnl)}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="pnl"
                  stroke="#388568"
                  strokeWidth={2}
                  fill="url(#walletPnlFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-fintech bg-bg-surface border border-border-subtle">
            <span className="text-[10px] text-text-muted font-mono uppercase block">Win Rate</span>
            <span className="text-base font-bold font-heading text-financial-positive">
              {wallet.winRate}%
            </span>
          </div>
          <div className="p-3 rounded-fintech bg-bg-surface border border-border-subtle">
            <span className="text-[10px] text-text-muted font-mono uppercase block">Profit Factor</span>
            <span className="text-base font-bold font-heading text-text-main">
              {wallet.profitFactor}
            </span>
          </div>
          <div className="p-3 rounded-fintech bg-bg-surface border border-border-subtle">
            <span className="text-[10px] text-text-muted font-mono uppercase block">Max Drawdown</span>
            <span className="text-base font-bold font-heading text-financial-negative">
              -{wallet.maxDrawdown}%
            </span>
          </div>
          <div className="p-3 rounded-fintech bg-bg-surface border border-border-subtle">
            <span className="text-[10px] text-text-muted font-mono uppercase block">Avg Hold Time</span>
            <span className="text-base font-bold font-heading text-text-main font-mono">
              {wallet.avgHoldDuration}
            </span>
          </div>
        </div>

        {/* Preferred Tokens & Frequency */}
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle">
          <h4 className="text-xs font-bold font-heading text-text-main uppercase mb-2">
            Behavioral Profile
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] text-text-secondary block mb-1">Preferred Tokens:</span>
              <div className="flex flex-wrap gap-1.5">
                {wallet.preferredTokens.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-bg-subtle text-text-main font-mono text-[11px] border border-border-subtle font-medium"
                  >
                    ${t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[11px] text-text-secondary block mb-1">Trading Frequency:</span>
              <span className="text-xs font-mono font-medium text-text-main">
                {wallet.tradingFrequency}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Simulated Activity */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold font-heading text-text-main uppercase">
              Recent On-Chain Activity (Simulated)
            </h4>
            <span className="text-[10px] font-mono text-text-muted">
              {wallet.recentTransactions.length} events
            </span>
          </div>

          <div className="space-y-1.5">
            {wallet.recentTransactions.map(tx => (
              <div
                key={tx.id}
                className="p-3 rounded-fintech bg-bg-surface border border-border-subtle flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`font-mono px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      tx.side === 'BUY'
                        ? 'bg-emerald-50 text-financial-positive'
                        : 'bg-rose-50 text-financial-negative'
                    }`}
                  >
                    {tx.side}
                  </span>
                  <div>
                    <span className="font-semibold text-text-main">{tx.tokenTicker}</span>
                    <span className="text-[11px] text-text-muted ml-2 font-mono">{tx.relativeTime}</span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="font-medium text-text-main">{formatCurrency(tx.tradeValueUsd)}</div>
                  {tx.realizedPnl && (
                    <span className="text-[10px] text-financial-positive">
                      +{formatCurrency(tx.realizedPnl)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

