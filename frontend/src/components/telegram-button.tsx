import { Send } from "lucide-react";

const TelegramButton = () => {
  const handleOpenSupport = () => {
    window.open("https://t.me/ethanglobalsolutions", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <button
        onClick={handleOpenSupport}
        aria-label="Contact VIP Trading Desk"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <Send className="w-5 h-5 fill-white" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        <span className="hidden sm:inline font-mono tracking-tight">VIP Desk Live (24/7)</span>
      </button>
    </div>
  );
};

export default TelegramButton;
