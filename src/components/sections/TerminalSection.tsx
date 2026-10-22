import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { CmsSection } from '../../types/cms'
import type { TerminalAsset } from '../../types/sections'

interface TerminalSectionProps {
  section: CmsSection
}

const TIMEFRAMES = ['M1', 'M5', 'M15']
const SERIES_LENGTH = 90

interface SpikeEvent {
  id: number
  index: number
  direction: 'up' | 'down'
  points: number
}

interface SimulationProps {
  asset: TerminalAsset
  timeframe: string
  showPrimeSpike: boolean
  showRadar: boolean
  registerTrigger: (trigger: (() => void) | null) => void
}

function buildSeries(asset: TerminalAsset): number[] {
  const next: number[] = []
  let price = asset.base

  for (let i = 0; i < SERIES_LENGTH; i += 1) {
    price += (Math.random() - 0.5) * asset.volatility * 0.6
    next.push(price)
  }

  return next
}

function TerminalSimulation({
  asset,
  timeframe,
  showPrimeSpike,
  showRadar,
  registerTrigger,
}: SimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const spikeCounter = useRef(0)
  const spikeId = useRef(0)

  const [series, setSeries] = useState<number[]>(() => buildSeries(asset))
  const [spikes, setSpikes] = useState<SpikeEvent[]>([])
  const [banner, setBanner] = useState<string | null>(null)
  const [velocity, setVelocity] = useState(18.2)
  const [probability, setProbability] = useState(94.8)

  const fireSpike = useCallback(
    (direction: 'up' | 'down') => {
      const points = Math.round(asset.volatility * (2.6 + Math.random() * 1.8))
      const magnitude = direction === 'up' ? points : -points

      setSeries((prev) => {
        const last = prev[prev.length - 1] ?? asset.base
        return [...prev.slice(1), last + magnitude]
      })

      spikeId.current += 1
      setSpikes((prev) => [
        ...prev.slice(-6),
        { id: spikeId.current, index: SERIES_LENGTH - 1, direction, points },
      ])

      setBanner(
        `SPIKE DETECTED ON ${asset.label} · ${direction === 'up' ? '+' : '-'}${points} POINTS CAPTURED`,
      )
      setProbability(Math.min(99.9, 94 + Math.random() * 5))

      setTimeout(() => setBanner(null), 4200)
    },
    [asset],
  )

  useEffect(() => {
    registerTrigger(() => fireSpike(asset.drift >= 0 ? 'up' : 'down'))
    return () => registerTrigger(null)
  }, [asset, fireSpike, registerTrigger])

  useEffect(() => {
    const interval = setInterval(() => {
      if (spikeCounter.current <= 0) {
        spikeCounter.current = 14 + Math.floor(Math.random() * 10)
        fireSpike(asset.drift >= 0 ? 'up' : 'down')
        return
      }

      spikeCounter.current -= 1

      setSeries((prev) => {
        if (prev.length === 0) return prev
        const last = prev[prev.length - 1]
        const next = last + (Math.random() - 0.49) * asset.volatility * 0.7 + asset.drift * 0.2
        return [...prev.slice(1), next]
      })

      setVelocity(12 + Math.random() * 12)
      setProbability(Math.max(78, Math.min(99.9, 88 + Math.random() * 10)))
    }, 260)

    return () => clearInterval(interval)
  }, [asset, fireSpike])

  const price = series.length ? series[series.length - 1] : asset.base

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const ratio = window.devicePixelRatio || 1
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    canvas.width = width * ratio
    canvas.height = height * ratio
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    context.clearRect(0, 0, width, height)

    const padding = { top: 24, right: 24, bottom: 30, left: 24 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    context.strokeStyle = 'rgba(233, 238, 246, 0.07)'
    context.lineWidth = 1
    for (let i = 0; i <= 5; i += 1) {
      const y = padding.top + (chartHeight / 5) * i
      context.beginPath()
      context.moveTo(padding.left, y)
      context.lineTo(padding.left + chartWidth, y)
      context.stroke()
    }
    for (let i = 0; i <= 6; i += 1) {
      const x = padding.left + (chartWidth / 6) * i
      context.beginPath()
      context.moveTo(x, padding.top)
      context.lineTo(x, padding.top + chartHeight)
      context.stroke()
    }

    if (series.length < 2) return

    const min = Math.min(...series)
    const max = Math.max(...series)
    const span = max - min || 1
    const xFor = (index: number) => padding.left + (chartWidth / (series.length - 1)) * index
    const yFor = (value: number) => padding.top + chartHeight - ((value - min) / span) * chartHeight

    const gradient = context.createLinearGradient(0, padding.top, 0, padding.top + chartHeight)
    gradient.addColorStop(0, 'rgba(34, 211, 238, 0.28)')
    gradient.addColorStop(1, 'rgba(34, 211, 238, 0)')

    context.beginPath()
    context.moveTo(xFor(0), padding.top + chartHeight)
    series.forEach((value, index) => context.lineTo(xFor(index), yFor(value)))
    context.lineTo(xFor(series.length - 1), padding.top + chartHeight)
    context.closePath()
    context.fillStyle = gradient
    context.fill()

    context.beginPath()
    series.forEach((value, index) => {
      const x = xFor(index)
      const y = yFor(value)
      if (index === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    })
    context.strokeStyle = '#22d3ee'
    context.lineWidth = 2
    context.stroke()

    if (showPrimeSpike) {
      spikes.forEach((spike) => {
        const index = Math.min(spike.index, series.length - 1)
        const x = xFor(index)
        const y = yFor(series[index] ?? 0)
        const color = spike.direction === 'up' ? '#34d399' : '#fb7185'

        context.fillStyle = color
        context.beginPath()
        context.moveTo(x, y - 10)
        context.lineTo(x - 7, y - 24)
        context.lineTo(x + 7, y - 24)
        context.closePath()
        context.fill()

        context.strokeStyle = color
        context.lineWidth = 1
        context.beginPath()
        context.moveTo(x, y - 24)
        context.lineTo(x, y - 36)
        context.stroke()

        context.fillStyle = 'rgba(233, 238, 246, 0.85)'
        context.font = '10px jetbrains-mono, monospace'
        context.fillText('ENTRY', x - 14, y - 42)
      })
    }

    if (showRadar) {
      const cx = width - padding.right - 62
      const cy = padding.top + 62
      const radius = 44

      context.strokeStyle = 'rgba(233, 238, 246, 0.12)'
      context.lineWidth = 8
      context.beginPath()
      context.arc(cx, cy, radius, Math.PI * 0.75, Math.PI * 2.25)
      context.stroke()

      context.strokeStyle = '#34d399'
      context.lineWidth = 8
      context.beginPath()
      context.arc(cx, cy, radius, Math.PI * 0.75, Math.PI * 0.75 + Math.PI * 1.5 * (probability / 100))
      context.stroke()

      context.fillStyle = '#e9eef6'
      context.font = 'bold 13px jetbrains-mono, monospace'
      context.textAlign = 'center'
      context.fillText(`${probability.toFixed(1)}%`, cx, cy + 4)
      context.font = '9px jetbrains-mono, monospace'
      context.fillStyle = '#8b98ab'
      context.fillText('SPIKE PROB.', cx, cy + 18)
      context.textAlign = 'left'
    }
  }, [series, spikes, showPrimeSpike, showRadar, probability])

  const hudRows = useMemo(
    () => [
      { key: 'Cluster Accum', value: `HIGH (${(probability - 0.6).toFixed(1)}%)`, tone: 'green' },
      { key: 'Tick Velocity', value: `${velocity.toFixed(1)} ticks/s`, tone: 'accent' },
      { key: 'Suggested SL', value: '-14 ticks', tone: 'accent' },
      { key: 'Target Spike', value: `+${Math.round(asset.volatility * 1.6)} Pts`, tone: 'green' },
    ],
    [probability, velocity, asset],
  )

  return (
    <>
      <div className="terminal__canvas-wrap">
        <canvas ref={canvasRef} className="terminal__canvas" />

        {banner && <div className="terminal__banner">{banner}</div>}

        <div className="terminal__hud">
          <div className="terminal__hud-title">Spike Radar HUD</div>
          {hudRows.map((row) => (
            <div key={row.key} className="terminal__hud-row">
              <span className="terminal__hud-key">{row.key}</span>
              <span
                className={`terminal__hud-value${row.tone === 'green' ? ' terminal__hud-value--green' : ''}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="terminal__footer">
        <span>
          {asset.label} Index · Tick Price: {price.toFixed(2)} · Spread: 0.05 Pts · Spike Probability:{' '}
          {probability.toFixed(1)}% · VPS Bridge 14ms · {timeframe}
        </span>
        <span className="text-dim">Simulating real-time micro-tick liquidity clusters</span>
      </div>
    </>
  )
}

export default function TerminalSection({ section }: TerminalSectionProps) {
  const payload = section as unknown as { assets?: TerminalAsset[] }
  const assets = payload.assets ?? []

  const [assetIndex, setAssetIndex] = useState(0)
  const [timeframe, setTimeframe] = useState('M1')
  const [showPrimeSpike, setShowPrimeSpike] = useState(true)
  const [showRadar, setShowRadar] = useState(true)
  const triggerRef = useRef<(() => void) | null>(null)

  const asset = assets[assetIndex] ?? assets[0]
  const registerTrigger = useCallback((trigger: (() => void) | null) => {
    triggerRef.current = trigger
  }, [])

  if (!asset) return null

  return (
    <section className="section section--spacious">
      <div className="shell">
        <div className="terminal">
          <div className="terminal__toolbar">
            <div className="terminal__toolbar-group">
              {assets.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`chip${assetIndex === index ? ' is-active' : ''}`}
                  onClick={() => setAssetIndex(index)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="terminal__toolbar-group">
              {TIMEFRAMES.map((frame) => (
                <button
                  key={frame}
                  type="button"
                  className={`chip${timeframe === frame ? ' is-active' : ''}`}
                  onClick={() => setTimeframe(frame)}
                >
                  {frame}
                </button>
              ))}
            </div>

            <div className="terminal__toolbar-group">
              <button
                type="button"
                className={`chip${showPrimeSpike ? ' is-active' : ''}`}
                onClick={() => setShowPrimeSpike((value) => !value)}
              >
                Prime Spike AI
              </button>
              <button
                type="button"
                className={`chip${showRadar ? ' is-active' : ''}`}
                onClick={() => setShowRadar((value) => !value)}
              >
                Radar HUD
              </button>
            </div>
          </div>

          <TerminalSimulation
            key={asset.id}
            asset={asset}
            timeframe={timeframe}
            showPrimeSpike={showPrimeSpike}
            showRadar={showRadar}
            registerTrigger={registerTrigger}
          />

          <div className="terminal__footer">
            <span className="text-dim">
              Simulating real-time micro-tick liquidity clusters. Works identically on live MT5
              terminals.
            </span>
            <div className="terminal__toolbar-group">
              <button
                type="button"
                className="button"
                onClick={() => triggerRef.current?.()}
              >
                Force Test Spike
              </button>
              <Link className="button button--ghost" to="/indicators">
                Install on your MT5
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
