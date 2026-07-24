import type { Metadata } from 'next'
import { Playfair_Display, Inter, Noto_Serif_Tamil } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ['tamil'],
  variable: '--font-tamil',
  display: 'swap',
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  title: 'Thalaimai 360 | Leadership. Governance. Impact.',
  description:
    'Thalaimai 360 is a premier governance and political leadership consulting firm based in Tamil Nadu, India — empowering elected representatives to transform mandates into measurable public impact.',
  keywords: [
    'Thalaimai 360',
    'governance consulting Tamil Nadu',
    'political leadership training',
    'constituency development',
    'elected representative support',
    'governance strategy India',
  ],
  authors: [{ name: 'Thalaimai 360' }],
  openGraph: {
    title: 'Thalaimai 360 | Leadership. Governance. Impact.',
    description:
      `Transforming Electoral Mandates into Measurable Public Impact. Premium governance and leadership consulting for Tamil Nadu's elected leaders.`,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thalaimai 360 | Leadership. Governance. Impact.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${notoSerifTamil.variable}`}
    >
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
