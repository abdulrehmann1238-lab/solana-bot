import React from 'react';
import { RiskLevel, SignalType, OrderStatus } from '../../types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'risk' | 'signal' | 'status' | 'demo' | 'neutral' | 'positive' | 'negative' | 'warning';
  value?: RiskLevel | SignalType | OrderStatus | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  value,
  size = 'sm',
  className = '',
}) => {
  const content = children || value;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  let colorClasses = 'bg-bg-subtle text-text-secondary border-border-subtle';

  if (variant === 'demo') {
    colorClasses = 'bg-brand-softGreen text-brand-forest border-brand-sage/30 font-medium tracking-wide';
  } else if (variant === 'risk') {
    switch (value) {
      case 'Low':
        colorClasses = 'bg-emerald-50 text-financial-positive border-emerald-200/60';
        break;
      case 'Medium':
      case 'Moderate':
        colorClasses = 'bg-amber-50 text-financial-warning border-amber-200/60';
        break;
      case 'Elevated':
      case 'High':
        colorClasses = 'bg-rose-50 text-financial-negative border-rose-200/60';
        break;
      default:
        colorClasses = 'bg-bg-subtle text-text-secondary border-border-subtle';
    }
  } else if (variant === 'signal') {
    switch (value) {
      case 'Strong Momentum':
        colorClasses = 'bg-emerald-50 text-financial-positive border-emerald-200/80 font-semibold';
        break;
      case 'Accumulating':
        colorClasses = 'bg-bg-softBlue text-brand-blueGray border-slate-200 font-medium';
        break;
      case 'Watchlist':
        colorClasses = 'bg-bg-subtle text-text-secondary border-border-subtle font-medium';
        break;
      case 'High Risk':
        colorClasses = 'bg-rose-50 text-financial-negative border-rose-200 font-semibold';
        break;
      default:
        colorClasses = 'bg-bg-subtle text-text-secondary border-border-subtle';
    }
  } else if (variant === 'status') {
    switch (value) {
      case 'Active':
      case 'Open':
      case 'Simulated Success':
        colorClasses = 'bg-emerald-50 text-financial-positive border-emerald-200/70';
        break;
      case 'Monitoring':
      case 'Pending':
        colorClasses = 'bg-bg-softBlue text-brand-blueGray border-slate-200';
        break;
      case 'Paused':
      case 'Exiting':
        colorClasses = 'bg-amber-50 text-financial-warning border-amber-200';
        break;
      case 'Halted':
      case 'Closed':
      case 'Rejected (Slippage)':
      case 'Rejected (Liquidity)':
      case 'Rejected (Duplicate)':
        colorClasses = 'bg-rose-50 text-financial-negative border-rose-200';
        break;
      default:
        colorClasses = 'bg-bg-subtle text-text-secondary border-border-subtle';
    }
  } else if (variant === 'positive') {
    colorClasses = 'bg-emerald-50 text-financial-positive border-emerald-200/70';
  } else if (variant === 'negative') {
    colorClasses = 'bg-rose-50 text-financial-negative border-rose-200/70';
  } else if (variant === 'warning') {
    colorClasses = 'bg-amber-50 text-financial-warning border-amber-200/70';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono transition-colors ${sizeClasses} ${colorClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {content}
    </span>
  );
};

