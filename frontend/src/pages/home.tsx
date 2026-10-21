import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  ArrowRight,
  LineChart,
  Crosshair,
  ShieldCheck,
  Radio,
  Trophy,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  BarChart3,
  Layers,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckoutModal from "@/components/checkout-modal";

const TICKER_ITEMS = [
  { symbol: 'BOOM 1000', price: 14284.50, change: '+2.84%', up: true },
  { symbol: 'CRASH 1000', price: 8912.30, change: '-1.15%', up: false },
  { symbol: 'BOOM 500', price: 4120.80, change: '+4.12%', up: true },
  { symbol: 'CRASH 500', price: 3840.10, change: '-0.89%', up: false },
  { symbol: 'STEP INDEX', price: 10230.00, change: '+0.45%', up: true },
  { symbol: 'VOLATILITY 75', price: 492104.20, change: '+3.91%', up: true },
  { symbol: 'JUMP 25', price: 741920.00, change: '-0.42%', up: false },
  { symbol: 'PAIN X (Weltrade)', price: 1842.10, change: '+6.40%', up: true },
  { symbol: 'GAIN X (Weltrade)', price: 2190.50, change: '+1.25%', up: true }
];

const FEATURED_INDICATORS = [
  {
    id: 'prime-spike',
    name: 'Prime Spike v3.2 AI',
    price: 49.00,
    winRate: '95.2%',
    platform: 'Deriv MT5',
    category: 'Spike Detector',
    badge: 'BESTSELLER',
    badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
    description: 'High-precision micro-tick cluster accumulation detector for Boom & Crash. Catch spikes 1-3 ticks before price explodes.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    specs: ['Non-Repainting Arrows', 'Instant Audio & Telegram Alerts', 'Tested on Live Accounts', 'M1/M5 Presets Included']
  },
  {
    id: 'spike-radar',
    name: 'Spike Radar Pro HUD',
    price: 49.00,
    winRate: '93.8%',
    platform: 'Deriv MT5',
    category: 'Spike Detector',
    badge: 'POPULAR',
    badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    description: 'Real-time 360-degree visual spike probability radar HUD. Shows high-conviction sniper zones directly on chart.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    specs: ['Visual Radar HUD', 'Multi-Basket Scanner', 'Dynamic Band Channels', 'Adjustable Sensitivity']
  },
  {
    id: 'nexus-paingain',
    name: 'NexusPainGain Detector X',
    price: 98.35,
    winRate: '96.1%',
    platform: 'Weltrade MT5',
    category: 'Weltrade Synthetics',
    badge: 'EXCLUSIVE',
    badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    description: 'Triple-filtered institutional quantitative algorithm created exclusively for Pain X & Gain X synthetics on Weltrade.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    specs: ['Pain X & Gain X Custom Logic', 'Orderbook Liquidity Sweeps', 'Zero-Lag Math Confluence', 'Weltrade Presets Included']
  }
];

const Home = () => {
  const [tickerList, setTickerList] = useState(TICKER_ITEMS);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: number; description?: string } | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Random tick movement simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerList((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.49) * (item.price * 0.001);
          return {
            ...item,
            price: Number((item.price + delta).toFixed(2)),
          };
        })
      );
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleOpenCheckout = (product: { name: string; price: number; description?: string }) => {
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* ================= REAL-TIME MARKET TICKER STRIP ================= */}
      <div className="bg-slate-950 border-b border-slate-800/80 overflow-hidden py-2.5 text-xs font-mono text-slate-300">
        <div className="animate-ticker flex items-center gap-8 whitespace-nowrap">
          {[...tickerList, ...tickerList].map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-2 px-2 hover:text-white transition">
              <span className="font-bold text-slate-300">{item.symbol}</span>
              <span className="font-mono-numbers text-slate-100">
                {item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className={`font-bold ${item.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.change}
              </span>
              <span className="text-slate-700">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Ambient background glow & grid */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -top-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>NEXT-GEN AI SPIKE DETECTION &amp; COPY TRADING ENGINE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Precision MT5 Indicators for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300">
                  Boom &amp; Crash
                </span> Trading
              </h1>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Purpose-built quantitative spike catchers, real-time sniper signals, and automated copy-trading for Boom, Crash, and synthetic indices on Deriv &amp; Weltrade MT5. Instant automatic download after payment.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/indicators">
                  <Button variant="cyber" size="lg" className="gap-2 font-bold w-full sm:w-auto">
                    <Crosshair className="w-4 h-4" />
                    Browse Spike Detectors
                  </Button>
                </Link>
                <Link to="/terminal">
                  <Button variant="outline" size="lg" className="gap-2 font-semibold w-full sm:w-auto">
                    <LineChart className="w-4 h-4 text-cyan-400" />
                    Open Live Terminal
                  </Button>
                </Link>
                <Link to="/challenge">
                  <Button variant="gold" size="lg" className="gap-2 font-bold w-full sm:w-auto">
                    <Trophy className="w-4 h-4" />
                    $100k Challenge
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/80">
                <div className="p-3 rounded-2xl bg-card border border-border">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-cyan-400">95.2%</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Spike Accuracy</div>
                </div>
                <div className="p-3 rounded-2xl bg-card border border-border">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400">&lt; 0.2s</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Tick Execution</div>
                </div>
                <div className="p-3 rounded-2xl bg-card border border-border">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-amber-400">Instant</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Automatic Delivery</div>
                </div>
                <div className="p-3 rounded-2xl bg-card border border-border">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-purple-400">100%</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Non-Repainting</div>
                </div>
              </div>

            </div>

            {/* Right Showcase Photo & Live Mock HUD */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80"
                  alt="High-Frequency Algorithmic MT5 Trading Desk"
                  className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Floating On-Image HUD Badges */}
                <div className="absolute top-4 left-4 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs font-mono">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>BOOM 1000 • SPIKE DETECTED</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    Gain: <strong className="text-emerald-400">+148.20 Pts</strong> in 1 Tick
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Next-Gen Indicator Engine:</div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Prime Spike v3.2 AI Quantum</span>
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                  <Link to="/terminal">
                    <Button variant="cyber" size="sm" className="text-xs font-bold gap-1">
                      <span>Watch Live</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FEATURED INDICATORS SECTION ================= */}
      <section className="py-20 bg-card/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-bold">
              <Crosshair className="w-4 h-4" /> Precision MT5 Marketplace
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Battle-Tested Spike Catchers &amp; EAs
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Non-repainting mathematical algorithms built specifically for Boom, Crash, and synthetic index mechanics. Instant automatic delivery after payment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_INDICATORS.map((indicator) => (
              <div
                key={indicator.id}
                className="rounded-3xl border border-border bg-card overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={indicator.image}
                      alt={indicator.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent"></div>
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-mono px-2.5 py-1 rounded-full border font-bold ${indicator.badgeColor}`}
                    >
                      {indicator.badge}
                    </span>
                    <span className="absolute top-3 right-3 text-xs font-mono bg-slate-900/90 text-white px-2.5 py-1 rounded-full border border-slate-700">
                      {indicator.platform}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">
                        {indicator.name}
                      </h3>
                      <div className="text-xs font-mono text-emerald-400 font-bold mt-1">
                        ★ Verified Win Rate: {indicator.winRate}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {indicator.description}
                    </p>

                    <ul className="space-y-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
                      {indicator.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer / Price & Button */}
                <div className="p-6 pt-0 border-t border-border/60 mt-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground">One-Time Fee</div>
                    <div className="text-2xl font-extrabold font-mono text-foreground">
                      ${indicator.price.toFixed(2)}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleOpenCheckout(indicator)}
                    variant="cyber"
                    size="sm"
                    className="font-bold text-xs gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Get Access</span>
                  </Button>
                </div>

              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/indicators">
              <Button variant="outline" size="lg" className="font-semibold gap-2">
                <span>View All 7 Indicators &amp; Trading Bots</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* ================= 100K CHALLENGE PROMO BANNER ================= */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border border-amber-500/40 shadow-2xl overflow-hidden">
            
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center lg:text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>OCTOBER ROUND • 100 USD TO 100K USD</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Grow from $100 to $100,000 <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                    in 3 Trading Days
                  </span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Join our high-frequency copy trading network. Our master quantitative bots trade your connected MT5 account synchronously across Boom, Crash, and synthetic indices.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Initial Capital</div>
                    <div className="text-base font-bold text-white">$100.00 USD</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Profit Target</div>
                    <div className="text-base font-bold text-emerald-400">$100,000.00</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Duration</div>
                    <div className="text-base font-bold text-white">3 Days</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 bg-amber-500/5">
                    <div className="text-amber-400 text-[10px]">Copy Trade Fee</div>
                    <div className="text-base font-bold text-amber-400">$85.00 USD</div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="w-full lg:w-auto shrink-0 text-center">
                <Link to="/challenge">
                  <Button variant="gold" size="lg" className="w-full sm:w-auto px-8 py-4 text-base font-extrabold shadow-xl shadow-amber-500/25">
                    Secure Your Challenge Spot ($85.00)
                  </Button>
                </Link>
                <div className="text-[11px] font-mono text-slate-400 mt-2">
                  ⚡ 14 Slots Remaining • Direct Deriv &amp; Weltrade Bridge
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= VALUE PILLARS ================= */}
      <section className="py-20 bg-card/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold tracking-tight">Why Traders Choose Treads Algo</h2>
            <p className="text-muted-foreground text-sm mt-2">
              Built for speed, mathematical certainty, and a frictionless experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base">Instant Delivery</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Get your MT5 indicator and license key immediately upon blockchain confirmation. No manual delay.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base">Built for Synthetics</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Calibrated strictly for Deriv Boom, Crash, Volatility 75, and Weltrade Pain/Gain order flows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base">Secure Crypto Checkout</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pay with USDT (TRC-20, BEP-20), Bitcoin, or Binance Pay. Zero chargeback fees, 100% decentralized.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base">Live Account Tested</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every algorithm is verified on real-money MT5 accounts with verified investor passwords before release.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Checkout Modal */}
      {selectedProduct && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          product={selectedProduct}
        />
      )}

    </div>
  );
};

export default Home;
