import type { CmsSection } from '../../types/cms'
import type { StageItem } from '../../types/sections'
import SectionHeader from './SectionHeader'

interface StageTimelineSectionProps {
  section: CmsSection
}

export default function StageTimelineSection({ section }: StageTimelineSectionProps) {
  const payload = section as unknown as {
    eyebrow?: string
    heading?: string
    text?: string
    stages?: StageItem[]
  }

  return (
    <section className="section section--spacious">
      <div className="shell">
        <SectionHeader eyebrow={payload.eyebrow} heading={payload.heading} text={payload.text} />

        <div className="grid grid--3">
          {(payload.stages ?? []).map((stage) => (
            <article
              key={stage.kicker}
              className={`stage-card${stage.final ? ' stage-card--final' : ''}`}
            >
              <div className="stage-card__kicker">{stage.kicker}</div>
              <div className="stage-card__value">{stage.value}</div>
              <p className="stage-card__text">{stage.text}</p>
              <div className="stage-card__bar">
                <div className="stage-card__bar-fill" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
