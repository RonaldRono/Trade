import type { CmsSection } from '../../types/cms'
import type { StatItem } from '../../types/sections'
import SectionHeader from './SectionHeader'

interface StatGridSectionProps {
  section: CmsSection
}

const TONE_CLASS: Record<string, string> = {
  accent: '',
  green: 'stat-card__value--green',
  amber: 'stat-card__value--amber',
  violet: 'stat-card__value--violet',
}

export default function StatGridSection({ section }: StatGridSectionProps) {
  const payload = section as unknown as {
    eyebrow?: string
    heading?: string
    text?: string
    stats?: StatItem[]
  }

  const stats = payload.stats ?? []

  return (
    <section className="section section--spacious section--tinted">
      <div className="shell">
        <SectionHeader eyebrow={payload.eyebrow} heading={payload.heading} text={payload.text} />
        <div className="stat-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <div className={`stat-card__value ${TONE_CLASS[stat.tone ?? 'accent'] ?? ''}`}>{stat.value}</div>
              <div className="stat-card__label">{stat.label}</div>
              {stat.detail && <p className="stat-card__detail">{stat.detail}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
