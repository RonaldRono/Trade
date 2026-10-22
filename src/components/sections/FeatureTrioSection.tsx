import type { CmsSection } from '../../types/cms'
import type { FeatureItem } from '../../types/sections'
import SectionHeader from './SectionHeader'

interface FeatureTrioSectionProps {
  section: CmsSection
}

export default function FeatureTrioSection({ section }: FeatureTrioSectionProps) {
  const payload = section as unknown as {
    eyebrow?: string
    heading?: string
    text?: string
    features?: FeatureItem[]
  }

  return (
    <section className="section section--spacious section--tinted">
      <div className="shell">
        <SectionHeader eyebrow={payload.eyebrow} heading={payload.heading} text={payload.text} />

        <div className="feature-trio">
          {(payload.features ?? []).map((feature) => (
            <article key={feature.title} className="feature-trio__card">
              <div className="feature-trio__media">
                <img src={feature.image} alt={feature.imageAlt} loading="lazy" decoding="async" />
                <span className="feature-trio__kicker">{feature.kicker}</span>
              </div>
              <div className="feature-trio__body">
                <h3 className="feature-trio__title">{feature.title}</h3>
                <p className="feature-trio__text">{feature.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
