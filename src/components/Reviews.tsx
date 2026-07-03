import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { T } from '@/tokens'
import { REVIEWS } from '@/data'

export function Reviews() {
  return (
    <section style={{ background: T.bg, padding: '100px 28px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.26em',
            color: T.hi,
            textTransform: 'uppercase',
            margin: '0 0 60px',
          }}
        >
          Verified members
        </p>

        {/* Hairline-separated grid */}
        <div
          className="reviews-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: T.line,
          }}
        >
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.1, duration: 0.56 }}
              style={{
                background: T.bg,
                padding: '44px 38px',
                display: 'flex',
                flexDirection: 'column',
                gap: '26px',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={11}
                    color={idx < r.stars ? T.hi : T.faint}
                    fill={idx < r.stars ? T.hi : 'none'}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: '1.18rem',
                  color: T.text,
                  lineHeight: 1.6,
                  margin: 0,
                  flex: 1,
                }}
              >
                "{r.text}"
              </p>

              {/* Handle */}
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.64rem',
                  color: T.faint,
                  margin: 0,
                  letterSpacing: '0.05em',
                }}
              >
                {r.handle}
                {r.verified && (
                  <span style={{ marginLeft: '8px', color: T.hi }}>✓</span>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
