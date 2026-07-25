'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface DoorEntranceProps {
  onComplete: () => void
}

export default function DoorEntrance({ onComplete }: DoorEntranceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [started, setStarted] = useState(false)
  const frameCount = 300

  const getFramePath = (index: number) => {
    const padded = index.toString().padStart(3, '0')
    return `/door-sequence/ezgif-frame-${padded}.jpg`
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Preload first frame immediately
    const firstImg = new Image()
    firstImg.src = getFramePath(1)
    firstImg.onload = () => {
      const hRatio = canvas.width / firstImg.width
      const vRatio = canvas.height / firstImg.height
      const ratio = Math.max(hRatio, vRatio)
      const shiftX = (canvas.width - firstImg.width * ratio) / 2
      const shiftY = (canvas.height - firstImg.height * ratio) / 2
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(
        firstImg,
        0, 0, firstImg.width, firstImg.height,
        shiftX, shiftY, firstImg.width * ratio, firstImg.height * ratio
      )
    }

    // Preload rest in background
    for (let i = 2; i <= frameCount; i++) {
      const img = new Image()
      img.src = getFramePath(i)
    }

    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const playSequence = () => {
    if (started) return
    setStarted(true)

    const canvas = canvasRef.current
    if (!canvas) {
      onComplete()
      return
    }
    const context = canvas.getContext('2d')
    if (!context) {
      onComplete()
      return
    }

    let current = 1
    const total = 300
    const fps = 60
    const interval = 1000 / fps

    const timer = setInterval(() => {
      current += 2 // Fast, cinematic 3D gate opening
      if (current >= total) {
        clearInterval(timer)
        setTimeout(onComplete, 150)
      } else {
        const img = new Image()
        const padded = Math.min(current, total).toString().padStart(3, '0')
        img.src = `/door-sequence/ezgif-frame-${padded}.jpg`
        img.onload = () => {
          const hRatio = canvas.width / img.width
          const vRatio = canvas.height / img.height
          const ratio = Math.max(hRatio, vRatio)
          const shiftX = (canvas.width - img.width * ratio) / 2
          const shiftY = (canvas.height - img.height * ratio) / 2

          context.clearRect(0, 0, canvas.width, canvas.height)
          context.drawImage(
            img,
            0, 0, img.width, img.height,
            shiftX, shiftY, img.width * ratio, img.height * ratio
          )
        }
      }
    }, interval)
  }

  return (
    <div
      className="fixed inset-0 z-[700] bg-black overflow-hidden select-none cursor-pointer"
      onClick={playSequence}
      role="button"
      tabIndex={0}
      aria-label="Click anywhere to enter"
      onKeyDown={(e) => e.key === 'Enter' && playSequence()}
    >
      {/* Full-screen 3D Secretariat Gate Canvas (Clean, no center box) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Subtle Bottom Click Hint (Minimal, elegant prompt) */}
      {!started && (
        <motion.div
          className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center justify-center gap-2 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-red animate-ping" />
            <span className="text-xs uppercase tracking-widest text-white/90 font-inter font-medium">
              Click anywhere to enter
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
