import { useState, useEffect } from "react";
import {
  Trophy,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckoutModal from "@/components/checkout-modal";

const SERVERS_BY_BROKER: Record<string, Record<string, string[]>> = {
  Deriv: {
    "Deriv (International)": ["Deriv-Server", "Deriv-Server-02", "Deriv-Server-03"],
    "Deriv (SVG) LLC": ["DerivSVG-Server", "DerivSVG-Server-02", "DerivSVG-Server-03"],
    "Deriv (BVI) Ltd": ["DerivBVI-Server", "DerivBVI-Server-02"],
    "Deriv (FX) Ltd": ["DerivFX-Server", "DerivFX-Server-02"],
    "Deriv Demo": ["Deriv-Demo"]
  },
  Weltrade: {
    "Weltrade Live": ["Weltrade-Live", "Weltrade-Live-02"],
    "Weltrade Demo": ["Weltrade-Demo"]
  }
};

const LEADERBOARD = [
  { name: 'Kiprotich M.', country: 'Kenya', broker: 'Deriv (SVG)', balance: '$34,180.20', roi: '+34,080%' },
  { name: 'David K.', country: 'Nigeria', broker: 'Deriv (BVI)', balance: '$28,450.00', roi: '+28,350%' },
  { name: 'Lerato T.', country: 'South Africa', broker: 'Weltrade Live', balance: '$22,900.50', roi: '+22,800%' },
  { name: 'Samuel A.', country: 'Ghana', broker: 'Deriv (International)', balance: '$18,340.00', roi: '+18,240%' }
];

const Challenge = () => {
  const [cdDays, setCdDays] = useState("01");
  const [cdHours, setCdHours] = useState("14");
  const [cdMinutes, setCdMinutes] = useState("32");
  const [cdSeconds, setCdSeconds] = useState("45");

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [broker, setBroker] = useState("");
  const [server, setServer] = useState("");
  const [mt5Login, setMt5Login] = useState("");
  const [mt5Pass, setMt5Pass] = useState("");
  const [riskStrategy, setRiskStrategy] = useState("Balanced");

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const target = new Date(Date.now() + 1 * 86400000 + 14 * 3600000 + 32 * 60000).getTime();
    const interval = setInterval(() => {
      const diff = target - Date.now();
      if (diff <= 0) return;

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCdDays(String(d).padStart(2, "0"));
      setCdHours(String(h).padStart(2, "0"));
      setCdMinutes(String(m).padStart(2, "0"));
      setCdSeconds(String(s).padStart(2, "0"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBrokerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBroker(e.target.value);
    setServer("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckoutOpen(true);
  };

  const serverGroups = broker && SERVERS_BY_BROKER[broker] ? SERVERS_BY_BROKER[broker] : null;

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Challenge Hero Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/40 shadow-2xl relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            
            <div className="max-w-2xl text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NEXT CHALLENGE ROUND • OCT 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                100 USD to 100k <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                  Trading Challenge
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Grow from <strong>100 USD</strong> to <strong>100,000 USD</strong> in 3 days. Our automated quantitative trading engine trades your MT5 account synchronously via high-frequency copy trading.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Initial Capital</div>
                  <div className="text-base font-bold text-white">$100.00 USD</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Profit Target</div>
                  <div className="text-base font-bold text-emerald-400">$100,000.00</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Challenge Duration</div>
                  <div className="text-base font-bold text-white">3 Days</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 bg-amber-500/5">
                  <div className="text-amber-400 text-[10px]">Copy Trade Fee</div>
                  <div className="text-base font-bold text-amber-400">$85.00 USD</div>
                </div>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="w-full lg:w-auto shrink-0 bg-slate-950 p-6 rounded-3xl border border-slate-800 text-center shadow-xl">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Next Round Starts In:</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 min-w-[65px]">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">{cdDays}</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Days</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 min-w-[65px]">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">{cdHours}</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Hours</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 min-w-[65px]">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">{cdMinutes}</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Mins</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 min-w-[65px]">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">{cdSeconds}</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Secs</div>
                </div>
              </div>

              <div className="mt-4 text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Slots Remaining: <strong>14 / 100</strong></span>
              </div>

              <a href="#enrollForm">
                <Button variant="gold" size="lg" className="w-full mt-5 font-bold text-sm">
                  Secure Your Spot ($85.00)
                </Button>
              </a>
            </div>

          </div>

        </div>

        {/* 3-Stage Compounding Path */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl font-bold tracking-tight">3-Stage Compounding Growth Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-card border border-border space-y-3 relative overflow-hidden">
              <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase">STAGE 01 • DAY 1</div>
              <h3 className="text-2xl font-extrabold font-mono">$100 → $1,000</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Conservative lot scaling on high-frequency Boom 1000 micro-clusters. Focuses on capital preservation and building initial profit cushion.
              </p>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-4">
                <div className="h-full bg-cyan-400 w-full"></div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-border space-y-3 relative overflow-hidden">
              <div className="text-[10px] font-mono font-bold text-purple-400 uppercase">STAGE 02 • DAY 2</div>
              <h3 className="text-2xl font-extrabold font-mono">$1,000 → $10,000</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Compounded lot injection across Boom 500, Crash 1000 and Volatility 75. Trailing stop algorithms lock in accrued profits with zero lag.
              </p>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-4">
                <div className="h-full bg-purple-400 w-full"></div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-amber-500/40 bg-amber-500/5 space-y-3 relative overflow-hidden">
              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase">STAGE 03 • DAY 3</div>
              <h3 className="text-2xl font-extrabold font-mono text-amber-400">$10,000 → $100,000</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Full-throttle algorithmic cluster execution on high-conviction Sigma setups. Target milestone reached with auto-disconnect safety lock.
              </p>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-4">
                <div className="h-full bg-amber-400 w-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Form & Leaderboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div id="enrollForm" className="lg:col-span-7 rounded-3xl bg-card border border-border p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b border-border">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold font-mono">
                MT5
              </div>
              <div>
                <h3 className="text-xl font-bold">Enroll in the Copy Trade Challenge</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Connect your MT5 account credentials for automated high-frequency bridge synchronization.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="trader@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Broker & Server (Cascading) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Broker</label>
                  <select
                    required
                    value={broker}
                    onChange={handleBrokerSelect}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select broker</option>
                    <option value="Deriv">Deriv</option>
                    <option value="Weltrade">Weltrade</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">MT5 Server</label>
                  <select
                    required
                    disabled={!broker}
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                  >
                    <option value="">{broker ? 'Select server' : 'Select broker first'}</option>
                    {serverGroups &&
                      Object.keys(serverGroups).map((group) => (
                        <optgroup key={group} label={group}>
                          {serverGroups[group].map((srv) => (
                            <option key={srv} value={srv}>
                              {srv}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    <option value="Other">Other (not listed)</option>
                  </select>
                </div>
              </div>

              {/* MT5 Login & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">MT5 Login Account</label>
                  <input
                    type="text"
                    required
                    value={mt5Login}
                    onChange={(e) => setMt5Login(e.target.value)}
                    placeholder="e.g. 10928371"
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">MT5 Password</label>
                  <input
                    type="password"
                    required
                    value={mt5Pass}
                    onChange={(e) => setMt5Pass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Strategy */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-2">
                  Risk Allocation Profile
                </label>
                <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                  {(['Conservative', 'Balanced', 'Max Surge'] as const).map((strat) => (
                    <button
                      key={strat}
                      type="button"
                      onClick={() => setRiskStrategy(strat)}
                      className={`p-3 rounded-2xl border text-center transition ${
                        riskStrategy === strat
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                          : 'border-border bg-card text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div>{strat}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">
                        {strat === 'Conservative' && '1-2% Risk'}
                        {strat === 'Balanced' && '3-5% Risk'}
                        {strat === 'Max Surge' && 'Compound'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Credentials are encrypted with AES-256 and only loaded into our secure copy-trading node for the duration of the 3-day challenge.
                </span>
              </div>

              <Button variant="gold" size="lg" className="w-full py-4 text-base font-extrabold">
                Secure Your Spot — $85.00 USD
              </Button>
            </form>
          </div>

          {/* Right: Leaderboard & Verified Traders */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Photo */}
            <div className="rounded-3xl overflow-hidden border border-border bg-card relative h-52">
              <img
                src="https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?auto=format&fit=crop&w=800&q=80"
                alt="Institutional Prop Trading Capital"
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                  VERIFIED MT5 INVESTOR PASSES
                </span>
                <h4 className="text-base font-bold mt-1">Previous Round Winners</h4>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-sm">Top Challenge Performers</h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Round 12 Verified
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {LEADERBOARD.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-background border border-border flex items-center justify-between hover:border-amber-500/30 transition"
                  >
                    <div>
                      <div className="font-bold text-foreground flex items-center gap-2">
                        <span>{item.name}</span>
                        <span className="text-[10px] text-muted-foreground font-normal font-sans">
                          ({item.country})
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{item.broker}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold">{item.balance}</div>
                      <div className="text-[10px] text-amber-400 font-bold">{item.roi}</div>
                    </div>
                  </div>
                ))}
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
          name: `100k Challenge Spot (${broker || 'Deriv'} - ${server || 'Server'})`,
          price: 85.00,
          description: `Copy-trade bridge enrollment for MT5 #${mt5Login} (${fullName}). Strategy: ${riskStrategy}.`
        }}
      />
    </div>
  );
};

export default Challenge;
