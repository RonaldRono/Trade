import { useState } from 'react'
import type { CmsSection } from '../../types/cms'
import type { LicenseItem } from '../../types/sections'

interface LicenseManagerSectionProps {
  section: CmsSection
}

export default function LicenseManagerSection({ section }: LicenseManagerSectionProps) {
  const payload = section as unknown as { licenses?: LicenseItem[] }
  const licenses = payload.licenses ?? []
  const [notice, setNotice] = useState<string | null>(null)

  const resetHwid = (license: LicenseItem) => {
    setNotice(`Hardware ID reset! You can now activate ${license.name} on your new VPS or MT5 device.`)
    setTimeout(() => setNotice(null), 6000)
  }

  return (
    <section className="section section--spacious" id="licenses">
      <div className="shell">
        <div className="stack stack--lg">
          <div className="section__header section__header--left">
            <span className="eyebrow">
              <span className="eyebrow__dot" />
              Authenticated client terminal
            </span>
            <h2>My active licences</h2>
            <p>
              Hardware-bound MT5 indicator licences bound to this workstation. Reset a device binding
              when you migrate to a new VPS.
            </p>
          </div>

          {notice && (
            <div className="support-form__success">
              <h4>Hardware ID reset</h4>
              <p>{notice}</p>
            </div>
          )}

          <div className="stack stack--sm">
            {licenses.map((license) => (
              <div key={license.key} className="license-card">
                <div>
                  <div className="license-card__name">{license.name}</div>
                  <div className="license-card__key">{license.key}</div>
                  <div className="license-card__hwid">{license.hwid}</div>
                </div>

                <div className="cluster" style={{ alignItems: 'center' }}>
                  <span className="pill-status">{license.status}</span>
                  <button type="button" className="button button--ghost" onClick={() => resetHwid(license)}>
                    Reset HWID
                  </button>
                  <button type="button" className="button button--ghost">
                    Download .EX5 Package (.ZIP)
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="guarantee">
            <div className="guarantee__item">
              <span className="guarantee__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5l-8-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <div>
                <div className="guarantee__title">Hardware-ID anti-tamper lock active</div>
                <p className="guarantee__text">
                  Each licence is bound to a single Win64 hardware identifier. A reset frees the
                  binding so you can install on a replacement machine.
                </p>
              </div>
            </div>

            <div className="guarantee__item">
              <span className="guarantee__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <div>
                <div className="guarantee__title">Build 2026.10-PRO</div>
                <p className="guarantee__text">
                  Every package ships with the current MT5 build, the installation manual and
                  pre-calibrated preset templates.
                </p>
              </div>
            </div>

            <div className="guarantee__item">
              <span className="guarantee__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M4 5h16v14H4z" />
                  <path d="M8 9h8M8 13h5" />
                </svg>
              </span>
              <div>
                <div className="guarantee__title">PDF manual &amp; presets</div>
                <p className="guarantee__text">
                  Download the full manual and .set preset bundle, or ask the VIP desk to install
                  the package for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
