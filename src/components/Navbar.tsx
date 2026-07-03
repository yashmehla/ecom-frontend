import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { T } from '@/tokens'
import { SITE, NAV } from '@/data'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(9,9,13,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${T.line}`,
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 28px',
          height: '62px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: '1.3rem',
            letterSpacing: '0.18em',
            color: T.text,
            textDecoration: 'none',
          }}
        >
          {SITE.name}
        </a>

        {/* Desktop nav */}
        <nav className="navbar-links" style={{ display: 'flex', gap: '36px' }}>
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                color: T.muted,
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <button
            aria-label="Search"
            className="icon-btn navbar-search"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
          >
            <Search size={17} color={T.muted} />
          </button>

          <button
            aria-label="Cart"
            className="icon-btn"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'relative', display: 'flex' }}
          >
            <ShoppingBag size={17} color={T.muted} />
            <span
              style={{
                position: 'absolute',
                top: '-7px',
                right: '-8px',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                background: T.hi,
                color: T.bg,
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.52rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              2
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="icon-btn navbar-burger"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'none' }}
          >
            {open ? <X size={18} color={T.text} /> : <Menu size={18} color={T.text} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              borderTop: `1px solid ${T.line}`,
              background: T.surf,
            }}
          >
            <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.95rem',
                    color: T.muted,
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
