import { T } from '@/tokens'
import { SITE, FOOTER_COLUMNS } from '@/data'

export function Footer() {
  return (
    <footer style={{ background: T.bg, padding: '60px 28px 32px' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '36px',
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: '220px' }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: '1.15rem',
              letterSpacing: '0.16em',
              color: T.text,
            }}
          >
            {SITE.name}
          </span>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '0.78rem',
              color: T.faint,
              marginTop: '10px',
              lineHeight: 1.65,
            }}
          >
            {SITE.description}
          </p>
        </div>

        {/* Link columns */}
        <div style={{ display: 'flex', gap: '52px', flexWrap: 'wrap' }}>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  color: T.faint,
                  textTransform: 'uppercase',
                  margin: '0 0 16px',
                }}
              >
                {col.heading}
              </p>
              {col.links.map((link) => (
                <p key={link.label} style={{ margin: '0 0 10px' }}>
                  <a
                    href={link.href}
                    className="footer-link"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: '0.8rem',
                      color: T.muted,
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </a>
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '44px auto 0',
          paddingTop: '20px',
          borderTop: `1px solid ${T.line}`,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.6rem',
            color: T.faint,
            margin: 0,
          }}
        >
          © 2026 {SITE.name}
        </p>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.6rem',
            color: T.faint,
            margin: 0,
          }}
        >
          Privacy · Terms
        </p>
      </div>
    </footer>
  )
}
