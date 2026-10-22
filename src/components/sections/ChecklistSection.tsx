import type { CmsSection } from '../../types/cms'
import type { ChecklistStep } from '../../types/sections'
import SectionHeader from './SectionHeader'
import Action from '../Action'
import { resolveCta } from '../../utils/cta'

interface ChecklistSectionProps {
  section: CmsSection
}

export default function ChecklistSection({ section }: ChecklistSectionProps) {
  const payload = section as unknown as {
    eyebrow?: string
    heading?: string
    steps?: ChecklistStep[]
    cta?: { label?: string | null; url?: string | null; fragmentAndQueryString?: string | null }
  }

  const cta = resolveCta(payload.cta)

  return (
    <section className="section section--spacious section--tinted">
      <div className="shell">
        <SectionHeader eyebrow={payload.eyebrow} heading={payload.heading} />

        <div className="checklist">
          {(payload.steps ?? []).map((step) => (
            <div key={step.title} className="checklist__item">
              <span className="checklist__number" />
              <div>
                <div className="checklist__title">{step.title}</div>
                <p className="checklist__text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {cta && (
          <div style={{ marginTop: '3rem' }}>
            <Action label={cta.label} href={cta.href} external={cta.external} variant="accent" />
          </div>
        )}
      </div>
    </section>
  )
}
