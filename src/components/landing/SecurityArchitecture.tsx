import React from 'react';
import { KeyRound, ShieldCheck, Sliders, AlertOctagon, FileText, CheckCircle2 } from 'lucide-react';

export const SecurityArchitecture: React.FC = () => {
  const protections = [
    {
      title: 'Zero Private Key Exposure',
      description: 'The platform frontend never requests, collects, or stores seed phrases or private keys.',
      icon: <KeyRound className="w-5 h-5 text-brand-forest" />,
    },
    {
      title: 'Isolated Execution Model',
      description: 'Transaction-signing occurs only in an external, isolated signing service with restricted permissions.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-sage" />,
    },
    {
      title: 'Enforced Spending Caps',
      description: 'Strict maximum daily allocations and per-trade ceilings protect simulated and connected balances.',
      icon: <Sliders className="w-5 h-5 text-brand-blueGray" />,
    },
    {
      title: 'Instant Emergency Kill-Switch',
      description: 'Single-click global shutdown instantly halts all automated monitoring and order placement.',
      icon: <AlertOctagon className="w-5 h-5 text-financial-negative" />,
    },
    {
      title: 'Safe Paper-Trading First',
      description: 'Full simulation environment enables strategy validation without exposing any real capital.',
      icon: <CheckCircle2 className="w-5 h-5 text-financial-positive" />,
    },
    {
      title: 'Auditable Execution Ledger',
      description: 'Every signal, rejected trade, and filled order records complete routing and timestamp metadata.',
      icon: <FileText className="w-5 h-5 text-text-secondary" />,
    },
  ];

  return (
    <section id="security" className="py-24 bg-bg-subtle/30 border-t border-border-subtle relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-forest font-semibold bg-brand-softGreen px-3 py-1 rounded-full border border-brand-sage/20">
            Capital Protection
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-main tracking-tight mt-4 mb-4">
            Your Capital. Your Controls. Your Keys.
          </h2>
          <p className="text-base text-text-secondary">
            Demonstration of proposed institutional custody boundaries and defensive algorithmic risk controls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {protections.map((item, idx) => (
            <div
              key={idx}
              className="bg-bg-surface border border-border-subtle rounded-fintech p-6 shadow-fintech hover:shadow-fintech-hover transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-fintech bg-bg-subtle flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold font-heading text-text-main mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Protected Execution Flow Schematic */}
        <div className="mt-12 bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 sm:p-8 shadow-fintech">
          <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-4 flex items-center justify-between">
            <span>Proposed Protected Execution Flow Schematic</span>
            <span className="text-[10px] text-text-muted">Interactive Architectural Model</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-fintech bg-bg-subtle/60 border border-border-subtle">
              <span className="text-xs font-mono text-text-muted block mb-1">01. INGESTION</span>
              <p className="text-xs font-semibold text-text-main">Helius RPC Webhook</p>
              <span className="text-[10px] text-text-secondary">Wallet Signature Detected</span>
            </div>
            <div className="p-4 rounded-fintech bg-bg-subtle/60 border border-border-subtle">
              <span className="text-xs font-mono text-text-muted block mb-1">02. VALIDATION</span>
              <p className="text-xs font-semibold text-text-main">Risk Engine Filter</p>
              <span className="text-[10px] text-financial-positive">Slippage & Liquidity Verified</span>
            </div>
            <div className="p-4 rounded-fintech bg-bg-subtle/60 border border-border-subtle">
              <span className="text-xs font-mono text-text-muted block mb-1">03. ISOLATED SIGNING</span>
              <p className="text-xs font-semibold text-text-main">Restricted Keystore</p>
              <span className="text-[10px] text-brand-forest">Keys Kept Off Dashboard</span>
            </div>
            <div className="p-4 rounded-fintech bg-bg-subtle/60 border border-border-subtle">
              <span className="text-xs font-mono text-text-muted block mb-1">04. ON-CHAIN SETTLE</span>
              <p className="text-xs font-semibold text-text-main">Jupiter Aggregator</p>
              <span className="text-[10px] text-text-secondary">Optimal Solana Swap</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

