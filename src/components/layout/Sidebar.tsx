import React from 'react';
import { useTrading } from '../../context/TradingContext';
import {
  LayoutDashboard,
  Wallet,
  Compass,
  LineChart,
  Copy,
  Cpu,
  Layers,
  PieChart,
  History,
  TrendingUp,
  FileBarChart,
  ShieldAlert,
  Settings,
  AlertOctagon,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  onBackToLanding: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onBackToLanding,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const {
    activeTab,
    setActiveTab,
    engineStatus,
    triggerEmergencyStop,
    wallets,
    positions,
  } = useTrading();

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        {
          id: 'smart-money',
          label: 'Smart Money',
          icon: <Wallet className="w-4 h-4" />,
          badge: wallets.length,
        },
        { id: 'tokens', label: 'Token Scanner', icon: <Compass className="w-4 h-4" /> },
        { id: 'wallet-analytics', label: 'Wallet Analytics', icon: <LineChart className="w-4 h-4" /> },
      ],
    },
    {
      title: 'TRADING',
      items: [
        { id: 'copy-trading', label: 'Copy Trading', icon: <Copy className="w-4 h-4" /> },
        { id: 'strategies', label: 'Strategies', icon: <Cpu className="w-4 h-4" /> },
        { id: 'execution', label: 'Execution Center', icon: <Layers className="w-4 h-4" /> },
      ],
    },
    {
      title: 'PORTFOLIO',
      items: [
        {
          id: 'portfolio',
          label: 'Positions',
          icon: <PieChart className="w-4 h-4" />,
          badge: positions.filter(p => p.status === 'Open').length,
        },
        { id: 'history', label: 'Trade History', icon: <History className="w-4 h-4" /> },
        { id: 'performance', label: 'Performance', icon: <TrendingUp className="w-4 h-4" /> },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        { id: 'backtesting', label: 'Backtesting', icon: <FileBarChart className="w-4 h-4" /> },
        { id: 'reports', label: 'Reports', icon: <TrendingUp className="w-4 h-4" /> },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'risk', label: 'Risk Management', icon: <ShieldAlert className="w-4 h-4" /> },
        { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 w-[250px] bg-bg-surface border-r border-border-subtle flex flex-col justify-between transition-transform duration-200 ease-in-out shrink-0 select-none ${
        isMobileOpen ? 'translate-x-0 shadow-fintech-modal' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-[68px] px-5 flex items-center justify-between border-b border-border-subtle">
          <div
            onClick={onBackToLanding}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-fintech bg-brand-forest flex items-center justify-center text-white shadow-fintech">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 17l6-6 4 4 6-6" />
                <path d="M14 5h6v6" />
              </svg>
            </div>
            <div>
              <span className="font-heading font-bold text-sm tracking-tight text-text-main group-hover:text-brand-forest transition-colors">
                SOLANA BOT
              </span>
              <span className="block text-[9px] font-mono uppercase text-brand-forest tracking-wider font-semibold">
                Smart Money Pro
              </span>
            </div>
          </div>

          <button
            onClick={onBackToLanding}
            title="Return to Landing Page"
            className="text-text-muted hover:text-text-main p-1.5 rounded-md hover:bg-bg-subtle transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Menus */}
        <div className="p-3 overflow-y-auto max-h-[calc(100vh-220px)] space-y-4">
          {navSections.map(section => (
            <div key={section.title}>
              <div className="px-3 py-1 text-[10px] font-mono font-semibold tracking-wider text-text-muted">
                {section.title}
              </div>
              <div className="space-y-0.5 mt-1">
                {section.items.map(item => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-fintech text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-softGreen text-brand-forest font-semibold shadow-fintech-sm'
                          : 'text-text-secondary hover:text-text-main hover:bg-bg-subtle'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-brand-forest' : 'text-text-muted'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                            isActive
                              ? 'bg-brand-forest text-white'
                              : 'bg-bg-subtle text-text-muted'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Status / Profile */}
      <div className="p-3 border-t border-border-subtle bg-bg-surface/50 space-y-2">
        {/* Engine status indicator */}
        <div className="p-2.5 rounded-fintech bg-bg-subtle border border-border-subtle/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                engineStatus === 'ACTIVE'
                  ? 'bg-financial-positive animate-pulse'
                  : engineStatus === 'HALTED'
                  ? 'bg-financial-negative animate-pulse'
                  : 'bg-financial-warning'
              }`}
            />
            <span className="text-[11px] font-mono font-medium text-text-main">
              {engineStatus === 'ACTIVE'
                ? 'Engine: Active'
                : engineStatus === 'HALTED'
                ? 'Engine: HALTED'
                : 'Engine: Paused'}
            </span>
          </div>

          <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-bg-surface text-brand-forest font-semibold border border-brand-sage/20">
            SIMULATED
          </span>
        </div>

        {/* User placeholder */}
        <div className="flex items-center justify-between px-2.5 py-1.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-forest text-white text-[10px] font-mono font-bold flex items-center justify-center">
              SB
            </div>
            <div className="text-left">
              <span className="text-xs font-medium text-text-main block leading-tight">
                Demo Operator
              </span>
              <span className="text-[10px] font-mono text-text-muted">Paper Trader</span>
            </div>
          </div>
          <button
            onClick={onBackToLanding}
            title="Exit App"
            className="text-text-muted hover:text-text-main p-1 hover:bg-bg-subtle rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

