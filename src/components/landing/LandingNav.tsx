import React, { useState, useEffect } from 'react';
import { useTrading } from '../../context/TradingContext';
import { ArrowUpRight, Menu, X, Shield, Activity, Cpu } from 'lucide-react';
import { Button } from '../common/Button';

interface LandingNavProps {
  onLaunchApp: () => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({ onLaunchApp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-primary/85 backdrop-blur-md border-b border-border-subtle shadow-fintech-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-fintech bg-brand-forest flex items-center justify-center text-white shadow-fintech transition-transform group-hover:scale-105">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 17l6-6 4 4 6-6" />
              <path d="M14 5h6v6" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base text-text-main tracking-tight">
                SOLANA BOT
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-brand-softGreen text-brand-forest font-semibold border border-brand-sage/20">
                DEMO
              </span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary">
              Smart Money Intelligence
            </p>
          </div>
        </div>

        {/* Center Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-text-main transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-text-main transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('architecture')}
            className="hover:text-text-main transition-colors"
          >
            Technology
          </button>
          <button
            onClick={() => scrollToSection('security')}
            className="hover:text-text-main transition-colors"
          >
            Security
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLaunchApp}
            className="text-text-secondary hover:text-text-main font-mono"
          >
            Explore Dashboard
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onLaunchApp}
            icon={<ArrowUpRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Launch App
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={onLaunchApp}>
            Launch
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-secondary hover:text-text-main rounded-lg hover:bg-bg-subtle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bg-surface border-b border-border-subtle p-4 mt-3 shadow-fintech space-y-3">
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-2 text-sm font-medium text-text-secondary hover:text-text-main"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-sm font-medium text-text-secondary hover:text-text-main"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('architecture')}
            className="block w-full text-left py-2 text-sm font-medium text-text-secondary hover:text-text-main"
          >
            Technology
          </button>
          <button
            onClick={() => scrollToSection('security')}
            className="block w-full text-left py-2 text-sm font-medium text-text-secondary hover:text-text-main"
          >
            Security
          </button>
          <div className="pt-2 border-t border-border-subtle flex flex-col gap-2">
            <Button variant="primary" size="md" onClick={onLaunchApp} className="w-full">
              Launch Trading App
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

