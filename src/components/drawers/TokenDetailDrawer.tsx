import React, { useState } from 'react';
import { Drawer } from '../common/Drawer';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Token } from '../../types';
import { useTrading } from '../../context/TradingContext';
import { formatCurrency, formatCompactNumber, formatPercent } from '../../utils/formatters';
import { Copy, Check, ArrowUpRight, TrendingUp, ShieldAlert, Layers } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface TokenDetailDrawerProps {
  token: Token | null;
  onClose: () => void;
  onOpenSwap: (ticker: string) => void;
}

export const TokenDetailDrawer: React.FC<TokenDetailDrawerProps> = ({
  token,
  onClose,
  onOpenSwap,
}) => {
  const { addToast } = useTrading();
  const [copied, setCopied] = useState(false);

  if (!token) return null;

  const handleCopyContract = () => {
    navigator.clipboard.writeText(token.contractAddress);
    setCopied(true);
    addToast({
      title: 'Contract Copied',
      message: `${token.contractAddress} copied to clipboard`,
      type: 'info',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Drawer
      isOpen={!!token}
      onClose={onClose}
      title={`${token.name} ($${token.ticker})`}
      subtitle="Token Momentum & Liquidity Intelligence"
      width="lg"
    >
      <div className="space-y-6 text-xs">
        {/* Header & Quick Swap CTA */}
        <div className="p-4 rounded-fintech bg-bg-subtle/80 border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-text-muted uppercase block">
              Contract Address (Simulated)
            </span>
            <span className="font-mono text-xs font-semibold text-text-main break-all">
              {token.contractAddress}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyContract}
              icon={copied ? <Check className="w-3.5 h-3.5 text-financial-positive" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onOpenSwap(token.ticker);
              }}
              icon={<Layers className="w-3.5 h-3.5" />}
            >
              Simulate Swap
            </Button>
          </div>
        </div>

        {/* Price & Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
            <span className="text-[10px] text-text-muted font-mono uppercase block">Price</span>
            <span className="text-lg font-bold font-heading text-text-main tabular-nums">
              {formatCurrency(token.price, token.price < 0.01 ? 6 : 2)}
            </span>
            <span
              className={`block text-[11px] font-mono mt-0.5 ${
                token.change24h >= 0 ? 'text-financial-positive' : 'text-financial-negative'
              }`}
            >
              {formatPercent(token.change24h)} (24h)
            </span>
          </div>

          <div className="p-3.5 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
            <span className="text-[10px] text-text-muted font-mono uppercase block">Market Cap</span>
            <span className="text-lg font-bold font-heading text-text-main tabular-nums">
              {formatCompactNumber(token.marketCap)}
            </span>
            <span className="block text-[11px] text-text-muted font-mono mt-0.5">Fully Diluted</span>
          </div>

          <div className="p-3.5 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
            <span className="text-[10px] text-text-muted font-mono uppercase block">Liquidity</span>
            <span className="text-lg font-bold font-heading text-text-main tabular-nums">
              {formatCompactNumber(token.liquidity)}
            </span>
            <span className="block text-[11px] text-brand-forest font-mono mt-0.5">DEX Pools</span>
          </div>

          <div className="p-3.5 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
            <span className="text-[10px] text-text-muted font-mono uppercase block">24h Volume</span>
            <span className="text-lg font-bold font-heading text-text-main tabular-nums">
              {formatCompactNumber(token.volume24h)}
            </span>
            <span className="block text-[11px] text-text-secondary font-mono mt-0.5">
              Vol/Liq: {(token.volume24h / token.liquidity).toFixed(1)}x
            </span>
          </div>
        </div>

        {/* Price Action Chart */}
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="text-xs font-bold font-heading text-text-main uppercase tracking-wider">
                24h Price Action
              </h4>
              <span className="text-[11px] text-text-muted font-mono">Simulated Quote Stream</span>
            </div>
            <Badge variant="signal" value={token.signal} />
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={token.priceHistory} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="tokenPriceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#315E4B" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#315E4B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="timestamp"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9AA39D', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                />
                <YAxis
                  domain={['dataMin * 0.95', 'dataMax * 1.05']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9AA39D', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  tickFormatter={val => (token.price < 0.01 ? val.toFixed(5) : `$${val.toFixed(2)}`)}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="bg-bg-surface border border-border-subtle p-2 rounded shadow text-xs">
                          <span className="text-text-muted font-mono">{item.timestamp}</span>
                          <div className="text-text-main font-mono font-bold mt-0.5">
                            {formatCurrency(item.price, token.price < 0.01 ? 6 : 2)}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#315E4B"
                  strokeWidth={2}
                  fill="url(#tokenPriceFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Smart Money Exposure Panel */}
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold font-heading text-text-main uppercase tracking-wider">
              Smart Money Exposure
            </h4>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                token.smartMoneyExposure.recentTrend === 'Net Inflow'
                  ? 'bg-emerald-50 text-financial-positive'
                  : 'bg-rose-50 text-financial-negative'
              }`}
            >
              {token.smartMoneyExposure.recentTrend}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-text-secondary text-[11px] block">Tracked Wallets Holding:</span>
              <span className="text-base font-bold font-heading text-text-main tabular-nums">
                {token.smartMoneyExposure.walletsCount} Whales
              </span>
            </div>
            <div>
              <span className="text-text-secondary text-[11px] block">Total Tracked Position:</span>
              <span className="text-base font-bold font-heading text-brand-forest tabular-nums">
                {formatCompactNumber(token.smartMoneyExposure.totalTrackedValueUsd)}
              </span>
            </div>
          </div>
        </div>

        {/* Structured Risk Assessment Panel (Section 9.6) */}
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-financial-warning" />
              <h4 className="text-xs font-bold font-heading text-text-main uppercase tracking-wider">
                Risk Assessment Matrix
              </h4>
            </div>
            <Badge variant="risk" value={token.riskLevel} />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border-subtle">
            <div className="p-2.5 rounded bg-bg-subtle">
              <span className="text-[10px] text-text-muted uppercase block">Liquidity Depth</span>
              <span className="text-xs font-semibold text-text-main">
                {token.riskAssessment.liquidityDepth} Pool
              </span>
            </div>
            <div className="p-2.5 rounded bg-bg-subtle">
              <span className="text-[10px] text-text-muted uppercase block">Top 10 Concentration</span>
              <span className="text-xs font-semibold text-text-main font-mono">
                {token.riskAssessment.largeWalletConcentrationPct}%
              </span>
            </div>
            <div className="p-2.5 rounded bg-bg-subtle">
              <span className="text-[10px] text-text-muted uppercase block">Holder Dispersion</span>
              <span className="text-xs font-semibold text-text-main">
                {token.riskAssessment.holderConcentration}
              </span>
            </div>
            <div className="p-2.5 rounded bg-bg-subtle">
              <span className="text-[10px] text-text-muted uppercase block">Volatility Profile</span>
              <span className="text-xs font-semibold text-text-main">
                {token.riskAssessment.priceVolatility}
              </span>
            </div>
          </div>

          {token.riskAssessment.suspiciousFlags.length > 0 && (
            <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-financial-negative text-[11px]">
              <span className="font-bold block mb-0.5">Algorithmic Flags:</span>
              <ul className="list-disc pl-4 space-y-0.5">
                {token.riskAssessment.suspiciousFlags.map((flag, i) => (
                  <li key={i}>{flag}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-[10px] text-text-muted font-mono leading-relaxed pt-1">
            Disclaimer: Displayed risk metrics are simulated demonstration outputs. They do not constitute financial advice or guarantee token safety.
          </p>
        </div>
      </div>
    </Drawer>
  );
};

