interface SectionHeaderProps {
  eyebrow?: string
  heading?: string
  text?: string
  align?: 'center' | 'left'
  tone?: 'accent' | 'green' | 'amber' | 'violet'
}

export default function SectionHeader({
  eyebrow,
  heading,
  text,
  align = 'center',
  tone = 'accent',
}: SectionHeaderProps) {
  if (!eyebrow && !heading && !text) return null

  const toneClass =
    tone === 'green'
      ? 'eyebrow--green'
      : tone === 'amber'
        ? 'eyebrow--amber'
        : tone === 'violet'
          ? 'eyebrow--violet'
          : ''

  return (
    <div className={`section__header${align === 'left' ? ' section__header--left' : ''}`}>
      {eyebrow && (
        <span className={`eyebrow ${toneClass}`}>
          <span className="eyebrow__dot" />
          {eyebrow}
        </span>
      )}
      {heading && <h2>{heading}</h2>}
      {text && <p>{text}</p>}
    </div>
  )
}
