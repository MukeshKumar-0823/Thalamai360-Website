'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Reveal } from './AnimationUtils'

const steps = [
  {
    number: '01',
    label: 'ANALYZE',
    title: 'Analyze',
    body: 'Conduct in-depth audits, constituency profiles, and gap mapping to generate actionable intelligence.',
  },
  {
    number: '02',
    label: 'PLAN',
    title: 'Plan',
    body: 'Formulate a strategic roadmap targeting specific development indices and governance milestones.',
  },
  {
    number: '03',
    label: 'ENGAGE',
    title: 'Engage',
    body: 'Deploy structured outreach networks connecting the office holder directly with local citizen bodies.',
  },
  {
    number: '04',
    label: 'MONITOR',
    title: 'Monitor',
    body: 'Track scheme implementation, response times, and program health through digital dashboards.',
  },
  {
    number: '05',
    label: 'IMPACT',
    title: 'Impact',
    body: 'Deliver verifiable community transformation and document success for electoral credibility.',
  },
]

function StepCard({ step, index, isLast }: { step: typeof steps[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
      style={{
        padding: '48px 40px',
        borderBottom: isLast ? 'none' : '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      {/* Ambient step number */}
      <div
        className="absolute top-4 right-6 font-playfair select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontSize: 120,
          fontWeight: 700,
          color: 'rgba(28,52,97,0.18)',
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        {step.number}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Step label */}
        <p
          className="eyebrow mb-4"
          style={{ color: 'var(--color-red)' }}
        >
          {step.number} / {step.label}
        </p>

        {/* Red rule */}
        <div
          style={{
            height: 1,
            background: inView ? 'var(--color-red-dim)' : 'transparent',
            transformOrigin: 'left',
            transform: inView ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, background 0s',
            marginBottom: 24,
            width: '100%',
          }}
        />

        {/* Title */}
        <h3
          className="font-playfair"
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: 'var(--color-white)',
            marginBottom: 14,
            lineHeight: 1.2,
          }}
        >
          {step.title}
        </h3>

        {/* Body */}
        <p
          className="font-inter"
          style={{
            fontSize: 16,
            color: 'var(--color-muted)',
            lineHeight: 1.75,
            maxWidth: 560,
          }}
        >
          {step.body}
        </p>
      </div>
    </motion.div>
  )
}

export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="py-24 md:py-32"
      style={{ background: 'var(--color-black)' }}
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-12">
          <Reveal>
            <p className="eyebrow mb-4">03</p>
            <h2
              className="font-playfair section-title"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 600,
                color: 'var(--color-white)',
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Our Strategic Approach
            </h2>
            <p
              className="font-inter"
              style={{
                fontSize: 17,
                color: 'var(--color-muted)',
                lineHeight: 1.7,
                maxWidth: 560,
              }}
            >
              A five-stage framework turning political mandates into structured, measurable action on the ground.
            </p>
          </Reveal>
        </div>

        {/* Steps grid — 2 col desktop, 1 col mobile */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 1, background: 'var(--color-border)', borderRadius: 4, overflow: 'hidden' }}
        >
          {steps.map((step, i) => (
            <div key={step.number} style={{ background: 'var(--color-surface)' }}>
              <StepCard step={step} index={i} isLast={i === steps.length - 1} />
            </div>
          ))}

          {/* Empty filler cell so 5 steps fills the 3-col grid evenly */}
          <div
            style={{
              background: 'var(--color-black)',
              padding: '48px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p
              className="font-playfair text-center"
              style={{
                fontSize: 'clamp(32px, 3vw, 48px)',
                fontWeight: 700,
                color: 'rgba(28,52,97,0.25)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              360°<br />Leadership
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
