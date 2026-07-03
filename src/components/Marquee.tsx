import { motion } from 'framer-motion'
import { T } from '@/tokens'
import { MARQUEE_ITEMS } from '@/data'

export function Marquee() {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  const len  = MARQUEE_ITEMS.length

  return (
    <div style={{
      background: T.surf,
      borderBottom: `1px solid ${T.line}`,
      overflow: 'hidden',
      padding: '12px 0',
    }}>
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((cat, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: i % len === 0 ? T.hi : T.faint,
              padding: '0 28px',
            }}
          >
            {i % len === 0 ? '· ' : ''}{cat}
          </span>
        ))}
      </motion.div>
    </div>
  )
}