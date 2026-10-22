import type { CmsCta, CmsSection } from './cms'

export type HeroLayout =
  | 'text aligned to left / cta aligned to right'
  | 'text aligned to right / cta aligned to left'
  | 'text aligned to left / cta aligned to left'

export interface HeroMetaItem {
  value: string
  label: string
}

export interface HeroV3Payload {
  anchorId: string
  layout: HeroLayout
  hasGradient?: boolean
  size?: 'cover' | 'half'
  heading: string
  text: string
  image: string
  imageAlt: string
  cta: CmsCta
  meta?: HeroMetaItem[]
}

export interface TickerItem {
  symbol: string
  price: number
  change: string
  up: boolean
}

export interface StatItem {
  value: string
  label: string
  detail?: string
  tone?: 'accent' | 'green' | 'amber' | 'violet'
}

export interface ProductItem {
  id: string
  name: string
  category: string
  price: number
  winRate: string
  platform: string
  badge: string
  badgeTone?: 'accent' | 'green' | 'amber' | 'violet' | 'blue'
  description: string
  image: string
  specs: string[]
  timeframe: string
}

export interface ValueItem {
  title: string
  text: string
  icon: string
}

export interface FeatureItem {
  kicker: string
  title: string
  text: string
  image: string
  imageAlt: string
}

export interface StageItem {
  kicker: string
  value: string
  text: string
  final?: boolean
}

export interface LeaderboardEntry {
  name: string
  country: string
  broker: string
  balance: string
  roi: string
}

export interface SignalItem {
  id: string
  asset: string
  broker: string
  type: string
  entry: number
  sl: number
  tp1: number
  tp2: number
  confidence: string
  time: string
  status: string
}

export interface CalculatorAsset {
  name: string
  multiplier: number
  minLot: number
  typicalSpike: number
}

export interface TerminalAsset {
  id: string
  label: string
  mode: string
  base: number
  drift: number
  volatility: number
}

export interface LicenseItem {
  name: string
  key: string
  status: string
  hwid: string
}

export interface ChecklistStep {
  title: string
  text: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface SplitBullet {
  text: string
}

export interface RichTextPayload {
  body: {
    json: {
      nodeType: string
      content?: unknown[]
    }
  }
}

export interface SectionMap {
  HeroV3: HeroV3Payload
  TickerStrip: { items: TickerItem[] }
  StatGrid: { eyebrow?: string; heading?: string; text?: string; stats: StatItem[] }
  ProductGrid: {
    eyebrow?: string
    heading?: string
    text?: string
    products: ProductItem[]
    note?: string
  }
  FeatureTrio: { eyebrow?: string; heading?: string; text?: string; features: FeatureItem[] }
  ChallengeBanner: {
    eyebrow?: string
    heading: string
    text: string
    stats: StatItem[]
    cta: CmsCta
    note?: string
  }
  ValuesModule: { eyebrow?: string; heading?: string; text?: string; values: ValueItem[] }
  StageTimeline: { eyebrow?: string; heading?: string; text?: string; stages: StageItem[] }
  Leaderboard: { heading?: string; note?: string; entries: LeaderboardEntry[] }
  SignalFeed: { signals: SignalItem[]; membership: MembershipPayload }
  CalculatorModule: { assets: CalculatorAsset[] }
  TerminalModule: { assets: TerminalAsset[] }
  LicenseManager: { licenses: LicenseItem[] }
  Checklist: { eyebrow?: string; heading?: string; steps: ChecklistStep[]; cta?: CmsCta }
  FaqAccordion: { eyebrow?: string; heading?: string; items: FaqItem[] }
  SupportForm: { subjects: string[]; mode?: 'support' | 'challenge' }
  Countdown: { label: string; hours: number; slotsRemaining: string }
  SplitFeature: {
    eyebrow?: string
    title: string
    text: string
    image: string
    imageAlt: string
    bullets?: SplitBullet[]
    cta?: CmsCta
    reverse?: boolean
  }
  MediaFigure: { image: string; imageAlt: string; tag?: string; title?: string }
  Cta: {
    heading: string
    text: string
    cta: CmsCta
    backgroundImage?: string
  }
  RichTextPageContent: RichTextPayload
  LegalContent: RichTextPayload
}

export interface MembershipPayload {
  heading: string
  text: string
  image: string
  imageAlt: string
  bullets: string[]
  price: string
  period: string
  cta: CmsCta
  footnote?: string
}

export type TypedSection<K extends keyof SectionMap> = CmsSection & SectionMap[K]
