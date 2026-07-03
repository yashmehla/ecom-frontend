import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ArrowUpRight } from 'lucide-react'
import { T } from '@/tokens'
import type { Product } from '@/types'

interface Props {
  product: Product
  index: number
}

export function ProductCard({ product: p, index }: Props) {
  const [wish, setWish] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.09, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
    >
      {/* Image container */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          background: T.surf,
          borderRadius: '2px',
        }}
      >
        <motion.img
          src={p.image}
          alt={p.name}
          loading="lazy"
          animate={{ scale: hover ? 1.05 : 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'contrast(1.06) saturate(0.5) brightness(0.9)',
          }}
        />

        {/* Bottom vignette */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 55%, rgba(9,9,13,0.5) 100%)',
          }}
        />

        {/* Tag badge */}
        {p.tag && (
          <span
            style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.58rem',
              letterSpacing: '0.12em',
              color: T.hi,
              background: 'rgba(9,9,13,0.76)',
              border: `1px solid ${T.hi}55`,
              padding: '4px 8px',
              borderRadius: '1px',
              backdropFilter: 'blur(6px)',
            }}
          >
            {p.tag}
          </span>
        )}

        {/* Wishlist */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation()
            setWish(!wish)
          }}
          aria-label={wish ? 'Remove from wishlist' : 'Add to wishlist'}
          animate={{ opacity: hover || wish ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'rgba(9,9,13,0.72)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Heart
            size={13}
            color={wish ? '#E879A0' : T.muted}
            fill={wish ? '#E879A0' : 'none'}
          />
        </motion.button>

        {/* Quick add — slides up on hover */}
        <motion.div
          initial={false}
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 10 }}
          transition={{ duration: 0.22 }}
          style={{
            position: 'absolute',
            bottom: '14px',
            left: '14px',
            right: '14px',
            background: 'rgba(9,9,13,0.9)',
            border: `1px solid ${T.line}`,
            backdropFilter: 'blur(10px)',
            borderRadius: '2px',
            padding: '10px 14px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            color: T.text,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: hover ? 'auto' : 'none',
          }}
        >
          <span>Quick add</span>
          <ArrowUpRight size={13} color={T.hi} />
        </motion.div>
      </div>

      {/* Product meta */}
      <div style={{ paddingTop: '14px' }}>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.6rem',
            color: T.faint,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: '0 0 4px',
          }}
        >
          {p.category}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: '0.92rem',
            color: T.text,
            margin: '0 0 6px',
          }}
        >
          {p.name}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.82rem',
              color: T.text,
            }}
          >
            ${p.price}
          </span>
          {p.originalPrice && (
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.74rem',
                color: T.faint,
                textDecoration: 'line-through',
              }}
            >
              ${p.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
