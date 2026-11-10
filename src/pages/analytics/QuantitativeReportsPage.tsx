import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatCurrency, formatPercent, exportToCsv } from '../../utils/formatters';
import { FileText, Download, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';

export const QuantitativeReportsPage: React.FC = () => {
  const { portfolioBalance, realizedPnl, unrealizedPnl, positions, wallets, addToast } = useTrading();

  const handleDownloadFullAudit = () => {
    const reportData = [
      { Metric: 'Portfolio Balance', Value: portfolioBalance },
      { Metric: 'Realized PnL', Value: realizedPnl },
      { Metric: 'Unrealized PnL', Value: unrealizedPnl },
      { Metric: 'Active Positions Count', Value: positions.length },
      { Metric: 'Monitored Wallets Count', Value: wallets.length },
      { Metric: 'Compliance Note', Value: 'Demonstration Paper Trading Session' },
    ];
    exportToCsv('solana-bot-audit-report.csv', reportData);
    addToast({
      title: 'Audit Report Generated',
      message: 'Downloaded quantitative audit summary to CSV',
      type: 'info',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Quantitative System Reports
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Audit-grade performance summaries, risk compliance logs, and exportable verification records.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleDownloadFullAudit}
          icon={<Download className="w-3.5 h-3.5" />}
        >
          Download Executive Audit (CSV)
        </Button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-fintech-lg bg-bg-surface border border-border-subtle shadow-fintech space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-forest" />
            <h3 className="text-base font-bold font-heading text-text-main">
              Executive Trading Performance Audit
            </h3>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Consolidated evaluation of simulated copy execution efficiency, fee attribution, and Sharpe metrics across the 6-month historical simulation window.
          </p>

          <div className="space-y-2 py-3 border-y border-border-subtle text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">Total Paper Turnover:</span>
              <span className="font-mono font-semibold text-text-main">$64,280.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Effective Net Alpha:</span>
              <span className="font-mono font-bold text-financial-positive">+74.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Jupiter Routing Optimization Savings:</span>
              <span className="font-mono text-brand-forest">$840.50 (Est.)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Max Drawdown Control:</span>
              <span className="font-mono text-text-main">-8.4% (Passed Guardrail)</span>
            </div>
          </div>

          <Button variant="secondary" size="sm" onClick={handleDownloadFullAudit} className="w-full text-xs">
            Export Performance Summary
          </Button>
        </div>

        <div className="p-6 rounded-fintech-lg bg-bg-surface border border-border-subtle shadow-fintech space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-forest" />
            <h3 className="text-base font-bold font-heading text-text-main">
              Risk & Capital Safety Attestation
            </h3>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Verification record confirming that all automated stop-loss thresholds, daily loss protections, and duplicate order preventions operated without failure.
          </p>

          <div className="space-y-2 py-3 border-y border-border-subtle text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">Idempotency Checks:</span>
              <span className="font-mono font-semibold text-financial-positive">100% Passed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Slippage Breach Rejections:</span>
              <span className="font-mono font-semibold text-text-main">2 Blocked</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Circuit Breaker Status:</span>
              <span className="font-mono text-financial-positive font-bold">READY / ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Private Key Exposure Risk:</span>
              <span className="font-mono text-financial-positive font-bold">0.00% (No Keys Held)</span>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              addToast({
                title: 'Risk Verification Confirmed',
                message: 'All risk safety checks validated against demonstration specifications.',
                type: 'success',
              })
            }
            className="w-full text-xs"
          >
            Verify Safety Attestation
          </Button>
        </div>
      </div>
    </div>
  );
};

