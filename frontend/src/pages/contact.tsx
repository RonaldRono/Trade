import { useState } from "react";
import {
  Headphones,
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Clock,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQS = [
  {
    q: "Do your MT5 indicators repaint?",
    a: "No. Our calculation models strictly bind to closed micro-ticks. Once an entry arrow prints, it remains permanently on your MT5 chart history."
  },
  {
    q: "Can I use the indicators on mobile phone (Android / iOS)?",
    a: "MT5 indicators (.ex5) run on Windows PC or VPS. However, our VIP Signals Channel sends identical real-time entry alerts directly to your mobile phone via Telegram!"
  },
  {
    q: "What is the recommended minimum starting balance?",
    a: "For Boom 1000 and Crash 1000, you can start with as little as $50 - $100. For the $100k Challenge, the entry requirement is exactly $100.00."
  },
  {
    q: "How fast do I receive my download and license key?",
    a: "Instantly and automatically. As soon as your crypto payment confirms on the blockchain, your license key and .ex5 download package unlock right on your screen."
  }
];

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
            <Headphones className="w-3.5 h-3.5" />
            <span>24/7 DEDICATED VIP TRADING SUPPORT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact VIP Trading Desk
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Need assistance setting up your MT5 indicators, connecting a remote VPS, or have questions regarding the $100k Challenge? Our engineers are on standby 24/7.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Form */}
          <div className="lg:col-span-7 rounded-3xl bg-card border border-border p-8 shadow-xl space-y-6">
            
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Send Priority Support Dispatch</span>
            </h2>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-foreground">Message Dispatched!</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Thank you, {name}. Your inquiry has been routed to our senior trading systems engineer. Average response time is under 15 minutes.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  size="sm"
                  className="mt-2 text-xs"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alexander Vance"
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="trader@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Indicator Installation Support">Indicator Installation Support</option>
                    <option value="100k Challenge Bridge Assistance">100k Challenge Bridge Assistance</option>
                    <option value="License Key HWID Reset">License Key HWID Reset</option>
                    <option value="Custom EA or Algorithm Request">Custom EA or Algorithm Request</option>
                    <option value="Crypto Payment Verification">Crypto Payment Verification</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Detailed Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your question, broker details, or MT5 error codes..."
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  ></textarea>
                </div>

                <Button variant="cyber" size="lg" className="w-full font-bold text-sm gap-2">
                  <Send className="w-4 h-4" />
                  <span>Submit to 24/7 Desk</span>
                </Button>
              </form>
            )}

          </div>

          {/* Right Direct Links & FAQs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Photo */}
            <div className="rounded-3xl overflow-hidden border border-border bg-card relative h-48">
              <img
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80"
                alt="24/7 Trading Desk Support"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>GLOBAL DESK ACTIVE</span>
                </div>
                <div className="text-slate-300 text-[11px] mt-0.5">Average response time: &lt; 15 mins</div>
              </div>
            </div>

            {/* Direct Channel Cards */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://t.me/ethanglobalsolutions"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition p-4 space-y-2 block"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                  <Send className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-foreground">Direct Telegram</div>
                <div className="text-[10px] text-muted-foreground font-mono">@ethanglobalsolutions</div>
              </a>

              <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-foreground">VIP Desk Email</div>
                <div className="text-[10px] text-muted-foreground font-mono">support@treads-algo.com</div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Frequently Answered Questions</span>
              </h3>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-background border border-border space-y-1">
                    <div className="font-bold text-xs text-foreground">{faq.q}</div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
