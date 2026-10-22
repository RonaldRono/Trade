import type { CmsSection } from '../../types/cms'
import HeroV3Section from './HeroV3Section'
import TickerStripSection from './TickerStripSection'
import StatGridSection from './StatGridSection'
import ProductGridSection from './ProductGridSection'
import FeatureTrioSection from './FeatureTrioSection'
import ChallengeBannerSection from './ChallengeBannerSection'
import ValuesModule from './ValuesModule'
import StageTimelineSection from './StageTimelineSection'
import LeaderboardSection from './LeaderboardSection'
import SignalFeedSection from './SignalFeedSection'
import CalculatorSection from './CalculatorSection'
import TerminalSection from './TerminalSection'
import LicenseManagerSection from './LicenseManagerSection'
import ChecklistSection from './ChecklistSection'
import FaqAccordionSection from './FaqAccordionSection'
import SupportFormSection from './SupportFormSection'
import SplitFeatureSection from './SplitFeatureSection'
import MediaFigureSection from './MediaFigureSection'
import CtaSection from './CtaSection'
import RichTextPageContent from './RichTextPageContent'
import LegalContent from './LegalContent'
import CountdownSection from './CountdownSection'

interface SectionRendererProps {
  section: CmsSection
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.__typename) {
    case 'HeroV3':
      return <HeroV3Section section={section} />
    case 'TickerStrip':
      return <TickerStripSection section={section} />
    case 'StatGrid':
      return <StatGridSection section={section} />
    case 'ProductGrid':
      return <ProductGridSection section={section} />
    case 'FeatureTrio':
      return <FeatureTrioSection section={section} />
    case 'ChallengeBanner':
      return <ChallengeBannerSection section={section} />
    case 'ValuesModule':
      return <ValuesModule section={section} />
    case 'StageTimeline':
      return <StageTimelineSection section={section} />
    case 'Leaderboard':
      return <LeaderboardSection section={section} />
    case 'SignalFeed':
      return <SignalFeedSection section={section} />
    case 'CalculatorModule':
      return <CalculatorSection section={section} />
    case 'TerminalModule':
      return <TerminalSection section={section} />
    case 'LicenseManager':
      return <LicenseManagerSection section={section} />
    case 'Checklist':
      return <ChecklistSection section={section} />
    case 'FaqAccordion':
      return <FaqAccordionSection section={section} />
    case 'SupportForm':
      return <SupportFormSection section={section} />
    case 'SplitFeature':
      return <SplitFeatureSection section={section} />
    case 'MediaFigure':
      return <MediaFigureSection section={section} />
    case 'Cta':
      return <CtaSection section={section} />
    case 'Countdown':
      return <CountdownSection section={section} />
    case 'RichTextPageContent':
      return <RichTextPageContent section={section} />
    case 'LegalContent':
      return <LegalContent section={section} />
    default:
      return null
  }
}
