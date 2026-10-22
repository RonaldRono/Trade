import type { HeroSectionData } from '../data/content'
import Action from './Action'

interface HeroV3Props {
  section: HeroSectionData
  className?: string
}

export default function HeroV3({ section, className = '' }: HeroV3Props) {
  const {
    anchorId,
    layout,
    hasGradient,
    size = 'cover',
    heading,
    text,
    image,
    imageAlt,
    meta,
    cta,
  } = section

  return (
    <section
      className={`section hero-v3 ${className}`.trim()}
      data-size={size}
      data-layout={layout}
      {...(hasGradient ? { 'data-has-gradient': 'true' } : {})}
    >
      <div id={anchorId} className="section__anchor" />

      <div className="hero-v3__background">
        <img
          className="hero-v3__background-image"
          src={image}
          alt={imageAlt}
          width={2880}
          height={1620}
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="hero-v3__content-wrapper">
        <div className="hero-v3__content">
          <div className="hero-v3__description">
            <h1 className="hero-v3__heading">{heading}</h1>
            <p className="hero-v3__text">{text}</p>

            {meta && meta.length > 0 && (
              <div className="hero-v3__meta">
                {meta.map((item) => (
                  <div key={item.label} className="hero-v3__meta-item">
                    <span className="hero-v3__meta-value">{item.value}</span>
                    <span className="hero-v3__meta-label">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="hero-v3__actions">
            <Action label={cta.label} href={cta.href} external={cta.external} variant="accent" />
          </div>
        </div>
      </div>
    </section>
  )
}
