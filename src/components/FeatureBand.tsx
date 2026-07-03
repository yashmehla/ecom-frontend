import { motion } from 'framer-motion'
import { T } from '@/tokens'
import { STATS, FEATURE_IMAGE } from '@/data'

export function FeatureBand() {
  return (
    <>
      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="feature-band"
        style={{
          background: T.surf,
          borderTop: `1px solid ${T.line}`,
          borderBottom: `1px solid ${T.line}`,
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="feature-cell"
            style={{
              padding: '44px 32px',
              borderRight: i < STATS.length - 1 ? `1px solid ${T.line}` : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: '2.6rem',
                color: T.text,
                lineHeight: 1,
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.16em',
                color: T.faint,
                textTransform: 'uppercase',
              }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Full-width atmospheric image strip */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <motion.img
          src={FEATURE_IMAGE}
          alt="Nocturne — city after dark"
          loading="lazy"
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            filter: 'contrast(1.1) saturate(0.35) brightness(0.6)',
            display: 'block',
          }}
        />
        {/* Overlay gradient */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(9,9,13,0.7) 0%, rgba(9,9,13,0.1) 50%, rgba(9,9,13,0.7) 100%)',
          }}
        />
        {/* Centered quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 28px',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
              color: T.text,
              margin: 0,
              lineHeight: 1.25,
              maxWidth: '680px',
              letterSpacing: '-0.01em',
            }}
          >
            "The hours between midnight and first light belong to those who move."
          </p>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              color: T.hi,
              marginTop: '22px',
              textTransform: 'uppercase',
            }}
          >
            Nocturne — 2026
          </p>
        </motion.div>
      </div>
    </>
  )
}
