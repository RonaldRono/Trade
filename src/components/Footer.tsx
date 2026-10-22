import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FOOTER_EXTENSION, FOOTER_LINKS, FOOTER_LOGO, type HeroSectionData } from '../data/content'
import ContactModal from './ContactModal'
import HeroV3 from './HeroV3'
import { HeadsetIcon, MailIcon, RadioIcon, TerminalIcon } from './Icons'

export interface FooterExtensionConfig extends HeroSectionData {
  backgroundImage?: string
}

interface FooterProps {
  showExtension?: boolean
  extension?: FooterExtensionConfig | null
}

const CHANNEL_LINKS = [
  {
    label: 'VIP Desk Telegram',
    href: 'https://t.me/ethanglobalsolutions',
    external: true,
    icon: <RadioIcon size={16} />,
  },
  {
    label: 'Email the trading desk',
    href: 'mailto:support@treads-algo.com',
    external: false,
    icon: <MailIcon size={16} />,
  },
  {
    label: 'Live terminal',
    href: '/terminal',
    external: false,
    icon: <TerminalIcon size={16} />,
  },
  {
    label: 'VIP signals channel',
    href: '/signals',
    external: false,
    icon: <HeadsetIcon size={16} />,
  },
] as const

export default function Footer({ showExtension = true, extension }: FooterProps) {
  const [email, setEmail] = useState('')
  const [contactOpen, setContactOpen] = useState(false)

  const extensionSection = extension ?? FOOTER_EXTENSION

  return (
    <>
      <footer id="footer" className="footer">
        {showExtension && (
          <div className="footer__extension">
            <HeroV3 section={extensionSection} />
          </div>
        )}

        <div className="footer__content-wrapper">
          <div className="footer__content">
            <div className="footer__top">
              <div className="footer__left">
                <div className="footer__left-inner">
                  <Link to="/" title="Treads Algo home">
                    <img
                      alt="Treads Algo"
                      src={FOOTER_LOGO}
                      width={320}
                      height={60}
                      decoding="async"
                      className="footer__logo"
                      loading="lazy"
                    />
                  </Link>

                  <section className="footer__newsletter-container">
                    <h1 className="footer__newsletter-heading">Keep up with us</h1>
                    <p className="footer__newsletter-description">
                      Get signal releases, new indicator builds and challenge round announcements.
                    </p>

                    <form
                      className="newsletter-form footer__newsletter-component"
                      aria-label="Subscribe to newsletter"
                      onSubmit={(event) => {
                        event.preventDefault()
                        setEmail('')
                      }}
                    >
                      <div className="custom-input__field custom-input__field--is-input">
                        <div className="custom-input__label-input-container">
                          <label className="custom-input__label">
                            <span className="custom-input__label-text">Email Address*</span>
                            <input
                              className="custom-input__input"
                              name="email"
                              type="email"
                              required
                              aria-invalid="false"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                            />
                          </label>
                          <button type="submit" className="newsletter-form__button">
                            Sign Up
                          </button>
                        </div>
                      </div>
                      <p id="footernewsletter-newsletter-form" className="newsletter-form__description" aria-live="polite" />
                    </form>
                  </section>

                  <nav className="footer__social-links" aria-label="Quick channels">
                    {CHANNEL_LINKS.map((channel) => (
                      <a
                        key={channel.label}
                        className="footer__social-link"
                        title={channel.label}
                        {...(channel.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        href={channel.href}
                      >
                        {channel.icon}
                      </a>
                    ))}
                  </nav>

                  <button
                    type="button"
                    className="footer__contact-button"
                    aria-label="Open contact form"
                    onClick={() => setContactOpen(true)}
                  >
                    Contact Us
                    <span className="icon arrow-button__icon icon--arrow">
                      <span className="icon__solid">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M1 15.4907L14.9814 1.50928M14.9814 1.50928H1M14.9814 1.50928V15.4907" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              </div>

              <nav className="footer__primary-links" aria-label="Site links">
                {FOOTER_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    className="footer__primary-link"
                    title={link.label}
                    to={link.href}
                  >
                    <span className="footer__primary-link-label">{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footer__bottom">
              <nav className="footer__secondary-links" aria-label="Legal Site links">
                <p className="footer__copyright">© Treads Algo &amp; MT5 Systems 2026.</p>
                <Link className="footer__secondary-link" to="/terms-and-conditions">
                  Terms &amp; Conditions
                </Link>
                <Link className="footer__secondary-link" to="/privacy-policy">
                  Privacy Policy
                </Link>
                <Link className="footer__secondary-link" to="/risk-disclosure">
                  Risk Disclosure
                </Link>
              </nav>

              <p className="footer__risk">
                <strong>Risk Disclosure:</strong> Trading Boom &amp; Crash, synthetic indices and
                foreign exchange on margin carries high risk and may not be suitable for all
                investors. Treads Algo provides quantitative software tools, algorithmic signals
                and educational indicators. Never risk capital you cannot afford to lose.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
