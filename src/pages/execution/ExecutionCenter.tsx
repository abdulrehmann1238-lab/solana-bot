import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SearchInput } from '../../components/common/SearchInput';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { ArrowDownUp, Layers, CheckCircle2, Route, ShieldCheck, Filter } from 'lucide-react';
import { ExecutionOrder } from '../../types';

interface ExecutionCenterProps {
  onOpenSwap: (ticker?: string) => void;
}

export const ExecutionCenter: React.FC<ExecutionCenterProps> = ({ onOpenSwap }) => {
  const { transactions, setSelectedTransaction } = useTrading();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const filteredOrders = transactions.filter(tx => {
    if (filterStatus !== 'ALL' && tx.status !== filterStatus) return false;
    if (search) {
      const s = search.toLowerCase();
      const matchOrder = tx.orderId.toLowerCase().includes(s);
      const matchToken = tx.token.toLowerCase().includes(s) || tx.tokenTicker.toLowerCase().includes(s);
      if (!matchOrder && !matchToken) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Execution Center & DEX Routing
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Monitor simulated trade routing, order parameters and transaction lifecycle.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onOpenSwap('BONK')}
          icon={<ArrowDownUp className="w-4 h-4" />}
        >
          Simulate Jupiter Swap
        </Button>
      </div>

      {/* Routing Topology Visual */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Route className="w-4 h-4 text-brand-forest" />
            <h3 className="text-sm font-bold font-heading text-text-main uppercase tracking-wider">
              Simulated Jupiter Split-Route Architecture
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-subtle text-text-muted">
            SUB-SECOND ROUTE EVALUATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-fintech bg-bg-subtle/50 border border-border-subtle">
            <span className="text-text-muted block text-[10px] uppercase mb-1">Source Token</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="font-bold text-text-main text-sm">SOL (Native / Wrapped)</span>
            </div>
            <span className="text-text-secondary block mt-1">Available: 63.8 SOL</span>
          </div>

          <div className="p-4 rounded-fintech bg-brand-softGreen/40 border border-brand-sage/30">
            <span className="text-brand-forest block text-[10px] uppercase mb-1 font-semibold">
              Optimal Aggregated DEX Split
            </span>
            <span className="font-bold text-brand-forest text-sm block">
              60% Whirlpool + 40% DLMM
            </span>
            <span className="text-brand-forest/80 block mt-1 text-[11px]">
              Minimizes price impact to &lt; 0.08%
            </span>
          </div>

          <div className="p-4 rounded-fintech bg-bg-subtle/50 border border-border-subtle">
            <span className="text-text-muted block text-[10px] uppercase mb-1">Target Asset</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-bold text-text-main text-sm">SPL Token Ledger</span>
            </div>
            <span className="text-text-secondary block mt-1">Simulated settlement</span>
          </div>
        </div>
      </div>

      {/* Execution Ledger Table */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold font-heading text-text-main">
              Simulated Execution History
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Click any order row to inspect full lifecycle timestamps and route hops.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-44">
              <SearchInput value={search} onChange={setSearch} placeholder="Filter orders..." />
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Simulated Success">Simulated Success</option>
              <option value="Rejected (Slippage)">Rejected (Slippage)</option>
              <option value="Rejected (Duplicate)">Rejected (Duplicate)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-[11px] font-mono text-text-muted">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Token</th>
                <th className="pb-3">Side</th>
                <th className="pb-3">Input</th>
                <th className="pb-3">Output</th>
                <th className="pb-3">Slippage</th>
                <th className="pb-3">Fee</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/70">
              {filteredOrders.map(tx => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTransaction(tx)}
                  className="hover:bg-bg-subtle/50 transition-colors cursor-pointer group"
                >
                  <td className="py-3 font-mono font-semibold text-text-main group-hover:text-brand-forest">
                    {tx.orderId}
                  </td>
                  <td className="py-3 font-semibold text-text-main">
                    {tx.tokenTicker}
                  </td>
                  <td className="py-3 font-mono font-bold">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        tx.side === 'BUY'
                          ? 'bg-emerald-50 text-financial-positive'
                          : 'bg-rose-50 text-financial-negative'
                      }`}
                    >
                      {tx.side}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-text-secondary">
                    {formatNumber(tx.inputAmount)} {tx.inputToken}
                  </td>
                  <td className="py-3 font-mono text-text-main font-medium">
                    {formatNumber(tx.outputAmount)} {tx.outputToken}
                  </td>
                  <td className="py-3 font-mono text-text-secondary">
                    {tx.slippagePct}%
                  </td>
                  <td className="py-3 font-mono text-text-muted">
                    {tx.estimatedFeeSol} SOL
                  </td>
                  <td className="py-3">
                    <Badge variant="status" value={tx.status} />
                  </td>
                  <td className="py-3 font-mono text-text-muted text-right">
                    {tx.timestamp.slice(11)}
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

