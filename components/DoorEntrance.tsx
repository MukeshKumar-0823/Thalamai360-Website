'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface DoorEntranceProps {
  onComplete: () => void
}

export default function DoorEntrance({ onComplete }: DoorEntranceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
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

    // Preload frames
    const images: HTMLImageElement[] = []
    let loadedCount = 0

    const drawFrame = (img: HTMLImageElement) => {
      if (!canvas || !context) return
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

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      img.src = getFramePath(i)
      img.onload = () => {
        loadedCount++
        setProgress(Math.floor((loadedCount / frameCount) * 100))
        if (i === 1) drawFrame(img)
        if (loadedCount >= 60) setLoaded(true) // Ready as soon as first 60 frames load
      }
      images.push(img)
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

    const draw = (idx: number) => {
      const img = new Image()
      const padded = idx.toString().padStart(3, '0')
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

    const timer = setInterval(() => {
      current += 2 // Advance 2 frames per tick for rapid, cinematic 3D gate opening
      if (current >= total) {
        clearInterval(timer)
        setTimeout(onComplete, 200)
      } else {
        draw(current)
      }
    }, interval)
  }

  return (
    <div
      className="fixed inset-0 z-[700] bg-black overflow-hidden flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={playSequence}
      role="button"
      tabIndex={0}
      aria-label="Click to open 3D Secretariat Gate"
      onKeyDown={(e) => e.key === 'Enter' && playSequence()}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Overlay Badges before click */}
      {!started && (
        <motion.div
          className="relative z-10 flex flex-col items-center text-center p-6 bg-black/70 backdrop-blur-md rounded border border-red/40 max-w-lg mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2 mb-4 shadow-xl">
            <img src="/logo.svg" alt="Thalaimai 360" className="w-full h-full object-contain" />
          </div>

          <h1 className="font-tamil text-3xl md:text-4xl text-white font-bold mb-1">
            தலைமை <span className="font-playfair text-red">360</span>
          </h1>
          <p className="font-playfair text-lg text-red font-semibold tracking-wider uppercase mb-3">
            THALAIMAI 360
          </p>

          <p className="font-tamil text-xs text-muted tracking-wide mb-6">
            ஆளுகை · தலைமை · தொகுதி
          </p>

          {loaded ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red animate-ping" />
              <span className="text-xs uppercase tracking-widest text-white font-inter font-semibold">
                Click Anywhere to Open 3D Secretariat Gate
              </span>
            </div>
          ) : (
            <div className="text-xs text-muted font-inter">
              Loading 3D Gate Sequence... {progress}%
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
