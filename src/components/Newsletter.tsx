import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { T } from '@/tokens'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (email.includes('@')) setDone(true)
  }

  return (
    <div
      style={{
        background: T.surf,
        borderTop: `1px solid ${T.line}`,
        borderBottom: `1px solid ${T.line}`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.62 }}
        className="nl-grid"
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '88px 28px' }}
      >
        {/* Left: headline */}
        <div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(1.9rem, 3vw, 2.7rem)',
              color: T.text,
              margin: '0 0 14px',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            One alert.{' '}
            <em style={{ fontStyle: 'italic' }}>Right at midnight.</em>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '0.9rem',
              color: T.muted,
              margin: 0,
              lineHeight: 1.7,
              maxWidth: '340px',
            }}
          >
            No newsletters. No noise. Just the moment the drop opens.
          </p>
        </div>

        {/* Right: form */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {done ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.84rem',
                color: T.hi,
                letterSpacing: '0.1em',
              }}
            >
              You're on the list. ✓
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="nl-input"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.8rem',
                  background: T.dim,
                  border: `1px solid ${T.line}`,
                  color: T.text,
                  padding: '14px 18px',
                  borderRadius: '2px',
                  outline: 'none',
                  width: '100%',
                  transition: 'border-color 0.2s',
                }}
              />
              <button
                type="submit"
                className="nl-btn"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  color: T.bg,
                  background: T.text,
                  padding: '14px',
                  borderRadius: '2px',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'background 0.2s',
                }}
              >
                Notify me on next drop
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
