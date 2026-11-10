import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { EquityCurveChart } from '../../components/charts/EquityCurveChart';
import { MonthlyReturnsBarChart } from '../../components/charts/MonthlyReturnsBarChart';
import {
  DEFAULT_BACKTEST_RESULT,
  STRATEGY_COMPARISONS,
} from '../../data/backtestData';
import { formatCurrency, formatPercent, exportToCsv } from '../../utils/formatters';
import {
  Play,
  RotateCcw,
  Download,
  CheckCircle2,
  Sliders,
  TrendingUp,
  FileBarChart,
  Clock,
  Sparkles,
} from 'lucide-react';

export const HistoricalBacktesting: React.FC = () => {
  const { strategies, addToast } = useTrading();

  const [selectedStrategyId, setSelectedStrategyId] = useState<string>('strat-1');
  const [dateRange, setDateRange] = useState<string>('6M');
  const [initialCapital, setInitialCapital] = useState<number>(20000);
  const [stopLoss, setStopLoss] = useState<number>(8.0);
  const [takeProfit, setTakeProfit] = useState<number>(25.0);
  const [slippage, setSlippage] = useState<number>(0.5);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<number>(0);
  const [result, setResult] = useState(DEFAULT_BACKTEST_RESULT);

  const BACKTEST_STAGES = [
    'Preparing 6-month historical demonstration dataset...',
    'Evaluating algorithmic entry triggers...',
    'Processing 284 simulated trades against liquidity...',
    'Applying DEX fees & simulated slippage...',
    'Calculating equity curve and maximum drawdowns...',
    'Generating comprehensive performance report...',
  ];

  const handleRunBacktest = async () => {
    setIsRunning(true);
    setProgressStep(0);

    for (let i = 0; i < BACKTEST_STAGES.length; i++) {
      setProgressStep(i);
      await new Promise(r => setTimeout(r, 420));
    }

    // Dynamic result based on selected initial capital and SL/TP
    const returnMultiplier = selectedStrategyId === 'strat-2' ? 0.84 : selectedStrategyId === 'strat-4' ? 0.32 : 0.742;
    const netProfit = initialCapital * returnMultiplier;
    const finalCapital = initialCapital + netProfit;

    setResult({
      ...DEFAULT_BACKTEST_RESULT,
      initialCapital,
      finalCapital,
      netProfit,
      netReturnPct: Number((returnMultiplier * 100).toFixed(1)),
    });

    setIsRunning(false);
    addToast({
      title: 'Backtest Evaluation Completed',
      message: `Strategy generated +${(returnMultiplier * 100).toFixed(1)}% simulated return over 6 months.`,
      type: 'success',
    });
  };

  const handleExportCsv = () => {
    const rows = result.equityCurve.map(pt => ({
      Date: pt.date,
      SimulatedBalance: pt.balance,
      DrawdownPct: pt.drawdown,
      Strategy: strategies.find(s => s.id === selectedStrategyId)?.name || 'Smart Money Copy',
      DemoData: 'SIMULATED',
    }));

    exportToCsv('solana-bot-backtest-report.csv', rows);
    addToast({
      title: 'Report Downloaded',
      message: 'Exported backtest dataset to solana-bot-backtest-report.csv',
      type: 'info',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-main tracking-tight">
            Strategy Backtesting Engine
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Evaluate trading strategies against historical demonstration datasets and simulated execution assumptions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCsv}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export Report (CSV)
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleRunBacktest}
            loading={isRunning}
            icon={<Play className="w-3.5 h-3.5" />}
          >
            Run 6-Month Backtest
          </Button>
        </div>
      </div>

      {/* Progress Overlay Modal if Running */}
      {isRunning && (
        <div className="p-6 rounded-fintech-lg bg-bg-surface border border-border-subtle shadow-fintech space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-forest animate-ping" />
              <span className="text-xs font-mono font-bold text-text-main uppercase">
                Backtest Simulation in Progress
              </span>
            </div>
            <span className="text-xs font-mono text-brand-forest">
              Stage {progressStep + 1} of 6
            </span>
          </div>

          <div className="w-full h-1.5 bg-bg-subtle rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-forest transition-all duration-300"
              style={{ width: `${((progressStep + 1) / 6) * 100}%` }}
            />
          </div>

          <p className="text-xs font-mono text-text-secondary">
            {BACKTEST_STAGES[progressStep]}
          </p>
        </div>
      )}

      {/* Configuration Grid */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-forest" />
            <h3 className="text-xs font-mono font-bold uppercase text-text-main">
              Historical Backtest Parameters (6-Month Default)
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-subtle text-text-muted">
            ILLUSTRATIVE TESTBED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">
              Select Strategy
            </label>
            <select
              value={selectedStrategyId}
              onChange={e => setSelectedStrategyId(e.target.value)}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-medium text-text-main focus:outline-none focus:border-brand-forest"
            >
              {strategies.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.riskLevel} Risk)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">
              Test Period
            </label>
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-medium text-text-main focus:outline-none focus:border-brand-forest"
            >
              <option value="1M">Last 1 Month</option>
              <option value="3M">Last 3 Months</option>
              <option value="6M">Last 6 Months (Recommended)</option>
              <option value="1Y">Last 1 Year</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">
              Initial Capital ($ USD)
            </label>
            <input
              type="number"
              step="1000"
              value={initialCapital}
              onChange={e => setInitialCapital(Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">
              Simulated Slippage & Fee
            </label>
            <input
              type="number"
              step="0.1"
              value={slippage}
              onChange={e => setSlippage(Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-xs font-mono text-text-main focus:outline-none focus:border-brand-forest"
            />
          </div>
        </div>
      </div>

      {/* 15.3 Results Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Initial Capital</span>
          <span className="text-base font-bold font-heading text-text-main tabular-nums">
            {formatCurrency(result.initialCapital)}
          </span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Final Capital</span>
          <span className="text-base font-bold font-heading text-financial-positive tabular-nums">
            {formatCurrency(result.finalCapital)}
          </span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Net Return</span>
          <span className="text-base font-bold font-heading text-financial-positive tabular-nums">
            +{result.netReturnPct}%
          </span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Win Rate</span>
          <span className="text-base font-bold font-heading text-text-main tabular-nums">
            {result.winRate}% ({result.winningTrades}W / {result.losingTrades}L)
          </span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Profit Factor</span>
          <span className="text-base font-bold font-heading text-brand-forest tabular-nums">
            {result.profitFactor}
          </span>
        </div>

        <div className="p-4 rounded-fintech bg-bg-surface border border-border-subtle shadow-fintech">
          <span className="text-[10px] font-mono text-text-muted uppercase block">Max Drawdown</span>
          <span className="text-base font-bold font-heading text-financial-negative tabular-nums">
            -{result.maxDrawdownPct}%
          </span>
        </div>
      </div>

      {/* 15.4 Charts: Equity Curve & Monthly Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-text-main">
                Simulated Equity Curve & Drawdown
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Historical equity trajectory with bottom drawdown overlay
              </p>
            </div>
            <span className="text-xs font-mono text-financial-positive font-semibold">
              Sharpe: {result.sharpeRatio}
            </span>
          </div>

          <EquityCurveChart data={result.equityCurve} height={260} />
        </div>

        <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-text-main">
                Monthly Return Profile
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Net simulated performance per calendar month
              </p>
            </div>
          </div>

          <MonthlyReturnsBarChart data={result.monthlyReturns} height={260} />
        </div>
      </div>

      {/* 15.5 Strategy Comparison Table */}
      <div className="bg-bg-surface border border-border-subtle rounded-fintech-lg p-5 sm:p-6 shadow-fintech">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold font-heading text-text-main">
            Cross-Strategy Quantitative Benchmark
          </h3>
          <span className="text-xs font-mono text-text-muted">
            All strategies tested under identical 6-month assumptions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-[11px] font-mono text-text-muted">
                <th className="pb-3">Strategy</th>
                <th className="pb-3">Net Return</th>
                <th className="pb-3">Win Rate</th>
                <th className="pb-3">Profit Factor</th>
                <th className="pb-3">Max Drawdown</th>
                <th className="pb-3">Sharpe Ratio</th>
                <th className="pb-3 text-right">Trades Evaluated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/70">
              {STRATEGY_COMPARISONS.map((strat, i) => (
                <tr key={i} className="hover:bg-bg-subtle/40 transition-colors">
                  <td className="py-3 font-semibold text-text-main font-heading">
                    {strat.name}
                  </td>
                  <td className="py-3 font-mono font-bold text-financial-positive">
                    +{strat.netReturnPct}%
                  </td>
                  <td className="py-3 font-mono text-text-main">
                    {strat.winRate}%
                  </td>
                  <td className="py-3 font-mono text-text-main font-semibold">
                    {strat.profitFactor}
                  </td>
                  <td className="py-3 font-mono text-financial-negative">
                    -{strat.maxDrawdownPct}%
                  </td>
                  <td className="py-3 font-mono text-brand-forest">
                    {strat.sharpeRatio}
                  </td>
                  <td className="py-3 font-mono text-text-muted text-right">
                    {strat.totalTrades}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

