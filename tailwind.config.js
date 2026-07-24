/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black:        '#090F1F',
        surface:      '#0F1A33',
        'surface-2':  '#162040',
        red:          '#D44535',
        'red-light':  '#E86050',
        'red-dim':    '#7A261C',
        navy:         '#1C3461',
        'navy-light': '#2A4A80',
        white:        '#F0F4FF',
        muted:        '#7A92B8',
        border:       '#1E3468',
        'border-red': '#3A1810',
        /* aliases so existing Tailwind classes still work */
        gold:         '#D44535',
        'gold-light': '#E86050',
        'gold-dim':   '#7A261C',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter:    ['var(--font-inter)', 'Helvetica Neue', 'sans-serif'],
        tamil:    ['var(--font-tamil)', 'serif'],
      },
      backdropBlur: { xl: '20px' },
      animation: {
        'pulse-red': 'pulseRed 2s ease-in-out infinite',
      },
      keyframes: {
        pulseRed: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.76, 0, 0.24, 1)',
        reveal:  'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
