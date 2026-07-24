'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseEnterInteractive = () => setExpanded(true)
    const onMouseLeaveInteractive = () => setExpanded(false)

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.15)
      current.current.y = lerp(current.current.y, pos.current.y, 0.15)

      if (cursorRef.current) {
        cursorRef.current.style.left = `${current.current.x}px`
        cursorRef.current.style.top = `${current.current.y}px`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    // Add expand on interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], .interactive')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })

    // Observer for dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [role="button"]')
      newInteractives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${expanded ? 'expanded' : ''}`}
      aria-hidden="true"
    />
  )
}
