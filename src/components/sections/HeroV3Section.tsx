import HeroV3 from '../HeroV3'
import type { HeroV3Payload } from '../../types/sections'
import type { CmsSection } from '../../types/cms'

interface HeroV3SectionProps {
  section: CmsSection
}

export default function HeroV3Section({ section }: HeroV3SectionProps) {
  const payload = section as unknown as HeroV3Payload

  return (
    <HeroV3
      section={{
        anchorId: payload.anchorId ?? 'hero',
        layout: payload.layout ?? 'text aligned to left / cta aligned to right',
        hasGradient: payload.hasGradient,
        size: payload.size ?? 'cover',
        heading: payload.heading,
        text: payload.text,
        image: payload.image,
        imageAlt: payload.imageAlt ?? payload.heading,
        meta: payload.meta,
        cta: {
          label: payload.cta?.label ?? 'Learn more',
          href: payload.cta?.url ?? payload.cta?.fragmentAndQueryString ?? '#',
          external: Boolean(payload.cta?.isTargetBlank),
        },
      }}
    />
  )
}
