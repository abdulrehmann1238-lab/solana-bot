import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useTrading } from '../../context/TradingContext';
import { AlertOctagon, ShieldAlert } from 'lucide-react';

interface EmergencyStopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyStopModal: React.FC<EmergencyStopModalProps> = ({ isOpen, onClose }) => {
  const { triggerEmergencyStop, engineStatus } = useTrading();
  const [reason, setReason] = useState('Manual operator intervention');

  const handleConfirm = () => {
    triggerEmergencyStop(reason);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="EMERGENCY ENGINE HALT"
      subtitle="Immediate termination of automated monitoring & paper order routing"
      maxWidth="md"
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={handleConfirm}
            icon={<AlertOctagon className="w-4 h-4" />}
          >
            Halt All Systems
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="p-4 rounded-fintech bg-rose-50 border border-rose-200 text-xs text-financial-negative flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 text-financial-negative mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold block text-sm mb-1 text-financial-negative">
              Attention: Simulated Emergency Shutdown
            </span>
            Triggering the emergency halt will immediately:
            <ul className="list-disc pl-4 mt-1.5 space-y-1">
              <li>Pause all automated wallet-following algorithms.</li>
              <li>Reject any incoming Jupiter simulated swaps.</li>
              <li>Freeze copy-trading execution pipelines.</li>
              <li>Log an immutable emergency stop event to the demonstration ledger.</li>
            </ul>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-text-secondary mb-1.5 font-medium">
            Shutdown Reason / Audit Note
          </label>
          <input
            type="text"
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs text-text-main focus:outline-none focus:border-brand-forest font-sans"
            placeholder="e.g. Market volatility / manual test"
          />
        </div>

        <p className="text-[11px] text-text-muted font-mono">
          Note: This halts the local demonstration engine. No real blockchain assets or RPC contracts are modified.
        </p>
      </div>
    </Modal>
  );
};

