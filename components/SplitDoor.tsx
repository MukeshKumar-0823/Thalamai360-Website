'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface SplitDoorProps {
  onReveal: () => void
}

export default function SplitDoor({ onReveal }: SplitDoorProps) {
  const [clicked, setClicked] = useState(false)
  const [showSecretariat, setShowSecretariat] = useState(false)

  const handleClick = () => {
    if (clicked) return
    setClicked(true)
    setShowSecretariat(true)

    // Door slides open (0.6s), image reveals for 1.2s total (reduced by 1 sec), then seamlessly transitions to main site
    setTimeout(() => {
      onReveal()
    }, 1200)
  }

  return (
    <div
      className="fixed inset-0 z-[500] overflow-hidden"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Click to enter Thalaimai 360"
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      style={{ cursor: 'pointer', background: '#090F1F' }}
    >
      {/* ══ SECRETARIAT REVEAL BACKDROP (Pure Image — Fast 1.2s Transition) ══ */}
      {showSecretariat && (
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={clicked ? { opacity: [0, 1, 1, 0], scale: 1.0 } : { opacity: 0 }}
          transition={{
            opacity: { times: [0, 0.2, 0.75, 1], duration: 1.2, ease: 'easeInOut' },
            scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Background image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/secretariat.jpg"
              alt="Chief Secretariat Tamil Nadu"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Subtle atmospheric vignette for cinematic depth */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(9, 15, 31, 0.1) 0%, rgba(9, 15, 31, 0.45) 100%)',
              }}
            />
          </div>
        </motion.div>
      )}

      {/* ══ LEFT PANEL ══ */}
      <motion.div
        className="absolute top-0 left-0 flex flex-col items-end justify-center overflow-hidden z-10"
        style={{
          width: '50%',
          height: '100vh',
          background: 'linear-gradient(135deg, #090F1F 0%, #0D1A32 100%)',
          borderRight: '1px solid rgba(28,52,97,0.5)',
          paddingRight: 72,
          paddingLeft: 48,
        }}
        animate={clicked ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Corner TL */}
        <svg className="absolute top-5 left-5" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M0 32 L0 0 L32 0" stroke="rgba(28,52,97,0.7)" strokeWidth="2" fill="none"/>
        </svg>
        {/* Corner BL */}
        <svg className="absolute bottom-5 left-5" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M0 0 L0 32 L32 32" stroke="rgba(28,52,97,0.7)" strokeWidth="2" fill="none"/>
        </svg>

        <div className="flex flex-col items-end text-right gap-5">
          {/* Tamil brand — தலைமை 360 */}
          <h2
            className="font-tamil"
            style={{
              fontSize: 'clamp(30px, 3.8vw, 52px)',
              fontWeight: 700,
              color: '#F0F4FF',
              lineHeight: 1.1,
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            தலைமை{' '}
            <span
              className="font-playfair"
              style={{ color: '#D44535' }}
            >
              360
            </span>
          </h2>

          {/* Red divider */}
          <div style={{ width: 48, height: 2, background: '#D44535' }} />

          {/* Tamil subheading */}
          <p
            className="font-tamil"
            style={{
              fontSize: 'clamp(13px, 1.4vw, 17px)',
              color: 'rgba(122, 146, 184, 0.85)',
              lineHeight: 2,
              letterSpacing: '0.04em',
            }}
          >
            ஆளுகை · தலைமை · தொகுதி
          </p>
        </div>
      </motion.div>

      {/* ══ CENTER LOGO — above door panels ══ */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none select-none"
        animate={clicked ? { opacity: 0, scale: 0.88 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* Logo box */}
        <div
          style={{
            width: 100,
            height: 100,
            background: 'white',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            boxShadow: '0 8px 48px rgba(212,69,53,0.18), 0 0 0 1px rgba(28,52,97,0.3)',
          }}
        >
          <Image
            src="/logo.svg"
            alt="Thalaimai 360 Logo"
            width={80}
            height={80}
            priority
          />
        </div>

        {/* Click hint */}
        <p
          className="font-inter absolute bottom-8"
          style={{
            fontSize: 11,
            color: 'rgba(122,146,184,0.5)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Click anywhere to enter
        </p>
      </motion.div>

      {/* ══ RIGHT PANEL ══ */}
      <motion.div
        className="absolute top-0 right-0 flex flex-col items-start justify-center overflow-hidden z-10"
        style={{
          width: '50%',
          height: '100vh',
          background: 'linear-gradient(225deg, #090F1F 0%, #0D1A32 100%)',
          borderLeft: '1px solid rgba(28,52,97,0.5)',
          paddingLeft: 72,
          paddingRight: 48,
        }}
        animate={clicked ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Corner TR */}
        <svg className="absolute top-5 right-5" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M32 32 L32 0 L0 0" stroke="rgba(28,52,97,0.7)" strokeWidth="2" fill="none"/>
        </svg>
        {/* Corner BR */}
        <svg className="absolute bottom-5 right-5" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M32 0 L32 32 L0 32" stroke="rgba(28,52,97,0.7)" strokeWidth="2" fill="none"/>
        </svg>

        <div className="flex flex-col items-start gap-5">
          {/* English brand — THALAIMAI 360 */}
          <h2
            className="font-playfair"
            style={{
              fontSize: 'clamp(30px, 3.8vw, 52px)',
              fontWeight: 700,
              color: '#F0F4FF',
              lineHeight: 1.1,
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
            }}
          >
            THALAIMAI{' '}
            <span style={{ color: '#D44535' }}>360</span>
          </h2>

          {/* Red divider */}
          <div style={{ width: 48, height: 2, background: '#D44535' }} />

          {/* English subheading */}
          <p
            className="font-inter"
            style={{
              fontSize: 'clamp(11px, 1.2vw, 14px)',
              fontWeight: 500,
              color: 'rgba(122, 146, 184, 0.85)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              lineHeight: 2,
            }}
          >
            Leadership · Governance · Impact
          </p>
        </div>
      </motion.div>
    </div>
  )
}
