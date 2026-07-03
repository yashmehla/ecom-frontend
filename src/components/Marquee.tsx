import { motion } from 'framer-motion'
import { T } from '@/tokens'
import { MARQUEE_ITEMS } from '@/data'

export function Marquee() {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  const len = MARQUEE_ITEMS.length

  return (
    <div
      style={{
        background: T.surf,
        borderBottom: `1px solid ${T.line}`,
        overflow: 'hidden',
        padding: '15px 0',
      }}
    >
      <motion.div
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', width: 'max-content', whiteSpace: 'nowrap' }}
      >
        {loop.map((cat, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 300,
              fontSize: '0.72rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: i % len === 0 ? T.hi : T.faint,
              padding: '0 32px',
            }}
          >
            {cat}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
