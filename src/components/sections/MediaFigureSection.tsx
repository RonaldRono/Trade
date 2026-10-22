import type { CmsSection } from '../../types/cms'

interface MediaFigureSectionProps {
  section: CmsSection
}

export default function MediaFigureSection({ section }: MediaFigureSectionProps) {
  const payload = section as unknown as {
    image: string
    imageAlt: string
    tag?: string
    title?: string
  }

  return (
    <section className="section section--tight">
      <div className="shell">
        <figure className="media-figure" style={{ aspectRatio: '16 / 7' }}>
          <img className="media-figure__image" src={payload.image} alt={payload.imageAlt} loading="lazy" />
          <span className="media-figure__overlay" />
          <figcaption className="media-figure__caption">
            {payload.tag && <span className="media-figure__tag">{payload.tag}</span>}
            {payload.title && <span className="media-figure__title">{payload.title}</span>}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
