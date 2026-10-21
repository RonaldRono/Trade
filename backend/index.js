import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Data Store for Treads Trading Systems
const indicators = [
  {
    id: 'prime-spike',
    name: 'Prime Spike v3.2 AI',
    category: 'Spike Detectors',
    price: 49.00,
    winRate: '95.2%',
    platform: 'Deriv MT5',
    badge: 'BESTSELLER',
    badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
    description: 'High-precision micro-tick cluster accumulation detector for Boom 1000, Boom 500, Crash 1000, and Crash 500. Fires non-repainting entry signals 1 to 3 ticks before massive price explosions.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    specs: [
      '100% Non-Repainting Calculation Logic',
      'Instant Audio, Push & Telegram Alerts',
      'Tested on Live Deriv MT5 Accounts',
      'Pre-calibrated presets (.set) for M1 & M5'
    ],
    timeframe: 'M1 / M5',
    activeUsers: 2840,
    downloadCount: 4920
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
    description: 'Real-time 360-degree probability radar HUD displayed directly over MT5 chart candles. Monitors volume pressure, spread gaps, and exhaustion limits.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    specs: [
      'Visual On-Chart Radar Gauge HUD',
      'Multi-Timeframe Basket Scanner',
      'Dynamic Support / Resistance Bands',
      'Custom Sensitivity Slider (70% - 98%)'
    ],
    timeframe: 'M1 / M5 / M15',
    activeUsers: 1950,
    downloadCount: 3100
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
    timeframe: 'M5 / M15 / H1',
    activeUsers: 1420,
    downloadCount: 2280
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
    timeframe: 'M1 Only',
    activeUsers: 1670,
    downloadCount: 2750
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
    timeframe: 'M1 / M5',
    activeUsers: 910,
    downloadCount: 1430
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
    timeframe: 'M5 / M15',
    activeUsers: 1140,
    downloadCount: 1890
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
    timeframe: 'All Timeframes',
    activeUsers: 830,
    downloadCount: 1220
  }
];

const liveSignals = [
  {
    id: 'SIG-1049',
    asset: 'BOOM 1000',
    broker: 'Deriv',
    type: 'BUY SPIKE',
    entry: 14210.40,
    sl: 14195.00,
    tp1: 14260.00,
    tp2: 14320.00,
    confidence: '97.8%',
    time: '1 min ago',
    status: 'ACTIVE ENTRY',
    statusColor: 'bg-emerald-500/20 text-emerald-400'
  },
  {
    id: 'SIG-1048',
    asset: 'CRASH 500',
    broker: 'Deriv',
    type: 'SELL SPIKE',
    entry: 3845.20,
    sl: 3855.00,
    tp1: 3810.00,
    tp2: 3770.00,
    confidence: '95.4%',
    time: '5 mins ago',
    status: 'TP1 HIT (+35 pts)',
    statusColor: 'bg-cyan-500/20 text-cyan-400'
  },
  {
    id: 'SIG-1047',
    asset: 'PAIN X',
    broker: 'Weltrade',
    type: 'BUY REVERSAL',
    entry: 1840.10,
    sl: 1828.00,
    tp1: 1875.00,
    tp2: 1910.00,
    confidence: '98.2%',
    time: '14 mins ago',
    status: 'RUNNING (+32 pts)',
    statusColor: 'bg-amber-500/20 text-amber-400'
  },
  {
    id: 'SIG-1046',
    asset: 'BOOM 500',
    broker: 'Deriv',
    type: 'BUY SPIKE',
    entry: 4118.00,
    sl: 4104.00,
    tp1: 4165.00,
    tp2: 4210.00,
    confidence: '94.9%',
    time: '32 mins ago',
    status: 'TP2 SECURED (+92 pts)',
    statusColor: 'bg-purple-500/20 text-purple-400'
  }
];

const challengeInfo = {
  title: '100 USD to 100k USD Challenge',
  subtitle: 'Grow from 100 USD to 100k USD in 3 Trading Days',
  initialCapital: 100.00,
  profitTarget: 100000.00,
  copyTradeFee: 85.00,
  daysDuration: 3,
  slotsTotal: 100,
  slotsRemaining: 14,
  startsInHours: 38,
  participants: [
    { name: 'Kiprotich M.', country: 'Kenya', broker: 'Deriv (SVG)', balance: '$34,180.20', roi: '+34,080%' },
    { name: 'David K.', country: 'Nigeria', broker: 'Deriv (BVI)', balance: '$28,450.00', roi: '+28,350%' },
    { name: 'Lerato T.', country: 'South Africa', broker: 'Weltrade Live', balance: '$22,900.50', roi: '+22,800%' },
    { name: 'Samuel A.', country: 'Ghana', broker: 'Deriv (International)', balance: '$18,340.00', roi: '+18,240%' }
  ]
};

const userLicenses = [
  {
    id: 'LIC-8910',
    productName: 'Prime Spike v3.2 AI',
    licenseKey: 'EGS-8492-X901-PRO',
    status: 'Active',
    boundHwid: 'HWID-WIN-893041-SEC',
    issuedDate: '2026-10-12',
    downloads: 3
  },
  {
    id: 'LIC-8911',
    productName: 'Spike Radar Pro HUD',
    licenseKey: 'EGS-3109-R440-RAD',
    status: 'Active',
    boundHwid: 'HWID-WIN-893041-SEC',
    issuedDate: '2026-10-14',
    downloads: 1
  }
];

const contactMessages = [];

/* ========================================================
   API ROUTES
======================================================== */

// 1. Health & Server Telemetry
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Treads Algo MT5 High-Frequency Bridge',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    telemetry: {
      derivLatencyMs: 14,
      weltradeLatencyMs: 19,
      activeTraders: 14280,
      verifiedWinRate: '95.2%'
    }
  });
});

// 2. Indicators Marketplace
app.get('/api/indicators', (req, res) => {
  const { category, search } = req.query;
  let result = [...indicators];

  if (category && category !== 'all') {
    result = result.filter(item => item.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.platform.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: result.length, indicators: result });
});

app.get('/api/indicators/:id', (req, res) => {
  const indicator = indicators.find(i => i.id === req.params.id);
  if (!indicator) {
    return res.status(404).json({ success: false, message: 'Indicator not found' });
  }
  res.json({ success: true, indicator });
});

// 3. Live Signals Dispatcher
app.get('/api/signals', (req, res) => {
  const { broker } = req.query;
  let list = [...liveSignals];
  if (broker && broker !== 'all') {
    list = list.filter(s => s.broker.toLowerCase() === broker.toLowerCase());
  }
  res.json({ success: true, signals: list });
});

app.post('/api/signals/test', (req, res) => {
  const assets = ['BOOM 1000', 'CRASH 1000', 'BOOM 500', 'CRASH 500', 'PAIN X', 'VOLATILITY 75'];
  const asset = assets[Math.floor(Math.random() * assets.length)];
  const isBoom = asset.includes('BOOM') || asset.includes('PAIN');

  const newSignal = {
    id: `SIG-${Math.floor(1000 + Math.random() * 9000)}`,
    asset,
    broker: asset.includes('PAIN') ? 'Weltrade' : 'Deriv',
    type: isBoom ? 'BUY SPIKE' : 'SELL SPIKE',
    entry: Number((14000 + Math.random() * 2000).toFixed(2)),
    sl: Number((13980.00).toFixed(2)),
    tp1: Number((14080.00).toFixed(2)),
    tp2: Number((14150.00).toFixed(2)),
    confidence: (94 + Math.random() * 4).toFixed(1) + '%',
    time: 'Just now',
    status: '⚡ ACTIVE ENTRY',
    statusColor: 'bg-emerald-500/20 text-emerald-400'
  };

  liveSignals.unshift(newSignal);
  if (liveSignals.length > 8) liveSignals.pop();

  res.status(201).json({ success: true, signal: newSignal });
});

// 4. Challenge Endpoint
app.get('/api/challenge', (req, res) => {
  res.json({ success: true, challenge: challengeInfo });
});

app.post('/api/challenge/enroll', (req, res) => {
  const { fullName, email, broker, server, mt5Login, riskStrategy } = req.body;

  if (!fullName || !email || !broker || !server || !mt5Login) {
    return res.status(400).json({ success: false, message: 'All registration fields are required' });
  }

  challengeInfo.slotsRemaining = Math.max(1, challengeInfo.slotsRemaining - 1);

  const reservation = {
    id: `CHAL-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName,
    email,
    broker,
    server,
    mt5Login,
    riskStrategy: riskStrategy || 'Balanced',
    status: 'Confirmed & Bridged',
    timestamp: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Challenge spot secured! MT5 copy bridge established.',
    reservation
  });
});

// 5. Lot Size & Profit Calculator
app.post('/api/calculator', (req, res) => {
  const { asset, lotSize, pointsCaptured } = req.body;
  const lots = parseFloat(lotSize) || 1.0;
  const points = parseFloat(pointsCaptured) || 100;

  // Boom 1000 / Crash 1000: 1 lot captures $1 per point
  let multiplier = 1.0;
  if (asset?.includes('500')) multiplier = 1.2;
  if (asset?.includes('300')) multiplier = 1.5;
  if (asset?.includes('VOLATILITY 75')) multiplier = 0.8;

  const estimatedProfit = Number((lots * points * multiplier).toFixed(2));
  const estimatedRisk = Number((lots * 15 * multiplier).toFixed(2)); // ~15 ticks stop loss
  const riskReward = (points / 15).toFixed(1);

  res.json({
    success: true,
    result: {
      asset: asset || 'BOOM 1000',
      lots,
      points,
      estimatedProfitUSD: estimatedProfit,
      estimatedRiskUSD: estimatedRisk,
      riskRewardRatio: `1:${riskReward}`
    }
  });
});

// 6. License Verification & Client Portal
app.get('/api/licenses', (req, res) => {
  res.json({ success: true, licenses: userLicenses });
});

app.post('/api/licenses/reset-hwid', (req, res) => {
  const { licenseKey } = req.body;
  const lic = userLicenses.find(l => l.licenseKey === licenseKey);
  if (!lic) {
    return res.status(404).json({ success: false, message: 'License key not found' });
  }
  lic.boundHwid = 'Unbound (Ready for new device)';
  res.json({ success: true, message: 'Hardware ID successfully unbound. You can now activate on a new VPS or PC.', license: lic });
});

// 7. Simulated Crypto Checkout
app.post('/api/checkout', (req, res) => {
  const { productName, price, currency } = req.body;
  const randomKey = `EGS-${Math.floor(1000 + Math.random() * 9000)}-FX${Math.floor(10 + Math.random() * 90)}-PRO`;

  const newLicense = {
    id: `LIC-${Math.floor(1000 + Math.random() * 9000)}`,
    productName: productName || 'Prime Spike v3.2 AI',
    licenseKey: randomKey,
    status: 'Active',
    boundHwid: 'Unbound (Auto-binds on first MT5 attach)',
    issuedDate: new Date().toISOString().split('T')[0],
    downloads: 0
  };

  userLicenses.unshift(newLicense);

  res.status(201).json({
    success: true,
    message: 'Payment confirmed on decentralized blockchain',
    licenseKey: randomKey,
    productName,
    license: newLicense
  });
});

// 8. Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
  }

  const msg = {
    id: `MSG-${Date.now()}`,
    name,
    email,
    subject: subject || 'General Inquiry',
    message,
    submittedAt: new Date().toISOString()
  };

  contactMessages.push(msg);
  res.status(201).json({
    success: true,
    message: 'Your message has been dispatched to our 24/7 VIP Trading Desk. We will respond within 15 minutes.'
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  🚀 Treads Trading Backend API is running!`);
  console.log(`  🔗 Local API URL: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
