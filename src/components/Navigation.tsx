import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/content'
import { useNavigationScroll } from '../hooks/useNavigationScroll'

function TreadLogo() {
  return (
    <svg
      className="navigation__logo"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0.9" y="0.9" width="22.2" height="22.2" rx="6" fill="currentColor" opacity="0.12" />
      <path
        d="M13.6 4.5 6.4 14.4h4.3l-1.1 6.1 7.2-9.9h-4.3l1.1-6.1Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Navigation() {
  const { isScrolled, isScrollingBack } = useNavigationScroll()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()

  const closeMobileNav = () => setMobileNavOpen(false)

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname === href || location.pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <div className="navigation-background" />
      <header
        className="navigation"
        data-is-scrolled={isScrolled ? 'true' : 'false'}
        data-is-scrolling-back={isScrollingBack ? 'true' : 'false'}
        data-is-mobile-navigation-active={mobileNavOpen ? 'true' : 'false'}
      >
        <div className="navigation__content">
          <Link
            className={`navigation__home-link${location.pathname === '/' ? ' is-active' : ''}`}
            title="Home"
            to="/"
            onClick={closeMobileNav}
          >
            <TreadLogo />
            <span className="navigation__wordmark">
              <span className="navigation__wordmark-primary">TREADS</span>
              <span className="navigation__wordmark-secondary">ALGO PRO</span>
            </span>
          </Link>

          <nav className="navigation__links-wrapper" aria-label="Main navigation">
            <div className="navigation__links">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="navigation__link-wrapper">
                  <Link
                    className={`navigation__link${isActive(link.href) ? ' is-active' : ''}`}
                    title={link.label}
                    to={link.href}
                    onClick={closeMobileNav}
                  >
                    <span className="navigation__link-label">{link.label}</span>
                    {link.badge && (
                      <span
                        className={`navigation__link-badge navigation__link-badge--${link.badgeTone ?? 'accent'}`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </nav>

          <button
            className={`navigation__toggle navigation-toggle${mobileNavOpen ? ' is-active' : ''}`}
            aria-label={mobileNavOpen ? 'Close main navigation' : 'Open main navigation'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            <span className="navigation-toggle__icon" />
            <span className="navigation-toggle__icon navigation-toggle__icon--secondary" />
          </button>
        </div>
      </header>

      {mobileNavOpen && (
        <div className="navigation__mobile-panel">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              className={`navigation__mobile-link${isActive(link.href) ? ' is-active' : ''}`}
              to={link.href}
              onClick={closeMobileNav}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className={`navigation__link-badge navigation__link-badge--${link.badgeTone ?? 'accent'}`}>
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
