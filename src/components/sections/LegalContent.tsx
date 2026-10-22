import type { CmsSection, RichTextField } from '../../types/cms'
import { renderRichText } from '../../utils/richText'

interface LegalContentProps {
  section: CmsSection
}

export default function LegalContent({ section }: LegalContentProps) {
  const payload = section as unknown as { body?: RichTextField }

  return (
    <section className="section section--spacious">
      <div className="shell">
        <article className="rich-text legal-content">{renderRichText(payload.body)}</article>
      </div>
    </section>
  )
}
