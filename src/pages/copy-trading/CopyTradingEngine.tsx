import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import {
  Copy,
  Plus,
  Play,
  Pause,
  AlertTriangle,
  ShieldCheck,
  Sliders,
  CheckCircle2,
  Trash2,
  Settings2,
  Activity,
  Layers,
} from 'lucide-react';

interface CopyTradingEngineProps {
  onOpenAddWallet: () => void;
}

export const CopyTradingEngine: React.FC<CopyTradingEngineProps> = ({ onOpenAddWallet }) => {
  const {
    wallets,
    toggleCopyTrading,
    removeWallet,
    engineStatus,
    setEngineStatus,
    resumeEngine,
    transactions,
    addToast,
    riskSettings,
    updateRiskSettings,
  } = useTrading();

  const [activeStrategyType, setActiveStrategyType] = useState<'percent' | 'fixed'>('percent');
  const [fixedTradeAmount, setFixedTradeAmount] = useState<number>(150);
  const [percentTradeSize, setPercentTradeSize] = useState<number>(10);
  const [maxCopySize, setMaxCopySize] = useState<number>(500);

  const copiedWallets = wallets.filter(w => w.isCopied);

  const handleToggleEngine = () => {
    if (engineStatus === 'ACTIVE') {
      setEngineStatus('PAUSED');
      addToast({
        title: 'Copy Engine Paused',
        message: 'Automated signal monitoring paused. Existing positions remain protected.',
        type: 'warning',
      });
    } else {
      resumeEngine();
    }
  };

  const handleSaveParameters = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Copy Parameters Applied',
      message: `Configured ${activeStrategyType === 'percent' ? `${percentTradeSize}% sizing` : `$${fixedTradeAmount} fixed`} across ${copiedWallets.length} active wallets.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* 10.1 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Copy Trading Engine
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Configure wallet-following strategies and manage automated trading rules.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant={engineStatus === 'ACTIVE' ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleToggleEngine}
            icon={engineStatus === 'ACTIVE' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          >
            {engineStatus === 'ACTIVE' ? 'Pause Engine' : 'Resume Engine'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenAddWallet}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Tracked Wallet
          </Button>
        </div>
      </div>

      {/* 10.2 Engine Status Large Card */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 shadow-fintech">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border-subtle">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-fintech bg-brand-softGreen border border-brand-sage/20 flex items-center justify-center text-brand-forest">
              <Copy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-heading text-text-main">
                  Algorithmic Copy Pipeline
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-brand-softGreen text-brand-forest border border-brand-sage/20">
                  PAPER MODE ACTIVE
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Sub-second event listener connected to Solana demonstration ledger state.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-fintech bg-bg-subtle border border-border-subtle text-xs font-mono">
              <span className="text-text-muted block text-[10px] uppercase">Engine Status</span>
              <span
                className={`font-bold ${
                  engineStatus === 'ACTIVE'
                    ? 'text-financial-positive'
                    : engineStatus === 'HALTED'
                    ? 'text-financial-negative'
                    : 'text-financial-warning'
                }`}
              >
                {engineStatus}
              </span>
            </div>

            <div className="px-3.5 py-2 rounded-fintech bg-bg-subtle border border-border-subtle text-xs font-mono">
              <span className="text-text-muted block text-[10px] uppercase">Tracked Wallets</span>
              <span className="font-bold text-text-main">{copiedWallets.length} Active</span>
            </div>

            <div className="px-3.5 py-2 rounded-fintech bg-bg-subtle border border-border-subtle text-xs font-mono">
              <span className="text-text-muted block text-[10px] uppercase">Signals Evaluated</span>
              <span className="font-bold text-text-main">86 Today</span>
            </div>

            <div className="px-3.5 py-2 rounded-fintech bg-bg-subtle border border-border-subtle text-xs font-mono">
              <span className="text-text-muted block text-[10px] uppercase">Paper Trades Executed</span>
              <span className="font-bold text-financial-positive">6 Filled</span>
            </div>

            <div className="px-3.5 py-2 rounded-fintech bg-bg-subtle border border-border-subtle text-xs font-mono">
              <span className="text-text-muted block text-[10px] uppercase">Rejected Signals</span>
              <span className="font-bold text-financial-negative">2 Blocked</span>
            </div>
          </div>
        </div>

        {/* 10.7 Duplicate Transaction Prevention & Security Callout */}
        <div className="mt-5 pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-text-secondary">
            <ShieldCheck className="w-4 h-4 text-brand-forest shrink-0" />
            <span>
              <strong className="text-text-main">Idempotency Shield Active:</strong> Duplicate transactions and rapid replay attacks within 60s windows are automatically rejected.
            </span>
          </div>
          <div
            className="text-[11px] font-mono text-text-muted cursor-help"
            title="Production architecture routes via isolated signer RPC"
          >
            Signer Architecture: Isolated Paper Sandbox
          </div>
        </div>
      </div>

      {/* Grid: 10.3 Tracked Wallets & 10.5 Copy Sizing Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tracked Wallets List (2 Cols) */}
        <div className="lg:col-span-2 bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-text-main">
                Followed Smart Wallets
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Target wallets mirrored by the automated simulation pipeline
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={onOpenAddWallet} icon={<Plus className="w-3.5 h-3.5" />}>
              Add
            </Button>
          </div>

          <div className="space-y-3">
            {wallets.map(w => (
              <div
                key={w.id}
                className="p-4 rounded-fintech bg-bg-subtle/50 border border-border-subtle hover:border-brand-sage/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-bg-surface border border-border-subtle flex items-center justify-center font-mono font-bold text-text-main">
                    #{w.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-text-main text-sm">
                        {w.address}
                      </span>
                      {w.label && (
                        <span className="text-[11px] text-text-muted font-sans font-medium">
                          ({w.label})
                        </span>
                      )}
                      <Badge variant="risk" value={w.riskScore} size="sm" />
                    </div>
                    <div className="flex items-center gap-3 text-text-secondary text-[11px] mt-0.5 font-mono">
                      <span>Win Rate: <strong className="text-financial-positive">{w.winRate}%</strong></span>
                      <span>•</span>
                      <span>Realized: <strong className="text-financial-positive">+{formatCurrency(w.realizedPnl)}</strong></span>
                      <span>•</span>
                      <span>Alloc: <strong>{w.copyAllocationPct}%</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button
                    variant={w.isCopied ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => toggleCopyTrading(w.id)}
                    className="text-xs font-mono"
                  >
                    {w.isCopied ? 'Active Copy' : 'Paused'}
                  </Button>
                  <button
                    onClick={() => removeWallet(w.id)}
                    title="Remove wallet from list"
                    className="p-2 text-text-muted hover:text-financial-negative rounded hover:bg-bg-subtle transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10.5 Copy Sizing Settings (1 Col) */}
        <form
          onSubmit={handleSaveParameters}
          className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech space-y-4 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-4 h-4 text-brand-forest" />
              <h3 className="text-base font-bold font-heading text-text-main">
                Copy Trade Sizing
              </h3>
            </div>
            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              Define position sizing algorithms applied whenever a followed whale submits an on-chain swap.
            </p>

            <div className="space-y-4 text-xs">
              {/* Type Switcher */}
              <div className="flex gap-2 p-1 bg-bg-subtle border border-border-subtle rounded-fintech">
                <button
                  type="button"
                  onClick={() => setActiveStrategyType('percent')}
                  className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors ${
                    activeStrategyType === 'percent'
                      ? 'bg-bg-surface text-brand-forest shadow-fintech-sm font-semibold'
                      : 'text-text-secondary'
                  }`}
                >
                  Proportional (%)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStrategyType('fixed')}
                  className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors ${
                    activeStrategyType === 'fixed'
                      ? 'bg-bg-surface text-brand-forest shadow-fintech-sm font-semibold'
                      : 'text-text-secondary'
                  }`}
                >
                  Fixed ($ USD)
                </button>
              </div>

              {activeStrategyType === 'percent' ? (
                <div>
                  <label className="block text-[11px] font-mono text-text-muted mb-1">
                    Follow Size Percentage ({percentTradeSize}% of Whale Size)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={percentTradeSize}
                    onChange={e => setPercentTradeSize(Number(e.target.value))}
                    className="w-full accent-brand-forest"
                  />
                  <span className="text-[10px] text-text-secondary font-mono">
                    If whale swaps $2,400 → Your paper copy will execute for ${((percentTradeSize / 100) * 2400).toFixed(0)}
                  </span>
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-mono text-text-muted mb-1">
                    Fixed Trade Value ($ USD)
                  </label>
                  <input
                    type="number"
                    min="25"
                    step="25"
                    value={fixedTradeAmount}
                    onChange={e => setFixedTradeAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono text-text-muted mb-1">
                  Hard Maximum Trade Cap ($ USD)
                </label>
                <input
                  type="number"
                  min="100"
                  step="50"
                  value={maxCopySize}
                  onChange={e => setMaxCopySize(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-text-muted mb-1">
                  Max Slippage Tolerance ({riskSettings.maxSlippagePct}%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.2"
                  max="5.0"
                  value={riskSettings.maxSlippagePct}
                  onChange={e => updateRiskSettings({ maxSlippagePct: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
                />
              </div>
            </div>
          </div>

          <Button variant="primary" size="md" type="submit" className="w-full mt-4">
            Save Engine Settings
          </Button>
        </form>
      </div>

      {/* 10.6 Copy Trading Live Feed */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-forest" />
            <h3 className="text-base font-bold font-heading text-text-main">
              Simulated Copy Trading Execution Feed
            </h3>
          </div>
          <span className="text-xs font-mono text-text-muted">Live Stream</span>
        </div>

        <div className="space-y-3">
          {transactions.slice(0, 4).map(tx => (
            <div
              key={tx.id}
              className="p-3.5 rounded-fintech bg-bg-subtle/50 border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded ${
                    tx.side === 'BUY'
                      ? 'bg-emerald-50 text-financial-positive'
                      : 'bg-rose-50 text-financial-negative'
                  }`}
                >
                  {tx.side}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-main font-heading">
                      {tx.tokenTicker} ({tx.token})
                    </span>
                    {tx.walletSource && (
                      <span className="text-[11px] font-mono text-text-muted">
                        via {tx.walletSource}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-secondary font-mono mt-0.5">
                    {tx.originalTradeValueUsd && (
                      <span>Whale Trade: {formatCurrency(tx.originalTradeValueUsd)}</span>
                    )}
                    <span>→</span>
                    {tx.copyTradeValueUsd && (
                      <span>
                        Simulated Copy: <strong className="text-text-main">{formatCurrency(tx.copyTradeValueUsd)}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono">
                <Badge variant="status" value={tx.status} />
                <span className="text-[11px] text-text-muted">{tx.timestamp.slice(11)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

