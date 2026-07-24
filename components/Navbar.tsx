'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { label: 'About', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Partnerships', href: '#partnerships' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : 'bg-transparent border-b border-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="section-container flex items-center justify-between h-16 md:h-20">
          {/* Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
            aria-label="Thalaimai 360 home"
          >
            {/* Logo image */}
            <div
              style={{
                width: 34,
                height: 34,
                background: 'white',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
                flexShrink: 0,
              }}
            >
              <Image
                src="/logo.svg"
                alt="Thalaimai 360 logo"
                width={28}
                height={28}
                priority
              />
            </div>
            <span
              className="font-tamil text-base"
              style={{ color: 'var(--color-red)', letterSpacing: '0.05em' }}
            >
              தலைமை
            </span>
            <span
              className="font-playfair text-lg font-semibold"
              style={{ color: 'var(--color-white)' }}
            >
              360
            </span>
          </a>


          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="font-inter transition-colors duration-200"
                style={{
                  fontSize: 13,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-red)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                {link.label}
              </a>
            ))}

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
              className="font-inter transition-all duration-200"
              style={{
                fontSize: 13,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-red)',
                border: '1px solid var(--color-red)',
                borderRadius: 2,
                padding: '8px 20px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-red)'
                e.currentTarget.style.color = '#000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--color-red)'
              }}
            >
              Partner with Us
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            style={{ background: 'none', border: 'none', color: 'var(--color-white)' }}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
            style={{ background: 'var(--color-black)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close Button */}
            <button
              className="absolute top-5 right-6 p-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              style={{ background: 'none', border: 'none', color: 'var(--color-white)' }}
            >
              <X size={24} />
            </button>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="font-playfair"
                  style={{
                    fontSize: 32,
                    color: 'var(--color-white)',
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-red)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.35 }}
                className="btn-ghost mt-4"
              >
                Partner with Us
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
