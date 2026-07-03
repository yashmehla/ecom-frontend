import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { T } from '@/tokens'
import { HERO } from '@/data'
import { useCountdown } from '@/hooks/useCountdown'

export function Hero() {
  const { h, m, s } = useCountdown(HERO.countdownSeconds)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <section
      ref={ref}
      style={{
        background: T.text,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Drop badge */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '24px',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(200,169,110,0.15)',
        border: '1px solid rgba(200,169,110,0.35)',
        color: T.gold,
        fontSize: '10px',
        letterSpacing: '0.14em',
        padding: '5px 12px',
        borderRadius: '20px',
        fontFamily: "'Inter', sans-serif",
      }}>
        <Zap size={9} fill={T.gold} /> Drop {HERO.dropNumber} · Live Now
      </div>

      <div
        className="hero-grid"
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '70px 24px 56px', width: '100%' }}
      >
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.24em',
            color: T.gold,
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            {HERO.eyebrow}
          </p>

          <h1 style={{ margin: '0 0 20px', lineHeight: 1.05 }}>
            <span style={{
              display: 'block',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              color: '#fff',
              letterSpacing: '-0.01em',
            }}>
              {HERO.line1}
            </span>
            <em style={{
              display: 'block',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              color: T.gold,
              letterSpacing: '-0.01em',
            }}>
              {HERO.line2}
            </em>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '32px',
            lineHeight: 1.7,
            maxWidth: '340px',
          }}>
            {HERO.sub}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a
              href="#products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: T.gold,
                color: T.text,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.08em',
                padding: '12px 24px',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {HERO.cta} <ArrowRight size={13} />
            </a>
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: 'rgba(255,255,255,0.8)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '12px',
                letterSpacing: '0.06em',
                padding: '12px 24px',
                borderRadius: '4px',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              View lookbook
            </a>
          </div>

          {/* Countdown */}
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-end',
          }}>
            {[
              { val: h, unit: 'hrs' },
              { val: m, unit: 'min' },
              { val: s, unit: 'sec' },
            ].map(({ val, unit }) => (
              <div key={unit} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2rem',
                  fontWeight: 400,
                  color: '#fff',
                  lineHeight: 1,
                }}>
                  {val}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.16em',
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  marginTop: '3px',
                }}>
                  {unit}
                </div>
              </div>
            ))}
            <div style={{
              marginLeft: '4px',
              paddingBottom: '6px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              color: 'rgba(255,255,255,0.35)',
            }}>
              until drop closes
            </div>
          </div>
        </motion.div>

        {/* Right: stacked images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '14px', alignItems: 'flex-end', position: 'relative' }}
        >
          {/* Tall image */}
          <motion.div
            style={{ flex: '0 0 60%', borderRadius: '6px', overflow: 'hidden', y: imgY }}
          >
            <img
              src={HERO.image}
              alt="Drop 014 hero piece"
              loading="eager"
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
                display: 'block',
                filter: 'contrast(1.05) saturate(0.6)',
              }}
            />
          </motion.div>
          {/* Offset shorter image */}
          <div style={{
            flex: '0 0 36%',
            borderRadius: '6px',
            overflow: 'hidden',
            marginBottom: '28px',
          }}>
            <img
              src={HERO.image2}
              alt="Lookbook detail"
              loading="eager"
              style={{
                width: '100%',
                aspectRatio: '2 / 3',
                objectFit: 'cover',
                display: 'block',
                filter: 'contrast(1.05) saturate(0.5) brightness(0.85)',
              }}
            />
          </div>
          {/* Corner label */}
          <p style={{
            position: 'absolute',
            bottom: '36px',
            left: '12px',
            fontFamily: "'Inter', monospace",
            fontSize: '9px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.12em',
            margin: 0,
          }}>
            NTN / {HERO.dropNumber} / S–XL
          </p>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {[
          { val: '12', label: 'Drops / year' },
          { val: '≤ 8', label: 'Pieces / drop' },
          { val: 'Never', label: 'Restocked' },
          { val: '41k', label: 'Members' },
        ].map((stat, i, arr) => (
          <div
            key={stat.label}
            style={{
              padding: '20px 24px',
              borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: '1.6rem',
              color: '#fff',
              lineHeight: 1,
              marginBottom: '4px',
            }}>
              {stat.val}
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}