import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

interface BrandLogoProps {
  className?: string;
}

const BrandLogo = ({ className = "" }: BrandLogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-200">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
          </div>
        </div>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
        </span>
      </div>
      <div>
        <div className="font-extrabold text-base tracking-wider flex items-center gap-1.5 leading-none">
          <span className="text-foreground">TREADS</span>
          <span className="text-cyan-400">ALGO</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
            PRO
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground font-mono tracking-tight mt-1">
          MT5 Precision Spike Systems
        </p>
      </div>
    </Link>
  );
};

export default BrandLogo;
