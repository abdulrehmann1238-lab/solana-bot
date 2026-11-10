import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { formatCurrency, formatNumber, exportToCsv } from '../../utils/formatters';
import { History, Download, Filter, RotateCcw } from 'lucide-react';

export const TransactionHistory: React.FC = () => {
  const { transactions, setSelectedTransaction, addToast } = useTrading();

  const [search, setSearch] = useState('');
  const [filterSide, setFilterSide] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filtered = transactions.filter(tx => {
    if (filterSide !== 'ALL' && tx.side !== filterSide) return false;
    if (filterStatus !== 'ALL' && tx.status !== filterStatus) return false;
    if (search) {
      const s = search.toLowerCase();
      const matchOrder = tx.orderId.toLowerCase().includes(s);
      const matchToken = tx.token.toLowerCase().includes(s) || tx.tokenTicker.toLowerCase().includes(s);
      const matchWallet = tx.walletSource?.toLowerCase().includes(s);
      if (!matchOrder && !matchToken && !matchWallet) return false;
    }
    return true;
  });

  const handleExportCsv = () => {
    const rows = filtered.map(t => ({
      OrderID: t.orderId,
      Timestamp: t.timestamp,
      Token: t.tokenTicker,
      Side: t.side,
      InputAmount: t.inputAmount,
      InputToken: t.inputToken,
      OutputAmount: t.outputAmount,
      OutputToken: t.outputToken,
      Price: t.executionPrice,
      Slippage: t.slippagePct,
      Status: t.status,
      WalletSource: t.walletSource || 'Direct Swap',
      DemoEnvironment: 'SIMULATED',
    }));
    exportToCsv('solana-bot-transactions.csv', rows);
    addToast({
      title: 'Ledger Exported',
      message: `Exported ${rows.length} transactions to CSV`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Transaction Ledger & History
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Audit-grade record of simulated swaps, copy signals, and automated risk rejections.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleExportCsv}
          icon={<Download className="w-3.5 h-3.5" />}
        >
          Export CSV Ledger
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 shadow-fintech flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search Order ID, Token, or Wallet..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select
            value={filterSide}
            onChange={e => setFilterSide(e.target.value)}
            className="px-3 py-1.5 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none"
          >
            <option value="ALL">All Sides</option>
            <option value="BUY">BUY Only</option>
            <option value="SELL">SELL Only</option>
          </select>

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

          {(search || filterSide !== 'ALL' || filterStatus !== 'ALL') && (
            <button
              onClick={() => {
                setSearch('');
                setFilterSide('ALL');
                setFilterStatus('ALL');
              }}
              className="text-xs text-text-muted hover:text-text-main flex items-center gap-1 font-mono"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-[11px] font-mono text-text-muted">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Source Wallet</th>
                <th className="pb-3">Token</th>
                <th className="pb-3">Side</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Fee (SOL)</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/70">
              {filtered.map(tx => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTransaction(tx)}
                  className="hover:bg-bg-subtle/50 transition-colors cursor-pointer group"
                >
                  <td className="py-3 font-mono font-semibold text-text-main group-hover:text-brand-forest">
                    {tx.orderId}
                  </td>
                  <td className="py-3 font-mono text-text-muted">
                    {tx.timestamp}
                  </td>
                  <td className="py-3 font-mono text-text-secondary">
                    {tx.walletSource || <span className="text-text-muted">Manual</span>}
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
                  <td className="py-3 font-mono text-text-main">
                    {formatNumber(tx.inputAmount)} {tx.inputToken}
                  </td>
                  <td className="py-3 font-mono text-text-main">
                    {formatCurrency(tx.executionPrice, tx.executionPrice < 0.01 ? 6 : 4)}
                  </td>
                  <td className="py-3 font-mono text-text-muted">
                    {tx.estimatedFeeSol}
                  </td>
                  <td className="py-3">
                    <Badge variant="status" value={tx.status} />
                  </td>
                  <td className="py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(tx)}>
                      Inspect
                    </Button>
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

