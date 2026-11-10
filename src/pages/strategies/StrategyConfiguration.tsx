import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Strategy } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { formatPercent } from '../../utils/formatters';
import { Cpu, Plus, Sliders, Check, Play, Pause, ShieldCheck, ArrowRight } from 'lucide-react';

export const StrategyConfiguration: React.FC = () => {
  const { strategies, toggleStrategy, updateStrategy, addStrategy } = useTrading();
  const [editingStrategy, setEditingStrategy] = useState<Strategy | null>(null);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStrategy) {
      updateStrategy(editingStrategy);
      setEditingStrategy(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Strategy Management
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Configure algorithmic rule sets, allocation ratios, and risk thresholds across distinct market regimes.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setEditingStrategy({
              id: `strat-${Date.now()}`,
              name: 'New Custom Strategy',
              description: 'Custom entry and exit logic configured by trader.',
              riskLevel: 'Medium',
              allocationPct: 10,
              status: 'Active',
              winRate: 65.0,
              historicalRoi: 42.0,
              totalSimulatedTrades: 0,
              maxDrawdown: 10.0,
              entryConditions: {
                minWalletScore: 80,
                minVolumeSpikePct: 150,
                minLiquidityUsd: 500000,
                minBuyerRatio: 1.2,
              },
              exitConditions: {
                stopLossPct: 8.0,
                takeProfitPct: 25.0,
                trailingStopPct: 6.0,
                maxHoldHours: 48,
              },
            });
          }}
          icon={<Plus className="w-4 h-4" />}
        >
          Create Strategy
        </Button>
      </div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map(strat => (
          <div
            key={strat.id}
            className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 shadow-fintech hover:shadow-fintech-hover transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="risk" value={strat.riskLevel} />
                <Badge variant="status" value={strat.status} />
              </div>

              <h3 className="text-base font-bold font-heading text-text-main mb-1">
                {strat.name}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-4 min-h-[36px]">
                {strat.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-border-subtle text-xs font-mono mb-4">
                <div>
                  <span className="text-[10px] text-text-muted uppercase block">Win Rate</span>
                  <span className="font-bold text-financial-positive">{strat.winRate}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase block">Hist ROI</span>
                  <span className="font-bold text-text-main">+{strat.historicalRoi}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase block">Drawdown</span>
                  <span className="font-bold text-financial-negative">-{strat.maxDrawdown}%</span>
                </div>
              </div>

              {/* Conditions summary */}
              <div className="space-y-1.5 text-[11px] text-text-secondary">
                <div className="flex justify-between">
                  <span>Allocation:</span>
                  <span className="font-mono font-semibold text-text-main">{strat.allocationPct}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Stop-Loss / Take-Profit:</span>
                  <span className="font-mono text-text-main">
                    -{strat.exitConditions.stopLossPct}% / +{strat.exitConditions.takeProfitPct}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Max Holding Time:</span>
                  <span className="font-mono text-text-main">
                    {strat.exitConditions.maxHoldHours ? `${strat.exitConditions.maxHoldHours}h` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingStrategy(strat)}
                icon={<Sliders className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Configure
              </Button>
              <Button
                variant={strat.status === 'Active' ? 'ghost' : 'soft'}
                size="sm"
                onClick={() => toggleStrategy(strat.id)}
                className="text-xs font-mono"
              >
                {strat.status === 'Active' ? 'Pause' : 'Activate'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Strategy Editor Modal */}
      {editingStrategy && (
        <Modal
          isOpen={true}
          onClose={() => setEditingStrategy(null)}
          title={`Configure Strategy: ${editingStrategy.name}`}
          subtitle="Define quantitative entry and exit conditions"
          maxWidth="lg"
          footer={
            <>
              <Button variant="secondary" size="md" onClick={() => setEditingStrategy(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" onClick={handleSaveEdit} icon={<Check className="w-4 h-4" />}>
                Save Configuration
              </Button>
            </>
          }
        >
          <form onSubmit={handleSaveEdit} className="space-y-5 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-text-muted mb-1">
                  Strategy Name
                </label>
                <input
                  type="text"
                  value={editingStrategy.name}
                  onChange={e => setEditingStrategy({ ...editingStrategy, name: e.target.value })}
                  className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs text-text-main focus:outline-none focus:border-brand-forest"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-text-muted mb-1">
                  Portfolio Allocation (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={editingStrategy.allocationPct}
                  onChange={e =>
                    setEditingStrategy({
                      ...editingStrategy,
                      allocationPct: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
                />
              </div>
            </div>

            {/* Entry Conditions */}
            <div className="p-4 rounded-fintech bg-bg-subtle/50 border border-border-subtle space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-text-main">
                Entry Triggers
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-text-secondary mb-1">
                    Min Smart Money Score (0-100)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={editingStrategy.entryConditions.minWalletScore || 80}
                    onChange={e =>
                      setEditingStrategy({
                        ...editingStrategy,
                        entryConditions: {
                          ...editingStrategy.entryConditions,
                          minWalletScore: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-text-secondary mb-1">
                    Min Volume Surge (%)
                  </label>
                  <input
                    type="number"
                    min="50"
                    step="25"
                    value={editingStrategy.entryConditions.minVolumeSpikePct || 100}
                    onChange={e =>
                      setEditingStrategy({
                        ...editingStrategy,
                        entryConditions: {
                          ...editingStrategy.entryConditions,
                          minVolumeSpikePct: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main"
                  />
                </div>
              </div>
            </div>

            {/* Exit Conditions */}
            <div className="p-4 rounded-fintech bg-bg-subtle/50 border border-border-subtle space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-text-main">
                Exit & Risk Protection
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-text-secondary mb-1">
                    Stop-Loss (%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    step="0.5"
                    value={editingStrategy.exitConditions.stopLossPct}
                    onChange={e =>
                      setEditingStrategy({
                        ...editingStrategy,
                        exitConditions: {
                          ...editingStrategy.exitConditions,
                          stopLossPct: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-text-secondary mb-1">
                    Take-Profit (%)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="200"
                    step="1"
                    value={editingStrategy.exitConditions.takeProfitPct}
                    onChange={e =>
                      setEditingStrategy({
                        ...editingStrategy,
                        exitConditions: {
                          ...editingStrategy.exitConditions,
                          takeProfitPct: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-text-secondary mb-1">
                    Max Hold Duration (Hours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="360"
                    value={editingStrategy.exitConditions.maxHoldHours || 24}
                    onChange={e =>
                      setEditingStrategy({
                        ...editingStrategy,
                        exitConditions: {
                          ...editingStrategy.exitConditions,
                          maxHoldHours: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main"
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

