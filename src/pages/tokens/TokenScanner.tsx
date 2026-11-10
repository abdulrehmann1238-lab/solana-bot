import React, { useState, useMemo } from 'react';
import { useTrading } from '../../context/TradingContext';
import { MetricCard } from '../../components/common/MetricCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import {
  formatCurrency,
  formatCompactNumber,
  formatPercent,
  formatNumber,
} from '../../utils/formatters';
import { Token } from '../../types';
import { Compass, Filter, RotateCcw, TrendingUp, Layers } from 'lucide-react';

interface TokenScannerProps {
  onOpenSwap: (ticker?: string) => void;
}

export const TokenScanner: React.FC<TokenScannerProps> = ({ onOpenSwap }) => {
  const { tokens, setSelectedToken } = useTrading();

  const [search, setSearch] = useState('');
  const [minLiquidity, setMinLiquidity] = useState<number>(0);
  const [minVolume, setMinVolume] = useState<number>(0);
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof Token>('momentumScore');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const handleResetFilters = () => {
    setSearch('');
    setMinLiquidity(0);
    setMinVolume(0);
    setSelectedRisk('ALL');
    setSortField('momentumScore');
    setSortAsc(false);
  };

  const filteredTokens = useMemo(() => {
    return tokens
      .filter(t => {
        if (search) {
          const s = search.toLowerCase();
          const matchName = t.name.toLowerCase().includes(s) || t.ticker.toLowerCase().includes(s);
          const matchAddr = t.contractAddress.toLowerCase().includes(s);
          if (!matchName && !matchAddr) return false;
        }
        if (t.liquidity < minLiquidity) return false;
        if (t.volume24h < minVolume) return false;
        if (selectedRisk !== 'ALL' && t.riskLevel !== selectedRisk) return false;
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
  }, [tokens, search, minLiquidity, minVolume, selectedRisk, sortField, sortAsc]);

  const handleSort = (field: keyof Token) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 9.1 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Token Intelligence & Momentum
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Identify emerging Solana opportunities using volume, liquidity, buyer activity and momentum signals.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onOpenSwap('BONK')}
          icon={<Layers className="w-3.5 h-3.5" />}
        >
          Quick Swap
        </Button>
      </div>

      {/* 9.2 Scanner Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          title="Tokens Scanned"
          value="342"
          change="DEX Liquidity Pairs"
          isPositive={true}
          subtext="High-throughput feed"
        />
        <MetricCard
          title="Momentum Signals"
          value="18"
          change="Breakout Patterns"
          isPositive={true}
          subtext="Strong buyer dominance"
        />
        <MetricCard
          title="High Liquidity Tokens"
          value="84"
          change="> $5M Depth"
          isPositive={true}
          subtext="Safe for slippage"
        />
        <MetricCard
          title="Tokens Under Review"
          value="12"
          change="Anomaly Detected"
          isPositive={false}
          subtext="Flagged for checks"
        />
      </div>

      {/* 9.3 Scanner Filters */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 shadow-fintech space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-forest" />
            <h3 className="text-xs font-mono font-bold uppercase text-text-main">
              Momentum & Liquidity Radar Filters
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
              Search Ticker or Contract
            </label>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="e.g. BONK or WIF..."
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">
              Min Liquidity
            </label>
            <select
              value={minLiquidity}
              onChange={e => setMinLiquidity(Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs text-text-main focus:outline-none focus:border-brand-forest"
            >
              <option value="0">Any Liquidity</option>
              <option value="5000000">&gt; $5M Deep</option>
              <option value="20000000">&gt; $20M Institutional</option>
              <option value="50000000">&gt; $50M Tier 1</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">
              Min 24h Volume
            </label>
            <select
              value={minVolume}
              onChange={e => setMinVolume(Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs text-text-main focus:outline-none focus:border-brand-forest"
            >
              <option value="0">Any 24h Volume</option>
              <option value="10000000">&gt; $10M Volume</option>
              <option value="50000000">&gt; $50M Volume</option>
              <option value="100000000">&gt; $100M Volume</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">
              Risk Assessment Filter
            </label>
            <select
              value={selectedRisk}
              onChange={e => setSelectedRisk(e.target.value)}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs text-text-main focus:outline-none focus:border-brand-forest"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Elevated">Elevated Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* 9.4 Token Discovery Table */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold font-heading text-text-main">
            Solana Token Discovery Matrix
          </h3>
          <span className="text-xs font-mono text-text-muted">
            {filteredTokens.length} tokens matching criteria
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-[11px] font-mono text-text-muted">
                <th className="pb-3">Token</th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('price')}>
                  Price
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('marketCap')}>
                  Market Cap
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('change5m')}>
                  5m
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('change1h')}>
                  1h
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('change24h')}>
                  24h
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('volume24h')}>
                  Volume (24h)
                </th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('liquidity')}>
                  Liquidity
                </th>
                <th className="pb-3">Buyers/Sellers</th>
                <th className="pb-3 cursor-pointer" onClick={() => handleSort('momentumScore')}>
                  Momentum
                </th>
                <th className="pb-3">Signal</th>
                <th className="pb-3">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/70">
              {filteredTokens.map(token => (
                <tr
                  key={token.id}
                  onClick={() => setSelectedToken(token)}
                  className="hover:bg-bg-subtle/50 transition-colors cursor-pointer group"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-softGreen text-brand-forest flex items-center justify-center font-mono font-bold text-[10px]">
                        {token.ticker.slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-semibold text-text-main group-hover:text-brand-forest transition-colors block">
                          {token.ticker}
                        </span>
                        <span className="text-[10px] text-text-muted font-normal">{token.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 font-mono font-medium text-text-main">
                    {formatCurrency(token.price, token.price < 0.01 ? 6 : 4)}
                  </td>
                  <td className="py-3 font-mono text-text-secondary">
                    {formatCompactNumber(token.marketCap)}
                  </td>
                  <td
                    className={`py-3 font-mono ${
                      token.change5m >= 0 ? 'text-financial-positive' : 'text-financial-negative'
                    }`}
                  >
                    {formatPercent(token.change5m)}
                  </td>
                  <td
                    className={`py-3 font-mono ${
                      token.change1h >= 0 ? 'text-financial-positive' : 'text-financial-negative'
                    }`}
                  >
                    {formatPercent(token.change1h)}
                  </td>
                  <td
                    className={`py-3 font-mono font-bold ${
                      token.change24h >= 0 ? 'text-financial-positive' : 'text-financial-negative'
                    }`}
                  >
                    {formatPercent(token.change24h)}
                  </td>
                  <td className="py-3 font-mono text-text-secondary">
                    {formatCompactNumber(token.volume24h)}
                  </td>
                  <td className="py-3 font-mono text-text-secondary">
                    {formatCompactNumber(token.liquidity)}
                  </td>
                  <td className="py-3 font-mono text-xs">
                    <span className="text-financial-positive font-semibold">
                      {formatNumber(token.buyers24h)}
                    </span>
                    <span className="text-text-muted mx-1">/</span>
                    <span className="text-financial-negative">
                      {formatNumber(token.sellers24h)}
                    </span>
                  </td>
                  <td className="py-3 font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-bg-subtle rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-forest rounded-full"
                          style={{ width: `${token.momentumScore}%` }}
                        />
                      </div>
                      <span className="font-bold text-text-main">{token.momentumScore}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge variant="signal" value={token.signal} />
                  </td>
                  <td className="py-3">
                    <Badge variant="risk" value={token.riskLevel} />
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

