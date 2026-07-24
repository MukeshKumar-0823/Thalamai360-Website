'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface GoldRuleProps {
  className?: string
  width?: string
}

export function GoldRule({ className = '', width = '100%' }: GoldRuleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className={`gold-rule ${inView ? 'animate' : ''} ${className}`}
      style={{ width }}
      role="separator"
      aria-hidden="true"
    />
  )
}

export const revealVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface SectionEyebrowProps {
  number: string
  label?: string
}

export function SectionEyebrow({ number, label }: SectionEyebrowProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="eyebrow">{number}</span>
      {label && (
        <>
          <div style={{ width: 24, height: 1, background: 'var(--color-gold-dim)' }} />
          <span className="eyebrow" style={{ color: 'var(--color-muted)' }}>{label}</span>
        </>
      )}
    </div>
  )
}
