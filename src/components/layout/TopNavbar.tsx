import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { SearchInput } from '../common/SearchInput';
import { Button } from '../common/Button';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Menu,
  Shield,
  Activity,
  ChevronDown,
  Layers,
} from 'lucide-react';

interface TopNavbarProps {
  onToggleMobileMenu: () => void;
  onOpenEmergencyModal: () => void;
  onOpenSwapModal: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onToggleMobileMenu,
  onOpenEmergencyModal,
  onOpenSwapModal,
}) => {
  const {
    activeTab,
    isPaperMode,
    setIsPaperMode,
    engineStatus,
    resumeEngine,
    resetDemoData,
    addToast,
    toasts,
  } = useTrading();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return { title: 'Trading Overview', category: 'Overview' };
      case 'smart-money':
        return { title: 'Smart Money Intelligence', category: 'Intelligence' };
      case 'tokens':
        return { title: 'Token Scanner & Momentum', category: 'Intelligence' };
      case 'wallet-analytics':
        return { title: 'Wallet Performance Analytics', category: 'Intelligence' };
      case 'copy-trading':
        return { title: 'Copy Trading Engine', category: 'Trading' };
      case 'strategies':
        return { title: 'Strategy Configuration', category: 'Trading' };
      case 'execution':
        return { title: 'Execution Center', category: 'Trading' };
      case 'portfolio':
        return { title: 'Portfolio & Open Positions', category: 'Portfolio' };
      case 'history':
        return { title: 'Transaction History', category: 'Portfolio' };
      case 'performance':
        return { title: 'Performance Analytics', category: 'Portfolio' };
      case 'backtesting':
        return { title: 'Historical Strategy Backtest', category: 'Analytics' };
      case 'reports':
        return { title: 'Quantitative Reports', category: 'Analytics' };
      case 'risk':
        return { title: 'Risk & Capital Protection', category: 'System' };
      case 'settings':
        return { title: 'Settings & Security', category: 'System' };
      default:
        return { title: 'Solana Bot Terminal', category: 'Terminal' };
    }
  };

  const pageInfo = getPageTitle(activeTab);

  const handleTogglePaperMode = () => {
    addToast({
      title: 'Safety Enforcement',
      message: 'This is a frontend demonstration. Live trading connection is permanently disabled to guarantee zero capital risk.',
      type: 'info',
    });
  };

  return (
    <header className="h-[68px] bg-bg-surface border-b border-border-subtle px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile hamburger + Page Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-text-secondary hover:text-text-main hover:bg-bg-subtle rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
            <span>{pageInfo.category}</span>
            <span>/</span>
            <span className="text-text-secondary">{pageInfo.title}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold font-heading text-text-main leading-tight">
            {pageInfo.title}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Search */}
        <div className="hidden md:block w-48 lg:w-60">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search wallet, token..."
          />
        </div>

        {/* Quick Simulate Swap Action */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenSwapModal}
          icon={<Layers className="w-3.5 h-3.5 text-brand-forest" />}
          className="hidden sm:inline-flex text-xs font-mono font-medium"
        >
          Simulate Swap
        </Button>

        {/* Network indicator: Solana */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-fintech-sm bg-bg-subtle border border-border-subtle text-xs font-mono text-text-main">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Solana</span>
          <span className="text-[10px] text-text-muted">(Simulated)</span>
        </div>

        {/* PAPER MODE Toggle */}
        <div
          onClick={handleTogglePaperMode}
          className="flex items-center gap-2 px-2.5 py-1 rounded-fintech-sm bg-brand-softGreen border border-brand-sage/30 text-brand-forest cursor-pointer select-none hover:bg-emerald-100/70 transition-colors"
          title="Paper Mode is enforced for demonstration"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-forest" />
          <span className="text-xs font-mono font-bold">PAPER MODE</span>
        </div>

        {/* Emergency Stop / Status */}
        {engineStatus === 'HALTED' ? (
          <Button
            variant="danger"
            size="sm"
            onClick={resumeEngine}
            className="text-xs animate-pulse font-mono font-semibold"
          >
            HALTED (RESUME)
          </Button>
        ) : (
          <Button
            variant="danger-outline"
            size="sm"
            onClick={onOpenEmergencyModal}
            className="text-xs font-mono"
          >
            Emergency Stop
          </Button>
        )}

        {/* Reset Demo Data Button */}
        <button
          onClick={resetDemoData}
          title="Reset demonstration data to default state"
          className="p-2 text-text-muted hover:text-text-main hover:bg-bg-subtle rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-text-secondary hover:text-text-main hover:bg-bg-subtle rounded-lg relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-forest" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-bg-surface border border-border-subtle rounded-fintech-lg shadow-fintech-modal p-4 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-subtle">
                <span className="text-xs font-bold font-heading text-text-main uppercase">
                  Simulated Alerts
                </span>
                <span className="text-[10px] font-mono text-text-muted">Live Stream</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-bg-subtle text-text-secondary">
                  <span className="font-semibold text-text-main block">Whale Alert: 7xKp...92Qa</span>
                  Simulated swap detected: 24,000 SOLCAT ($988.80)
                </div>
                <div className="p-2 rounded bg-bg-subtle text-text-secondary">
                  <span className="font-semibold text-text-main block">Risk Engine Verified</span>
                  Slippage & liquidity checked on all 8 open positions.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

