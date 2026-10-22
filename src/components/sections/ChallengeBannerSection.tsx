import type { CmsSection } from '../../types/cms'
import type { StatItem } from '../../types/sections'
import { resolveCta } from '../../utils/cta'
import Action from '../Action'

interface ChallengeBannerSectionProps {
  section: CmsSection
}

const TONE_CLASS: Record<string, string> = {
  accent: '',
  green: 'text-green',
  amber: 'text-amber',
  violet: 'text-violet',
}

export default function ChallengeBannerSection({ section }: ChallengeBannerSectionProps) {
  const payload = section as unknown as {
    eyebrow?: string
    heading: string
    text: string
    stats?: StatItem[]
    note?: string
    cta?: { label?: string | null; url?: string | null; fragmentAndQueryString?: string | null }
  }

  const cta = resolveCta(payload.cta)

  return (
    <section className="section section--spacious">
      <div className="shell">
        <div className="challenge-banner">
          <div className="challenge-banner__content">
            {payload.eyebrow && (
              <span className="eyebrow eyebrow--amber">
                <span className="eyebrow__dot" />
                {payload.eyebrow}
              </span>
            )}
            <h2 className="challenge-banner__title">{payload.heading}</h2>
            <p className="challenge-banner__text">{payload.text}</p>

            <div className="stat-grid">
              {(payload.stats ?? []).map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className={`stat-card__value ${TONE_CLASS[stat.tone ?? 'accent'] ?? ''}`}>
                    {stat.value}
                  </div>
                  <div className="stat-card__label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {cta && (
            <div className="challenge-banner__action">
              <Action label={cta.label} href={cta.href} external={cta.external} variant="amber" />
              {payload.note && <span className="challenge-banner__note">{payload.note}</span>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
