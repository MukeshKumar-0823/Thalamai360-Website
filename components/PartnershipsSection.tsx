'use client'

import { motion } from 'framer-motion'
import { Building2, Users, Briefcase, GraduationCap, Heart } from 'lucide-react'
import { Reveal, GoldRule } from './AnimationUtils'

const partnerships = [
  {
    icon: Building2,
    title: 'Government Departments',
    description: 'Integrating state schemes with local development objectives.',
  },
  {
    icon: Users,
    title: 'NGOs & Civil Society',
    description: 'Leveraging local field expertise and grassroot community networks.',
  },
  {
    icon: Briefcase,
    title: 'Corporate & CSR Partners',
    description: 'Securing private sector funding for critical infrastructure gaps.',
  },
  {
    icon: GraduationCap,
    title: 'Academic & Research Institutions',
    description: 'Applying evidence-based models and technical impact validation.',
  },
  {
    icon: Heart,
    title: 'Community Leaders & Volunteers',
    description: 'Empowering active citizens to lead ward-level action units.',
  },
]

export default function PartnershipsSection() {
  return (
    <section
      id="partnerships"
      className="py-24 md:py-32"
      style={{ background: 'var(--color-black)' }}
    >
      <div className="section-container">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-16 lg:gap-24 mb-16">
          {/* Left: Heading */}
          <div>
            <Reveal>
              <p className="eyebrow mb-4">04</p>
              <h2
                className="font-playfair section-title"
                style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 600,
                  color: 'var(--color-white)',
                  marginBottom: 20,
                  lineHeight: 1.2,
                }}
              >
                Our Strategic Partnerships
              </h2>
              <p
                className="font-inter"
                style={{
                  fontSize: 18,
                  color: 'var(--color-muted)',
                  lineHeight: 1.75,
                }}
              >
                We coordinate efforts across multiple domains to aggregate resources and drive
                sustainable constituency growth.
              </p>
            </Reveal>
          </div>

          {/* Right: Partnership tiles */}
          <div>
            {partnerships.map((partner, i) => {
              const Icon = partner.icon
              return (
                <motion.div
                  key={partner.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className="group flex items-start gap-6 py-6 transition-colors duration-200"
                    style={{
                      borderTop: '1px solid var(--color-border)',
                      cursor: 'default',
                      padding: '24px 12px',
                      borderRadius: 2,
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(201,168,76,0.04)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    {/* Icon + Title (left) */}
                    <div className="flex items-center gap-3 min-w-[220px]">
                      <Icon
                        size={20}
                        style={{ color: 'var(--color-gold)', flexShrink: 0 }}
                      />
                      <span
                        className="font-inter group-hover-gold"
                        style={{
                          fontSize: 16,
                          fontWeight: 500,
                          color: 'var(--color-white)',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
                      >
                        {partner.title}
                      </span>
                    </div>

                    {/* Description (right) */}
                    <p
                      className="font-inter hidden sm:block"
                      style={{
                        fontSize: 14,
                        color: 'var(--color-muted)',
                        lineHeight: 1.6,
                        flex: 1,
                      }}
                    >
                      {partner.description}
                    </p>
                  </div>

                  {/* Mobile description */}
                  <p
                    className="font-inter sm:hidden px-3 pb-4"
                    style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.6 }}
                  >
                    {partner.description}
                  </p>
                </motion.div>
              )
            })}

            {/* Bottom border for last item */}
            <div style={{ borderTop: '1px solid var(--color-border)' }} />
          </div>
        </div>

        {/* Pull Quote */}
        <motion.div
          className="pull-quote"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <blockquote>
            <p
              className="font-playfair"
              style={{
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                fontStyle: 'italic',
                color: 'var(--color-white)',
                lineHeight: 1.5,
                marginBottom: 20,
              }}
            >
              "Empowering Leaders. Engaging Citizens. Transforming Constituencies."
            </p>
            <footer
              className="font-inter"
              style={{
                fontSize: 13,
                color: 'var(--color-gold)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              — Thalaimai 360 Core Philosophy
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
