import React from 'react';
import { Wallet, Copy, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';

interface PlatformOverviewProps {
  onSelectFeature?: (tab: string) => void;
}

export const PlatformOverview: React.FC<PlatformOverviewProps> = ({ onSelectFeature }) => {
  const cards = [
    {
      id: 'smart-money',
      title: 'Smart Money Tracking',
      description: 'Discover consistently profitable wallets on Solana with quantifiable metrics and behavioral analysis.',
      bullets: [
        'Identify profitable wallets by win rate & ROI',
        'Analyze historical performance & drawdowns',
        'Monitor on-chain buy/sell transactions',
      ],
      icon: <Wallet className="w-6 h-6 text-brand-forest" />,
      tag: 'Rank & Quality Scoring',
      targetTab: 'smart-money',
    },
    {
      id: 'copy-trading',
      title: 'Automated Copy Trading',
      description: 'Mirror top-performing wallets automatically with customizable position sizing and latency protection.',
      bullets: [
        'Follow selected wallets with custom rules',
        'Configure percentage or fixed trade sizing',
        'Simulate automated execution & idempotency',
      ],
      icon: <Copy className="w-6 h-6 text-brand-sage" />,
      tag: 'Jupiter-Style Engine',
      targetTab: 'copy-trading',
    },
    {
      id: 'token-scanner',
      title: 'Momentum Intelligence',
      description: 'Detect high-velocity Solana token opportunities using real-time liquidity, volume, and order flow.',
      bullets: [
        'Detect 5m & 1h volume anomalies',
        'Discover emerging low-cap & blue-chip tokens',
        'Evaluate buyer/seller ratio & concentration',
      ],
      icon: <TrendingUp className="w-6 h-6 text-brand-blueGray" />,
      tag: 'Order Flow Radar',
      targetTab: 'tokens',
    },
    {
      id: 'risk-management',
      title: 'Intelligent Risk Management',
      description: 'Institutional capital preservation protocols designed to safeguard simulated trading equity.',
      bullets: [
        'Configure automated stop-loss & take-profit',
        'Enforce daily loss limits & max exposure',
        'Instant one-click Emergency Shutdown',
      ],
      icon: <ShieldAlert className="w-6 h-6 text-financial-positive" />,
      tag: 'Capital Protection',
      targetTab: 'risk',
    },
  ];

  return (
    <section id="features" className="py-24 bg-bg-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-forest font-semibold bg-brand-softGreen px-3 py-1 rounded-full border border-brand-sage/20">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-main tracking-tight mt-4 mb-4">
            One Intelligence Layer. Complete Trading Control.
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            Engineered for high-conviction Solana trading. Track smart money, evaluate emerging momentum, and manage capital with surgical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => onSelectFeature && onSelectFeature(card.targetTab)}
              className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-8 shadow-fintech hover:shadow-fintech-hover hover:border-brand-sage/40 transition-all duration-200 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-fintech bg-bg-subtle flex items-center justify-center transition-transform group-hover:scale-105">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-bg-subtle text-text-secondary border border-border-subtle">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-text-main group-hover:text-brand-forest transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-text-secondary mt-2 mb-6 leading-relaxed">
                  {card.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-border-subtle/70">
                  {card.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-text-main">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-forest shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 flex items-center justify-between text-xs font-medium text-brand-forest">
                <span>Explore in interactive app</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

