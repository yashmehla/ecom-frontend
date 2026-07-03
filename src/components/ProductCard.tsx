import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye, ShoppingBag } from 'lucide-react'
import { T } from '@/tokens'
import { useCart } from '@/context/CartContext'
import { showToast } from './Toast'
import type { Product } from '@/types'

interface Props {
  product: Product
  index: number
  listView?: boolean
}

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: '1px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ fontSize: '10px', color: i < Math.floor(rating) ? T.gold : T.line }}>
          {i < Math.floor(rating) ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

export function ProductCard({ product: p, index, listView }: Props) {
  const [wished, setWished]   = useState(false)
  const [hover, setHover]     = useState(false)
  const [selSize, setSelSize] = useState<string | undefined>()
  const { addToCart } = useCart()

  const discountPct = p.originalPrice
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : 0

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(p, selSize || p.sizes[0])
    showToast(`${p.name} added to bag`)
  }

  const handleWish = (e: React.MouseEvent) => {
    e.stopPropagation()
    setWished(w => !w)
    showToast(wished ? 'Removed from wishlist' : 'Added to wishlist ♥')
  }

  const badgeColor: Record<string, { bg: string; color: string }> = {
    New:     { bg: T.text,     color: '#fff' },
    Sale:    { bg: T.red,      color: '#fff' },
    Limited: { bg: T.gold,     color: T.text },
  }

  if (listView) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          background: T.surf,
          border: `1px solid ${T.line}`,
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', overflow: 'hidden', background: T.dim }}>
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            style={{ width: '100%', height: '220px', objectFit: 'cover', filter: 'saturate(0.75)' }}
          />
          {p.tag && (
            <span style={{
              position: 'absolute', top: '10px', left: '10px',
              ...(badgeColor[p.tag] || {}),
              fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '3px 7px', borderRadius: '2px',
            }}>{p.tag}</span>
          )}
        </div>
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.faint, marginBottom: '4px' }}>{p.category}</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 400, color: T.text, margin: '0 0 6px' }}>{p.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Stars rating={p.rating} />
              <span style={{ fontSize: '11px', color: T.faint }}>{p.rating} ({p.reviews})</span>
            </div>
            <p style={{ fontSize: '12px', color: T.muted, lineHeight: 1.65, marginBottom: '14px' }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {p.sizes.map((sz, i) => (
                <button
                  key={sz}
                  onClick={() => setSelSize(sz)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    border: `1px solid ${selSize === sz ? T.text : T.line}`,
                    borderRadius: '2px',
                    padding: '3px 8px',
                    color: i === p.sizes.length - 1 ? T.faint : selSize === sz ? T.text : T.muted,
                    fontWeight: selSize === sz ? 600 : 400,
                    background: 'none',
                    cursor: i === p.sizes.length - 1 ? 'not-allowed' : 'pointer',
                    textDecoration: i === p.sizes.length - 1 ? 'line-through' : 'none',
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '16px', color: T.text }}>${p.price}</span>
              {p.originalPrice && (
                <>
                  <span style={{ fontSize: '13px', color: T.faint, textDecoration: 'line-through' }}>${p.originalPrice}</span>
                  <span style={{ fontSize: '11px', color: T.red, fontWeight: 500 }}>−{discountPct}%</span>
                </>
              )}
            </div>
            <button
              onClick={handleAdd}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: T.text, color: '#fff', border: 'none',
                borderRadius: '4px', padding: '10px 18px',
                fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                letterSpacing: '0.04em', transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = T.hi)}
              onMouseLeave={e => (e.currentTarget.style.background = T.text)}
            >
              <ShoppingBag size={13} /> Add to bag
            </button>
          </div>
        </div>
      </motion.article>
    )
  }

  // Grid card
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: T.surf,
        border: `1px solid ${T.line}`,
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, transform 0.2s',
        boxShadow: hover ? '0 4px 16px rgba(0,0,0,0.1)' : 'none',
        transform: hover ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', background: T.dim }}>
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          style={{
            width: '100%',
            aspectRatio: '3 / 4',
            objectFit: 'cover',
            display: 'block',
            filter: 'saturate(0.75) contrast(1.03)',
            transition: 'transform 0.45s ease',
            transform: hover ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Badge */}
        {p.tag && (
          <span style={{
            position: 'absolute', top: '10px', left: '10px',
            ...(badgeColor[p.tag] || {}),
            fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '3px 7px', borderRadius: '2px',
          }}>{p.tag}</span>
        )}

        {/* Action buttons */}
        <div style={{
          position: 'absolute', top: '10px', right: '10px',
          display: 'flex', flexDirection: 'column', gap: '6px',
          opacity: hover ? 1 : 0,
          transform: hover ? 'translateX(0)' : 'translateX(8px)',
          transition: 'opacity 0.2s, transform 0.2s',
        }}>
          <button
            onClick={handleWish}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: wished ? T.red : T.muted, transition: 'background 0.15s',
            }}
          >
            <Heart size={13} fill={wished ? T.red : 'none'} />
          </button>
          <button
            aria-label="Quick view"
            style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T.muted,
            }}
          >
            <Eye size={13} />
          </button>
        </div>

        {/* Quick add bar */}
        <div
          onClick={handleAdd}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(26,25,21,0.92)',
            color: '#fff',
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em',
            padding: '10px 14px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            transform: hover ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.22s',
          }}
        >
          <span>Quick add</span>
          <ShoppingBag size={12} color={T.gold} />
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '12px 14px 14px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.faint, margin: '0 0 3px' }}>
          {p.category}
        </p>
        <p style={{ fontSize: '13px', fontWeight: 500, color: T.text, margin: '0 0 7px', lineHeight: 1.3 }}>
          {p.name}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '5px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '14px', color: T.text }}>${p.price}</span>
          {p.originalPrice && (
            <>
              <span style={{ fontSize: '11px', color: T.faint, textDecoration: 'line-through' }}>${p.originalPrice}</span>
              <span style={{ fontSize: '10px', color: T.red, fontWeight: 500 }}>−{discountPct}%</span>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Stars rating={p.rating} />
          <span style={{ fontSize: '10px', color: T.faint }}>({p.reviews})</span>
        </div>
      </div>
    </motion.article>
  )
}