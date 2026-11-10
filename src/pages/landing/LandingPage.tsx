import React from 'react';
import { LandingNav } from '../../components/landing/LandingNav';
import { HeroNetworkCanvas } from '../../components/landing/HeroNetworkCanvas';
import { IntelligenceStrip } from '../../components/landing/IntelligenceStrip';
import { PlatformOverview } from '../../components/landing/PlatformOverview';
import { ProcessFlow } from '../../components/landing/ProcessFlow';
import { TechArchitectureDiagram } from '../../components/landing/TechArchitectureDiagram';
import { SecurityArchitecture } from '../../components/landing/SecurityArchitecture';
import { LandingFooter } from '../../components/landing/LandingFooter';
import { Button } from '../../components/common/Button';
import { ArrowUpRight, ShieldCheck, Zap, Layers } from 'lucide-react';

interface LandingPageProps {
  onLaunchApp: () => void;
  onNavigateTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp, onNavigateTab }) => {
  return (
    <div className="min-h-screen bg-bg-primary text-text-main flex flex-col selection:bg-brand-softGreen selection:text-brand-forest">
      <LandingNav onLaunchApp={onLaunchApp} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden flex flex-col justify-center items-center text-center">
        {/* Animated Custom Canvas Network */}
        <HeroNetworkCanvas />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-softGreen border border-brand-sage/20 text-brand-forest text-xs font-mono font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-financial-positive animate-pulse" />
            <span>SOLANA SMART MONEY RADAR • DEMO ENVIRONMENT</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-text-main tracking-tight max-w-4xl leading-[1.1] mb-6">
            Follow Smart Money.{' '}
            <span className="text-brand-forest block sm:inline">Trade With Intelligence.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            An intelligent Solana trading platform combining profitable wallet tracking, momentum detection, automated copy trading, and advanced execution controls.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Button
              variant="primary"
              size="lg"
              onClick={onLaunchApp}
              icon={<ArrowUpRight className="w-5 h-5" />}
              iconPosition="right"
              className="px-6 text-sm sm:text-base font-semibold shadow-fintech"
            >
              Explore Trading Platform
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 text-sm sm:text-base font-medium"
            >
              Explore How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-text-secondary font-medium">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-forest" />
              <span>Smart Money Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-sage" />
              <span>Jupiter-Powered Execution Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-financial-positive" />
              <span>Risk-First Trading Controls</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Strip directly beneath Hero */}
      <div className="-mt-6 sm:-mt-10 mb-12 relative z-20">
        <IntelligenceStrip />
      </div>

      {/* Platform Overview */}
      <PlatformOverview onSelectFeature={onNavigateTab} />

      {/* How It Works */}
      <ProcessFlow />

      {/* Technology Architecture */}
      <TechArchitectureDiagram />

      {/* Security Architecture */}
      <SecurityArchitecture />

      {/* Footer & Final CTA */}
      <LandingFooter onLaunchApp={onLaunchApp} />
    </div>
  );
};

