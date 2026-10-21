import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Activity,
  LineChart,
  Crosshair,
  Radio,
  Trophy,
  Calculator,
  ShieldCheck,
  Headphones,
  Volume2,
  VolumeX,
  Sparkles
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/brand-logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Live Terminal",
      path: "/terminal",
      badge: "LIVE",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      icon: LineChart
    },
    {
      name: "Spike Detectors",
      path: "/indicators",
      icon: Crosshair
    },
    {
      name: "VIP Signals",
      path: "/signals",
      badge: "95.2%",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      icon: Radio
    },
    {
      name: "100k Challenge",
      path: "/challenge",
      badge: "PRO",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      icon: Trophy
    },
    {
      name: "Profit Calculator",
      path: "/calculator",
      icon: Calculator
    },
    {
      name: "My Account",
      path: "/account",
      icon: ShieldCheck
    },
    {
      name: "VIP Desk",
      path: "/contact",
      icon: Headphones
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* Top Utility Ticker Bar - Clean, internal only, verified live links */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono text-[11px]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE BRIDGE: DERIV MT5 &amp; WELTRADE SYNTHETICS
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
              <span>Latency:</span>
              <strong className="text-emerald-400 font-bold">14ms</strong>
            </span>
            <span className="hidden lg:inline text-slate-400 text-[11px]">
              Spike Precision Rate: <strong className="text-cyan-400">95.2% Verified</strong>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <Link
              to="/challenge"
              className="hidden sm:flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5" /> Next $100 to $100k Challenge Starts Soon →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full backdrop-blur-md transition-all duration-200 ${
          scrolled
            ? "bg-background/95 shadow-xl border-b border-border py-3"
            : "bg-background/85 border-b border-border/60 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <BrandLogo />

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors duration-150 ${
                    isActive
                      ? "text-cyan-400 font-bold bg-cyan-500/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 opacity-75" />}
                  <span>{link.name}</span>
                  {link.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full border ${link.badgeColor}`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Audio Alert Toggle */}
            <button
              onClick={toggleAudio}
              className="p-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition"
              title={audioEnabled ? "Spike Audio Alerts ON" : "Spike Audio Alerts MUTED"}
            >
              {audioEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Quick CTA */}
            <Link to="/indicators" className="hidden sm:inline-block">
              <Button variant="cyber" size="sm" className="font-bold text-xs gap-1.5">
                <Crosshair className="w-3.5 h-3.5" />
                <span>Get Indicators</span>
              </Button>
            </Link>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="xl:hidden bg-card/95 backdrop-blur-xl border-b border-border px-4 py-5 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${link.badgeColor}`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-border">
            <Link to="/indicators" onClick={() => setIsOpen(false)} className="w-full block">
              <Button variant="cyber" className="w-full text-xs font-bold py-3">
                Explore MT5 Indicators
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
