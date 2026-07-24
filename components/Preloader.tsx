'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const controls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        scaleX: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      })
      await new Promise((r) => setTimeout(r, 200))
      onComplete()
    }
    sequence()
  }, [controls, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[600] flex items-center justify-center"
      style={{ background: 'var(--color-black)' }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="w-64 overflow-hidden">
        <motion.div
          className="preloader-line"
          initial={{ scaleX: 0 }}
          animate={controls}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  )
}
