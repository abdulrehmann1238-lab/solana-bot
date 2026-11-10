import React, { useState, useEffect } from 'react';
import { Drawer } from '../common/Drawer';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Position } from '../../types';
import { useTrading } from '../../context/TradingContext';
import { formatCurrency, formatPercent, formatNumber } from '../../utils/formatters';
import { Sliders, AlertTriangle, ArrowDownRight, Check, XCircle } from 'lucide-react';

interface PositionDetailDrawerProps {
  position: Position | null;
  onClose: () => void;
}

export const PositionDetailDrawer: React.FC<PositionDetailDrawerProps> = ({
  position,
  onClose,
}) => {
  const { closePosition, partialExitPosition, updatePositionLimits, engineStatus } = useTrading();

  const [stopLoss, setStopLoss] = useState<number>(0);
  const [takeProfit, setTakeProfit] = useState<number>(0);
  const [trailingStop, setTrailingStop] = useState<number>(0);

  useEffect(() => {
    if (position) {
      setStopLoss(position.stopLossPrice);
      setTakeProfit(position.takeProfitPrice);
      setTrailingStop(position.trailingStopPct || 6.0);
    }
  }, [position]);

  if (!position) return null;

  const handleSaveLimits = (e: React.FormEvent) => {
    e.preventDefault();
    updatePositionLimits(position.id, stopLoss, takeProfit, trailingStop);
  };

  const handlePartialExit = (pct: number) => {
    partialExitPosition(position.id, pct);
  };

  const handleFullClose = () => {
    closePosition(position.id);
    onClose();
  };

  const isProfit = position.unrealizedPnl >= 0;

  return (
    <Drawer
      isOpen={!!position}
      onClose={onClose}
      title={`${position.token} (${position.tokenTicker})`}
      subtitle={`Open Position • ${position.strategyName}`}
      width="md"
    >
      <div className="space-y-6 text-xs">
        {/* P&L Header Card */}
        <div className="p-5 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase">Unrealized P&L</span>
              <div
                className={`text-2xl font-bold font-heading tabular-nums ${
                  isProfit ? 'text-financial-positive' : 'text-financial-negative'
                }`}
              >
                {isProfit ? '+' : ''}
                {formatCurrency(position.unrealizedPnl)}
              </div>
            </div>
            <span
              className={`px-2.5 py-1 rounded font-mono font-bold text-xs ${
                isProfit ? 'bg-emerald-50 text-financial-positive' : 'bg-rose-50 text-financial-negative'
              }`}
            >
              {formatPercent(position.unrealizedPnlPct)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-subtle text-[11px]">
            <div>
              <span className="text-text-muted block">Position Value:</span>
              <span className="font-mono font-semibold text-text-main">
                {formatCurrency(position.currentValueUsd)}
              </span>
            </div>
            <div>
              <span className="text-text-muted block">Invested Capital:</span>
              <span className="font-mono font-semibold text-text-main">
                {formatCurrency(position.investedValueUsd)}
              </span>
            </div>
            <div>
              <span className="text-text-muted block">Entry Price:</span>
              <span className="font-mono text-text-main">
                {formatCurrency(position.entryPrice, position.entryPrice < 0.01 ? 6 : 4)}
              </span>
            </div>
            <div>
              <span className="text-text-muted block">Current Price:</span>
              <span className="font-mono text-text-main">
                {formatCurrency(position.currentPrice, position.currentPrice < 0.01 ? 6 : 4)}
              </span>
            </div>
            <div>
              <span className="text-text-muted block">Holding Duration:</span>
              <span className="font-mono text-text-main">{position.holdingDuration}</span>
            </div>
            <div>
              <span className="text-text-muted block">Quantity:</span>
              <span className="font-mono text-text-main">
                {formatNumber(position.quantity, position.entryPrice < 0.01 ? 0 : 2)}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Limits Form */}
        <form
          onSubmit={handleSaveLimits}
          className="p-5 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold font-heading text-text-main uppercase tracking-wider">
              Risk Limits & Exits
            </h4>
            <span className="text-[10px] font-mono text-text-muted">Simulated Protection</span>
          </div>

          <div>
            <label className="block text-[11px] text-text-secondary mb-1">
              Stop-Loss Target Price ($)
            </label>
            <input
              type="number"
              step="any"
              value={stopLoss}
              onChange={e => setStopLoss(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-1.5 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
            />
          </div>

          <div>
            <label className="block text-[11px] text-text-secondary mb-1">
              Take-Profit Target Price ($)
            </label>
            <input
              type="number"
              step="any"
              value={takeProfit}
              onChange={e => setTakeProfit(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-1.5 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
            />
          </div>

          <div>
            <label className="block text-[11px] text-text-secondary mb-1">
              Trailing Stop Offset (%)
            </label>
            <input
              type="number"
              step="0.5"
              value={trailingStop}
              onChange={e => setTrailingStop(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-1.5 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
            />
          </div>

          <Button variant="secondary" size="sm" type="submit" className="w-full">
            Save Protection Limits
          </Button>
        </form>

        {/* Exit Actions */}
        <div className="p-5 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech space-y-3">
          <h4 className="text-xs font-bold font-heading text-text-main uppercase tracking-wider">
            Simulated Exit Controls
          </h4>

          {/* Partial Exit buttons */}
          <div>
            <span className="text-[11px] text-text-secondary block mb-1.5">
              Simulate Partial Exit:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePartialExit(25)}
                className="font-mono text-xs"
              >
                Exit 25%
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePartialExit(50)}
                className="font-mono text-xs"
              >
                Exit 50%
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePartialExit(75)}
                className="font-mono text-xs"
              >
                Exit 75%
              </Button>
            </div>
          </div>

          <div className="pt-2 border-t border-border-subtle">
            <Button
              variant="danger-outline"
              size="md"
              onClick={handleFullClose}
              className="w-full text-xs font-mono font-medium"
            >
              Simulate Full Position Exit (100%)
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

