'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './AnimationUtils'
import { CheckCircle2, ArrowRight, Shield } from 'lucide-react'

const steps = [
  {
    number: '01',
    label: 'ANALYZE',
    title: 'Constituency & Policy Audit',
    summary: 'Conduct in-depth audits, constituency profiles, and gap mapping to generate actionable intelligence.',
    deliverables: [
      '234-Ward Micro-Level Demographic Audit',
      'Constituency Development Gap Analysis',
      'State & Departmental Scheme Convergence Map',
    ],
    timeline: 'Weeks 1 – 4',
  },
  {
    number: '02',
    label: 'PLAN',
    title: 'Strategic Mandate Roadmap',
    summary: 'Formulate a strategic roadmap targeting specific development indices and governance milestones.',
    deliverables: [
      '5-Year Legislative & Constituency Master Plan',
      'Quarterly Performance & Outcome Benchmarks',
      'CSR & Corporate Partnership Prospectus',
    ],
    timeline: 'Weeks 5 – 8',
  },
  {
    number: '03',
    label: 'ENGAGE',
    title: 'Citizen Connect & Cadre Mobilization',
    summary: 'Deploy structured outreach networks connecting the office holder directly with local citizen bodies.',
    deliverables: [
      'Digital Grievance Help Desk Setup',
      'Youth & Women Leadership Councils',
      'Booth-Level Outreach Operating Manual',
    ],
    timeline: 'Continuous Phase',
  },
  {
    number: '04',
    label: 'MONITOR',
    title: 'Governance Dashboards & Review',
    summary: 'Track scheme implementation, response times, and program health through digital dashboards.',
    deliverables: [
      'Inter-Department Review Meeting Matrix',
      'Real-Time Project Tracking Dashboard',
      'Monthly Public Perception Monitor',
    ],
    timeline: 'Monthly Cycles',
  },
  {
    number: '05',
    label: 'IMPACT',
    title: 'Verifiable Transformation & Report',
    summary: 'Deliver verifiable community transformation and document success for electoral credibility.',
    deliverables: [
      'Annual Constituency Performance Report',
      'Official Achievement Media & Documentary',
      'Electoral Trust Audit & Sustainability Index',
    ],
    timeline: 'Annual Audit',
  },
]

export default function ApproachSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const activeStep = steps[activeStepIndex]

  return (
    <section id="approach" className="py-24 md:py-32 bg-black border-t border-border relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal>
            <p className="eyebrow mb-3">03</p>
            <h2 className="font-playfair text-3xl md:text-5xl text-white font-semibold leading-tight">
              Our Strategic 5-Stage Framework
            </h2>
          </Reveal>
          <p className="text-muted text-base max-w-lg font-inter">
            A battle-tested methodology turning electoral promises into structured, verifiable public governance outcomes.
          </p>
        </div>

        {/* Interactive Step Navigator Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
          {steps.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded border text-left transition-all relative overflow-hidden font-inter ${
                activeStepIndex === idx
                  ? 'bg-surface border-red shadow-lg'
                  : 'bg-surface/40 border-border hover:bg-surface/80 text-muted'
              }`}
            >
              <div className="text-[11px] font-semibold text-red uppercase tracking-wider mb-1">
                Phase {step.number}
              </div>
              <div className="text-sm font-semibold text-white truncate">
                {step.label}
              </div>
              {activeStepIndex === idx && (
                <motion.div
                  layoutId="stepIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-red"
                />
              )}
            </button>
          ))}
        </div>

        {/* Active Stage Detailed Breakdown Console */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.number}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-8 md:p-12 rounded border border-border bg-surface relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            style={{
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            }}
          >
            {/* Left Detail */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="eyebrow">STAGE {activeStep.number}</span>
                <div className="w-4 h-[1px] bg-red-dim" />
                <span className="text-xs uppercase tracking-widest text-red font-inter font-semibold">
                  {activeStep.timeline}
                </span>
              </div>

              <h3 className="font-playfair text-2xl md:text-4xl text-white font-semibold leading-tight">
                {activeStep.title}
              </h3>

              <p className="text-muted text-base font-inter leading-relaxed">
                {activeStep.summary}
              </p>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="btn-primary inline-flex items-center gap-2 text-xs uppercase tracking-wider font-inter"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Initiate Stage {activeStep.number} Consultation <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Right Deliverable Highlights */}
            <div className="p-6 md:p-8 rounded border border-border/60 bg-black/40 space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-xs font-semibold text-white uppercase tracking-wider font-inter flex items-center gap-2">
                  <Shield size={14} className="text-red" /> Mandatory Phase Deliverables
                </span>
                <span className="text-[11px] text-muted font-mono">STAGE {activeStep.number}</span>
              </div>

              <ul className="space-y-3">
                {activeStep.deliverables.map((d) => (
                  <li key={d} className="text-sm text-white/90 font-inter flex items-start gap-3 p-3 bg-surface-2/60 rounded border border-border/40">
                    <CheckCircle2 size={16} className="text-red flex-shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
