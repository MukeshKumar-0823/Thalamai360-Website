'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, Award, ArrowUpRight, ChevronRight } from 'lucide-react'

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

// Simple Counter Component
function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1800
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end])

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white"
      style={{ paddingTop: 120, paddingBottom: 60 }}
    >
      {/* Background Secretariat Image Texture with Dark Vignette */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Image
          src="/secretariat.jpg"
          alt="Chief Secretariat Background"
          fill
          className="object-cover object-center filter grayscale contrast-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/90" />
      </div>

      {/* Guilloché Line Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #D44535 1px, transparent 1px), linear-gradient(to bottom, #D44535 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="section-container w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Institutional Badge */}
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red/30 bg-red/10 w-max mb-6">
              <Award size={14} className="text-red" />
              <span className="text-xs uppercase tracking-widest text-red font-inter font-semibold">
                Sovereign & Political Governance Advisory
              </span>
            </motion.div>

            {/* Tamil Quote */}
            <motion.p
              variants={staggerItem}
              className="font-tamil text-lg md:text-xl text-red-dim italic mb-4 font-normal"
            >
              அரசியல் பிழைத்தோர்க்கு அறம் கூற்றாகும்
            </motion.p>

            {/* Main H1 */}
            <motion.h1
              variants={staggerItem}
              className="font-playfair hero-h1 text-4xl md:text-6xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight mb-6"
            >
              Transforming Electoral Mandates into Measurable Public Impact
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={staggerItem}
              className="font-inter text-base md:text-lg text-muted leading-relaxed mb-8 max-w-2xl"
            >
              Thalaimai 360 is a trusted partner to elected representatives, enabling them to
              strengthen public trust, enhance governance effectiveness, and drive constituency
              development through structured strategy, workflows, and stakeholder partnerships.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-4">
              <a
                href="#services"
                className="btn-primary flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Explore Capabilities <ChevronRight size={16} />
              </a>
              <a
                href="#contact"
                className="btn-ghost flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Request Confidential Briefing
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column — Institutional Live Metrics Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative flex flex-col gap-4 p-6 md:p-8 rounded border border-border bg-surface/90 backdrop-blur-xl shadow-2xl"
            style={{
              boxShadow: '0 30px 70px rgba(0,0,0,0.8), 0 0 30px rgba(212,69,53,0.1)',
            }}
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-white font-inter font-semibold">
                  Tamil Nadu Governance Scope
                </span>
              </div>
              <span className="text-[11px] text-muted font-mono">EST. 2026</span>
            </div>

            {/* Stat Item 1 */}
            <div className="p-4 rounded border border-border/50 bg-black/40">
              <div className="text-3xl md:text-4xl font-playfair font-bold text-red mb-1">
                <AnimatedCounter end={110000} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-wider text-muted font-inter">
                Elected Representatives in Tamil Nadu
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="p-4 rounded border border-border/50 bg-black/40">
              <div className="text-3xl md:text-4xl font-playfair font-bold text-white mb-1">
                ZERO
              </div>
              <div className="text-xs uppercase tracking-wider text-muted font-inter">
                Structured Governance Training Programs (Prior to T360)
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="p-4 rounded border border-border/50 bg-black/40">
              <div className="text-3xl md:text-4xl font-playfair font-bold text-red mb-1">
                <AnimatedCounter end={12} />
              </div>
              <div className="text-xs uppercase tracking-wider text-muted font-inter">
                Core Capability Advisory Domains
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-muted font-inter">
              <ShieldCheck size={14} className="text-red" />
              <span>Full Neutrality & Strict Political Confidentiality Ensured</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Live Governance Ticker at Bottom */}
      <div className="w-full border-t border-border bg-surface/50 py-3 relative z-10 overflow-hidden hidden sm:block">
        <div className="section-container flex items-center justify-between text-xs font-inter text-muted tracking-wider uppercase">
          <div className="flex items-center gap-6">
            <span className="text-red font-semibold">Live Mandate Scope:</span>
            <span>234 Assembly Constituencies</span>
            <span>·</span>
            <span>39 Parliamentary Constituencies</span>
            <span>·</span>
            <span>21 Municipal Corporations</span>
          </div>
          <a
            href="#contact"
            className="text-white hover:text-red transition-colors font-medium flex items-center gap-1"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Schedule Consultation <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  )
}
