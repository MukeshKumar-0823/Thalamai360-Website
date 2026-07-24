'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './AnimationUtils'
import ServiceModal, { ServiceDetail } from './ServiceModal'
import { ExternalLink, Filter, Search } from 'lucide-react'

const servicesData: ServiceDetail[] = [
  {
    id: '01',
    title: 'Executive Leadership Development',
    category: 'executive',
    categoryLabel: 'Leadership & Mentoring',
    summary: 'Personalized executive coaching, public branding, and high-performance mindset cultivation tailored for elected officials.',
    bullets: [
      'Leadership coaching & mentoring',
      'Personal branding & public image',
      'Dress etiquette & executive grooming',
      'Time management & productivity',
      'Stress & stakeholder management',
      'High performance mindset',
    ],
    deliverables: [
      'Executive Leadership Playbook',
      'Personal Brand Architecture',
      'Quarterly Grooming & Time Audit',
    ],
    impactMetrics: '100% Personal Office Efficiency Boost',
  },
  {
    id: '02',
    title: 'Strategic Communication & Public Influence',
    category: 'communication',
    categoryLabel: 'Media & Messaging',
    summary: 'High-impact speechwriting, stage presence coaching, media interview preparation, and crisis communication management.',
    bullets: [
      'Speech writing & messaging',
      'Public speaking & stage presence',
      'Media interview preparation',
      'Press meets & media handling',
      'Crisis communication management',
      'Persuasive communication skills',
    ],
    deliverables: [
      'Keynote & Speech Archive',
      'Media Interview Briefing Kits',
      '24/7 Crisis Response Protocol',
    ],
    impactMetrics: '3x Positive Statewide Media Mentions',
  },
  {
    id: '03',
    title: 'Stakeholder Relations & Public Affairs',
    category: 'constituency',
    categoryLabel: 'Citizen & Community Connect',
    summary: 'Structured citizen engagement strategy, party cadre coordination, NGO partnerships, and industry relationship management.',
    bullets: [
      'Citizen engagement strategy',
      'Community relationship building',
      'Party cadre engagement',
      'NGO & civil society partnerships',
      'Industry & business relations',
      'Key stakeholder relationship management',
    ],
    deliverables: [
      'Stakeholder Mapping Directory',
      'Cadre Outreach Workflows',
      'Civil Society Convergence Matrix',
    ],
    impactMetrics: 'Grassroots Network Reach +150%',
  },
  {
    id: '04',
    title: 'Governance, Policy & Legislative Advisory',
    category: 'governance',
    categoryLabel: 'Policy & Assembly Advisory',
    summary: 'Legislative bill briefs, Assembly / Parliament debate preparation, departmental issue mapping, and government scheme insights.',
    bullets: [
      'Policy & issue analysis',
      'Bills, rules & legislative briefing',
      'Assembly / Parliament preparation',
      'Departmental issue mapping',
      'Government scheme insights',
      'Policy implementation support',
    ],
    deliverables: [
      'House Assembly Session Briefs',
      'Departmental Scheme Dossier',
      'Zero-Defect Legislative Briefings',
    ],
    impactMetrics: '100% Assembly Question Readiness',
  },
  {
    id: '05',
    title: 'Constituency Intelligence & Strategic Planning',
    category: 'constituency',
    categoryLabel: 'Demographic Data & Intelligence',
    summary: 'Ward/village level demographic profiling, constituency SWOT analysis, voter sentiment assessment, and data-driven planning.',
    bullets: [
      'Ward / village level profiling',
      'Constituency SWOT analysis',
      'Issue mapping & prioritization',
      'Public sentiment assessment',
      'Demographic & socio-economic analysis',
      'Data-driven strategy & planning',
    ],
    deliverables: [
      'Constituency Master Atlas',
      'Voter Sentiment Heatmaps',
      '5-Year Development Strategy Roadmap',
    ],
    impactMetrics: '234-Ward Granular Intelligence Coverage',
  },
  {
    id: '06',
    title: 'Citizen Relations & Public Service Management',
    category: 'constituency',
    categoryLabel: 'Grievance & Office Operations',
    summary: 'Digital grievance collection software, public consultation programs, and constituency help desk operational models.',
    bullets: [
      'Grievance collection systems',
      'Grievance tracking & resolution',
      'Citizen feedback mechanisms',
      'Public consultation programs',
      'People\'s outreach initiatives',
      'Constituency help desk models',
    ],
    deliverables: [
      'Custom Grievance Portal App',
      'Constituency Office Operating Manual',
      'Monthly Grievance Resolution Audit',
    ],
    impactMetrics: '90%+ Grievance Resolution Speed Improvement',
  },
  {
    id: '07',
    title: 'Community Leadership & Social Inclusion',
    category: 'constituency',
    categoryLabel: 'Youth & Community Programs',
    summary: 'Women empowerment initiatives, youth leadership networks, volunteer management, and social impact programs.',
    bullets: [
      'Women empowerment initiatives',
      'Youth engagement & leadership',
      'Volunteer network development',
      'Skill development awareness',
      'Community leadership identification',
      'Social impact programs',
    ],
    deliverables: [
      'Youth Leadership Council Charter',
      'Women Entrepreneurship Schemes',
      'Volunteer Action Unit Network',
    ],
    impactMetrics: '10,000+ Active Youth Volunteers Mobilized',
  },
  {
    id: '08',
    title: 'Digital Influence & Media Strategy',
    category: 'communication',
    categoryLabel: 'Digital & Reputation Management',
    summary: 'Omnichannel social media strategy, digital reputation building, achievement documentation, and online citizen engagement.',
    bullets: [
      'Social media strategy & management',
      'Digital reputation management',
      'Content creation & storytelling',
      'Achievement documentation',
      'Media relations management',
      'Online citizen engagement',
    ],
    deliverables: [
      'Monthly Content Calendar & Assets',
      'Official Achievement Documentary',
      'Digital Reputation Audit',
    ],
    impactMetrics: '1M+ Organic Digital Impressions',
  },
  {
    id: '09',
    title: 'Administrative Excellence & Institutional Coordination',
    category: 'governance',
    categoryLabel: 'Administrative Workflows',
    summary: 'Department coordination frameworks, effective review meeting models, monitoring systems, and governance optimization.',
    bullets: [
      'Department coordination strategy',
      'Effective review meeting frameworks',
      'Monitoring & follow-up systems',
      'Governance workflow optimization',
      'Project tracking mechanisms',
      'Administrative communication support',
    ],
    deliverables: [
      'Departmental Review Meeting Matrix',
      'Project Tracking Dashboard',
      'Administrative Protocol Manual',
    ],
    impactMetrics: '2x Speed in Inter-Department Clearance',
  },
  {
    id: '10',
    title: 'Resource Mobilisation & Partnerships',
    category: 'governance',
    categoryLabel: 'CSR & Infrastructure Partnerships',
    summary: 'CSR opportunity identification, corporate partnership facilitation, NGO convergence, and sustainable constituency development.',
    bullets: [
      'Constituency development roadmap',
      'CSR opportunity identification',
      'Corporate partnership facilitation',
      'NGO convergence support',
      'Government scheme convergence',
      'Impact assessment & reporting',
    ],
    deliverables: [
      'CSR Infrastructure Funding Prospectus',
      'Corporate Partnership MoUs',
      'Annual Impact Assessment Report',
    ],
    impactMetrics: 'Rs. 10 Cr+ Non-Governmental Funds Facilitated',
  },
  {
    id: '11',
    title: 'Public Trust & Political Sustainability',
    category: 'executive',
    categoryLabel: 'Electoral Sustainability',
    summary: 'Voter engagement frameworks, public perception analysis, constituency performance tracking, and booth-level connect strategies.',
    bullets: [
      'Voter engagement frameworks',
      'Public perception analysis',
      'Constituency performance tracking',
      'Achievement documentation',
      'Volunteer & booth level engagement',
      'Continuous public connect strategies',
    ],
    deliverables: [
      'Electoral Perception Report',
      'Booth Level Connect Manual',
      'Continuous Trust Audit',
    ],
    impactMetrics: 'Continuous Electoral Credibility Benchmark',
  },
  {
    id: '12',
    title: 'Leadership Capacity & Knowledge Systems',
    category: 'executive',
    categoryLabel: 'Institutional Knowledge',
    summary: 'Policy workshops, team capacity building, research support, best practices sharing, and leadership knowledge library.',
    bullets: [
      'Policy & governance workshops',
      'Team & office capacity building',
      'Research & documentation support',
      'Best practices sharing',
      'Learning resources & updates',
      'Leadership knowledge library',
    ],
    deliverables: [
      'Constituency Office Staff Certification',
      'Policy Reference Compendium',
      'Monthly Governance Briefs',
    ],
    impactMetrics: '100% Certified Office Operations',
  },
]

export default function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null)

  const filteredServices = servicesData.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.bullets.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleSelectConsultation = (serviceTitle: string) => {
    const contactSec = document.querySelector('#contact')
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' })
      const reqTextarea = document.querySelector('#contact-requirements') as HTMLTextAreaElement
      if (reqTextarea) {
        reqTextarea.value = `Inquiry regarding Advisory Service: ${serviceTitle}`
      }
    }
  }

  return (
    <section id="services" className="py-24 md:py-32 bg-black border-t border-border relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal>
            <p className="eyebrow mb-3">02</p>
            <h2 className="font-playfair text-3xl md:text-5xl text-white font-semibold leading-tight">
              360° Leadership & Governance Advisory
            </h2>
          </Reveal>
          <p className="text-muted text-base max-w-lg font-inter">
            A comprehensive suite of advisory and management services designed specifically for political leaders, legislators, and executives.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 p-4 rounded border border-border bg-surface">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'All 12 Capabilities' },
              { id: 'executive', label: 'Executive Leadership' },
              { id: 'communication', label: 'Communication & Media' },
              { id: 'governance', label: 'Policy & Assembly' },
              { id: 'constituency', label: 'Constituency & Citizens' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase font-inter transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-red text-white shadow-lg'
                    : 'bg-black/40 text-muted hover:text-white hover:bg-surface-2'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search capability..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-border/80 rounded pl-9 pr-4 py-2 text-xs text-white placeholder-muted focus:outline-none focus:border-red font-inter"
            />
          </div>
        </div>

        {/* Service Grid */}
        <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border rounded overflow-hidden">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group p-8 bg-surface hover:bg-surface-2 transition-all flex flex-col justify-between cursor-pointer border-l-2 border-transparent hover:border-red"
              onClick={() => setActiveModalService(service)}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="eyebrow">{service.id}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted group-hover:text-red font-inter transition-colors">
                    {service.categoryLabel}
                  </span>
                </div>

                <div className="w-8 h-[1px] bg-red-dim mb-4" />

                <h3 className="font-inter text-lg font-semibold text-white group-hover:text-red transition-colors leading-snug mb-3">
                  {service.title}
                </h3>

                <p className="text-xs text-muted font-inter leading-relaxed line-clamp-2 mb-4">
                  {service.summary}
                </p>

                <ul className="space-y-1.5 mb-6">
                  {service.bullets.slice(0, 4).map((bullet) => (
                    <li key={bullet} className="text-xs text-muted font-inter flex items-start gap-2">
                      <span className="text-red">·</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                  {service.bullets.length > 4 && (
                    <li className="text-[11px] text-red font-semibold font-inter pt-1">
                      +{service.bullets.length - 4} More Advisory Modules
                    </li>
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-white group-hover:text-red font-inter transition-colors">
                <span>View Scope & Deliverables</span>
                <ExternalLink size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Popup */}
        <ServiceModal
          service={activeModalService}
          onClose={() => setActiveModalService(null)}
          onSelectConsultation={handleSelectConsultation}
        />
      </div>
    </section>
  )
}
