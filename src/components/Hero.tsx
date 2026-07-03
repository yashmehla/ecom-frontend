import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { T } from '@/tokens'
import { HERO } from '@/data'
import { useCountdown } from '@/hooks/useCountdown'

export function Hero() {
  const { h, m, s } = useCountdown(HERO.countdownSeconds)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: T.bg,
        overflow: 'hidden',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Ambient glow — top right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-5%',
          right: '-8%',
          width: '56vw',
          height: '56vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(196,169,255,0.09) 0%, transparent 65%)`,
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div className="hero-grid" style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 28px', width: '100%' }}>
        {/* Left: copy */}
        <motion.div style={{ y: textY }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 300,
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              color: T.hi,
              textTransform: 'uppercase',
              marginBottom: '28px',
            }}
          >
            {HERO.eyebrow}
          </motion.p>

          <h1 style={{ margin: 0, lineHeight: 1.04 }}>
            {([HERO.line1, HERO.line2] as const).map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 42 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 + i * 0.13, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'block',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)',
                  color: T.text,
                  letterSpacing: '-0.01em',
                  fontStyle: i === 1 ? 'italic' : 'normal',
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.62 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '0.94rem',
              color: T.muted,
              marginTop: '26px',
              lineHeight: 1.72,
              maxWidth: '360px',
            }}
          >
            {HERO.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78 }}
            style={{ display: 'flex', alignItems: 'center', gap: '28px', marginTop: '44px', flexWrap: 'wrap' }}
          >
            <a
              href="#products"
              className="hero-cta"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: '0.84rem',
                color: T.bg,
                background: T.text,
                padding: '14px 30px',
                borderRadius: '2px',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '9px',
                transition: 'background 0.22s',
              }}
            >
              {HERO.cta} <ArrowRight size={14} />
            </a>

            {/* Live countdown */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '7px' }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '1rem',
                  color: T.hi,
                  letterSpacing: '0.04em',
                }}
              >
                {h}:{m}:{s}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.72rem',
                  color: T.faint,
                }}
              >
                remaining
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: hero image with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.38, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', borderRadius: '3px', overflow: 'hidden' }}
          className="hero-image-wrap"
        >
          <motion.img
            src={HERO.image}
            alt="Drop 014 hero piece"
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'contrast(1.08) saturate(0.55) brightness(0.88)',
              y: imgY,
            }}
          />
          {/* Bottom gradient overlay */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 55%, rgba(9,9,13,0.65) 100%)',
            }}
          />
          {/* Corner label */}
          <p
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.38)',
              letterSpacing: '0.14em',
              margin: 0,
            }}
          >
            NTN / {HERO.dropNumber} / S–XL
          </p>
        </motion.div>
      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '28px',
          right: '28px',
          height: '1px',
          background: T.line,
        }}
      />
    </section>
  )
}
