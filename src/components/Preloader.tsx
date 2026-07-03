import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { T } from '@/tokens'
import { SITE } from '@/data'

interface Props {
  onDone: () => void
}

export function Preloader({ onDone }: Props) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1500)
    const t2 = setTimeout(() => {
      setPhase(2)
      setTimeout(onDone, 680)
    }, 2300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  const letters = SITE.name.split('')

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: T.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      animate={phase === 2 ? { opacity: 0, scale: 1.06 } : {}}
      transition={{ duration: 0.68, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Ambient glow orb */}
      <motion.div
        aria-hidden="true"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: phase === 2 ? 0 : 0.9,
        }}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${T.hiGlow} 0%, transparent 70%)`,
          filter: 'blur(24px)',
          pointerEvents: 'none',
        }}
      />

      {/* Wordmark — letters rise in */}
      <div style={{ display: 'flex', gap: '0.04em', position: 'relative' }}>
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.06 * i,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(3.2rem, 10vw, 6.4rem)',
              letterSpacing: '0.14em',
              color: T.text,
              display: 'block',
            }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      {/* Tagline fades in after letters */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: phase >= 1 ? 0.4 : 0, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          fontFamily: "'DM Mono', monospace",
          fontWeight: 300,
          fontSize: '0.65rem',
          letterSpacing: '0.38em',
          color: T.text,
          textTransform: 'uppercase',
          marginTop: '22px',
        }}
      >
        {SITE.tagline}
      </motion.p>

      {/* Bottom progress line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: phase >= 1 ? 1 : 0,
          opacity: phase === 2 ? 0 : phase >= 1 ? 0.55 : 0,
        }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '9%',
          width: '110px',
          height: '1px',
          background: T.hi,
          transformOrigin: 'left',
          boxShadow: `0 0 8px ${T.hi}`,
        }}
      />
    </motion.div>
  )
}
