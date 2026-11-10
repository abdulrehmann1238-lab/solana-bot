import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useTrading } from '../../context/TradingContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { ArrowDownUp, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Layers } from 'lucide-react';
import { ExecutionOrder } from '../../types';

interface SimulatedSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTokenTicker?: string;
}

export const SimulatedSwapModal: React.FC<SimulatedSwapModalProps> = ({
  isOpen,
  onClose,
  defaultTokenTicker = 'BONK',
}) => {
  const { tokens, executeSimulatedSwap, engineStatus } = useTrading();

  const [inputSol, setInputSol] = useState<number>(2.5);
  const [selectedTicker, setSelectedTicker] = useState<string>(defaultTokenTicker);
  const [slippage, setSlippage] = useState<number>(0.5);

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [completedOrder, setCompletedOrder] = useState<ExecutionOrder | null>(null);

  const solPrice = 195.5; // Simulated SOL price

  useEffect(() => {
    if (defaultTokenTicker) {
      setSelectedTicker(defaultTokenTicker);
    }
  }, [defaultTokenTicker]);

  useEffect(() => {
    if (!isOpen) {
      setIsExecuting(false);
      setCurrentStepIndex(-1);
      setCompletedOrder(null);
    }
  }, [isOpen]);

  const targetToken = tokens.find(t => t.ticker === selectedTicker) || tokens[0];
  const inputUsd = inputSol * solPrice;
  const estimatedTokenOutput = targetToken ? inputUsd / targetToken.price : 0;
  const priceImpact = (inputUsd / targetToken.liquidity) * 100;
  const minReceived = estimatedTokenOutput * (1 - slippage / 100);

  const LIFECYCLE_STEPS = [
    '01 — Signal Received',
    '02 — Quote Requested',
    '03 — Route Evaluated',
    '04 — Risk Validation',
    '05 — Simulated Execution',
    '06 — Position Updated',
  ];

  const handleRunSwap = async () => {
    setIsExecuting(true);
    setCurrentStepIndex(0);

    // Step-by-step lifecycle animation
    for (let i = 0; i < LIFECYCLE_STEPS.length; i++) {
      setCurrentStepIndex(i);
      await new Promise(r => setTimeout(r, 380));
    }

    try {
      const order = await executeSimulatedSwap('SOL', targetToken.ticker, inputUsd, slippage);
      setCompletedOrder(order);
    } catch (e) {
      // handled in context
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="JUPITER EXECUTION SIMULATOR"
      subtitle="Interactive route evaluation & paper order settlement"
      maxWidth="lg"
      footer={
        completedOrder ? (
          <Button variant="primary" size="md" onClick={onClose} className="w-full">
            View Position in Portfolio
          </Button>
        ) : isExecuting ? (
          <div className="w-full flex items-center justify-center py-2 text-xs font-mono text-brand-forest">
            <span className="w-2 h-2 rounded-full bg-brand-forest animate-ping mr-2" />
            Executing Simulated Route...
          </div>
        ) : (
          <>
            <Button variant="secondary" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleRunSwap}
              disabled={engineStatus === 'HALTED' || inputSol <= 0}
              icon={<ArrowDownUp className="w-4 h-4" />}
            >
              Simulate Swap
            </Button>
          </>
        )
      }
    >
      {completedOrder ? (
        <div className="space-y-5 text-center py-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-financial-positive flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono text-text-muted">Order ID: {completedOrder.orderId}</span>
            <h3 className="text-xl font-bold font-heading text-text-main mt-1">
              Simulated Swap Filled
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              Swapped {inputSol} SOL for ~{formatNumber(completedOrder.outputAmount)} {completedOrder.tokenTicker}
            </p>
          </div>

          {/* Execution metadata card */}
          <div className="bg-bg-subtle/80 border border-border-subtle rounded-fintech p-4 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-text-muted">Status:</span>
              <span className="font-mono font-semibold text-financial-positive">
                {completedOrder.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Effective Price:</span>
              <span className="font-mono">{formatCurrency(completedOrder.executionPrice, 6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Simulated Slippage:</span>
              <span className="font-mono">{completedOrder.slippagePct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Route:</span>
              <span className="font-mono text-[11px] text-brand-forest">
                {completedOrder.route.join(' → ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Simulated Gas:</span>
              <span className="font-mono">0.000005 SOL (~$0.001)</span>
            </div>
          </div>
        </div>
      ) : isExecuting ? (
        <div className="py-6 space-y-6">
          <div className="text-center">
            <span className="text-xs font-mono text-brand-forest font-semibold uppercase tracking-wider">
              Executing Lifecycle
            </span>
            <h3 className="text-lg font-bold font-heading text-text-main mt-1">
              Processing Simulated Jupiter Order
            </h3>
          </div>

          {/* Stepper */}
          <div className="space-y-2.5 max-w-md mx-auto">
            {LIFECYCLE_STEPS.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div
                  key={step}
                  className={`flex items-center justify-between p-3 rounded-fintech border transition-all duration-200 text-xs font-mono ${
                    isPast
                      ? 'bg-emerald-50/60 border-emerald-200 text-financial-positive'
                      : isCurrent
                      ? 'bg-brand-softGreen border-brand-forest text-brand-forest shadow-sm'
                      : 'bg-bg-subtle/40 border-border-subtle text-text-muted'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-financial-positive shrink-0" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-brand-forest animate-ping shrink-0 ml-1 mr-1" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-border-subtle shrink-0 ml-1 mr-1" />
                    )}
                    <span className="font-medium">{step}</span>
                  </div>
                  <span className="text-[10px]">
                    {isPast ? 'COMPLETED' : isCurrent ? 'RUNNING' : 'PENDING'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Swap Box */}
          <div className="space-y-2">
            {/* Input Token: SOL */}
            <div className="bg-bg-subtle/60 border border-border-subtle rounded-fintech p-3.5">
              <div className="flex justify-between text-xs text-text-muted mb-1.5">
                <span>You Pay</span>
                <span>Available: 63.8 SOL (~$12,450)</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={inputSol}
                  onChange={e => setInputSol(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="bg-transparent text-xl font-bold font-mono text-text-main focus:outline-none w-full"
                />
                <div className="flex items-center gap-2 bg-bg-surface px-3 py-1.5 rounded-fintech border border-border-subtle shadow-fintech-sm shrink-0">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-emerald-400 flex items-center justify-center text-[10px] text-white font-bold">
                    S
                  </div>
                  <span className="text-xs font-bold font-mono">SOL</span>
                </div>
              </div>
              <div className="text-[11px] text-text-muted mt-1 font-mono">
                ≈ {formatCurrency(inputUsd)}
              </div>
            </div>

            {/* Invert Arrow */}
            <div className="flex justify-center -my-2 relative z-10">
              <div className="w-7 h-7 rounded-full bg-bg-surface border border-border-subtle shadow-fintech-sm flex items-center justify-center text-text-secondary">
                <ArrowDownUp className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Output Token */}
            <div className="bg-bg-subtle/60 border border-border-subtle rounded-fintech p-3.5">
              <div className="flex justify-between text-xs text-text-muted mb-1.5">
                <span>You Receive (Estimated)</span>
                <span>Price: {formatCurrency(targetToken.price, 6)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="text-xl font-bold font-mono text-text-main truncate">
                  {formatNumber(estimatedTokenOutput, targetToken.price < 0.01 ? 0 : 2)}
                </div>
                <select
                  value={selectedTicker}
                  onChange={e => setSelectedTicker(e.target.value)}
                  className="bg-bg-surface px-3 py-1.5 rounded-fintech border border-border-subtle shadow-fintech-sm text-xs font-bold font-mono text-text-main focus:outline-none cursor-pointer"
                >
                  {tokens.map(t => (
                    <option key={t.id} value={t.ticker}>
                      {t.ticker} ({t.name})
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-[11px] text-text-muted mt-1 font-mono">
                ≈ {formatCurrency(inputUsd)}
              </div>
            </div>
          </div>

          {/* Slippage Selector */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-text-secondary font-medium">Slippage Tolerance</span>
              <span className="font-mono text-brand-forest font-semibold">{slippage}%</span>
            </div>
            <div className="flex gap-2">
              {[0.1, 0.5, 1.0, 2.0].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSlippage(val)}
                  className={`flex-1 py-1 text-xs font-mono rounded border transition-colors ${
                    slippage === val
                      ? 'bg-brand-softGreen border-brand-forest text-brand-forest font-semibold'
                      : 'bg-bg-surface border-border-subtle text-text-secondary hover:text-text-main'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* Jupiter Route & Impact Breakdown */}
          <div className="p-3.5 rounded-fintech bg-bg-surface border border-border-subtle text-xs space-y-2">
            <div className="flex justify-between text-text-secondary">
              <span>Best Route</span>
              <span className="font-mono text-brand-forest font-medium">
                SOL → Jupiter DLMM / Whirlpool → {targetToken.ticker}
              </span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Price Impact</span>
              <span className="font-mono">{priceImpact.toFixed(3)}%</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Minimum Received</span>
              <span className="font-mono">
                {formatNumber(minReceived, targetToken.price < 0.01 ? 0 : 2)} {targetToken.ticker}
              </span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Estimated Network Fee</span>
              <span className="font-mono">0.000005 SOL (&lt; $0.001)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded bg-brand-softGreen/50 border border-brand-sage/20 text-[11px] text-brand-forest font-mono">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Simulated transaction. Real wallet connection is not required.</span>
          </div>
        </div>
      )}
    </Modal>
  );
};

