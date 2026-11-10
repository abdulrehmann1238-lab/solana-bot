import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useTrading();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icon = {
          success: <CheckCircle2 className="w-5 h-5 text-financial-positive shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-financial-warning shrink-0" />,
          error: <AlertOctagon className="w-5 h-5 text-financial-negative shrink-0" />,
          info: <Info className="w-5 h-5 text-brand-forest shrink-0" />,
        }[toast.type];

        const borderClass = {
          success: 'border-emerald-200/80 bg-white/95',
          warning: 'border-amber-200/80 bg-white/95',
          error: 'border-rose-200/80 bg-white/95',
          info: 'border-brand-sage/40 bg-white/95',
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-fintech border shadow-fintech-hover backdrop-blur flex items-start gap-3 transition-all duration-200 ${borderClass}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-text-main font-heading leading-tight">
                {toast.title}
              </h4>
              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-text-muted hover:text-text-main p-1 rounded hover:bg-bg-subtle transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

