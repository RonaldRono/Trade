import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Zap,
  Sparkles,
  Layers,
  Coins
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ASSETS = [
  { name: 'BOOM 1000', multiplier: 1.0, minLot: 0.2, typicalSpike: 120 },
  { name: 'CRASH 1000', multiplier: 1.0, minLot: 0.2, typicalSpike: 110 },
  { name: 'BOOM 500', multiplier: 1.2, minLot: 0.2, typicalSpike: 95 },
  { name: 'CRASH 500', multiplier: 1.2, minLot: 0.2, typicalSpike: 90 },
  { name: 'BOOM 300', multiplier: 1.5, minLot: 0.5, typicalSpike: 140 },
  { name: 'CRASH 300', multiplier: 1.5, minLot: 0.5, typicalSpike: 135 },
  { name: 'PAIN X (Weltrade)', multiplier: 1.1, minLot: 0.1, typicalSpike: 85 },
  { name: 'VOLATILITY 75', multiplier: 0.8, minLot: 0.001, typicalSpike: 250 }
];

const CalculatorPage = () => {
  const [selectedAsset, setSelectedAsset] = useState<string>('BOOM 1000');
  const [lotSize, setLotSize] = useState<number>(1.0);
  const [pointsCaptured, setPointsCaptured] = useState<number>(120);
  const [stopLossTicks, setStopLossTicks] = useState<number>(12);

  const assetInfo = ASSETS.find((a) => a.name === selectedAsset) || ASSETS[0];

  // Calculations
  const grossProfit = Number((lotSize * pointsCaptured * assetInfo.multiplier).toFixed(2));
  const estimatedRisk = Number((lotSize * stopLossTicks * assetInfo.multiplier).toFixed(2));
  const riskReward = (pointsCaptured / Math.max(1, stopLossTicks)).toFixed(1);
  const marginEstimated = Number((lotSize * 25).toFixed(2));

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE SPIKE RISK &amp; PROFIT SIMULATOR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Boom &amp; Crash Profit Calculator
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Calculate your exact projected returns per spike capture, evaluate risk-to-reward metrics, and size your lots like an institutional quantitative fund.
          </p>
        </div>

        {/* 2-Column Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Controls Form */}
          <div className="lg:col-span-7 rounded-3xl bg-card border border-border p-8 shadow-xl space-y-6">
            
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>Position Parameters</span>
            </h2>

            {/* Asset Selection */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">
                Select Synthetic Index:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {ASSETS.map((a) => (
                  <button
                    key={a.name}
                    type="button"
                    onClick={() => {
                      setSelectedAsset(a.name);
                      setPointsCaptured(a.typicalSpike);
                    }}
                    className={`p-3 rounded-2xl border text-center transition ${
                      selectedAsset === a.name
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold'
                        : 'border-border bg-background text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Lot Size Slider & Inputs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-foreground">
                  Trading Lot Size:
                </label>
                <span className="text-sm font-mono font-extrabold text-cyan-400">
                  {lotSize.toFixed(2)} Lots
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="10.0"
                step="0.1"
                value={lotSize}
                onChange={(e) => setLotSize(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-cyan-400"
              />
              {/* Presets */}
              <div className="flex gap-2 mt-2">
                {[0.5, 1.0, 2.0, 5.0, 10.0].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setLotSize(preset)}
                    className="px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-muted text-[11px] font-mono text-muted-foreground hover:text-foreground transition"
                  >
                    {preset.toFixed(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Points Captured Slider & Inputs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-foreground">
                  Spike Points Captured:
                </label>
                <span className="text-sm font-mono font-extrabold text-emerald-400">
                  +{pointsCaptured} Points
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="300"
                step="5"
                value={pointsCaptured}
                onChange={(e) => setPointsCaptured(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Stop Loss Ticks */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-foreground">
                  Stop Loss (Ticks):
                </label>
                <span className="text-sm font-mono font-extrabold text-rose-400">
                  -{stopLossTicks} Ticks
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={stopLossTicks}
                onChange={(e) => setStopLossTicks(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-rose-400"
              />
            </div>

          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 p-8 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="border-b border-slate-800 pb-4">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Projected Spike Outcome
                </div>
                <h3 className="text-xl font-bold text-white mt-1">Calculated Trade Return</h3>
              </div>

              {/* Big Profit Display */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs font-mono text-slate-400">Estimated Spike Profit:</div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                  +${grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Maximum Risk (SL):</div>
                  <div className="text-base font-bold text-rose-400 mt-1">
                    -${estimatedRisk.toFixed(2)}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Risk-to-Reward:</div>
                  <div className="text-base font-bold text-cyan-400 mt-1">
                    1 : {riskReward}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Est. Margin Needed:</div>
                  <div className="text-base font-bold text-white mt-1">
                    ${marginEstimated.toFixed(2)}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Index Weight:</div>
                  <div className="text-base font-bold text-amber-400 mt-1">
                    {assetInfo.multiplier}x Rate
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/terminal" className="w-full block">
                  <Button variant="cyber" className="w-full font-bold text-sm py-4">
                    Test this Setup on Live Terminal
                  </Button>
                </Link>
              </div>

            </div>

            {/* Photo & Tip Card */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl space-y-4">
              <div className="h-40 rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                  alt="Quantitative Risk Engine"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white text-xs font-mono font-bold">
                  Golden Rule: Never Risk Over 3% Per Spike Signal
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                By entering with Prime Spike v3.2 AI signals, our traders consistently hit minimum 1:4 risk-reward ratios with 10 to 14 tick maximum stop-losses.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CalculatorPage;
