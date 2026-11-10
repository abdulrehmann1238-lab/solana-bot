import React from 'react';
import { Drawer } from '../common/Drawer';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ExecutionOrder } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { CheckCircle2, XCircle, Clock, ExternalLink, Route, ShieldCheck } from 'lucide-react';

interface TransactionDetailDrawerProps {
  transaction: ExecutionOrder | null;
  onClose: () => void;
}

export const TransactionDetailDrawer: React.FC<TransactionDetailDrawerProps> = ({
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  return (
    <Drawer
      isOpen={!!transaction}
      onClose={onClose}
      title={`Order ${transaction.orderId}`}
      subtitle={`Simulated ${transaction.side} • ${transaction.token}`}
      width="md"
    >
      <div className="space-y-6 text-xs">
        {/* Status Header */}
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-text-muted uppercase block">
              Execution Status
            </span>
            <span className="text-sm font-bold font-heading text-text-main">
              {transaction.status}
            </span>
          </div>
          <Badge variant="status" value={transaction.status} />
        </div>

        {/* Order Details Grid */}
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech space-y-2.5">
          <h4 className="text-xs font-bold font-heading text-text-main uppercase tracking-wider mb-2">
            Parameters & Routing
          </h4>

          <div className="flex justify-between py-1 border-b border-border-subtle/50">
            <span className="text-text-muted">Token / Pair:</span>
            <span className="font-mono font-semibold text-text-main">{transaction.tokenTicker}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-border-subtle/50">
            <span className="text-text-muted">Side:</span>
            <span
              className={`font-mono font-bold ${
                transaction.side === 'BUY' ? 'text-financial-positive' : 'text-financial-negative'
              }`}
            >
              {transaction.side}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-border-subtle/50">
            <span className="text-text-muted">Input Amount:</span>
            <span className="font-mono text-text-main">
              {formatNumber(transaction.inputAmount)} {transaction.inputToken}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-border-subtle/50">
            <span className="text-text-muted">Output Amount:</span>
            <span className="font-mono text-text-main">
              {formatNumber(transaction.outputAmount)} {transaction.outputToken}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-border-subtle/50">
            <span className="text-text-muted">Execution Price:</span>
            <span className="font-mono text-text-main">
              {formatCurrency(transaction.executionPrice, 6)}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-border-subtle/50">
            <span className="text-text-muted">Simulated Slippage:</span>
            <span className="font-mono text-text-main">{transaction.slippagePct}%</span>
          </div>

          <div className="flex justify-between py-1 border-b border-border-subtle/50">
            <span className="text-text-muted">Price Impact:</span>
            <span className="font-mono text-text-main">{transaction.priceImpactPct}%</span>
          </div>

          <div className="flex justify-between py-1 border-b border-border-subtle/50">
            <span className="text-text-muted">Network Fee:</span>
            <span className="font-mono text-text-main">
              {transaction.estimatedFeeSol} SOL (Simulated)
            </span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-text-muted">Timestamp:</span>
            <span className="font-mono text-text-main">{transaction.timestamp}</span>
          </div>
        </div>

        {/* Route Path */}
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold font-heading text-text-main uppercase">
            <Route className="w-4 h-4 text-brand-forest" />
            <span>Simulated Jupiter Route</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded bg-bg-subtle text-xs font-mono text-brand-forest font-medium">
            {transaction.route.join(' → ')}
          </div>
        </div>

        {/* Lifecycle Steps */}
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <h4 className="text-xs font-bold font-heading text-text-main uppercase tracking-wider mb-3">
            Transaction Lifecycle Stages
          </h4>

          <div className="space-y-3">
            {transaction.lifecycleSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs font-mono">
                <div className="mt-0.5">
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-financial-positive" />
                  ) : step.status === 'failed' ? (
                    <XCircle className="w-4 h-4 text-financial-negative" />
                  ) : (
                    <Clock className="w-4 h-4 text-text-muted" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-text-main">{step.step}</span>
                    <span className="text-[10px] text-text-muted">{step.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-0.5">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

