import React, { useState } from 'react';
import { Database, Network, Repeat, Cpu, ShieldAlert, LayoutDashboard, ArrowRight } from 'lucide-react';

export const TechArchitectureDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('trading');

  const nodes = [
    {
      id: 'helius',
      name: 'HELIUS',
      category: 'Data Ingestion',
      icon: <Database className="w-5 h-5 text-brand-forest" />,
      features: ['On-chain indexing', 'Wallet activity webhooks', 'Real-time transaction monitoring'],
      description: 'Ingests sub-second Solana blocks and transaction signatures for high-speed anomaly parsing.',
    },
    {
      id: 'solana',
      name: 'SOLANA',
      category: 'L1 Blockchain',
      icon: <Network className="w-5 h-5 text-brand-sage" />,
      features: ['Blockchain infrastructure', 'Token accounts & balances', 'Transaction lifecycle verification'],
      description: 'Underlying high-throughput ledger state, account rent tracking, and program instruction decoding.',
    },
    {
      id: 'jupiter',
      name: 'JUPITER',
      category: 'Execution Routing',
      icon: <Repeat className="w-5 h-5 text-brand-blueGray" />,
      features: ['DEX swap quote generation', 'Multi-hop route selection', 'Execution architecture & AMM paths'],
      description: 'Calculates optimal liquidity paths across Whirlpools, Raydium CPMM, and Meteora DLMM.',
    },
    {
      id: 'trading',
      name: 'TRADING ENGINE',
      category: 'Signal Processing',
      icon: <Cpu className="w-5 h-5 text-brand-forest" />,
      features: ['Signal processing pipeline', 'Dynamic position sizing', 'Strategy evaluation & idempotency'],
      description: 'Filters incoming whale transactions against active copy rules and validates duplicate transaction prevention.',
    },
    {
      id: 'risk',
      name: 'RISK ENGINE',
      category: 'Capital Protection',
      icon: <ShieldAlert className="w-5 h-5 text-financial-positive" />,
      features: ['Portfolio exposure limits', 'Max slippage enforcement', 'Instant emergency shutdown circuit'],
      description: 'Validates all simulated orders before execution; rejects high-slippage or low-liquidity signals automatically.',
    },
    {
      id: 'dashboard',
      name: 'DASHBOARD',
      category: 'Interface & Analytics',
      icon: <LayoutDashboard className="w-5 h-5 text-text-main" />,
      features: ['Real-time portfolio metrics', 'Interactive backtesting UI', 'Strategy configuration controls'],
      description: 'Unified operational surface presenting wallet metrics, token scans, orders, and historical reports.',
    },
  ];

  const activeNodeData = nodes.find(n => n.id === activeNode) || nodes[3];

  return (
    <section id="architecture" className="py-24 bg-bg-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-forest font-semibold bg-brand-softGreen px-3 py-1 rounded-full border border-brand-sage/20">
            System Topology
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-main tracking-tight mt-4 mb-4">
            Technical Architecture Visualization
          </h2>
          <p className="text-base text-text-secondary">
            Modular architecture designed for low-latency signal discovery, robust slippage verification, and isolated execution.
          </p>
        </div>

        {/* Interactive Architecture Grid */}
        <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 sm:p-10 shadow-fintech">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {nodes.map(node => {
              const isSelected = activeNode === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className={`p-6 rounded-fintech border transition-all duration-200 cursor-pointer text-left relative ${
                    isSelected
                      ? 'bg-brand-softGreen/30 border-brand-forest shadow-fintech-hover ring-1 ring-brand-forest/30'
                      : 'bg-bg-primary/50 border-border-subtle hover:bg-bg-subtle/50 hover:border-brand-sage/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary px-2 py-0.5 rounded bg-bg-surface border border-border-subtle">
                      {node.category}
                    </span>
                    <div className="p-2 rounded-lg bg-bg-surface border border-border-subtle">
                      {node.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-bold font-heading text-text-main mb-1">
                    {node.name}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-2 mb-4">
                    {node.description}
                  </p>

                  <div className="space-y-1.5 border-t border-border-subtle/60 pt-3">
                    {node.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-text-main font-mono">
                        <span className="w-1 h-1 rounded-full bg-brand-forest" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {isSelected && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-forest rotate-45 rounded-sm md:block hidden -z-10" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Detailed Inspector Strip */}
          <div className="mt-8 p-5 rounded-fintech bg-bg-subtle/70 border border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-financial-positive animate-pulse shrink-0" />
              <div>
                <span className="text-xs font-mono font-bold text-text-main uppercase mr-2">
                  Active Layer: {activeNodeData.name}
                </span>
                <span className="text-xs text-text-secondary">
                  {activeNodeData.description}
                </span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-text-muted shrink-0">
              Architecture Model: Mock Demonstration
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

