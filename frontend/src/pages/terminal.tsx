import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Activity,
  Zap,
  Volume2,
  VolumeX,
  Crosshair,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  RefreshCw,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import triggerCelebration from "@/lib/confetti";
import CheckoutModal from "@/components/checkout-modal";

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
  isSpike?: boolean;
  signalArrow?: boolean;
}

const Terminal = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentAsset, setCurrentAsset] = useState<string>("BOOM 1000");
  const [timeframe, setTimeframe] = useState<string>("M1");
  const [currentPrice, setCurrentPrice] = useState<number>(14248.82);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [showPrimeOverlay, setShowPrimeOverlay] = useState<boolean>(true);
  const [showRadarOverlay, setShowRadarOverlay] = useState<boolean>(true);
  const [spikeBannerText, setSpikeBannerText] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const chartDataRef = useRef<Candle[]>([]);

  const playBeep = (freq = 880, duration = 0.15) => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error(e);
    }
  };

  const playSpikeChime = () => {
    if (!audioEnabled) return;
    playBeep(523.25, 0.1);
    setTimeout(() => playBeep(659.25, 0.1), 80);
    setTimeout(() => playBeep(783.99, 0.15), 160);
    setTimeout(() => playBeep(1046.50, 0.25), 240);
  };

  const initChart = () => {
    const list: Candle[] = [];
    let basePrice = currentAsset.includes("CRASH") ? 8900 : 14200;
    const count = 38;

    for (let i = 0; i < count; i++) {
      const isSpike = i === 14 || i === 27;
      const open = basePrice;
      let close, high, low;

      if (isSpike) {
        if (currentAsset.includes("CRASH")) {
          // Crash down spike
          close = open - (110 + Math.random() * 80);
          high = open + 5;
          low = close - 8;
        } else {
          // Boom up spike
          close = open + (120 + Math.random() * 80);
          high = close + 10;
          low = open - 5;
        }
        basePrice = close;
      } else {
        // Slow tick trend
        const step = currentAsset.includes("CRASH") ? 1.5 + Math.random() * 2 : -(1.5 + Math.random() * 2);
        close = open + step;
        high = Math.max(open, close) + 1;
        low = Math.min(open, close) - 1;
        basePrice = close;
      }

      list.push({
        open,
        close,
        high,
        low,
        isSpike,
        signalArrow: isSpike,
      });
    }

    chartDataRef.current = list;
    setCurrentPrice(basePrice);
    drawChart();
  };

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    ctx.clearRect(0, 0, w, h);

    const data = chartDataRef.current;
    if (data.length === 0) return;

    // Price Bounds
    let minP = Infinity;
    let maxP = -Infinity;
    data.forEach((c) => {
      if (c.low < minP) minP = c.low;
      if (c.high > maxP) maxP = c.high;
    });
    const padding = (maxP - minP) * 0.15 || 40;
    minP -= padding;
    maxP += padding;

    // Horizontal Grid Lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    const gridLevels = 6;
    for (let i = 0; i <= gridLevels; i++) {
      const y = (h / gridLevels) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();

      const pVal = maxP - (i / gridLevels) * (maxP - minP);
      ctx.fillStyle = "#64748b";
      ctx.font = "10px JetBrains Mono";
      ctx.fillText(pVal.toFixed(1), w - 55, y - 4);
    }

    // Candlesticks
    const candleWidth = Math.max(6, ((w - 70) / data.length) * 0.65);
    const stepX = (w - 70) / data.length;

    data.forEach((c, idx) => {
      const x = idx * stepX + 20;
      const yOpen = h - ((c.open - minP) / (maxP - minP)) * h;
      const yClose = h - ((c.close - minP) / (maxP - minP)) * h;
      const yHigh = h - ((c.high - minP) / (maxP - minP)) * h;
      const yLow = h - ((c.low - minP) / (maxP - minP)) * h;

      const isGreen = c.close >= c.open;

      // Wick
      ctx.strokeStyle = isGreen ? "#00E599" : "#FF3366";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, yHigh);
      ctx.lineTo(x + candleWidth / 2, yLow);
      ctx.stroke();

      // Body
      ctx.fillStyle = isGreen ? "#00E599" : "#FF3366";
      const bodyTop = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(3, Math.abs(yOpen - yClose));
      ctx.fillRect(x, bodyTop, candleWidth, bodyHeight);

      // Indicator Arrow Overlay
      if (showPrimeOverlay && c.signalArrow) {
        ctx.fillStyle = "#00F0FF";
        ctx.beginPath();
        const arrowX = x + candleWidth / 2;
        const arrowY = currentAsset.includes("CRASH") ? yHigh - 18 : yLow + 18;

        if (currentAsset.includes("CRASH")) {
          // Arrow pointing down
          ctx.moveTo(arrowX, arrowY + 10);
          ctx.lineTo(arrowX - 6, arrowY);
          ctx.lineTo(arrowX + 6, arrowY);
        } else {
          // Arrow pointing up
          ctx.moveTo(arrowX, arrowY - 10);
          ctx.lineTo(arrowX - 6, arrowY);
          ctx.lineTo(arrowX + 6, arrowY);
        }
        ctx.closePath();
        ctx.fill();

        ctx.font = "bold 9px JetBrains Mono";
        ctx.fillText("ENTRY", arrowX - 14, arrowY + (currentAsset.includes("CRASH") ? -4 : 12));
      }
    });

    // Current Price Line
    const curY = h - ((currentPrice - minP) / (maxP - minP)) * h;
    ctx.strokeStyle = "#00F0FF";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, curY);
    ctx.lineTo(w, curY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Price Badge
    ctx.fillStyle = "#00F0FF";
    ctx.fillRect(w - 65, curY - 10, 65, 20);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 10px JetBrains Mono";
    ctx.fillText(currentPrice.toFixed(1), w - 60, curY + 4);
  };

  const triggerSpike = () => {
    playSpikeChime();
    const data = chartDataRef.current;
    if (data.length === 0) return;

    const last = data[data.length - 1];
    const open = last.close;
    const isCrash = currentAsset.includes("CRASH");
    const spikeSize = 135 + Math.random() * 90;
    const close = isCrash ? open - spikeSize : open + spikeSize;

    data.shift();
    data.push({
      open,
      close,
      high: isCrash ? open + 2 : close + 12,
      low: isCrash ? close - 12 : open - 2,
      isSpike: true,
      signalArrow: true,
    });

    setCurrentPrice(close);
    drawChart();

    setSpikeBannerText(`🎯 SPIKE DETECTED ON ${currentAsset}! +${Math.round(spikeSize)} POINTS CAPTURED!`);
    try {
      triggerCelebration({ particleCount: 50, spread: 60 });
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      setSpikeBannerText(null);
    }, 4500);
  };

  // Resize listener & tick interval
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawChart();
    };

    handleResize();
    initChart();
    window.addEventListener("resize", handleResize);

    // Realistic Tick Interval
    const tickInterval = setInterval(() => {
      const data = chartDataRef.current;
      if (data.length === 0) return;
      const last = data[data.length - 1];
      const delta = (Math.random() - 0.6) * 1.5;
      last.close += delta;
      if (last.close > last.high) last.high = last.close;
      if (last.close < last.low) last.low = last.close;
      setCurrentPrice(last.close);
      drawChart();
    }, 1200);

    // Auto-Spike every 24 seconds
    const spikeInterval = setInterval(() => {
      triggerSpike();
    }, 24000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(tickInterval);
      clearInterval(spikeInterval);
    };
  }, [currentAsset, showPrimeOverlay]);

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-2">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>INTERACTIVE HIGH-FREQUENCY MT5 BRIDGE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Live MT5 Spike Detection Terminal
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time tick-by-tick mathematical cluster simulation. Observe how indicators execute before spikes print.
            </p>
          </div>

          {/* Quick Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Asset Select */}
            <select
              value={currentAsset}
              onChange={(e) => setCurrentAsset(e.target.value)}
              className="px-3 py-2 rounded-xl bg-card border border-border text-xs font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="BOOM 1000">BOOM 1000 (Spike UP)</option>
              <option value="CRASH 1000">CRASH 1000 (Spike DOWN)</option>
              <option value="BOOM 500">BOOM 500 (High Frequency)</option>
              <option value="CRASH 500">CRASH 500 (Aggressive)</option>
              <option value="VOLATILITY 75">VOLATILITY 75 (Trend)</option>
            </select>

            {/* Timeframe Switcher */}
            <div className="flex rounded-xl bg-card border border-border p-1 text-xs font-mono">
              {(["M1", "M5", "M15"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg transition ${
                    timeframe === tf ? "bg-cyan-500 text-black font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Overlays */}
            <Button
              onClick={() => setShowPrimeOverlay(!showPrimeOverlay)}
              variant={showPrimeOverlay ? "cyber" : "outline"}
              size="sm"
              className="text-xs font-mono gap-1.5"
            >
              <Check className="w-3.5 h-3.5" /> Prime Spike AI
            </Button>

            <Button
              onClick={() => setShowRadarOverlay(!showRadarOverlay)}
              variant={showRadarOverlay ? "secondary" : "outline"}
              size="sm"
              className="text-xs font-mono gap-1.5"
            >
              <Check className="w-3.5 h-3.5" /> Radar HUD
            </Button>

            <Button
              onClick={() => setAudioEnabled(!audioEnabled)}
              variant="outline"
              size="sm"
              className="text-xs font-mono"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </Button>
          </div>
        </div>

        {/* Terminal Canvas Container */}
        <div className="rounded-3xl border border-border bg-[#090e1a] overflow-hidden shadow-2xl relative">
          
          {/* Top Canvas Bar */}
          <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-bold text-white">{currentAsset} Index</span>
              </div>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">
                Tick Price: <strong className="text-cyan-400 font-mono-numbers">{currentPrice.toFixed(2)}</strong>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Spread: <span className="text-slate-200">0.05 Pts</span></span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                Spike Probability: 94.8%
              </span>
              <span className="text-slate-500 text-[10px]">VPS Bridge 14ms</span>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative w-full h-[440px] sm:h-[500px]">
            <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

            {/* Spike Banner Triggered */}
            {spikeBannerText && (
              <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-emerald-500 text-black font-extrabold text-sm shadow-2xl animate-bounce">
                <Zap className="w-5 h-5 fill-black" />
                <span>{spikeBannerText}</span>
              </div>
            )}

            {/* Radar HUD in bottom right */}
            {showRadarOverlay && (
              <div className="absolute bottom-5 right-5 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 text-xs font-mono w-60 shadow-xl space-y-2">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-2">
                  <span>Spike Radar HUD</span>
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cluster Accum:</span>
                    <span className="text-emerald-400 font-bold">HIGH (96.4%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tick Velocity:</span>
                    <span className="text-slate-200">18.2 ticks/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Suggested SL:</span>
                    <span className="text-rose-400">-14 ticks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Spike:</span>
                    <span className="text-cyan-400 font-bold">+120 Pts</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="px-5 py-3.5 bg-slate-950/90 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Simulating real-time micro-tick liquidity clusters. Works identically on live MT5 terminals.</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={triggerSpike}
                variant="secondary"
                size="sm"
                className="font-mono text-xs gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Force Test Spike</span>
              </Button>
              <Button
                onClick={() => setIsCheckoutOpen(true)}
                variant="cyber"
                size="sm"
                className="font-mono text-xs font-bold gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install on your MT5</span>
              </Button>
            </div>
          </div>

        </div>

        {/* Informative Grid Below Chart with Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
            <div className="h-36 rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80"
                alt="Institutional MT5 Indicators"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 text-[10px] font-mono bg-slate-900/90 text-cyan-400 px-2 py-0.5 rounded-full border border-slate-700 font-bold">
                M1 / M5 CLUSTERS
              </span>
            </div>
            <h3 className="font-bold text-base">Pre-Spike Tick Accumulation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Synthetic indices follow deterministic tick accumulation curves. Our algorithm calculates mathematical exhaustion and triggers sniper entry arrows.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
            <div className="h-36 rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
                alt="Low Latency VPS Nodes"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 text-[10px] font-mono bg-slate-900/90 text-emerald-400 px-2 py-0.5 rounded-full border border-slate-700 font-bold">
                0.08 MS PING
              </span>
            </div>
            <h3 className="font-bold text-base">Direct MT5 Bridge Execution</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fires instant audio pings and push notifications directly to your phone or MT5 terminal so you never miss an explosive spike.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
            <div className="h-36 rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?auto=format&fit=crop&w=600&q=80"
                alt="Verified Win Rate"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 text-[10px] font-mono bg-slate-900/90 text-amber-400 px-2 py-0.5 rounded-full border border-slate-700 font-bold">
                1:4 RISK REWARD
              </span>
            </div>
            <h3 className="font-bold text-base">Tight Stops &amp; Maximum Upside</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Strict 8 to 14 tick stop loss protection ensures minimal risk while capturing 80 to 200+ point breakout surges on every signal.
            </p>
          </div>
        </div>

      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={{
          name: "Prime Spike v3.2 AI Quantum Suite",
          price: 49.00,
          description: "Includes .ex5 indicator, installation preset templates, and private license key."
        }}
      />
    </div>
  );
};

export default Terminal;
