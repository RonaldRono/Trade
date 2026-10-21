import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  LineChart,
  Radio,
  Trophy,
  Calculator,
  Lock,
  Headphones,
  CheckCircle2
} from "lucide-react";
import BrandLogo from "@/components/brand-logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <BrandLogo />
            <p className="text-xs text-slate-400 leading-relaxed">
              Treads Algo &amp; MT5 Systems delivers precision algorithmic spike indicators, non-repainting entry signals, and automated copy-trading for Boom, Crash, and synthetic indices on Deriv and Weltrade.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono text-[11px]">
                <ShieldCheck className="h-4 w-4" />
                VERIFIED ALGORITHMIC EXECUTION
              </div>
              <div className="text-slate-400 text-[11px]">
                Execution Latency: <span className="text-slate-200 font-mono">0.08ms High-Frequency Node</span>
              </div>
              <div className="text-slate-400 text-[11px]">
                Average Spike Accuracy: <span className="text-cyan-400 font-bold font-mono">95.2% Live Tested</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation & Terminal Tools */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              Algorithmic Systems
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-cyan-400" /> Platform Overview
                </Link>
              </li>
              <li>
                <Link to="/terminal" className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1.5 font-semibold">
                  <LineChart className="h-3.5 w-3.5 text-emerald-400" /> Live Interactive Terminal
                </Link>
              </li>
              <li>
                <Link to="/indicators" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-cyan-400" /> Spike Detectors &amp; EAs
                </Link>
              </li>
              <li>
                <Link to="/signals" className="text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1.5 font-semibold">
                  <Radio className="h-3.5 w-3.5 text-cyan-400" /> Real-Time Signals Feed
                </Link>
              </li>
              <li>
                <Link to="/challenge" className="text-amber-400 hover:text-amber-300 transition flex items-center gap-1.5 font-semibold">
                  <Trophy className="h-3.5 w-3.5 text-amber-400" /> $100 to $100k Challenge
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <Calculator className="h-3 w-3 text-cyan-400" /> Spike Profit Calculator
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-cyan-400" /> My Account &amp; Licenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Flagship Indicators */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Precision Indicators
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <Link to="/indicators" className="hover:text-white transition">Prime Spike v3.2 AI</Link>
                <span className="text-[10px] font-mono text-emerald-400">95.2% Win</span>
              </li>
              <li className="flex items-center justify-between">
                <Link to="/indicators" className="hover:text-white transition">Spike Radar Pro HUD</Link>
                <span className="text-[10px] font-mono text-cyan-400">Radar HUD</span>
              </li>
              <li className="flex items-center justify-between">
                <Link to="/indicators" className="hover:text-white transition">Blue Guardian 2.0 Max</Link>
                <span className="text-[10px] font-mono text-blue-400">Reversal</span>
              </li>
              <li className="flex items-center justify-between">
                <Link to="/indicators" className="hover:text-white transition">Miss Violet 2.0 Scalper</Link>
                <span className="text-[10px] font-mono text-purple-400">M1 Scalp</span>
              </li>
              <li className="flex items-center justify-between">
                <Link to="/indicators" className="hover:text-white transition">NexusPainGain Detector</Link>
                <span className="text-[10px] font-mono text-amber-400">Weltrade</span>
              </li>
              <li className="flex items-center justify-between">
                <Link to="/indicators" className="hover:text-white transition">Sigma Nexus Quantum</Link>
                <span className="text-[10px] font-mono text-cyan-400">3-Sigma</span>
              </li>
              <li className="flex items-center justify-between">
                <Link to="/indicators" className="hover:text-white transition">Ethan Algo Master EA</Link>
                <span className="text-[10px] font-mono text-amber-400">24/7 Bot</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Brokers & Instant Payment Rails */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400"></span>
              Supported Brokers &amp; Rails
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compatible with MetaTrader 5 on Deriv (SVG, BVI, FX, International) and Weltrade Live/Demo accounts.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                DERIV MT5
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                WELTRADE
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                METATRADER 5
              </span>
            </div>
            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-400 mb-2">Instant Automated Delivery:</div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">USDT (TRC20)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">USDT (BEP20)</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">BITCOIN</span>
                <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">BINANCE PAY</span>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 text-[11px] text-slate-500 leading-relaxed space-y-3">
          <p>
            <strong>Risk Disclosure:</strong> Trading Boom &amp; Crash, synthetic indices, and foreign exchange on margin carries high risk and may not be suitable for all investors. High volatility can work both to your advantage and disadvantage. Treads Algo provides quantitative software tools, algorithmic signals, and educational indicators. Never risk capital you cannot afford to lose.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-400 pt-3">
            <div>
              &copy; {currentYear} Treads Algo &amp; MT5 Systems. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 mt-2 sm:mt-0 text-xs">
              <Link to="/contact" className="hover:text-cyan-400 transition">Terms of Service</Link>
              <Link to="/contact" className="hover:text-cyan-400 transition">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-cyan-400 transition">VIP Support Desk</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
