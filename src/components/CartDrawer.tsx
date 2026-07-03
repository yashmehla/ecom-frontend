import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import { T } from '@/tokens'
import { useCart } from '@/context/CartContext'

const FREE_SHIP_THRESHOLD = 150

export function CartDrawer() {
  const { cart, cartOpen, cartTotal, closeCart, changeQty, removeFromCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const shipping   = cartTotal >= FREE_SHIP_THRESHOLD ? 0 : 12
  const discount   = promoApplied ? Math.round(cartTotal * 0.2) : 0
  const total      = cartTotal + shipping - discount
  const remaining  = FREE_SHIP_THRESHOLD - cartTotal

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'NIGHT20') setPromoApplied(true)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${cartOpen ? ' open' : ''}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={`cart-drawer${cartOpen ? ' open' : ''}`} role="dialog" aria-label="Shopping bag">
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${T.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px',
              fontWeight: 400,
              color: T.text,
            }}>Your bag</span>
            {cart.length > 0 && (
              <span style={{
                background: T.hi,
                color: '#fff',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 500,
                padding: '2px 7px',
              }}>
                {cart.reduce((s, c) => s + c.qty, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close bag"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: T.muted,
              borderRadius: '4px',
              display: 'flex',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free shipping progress */}
        {cart.length > 0 && (
          <div style={{ padding: '10px 24px', background: T.dim, borderBottom: `1px solid ${T.line}` }}>
            {remaining > 0 ? (
              <p style={{ fontSize: '11px', color: T.muted }}>
                Add <strong style={{ color: T.text }}>${remaining.toFixed(0)}</strong> more for free shipping
              </p>
            ) : (
              <p style={{ fontSize: '11px', color: T.hi, fontWeight: 500 }}>✓ You qualify for free shipping</p>
            )}
            <div style={{
              marginTop: '6px',
              height: '3px',
              background: T.line,
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (cartTotal / FREE_SHIP_THRESHOLD) * 100)}%`,
                background: T.hi,
                borderRadius: '2px',
                transition: 'width 0.4s ease',
              }} />
            </div>
          </div>
        )}

        {/* Cart items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '60px 0' }}
              >
                <ShoppingBag size={32} color={T.faint} style={{ margin: '0 auto 12px' }} />
                <p style={{ fontSize: '14px', color: T.muted, marginBottom: '6px' }}>Your bag is empty</p>
                <p style={{ fontSize: '12px', color: T.faint }}>
                  Add something from the drop to get started.
                </p>
                <button
                  onClick={closeCart}
                  style={{
                    marginTop: '20px',
                    background: 'none',
                    border: 'none',
                    color: T.hi,
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Continue shopping →
                </button>
              </motion.div>
            ) : (
              cart.map(item => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    paddingBottom: '16px',
                    marginBottom: '16px',
                    borderBottom: `1px solid ${T.line}`,
                  }}
                >
                  {/* Image */}
                  <div style={{
                    width: '72px',
                    height: '90px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: T.dim,
                  }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.7)' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', color: T.faint, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {item.category}
                    </p>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: T.text, marginBottom: '3px' }}>{item.name}</p>
                    {item.selectedSize && (
                      <p style={{ fontSize: '11px', color: T.muted, marginBottom: '8px' }}>Size: {item.selectedSize}</p>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Qty control */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => changeQty(item.id, -1)}
                          style={{
                            width: '24px', height: '24px',
                            border: `1px solid ${T.line}`,
                            borderRadius: '4px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'none', cursor: 'pointer', color: T.muted,
                          }}
                        >
                          <Minus size={10} />
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 500, minWidth: '16px', textAlign: 'center' }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => changeQty(item.id, 1)}
                          style={{
                            width: '24px', height: '24px',
                            border: `1px solid ${T.line}`,
                            borderRadius: '4px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'none', cursor: 'pointer', color: T.muted,
                          }}
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: T.text }}>
                        ${(item.price * item.qty).toFixed(0)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: T.faint, fontSize: '11px', padding: '4px 0 0',
                        display: 'flex', alignItems: 'center', gap: '3px',
                      }}
                    >
                      <Trash2 size={10} /> Remove
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '16px 24px', borderTop: `1px solid ${T.line}` }}>
            {/* Promo */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                disabled={promoApplied}
                style={{
                  flex: 1,
                  border: `1px solid ${T.line}`,
                  borderRadius: '4px',
                  padding: '8px 10px',
                  fontSize: '12px',
                  color: T.text,
                  background: T.surf,
                  outline: 'none',
                }}
              />
              <button
                onClick={applyPromo}
                disabled={promoApplied}
                style={{
                  background: promoApplied ? T.hiLight : T.text,
                  color: promoApplied ? T.hi : '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  fontSize: '11px',
                  fontWeight: 500,
                  cursor: promoApplied ? 'default' : 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                {promoApplied ? '✓ Applied' : 'Apply'}
              </button>
            </div>

            {/* Summary */}
            {[
              ['Subtotal', `$${cartTotal.toFixed(0)}`],
              ...(promoApplied ? [['Discount (NIGHT20)', `-$${discount}`]] : []),
              ['Shipping', shipping === 0 ? 'Free' : `$${shipping}`],
            ].map(([label, value]) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: '12px', color: T.muted, marginBottom: '6px',
              }}>
                <span>{label}</span>
                <span style={{ color: label === 'Discount (NIGHT20)' ? T.hi : T.text }}>{value}</span>
              </div>
            ))}

            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: '15px', fontWeight: 600, color: T.text,
              margin: '12px 0 16px', paddingTop: '10px',
              borderTop: `1px solid ${T.line}`,
            }}>
              <span>Total</span>
              <span>${total.toFixed(0)}</span>
            </div>

            <button
              style={{
                width: '100%',
                background: T.text,
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '13px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                letterSpacing: '0.06em',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = T.hi)}
              onMouseLeave={e => (e.currentTarget.style.background = T.text)}
            >
              Proceed to checkout →
            </button>

            <p style={{
              textAlign: 'center', fontSize: '10px', color: T.faint,
              marginTop: '10px', letterSpacing: '0.05em',
            }}>
              Secure checkout · SSL protected
            </p>
          </div>
        )}
      </div>
    </>
  )
}