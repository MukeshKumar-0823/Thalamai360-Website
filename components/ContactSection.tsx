'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, CheckCircle2 } from 'lucide-react'
import { Reveal, GoldRule } from './AnimationUtils'

interface FormData {
  name: string
  email: string
  phone: string
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
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-32"
      style={{ background: 'var(--color-black)' }}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left — Founder Profile */}
          <div>
            <Reveal>
              <p className="eyebrow mb-6" style={{ letterSpacing: '0.25em' }}>
                ESTABLISH LEADERSHIP OFFICE SUPPORT
              </p>
              <h2
                className="font-playfair section-title"
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  fontWeight: 600,
                  color: 'var(--color-white)',
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                Partner with Thalaimai 360
              </h2>
              <p
                className="font-inter"
                style={{
                  fontSize: 17,
                  color: 'var(--color-muted)',
                  lineHeight: 1.75,
                  marginBottom: 32,
                }}
              >
                Bring professional, structured governance excellence to your constituency.
              </p>
            </Reveal>

            {/* Gold Divider */}
            <div
              style={{
                height: 1,
                background: 'var(--color-gold-dim)',
                marginBottom: 32,
              }}
            />

            {/* Founder Card */}
            <div
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 4,
                padding: '28px 32px',
              }}
            >
              <h3
                className="font-inter"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--color-white)',
                  marginBottom: 4,
                }}
              >
                Srikala Sukumar
              </h3>
              <p
                className="font-inter"
                style={{
                  fontSize: 14,
                  color: 'var(--color-gold)',
                  marginBottom: 20,
                }}
              >
                Founder, Thalaimai 360
              </p>

              {/* Contact Items */}
              <div className="flex flex-col gap-4">
                <a
                  href="tel:+919940965032"
                  className="flex items-center gap-3 group"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as SVGElement
                    const text = e.currentTarget.querySelector('span') as HTMLElement
                    if (icon) icon.style.color = 'var(--color-gold)'
                    if (text) text.style.color = 'var(--color-white)'
                  }}
                  onMouseLeave={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as SVGElement
                    const text = e.currentTarget.querySelector('span') as HTMLElement
                    if (icon) icon.style.color = 'var(--color-muted)'
                    if (text) text.style.color = 'var(--color-muted)'
                  }}
                >
                  <Phone
                    size={16}
                    style={{ color: 'var(--color-muted)', transition: 'color 0.2s ease', flexShrink: 0 }}
                  />
                  <span
                    className="font-inter"
                    style={{
                      fontSize: 15,
                      color: 'var(--color-muted)',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    +91 9940965032
                  </span>
                </a>

                <a
                  href="mailto:thalaimai360@gmail.com"
                  className="flex items-center gap-3 group"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as SVGElement
                    const text = e.currentTarget.querySelector('span') as HTMLElement
                    if (icon) icon.style.color = 'var(--color-gold)'
                    if (text) text.style.color = 'var(--color-white)'
                  }}
                  onMouseLeave={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as SVGElement
                    const text = e.currentTarget.querySelector('span') as HTMLElement
                    if (icon) icon.style.color = 'var(--color-muted)'
                    if (text) text.style.color = 'var(--color-muted)'
                  }}
                >
                  <Mail
                    size={16}
                    style={{ color: 'var(--color-muted)', transition: 'color 0.2s ease', flexShrink: 0 }}
                  />
                  <span
                    className="font-inter"
                    style={{
                      fontSize: 15,
                      color: 'var(--color-muted)',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    thalaimai360@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-inter block mb-2"
                      style={{ fontSize: 12, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      Name / Representative Office
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="E.g., Office of MLA, Madurai South"
                      className="form-field"
                      {...register('name', { required: 'This field is required' })}
                    />
                    {errors.name && (
                      <p className="font-inter mt-1" style={{ fontSize: 12, color: '#E57373' }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-inter block mb-2"
                      style={{ fontSize: 12, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      Official Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="name@domain.com"
                      className="form-field"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="font-inter mt-1" style={{ fontSize: 12, color: '#E57373' }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="font-inter block mb-2"
                      style={{ fontSize: 12, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      Contact Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="E.g., +91 98765 43210"
                      className="form-field"
                      {...register('phone', { required: 'Phone number is required' })}
                    />
                    {errors.phone && (
                      <p className="font-inter mt-1" style={{ fontSize: 12, color: '#E57373' }}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Requirements */}
                  <div>
                    <label
                      htmlFor="contact-requirements"
                      className="font-inter block mb-2"
                      style={{ fontSize: 12, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      Consultation Requirements
                    </label>
                    <textarea
                      id="contact-requirements"
                      placeholder="Describe the leadership or constituency mapping services required..."
                      className="form-field resize-none"
                      style={{ minHeight: 120 }}
                      {...register('requirements', { required: 'Please describe your requirements' })}
                    />
                    {errors.requirements && (
                      <p className="font-inter mt-1" style={{ fontSize: 12, color: '#E57373' }}>
                        {errors.requirements.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    id="contact-submit"
                    className="btn-submit"
                    disabled={loading}
                    style={{
                      opacity: loading ? 0.7 : 1,
                      transition: 'background 0.2s ease, opacity 0.2s ease',
                    }}
                  >
                    {loading ? 'Sending...' : 'Request Consultation'}
                  </button>

                  {/* Secondary Link */}
                  <div className="text-center">
                    <a
                      href="mailto:thalaimai360@gmail.com?subject=Corporate Profile Request"
                      className="font-inter"
                      style={{
                        fontSize: 13,
                        color: 'var(--color-gold)',
                        textDecoration: 'none',
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s ease',
                        paddingBottom: 1,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = 'var(--color-gold)')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
                    >
                      Request Corporate Profile →
                    </a>
                  </div>
                </motion.form>
              ) : (
                /* Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center text-center gap-6 py-16"
                >
                  <CheckCircle2
                    size={48}
                    style={{ color: 'var(--color-gold)' }}
                  />
                  <h3
                    className="font-playfair"
                    style={{ fontSize: 24, color: 'var(--color-white)' }}
                  >
                    Your request has been received.
                  </h3>
                  <p
                    className="font-inter"
                    style={{ fontSize: 15, color: 'var(--color-muted)' }}
                  >
                    We will contact you within 24 hours.
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
