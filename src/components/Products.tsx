import { ArrowUpRight } from 'lucide-react'
import { T } from '@/tokens'
import { PRODUCTS } from '@/data'
import { ProductCard } from './ProductCard'

export function Products() {
  return (
    <section id="products" style={{ background: T.bg, padding: '100px 28px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '60px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.65rem',
                letterSpacing: '0.26em',
                color: T.hi,
                textTransform: 'uppercase',
                margin: '0 0 10px',
              }}
            >
              This drop
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)',
                color: T.text,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Worn tonight,{' '}
              <em style={{ fontStyle: 'italic' }}>gone by morning</em>
            </h2>
          </div>

          <a
            href="#"
            className="text-link"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              color: T.muted,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
            }}
          >
            All pieces <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Product grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '28px 24px',
          }}
        >
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
