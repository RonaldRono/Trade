interface ActionProps {
  label: string
  href: string
  external?: boolean
  variant?: 'default' | 'accent' | 'green' | 'amber'
  onClick?: () => void
}

function DiagonalArrow() {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="action__icon"
      data-icon-type="diagonal-arrow"
      aria-hidden="true"
    >
      <path d="M0.75 11.75L11.25 1.25M11.25 1.25H0.75M11.25 1.25V11.75" stroke="currentColor" />
    </svg>
  )
}

export default function Action({ label, href, external, variant = 'default', onClick }: ActionProps) {
  const className = ['action', variant !== 'default' ? `action--${variant}` : ''].filter(Boolean).join(' ')

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        <span className="action__label">
          {label}
          <DiagonalArrow />
        </span>
      </button>
    )
  }

  return (
    <a
      title={label}
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="action__label">
        {label}
        <DiagonalArrow />
      </span>
    </a>
  )
}
