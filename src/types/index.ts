export type RiskLevel = 'Low' | 'Medium' | 'Elevated' | 'High';

export type SignalType = 'Strong Momentum' | 'Accumulating' | 'Watchlist' | 'High Risk';

export type TradeSide = 'BUY' | 'SELL';

export type OrderStatus = 'Simulated Success' | 'Pending' | 'Rejected (Slippage)' | 'Rejected (Liquidity)' | 'Rejected (Duplicate)' | 'Halted';

export interface Wallet {
  id: string;
  address: string;
  fullAddress: string;
  label?: string;
  rank: number;
  realizedPnl: number;
  unrealizedPnl: number;
  winRate: number; // percentage, e.g. 76.4
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  profitFactor: number;
  avgRoi: number;
  maxDrawdown: number;
  riskScore: RiskLevel;
  status: 'Active' | 'Monitoring' | 'Paused';
  isWatchlisted: boolean;
  isCopied: boolean;
  copyAllocationPct: number;
  copyMinTrade: number;
  copyMaxTrade: number;
  copyBuy: boolean;
  copySell: boolean;
  copyMaxSlippage: number;
  avgHoldDuration: string;
  preferredTokens: string[];
  tradingFrequency: string;
  qualityScore: {
    overall: number; // out of 100
    profitability: number; // out of 25
    consistency: number; // out of 25
    riskAdjusted: number; // out of 20
    tradingHistory: number; // out of 15
    liquidityAwareness: number; // out of 15
  };
  pnlHistory: { timestamp: string; date: string; pnl: number }[];
  recentTransactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  signature: string;
  token: string;
  tokenTicker: string;
  side: TradeSide;
  amount: number;
  tradeValueUsd: number;
  entryPrice: number;
  exitPrice?: number;
  realizedPnl?: number;
  pnlPercentage?: number;
  timestamp: string;
  relativeTime: string;
}

export interface Token {
  id: string;
  name: string;
  ticker: string;
  contractAddress: string;
  price: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  change5m: number;
  change1h: number;
  change24h: number;
  buyers24h: number;
  sellers24h: number;
  buyerRatio: number;
  momentumScore: number; // 0-100
  signal: SignalType;
  riskLevel: RiskLevel;
  riskAssessment: {
    liquidityDepth: 'Deep' | 'Moderate' | 'Shallow';
    holderConcentration: 'Distributed' | 'Moderate' | 'Concentrated';
    largeWalletConcentrationPct: number;
    priceVolatility: 'Low' | 'Moderate' | 'High' | 'Extreme';
    suspiciousFlags: string[];
    riskScoreNum: number; // out of 100
  };
  priceHistory: { timestamp: string; price: number; volume: number }[];
  smartMoneyExposure: {
    walletsCount: number;
    totalTrackedValueUsd: number;
    recentTrend: 'Net Inflow' | 'Net Outflow' | 'Neutral';
  };
}

export interface Position {
  id: string;
  token: string;
  tokenTicker: string;
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  investedValueUsd: number;
  currentValueUsd: number;
  unrealizedPnl: number;
  unrealizedPnlPct: number;
  stopLossPrice: number;
  takeProfitPrice: number;
  trailingStopPct?: number;
  entryDate: string;
  holdingDuration: string;
  status: 'Open' | 'Closed' | 'Exiting';
  strategyName: string;
  copiedFromWallet?: string;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  riskLevel: RiskLevel;
  allocationPct: number;
  status: 'Active' | 'Paused';
  winRate: number;
  historicalRoi: number;
  totalSimulatedTrades: number;
  maxDrawdown: number;
  entryConditions: {
    minWalletScore?: number;
    minVolumeSpikePct?: number;
    minLiquidityUsd?: number;
    minBuyerRatio?: number;
    priceBreakout?: boolean;
    smartMoneyFollow?: boolean;
  };
  exitConditions: {
    stopLossPct: number;
    takeProfitPct: number;
    trailingStopPct?: number;
    maxHoldHours?: number;
    walletExitFollow?: boolean;
  };
}

export interface ExecutionOrder {
  id: string;
  orderId: string;
  timestamp: string;
  token: string;
  tokenTicker: string;
  side: TradeSide;
  inputToken: string;
  inputAmount: number;
  outputToken: string;
  outputAmount: number;
  executionPrice: number;
  slippagePct: number;
  priceImpactPct: number;
  estimatedFeeSol: number;
  status: OrderStatus;
  route: string[];
  walletSource?: string;
  originalTradeValueUsd?: number;
  copyTradeValueUsd?: number;
  lifecycleSteps: {
    step: string;
    description: string;
    status: 'completed' | 'in_progress' | 'failed' | 'pending';
    timestamp: string;
  }[];
}

export interface BacktestConfig {
  strategyId: string;
  strategyName: string;
  dateRange: '1M' | '3M' | '6M' | '1Y';
  startDate: string;
  endDate: string;
  initialCapital: number;
  positionSizing: 'Fixed' | 'Percentage';
  positionSizeValue: number;
  maxPositionSize: number;
  stopLossPct: number;
  takeProfitPct: number;
  tradingFeePct: number;
  slippagePct: number;
  executionDelaySec: number;
}

export interface BacktestResult {
  initialCapital: number;
  finalCapital: number;
  netProfit: number;
  netReturnPct: number;
  winRate: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  profitFactor: number;
  maxDrawdownPct: number;
  sharpeRatio: number;
  avgTradeReturnPct: number;
  totalFeesPaid: number;
  equityCurve: { date: string; balance: number; drawdown: number }[];
  monthlyReturns: { month: string; returnPct: number }[];
  tradeDistribution: { winPct: number; lossPct: number };
}

export interface RiskSettings {
  maxPositionSizeUsd: number;
  maxPortfolioExposurePct: number;
  dailyLossLimitUsd: number;
  maxConcurrentPositions: number;
  maxTokenConcentrationPct: number;
  maxSlippagePct: number;
  minLiquidityUsd: number;
  defaultStopLossPct: number;
  defaultTakeProfitPct: number;
  enableAutoStopLoss: boolean;
  enableAutoTakeProfit: boolean;
  enableTrailingStop: boolean;
  enableDailyLossProtection: boolean;
  enablePositionExposureProtection: boolean;
  enableLowLiquidityRejection: boolean;
  enableExcessiveSlippageRejection: boolean;
}

