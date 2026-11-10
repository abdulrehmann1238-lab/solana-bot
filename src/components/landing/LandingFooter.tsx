import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';

interface LandingFooterProps {
  onLaunchApp: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onLaunchApp }) => {
  return (
    <footer className="bg-bg-subtle border-t border-border-subtle pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Final CTA Banner */}
        <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-8 sm:p-12 shadow-fintech mb-16 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-forest font-semibold bg-brand-softGreen px-3 py-1 rounded-full border border-brand-sage/20">
              Interactive Trading Demonstration
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-main tracking-tight mt-4 mb-3">
              Smarter Signals. Disciplined Execution.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
              Explore a unified environment for Solana smart-money intelligence, automated trading strategies, and portfolio risk management.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onLaunchApp}
                icon={<ArrowUpRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Explore Trading Platform
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border-subtle">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-fintech bg-brand-forest flex items-center justify-center text-white">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M4 17l6-6 4 4 6-6" />
                  <path d="M14 5h6v6" />
                </svg>
              </div>
              <span className="font-heading font-bold text-lg text-text-main tracking-tight">
                SOLANA BOT
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed max-w-sm mb-4">
              Institutional-grade Solana smart money tracking, token momentum radar, and automated paper copy trading platform.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-bg-surface border border-border-subtle text-[11px] font-mono text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-financial-positive" />
              <span>Demonstration Environment • No Live Keys Required</span>
            </div>
          </div>

          {/* Platform Nav */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-main font-semibold mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li>
                <button onClick={onLaunchApp} className="hover:text-text-main transition-colors">
                  Smart Money Tracker
                </button>
              </li>
              <li>
                <button onClick={onLaunchApp} className="hover:text-text-main transition-colors">
                  Token Momentum Scanner
                </button>
              </li>
              <li>
                <button onClick={onLaunchApp} className="hover:text-text-main transition-colors">
                  Automated Copy Trading
                </button>
              </li>
              <li>
                <button onClick={onLaunchApp} className="hover:text-text-main transition-colors">
                  Jupiter Execution Center
                </button>
              </li>
              <li>
                <button onClick={onLaunchApp} className="hover:text-text-main transition-colors">
                  Historical Backtesting
                </button>
              </li>
            </ul>
          </div>

          {/* Custom System Inquiry */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-main font-semibold mb-4">
              Custom Development
            </h4>
            <div className="bg-bg-surface border border-border-subtle rounded-fintech p-4 text-xs">
              <p className="font-medium text-text-main mb-1">
                Have a Trading System in Mind?
              </p>
              <p className="text-text-secondary mb-3 leading-relaxed">
                Let's Build It. Custom Solana bots, sub-second Helius pipelines, and Jupiter routing architecture.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={onLaunchApp}
                className="w-full text-xs font-mono"
              >
                Explore System Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            © {new Date().getFullYear()} SOLANA BOT. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Frontend Demonstration</span>
            <span>•</span>
            <span>Simulated Data Layer</span>
            <span>•</span>
            <span>Zero Blockchain Risk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

