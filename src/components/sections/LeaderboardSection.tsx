import type { CmsSection } from '../../types/cms'
import type { LeaderboardEntry } from '../../types/sections'
import { UsersIcon } from '../Icons'

interface LeaderboardSectionProps {
  section: CmsSection
}

export default function LeaderboardSection({ section }: LeaderboardSectionProps) {
  const payload = section as unknown as {
    heading?: string
    note?: string
    entries?: LeaderboardEntry[]
  }

  return (
    <section className="section section--tight">
      <div className="shell">
        <div className="leaderboard">
          <div className="leaderboard__head">
            <h3 className="leaderboard__title">
              <UsersIcon size={18} />
              {payload.heading ?? 'Top performers'}
            </h3>
            {payload.note && <span className="pill-status">{payload.note}</span>}
          </div>

          {(payload.entries ?? []).map((entry) => (
            <div key={entry.name} className="leaderboard__row">
              <div>
                <div className="leaderboard__name">
                  {entry.name} <span className="text-dim">({entry.country})</span>
                </div>
                <div className="leaderboard__meta">{entry.broker}</div>
              </div>
              <div>
                <div className="leaderboard__balance">{entry.balance}</div>
                <div className="leaderboard__roi">{entry.roi}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
