import { RiskSettings } from '../types';

export const INITIAL_RISK_SETTINGS: RiskSettings = {
  maxPositionSizeUsd: 2500,
  maxPortfolioExposurePct: 65,
  dailyLossLimitUsd: 1500,
  maxConcurrentPositions: 10,
  maxTokenConcentrationPct: 20,
  maxSlippagePct: 1.5,
  minLiquidityUsd: 500000,
  defaultStopLossPct: 8.0,
  defaultTakeProfitPct: 25.0,
  enableAutoStopLoss: true,
  enableAutoTakeProfit: true,
  enableTrailingStop: true,
  enableDailyLossProtection: true,
  enablePositionExposureProtection: true,
  enableLowLiquidityRejection: true,
  enableExcessiveSlippageRejection: true,
};

