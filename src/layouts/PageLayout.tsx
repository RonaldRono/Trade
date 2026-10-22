import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import MarketTicker from '../components/MarketTicker'
import { FOOTER_EXTENSION } from '../data/content'
import { getPageData } from '../data/pageRegistry'
import { resolveCtaHref } from '../utils/cta'
import type { FooterExtensionConfig } from '../components/Footer'
import type { PageData } from '../types/cms'

function getFooterExtension(page?: PageData): FooterExtensionConfig | null {
  if (!page?.isExtendedFooterEnabled || !page.extendedFooterHeading) {
    return null
  }

  const cta = page.extendedFooterCta
  const href = resolveCtaHref(cta) ?? '/contact'

  return {
    anchorId: 'footerextension',
    layout: 'text aligned to left / cta aligned to left',
    size: 'half',
    heading: page.extendedFooterHeading,
    text: page.extendedFooterText ?? '',
    image: page.extendedFooterImage?.src ?? '/images/global-desk.jpg',
    imageAlt: page.extendedFooterImage?.description ?? 'Treads Algo trading desk',
    cta: {
      label: cta?.label ?? 'Contact VIP Desk',
      href,
      external: Boolean(cta?.isTargetBlank || cta?.url?.startsWith('http')),
    },
    backgroundImage: page.extendedFooterImage?.src,
  }
}

export default function PageLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const slug = isHome ? null : location.pathname.replace(/^\//, '')
  const page = slug ? getPageData(slug) : undefined

  const extension = isHome ? FOOTER_EXTENSION : getFooterExtension(page)
  const showExtension = isHome || Boolean(page?.isExtendedFooterEnabled)

  useEffect(() => {
    const title = isHome ? 'Treads Algo' : (page?.title ?? 'Treads Algo')
    document.title = title.includes('Treads Algo') ? title : `${title} | Treads Algo`
    if (page?.description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', page.description)
    }
    window.scrollTo(0, 0)
  }, [location.pathname, isHome, page?.title, page?.description])

  return (
    <>
      <MarketTicker />
      <Navigation />
      <Outlet />
      <Footer extension={extension} showExtension={showExtension} />
    </>
  )
}
