import { useState } from "react";
import {
  Radio,
  Send,
  Copy,
  CheckCircle2,
  RefreshCw,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckoutModal from "@/components/checkout-modal";

interface SignalItem {
  id: string;
  asset: string;
  broker: string;
  type: string;
  entry: number;
  sl: number;
  tp1: number;
  tp2: number;
  confidence: string;
  time: string;
  status: string;
  statusColor: string;
}

const INITIAL_SIGNALS: SignalItem[] = [
  {
    id: 'SIG-1049',
    asset: 'BOOM 1000',
    broker: 'Deriv',
    type: 'BUY SPIKE',
    entry: 14210.40,
    sl: 14195.00,
    tp1: 14260.00,
    tp2: 14320.00,
    confidence: '97.8%',
    time: '1 min ago',
    status: 'ACTIVE ENTRY',
    statusColor: 'bg-emerald-500/20 text-emerald-400'
  },
  {
    id: 'SIG-1048',
    asset: 'CRASH 500',
    broker: 'Deriv',
    type: 'SELL SPIKE',
    entry: 3845.20,
    sl: 3855.00,
    tp1: 3810.00,
    tp2: 3770.00,
    confidence: '95.4%',
    time: '5 mins ago',
    status: 'TP1 HIT (+35 pts)',
    statusColor: 'bg-cyan-500/20 text-cyan-400'
  },
  {
    id: 'SIG-1047',
    asset: 'PAIN X',
    broker: 'Weltrade',
    type: 'BUY REVERSAL',
    entry: 1840.10,
    sl: 1828.00,
    tp1: 1875.00,
    tp2: 1910.00,
    confidence: '98.2%',
    time: '14 mins ago',
    status: 'RUNNING (+32 pts)',
    statusColor: 'bg-amber-500/20 text-amber-400'
  },
  {
    id: 'SIG-1046',
    asset: 'BOOM 500',
    broker: 'Deriv',
    type: 'BUY SPIKE',
    entry: 4118.00,
    sl: 4104.00,
    tp1: 4165.00,
    tp2: 4210.00,
    confidence: '94.9%',
    time: '32 mins ago',
    status: 'TP2 SECURED (+92 pts)',
    statusColor: 'bg-purple-500/20 text-purple-400'
  }
];

const Signals = () => {
  const [signalsList, setSignalsList] = useState<SignalItem[]>(INITIAL_SIGNALS);
  const [selectedBroker, setSelectedBroker] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const filteredSignals = signalsList.filter((s) => {
    if (selectedBroker === 'all') return true;
    return s.broker.toLowerCase() === selectedBroker.toLowerCase();
  });

  const handleCopy = (s: SignalItem) => {
    const text = `🎯 [TREADS ALGO VIP SIGNAL]\nAsset: ${s.asset} (${s.broker})\nAction: ${s.type}\nEntry: ${s.entry}\nSL: ${s.sl}\nTP1: ${s.tp1}\nTP2: ${s.tp2}\nConfidence: ${s.confidence}`;
    navigator.clipboard.writeText(text);
    setCopiedId(s.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const simulateIncomingSignal = () => {
    const assets = ['BOOM 1000', 'CRASH 1000', 'BOOM 300', 'PAIN X', 'GAIN X', 'VOLATILITY 75'];
    const chosenAsset = assets[Math.floor(Math.random() * assets.length)];
    const isBoom = chosenAsset.includes('BOOM') || chosenAsset.includes('GAIN') || chosenAsset.includes('PAIN');

    const newSignal: SignalItem = {
      id: `SIG-${Math.floor(1000 + Math.random() * 9000)}`,
      asset: chosenAsset,
      broker: chosenAsset.includes('PAIN') || chosenAsset.includes('GAIN') ? 'Weltrade' : 'Deriv',
      type: isBoom ? 'BUY SPIKE' : 'SELL SPIKE',
      entry: Number((14000 + Math.random() * 2000).toFixed(2)),
      sl: 13980.00,
      tp1: 14080.00,
      tp2: 14150.00,
      confidence: `${(94 + Math.random() * 4).toFixed(1)}%`,
      time: 'Just now',
      status: '⚡ ACTIVE ENTRY',
      statusColor: 'bg-emerald-500/20 text-emerald-400'
    };

    setSignalsList((prev) => [newSignal, ...prev.slice(0, 5)]);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>24/7 AUTOMATED ALGORITHMIC DISPATCH</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            VIP Real-Time Trading Signals
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Real-time entry coordinates for Boom, Crash, and synthetic indices beamed straight to a private Telegram channel. No need to run complex indicators yourself.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Signals Stream Terminal */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {(['all', 'Deriv', 'Weltrade'] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBroker(b)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                      selectedBroker === b
                        ? 'bg-cyan-500 text-black'
                        : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {b === 'all' ? 'All Brokers' : `${b} Only`}
                  </button>
                ))}
              </div>

              <Button
                onClick={simulateIncomingSignal}
                variant="outline"
                size="sm"
                className="text-xs font-mono gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulate Signal</span>
              </Button>
            </div>

            {/* Signal Feed Cards */}
            <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-xl divide-y divide-border/80">
              {filteredSignals.map((s) => (
                <div key={s.id} className="p-5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-extrabold text-base font-mono">{s.asset}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                        {s.broker}
                      </span>
                      <span
                        className={`text-xs font-mono px-2 py-0.5 rounded font-bold ${
                          s.type.includes('BUY')
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {s.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${s.statusColor}`}>
                        {s.status}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">{s.time}</span>
                    </div>
                  </div>

                  {/* Numbers Grid */}
                  <div className="grid grid-cols-4 gap-2 text-xs font-mono bg-background/80 p-3 rounded-2xl border border-border mb-3">
                    <div>
                      <span className="text-muted-foreground text-[10px] block">ENTRY:</span>
                      <strong className="text-foreground">{s.entry}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] block">STOP LOSS:</span>
                      <strong className="text-rose-400">{s.sl}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] block">TARGET 1:</span>
                      <strong className="text-emerald-400">{s.tp1}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] block">CONFIDENCE:</span>
                      <strong className="text-cyan-400">{s.confidence}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Calculated via Prime Spike v3.2 Cluster Accumulator
                    </span>
                    <button
                      onClick={() => handleCopy(s)}
                      className="font-mono text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === s.id ? 'Copied Order!' : 'Copy MT5 Order'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Join VIP Membership Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-card via-card to-cyan-950/20 p-8 shadow-2xl relative overflow-hidden space-y-6">
              
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold">
                  ⚡ PRIVATE TELEGRAM VIP
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  Get Every Entry Delivered Live to Your Phone
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Join our exclusive private channel for Deriv &amp; Weltrade. Our cluster servers dispatch high-probability sniper entries directly straight to your device.
                </p>
              </div>

              {/* Photo Showcase */}
              <div className="h-44 rounded-2xl overflow-hidden relative border border-border">
                <img
                  src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80"
                  alt="Live Mobile Trading Execution"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                  <span>Telegram Bot Latency: 0.05s</span>
                  <span className="text-emerald-400 font-bold">ONLINE 24/7</span>
                </div>
              </div>

              {/* Bullets */}
              <div className="space-y-2.5 text-xs text-foreground">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>15 to 30 Verified Spike Signals Daily</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full Boom &amp; Crash 1000/500/300 Coverage</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Weltrade Pain X &amp; Gain X Exclusive Hybrid Entries</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Precise Entry, Stop Loss, and Multi-Target Take Profits</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Monthly VIP Access</div>
                  <div className="text-2xl font-extrabold font-mono text-cyan-400">
                    $49.00 <span className="text-xs font-normal text-slate-400">/ mo</span>
                  </div>
                </div>
                <Button
                  onClick={() => setIsCheckoutOpen(true)}
                  variant="cyber"
                  className="font-bold text-xs gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join VIP Signals</span>
                </Button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={{
          name: "VIP Signals Channel (Monthly)",
          price: 49.00,
          description: "Private VIP Telegram Channel Access with real-time Boom & Crash entry signals and trade management."
        }}
      />
    </div>
  );
};

export default Signals;
