import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { ToastContainer } from '../common/ToastContainer';
import { EmergencyStopModal } from '../modals/EmergencyStopModal';
import { SimulatedSwapModal } from '../modals/SimulatedSwapModal';
import { AddWalletModal } from '../modals/AddWalletModal';
import { WalletDetailDrawer } from '../drawers/WalletDetailDrawer';
import { TokenDetailDrawer } from '../drawers/TokenDetailDrawer';
import { PositionDetailDrawer } from '../drawers/PositionDetailDrawer';
import { TransactionDetailDrawer } from '../drawers/TransactionDetailDrawer';

// Pages
import { LandingPage } from '../../pages/landing/LandingPage';
import { MainDashboard } from '../../pages/dashboard/MainDashboard';
import { SmartMoneyTracker } from '../../pages/smart-money/SmartMoneyTracker';
import { TokenScanner } from '../../pages/tokens/TokenScanner';
import { WalletAnalyticsPage } from '../../pages/analytics/WalletAnalyticsPage';
import { CopyTradingEngine } from '../../pages/copy-trading/CopyTradingEngine';
import { StrategyConfiguration } from '../../pages/strategies/StrategyConfiguration';
import { ExecutionCenter } from '../../pages/execution/ExecutionCenter';
import { PortfolioPositions } from '../../pages/portfolio/PortfolioPositions';
import { TransactionHistory } from '../../pages/history/TransactionHistory';
import { PerformanceAnalytics } from '../../pages/analytics/PerformanceAnalytics';
import { HistoricalBacktesting } from '../../pages/backtesting/HistoricalBacktesting';
import { QuantitativeReportsPage } from '../../pages/analytics/QuantitativeReportsPage';
import { RiskManagementCenter } from '../../pages/risk/RiskManagementCenter';
import { SettingsAndSecurity } from '../../pages/settings/SettingsAndSecurity';

export const AppShell: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedWallet,
    setSelectedWallet,
    selectedToken,
    setSelectedToken,
    selectedPosition,
    setSelectedPosition,
    selectedTransaction,
    setSelectedTransaction,
  } = useTrading();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [swapDefaultTicker, setSwapDefaultTicker] = useState('BONK');
  const [isAddWalletOpen, setIsAddWalletOpen] = useState(false);

  const handleOpenSwap = (ticker?: string) => {
    if (ticker) setSwapDefaultTicker(ticker);
    setIsSwapModalOpen(true);
  };

  // If on landing page, render LandingPage layout directly
  if (activeTab === 'landing') {
    return (
      <>
        <LandingPage
          onLaunchApp={() => setActiveTab('dashboard')}
          onNavigateTab={tab => setActiveTab(tab)}
        />
        <ToastContainer />
      </>
    );
  }

  // Otherwise render Trading App terminal shell
  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary text-text-main selection:bg-brand-softGreen selection:text-brand-forest">
      {/* Collapsible / Responsive Sidebar (250px) */}
      <Sidebar
        onBackToLanding={() => setActiveTab('landing')}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation Bar (68px) */}
        <TopNavbar
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
          onOpenSwapModal={() => handleOpenSwap()}
        />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <MainDashboard onOpenSwap={handleOpenSwap} />}
            {activeTab === 'smart-money' && (
              <SmartMoneyTracker onOpenAddWallet={() => setIsAddWalletOpen(true)} />
            )}
            {activeTab === 'tokens' && <TokenScanner onOpenSwap={handleOpenSwap} />}
            {activeTab === 'wallet-analytics' && <WalletAnalyticsPage />}
            {activeTab === 'copy-trading' && (
              <CopyTradingEngine onOpenAddWallet={() => setIsAddWalletOpen(true)} />
            )}
            {activeTab === 'strategies' && <StrategyConfiguration />}
            {activeTab === 'execution' && <ExecutionCenter onOpenSwap={handleOpenSwap} />}
            {activeTab === 'portfolio' && <PortfolioPositions />}
            {activeTab === 'history' && <TransactionHistory />}
            {activeTab === 'performance' && <PerformanceAnalytics />}
            {activeTab === 'backtesting' && <HistoricalBacktesting />}
            {activeTab === 'reports' && <QuantitativeReportsPage />}
            {activeTab === 'risk' && (
              <RiskManagementCenter onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)} />
            )}
            {activeTab === 'settings' && <SettingsAndSecurity />}
          </div>
        </main>
      </div>

      {/* Interactive Global Modals */}
      <EmergencyStopModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
      <SimulatedSwapModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        defaultTokenTicker={swapDefaultTicker}
      />
      <AddWalletModal
        isOpen={isAddWalletOpen}
        onClose={() => setIsAddWalletOpen(false)}
      />

      {/* Interactive Global Slide-In Drawers */}
      <WalletDetailDrawer
        wallet={selectedWallet}
        onClose={() => setSelectedWallet(null)}
      />
      <TokenDetailDrawer
        token={selectedToken}
        onClose={() => setSelectedToken(null)}
        onOpenSwap={handleOpenSwap}
      />
      <PositionDetailDrawer
        position={selectedPosition}
        onClose={() => setSelectedPosition(null)}
      />
      <TransactionDetailDrawer
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />

      {/* Fixed Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

