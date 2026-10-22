import type { CmsSection } from '../../types/cms'
import Action from '../Action'
import { resolveCta } from '../../utils/cta'

interface CtaSectionProps {
  section: CmsSection
}

export default function CtaSection({ section }: CtaSectionProps) {
  const payload = section as unknown as {
    heading: string
    text: string
    backgroundImage?: string
    cta?: { label?: string | null; url?: string | null; fragmentAndQueryString?: string | null; isTargetBlank?: boolean }
  }

  const cta = resolveCta(payload.cta)

  return (
    <section className="section cta-section">
      {payload.backgroundImage && (
        <div className="cta-section__media">
          <img src={payload.backgroundImage} alt="" loading="lazy" decoding="async" />
        </div>
      )}

      <div className="cta-section__inner">
        <div className="cta-section__content">
          <h2 className="cta-section__title">{payload.heading}</h2>
          <p className="cta-section__text">{payload.text}</p>
        </div>

        {cta && (
          <Action label={cta.label} href={cta.href} external={cta.external} variant="accent" />
        )}
      </div>
    </section>
  )
}
