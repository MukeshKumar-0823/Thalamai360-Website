'use client'

import { motion } from 'framer-motion'
import { GoldRule } from './AnimationUtils'

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{ paddingTop: 100, paddingBottom: 80 }}
    >
      {/* Background grain texture (via CSS class in globals) */}
      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <motion.p variants={staggerItem} className="eyebrow mb-4">
              INSTITUTIONAL MANDATE
            </motion.p>

            {/* Gold Rule */}
            <motion.div variants={staggerItem} className="mb-6">
              <div
                style={{
                  height: 1,
                  background: 'var(--color-gold-dim)',
                  transformOrigin: 'left',
                  width: '100%',
                }}
              />
            </motion.div>

            {/* Tamil Quote */}
            <motion.p
              variants={staggerItem}
              className="font-tamil"
              style={{
                fontSize: 17,
                color: 'var(--color-gold-dim)',
                fontStyle: 'italic',
                marginBottom: 32,
                lineHeight: 1.6,
              }}
            >
              அரசியல் பிழைத்தோர்க்கு அறம் கூற்றாகும்
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={staggerItem}
              className="font-playfair hero-h1"
              style={{
                fontSize: 'clamp(38px, 4.5vw, 58px)',
                fontWeight: 700,
                color: 'var(--color-white)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: 28,
              }}
            >
              Transforming Electoral Mandates into Measurable Public Impact
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={staggerItem}
              style={{
                fontSize: 18,
                color: 'var(--color-muted)',
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              Thalaimai 360 is a trusted partner to elected representatives, enabling them to
              strengthen public trust, enhance governance effectiveness, and drive constituency
              development through structured strategy, workflows, and stakeholder partnerships.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="btn-ghost"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Contact Us
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column — Visual */}
          <div className="relative hidden lg:flex flex-col items-center justify-center min-h-[480px]">
            {/* Ambient 360 */}
            <div
              className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
              aria-hidden="true"
            >
              <span
                className="font-playfair"
                style={{
                  fontSize: 'clamp(180px, 22vw, 320px)',
                  fontWeight: 700,
                  color: 'rgba(201,168,76,0.06)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                }}
              >
                360
              </span>
            </div>

            {/* Stat Cards */}
            <div className="relative z-10 flex flex-col gap-4 w-full max-w-sm">
              {[
                {
                  stat: '1,10,000+',
                  label: 'Elected Representatives in Tamil Nadu',
                  delay: 0.3,
                },
                {
                  stat: 'ZERO',
                  label: 'Structured Governance Training Programs',
                  delay: 0.45,
                },
                {
                  stat: '12',
                  label: 'Core Capability Domains',
                  delay: 0.6,
                },
              ].map(({ stat, label, delay }) => (
                <motion.div
                  key={stat}
                  className="stat-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="font-playfair"
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: 'var(--color-gold)',
                      marginBottom: 6,
                    }}
                  >
                    {stat}
                  </div>
                  <div
                    className="font-inter"
                    style={{
                      fontSize: 13,
                      color: 'var(--color-muted)',
                      lineHeight: 1.5,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Stat Cards */}
        <div className="flex flex-col gap-3 mt-12 lg:hidden">
          {[
            { stat: '1,10,000+', label: 'Elected Representatives in Tamil Nadu' },
            { stat: 'ZERO', label: 'Structured Governance Training Programs' },
            { stat: '12', label: 'Core Capability Domains' },
          ].map(({ stat, label }) => (
            <div key={stat} className="stat-card">
              <div
                className="font-playfair"
                style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-gold)', marginBottom: 4 }}
              >
                {stat}
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
