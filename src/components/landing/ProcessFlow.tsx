import React from 'react';
import { Compass, LineChart, Cpu, ShieldCheck } from 'lucide-react';

export const ProcessFlow: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Discover',
      tagline: 'Identify High-Conviction Wallets & Emerging Tokens',
      description: 'Continuous algorithmic indexing of Solana wallets to uncover consistent profitability, high win rates, and smart accumulation patterns.',
      icon: <Compass className="w-5 h-5 text-brand-forest" />,
    },
    {
      step: '02',
      title: 'Analyze',
      tagline: 'Evaluate On-Chain Metrics & Liquidity Depth',
      description: 'Deep behavioral analytics: profit factor, max historical drawdowns, liquidity profiles, holder concentration, and buyer/seller ratios.',
      icon: <LineChart className="w-5 h-5 text-brand-sage" />,
    },
    {
      step: '03',
      title: 'Execute',
      tagline: 'Simulate Automated Jupiter-Style Swaps',
      description: 'Optimal route aggregation, automated slippage verification, idempotency locks against duplicate signals, and sub-second simulated routing.',
      icon: <Cpu className="w-5 h-5 text-brand-blueGray" />,
    },
    {
      step: '04',
      title: 'Protect',
      tagline: 'Enforce Rigorous Capital & Exposure Controls',
      description: 'Automated trailing stops, dynamic take-profit tiers, maximum portfolio allocation thresholds, and an instantaneous Emergency Halt switch.',
      icon: <ShieldCheck className="w-5 h-5 text-financial-positive" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-bg-subtle/40 border-y border-border-subtle relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-forest font-semibold bg-brand-softGreen px-3 py-1 rounded-full border border-brand-sage/20">
            Execution Lifecycle
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-main tracking-tight mt-4 mb-4">
            How The Trading System Operates
          </h2>
          <p className="text-base text-text-secondary">
            From raw Solana block events to protected paper execution: an integrated four-stage quantitative pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border-subtle -translate-y-12 z-0" />

          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative z-10 bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 shadow-fintech hover:shadow-fintech-hover transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-brand-softGreen text-brand-forest">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-fintech bg-bg-subtle flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold font-heading text-text-main mb-1">
                  {item.title}
                </h3>
                <h4 className="text-xs font-medium text-brand-forest mb-3">
                  {item.tagline}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-border-subtle/60 text-[10px] font-mono text-text-muted">
                Stage {index + 1} of 4 • Simulated Pipeline
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

