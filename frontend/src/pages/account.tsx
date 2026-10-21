import { useState } from "react";
import {
  ShieldCheck,
  Key,
  Download,
  Cpu,
  BookOpen,
  RefreshCw,
  CheckCircle2,
  FileText,
  Lock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface License {
  id: string;
  name: string;
  key: string;
  status: string;
  hwid: string;
}

const INITIAL_LICENSES: License[] = [
  {
    id: 'lic-1',
    name: 'Prime Spike v3.2 AI',
    key: 'EGS-8492-X901-PRO',
    status: 'ACTIVATED',
    hwid: 'Bound (Win64 HWID-89301)'
  },
  {
    id: 'lic-2',
    name: 'Spike Radar Pro HUD',
    key: 'EGS-3109-R440-RAD',
    status: 'ACTIVATED',
    hwid: 'Bound (Win64 HWID-89301)'
  }
];

const Account = () => {
  const [licenses, setLicenses] = useState<License[]>(INITIAL_LICENSES);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleResetHwid = (id: string) => {
    setLicenses((prev) =>
      prev.map((l) => (l.id === id ? { ...l, hwid: 'Unbound (Ready for new device)' } : l))
    );
    setResetMessage('Hardware ID reset! You can now activate on your new VPS or MT5 device.');
    setTimeout(() => setResetMessage(null), 4000);
  };

  const handleDownload = (name: string, key: string) => {
    const dummyContent = `========================================================\nTREADS ALGO & MT5 SYSTEMS - VERIFIED CLIENT BUNDLE\nProduct: ${name}\nLicense Key: ${key}\nBuild: 2026.10-PRO\n========================================================\n\nINSTALLATION:\n1. Open MT5 and click: File -> Open Data Folder -> MQL5 -> Indicators\n2. Copy the .ex5 files and .set presets into this folder.\n3. In MT5, go to Tools -> Options -> Expert Advisors and check 'Allow DLL imports'.\n4. Attach to Boom/Crash M1 chart and enter your License Key.\n\nEnjoy precision trading!`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_')}_MT5_Bundle.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AUTHENTICATED CLIENT TERMINAL</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            My Account &amp; License Manager
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Manage your hardware-bound MT5 indicator licenses, reset device bindings for VPS migration, and monitor real-time copy trade telemetry.
          </p>
        </div>

        {resetMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-in fade-in-0 duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{resetMessage}</span>
          </div>
        )}

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Col 1: Active Licenses */}
          <div className="rounded-3xl bg-card border border-border p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                <span>My Active Licenses</span>
              </h3>
              <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full font-bold">
                {licenses.length} Verified
              </span>
            </div>

            <div className="space-y-4">
              {licenses.map((lic) => (
                <div key={lic.id} className="p-4 rounded-2xl bg-background border border-border space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-sm text-foreground">{lic.name}</div>
                      <div className="text-[11px] font-mono text-cyan-400 mt-0.5 font-bold">
                        {lic.key}
                      </div>
                    </div>
                    <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                      {lic.status}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
                    <span>{lic.hwid}</span>
                    <button
                      onClick={() => handleResetHwid(lic.id)}
                      className="text-cyan-400 hover:underline font-bold"
                    >
                      Reset HWID
                    </button>
                  </div>

                  <Button
                    onClick={() => handleDownload(lic.name, lic.key)}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-mono font-bold gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download .EX5 Package (.ZIP)</span>
                  </Button>
                </div>
              ))}
            </div>

            {/* Photo / Security Box */}
            <div className="rounded-2xl overflow-hidden relative h-36 border border-border">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
                alt="Hardware Node Protection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white text-[11px] font-mono font-bold">
                🛡️ Hardware-ID anti-tamper lock active
              </div>
            </div>
          </div>

          {/* Col 2: Live Copy-Trade Telemetry */}
          <div className="rounded-3xl bg-card border border-border p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Challenge Copy Telemetry</span>
              </h3>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span> CONNECTED
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-background border border-border flex justify-between">
                <span className="text-muted-foreground">Connected MT5 Login:</span>
                <span className="font-bold text-foreground">10849201 (DerivSVG)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-background border border-border flex justify-between">
                <span className="text-muted-foreground">Account Equity:</span>
                <span className="font-bold text-emerald-400">$1,482.50 USD</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-background border border-border flex justify-between">
                <span className="text-muted-foreground">Total Floating Profit:</span>
                <span className="font-bold text-emerald-400">+$382.50 (+26.5%)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-background border border-border flex justify-between">
                <span className="text-muted-foreground">Active Positions:</span>
                <span className="font-bold text-cyan-400">1 Trade (BOOM 1000 Buy)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-background border border-border flex justify-between">
                <span className="text-muted-foreground">Bridge Latency:</span>
                <span className="font-bold text-foreground">12ms (Direct VPS)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
              🛡️ Max Drawdown Guard active: Automated hard stop at 6% maximum peak equity drawdown.
            </div>
          </div>

          {/* Col 3: MT5 Installation Guide */}
          <div className="rounded-3xl bg-card border border-border p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>MT5 Setup Checklist</span>
              </h3>
              <span className="text-[10px] font-mono text-muted-foreground">4 Steps</span>
            </div>

            <div className="space-y-4 text-xs text-muted-foreground">
              <div className="flex gap-3">
                <span className="h-6 w-6 rounded-xl bg-muted text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-foreground block">Open MT5 Data Folder</strong>
                  <p className="text-[11px] mt-0.5">
                    Click <code>File → Open Data Folder → MQL5 → Indicators</code>.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="h-6 w-6 rounded-xl bg-muted text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <strong className="text-foreground block">Paste .ex5 files</strong>
                  <p className="text-[11px] mt-0.5">
                    Paste downloaded <code>.ex5</code> files and preset <code>.set</code> templates.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="h-6 w-6 rounded-xl bg-muted text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <strong className="text-foreground block">Enable DLL Imports</strong>
                  <p className="text-[11px] mt-0.5">
                    In MT5 go to <code>Tools → Options → Expert Advisors</code> and check "Allow DLL imports".
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="h-6 w-6 rounded-xl bg-muted text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <div>
                  <strong className="text-foreground block">Attach &amp; Enter Key</strong>
                  <p className="text-[11px] mt-0.5">
                    Attach to Boom/Crash M1 chart, paste your License Key, and watch sniper arrows fire!
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => handleDownload('Treads_MT5_Installation_Manual', 'MANUAL-DOCS-2026')}
                variant="outline"
                className="w-full text-xs font-semibold gap-2"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Download PDF Manual &amp; Presets</span>
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Account;
