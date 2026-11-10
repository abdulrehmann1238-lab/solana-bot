import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../../components/common/Button';
import { Tabs } from '../../components/common/Tabs';
import { Badge } from '../../components/common/Badge';
import { formatCurrency } from '../../utils/formatters';
import {
  Settings,
  Shield,
  KeyRound,
  Network,
  RotateCcw,
  Sliders,
  Check,
  ExternalLink,
  Layers,
  Database,
} from 'lucide-react';

export const SettingsAndSecurity: React.FC = () => {
  const {
    riskSettings,
    updateRiskSettings,
    resetDemoData,
    addToast,
  } = useTrading();

  const [activeSubTab, setActiveSubTab] = useState<string>('general');
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState('UTC');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);

  const subTabs = [
    { id: 'general', label: 'General' },
    { id: 'trading', label: 'Trading Engine' },
    { id: 'risk', label: 'Risk Limits' },
    { id: 'security', label: 'Security Architecture' },
    { id: 'integrations', label: 'Integrations & RPC' },
  ];

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Preferences Saved',
      message: 'General workspace and display settings updated.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Settings & Security Architecture
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Configure terminal preferences, simulated trading defaults, and review system signing boundaries.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={resetDemoData}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Reset Demo Data
        </Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={subTabs} activeTab={activeSubTab} onChange={setActiveSubTab} />

      {/* GENERAL TAB */}
      {activeSubTab === 'general' && (
        <form
          onSubmit={handleSaveGeneral}
          className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 shadow-fintech space-y-5 max-w-2xl"
        >
          <h3 className="text-sm font-bold font-heading text-text-main uppercase tracking-wider">
            Display & Regional Preferences
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">
                Display Currency
              </label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs text-text-main focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="SOL">SOL (◎)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">
                Timezone Formatting
              </label>
              <select
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs text-text-main focus:outline-none"
              >
                <option value="UTC">UTC (Universal)</option>
                <option value="LOCAL">Local Browser Time</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-border-subtle text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={e => setEmailAlerts(e.target.checked)}
                className="rounded text-brand-forest"
              />
              <span className="text-text-main">
                Display toast notifications for smart money signals
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={e => setSoundAlerts(e.target.checked)}
                className="rounded text-brand-forest"
              />
              <span className="text-text-main">
                Play subtle auditory tone on order fill
              </span>
            </label>
          </div>

          <div className="pt-2">
            <Button variant="primary" size="sm" type="submit">
              Save Preferences
            </Button>
          </div>
        </form>
      )}

      {/* TRADING ENGINE TAB */}
      {activeSubTab === 'trading' && (
        <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 shadow-fintech space-y-4 max-w-2xl text-xs">
          <h3 className="text-sm font-bold font-heading text-text-main uppercase tracking-wider">
            Trading Defaults & Execution Rules
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">
                Default Paper Position Sizing ($ USD)
              </label>
              <input
                type="number"
                defaultValue={250}
                className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">
                Simulated Execution Priority Fee (Micro-Lamports)
              </label>
              <input
                type="number"
                defaultValue={50000}
                className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
              />
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              addToast({
                title: 'Trading Defaults Updated',
                message: 'Saved new simulated trade defaults.',
                type: 'success',
              })
            }
          >
            Apply Engine Defaults
          </Button>
        </div>
      )}

      {/* RISK TAB */}
      {activeSubTab === 'risk' && (
        <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 shadow-fintech space-y-4 max-w-2xl text-xs">
          <h3 className="text-sm font-bold font-heading text-text-main uppercase tracking-wider">
            Default Protective Guardrails
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-text-muted block text-[11px] mb-1">Stop-Loss Default:</span>
              <span className="font-mono font-bold text-text-main">{riskSettings.defaultStopLossPct}%</span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px] mb-1">Take-Profit Default:</span>
              <span className="font-mono font-bold text-text-main">{riskSettings.defaultTakeProfitPct}%</span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px] mb-1">Max Slippage:</span>
              <span className="font-mono font-bold text-text-main">{riskSettings.maxSlippagePct}%</span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px] mb-1">Max Daily Loss:</span>
              <span className="font-mono font-bold text-text-main">{formatCurrency(riskSettings.dailyLossLimitUsd)}</span>
            </div>
          </div>
          <p className="text-[11px] text-text-muted font-mono pt-2 border-t border-border-subtle">
            To edit all quantitative risk thresholds, visit the Risk Management Center tab.
          </p>
        </div>
      )}

      {/* SECURITY TAB (PRD Section 18: Security Architecture) */}
      {activeSubTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-6 shadow-fintech space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-forest" />
              <h3 className="text-base font-bold font-heading text-text-main">
                Demonstration Security & Key Architecture
              </h3>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed max-w-3xl">
              In this interactive demonstration, zero blockchain private keys or seed phrases are ever requested or stored. The proposed production architecture isolates sensitive transaction-signing entirely away from the frontend client.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-fintech bg-bg-subtle/60 border border-border-subtle text-xs">
                <span className="font-bold text-text-main block mb-1">Key Custody Boundary</span>
                <p className="text-text-secondary leading-relaxed">
                  Keys remain strictly inside a secured Key Management Service (KMS). The web client communicates only via pre-authenticated session tokens.
                </p>
              </div>

              <div className="p-4 rounded-fintech bg-bg-subtle/60 border border-border-subtle text-xs">
                <span className="font-bold text-text-main block mb-1">Restricted Program Signing</span>
                <p className="text-text-secondary leading-relaxed">
                  Production signers are restricted to approved Jupiter swap instruction IDs and token accounts, preventing unauthorized external transfers.
                </p>
              </div>

              <div className="p-4 rounded-fintech bg-bg-subtle/60 border border-border-subtle text-xs">
                <span className="font-bold text-text-main block mb-1">Hard Spending Caps</span>
                <p className="text-text-secondary leading-relaxed">
                  Daily and per-transaction balance limits are verified on the signing node before any transaction signature is generated.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-fintech bg-brand-softGreen/40 border border-brand-sage/20 text-xs font-mono text-brand-forest flex items-center justify-between">
            <span>Security Compliance: Zero Real Asset Risk Enforced</span>
            <span>Frontend Sandbox Active</span>
          </div>
        </div>
      )}

      {/* INTEGRATIONS TAB */}
      {activeSubTab === 'integrations' && (
        <div className="space-y-4">
          <p className="text-xs text-text-secondary">
            External RPC and DEX protocol status indicators. For client demonstration safety, live production endpoints are marked as mock configurations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-fintech-lg bg-bg-surface border border-border-subtle shadow-fintech space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold font-heading text-sm text-text-main">Helius RPC</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-subtle text-text-muted border border-border-subtle">
                  Mock Config
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Sub-second webhook listener for on-chain wallet tracking and signature decoding.
              </p>
              <div className="text-[11px] font-mono text-brand-forest pt-2 border-t border-border-subtle">
                Status: Simulated Stream OK
              </div>
            </div>

            <div className="p-6 rounded-fintech-lg bg-bg-surface border border-border-subtle shadow-fintech space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold font-heading text-sm text-text-main">Solana Mainnet-Beta</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-subtle text-text-muted border border-border-subtle">
                  Mock Config
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Underlying L1 ledger state simulation for account balances and SPL token accounts.
              </p>
              <div className="text-[11px] font-mono text-financial-positive pt-2 border-t border-border-subtle">
                Status: Paper Sandbox Active
              </div>
            </div>

            <div className="p-6 rounded-fintech-lg bg-bg-surface border border-border-subtle shadow-fintech space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold font-heading text-sm text-text-main">Jupiter DEX Router</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-subtle text-text-muted border border-border-subtle">
                  Mock Config
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Quote generation and simulated multi-hop routing across Whirlpools, Meteora and Raydium.
              </p>
              <div className="text-[11px] font-mono text-brand-forest pt-2 border-t border-border-subtle">
                Status: Simulated Quoting OK
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
