import type { CmsSection } from '../../types/cms'
import type { ValueItem } from '../../types/sections'
import SectionHeader from './SectionHeader'
import { VALUE_ICONS } from '../Icons'

interface ValuesModuleProps {
  section: CmsSection
}

export default function ValuesModule({ section }: ValuesModuleProps) {
  const payload = section as unknown as {
    eyebrow?: string
    heading?: string
    text?: string
    values?: ValueItem[]
  }

  return (
    <section className="section section--spacious section--tinted">
      <div className="shell">
        <SectionHeader eyebrow={payload.eyebrow} heading={payload.heading} text={payload.text} />

        <div className="grid grid--4">
          {(payload.values ?? []).map((value) => {
            const Icon = VALUE_ICONS[value.icon] ?? VALUE_ICONS.zap

            return (
              <article key={value.title} className="value-card">
                <span className="value-card__icon">
                  <Icon size={22} />
                </span>
                <h3 className="value-card__title">{value.title}</h3>
                <p className="value-card__text">{value.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
