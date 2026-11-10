import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useTrading } from '../../context/TradingContext';
import { Plus, Wallet as WalletIcon } from 'lucide-react';

interface AddWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddWalletModal: React.FC<AddWalletModalProps> = ({ isOpen, onClose }) => {
  const { addWallet } = useTrading();

  const [address, setAddress] = useState('');
  const [label, setLabel] = useState('');
  const [allocationPct, setAllocationPct] = useState<number>(15);
  const [minTrade, setMinTrade] = useState<number>(50);
  const [maxTrade, setMaxTrade] = useState<number>(300);
  const [copyBuy, setCopyBuy] = useState<boolean>(true);
  const [copySell, setCopySell] = useState<boolean>(true);
  const [maxSlippage, setMaxSlippage] = useState<number>(1.5);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setError('Please enter a Solana wallet address');
      return;
    }
    if (address.trim().length < 32) {
      setError('Solana addresses must be at least 32 characters in length (Base58)');
      return;
    }

    addWallet({
      address: `${address.slice(0, 4)}...${address.slice(-4)}`,
      fullAddress: address.trim(),
      label: label.trim() || 'Tracked Whale',
      copyAllocationPct: allocationPct,
      copyMinTrade: minTrade,
      copyMaxTrade: maxTrade,
      copyBuy,
      copySell,
      copyMaxSlippage: maxSlippage,
      isCopied: true,
      isWatchlisted: true,
    });

    // Reset & close
    setAddress('');
    setLabel('');
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Track New Solana Wallet"
      subtitle="Monitor on-chain transactions and configure automated copy trading rules"
      maxWidth="md"
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleSubmit} icon={<Plus className="w-4 h-4" />}>
            Add & Start Tracking
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-fintech bg-rose-50 border border-rose-200 text-xs text-financial-negative">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
            Solana Wallet Address *
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={e => {
              setAddress(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. 7xKp2s8QeF1aMbK9n2YtVuP3zRwE6cX92QaB4vLm8H"
            className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
            Custom Label (Optional)
          </label>
          <input
            type="text"
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="e.g. SOL Whale #1 / Meme Sniper"
            className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs text-text-main focus:outline-none focus:border-brand-forest"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
              Copy Allocation (%)
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={allocationPct}
              onChange={e => setAllocationPct(Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
              Max Slippage (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="5.0"
              value={maxSlippage}
              onChange={e => setMaxSlippage(Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
              Min Trade Size ($)
            </label>
            <input
              type="number"
              min="10"
              value={minTrade}
              onChange={e => setMinTrade(Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
              Max Trade Size ($)
            </label>
            <input
              type="number"
              min="50"
              value={maxTrade}
              onChange={e => setMaxTrade(Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={copyBuy}
              onChange={e => setCopyBuy(e.target.checked)}
              className="rounded border-border-subtle text-brand-forest focus:ring-brand-forest"
            />
            <span className="text-text-main">Copy Buy Signals</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={copySell}
              onChange={e => setCopySell(e.target.checked)}
              className="rounded border-border-subtle text-brand-forest focus:ring-brand-forest"
            />
            <span className="text-text-main">Copy Sell Signals</span>
          </label>
        </div>
      </form>
    </Modal>
  );
};

