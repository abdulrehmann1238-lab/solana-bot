import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { MetricCard } from '../../components/common/MetricCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { LineChart, Users, Star, ArrowUpRight, TrendingUp } from 'lucide-react';

export const WalletAnalyticsPage: React.FC = () => {
  const { wallets, setSelectedWallet, toggleWatchlist } = useTrading();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Wallet Performance Analytics
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Behavioral analysis, quality score distributions, and alpha longevity across monitored Solana wallets.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          title="Top 1% Trader Alpha"
          value="+44.8% ROI"
          change="Average Return"
          isPositive={true}
          subtext="Leaderboard mean"
        />
        <MetricCard
          title="Median Hold Time"
          value="24h 15m"
          change="Swing Horizon"
          isPositive={true}
          subtext="Low churn profile"
        />
        <MetricCard
          title="Average Win Rate"
          value="71.8%"
          change="Consistent Edge"
          isPositive={true}
          subtext="Filtered for >100 trades"
        />
        <MetricCard
          title="Combined Alpha P&L"
          value="+$163,910"
          change="6-Month Tracked"
          isPositive={true}
          subtext="Across top 6 wallets"
        />
      </div>

      {/* Quality Score Leaderboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map(w => (
          <div
            key={w.id}
            onClick={() => setSelectedWallet(w)}
            className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 shadow-fintech hover:shadow-fintech-hover hover:border-brand-sage/40 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-text-muted">
                  Rank #{w.rank}
                </span>
                <div className="flex items-center gap-1.5">
                  <Badge variant="risk" value={w.riskScore} />
                  <div className="px-2 py-0.5 rounded bg-brand-softGreen text-brand-forest font-mono text-xs font-bold">
                    Score: {w.qualityScore.overall}/100
                  </div>
                </div>
              </div>

              <h3 className="text-base font-bold font-heading text-text-main group-hover:text-brand-forest transition-colors">
                {w.label || w.address}
              </h3>
              <span className="text-[11px] font-mono text-text-muted block mt-0.5">
                {w.address}
              </span>

              <div className="grid grid-cols-2 gap-3 py-3 my-4 border-y border-border-subtle text-xs">
                <div>
                  <span className="text-[10px] text-text-muted font-mono block">Realized P&L</span>
                  <span className="font-bold text-financial-positive font-mono">
                    +{formatCurrency(w.realizedPnl)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted font-mono block">Win Rate</span>
                  <span className="font-bold text-text-main font-mono">{w.winRate}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted font-mono block">Profit Factor</span>
                  <span className="font-bold text-text-main font-mono">{w.profitFactor}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted font-mono block">Drawdown</span>
                  <span className="font-bold text-financial-negative font-mono">-{w.maxDrawdown}%</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-text-secondary block mb-1">Preferred:</span>
                <div className="flex flex-wrap gap-1">
                  {w.preferredTokens.map(tok => (
                    <span
                      key={tok}
                      className="px-2 py-0.5 rounded bg-bg-subtle text-text-main font-mono text-[10px]"
                    >
                      ${tok}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-brand-forest font-medium">
              <span>View full analytics profile</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

