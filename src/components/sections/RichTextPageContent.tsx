import type { CmsSection } from '../../types/cms'
import type { RichTextField } from '../../types/cms'
import { renderRichText } from '../../utils/richText'

interface RichTextPageContentProps {
  section: CmsSection
}

export default function RichTextPageContent({ section }: RichTextPageContentProps) {
  const payload = section as unknown as { body?: RichTextField }

  return (
    <section className="section section--spacious">
      <div className="shell">
        <div className="rich-text">{renderRichText(payload.body)}</div>
      </div>
    </section>
  )
}
