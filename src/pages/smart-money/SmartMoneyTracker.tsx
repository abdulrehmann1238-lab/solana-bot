import React, { useState, useMemo } from 'react';
import { useTrading } from '../../context/TradingContext';
import { MetricCard } from '../../components/common/MetricCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { Wallet, RiskLevel } from '../../types';
import {
  Users,
  Award,
  Filter,
  RotateCcw,
  Plus,
  Star,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SmartMoneyTrackerProps {
  onOpenAddWallet: () => void;
}

export const SmartMoneyTracker: React.FC<SmartMoneyTrackerProps> = ({ onOpenAddWallet }) => {
  const { wallets, setSelectedWallet, toggleWatchlist, toggleCopyTrading } = useTrading();

  // Search & Filters state
  const [search, setSearch] = useState('');
  const [minPnl, setMinPnl] = useState<number>(0);
  const [minWinRate, setMinWinRate] = useState<number>(50);
  const [minTrades, setMinTrades] = useState<number>(0);
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof Wallet>('realizedPnl');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const handleResetFilters = () => {
    setSearch('');
    setMinPnl(0);
    setMinWinRate(50);
    setMinTrades(0);
    setSelectedRisk('ALL');
    setSortField('realizedPnl');
    setSortAsc(false);
  };

  const filteredWallets = useMemo(() => {
    return wallets
      .filter(w => {
        if (search) {
          const s = search.toLowerCase();
          const matchAddr = w.address.toLowerCase().includes(s) || w.fullAddress.toLowerCase().includes(s);
          const matchLabel = w.label?.toLowerCase().includes(s);
          if (!matchAddr && !matchLabel) return false;
        }
        if (w.realizedPnl < minPnl) return false;
        if (w.winRate < minWinRate) return false;
        if (w.totalTrades < minTrades) return false;
        if (selectedRisk !== 'ALL' && w.riskScore !== selectedRisk) return false;
        return true;
      })
      .sort((a, b) => {
        const valA = a[sortField] as any;
        const valB = b[sortField] as any;
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return 0;
      });
  }, [wallets, search, minPnl, minWinRate, minTrades, selectedRisk, sortField, sortAsc]);

  const handleSort = (field: keyof Wallet) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 8.1 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Smart Money Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Discover, rank and monitor Solana wallets using historical trading performance and behavioral indicators.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onOpenAddWallet}
          icon={<Plus className="w-4 h-4" />}
        >
          Track New Wallet
        </Button>
      </div>

      {/* Top Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          title="Total Wallets Analyzed"
          value="1,284"
          change="Solana On-Chain Index"
          isPositive={true}
          subtext="Continuously indexed"
        />
        <MetricCard
          title="Qualified Wallets"
          value="312"
          change="24.3% Qualification"
          isPositive={true}
          subtext="Passed alpha criteria"
        />
        <MetricCard
          title="Wallets Monitored"
          value={wallets.length}
          change="Active Watchlist"
          isPositive={true}
          subtext="Simulated pipelines"
        />
        <MetricCard
          title="Avg Demonstration Win Rate"
          value="71.8%"
          change="+4.2% Benchmark"
          isPositive={true}
          subtext="Across qualified pool"
        />
      </div>

      {/* 8.2 Wallet Discovery Filters Panel */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 shadow-fintech space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-forest" />
            <h3 className="text-xs font-mono font-bold uppercase text-text-main">
              Discovery & Ranking Filters
            </h3>
          </div>
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-main transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">
              Search Address or Label
            </label>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="e.g. 7xKp or Alpha..."
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">
              Min Win Rate ({minWinRate}%)
            </label>
            <input
              type="range"
              min="40"
              max="90"
              step="5"
              value={minWinRate}
              onChange={e => setMinWinRate(Number(e.target.value))}
              className="w-full accent-brand-forest"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">
              Min Realized P&L ($)
            </label>
            <select
              value={minPnl}
              onChange={e => setMinPnl(Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs text-text-main focus:outline-none focus:border-brand-forest"
            >
              <option value="0">Any Realized P&L</option>
              <option value="15000">&gt; $15,000</option>
              <option value="25000">&gt; $25,000</option>
              <option value="40000">&gt; $40,000</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">
              Risk Classification
            </label>
            <select
              value={selectedRisk}
              onChange={e => setSelectedRisk(e.target.value)}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs text-text-main focus:outline-none focus:border-brand-forest"
            >
              <option value="ALL">All Risk Scores</option>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* 8.3 Wallet Ranking Table */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold font-heading text-text-main">
            Ranked Smart Money Wallets
          </h3>
          <span className="text-xs font-mono text-text-muted">
            Showing {filteredWallets.length} qualified wallets
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-[11px] font-mono text-text-muted">
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('rank')}>
                  Rank
                </th>
                <th className="pb-3">Wallet</th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('realizedPnl')}>
                  Realized P&L
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('winRate')}>
                  Win Rate
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('totalTrades')}>
                  Trades
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('profitFactor')}>
                  Profit Factor
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('avgRoi')}>
                  Avg ROI
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('maxDrawdown')}>
                  Max Drawdown
                </th>
                <th className="pb-3">Risk Score</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/70">
              {filteredWallets.map(wallet => (
                <tr
                  key={wallet.id}
                  className="hover:bg-bg-subtle/50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedWallet(wallet)}
                >
                  <td className="py-3 font-mono font-bold text-text-muted">
                    #{wallet.rank}
                  </td>
                  <td className="py-3">
                    <div>
                      <span className="font-mono font-semibold text-text-main group-hover:text-brand-forest transition-colors block">
                        {wallet.address}
                      </span>
                      {wallet.label && (
                        <span className="text-[10px] text-text-secondary font-sans">
                          {wallet.label}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 font-mono font-bold text-financial-positive">
                    +{formatCurrency(wallet.realizedPnl)}
                  </td>
                  <td className="py-3 font-mono text-text-main">
                    <span className="font-semibold text-financial-positive">{wallet.winRate}%</span>
                  </td>
                  <td className="py-3 font-mono text-text-secondary">
                    {wallet.totalTrades}
                  </td>
                  <td className="py-3 font-mono text-text-main font-semibold">
                    {wallet.profitFactor}
                  </td>
                  <td className="py-3 font-mono text-text-main">
                    +{wallet.avgRoi}%
                  </td>
                  <td className="py-3 font-mono text-financial-negative">
                    -{wallet.maxDrawdown}%
                  </td>
                  <td className="py-3">
                    <Badge variant="risk" value={wallet.riskScore} />
                  </td>
                  <td className="py-3">
                    <Badge variant="status" value={wallet.status} />
                  </td>
                  <td className="py-3 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => toggleWatchlist(wallet.id)}
                        title="Toggle Watchlist"
                        className="p-1.5 text-text-muted hover:text-brand-forest rounded hover:bg-bg-subtle transition-colors"
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            wallet.isWatchlisted ? 'fill-brand-forest text-brand-forest' : ''
                          }`}
                        />
                      </button>
                      <Button
                        variant={wallet.isCopied ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => toggleCopyTrading(wallet.id)}
                        className="text-xs"
                      >
                        {wallet.isCopied ? 'Copying' : 'Copy'}
                      </Button>
                    </div>
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

