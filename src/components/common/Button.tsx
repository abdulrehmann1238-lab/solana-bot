import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-outline' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-brand-forest/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 rounded-fintech select-none';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2 gap-2 h-10',
    lg: 'text-base px-5 py-2.5 gap-2.5 h-12',
  }[size];

  const variantClasses = {
    primary:
      'bg-brand-forest hover:bg-brand-forestDark text-white shadow-fintech hover:shadow-fintech-hover border border-brand-forestDark/20',
    secondary:
      'bg-bg-surface hover:bg-bg-subtle text-text-main border border-border-subtle shadow-fintech-sm hover:border-brand-sage/40',
    ghost:
      'bg-transparent hover:bg-bg-subtle text-text-secondary hover:text-text-main border border-transparent',
    danger:
      'bg-financial-negative hover:bg-red-700 text-white shadow-fintech hover:shadow-fintech-hover border border-red-800/20',
    'danger-outline':
      'bg-transparent hover:bg-rose-50 text-financial-negative border border-rose-200 hover:border-rose-300',
    soft:
      'bg-brand-softGreen hover:bg-emerald-100 text-brand-forest border border-brand-sage/20',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

