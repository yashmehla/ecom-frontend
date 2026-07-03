import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react'
import { T } from '@/tokens'
import { SITE, NAV } from '@/data'
import { useCart } from '@/context/CartContext'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { cartCount, openCart } = useCart()

  return (
    <>
      {/* Announcement bar */}
      <div style={{
        background: T.text,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        padding: '7px 16px',
        fontSize: '11px',
        letterSpacing: '0.08em',
      }}>
        Free shipping over <span style={{ color: T.gold }}>$150</span>
        &nbsp;·&nbsp;
        Use <span style={{ color: T.gold }}>NIGHT20</span> for 20% off your first order
      </div>

      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${T.line}`,
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}>
          {/* Logo */}
          <a href="/" style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: '20px',
            letterSpacing: '0.14em',
            color: T.text,
            textDecoration: 'none',
            flexShrink: 0,
          }}>
            {SITE.name.slice(0, 4)}<em style={{ fontStyle: 'italic', color: T.hi }}>{SITE.name.slice(4)}</em>
          </a>

          {/* Desktop nav */}
          <nav className="navbar-links" style={{ display: 'flex', gap: '24px', flex: 1 }}>
            {NAV.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: T.muted,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'color 0.15s',
                  fontWeight: 400,
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
            {/* Search */}
            <div
              className="navbar-search"
              style={{
                display: 'flex',
                alignItems: 'center',
                background: T.bg,
                border: `1px solid ${T.line}`,
                borderRadius: '4px',
                padding: '5px 10px',
                gap: '6px',
              }}
            >
              <Search size={12} color={T.faint} />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: '12px',
                  color: T.text,
                  width: '120px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Wishlist */}
            <button
              aria-label="Wishlist"
              style={{
                background: 'none', border: 'none',
                padding: '8px', cursor: 'pointer',
                color: T.muted, display: 'flex',
                borderRadius: '4px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = T.dim)}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              <Heart size={17} />
            </button>

            {/* Cart */}
            <button
              aria-label="Open shopping bag"
              onClick={openCart}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: T.text,
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '7px 12px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = T.hi)}
              onMouseLeave={e => (e.currentTarget.style.background = T.text)}
            >
              <ShoppingBag size={14} />
              Bag
              {cartCount > 0 && (
                <span style={{
                  background: T.gold,
                  color: T.text,
                  borderRadius: '20px',
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '1px 6px',
                  minWidth: '18px',
                  textAlign: 'center',
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="navbar-burger"
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px',
                display: 'none', color: T.text,
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.26 }}
              style={{
                overflow: 'hidden',
                borderTop: `1px solid ${T.line}`,
                background: T.surf,
              }}
            >
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {NAV.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '15px',
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
    </>
  )
}