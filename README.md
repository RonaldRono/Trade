# ⚡ Treads Algo & MT5 Systems — High-Frequency Trading Platform

An advanced, full-stack trading application built with the exact architectural structure of the **TRUCKS** project (React 18, TypeScript, Tailwind CSS, Vite 5, Lucide Icons, Radix UI, and Express.js backend).

---

## 🚀 Key Systems & Architecture

- **Interactive Live MT5 Spike Terminal (`/terminal`)**:
  - Pure HTML5 Canvas 2D candlestick charting engine with micro-tick accumulation simulation.
  - Multi-asset support: `BOOM 1000`, `CRASH 1000`, `BOOM 500`, `CRASH 500`, `VOLATILITY 75`.
  - Non-repainting pre-spike indicator arrow overlays (`Prime Spike v3.2 AI`).
  - Native **Web Audio API synthesizer** providing high-tech audio chimes upon spike triggers.
  - Timeframe selector (`M1`, `M5`, `M15`) and simulated force spike test trigger.

- **Marketplace & Spike Detectors Store (`/indicators`)**:
  - Full catalog of precision indicators and Expert Advisors (EAs).
  - Instant live filtering by categories: *Spike Detectors, Trend Reversals, Weltrade Synthetics, Automated Bots (EA)*.
  - High-resolution trading imagery, verified win-rate statistics, and direct test-on-chart shortcuts.

- **VIP Real-Time Signals Feed (`/signals`)**:
  - Live algorithmic streaming feed with automatic incoming spike signal simulator.
  - Active status indicators (`ACTIVE ENTRY`, `TP1 HIT`, `TP2 SECURED`).
  - 1-click **Copy MT5 Order** button with clipboard confirmation.
  - Instant private VIP Telegram invite integration.

- **$100 to $100k Prop Trading Challenge (`/challenge`)**:
  - 3-stage compounding growth roadmap ($100 → $1k → $10k → $100k).
  - Real-time countdown timer to the upcoming trading round.
  - Cascading broker & server auto-resolution for Deriv (`SVG`, `BVI`, `FX`, `International`, `Demo`) and Weltrade (`Live`, `Demo`).
  - Risk allocation selector (*Conservative*, *Balanced*, *Max Surge*).

- **Boom & Crash Spike Profit Calculator (`/calculator`)**:
  - Real-time lot size, captured points, and stop-loss calculation simulator.
  - Instant calculation of gross profit, maximum risk, risk-to-reward ratio, and margin requirements.

- **Client Portal & License Manager (`/account`)**:
  - Manage active MT5 licenses and Hardware ID (HWID) device binding.
  - 1-click HWID reset for VPS migrations.
  - Live copy-trade telemetry monitor (Equity, Floating Profit, Latency).
  - Interactive 4-step MT5 installation checklist with download package tools.

- **24/7 VIP Support Desk (`/contact`)**:
  - Direct support ticket dispatcher and frequently answered trading questions (FAQ).

- **Smart Multi-Rail Crypto Checkout Modal**:
  - Supports USDT (TRC-20, BEP-20), Bitcoin, and Binance Pay.
  - Dynamic QR code generation, address copy tool, and simulated blockchain confirmations with celebratory confetti.
  - Automatic license key generator (`EGS-XXXX-YYYY`).

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite 5 |
| **Routing** | React Router DOM v6 |
| **Styling & Theme** | Tailwind CSS with custom Cyber Trading palette, `next-themes` (Dark/Light toggle) |
| **Components & Primitives** | Radix UI (Dialog, Dropdown Menu, Slot), Class Variance Authority (CVA), Lucide Icons |
| **Audio Engine** | Native Web Audio API |
| **Graphics Engine** | HTML5 Canvas 2D Candlestick Engine |
| **Visual FX** | Canvas Confetti |
| **Backend API** | Node.js, Express.js (Port 5000) |
| **Process Management** | Concurrently |

---

## 🏃‍♂️ How to Run Locally

The project is split into two independent apps:

- `frontend/` — React + Vite client (port 5174). Requests to `/api` are proxied to the backend in dev.
- `backend/` — Express API (port 5000, override with `PORT`).

### First-time setup
```bash
npm install            # root tooling (concurrently)
npm run install:all    # installs backend/ and frontend/ dependencies
```

### Start both
```bash
npm run dev
```

### Run individually
- **Frontend only**: `npm run dev:frontend` (or `cd frontend && npm run dev`) → http://localhost:5174
- **Backend only**: `npm run dev:backend` (or `cd backend && npm run dev`) → http://localhost:5000
- **Production build**: `npm run build` (outputs `frontend/dist`)

---

## 📁 Project Directory Structure

```
Trade/
├── package.json          # root runner scripts only
├── README.md
├── backend/
│   ├── package.json
│   └── index.js
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── tsconfig*.json
    ├── vercel.json
    └── src/
        ├── App.tsx, main.tsx, index.css
        ├── components/   (navbar, footer, checkout-modal, ui/…)
        ├── lib/          (utils, currency, confetti)
        └── pages/        (home, terminal, indicators, signals, challenge, calculator, account, contact)
```


