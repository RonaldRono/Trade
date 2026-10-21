import { useState } from "react";
import {
  X,
  ShieldCheck,
  Copy,
  CheckCircle2,
  Download,
  Zap,
  ArrowRight
} from "lucide-react";
import triggerCelebration from "@/lib/confetti";
import { Button } from "@/components/ui/button";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    description?: string;
  };
  onSuccess?: (licenseKey: string) => void;
}

const WALLET_ADDRESSES: Record<string, { address: string; network: string; note: string }> = {
  'USDT-TRC20': {
    address: 'TYc7h4M2eZJ8BqpX92Lkmn7V41QeRsz88B',
    network: 'TRON (TRC20)',
    note: 'Instant confirmation (~45s). Lowest fees.'
  },
  'USDT-BEP20': {
    address: '0x71C941D32870F460E717F620b72D8519962aF5e2',
    network: 'BNB Smart Chain (BEP20)',
    note: 'Fast 12-block confirmation.'
  },
  'BTC': {
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    network: 'Bitcoin Mainnet',
    note: 'Native SegWit address.'
  },
  'BINANCE': {
    address: 'PAY ID: 892019481 (Treads Algo Corp)',
    network: 'Binance Pay Instant',
    note: 'Zero network fees.'
  }
};

const CheckoutModal = ({ isOpen, onClose, product, onSuccess }: CheckoutModalProps) => {
  const [selectedCoin, setSelectedCoin] = useState<string>('USDT-TRC20');
  const [copied, setCopied] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [generatedKey, setGeneratedKey] = useState<string>('');

  if (!isOpen) return null;

  const currentWallet = WALLET_ADDRESSES[selectedCoin];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentWallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const key = `EGS-${Math.floor(1000 + Math.random() * 9000)}-FX${Math.floor(10 + Math.random() * 90)}-PRO`;
      setGeneratedKey(key);
      setIsVerifying(false);
      setIsSuccess(true);

      // Trigger Confetti
      try {
        triggerCelebration({
          particleCount: 70,
          spread: 70
        });
      } catch (e) {
        console.error(e);
      }

      if (onSuccess) {
        onSuccess(key);
      }
    }, 1800);
  };

  const handleDownload = () => {
    const dummyContent = `========================================================\nTREADS ALGO & MT5 SYSTEMS - INDICATOR PACKAGE\nProduct: ${product.name}\nLicense: ${generatedKey || 'VERIFIED GENUINE'}\nBuild: 2026.10-PRO\n========================================================\n\nINSTALLATION:\n1. Copy the .ex5 files into MT5 folder: MQL5/Indicators/\n2. In MT5, go to Tools -> Options -> Expert Advisors and check 'Allow DLL imports'.\n3. Attach to Boom/Crash M1 chart and apply provided .set presets.\n\nEnjoy maximum precision spike trading!`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.name.replace(/\s+/g, '_')}_MT5_Bundle.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit Encrypted Crypto Checkout</span>
          </div>
          <h3 className="text-xl font-bold text-white">{product.name}</h3>
          <p className="text-xs text-slate-400 mt-1">
            {product.description || 'Includes complete MT5 indicator file (.ex5), manual PDF, and license key.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Price Bar */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-[11px] font-mono text-slate-400">Total Due (USD):</div>
              <div className="text-2xl font-extrabold font-mono text-cyan-400">
                ${product.price.toFixed(2)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-mono text-slate-400">Crypto Settlement:</div>
              <div className="text-sm font-bold font-mono text-emerald-400">
                {product.price.toFixed(2)} USDT
              </div>
            </div>
          </div>

          {!isSuccess ? (
            <>
              {/* Currency Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Select Settlement Coin:
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                  {(['USDT-TRC20', 'USDT-BEP20', 'BTC', 'BINANCE'] as const).map((coin) => (
                    <button
                      key={coin}
                      type="button"
                      onClick={() => setSelectedCoin(coin)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        selectedCoin === coin
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {coin.replace('USDT-', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* QR & Address */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                {/* SVG QR Code */}
                <div className="w-28 h-28 bg-white p-2 rounded-xl shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="#000">
                    <rect x="5" y="5" width="25" height="25" fill="#000" />
                    <rect x="10" y="10" width="15" height="15" fill="#fff" />
                    <rect x="13" y="13" width="9" height="9" fill="#000" />
                    <rect x="70" y="5" width="25" height="25" fill="#000" />
                    <rect x="75" y="10" width="15" height="15" fill="#fff" />
                    <rect x="78" y="13" width="9" height="9" fill="#000" />
                    <rect x="5" y="70" width="25" height="25" fill="#000" />
                    <rect x="10" y="75" width="15" height="15" fill="#fff" />
                    <rect x="13" y="78" width="9" height="9" fill="#000" />
                    <rect x="35" y="10" width="5" height="15" />
                    <rect x="45" y="5" width="15" height="5" />
                    <rect x="45" y="15" width="10" height="10" />
                    <rect x="35" y="35" width="30" height="30" />
                    <rect x="40" y="40" width="20" height="20" fill="#fff" />
                    <rect x="45" y="45" width="10" height="10" fill="#000" />
                    <rect x="10" y="45" width="15" height="10" />
                    <rect x="75" y="45" width="15" height="10" />
                    <rect x="35" y="75" width="25" height="10" />
                    <rect x="65" y="75" width="15" height="15" />
                  </svg>
                </div>

                {/* Address Box */}
                <div className="w-full space-y-2">
                  <div className="text-[11px] font-mono text-slate-400">
                    Send to this {currentWallet.network} address:
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={currentWallet.address}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 select-all"
                    />
                    <button
                      onClick={handleCopy}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition shrink-0"
                      title="Copy Address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  {copied && (
                    <div className="text-[11px] font-mono text-emerald-400">
                      ✓ Address copied to clipboard!
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400 font-mono">
                    {currentWallet.note}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <Button
                onClick={handleSimulatePayment}
                disabled={isVerifying}
                variant="cyber"
                className="w-full py-4 text-sm font-bold flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <span className="animate-spin inline-block mr-2">⟳</span>
                    Confirming Blockchain Nodes (2/2)...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Verify Blockchain Payment
                  </>
                )}
              </Button>
            </>
          ) : (
            /* Success State */
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in-0 duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">Payment Confirmed!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Blockchain confirmations verified. Your MT5 indicator files and license key are unlocked.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                <div className="text-slate-400">Your Master License Key:</div>
                <div className="text-base font-bold text-cyan-400 mt-1">
                  {generatedKey}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleDownload}
                  variant="default"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs"
                >
                  <Download className="w-4 h-4 mr-1.5" /> Download .EX5 Package (.ZIP)
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-slate-700 text-slate-200 text-xs"
                >
                  Close &amp; Launch
                </Button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default CheckoutModal;
