import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Crosshair,
  Search,
  CheckCircle2,
  LineChart,
  Download,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckoutModal from "@/components/checkout-modal";

interface IndicatorItem {
  id: string;
  name: string;
  category: string;
  price: number;
  winRate: string;
  platform: string;
  badge: string;
  badgeColor: string;
  description: string;
  image: string;
  specs: string[];
  timeframe: string;
}

const ALL_INDICATORS: IndicatorItem[] = [
  {
    id: 'prime-spike',
    name: 'Prime Spike v3.2 AI',
    category: 'Spike Detectors',
    price: 49.00,
    winRate: '95.2%',
    platform: 'Deriv MT5',
    badge: 'BESTSELLER',
    badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
    description: 'Proprietary micro-tick accumulation detector for Boom 1000, Boom 500, Crash 1000, and Crash 500. Fires non-repainting entry signals 1 to 3 ticks before massive price explosions.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    specs: [
      '100% Non-Repainting Calculation Logic',
      'Instant Audio, Push & Telegram Alerts',
      'Tested on Live Deriv MT5 Accounts',
      'Pre-calibrated presets (.set) for M1 & M5'
    ],
    timeframe: 'M1 / M5'
  },
  {
    id: 'spike-radar',
    name: 'Spike Radar Pro HUD',
    category: 'Spike Detectors',
    price: 49.00,
    winRate: '93.8%',
    platform: 'Deriv MT5',
    badge: 'POPULAR',
    badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    description: 'Real-time 360-degree visual spike probability radar HUD displayed directly over MT5 chart candles. Monitors volume pressure, spread gaps, and exhaustion limits.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    specs: [
      'Visual On-Chart Radar Gauge HUD',
      'Multi-Timeframe Basket Scanner',
      'Dynamic Support / Resistance Bands',
      'Custom Sensitivity Slider (70% - 98%)'
    ],
    timeframe: 'M1 / M5 / M15'
  },
  {
    id: 'blue-guardian',
    name: 'Blue Guardian 2.0 Max',
    category: 'Trend Reversals',
    price: 59.00,
    winRate: '94.6%',
    platform: 'Deriv MT5',
    badge: 'PROTECTION',
    badgeColor: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
    description: 'Institutional trend reversal detection engine. Identifies peak exhaustion zones and filters out fake-out spikes during dangerous consolidation phases.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    specs: [
      'Zero-Lag Moving Average Envelope Filter',
      'Drawdown Protection Alert Module',
      'Automatic Lot Size Advisor',
      'Compatible with Volatility 75 & Step Index'
    ],
    timeframe: 'M5 / M15 / H1'
  },
  {
    id: 'miss-violet',
    name: 'Miss Violet 2.0 Scalper',
    category: 'Trend Reversals',
    price: 59.00,
    winRate: '92.4%',
    platform: 'Deriv MT5',
    badge: 'SCALPER',
    badgeColor: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
    description: 'Lightning-fast precision scalper specifically tuned for rapid Boom 300 and Crash 300 price action. Designed for traders demanding tight stops with maximum upside.',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80',
    specs: [
      'Ultra-Fast M1 Algorithmic Entry Triggers',
      'Tight 8-12 Tick Stop Loss Guidance',
      'Auto-Trailing Stop-Loss Preset Files',
      'Works seamlessly on VPS setups'
    ],
    timeframe: 'M1 Only'
  },
  {
    id: 'nexus-paingain',
    name: 'NexusPainGain Detector X',
    category: 'Weltrade Synthetics',
    price: 98.35,
    winRate: '96.1%',
    platform: 'Weltrade MT5',
    badge: 'EXCLUSIVE',
    badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    description: 'Proprietary 3-filter quantitative algorithm designed strictly for Pain X and Gain X synthetics on Weltrade. Analyzes orderbook imbalances and directional liquidity sweeps.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    specs: [
      'Exclusive to Weltrade Pain X / Gain X',
      'Triple-Filtered Volume Confluence',
      'Integrated High-Impact News Circuit Breaker',
      'Dedicated Weltrade Presets Included'
    ],
    timeframe: 'M1 / M5'
  },
  {
    id: 'sigma-nexus',
    name: 'Sigma Nexus Quantum',
    category: 'Spike Detectors',
    price: 85.90,
    winRate: '95.8%',
    platform: 'Deriv MT5',
    badge: 'PRO QUANT',
    badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
    description: 'Mathematical standard-deviation (3.2-sigma) variance detector. Built for prop-traders seeking ultra-high confidence sniper setups with minimum 1:4 risk-reward ratios.',
    image: 'https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?auto=format&fit=crop&w=800&q=80',
    specs: [
      '3-Sigma Variance Anomaly Detector',
      'Minimum 1:4 Risk-to-Reward Ratio',
      'Hardware-Locked Anti-Tamper Security',
      'Verified with $100k Challenge Accounts'
    ],
    timeframe: 'M5 / M15'
  },
  {
    id: 'algo-master-bot',
    name: 'Ethan Algo Master EA Bot',
    category: 'Automated Bots (EA)',
    price: 199.00,
    winRate: '97.2%',
    platform: 'Deriv & Weltrade MT5',
    badge: 'FLAGSHIP EA',
    badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    description: 'Fully autonomous Expert Advisor (EA) robot that trades Boom, Crash, and Weltrade Synthetics 24/7 without manual intervention. Features automatic compound lot-sizing and drawdown stop-guards.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    specs: [
      '100% Fully Automated 24/7 Execution',
      'Built-in Prime Spike + Sigma Nexus Models',
      'Hard 6% Peak-to-Trough Drawdown Lock',
      'Includes 1 Year Private VPS Installation'
    ],
    timeframe: 'All Timeframes'
  }
];

const CATEGORIES = ['All Tools', 'Spike Detectors', 'Trend Reversals', 'Weltrade Synthetics', 'Automated Bots (EA)'];

const Indicators = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: number; description?: string } | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const filteredIndicators = useMemo(() => {
    return ALL_INDICATORS.filter((item) => {
      const matchCat =
        selectedCategory === 'All Tools' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.platform.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'win-rate') return parseFloat(b.winRate) - parseFloat(a.winRate);
      return 0; // default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleOpenCheckout = (item: IndicatorItem) => {
    setSelectedProduct({
      name: item.name,
      price: item.price,
      description: item.description
    });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
            <Crosshair className="w-3.5 h-3.5" />
            <span>PRECISION ALGORITHMIC MARKETPLACE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            MT5 Spike Detectors &amp; Automated EAs
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Pick your indicator, pay with crypto (USDT, BTC, Binance Pay), and get instant automatic download access and your hardware license key.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-card border border-border shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search indicators..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-background border border-border text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="win-rate">Highest Win Rate</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIndicators.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-border bg-card overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"></div>
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-mono px-2.5 py-1 rounded-full border font-bold ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                  <span className="absolute top-3 right-3 text-xs font-mono bg-slate-950/90 text-white px-2.5 py-1 rounded-full border border-slate-700">
                    {item.platform}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-mono mt-1">
                      <span className="text-emerald-400 font-bold">
                        ★ Win Rate: {item.winRate}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{item.timeframe}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Specs Checklist */}
                  <ul className="space-y-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
                    {item.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Price & Actions */}
              <div className="p-6 pt-0 border-t border-border/60 mt-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground">One-Time License</div>
                  <div className="text-2xl font-extrabold font-mono text-foreground">
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link to="/terminal">
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-2.5 rounded-xl border-border hover:border-cyan-500"
                      title="Test on Live Terminal"
                    >
                      <LineChart className="w-4 h-4 text-cyan-400" />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleOpenCheckout(item)}
                    variant="cyber"
                    size="sm"
                    className="font-bold text-xs gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Get Access</span>
                  </Button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Instant Automatic Delivery</h4>
              <p className="text-xs text-slate-400 mt-1">
                Your compiled <code>.ex5</code> files, <code>.set</code> presets, and license keys are delivered immediately upon blockchain transaction confirmation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Zero Repaint Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1">
                Signals fix permanently on candle close. Our indicators never disappear or shift backward on your MT5 chart history.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Lifetime Upgrades &amp; Support</h4>
              <p className="text-xs text-slate-400 mt-1">
                One single purchase entitles you to all future MT5 version optimizations and direct VIP desk installation assistance.
              </p>
            </div>
          </div>
        </div>

      </div>

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

export default Indicators;
