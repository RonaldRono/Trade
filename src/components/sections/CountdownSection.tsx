import { useEffect, useState } from 'react'
import type { CmsSection } from '../../types/cms'

interface CountdownSectionProps {
  section: CmsSection
}

export default function CountdownSection({ section }: CountdownSectionProps) {
  const payload = section as unknown as {
    label?: string
    hours?: number
    slotsRemaining?: string
  }

  const totalMs = (payload.hours ?? 38) * 60 * 60 * 1000
  const [remaining, setRemaining] = useState(totalMs)

  useEffect(() => {
    const target = Date.now() + totalMs
    const interval = setInterval(() => {
      const diff = target - Date.now()
      setRemaining(diff > 0 ? diff : 0)
    }, 1000)

    return () => clearInterval(interval)
  }, [totalMs])

  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor((remaining % 86400000) / 3600000)
  const minutes = Math.floor((remaining % 3600000) / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)

  const cells = [
    { value: String(days).padStart(2, '0'), label: 'Days' },
    { value: String(hours).padStart(2, '0'), label: 'Hours' },
    { value: String(minutes).padStart(2, '0'), label: 'Mins' },
    { value: String(seconds).padStart(2, '0'), label: 'Secs', accent: true },
  ]

  return (
    <section className="section section--tight">
      <div className="shell">
        <div className="panel panel--dark">
          <div className="stack stack--md">
            <div className="price-summary__label">{payload.label ?? 'Next round starts in'}</div>

            <div className="countdown">
              {cells.map((cell) => (
                <div key={cell.label} className="countdown__cell">
                  <div className={`countdown__value${cell.accent ? ' countdown__value--amber' : ''}`}>
                    {cell.value}
                  </div>
                  <div className="countdown__label">{cell.label}</div>
                </div>
              ))}
            </div>

            {payload.slotsRemaining && (
              <p className="text-green fs-mono" style={{ fontSize: '1.2rem' }}>
                <span className="eyebrow__dot" style={{ display: 'inline-block', marginRight: '0.8rem' }} />
                {payload.slotsRemaining}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
