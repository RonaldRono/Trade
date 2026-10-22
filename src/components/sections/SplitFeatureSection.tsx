import type { CmsSection } from '../../types/cms'
import type { SplitBullet } from '../../types/sections'
import Action from '../Action'
import { resolveCta } from '../../utils/cta'

interface SplitFeatureSectionProps {
  section: CmsSection
}

export default function SplitFeatureSection({ section }: SplitFeatureSectionProps) {
  const payload = section as unknown as {
    eyebrow?: string
    title: string
    text: string
    image: string
    imageAlt: string
    bullets?: SplitBullet[]
    cta?: { label?: string | null; url?: string | null; fragmentAndQueryString?: string | null }
    reverse?: boolean
  }

  const cta = resolveCta(payload.cta)

  return (
    <section className="section section--spacious">
      <div className="shell">
        <div className={`split${payload.reverse ? ' split--reverse' : ''}`}>
          <div className="split__content">
            {payload.eyebrow && (
              <span className="eyebrow">
                <span className="eyebrow__dot" />
                {payload.eyebrow}
              </span>
            )}
            <h2 className="split__title">{payload.title}</h2>
            <p className="split__text">{payload.text}</p>

            {payload.bullets && payload.bullets.length > 0 && (
              <ul className="spec-list">
                {payload.bullets.map((bullet) => (
                  <li key={bullet.text} className="spec-list__item">
                    <span className="spec-list__marker" />
                    <span>{bullet.text}</span>
                  </li>
                ))}
              </ul>
            )}

            {cta && (
              <div>
                <Action label={cta.label} href={cta.href} external={cta.external} variant="accent" />
              </div>
            )}
          </div>

          <div className="split__media">
            <img src={payload.image} alt={payload.imageAlt} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  )
}
