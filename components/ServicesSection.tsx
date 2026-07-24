'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Reveal, GoldRule } from './AnimationUtils'

const services = [
  {
    id: '01',
    title: 'Executive Leadership Development',
    bullets: [
      'Leadership coaching & mentoring',
      'Personal branding & public image',
      'Dress etiquette & executive grooming',
      'Time management & productivity',
      'Stress & stakeholder management',
      'High performance mindset',
    ],
  },
  {
    id: '02',
    title: 'Strategic Communication & Public Influence',
    bullets: [
      'Speech writing & messaging',
      'Public speaking & stage presence',
      'Media interview preparation',
      'Press meets & media handling',
      'Crisis communication management',
      'Persuasive communication skills',
    ],
  },
  {
    id: '03',
    title: 'Stakeholder Relations & Public Affairs',
    bullets: [
      'Citizen engagement strategy',
      'Community relationship building',
      'Party cadre engagement',
      'NGO & civil society partnerships',
      'Industry & business relations',
      'Key stakeholder relationship management',
    ],
  },
  {
    id: '04',
    title: 'Governance, Policy & Legislative Advisory',
    bullets: [
      'Policy & issue analysis',
      'Bills, rules & legislative briefing',
      'Assembly / Parliament preparation',
      'Departmental issue mapping',
      'Government scheme insights',
      'Policy implementation support',
    ],
  },
  {
    id: '05',
    title: 'Constituency Intelligence & Strategic Planning',
    bullets: [
      'Ward / village level profiling',
      'Constituency SWOT analysis',
      'Issue mapping & prioritization',
      'Public sentiment assessment',
      'Demographic & socio-economic analysis',
      'Data-driven strategy & planning',
    ],
  },
  {
    id: '06',
    title: 'Citizen Relations & Public Service Management',
    bullets: [
      'Grievance collection systems',
      'Grievance tracking & resolution',
      'Citizen feedback mechanisms',
      'Public consultation programs',
      'People\'s outreach initiatives',
      'Constituency help desk models',
    ],
  },
  {
    id: '07',
    title: 'Community Leadership & Social Inclusion',
    bullets: [
      'Women empowerment initiatives',
      'Youth engagement & leadership',
      'Volunteer network development',
      'Skill development awareness',
      'Community leadership identification',
      'Social impact programs',
    ],
  },
  {
    id: '08',
    title: 'Digital Influence & Media Strategy',
    bullets: [
      'Social media strategy & management',
      'Digital reputation management',
      'Content creation & storytelling',
      'Achievement documentation',
      'Media relations management',
      'Online citizen engagement',
    ],
  },
  {
    id: '09',
    title: 'Administrative Excellence & Institutional Coordination',
    bullets: [
      'Department coordination strategy',
      'Effective review meeting frameworks',
      'Monitoring & follow-up systems',
      'Governance workflow optimization',
      'Project tracking mechanisms',
      'Administrative communication support',
    ],
  },
  {
    id: '10',
    title: 'Resource Mobilisation & Partnerships',
    bullets: [
      'Constituency development roadmap',
      'CSR opportunity identification',
      'Corporate partnership facilitation',
      'NGO convergence support',
      'Government scheme convergence',
      'Impact assessment & reporting',
    ],
  },
  {
    id: '11',
    title: 'Public Trust & Political Sustainability',
    bullets: [
      'Voter engagement frameworks',
      'Public perception analysis',
      'Constituency performance tracking',
      'Achievement documentation',
      'Volunteer & booth level engagement',
      'Continuous public connect strategies',
    ],
  },
  {
    id: '12',
    title: 'Leadership Capacity & Knowledge Systems',
    bullets: [
      'Policy & governance workshops',
      'Team & office capacity building',
      'Research & documentation support',
      'Best practices sharing',
      'Learning resources & updates',
      'Leadership knowledge library',
    ],
  },
]

interface ServiceCardProps {
  service: (typeof services)[0]
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div
      className="group"
      style={{
        background: 'var(--color-surface)',
        padding: '32px',
        height: '100%',
        borderLeft: '2px solid transparent',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-surface-2)'
        e.currentTarget.style.borderLeftColor = 'var(--color-gold)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--color-surface)'
        e.currentTarget.style.borderLeftColor = 'transparent'
      }}
    >
      {/* Card Number */}
      <p
        className="font-inter"
        style={{
          fontSize: 11,
          color: 'var(--color-gold)',
          letterSpacing: '0.2em',
          fontWeight: 500,
          marginBottom: 12,
        }}
      >
        {service.id}
      </p>

      {/* Short gold rule */}
      <div
        style={{
          width: 32,
          height: 1,
          background: 'var(--color-gold-dim)',
          marginBottom: 12,
        }}
      />

      {/* Title */}
      <h3
        className="font-inter group-hover:!text-gold transition-colors duration-200"
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--color-white)',
          lineHeight: 1.4,
          marginBottom: 16,
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
      >
        {service.title}
      </h3>

      {/* Bullets */}
      <ul className="flex flex-col gap-2">
        {service.bullets.map((bullet) => (
          <li
            key={bullet}
            className="font-inter flex items-start gap-2"
            style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.5 }}
          >
            <span style={{ color: 'var(--color-gold)', marginTop: 1, flexShrink: 0 }}>·</span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ServicesSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGsap = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!gridRef.current) return

      const cards = gridRef.current.querySelectorAll('.service-card-item')
      const rowSize = 3

      // Group cards into rows
      const rows: Element[][] = []
      for (let i = 0; i < cards.length; i += rowSize) {
        rows.push(Array.from(cards).slice(i, i + rowSize))
      }

      rows.forEach((row) => {
        ScrollTrigger.batch(row, {
          onEnter: (elements) => {
            gsap.fromTo(
              elements,
              { opacity: 0, y: 32 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: 'power3.out',
              }
            )
          },
          once: true,
          start: 'top 85%',
        })
      })
    }

    initGsap()
  }, [])

  return (
    <section
      id="services"
      className="py-24 md:py-32"
      style={{ background: 'var(--color-black)' }}
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-16">
          <Reveal>
            <p className="eyebrow mb-4">02</p>
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
              360° Leadership & Governance Support
            </h2>
            <p
              className="font-inter"
              style={{
                fontSize: 18,
                color: 'var(--color-muted)',
                lineHeight: 1.7,
                maxWidth: 700,
              }}
            >
              A comprehensive suite of advisory and management services designed specifically
              for political leaders, legislators, and executives.
            </p>
          </Reveal>
        </div>

        {/* Service Grid */}
        <div
          ref={gridRef}
          className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ background: 'var(--color-border)', gap: 1 }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-card-item"
              style={{ opacity: 0 }} // GSAP will animate these in
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
