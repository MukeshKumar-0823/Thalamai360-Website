'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Preloader from '@/components/Preloader'
import DoorEntrance from '@/components/DoorEntrance'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import DiagnosticConsole from '@/components/DiagnosticConsole'
import ApproachSection from '@/components/ApproachSection'
import PartnershipsSection from '@/components/PartnershipsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import LenisProvider from '@/components/LenisProvider'

type AppState = 'preloading' | 'door' | 'revealed'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('preloading')

  const handlePreloaderComplete = () => {
    setAppState('door')
  }

  const handleReveal = () => {
    setAppState('revealed')
  }

  return (
    <>
      {/* Custom cursor — desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Preloader */}
      <AnimatePresence>
        {appState === 'preloading' && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* 3D Secretariat Gate Entrance (Harish Branch Design) */}
      <AnimatePresence>
        {appState === 'door' && (
          <DoorEntrance onComplete={handleReveal} />
        )}
      </AnimatePresence>

      {/* Main Ultra-Premium Site */}
      <AnimatePresence>
        {appState === 'revealed' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <LenisProvider>
              <Navbar />
              <main id="main-content">
                <HeroSection />
                <ServicesSection />
                <DiagnosticConsole />
                <ApproachSection />
                <PartnershipsSection />
                <ContactSection />
              </main>
              <Footer />
            </LenisProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
