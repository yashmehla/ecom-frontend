import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from '@/context/CartContext'
import {
  Preloader,
  Navbar,
  Hero,
  Marquee,
  Products,
  Reviews,
  Newsletter,
  Footer,
  CartDrawer,
  Toast,
} from '@/components'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <CartProvider>
      <div style={{ minHeight: '100vh', background: '#F8F6F1' }}>
        <AnimatePresence>
          {!ready && (
            <Preloader key="preloader" onDone={() => setReady(true)} />
          )}
        </AnimatePresence>

        {ready && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.38 }}
          >
            <Toast />
            <CartDrawer />
            <Navbar />
            <Hero />
            <Marquee />
            <Products />
            <Reviews />
            <Newsletter />
            <Footer />
          </motion.div>
        )}
      </div>
    </CartProvider>
  )
}