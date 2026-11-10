import React, { useState, useEffect } from 'react';

const MESSAGES = [
  'Initializing trading intelligence...',
  'Preparing market analytics...',
  'Loading smart money modules...',
  'Connecting demonstration environment...',
  'Preparing your workspace...',
];

interface PremiumLoaderProps {
  onComplete: () => void;
}

export const PremiumLoader: React.FC<PremiumLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Total duration ~2.2s
    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      const msgIdx = Math.min(
        MESSAGES.length - 1,
        Math.floor((currentProgress / 100) * MESSAGES.length)
      );
      setMessageIndex(msgIdx);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 400); // smooth fade out
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary transition-opacity duration-400 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle faint grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#202923 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Solana-inspired geometric orbit icon */}
        <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
          {/* Orbital path ring */}
          <div className="absolute inset-0 rounded-full border border-brand-sage/20 border-dashed animate-[spin_10s_linear_infinite]" />
          
          {/* Moving orbit dots */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="w-2 h-2 rounded-full bg-brand-forest absolute -top-1 left-1/2 -translate-x-1/2 shadow-sm" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-sage absolute -bottom-0.5 left-1/2 -translate-x-1/2 opacity-70" />
          </div>
          <div className="absolute inset-1 animate-[spin_6s_linear_infinite_reverse]">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blueGray absolute top-1/2 -left-0.5 -translate-y-1/2 opacity-80" />
          </div>

          {/* Central geometric mark */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-forest to-brand-forestDark flex items-center justify-center shadow-fintech">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 17l6-6 4 4 6-6" />
              <path d="M14 5h6v6" />
            </svg>
          </div>
        </div>

        {/* Wordmark */}
        <h1 className="text-xl font-bold tracking-tight text-text-main font-heading">
          SOLANA BOT
        </h1>
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-brand-forest mt-1 font-semibold">
          Smart Money Intelligence
        </p>

        {/* Thin progress bar */}
        <div className="w-48 h-1 bg-border-subtle rounded-full overflow-hidden mt-8 mb-4">
          <div
            className="h-full bg-brand-forest transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Rotating message */}
        <p className="text-xs text-text-secondary font-sans h-5 transition-all duration-200">
          {MESSAGES[messageIndex]}
        </p>

        {/* Demo environment note */}
        <div className="mt-6 flex items-center gap-1.5 text-[10px] text-text-muted font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-forest animate-pulse" />
          <span>Interactive Frontend Demonstration</span>
        </div>
      </div>
    </div>
  );
};

