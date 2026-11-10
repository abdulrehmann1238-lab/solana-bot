import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Activity, Users } from 'lucide-react';

export const IntelligenceStrip: React.FC = () => {
  const [counts, setCounts] = useState({
    wallets: 0,
    tokens: 0,
    signals: 0,
    executionRate: 0,
  });

  useEffect(() => {
    // Smooth counter animation
    const duration = 1600;
    const start = Date.now();

    const targets = {
      wallets: 1284,
      tokens: 342,
      signals: 86,
      executionRate: 98.4,
    };

    const interval = setInterval(() => {
      const progress = Math.min(1, (Date.now() - start) / duration);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts({
        wallets: Math.round(targets.wallets * ease),
        tokens: Math.round(targets.tokens * ease),
        signals: Math.round(targets.signals * ease),
        executionRate: Number((targets.executionRate * ease).toFixed(1)),
      });

      if (progress >= 1) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-bg-surface/90 border border-border-subtle rounded-fintech-lg p-5 shadow-fintech backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-border-subtle/80 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-financial-positive animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-text-secondary font-medium">
              Live Intelligence Engine
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-subtle text-text-muted border border-border-subtle font-medium">
              DEMO DATA — ILLUSTRATIVE METRICS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-border-subtle">
          <div className="pt-2 sm:pt-0 sm:px-4 first:pl-0">
            <div className="flex items-center gap-2 text-text-muted mb-1 justify-center sm:justify-start">
              <Users className="w-4 h-4 text-brand-forest" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Tracked Wallets
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-heading text-text-main tabular-nums">
              {counts.wallets.toLocaleString()}
            </div>
            <p className="text-[11px] text-text-secondary mt-0.5">Top Solana traders</p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4">
            <div className="flex items-center gap-2 text-text-muted mb-1 justify-center sm:justify-start">
              <Activity className="w-4 h-4 text-brand-sage" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Monitored Tokens
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-heading text-text-main tabular-nums">
              {counts.tokens.toLocaleString()}
            </div>
            <p className="text-[11px] text-text-secondary mt-0.5">Scanned for liquidity & momentum</p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4">
            <div className="flex items-center gap-2 text-text-muted mb-1 justify-center sm:justify-start">
              <Zap className="w-4 h-4 text-brand-blueGray" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Signals Today
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-heading text-text-main tabular-nums">
              {counts.signals.toLocaleString()}
            </div>
            <p className="text-[11px] text-text-secondary mt-0.5">Simulated algorithm matches</p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4">
            <div className="flex items-center gap-2 text-text-muted mb-1 justify-center sm:justify-start">
              <ShieldCheck className="w-4 h-4 text-financial-positive" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Simulated Success
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-heading text-financial-positive tabular-nums">
              {counts.executionRate}%
            </div>
            <p className="text-[11px] text-text-secondary mt-0.5">Slippage & route satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

