import HeroV3 from '../components/HeroV3'
import SectionRenderer from '../components/sections/SectionRenderer'
import { HERO_SECTIONS } from '../data/content'
import { getPageData } from '../data/pageRegistry'

export default function HomePage() {
  const page = getPageData('home')

  return (
    <main>
      {HERO_SECTIONS.map((section) => (
        <HeroV3 key={section.anchorId} section={section} />
      ))}

      {page?.sections.map((section) => (
        <SectionRenderer key={section.id ?? section.__typename} section={section} />
      ))}
    </main>
  )
}
