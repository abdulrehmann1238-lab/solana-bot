import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { MetricCard } from '../../components/common/MetricCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import {
  ShieldAlert,
  AlertOctagon,
  Sliders,
  CheckCircle2,
  Lock,
  PauseCircle,
  Play,
  RotateCcw,
} from 'lucide-react';

interface RiskManagementCenterProps {
  onOpenEmergencyModal: () => void;
}

export const RiskManagementCenter: React.FC<RiskManagementCenterProps> = ({
  onOpenEmergencyModal,
}) => {
  const {
    riskSettings,
    updateRiskSettings,
    engineStatus,
    resumeEngine,
    portfolioBalance,
    positions,
  } = useTrading();

  const [formSettings, setFormSettings] = useState(riskSettings);

  const totalInvested = positions.reduce((acc, p) => acc + p.investedValueUsd, 0);
  const currentExposurePct = (totalInvested / portfolioBalance) * 100;

  const handleSaveRiskParams = (e: React.FormEvent) => {
    e.preventDefault();
    updateRiskSettings(formSettings);
  };

  const handleToggleProtection = (key: keyof typeof riskSettings) => {
    const updated = { ...formSettings, [key]: !formSettings[key] };
    setFormSettings(updated);
    updateRiskSettings({ [key]: updated[key] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Risk & Capital Protection
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Defensive quantitative parameters and automated safeguards designed to preserve trading capital.
          </p>
        </div>

        {engineStatus === 'HALTED' ? (
          <Button
            variant="primary"
            size="sm"
            onClick={resumeEngine}
            icon={<Play className="w-4 h-4" />}
          >
            Resume Engine (Cleared)
          </Button>
        ) : (
          <Button
            variant="danger"
            size="sm"
            onClick={onOpenEmergencyModal}
            icon={<AlertOctagon className="w-4 h-4" />}
          >
            EMERGENCY SHUTDOWN
          </Button>
        )}
      </div>

      {/* 14.1 Portfolio Risk Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Total Exposure</span>
          <span className="text-lg font-bold font-heading text-text-main tabular-nums">
            {currentExposurePct.toFixed(1)}%
          </span>
          <span className="text-[10px] font-mono text-text-secondary block mt-0.5">
            ${totalInvested.toLocaleString()} Invested
          </span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Max Permitted</span>
          <span className="text-lg font-bold font-heading text-text-main tabular-nums font-mono">
            {riskSettings.maxPortfolioExposurePct}%
          </span>
          <span className="text-[10px] font-mono text-financial-positive block mt-0.5">Under limit</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Daily Loss Limit</span>
          <span className="text-lg font-bold font-heading text-text-main tabular-nums font-mono">
            {formatCurrency(riskSettings.dailyLossLimitUsd)}
          </span>
          <span className="text-[10px] font-mono text-text-muted block mt-0.5">Hard stop cap</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Position Count</span>
          <span className="text-lg font-bold font-heading text-text-main tabular-nums font-mono">
            {positions.length} / {riskSettings.maxConcurrentPositions}
          </span>
          <span className="text-[10px] font-mono text-financial-positive block mt-0.5">2 Slots Free</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Max Slippage</span>
          <span className="text-lg font-bold font-heading text-text-main tabular-nums font-mono">
            {riskSettings.maxSlippagePct}%
          </span>
          <span className="text-[10px] font-mono text-text-secondary block mt-0.5">Rejects high slip</span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Min Liquidity</span>
          <span className="text-lg font-bold font-heading text-brand-forest tabular-nums font-mono">
            ${(riskSettings.minLiquidityUsd / 1000).toFixed(0)}k
          </span>
          <span className="text-[10px] font-mono text-text-muted block mt-0.5">DEX pool threshold</span>
        </div>
      </div>

      {/* Grid: 14.2 Risk Configuration & 14.3 Toggles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Configuration Form (2 Cols) */}
        <form
          onSubmit={handleSaveRiskParams}
          className="lg:col-span-2 bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 shadow-fintech space-y-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div>
              <h3 className="text-base font-bold font-heading text-text-main">
                Quantitative Exposure Parameters
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Adjust hard limits applied to all simulated trades and copy operations
              </p>
            </div>
            <Button variant="primary" size="sm" type="submit">
              Save Parameters
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">
                Max Position Size ($ USD)
              </label>
              <input
                type="number"
                step="100"
                value={formSettings.maxPositionSizeUsd}
                onChange={e =>
                  setFormSettings({ ...formSettings, maxPositionSizeUsd: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">
                Max Portfolio Exposure (%)
              </label>
              <input
                type="number"
                min="10"
                max="90"
                value={formSettings.maxPortfolioExposurePct}
                onChange={e =>
                  setFormSettings({
                    ...formSettings,
                    maxPortfolioExposurePct: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">
                Daily Loss Limit ($ USD)
              </label>
              <input
                type="number"
                step="100"
                value={formSettings.dailyLossLimitUsd}
                onChange={e =>
                  setFormSettings({ ...formSettings, dailyLossLimitUsd: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">
                Max Concurrent Positions
              </label>
              <input
                type="number"
                min="1"
                max="25"
                value={formSettings.maxConcurrentPositions}
                onChange={e =>
                  setFormSettings({
                    ...formSettings,
                    maxConcurrentPositions: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">
                Default Stop-Loss (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={formSettings.defaultStopLossPct}
                onChange={e =>
                  setFormSettings({ ...formSettings, defaultStopLossPct: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">
                Default Take-Profit (%)
              </label>
              <input
                type="number"
                step="1"
                value={formSettings.defaultTakeProfitPct}
                onChange={e =>
                  setFormSettings({ ...formSettings, defaultTakeProfitPct: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
              />
            </div>
          </div>
        </form>

        {/* 14.3 Risk Protection Toggles (1 Col) */}
        <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 shadow-fintech space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-brand-forest" />
            <h3 className="text-base font-bold font-heading text-text-main">
              Automated Guards
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-2.5 rounded bg-bg-subtle/60 cursor-pointer">
              <div>
                <span className="font-semibold text-text-main block">Auto Stop-Loss</span>
                <span className="text-[10px] text-text-secondary">Enforced on all fills</span>
              </div>
              <input
                type="checkbox"
                checked={formSettings.enableAutoStopLoss}
                onChange={() => handleToggleProtection('enableAutoStopLoss')}
                className="rounded text-brand-forest"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded bg-bg-subtle/60 cursor-pointer">
              <div>
                <span className="font-semibold text-text-main block">Dynamic Trailing Stop</span>
                <span className="text-[10px] text-text-secondary">Locks profits on rallies</span>
              </div>
              <input
                type="checkbox"
                checked={formSettings.enableTrailingStop}
                onChange={() => handleToggleProtection('enableTrailingStop')}
                className="rounded text-brand-forest"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded bg-bg-subtle/60 cursor-pointer">
              <div>
                <span className="font-semibold text-text-main block">Daily Loss Lock</span>
                <span className="text-[10px] text-text-secondary">Halts buys if limit hit</span>
              </div>
              <input
                type="checkbox"
                checked={formSettings.enableDailyLossProtection}
                onChange={() => handleToggleProtection('enableDailyLossProtection')}
                className="rounded text-brand-forest"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded bg-bg-subtle/60 cursor-pointer">
              <div>
                <span className="font-semibold text-text-main block">Low Liquidity Reject</span>
                <span className="text-[10px] text-text-secondary">Blocks shallow DEX pools</span>
              </div>
              <input
                type="checkbox"
                checked={formSettings.enableLowLiquidityRejection}
                onChange={() => handleToggleProtection('enableLowLiquidityRejection')}
                className="rounded text-brand-forest"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded bg-bg-subtle/60 cursor-pointer">
              <div>
                <span className="font-semibold text-text-main block">Excessive Slippage Guard</span>
                <span className="text-[10px] text-text-secondary">Rejects slippage &gt; threshold</span>
              </div>
              <input
                type="checkbox"
                checked={formSettings.enableExcessiveSlippageRejection}
                onChange={() => handleToggleProtection('enableExcessiveSlippageRejection')}
                className="rounded text-brand-forest"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

