'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react'

export interface ServiceDetail {
  id: string
  title: string
  category: 'executive' | 'communication' | 'governance' | 'constituency'
  categoryLabel: string
  summary: string
  bullets: string[]
  deliverables: string[]
  impactMetrics: string
}

interface ServiceModalProps {
  service: ServiceDetail | null
  onClose: () => void
  onSelectConsultation: (serviceTitle: string) => void
}

export default function ServiceModal({ service, onClose, onSelectConsultation }: ServiceModalProps) {
  if (!service) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          className="relative w-full max-w-3xl z-10 overflow-hidden my-auto"
          style={{
            background: 'linear-gradient(145deg, #0F1A33 0%, #090F1F 100%)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,69,53,0.15)',
            borderRadius: 4,
          }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header Banner */}
          <div className="p-6 md:p-8 border-b border-border/60 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-muted hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="eyebrow">{service.id}</span>
              <div className="w-4 h-[1px] bg-red-dim" />
              <span className="text-xs uppercase tracking-widest text-red font-inter font-medium">
                {service.categoryLabel}
              </span>
            </div>

            <h3 className="font-playfair text-2xl md:text-3xl text-white font-semibold">
              {service.title}
            </h3>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
            {/* Overview */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted mb-2 font-inter">
                Advisory Overview
              </h4>
              <p className="text-white/90 text-base leading-relaxed font-inter">
                {service.summary}
              </p>
            </div>

            {/* Core Capability Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded border border-border/50 bg-black/30">
                <h5 className="text-sm font-semibold text-white mb-3 font-inter flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-red" />
                  Key Modules & Scope
                </h5>
                <ul className="space-y-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="text-xs text-muted font-inter flex items-start gap-2">
                      <span className="text-red mt-0.5">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded border border-border/50 bg-black/30">
                <h5 className="text-sm font-semibold text-white mb-3 font-inter flex items-center gap-2">
                  <ShieldCheck size={16} className="text-red" />
                  Tangible Deliverables
                </h5>
                <ul className="space-y-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="text-xs text-muted font-inter flex items-start gap-2">
                      <span className="text-red mt-0.5">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Impact Metric Banner */}
            <div className="p-4 rounded border border-red/20 bg-red/5 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-muted block font-inter">
                  Target Outcome Metric
                </span>
                <span className="text-sm font-medium text-white font-inter">
                  {service.impactMetrics}
                </span>
              </div>
              <span className="text-xs font-semibold text-red uppercase tracking-wider font-inter">
                Guaranteed Standard
              </span>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-6 md:p-8 border-t border-border/60 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-muted font-inter flex items-center gap-2">
              <ShieldCheck size={14} className="text-red" /> Strictly Confidential & NDA Protected
            </span>

            <button
              onClick={() => {
                onSelectConsultation(service.title)
                onClose()
              }}
              className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Request Advisory Briefing <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
