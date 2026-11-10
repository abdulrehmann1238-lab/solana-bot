import { BacktestResult, Strategy } from '../types';

export const DEFAULT_BACKTEST_RESULT: BacktestResult = {
  initialCapital: 20000,
  finalCapital: 34840,
  netProfit: 14840,
  netReturnPct: 74.2,
  winRate: 74.65,
  totalTrades: 284,
  winningTrades: 212,
  losingTrades: 72,
  profitFactor: 2.94,
  maxDrawdownPct: 8.4,
  sharpeRatio: 2.68,
  avgTradeReturnPct: 3.84,
  totalFeesPaid: 412.50,
  equityCurve: [
    { date: 'May 01', balance: 20000, drawdown: 0 },
    { date: 'May 15', balance: 21100, drawdown: 1.2 },
    { date: 'May 31', balance: 22480, drawdown: 0.8 },
    { date: 'Jun 15', balance: 24200, drawdown: 2.4 },
    { date: 'Jun 30', balance: 26250, drawdown: 1.1 },
    { date: 'Jul 15', balance: 27100, drawdown: 4.8 },
    { date: 'Jul 31', balance: 28660, drawdown: 2.1 },
    { date: 'Aug 15', balance: 30400, drawdown: 3.5 },
    { date: 'Aug 31', balance: 32800, drawdown: 1.9 },
    { date: 'Sep 15', balance: 32100, drawdown: 8.4 },
    { date: 'Sep 30', balance: 33750, drawdown: 2.8 },
    { date: 'Oct 15', balance: 34200, drawdown: 1.4 },
    { date: 'Oct 31', balance: 34840, drawdown: 0.6 },
  ],
  monthlyReturns: [
    { month: 'May 2026', returnPct: 12.4 },
    { month: 'Jun 2026', returnPct: 16.8 },
    { month: 'Jul 2026', returnPct: 9.2 },
    { month: 'Aug 2026', returnPct: 14.5 },
    { month: 'Sep 2026', returnPct: 4.9 },
    { month: 'Oct 2026', returnPct: 12.4 },
  ],
  tradeDistribution: {
    winPct: 74.6,
    lossPct: 25.4,
  },
};

export interface StrategyComparison {
  name: string;
  netReturnPct: number;
  winRate: number;
  profitFactor: number;
  maxDrawdownPct: number;
  sharpeRatio: number;
  totalTrades: number;
}

export const STRATEGY_COMPARISONS: StrategyComparison[] = [
  {
    name: 'Smart Money Copy',
    netReturnPct: 74.2,
    winRate: 74.6,
    profitFactor: 2.94,
    maxDrawdownPct: 8.4,
    sharpeRatio: 2.68,
    totalTrades: 284,
  },
  {
    name: 'Momentum Breakout',
    netReturnPct: 84.1,
    winRate: 67.8,
    profitFactor: 2.45,
    maxDrawdownPct: 14.2,
    sharpeRatio: 2.15,
    totalTrades: 218,
  },
  {
    name: 'Conservative Accumulation',
    netReturnPct: 32.6,
    winRate: 78.5,
    profitFactor: 3.12,
    maxDrawdownPct: 6.4,
    sharpeRatio: 2.82,
    totalTrades: 89,
  },
  {
    name: 'Volume Surge',
    netReturnPct: 46.8,
    winRate: 63.5,
    profitFactor: 2.18,
    maxDrawdownPct: 12.0,
    sharpeRatio: 1.94,
    totalTrades: 164,
  },
];

