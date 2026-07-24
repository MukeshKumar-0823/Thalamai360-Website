export default function Footer() {
  const currentYear = 2026

  const navLinks = [
    { label: 'About', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Approach', href: '#approach' },
    { label: 'Partnerships', href: '#partnerships' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: 'var(--color-black)',
        borderTop: '1px solid var(--color-border)',
        padding: '40px 80px',
      }}
      aria-label="Site footer"
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-tamil"
                style={{ fontSize: 16, color: 'var(--color-gold)', letterSpacing: '0.05em' }}
              >
                தலைமை
              </span>
              <span
                className="font-playfair font-semibold"
                style={{ fontSize: 18, color: 'var(--color-white)' }}
              >
                360
              </span>
            </div>
            <p
              className="font-inter"
              style={{ fontSize: 12, color: 'var(--color-muted)', letterSpacing: '0.05em' }}
            >
              Leadership. Governance. Impact.
            </p>
          </div>

          {/* Center: Nav Links */}
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Footer navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="font-inter"
                style={{
                  fontSize: 13,
                  color: 'var(--color-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Copyright */}
          <div className="flex flex-col gap-1 text-right">
            <p
              className="font-inter"
              style={{ fontSize: 12, color: 'var(--color-muted)' }}
            >
              © {currentYear} Thalaimai 360. All Rights Reserved.
            </p>
            <p
              className="font-inter"
              style={{ fontSize: 12, color: 'var(--color-muted)' }}
            >
              Made in Tamil Nadu, India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
