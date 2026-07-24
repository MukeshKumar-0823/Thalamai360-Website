'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react'
import { Reveal } from './AnimationUtils'

interface QuizOption {
  id: string
  label: string
  desc: string
}

const steps = [
  {
    step: 1,
    title: 'Select Official Jurisdiction',
    question: 'What level of elected office or representation does your office hold?',
    options: [
      { id: 'mla', label: 'Member of Legislative Assembly (MLA)', desc: 'State Legislative Constituency oversight & scheme deployment' },
      { id: 'mp', label: 'Member of Parliament (MP)', desc: 'Lok Sabha / Rajya Sabha policy, central funds & regional impact' },
      { id: 'local', label: 'Local Body / Corporation Leader', desc: 'Mayor, Chairman, Ward Councillor & municipal public works' },
      { id: 'party', label: 'Party Executive / Campaign Strategist', desc: 'State or district level political sustainability & cadre network' },
    ],
  },
  {
    step: 2,
    title: 'Primary Strategic Focus Area',
    question: 'What is the single most urgent priority for your current term?',
    options: [
      { id: 'grievance', label: 'Citizen Grievance & Public Connect', desc: 'Systematizing ward-level issue tracking and rapid response' },
      { id: 'image', label: 'Executive Image & Strategic Media', desc: 'Statewide media profile, speeches, crisis messaging & digital reputation' },
      { id: 'policy', label: 'Legislative Advisory & Scheme Convergence', desc: 'House preparation, policy briefs, CSR & department coordination' },
      { id: 'constituency', label: 'Constituency Intelligence & Profiling', desc: 'Demographic mapping, development gap audits & voter sentiment' },
    ],
  },
  {
    step: 3,
    title: 'Constituency Demographic Scale',
    question: 'What is the structural scale of your voter base?',
    options: [
      { id: 'urban', label: 'Urban / Metro Constituency', desc: 'High digital density, civic infrastructure & middle-class voter dynamics' },
      { id: 'rural', label: 'Rural / Agrarian Constituency', desc: 'Panchayat networks, grassroots scheme delivery & agricultural issues' },
      { id: 'semi', label: 'Semi-Urban / Mixed Constituency', desc: 'Industrial corridors, youth employment & expanding urban fringes' },
    ],
  },
]

export default function DiagnosticConsole() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [analyzing, setAnalyzing] = useState(false)
  const [completed, setCompleted] = useState(false)

  const handleSelect = (optionId: string) => {
    const updated = { ...answers, [currentStep]: optionId }
    setAnswers(updated)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setAnalyzing(true)
      setTimeout(() => {
        setAnalyzing(false)
        setCompleted(true)
      }, 1200)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentStep(0)
    setCompleted(false)
    setAnalyzing(false)
  }

  const getRecommendation = () => {
    const focus = answers[1]
    if (focus === 'grievance') {
      return {
        title: 'Constituency Grievance & Public Service Model 360°',
        code: 'PKG-MOD-01',
        desc: 'Includes 24/7 Ward-Level Grievance Collection Software, Help Desk Operating Manual, Public Outreach Schedules, and Resolution Tracking Dashboards.',
        modules: [
          'Digital Grievance Tracking System',
          'Constituency Office Staff Workflow Training',
          'Quarterly Performance & Public Sentiment Report',
        ],
      }
    }
    if (focus === 'image') {
      return {
        title: 'Strategic Communication & Media Influence Engine',
        code: 'PKG-MOD-02',
        desc: 'Customized Legislative Speechwriting, State Media Interview Preparation, Digital Reputation Management, and Crisis Handling Playbook.',
        modules: [
          'High-Impact Speechwriting & Debating Support',
          'Statewide Media Relations & Press Room Setup',
          'Digital Achievement Storytelling & Video Campaigns',
        ],
      }
    }
    if (focus === 'policy') {
      return {
        title: 'Governance, Policy & Legislative Advisory Suite',
        code: 'PKG-MOD-03',
        desc: 'Assembly Session Briefs, Departmental Scheme Convergence Strategy, and CSR Corporate Infrastructure Partnerships.',
        modules: [
          'Assembly / Parliament Question & Motion Briefings',
          'Departmental Development Gap Mapping',
          'CSR & Corporate Resource Mobilization',
        ],
      }
    }
    return {
      title: '360° Electoral Mandate & Constituency Intelligence Roadmap',
      code: 'PKG-MOD-04',
      desc: 'Full 234-Ward Demographic SWOT Analysis, Sentiment Tracking, Booth-Level Volunteer Network Framework, and 5-Year Development Plan.',
      modules: [
        'Ward / Village Micro-Level Demographic Audit',
        'Voter Perception & Sentiment Dashboard',
        'Youth & Community Leadership Network Framework',
      ],
    }
  }

  const scrollToContact = (recommendedTitle: string) => {
    const contactSec = document.querySelector('#contact')
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' })
      const reqTextarea = document.querySelector('#contact-requirements') as HTMLTextAreaElement
      if (reqTextarea) {
        reqTextarea.value = `[Diagnostic Request] Interested in the recommended advisory package: ${recommendedTitle}`
      }
    }
  }

  return (
    <section className="py-24 md:py-32 bg-black border-t border-border relative overflow-hidden">
      {/* Subtle guilloché background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #D44535 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="section-container relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="eyebrow mb-3">CONSTITUENCY DIAGNOSTIC CONSOLE</p>
              <h2 className="font-playfair text-3xl md:text-5xl text-white font-semibold leading-tight">
                Assess Your Constituency Needs
              </h2>
            </div>
            <p className="text-muted text-sm md:text-base max-w-md font-inter">
              An interactive self-assessment tool designed for elected leaders to pinpoint critical governance gaps and identify tailored strategic advisory solutions.
            </p>
          </div>
        </Reveal>

        {/* Main Interactive Box */}
        <div
          className="p-6 md:p-12 rounded border border-border bg-surface relative overflow-hidden min-h-[440px] flex flex-col justify-between"
          style={{
            boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Top Progress Bar */}
          {!completed && !analyzing && (
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs uppercase tracking-widest font-inter mb-3 text-muted">
                <span>Phase {steps[currentStep].step} of 3</span>
                <span className="text-red font-semibold">{steps[currentStep].title}</span>
              </div>
              <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-red"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          )}

          {/* Step Questions */}
          <AnimatePresence mode="wait">
            {!analyzing && !completed && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 flex-1"
              >
                <h3 className="font-playfair text-xl md:text-2xl text-white font-semibold">
                  {steps[currentStep].question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {steps[currentStep].options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      className="p-5 rounded border border-border/80 bg-black/40 hover:bg-surface-2 hover:border-red transition-all text-left group flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-base font-semibold text-white group-hover:text-red transition-colors font-inter mb-1">
                          {opt.label}
                        </div>
                        <div className="text-xs text-muted font-inter leading-relaxed">
                          {opt.desc}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-red opacity-0 group-hover:opacity-100 transition-opacity font-inter uppercase tracking-wider">
                        Select Option <ArrowRight size={12} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Analyzing State */}
            {analyzing && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-16 space-y-4 my-auto"
              >
                <div className="w-12 h-12 border-2 border-red border-t-transparent rounded-full animate-spin" />
                <h4 className="font-playfair text-2xl text-white">Synthesizing Constituency Profile...</h4>
                <p className="text-sm text-muted font-inter">Evaluating governance benchmarks and structural advisory models</p>
              </motion.div>
            )}

            {/* Completed Recommendation */}
            {completed && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 my-auto"
              >
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-red" size={24} />
                    <div>
                      <span className="text-xs font-semibold text-red uppercase tracking-widest font-inter block">
                        Diagnostic Assessment Complete
                      </span>
                      <h4 className="font-playfair text-xl md:text-2xl text-white font-semibold">
                        Recommended Strategic Package
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-xs text-muted hover:text-white flex items-center gap-1 font-inter transition-colors"
                  >
                    <RotateCcw size={14} /> Retake Audit
                  </button>
                </div>

                {/* Package Result Card */}
                {(() => {
                  const rec = getRecommendation()
                  return (
                    <div className="p-6 rounded border border-red/30 bg-red/5 space-y-4">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <span className="text-xs text-red font-mono font-semibold tracking-wider">
                            {rec.code}
                          </span>
                          <h5 className="font-playfair text-2xl text-white font-semibold">
                            {rec.title}
                          </h5>
                        </div>
                        <span className="text-xs text-white/80 bg-red/20 px-3 py-1 rounded border border-red/30 font-inter">
                          High Compatibility Match
                        </span>
                      </div>

                      <p className="text-sm text-muted font-inter leading-relaxed">
                        {rec.desc}
                      </p>

                      <div className="space-y-2 pt-2">
                        <span className="text-xs font-semibold text-white uppercase tracking-wider font-inter block">
                          Included Capability Modules:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {rec.modules.map((m) => (
                            <div key={m} className="p-3 bg-black/40 rounded border border-border/50 text-xs text-white font-inter flex items-start gap-2">
                              <CheckCircle2 size={14} className="text-red flex-shrink-0 mt-0.5" />
                              <span>{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/40">
                        <span className="text-xs text-muted font-inter">
                          🔒 Confidential Advisory & Direct Executive Consultation
                        </span>
                        <button
                          onClick={() => scrollToContact(rec.title)}
                          className="btn-primary flex items-center gap-2 text-xs uppercase tracking-wider font-inter"
                        >
                          Request Custom Briefing <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
