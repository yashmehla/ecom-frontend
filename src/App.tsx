import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Preloader,
  Navbar,
  Hero,
  Marquee,
  Products,
  FeatureBand,
  Reviews,
  Newsletter,
  Footer,
} from '@/components'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#09090D' }}>
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
          <Navbar />
          <Hero />
          <Marquee />
          <Products />
          <FeatureBand />
          <Reviews />
          <Newsletter />
          <Footer />
        </motion.div>
      )}
    </div>
  )
}
