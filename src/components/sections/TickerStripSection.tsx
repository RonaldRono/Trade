import type { CmsSection } from '../../types/cms'
import type { TickerItem } from '../../types/sections'
import { TICKER_ITEMS } from '../../data/content'

interface TickerStripSectionProps {
  section: CmsSection
}

export default function TickerStripSection({ section }: TickerStripSectionProps) {
  const payload = section as unknown as { items?: TickerItem[] }
  const items = payload.items?.length ? payload.items : [...TICKER_ITEMS]
  const loop = [...items, ...items]

  return (
    <div className="ticker" aria-label="Live synthetic index prices">
      <div className="ticker__track">
        {loop.map((item, index) => (
          <span className="ticker__item" key={`${item.symbol}-${index}`}>
            <span className="ticker__symbol">{item.symbol}</span>
            <span className="ticker__price">
              {item.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={item.up ? 'ticker__change ticker__change--up' : 'ticker__change ticker__change--down'}
            >
              {item.change}
            </span>
            <span className="ticker__divider">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}
