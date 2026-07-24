'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, CheckCircle2, ShieldCheck, Lock, Building2 } from 'lucide-react'
import { Reveal } from './AnimationUtils'

interface FormData {
  name: string
  email: string
  phone: string
  jurisdiction: string
  requirements: string
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-black border-t border-border relative">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left — Founder Profile & Sovereign Trust */}
          <div>
            <Reveal>
              <p className="eyebrow mb-4">ESTABLISH LEADERSHIP OFFICE SUPPORT</p>
              <h2 className="font-playfair text-3xl md:text-5xl text-white font-semibold leading-tight mb-4">
                Partner with Thalaimai 360
              </h2>
              <p className="text-muted text-base md:text-lg font-inter leading-relaxed mb-8">
                Bring professional, structured governance excellence to your constituency and legislative mandate.
              </p>
            </Reveal>

            {/* Strict Neutrality & NDA Notice Box */}
            <div className="p-4 rounded border border-red/30 bg-red/5 mb-8 flex items-start gap-4">
              <Lock className="text-red flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white font-inter mb-1">
                  Strict Confidentiality & Non-Disclosure Assurance
                </h4>
                <p className="text-xs text-muted font-inter leading-relaxed">
                  All consultations, demographic profiling, and advisory communications are conducted under strict non-disclosure protocols and complete political neutrality.
                </p>
              </div>
            </div>

            {/* Founder Profile Card */}
            <div className="p-6 md:p-8 rounded border border-border bg-surface relative overflow-hidden space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-red/20 border border-red flex items-center justify-center text-red font-playfair font-bold text-xl">
                  SS
                </div>
                <div>
                  <h3 className="font-inter text-xl font-semibold text-white">
                    Srikala Sukumar
                  </h3>
                  <p className="text-xs text-red font-inter font-medium tracking-wider uppercase">
                    Founder & Principal Governance Strategist, Thalaimai 360
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted font-inter leading-relaxed italic border-l-2 border-red pl-4">
                "Governance is not merely winning an election; it is the daily, rigorous institutional work of transforming electoral mandates into measurable public trust."
              </p>

              <div className="space-y-3 pt-2 border-t border-border/60">
                <a
                  href="tel:+919940965032"
                  className="flex items-center gap-3 text-sm text-muted hover:text-white font-inter transition-colors"
                >
                  <Phone size={16} className="text-red" />
                  <span>+91 9940965032</span>
                </a>

                <a
                  href="mailto:thalaimai360@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted hover:text-white font-inter transition-colors"
                >
                  <Mail size={16} className="text-red" />
                  <span>thalaimai360@gmail.com</span>
                </a>

                <div className="flex items-center gap-3 text-xs text-muted font-inter pt-1">
                  <Building2 size={16} className="text-red" />
                  <span>Chennai · Madurai · Tamil Nadu, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Confidential Engagement Form */}
          <div className="p-6 md:p-10 rounded border border-border bg-surface shadow-2xl relative">
            <div className="mb-6 border-b border-border/60 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-red font-semibold uppercase tracking-widest font-inter block">
                  Official Advisory Briefing
                </span>
                <h3 className="font-playfair text-2xl text-white font-semibold">
                  Request Confidential Meeting
                </h3>
              </div>
              <ShieldCheck className="text-red" size={24} />
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label htmlFor="contact-name" className="text-xs uppercase tracking-wider text-muted font-inter block mb-1.5">
                      Name / Representative Office *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="E.g., Office of MLA, Madurai South"
                      className="form-field"
                      {...register('name', { required: 'Representative Name is required' })}
                    />
                    {errors.name && <p className="text-xs text-red mt-1 font-inter">{errors.name.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="text-xs uppercase tracking-wider text-muted font-inter block mb-1.5">
                        Official Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="name@domain.com"
                        className="form-field"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                        })}
                      />
                      {errors.email && <p className="text-xs text-red mt-1 font-inter">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="text-xs uppercase tracking-wider text-muted font-inter block mb-1.5">
                        Direct Contact Phone *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="form-field"
                        {...register('phone', { required: 'Phone number is required' })}
                      />
                      {errors.phone && <p className="text-xs text-red mt-1 font-inter">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-jurisdiction" className="text-xs uppercase tracking-wider text-muted font-inter block mb-1.5">
                      Elected Office / Jurisdiction Type
                    </label>
                    <select
                      id="contact-jurisdiction"
                      className="form-field bg-surface text-white"
                      {...register('jurisdiction')}
                    >
                      <option value="State MLA">State MLA (Legislative Assembly)</option>
                      <option value="Member of Parliament">Member of Parliament (MP)</option>
                      <option value="Local Body / Corporation">Local Body / Municipal Council</option>
                      <option value="Political Party Executive">Party Executive / Campaign Office</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-requirements" className="text-xs uppercase tracking-wider text-muted font-inter block mb-1.5">
                      Advisory Requirements & Scope *
                    </label>
                    <textarea
                      id="contact-requirements"
                      placeholder="Describe the leadership coaching, constituency mapping, or grievance workflow support required..."
                      className="form-field resize-none min-h-[110px]"
                      {...register('requirements', { required: 'Please state your requirements' })}
                    />
                    {errors.requirements && <p className="text-xs text-red mt-1 font-inter">{errors.requirements.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-submit flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? 'Transmitting Request...' : 'Schedule Confidential Consultation'}
                  </button>

                  <p className="text-[11px] text-center text-muted font-inter pt-2">
                    🔒 All submissions are encrypted and handled personally by the Founder.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-4 py-12"
                >
                  <CheckCircle2 size={48} className="text-red" />
                  <h4 className="font-playfair text-2xl text-white">Your Confidential Request Has Been Received</h4>
                  <p className="text-sm text-muted font-inter max-w-sm">
                    Our Executive Office will contact your representative directly within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
