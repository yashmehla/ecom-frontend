import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CartItem, Product } from '@/types'

interface CartContextValue {
  cart: CartItem[]
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (product: Product, size?: string) => void
  removeFromCart: (id: number) => void
  changeQty: (id: number, delta: number) => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const openCart  = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  const addToCart = useCallback((product: Product, size?: string) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === product.id && c.selectedSize === size)
      if (existing) {
        return prev.map(c =>
          c.id === product.id && c.selectedSize === size
            ? { ...c, qty: c.qty + 1 }
            : c
        )
      }
      return [...prev, { ...product, qty: 1, selectedSize: size }]
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(c => c.id !== id))
  }, [])

  const changeQty = useCallback((id: number, delta: number) => {
    setCart(prev =>
      prev
        .map(c => c.id === id ? { ...c, qty: c.qty + delta } : c)
        .filter(c => c.qty > 0)
    )
  }, [])

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0)
  const cartCount = cart.reduce((s, c) => s + c.qty, 0)

  return (
    <CartContext.Provider value={{
      cart, cartOpen, openCart, closeCart,
      addToCart, removeFromCart, changeQty,
      cartTotal, cartCount,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}