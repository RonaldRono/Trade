import type { PageData } from '../types/cms'
import homePage from './pages/home.json'
import indicatorsPage from './pages/indicators.json'
import signalsPage from './pages/signals.json'
import challengePage from './pages/challenge.json'
import calculatorPage from './pages/calculator.json'
import terminalPage from './pages/terminal.json'
import accountPage from './pages/account.json'
import contactPage from './pages/contact.json'
import riskDisclosurePage from './pages/risk-disclosure.json'
import termsPage from './pages/terms-and-conditions.json'
import privacyPage from './pages/privacy-policy.json'

export const PAGE_REGISTRY: Record<string, PageData> = {
  home: homePage as PageData,
  indicators: indicatorsPage as PageData,
  signals: signalsPage as PageData,
  challenge: challengePage as PageData,
  calculator: calculatorPage as PageData,
  terminal: terminalPage as PageData,
  account: accountPage as PageData,
  contact: contactPage as PageData,
  'risk-disclosure': riskDisclosurePage as PageData,
  'terms-and-conditions': termsPage as PageData,
  'privacy-policy': privacyPage as PageData,
}

export const PAGE_SLUGS = Object.keys(PAGE_REGISTRY)

export function getPageData(slug: string): PageData | undefined {
  return PAGE_REGISTRY[slug]
}
