import { Navigate, useParams } from 'react-router-dom'
import SectionRenderer from '../components/sections/SectionRenderer'
import { getPageData } from '../data/pageRegistry'

export default function CmsPage() {
  const { slug } = useParams<{ slug: string }>()
  const page = slug ? getPageData(slug) : undefined

  if (!page) {
    return <Navigate to="/" replace />
  }

  return (
    <main>
      <section className="page-intro">
        {page.heroImage && (
          <div className="page-intro__media">
            <img src={page.heroImage} alt={page.heroImageAlt ?? page.title ?? ''} decoding="async" />
          </div>
        )}
        <div className="page-intro__inner">
          <h1 className="page-intro__title">{page.title}</h1>
          {page.description && <p className="page-intro__text">{page.description}</p>}
        </div>
      </section>

      {page.sections.map((section) => (
        <SectionRenderer key={section.id ?? section.__typename} section={section} />
      ))}
    </main>
  )
}
