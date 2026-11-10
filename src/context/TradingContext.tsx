import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Wallet,
  Token,
  Position,
  Strategy,
  ExecutionOrder,
  RiskSettings,
  OrderStatus,
} from '../types';
import { INITIAL_WALLETS } from '../data/wallets';
import { INITIAL_TOKENS } from '../data/tokens';
import { INITIAL_POSITIONS } from '../data/positions';
import { INITIAL_STRATEGIES } from '../data/strategies';
import { INITIAL_TRANSACTIONS } from '../data/transactions';
import { INITIAL_RISK_SETTINGS } from '../data/riskSettings';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: Date;
}

export interface ActivityFeedItem {
  id: string;
  walletAddress: string;
  walletLabel?: string;
  action: 'BOUGHT' | 'SOLD' | 'ACCUMULATED';
  tokenTicker: string;
  tokenName: string;
  tradeValueUsd: number;
  relativeTime: string;
  timestamp: string;
}

interface TradingContextType {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Paper mode / Engine status
  isPaperMode: boolean;
  setIsPaperMode: (mode: boolean) => void;
  engineStatus: 'ACTIVE' | 'HALTED' | 'PAUSED';
  setEngineStatus: (status: 'ACTIVE' | 'HALTED' | 'PAUSED') => void;

  // Portfolio
  portfolioBalance: number;
  availableBalance: number;
  realizedPnl: number;
  unrealizedPnl: number;
  activePositionsCount: number;

  // Data
  wallets: Wallet[];
  tokens: Token[];
  positions: Position[];
  strategies: Strategy[];
  transactions: ExecutionOrder[];
  riskSettings: RiskSettings;
  activityFeed: ActivityFeedItem[];

  // Selected Entities for detail modal / view
  selectedWallet: Wallet | null;
  setSelectedWallet: (wallet: Wallet | null) => void;
  selectedToken: Token | null;
  setSelectedToken: (token: Token | null) => void;
  selectedTransaction: ExecutionOrder | null;
  setSelectedTransaction: (tx: ExecutionOrder | null) => void;
  selectedPosition: Position | null;
  setSelectedPosition: (pos: Position | null) => void;

  // Actions
  toggleWatchlist: (walletId: string) => void;
  toggleCopyTrading: (walletId: string) => void;
  updateWalletSettings: (walletId: string, settings: Partial<Wallet>) => void;
  addWallet: (wallet: Partial<Wallet>) => void;
  removeWallet: (walletId: string) => void;

  // Positions
  closePosition: (positionId: string, exitPrice?: number) => void;
  partialExitPosition: (positionId: string, pct: number) => void;
  updatePositionLimits: (positionId: string, stopLoss: number, takeProfit: number, trailingStop?: number) => void;

  // Strategies
  toggleStrategy: (strategyId: string) => void;
  updateStrategy: (strategy: Strategy) => void;
  addStrategy: (strategy: Omit<Strategy, 'id'>) => void;

  // Swaps & Execution
  executeSimulatedSwap: (
    inputToken: string,
    outputToken: string,
    amount: number,
    slippageTolerance: number
  ) => Promise<ExecutionOrder>;

  // Risk & Emergency
  updateRiskSettings: (settings: Partial<RiskSettings>) => void;
  triggerEmergencyStop: (reason?: string) => void;
  resumeEngine: () => void;

  // Notifications
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;

  // Reset demo
  resetDemoData: () => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const TradingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [isPaperMode, setIsPaperMode] = useState<boolean>(true);
  const [engineStatus, setEngineStatus] = useState<'ACTIVE' | 'HALTED' | 'PAUSED'>('ACTIVE');

  const [portfolioBalance, setPortfolioBalance] = useState<number>(24850.00);
  const [availableBalance, setAvailableBalance] = useState<number>(12450.00);
  const [realizedPnl, setRealizedPnl] = useState<number>(3420.80);

  const [wallets, setWallets] = useState<Wallet[]>(INITIAL_WALLETS);
  const [tokens, setTokens] = useState<Token[]>(INITIAL_TOKENS);
  const [positions, setPositions] = useState<Position[]>(INITIAL_POSITIONS);
  const [strategies, setStrategies] = useState<Strategy[]>(INITIAL_STRATEGIES);
  const [transactions, setTransactions] = useState<ExecutionOrder[]>(INITIAL_TRANSACTIONS);
  const [riskSettings, setRiskSettings] = useState<RiskSettings>(INITIAL_RISK_SETTINGS);

  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<ExecutionOrder | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>([
    {
      id: 'act-1',
      walletAddress: '7xKp...92Qa',
      walletLabel: 'Alpha Accumulator',
      action: 'BOUGHT',
      tokenTicker: 'SOLCAT',
      tokenName: 'Solcat Intelligence',
      tradeValueUsd: 988.8,
      relativeTime: '8m ago',
      timestamp: '05:22:18',
    },
    {
      id: 'act-2',
      walletAddress: '4mRp...81Zb',
      walletLabel: 'Momentum Scalper',
      action: 'SOLD',
      tokenTicker: 'BONK',
      tokenName: 'Bonk',
      tradeValueUsd: 2414.0,
      relativeTime: '26m ago',
      timestamp: '05:04:12',
    },
    {
      id: 'act-3',
      walletAddress: '9aTf...24Lm',
      walletLabel: 'Whale Accumulation',
      action: 'ACCUMULATED',
      tokenTicker: 'JUP',
      tokenName: 'Jupiter',
      tradeValueUsd: 2850.0,
      relativeTime: '1h ago',
      timestamp: '04:30:19',
    },
    {
      id: 'act-4',
      walletAddress: '3kXn...67Yp',
      walletLabel: 'Breakout Trader',
      action: 'BOUGHT',
      tokenTicker: 'WIF',
      tokenName: 'dogwifhat',
      tradeValueUsd: 1036.8,
      relativeTime: '4h ago',
      timestamp: '01:12:00',
    },
  ]);

  // Compute live unrealized P&L from positions
  const unrealizedPnl = positions.reduce((acc, pos) => acc + (pos.currentValueUsd - pos.investedValueUsd), 0);
  const activePositionsCount = positions.filter(p => p.status === 'Open').length;

  const addToast = (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id, timestamp: new Date() }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleWatchlist = (walletId: string) => {
    setWallets(prev =>
      prev.map(w => {
        if (w.id === walletId) {
          const next = !w.isWatchlisted;
          addToast({
            title: next ? 'Added to Watchlist' : 'Removed from Watchlist',
            message: `Wallet ${w.address} watchlist status updated.`,
            type: 'info',
          });
          return { ...w, isWatchlisted: next };
        }
        return w;
      })
    );
  };

  const toggleCopyTrading = (walletId: string) => {
    if (engineStatus === 'HALTED') {
      addToast({
        title: 'Action Blocked',
        message: 'Engine is currently halted. Resume the engine first.',
        type: 'error',
      });
      return;
    }

    setWallets(prev =>
      prev.map(w => {
        if (w.id === walletId) {
          const next = !w.isCopied;
          addToast({
            title: next ? 'Copy Trading Enabled' : 'Copy Trading Paused',
            message: next
              ? `Now mirroring transactions from ${w.address} (${w.copyAllocationPct}% allocation)`
              : `Paused automated copy trades for ${w.address}`,
            type: next ? 'success' : 'warning',
          });
          return { ...w, isCopied: next };
        }
        return w;
      })
    );
  };

  const updateWalletSettings = (walletId: string, settings: Partial<Wallet>) => {
    setWallets(prev =>
      prev.map(w => {
        if (w.id === walletId) {
          addToast({
            title: 'Wallet Settings Updated',
            message: `Configuration saved for ${w.address}`,
            type: 'success',
          });
          return { ...w, ...settings };
        }
        return w;
      })
    );
  };

  const addWallet = (walletData: Partial<Wallet>) => {
    const newWallet: Wallet = {
      id: `wallet-${Date.now()}`,
      address: walletData.address ? `${walletData.address.slice(0, 4)}...${walletData.address.slice(-4)}` : '5zKp...81Qa',
      fullAddress: walletData.fullAddress || walletData.address || '5zKp498fKjLwQa81Zb2Lm9sDuKi3vJ8uRtY5cB24Lm9',
      label: walletData.label || 'Custom Tracked Wallet',
      rank: wallets.length + 1,
      realizedPnl: 14200,
      unrealizedPnl: 850,
      winRate: 68.5,
      totalTrades: 64,
      winningTrades: 44,
      losingTrades: 20,
      profitFactor: 2.4,
      avgRoi: 32.5,
      maxDrawdown: 12.4,
      riskScore: 'Low',
      status: 'Active',
      isWatchlisted: true,
      isCopied: walletData.isCopied ?? true,
      copyAllocationPct: walletData.copyAllocationPct || 10,
      copyMinTrade: walletData.copyMinTrade || 50,
      copyMaxTrade: walletData.copyMaxTrade || 300,
      copyBuy: walletData.copyBuy ?? true,
      copySell: walletData.copySell ?? true,
      copyMaxSlippage: walletData.copyMaxSlippage || 1.5,
      avgHoldDuration: '24h 00m',
      preferredTokens: ['BONK', 'WIF'],
      tradingFrequency: '2-4 trades/day',
      qualityScore: {
        overall: 82,
        profitability: 20,
        consistency: 20,
        riskAdjusted: 16,
        tradingHistory: 13,
        liquidityAwareness: 13,
      },
      pnlHistory: [
        { timestamp: 'Month 1', date: 'Jul', pnl: 2800 },
        { timestamp: 'Month 2', date: 'Aug', pnl: 6500 },
        { timestamp: 'Month 3', date: 'Sep', pnl: 10400 },
        { timestamp: 'Month 4', date: 'Oct', pnl: 14200 },
      ],
      recentTransactions: [],
      ...walletData,
    };

    setWallets(prev => [newWallet, ...prev]);
    addToast({
      title: 'Wallet Added',
      message: `Successfully tracking ${newWallet.address}`,
      type: 'success',
    });
  };

  const removeWallet = (walletId: string) => {
    setWallets(prev => prev.filter(w => w.id !== walletId));
    addToast({
      title: 'Wallet Removed',
      message: 'Wallet removed from tracking directory.',
      type: 'info',
    });
  };

  const closePosition = (positionId: string, exitPrice?: number) => {
    const pos = positions.find(p => p.id === positionId);
    if (!pos) return;

    const actualExit = exitPrice ?? pos.currentPrice;
    const realized = (actualExit - pos.entryPrice) * pos.quantity;

    setPositions(prev => prev.filter(p => p.id !== positionId));
    setPortfolioBalance(prev => prev + realized);
    setAvailableBalance(prev => prev + pos.investedValueUsd + realized);
    setRealizedPnl(prev => prev + realized);

    const newTx: ExecutionOrder = {
      id: `tx-exec-${Date.now()}`,
      orderId: `JUP-SIM-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      token: pos.token,
      tokenTicker: pos.tokenTicker,
      side: 'SELL',
      inputToken: pos.tokenTicker,
      inputAmount: pos.quantity,
      outputToken: 'SOL',
      outputAmount: Number(((pos.quantity * actualExit) / 195).toFixed(3)),
      executionPrice: actualExit,
      slippagePct: 0.25,
      priceImpactPct: 0.05,
      estimatedFeeSol: 0.000005,
      status: 'Simulated Success',
      route: [pos.tokenTicker, 'Jupiter Aggregator', 'SOL'],
      lifecycleSteps: [
        { step: 'Signal Received', description: 'Manual simulated position exit', status: 'completed', timestamp: 'Now' },
        { step: 'Quote Requested', description: 'Optimal exit routing evaluated', status: 'completed', timestamp: 'Now' },
        { step: 'Route Evaluated', description: 'Best execution verified', status: 'completed', timestamp: 'Now' },
        { step: 'Risk Validation', description: 'Valid exit parameters', status: 'completed', timestamp: 'Now' },
        { step: 'Simulated Execution', description: 'Simulated sell order filled', status: 'completed', timestamp: 'Now' },
        { step: 'Position Updated', description: `Realized P&L: ${realized >= 0 ? '+' : ''}$${realized.toFixed(2)}`, status: 'completed', timestamp: 'Now' },
      ],
    };

    setTransactions(prev => [newTx, ...prev]);

    addToast({
      title: 'Position Closed',
      message: `Closed ${pos.tokenTicker} position. Realized: ${realized >= 0 ? '+' : ''}$${realized.toFixed(2)}`,
      type: realized >= 0 ? 'success' : 'warning',
    });
  };

  const partialExitPosition = (positionId: string, pct: number) => {
    const pos = positions.find(p => p.id === positionId);
    if (!pos) return;

    const fraction = pct / 100;
    const closedQty = pos.quantity * fraction;
    const closedInvested = pos.investedValueUsd * fraction;
    const realized = (pos.currentPrice - pos.entryPrice) * closedQty;

    setPositions(prev =>
      prev.map(p => {
        if (p.id === positionId) {
          const remainingQty = p.quantity - closedQty;
          const remainingInvested = p.investedValueUsd - closedInvested;
          const remainingCurrent = remainingQty * p.currentPrice;
          return {
            ...p,
            quantity: remainingQty,
            investedValueUsd: remainingInvested,
            currentValueUsd: remainingCurrent,
            unrealizedPnl: remainingCurrent - remainingInvested,
            unrealizedPnlPct: Number((((p.currentPrice - p.entryPrice) / p.entryPrice) * 100).toFixed(2)),
          };
        }
        return p;
      })
    );

    setPortfolioBalance(prev => prev + realized);
    setAvailableBalance(prev => prev + closedInvested + realized);
    setRealizedPnl(prev => prev + realized);

    addToast({
      title: 'Partial Exit Executed',
      message: `Exited ${pct}% of ${pos.tokenTicker}. Realized: ${realized >= 0 ? '+' : ''}$${realized.toFixed(2)}`,
      type: 'success',
    });
  };

  const updatePositionLimits = (positionId: string, stopLoss: number, takeProfit: number, trailingStop?: number) => {
    setPositions(prev =>
      prev.map(p => {
        if (p.id === positionId) {
          addToast({
            title: 'Limits Updated',
            message: `Updated SL ($${stopLoss}) and TP ($${takeProfit}) for ${p.tokenTicker}`,
            type: 'info',
          });
          return {
            ...p,
            stopLossPrice: stopLoss,
            takeProfitPrice: takeProfit,
            trailingStopPct: trailingStop ?? p.trailingStopPct,
          };
        }
        return p;
      })
    );
  };

  const toggleStrategy = (strategyId: string) => {
    setStrategies(prev =>
      prev.map(s => {
        if (s.id === strategyId) {
          const next = s.status === 'Active' ? 'Paused' : 'Active';
          addToast({
            title: `Strategy ${next}`,
            message: `${s.name} is now ${next.toLowerCase()}.`,
            type: next === 'Active' ? 'success' : 'warning',
          });
          return { ...s, status: next };
        }
        return s;
      })
    );
  };

  const updateStrategy = (updated: Strategy) => {
    setStrategies(prev => prev.map(s => (s.id === updated.id ? updated : s)));
    addToast({
      title: 'Strategy Saved',
      message: `Configuration for ${updated.name} updated successfully.`,
      type: 'success',
    });
  };

  const addStrategy = (newStrat: Omit<Strategy, 'id'>) => {
    const created: Strategy = {
      ...newStrat,
      id: `strat-${Date.now()}`,
    };
    setStrategies(prev => [...prev, created]);
    addToast({
      title: 'New Strategy Created',
      message: `Strategy ${created.name} is ready for deployment.`,
      type: 'success',
    });
  };

  const executeSimulatedSwap = async (
    inputToken: string,
    outputToken: string,
    amount: number,
    slippageTolerance: number
  ): Promise<ExecutionOrder> => {
    if (engineStatus === 'HALTED') {
      throw new Error('Trading engine is currently halted under Emergency Stop.');
    }

    // Determine target token details
    const tokenObj = tokens.find(t => t.ticker === outputToken) || tokens[0];
    const executionPrice = tokenObj.price;
    const estOutput = Number((amount / executionPrice).toFixed(tokenObj.price < 0.01 ? 0 : 2));

    // Slippage protection check from risk settings
    if (slippageTolerance > riskSettings.maxSlippagePct) {
      const rejectedOrder: ExecutionOrder = {
        id: `tx-exec-${Date.now()}`,
        orderId: `JUP-SIM-${Math.floor(10000 + Math.random() * 90000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        token: tokenObj.name,
        tokenTicker: tokenObj.ticker,
        side: 'BUY',
        inputToken,
        inputAmount: amount,
        outputToken,
        outputAmount: estOutput,
        executionPrice,
        slippagePct: slippageTolerance,
        priceImpactPct: 0.12,
        estimatedFeeSol: 0.000005,
        status: 'Rejected (Slippage)',
        route: [inputToken, 'Jupiter Router', outputToken],
        lifecycleSteps: [
          { step: 'Signal Received', description: 'Manual simulated swap request', status: 'completed', timestamp: '00:00.01' },
          { step: 'Quote Requested', description: 'Fetched route quote', status: 'completed', timestamp: '00:00.08' },
          { step: 'Route Evaluated', description: 'Price impact evaluated', status: 'completed', timestamp: '00:00.15' },
          { step: 'Risk Validation', description: `Blocked: Slippage ${slippageTolerance}% exceeds risk threshold ${riskSettings.maxSlippagePct}%`, status: 'failed', timestamp: '00:00.22' },
          { step: 'Simulated Execution', description: 'Execution prevented by risk engine', status: 'failed', timestamp: '00:00.25' },
          { step: 'Position Updated', description: 'No portfolio change', status: 'pending', timestamp: '-' },
        ],
      };
      setTransactions(prev => [rejectedOrder, ...prev]);
      addToast({
        title: 'Order Blocked by Risk Engine',
        message: `Slippage (${slippageTolerance}%) exceeds configured threshold (${riskSettings.maxSlippagePct}%).`,
        type: 'error',
      });
      return rejectedOrder;
    }

    // Normal successful execution
    const newOrder: ExecutionOrder = {
      id: `tx-exec-${Date.now()}`,
      orderId: `JUP-SIM-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      token: tokenObj.name,
      tokenTicker: tokenObj.ticker,
      side: 'BUY',
      inputToken,
      inputAmount: amount,
      outputToken,
      outputAmount: estOutput,
      executionPrice,
      slippagePct: slippageTolerance,
      priceImpactPct: 0.06,
      estimatedFeeSol: 0.000005,
      status: 'Simulated Success',
      route: [inputToken, 'Jupiter DLMM / Whirlpool', outputToken],
      lifecycleSteps: [
        { step: 'Signal Received', description: 'Manual Jupiter-style swap signal', status: 'completed', timestamp: '00:00.02' },
        { step: 'Quote Requested', description: 'Simulated best quote across Solana DEXs', status: 'completed', timestamp: '00:00.12' },
        { step: 'Route Evaluated', description: 'Optimal split route identified', status: 'completed', timestamp: '00:00.21' },
        { step: 'Risk Validation', description: 'Slippage and liquidity limits passed', status: 'completed', timestamp: '00:00.30' },
        { step: 'Simulated Execution', description: 'Paper order settled in memory', status: 'completed', timestamp: '00:00.85' },
        { step: 'Position Updated', description: `Added position: ${estOutput} ${tokenObj.ticker}`, status: 'completed', timestamp: '00:00.95' },
      ],
    };

    setTransactions(prev => [newOrder, ...prev]);

    // Update balances & active position
    const tradeValueUsd = amount; // assuming USD equivalent for demo
    setAvailableBalance(prev => Math.max(0, prev - tradeValueUsd));

    // Check if position already exists for this token
    setPositions(prev => {
      const existing = prev.find(p => p.tokenTicker === tokenObj.ticker && p.status === 'Open');
      if (existing) {
        const newQty = existing.quantity + estOutput;
        const newInvested = existing.investedValueUsd + tradeValueUsd;
        return prev.map(p =>
          p.id === existing.id
            ? {
                ...p,
                quantity: newQty,
                investedValueUsd: newInvested,
                currentValueUsd: newQty * executionPrice,
                unrealizedPnl: (newQty * executionPrice) - newInvested,
              }
            : p
        );
      } else {
        const newPos: Position = {
          id: `pos-${Date.now()}`,
          token: tokenObj.name,
          tokenTicker: tokenObj.ticker,
          entryPrice: executionPrice,
          currentPrice: executionPrice,
          quantity: estOutput,
          investedValueUsd: tradeValueUsd,
          currentValueUsd: tradeValueUsd,
          unrealizedPnl: 0,
          unrealizedPnlPct: 0,
          stopLossPrice: executionPrice * (1 - riskSettings.defaultStopLossPct / 100),
          takeProfitPrice: executionPrice * (1 + riskSettings.defaultTakeProfitPct / 100),
          trailingStopPct: 6.0,
          entryDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
          holdingDuration: 'Just opened',
          status: 'Open',
          strategyName: 'Manual Swap',
        };
        return [newPos, ...prev];
      }
    });

    addToast({
      title: 'Simulated Swap Filled',
      message: `Acquired ${estOutput} ${outputToken} at $${executionPrice}`,
      type: 'success',
    });

    return newOrder;
  };

  const updateRiskSettings = (newSettings: Partial<RiskSettings>) => {
    setRiskSettings(prev => ({ ...prev, ...newSettings }));
    addToast({
      title: 'Risk Parameters Updated',
      message: 'New exposure and risk limits applied across all active strategies.',
      type: 'success',
    });
  };

  const triggerEmergencyStop = (reason?: string) => {
    setEngineStatus('HALTED');
    addToast({
      title: 'EMERGENCY STOP TRIGGERED',
      message: reason || 'Trading engine halted. All simulated automated copy and order execution paused immediately.',
      type: 'error',
    });
  };

  const resumeEngine = () => {
    setEngineStatus('ACTIVE');
    addToast({
      title: 'Engine Resumed',
      message: 'Automated monitoring and copy-trading simulation restored to Active status.',
      type: 'success',
    });
  };

  const resetDemoData = () => {
    setWallets(INITIAL_WALLETS);
    setTokens(INITIAL_TOKENS);
    setPositions(INITIAL_POSITIONS);
    setStrategies(INITIAL_STRATEGIES);
    setTransactions(INITIAL_TRANSACTIONS);
    setRiskSettings(INITIAL_RISK_SETTINGS);
    setPortfolioBalance(24850.00);
    setAvailableBalance(12450.00);
    setRealizedPnl(3420.80);
    setEngineStatus('ACTIVE');
    addToast({
      title: 'Demo Environment Reset',
      message: 'All simulated balances, positions, wallets, and orders have been reset to factory state.',
      type: 'info',
    });
  };

  return (
    <TradingContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isPaperMode,
        setIsPaperMode,
        engineStatus,
        setEngineStatus,
        portfolioBalance,
        availableBalance,
        realizedPnl,
        unrealizedPnl,
        activePositionsCount,
        wallets,
        tokens,
        positions,
        strategies,
        transactions,
        riskSettings,
        activityFeed,
        selectedWallet,
        setSelectedWallet,
        selectedToken,
        setSelectedToken,
        selectedTransaction,
        setSelectedTransaction,
        selectedPosition,
        setSelectedPosition,
        toggleWatchlist,
        toggleCopyTrading,
        updateWalletSettings,
        addWallet,
        removeWallet,
        closePosition,
        partialExitPosition,
        updatePositionLimits,
        toggleStrategy,
        updateStrategy,
        addStrategy,
        executeSimulatedSwap,
        updateRiskSettings,
        triggerEmergencyStop,
        resumeEngine,
        toasts,
        addToast,
        removeToast,
        resetDemoData,
      }}
    >
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = (): TradingContextType => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};

