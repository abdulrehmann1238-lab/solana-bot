import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
  icon?: React.ReactNode;
  sparklineData?: number[];
  demoLabel?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  subtext,
  icon,
  sparklineData,
  demoLabel = true,
}) => {
  // Generate a minimal SVG sparkline if data provided
  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length < 2) return null;
    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    const range = max - min || 1;
    const width = 80;
    const height = 28;

    const points = sparklineData
      .map((val, i) => {
        const x = (i / (sparklineData.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isPositive === undefined ? '#769584' : isPositive ? '#388568' : '#C46C68';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-fintech p-5 shadow-fintech hover:shadow-fintech-hover transition-all duration-200 relative group">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-center gap-1.5">
          {icon && <span className="text-text-muted">{icon}</span>}
          {demoLabel && (
            <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-bg-subtle text-text-muted">
              SIMULATED
            </span>
          )}
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <div className="text-2xl font-semibold text-text-main font-heading tracking-tight tabular-nums">
          {value}
        </div>
        {renderSparkline()}
      </div>

      {(change || subtext) && (
        <div className="mt-2.5 flex items-center gap-2 text-xs">
          {change && (
            <span
              className={`font-medium tabular-nums px-1.5 py-0.5 rounded ${
                isPositive === true
                  ? 'text-financial-positive bg-emerald-50'
                  : isPositive === false
                  ? 'text-financial-negative bg-rose-50'
                  : 'text-text-secondary bg-bg-subtle'
              }`}
            >
              {change}
            </span>
          )}
          {subtext && <span className="text-text-secondary">{subtext}</span>}
        </div>
      )}
    </div>
  );
};

