import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0a',
        card: '#111111',
        'card-hover': '#1a1a1a',
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-glow':  'pulseGold 3s ease-in-out infinite',
        'grid-move':   'gridMove 25s linear infinite',
        'glitch':      'glitch 0.4s steps(4) forwards',
        'sweep-in':    'sweepIn 1.2s cubic-bezier(0.76,0,0.24,1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-14px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245,158,11,0.3)' },
          '50%':       { boxShadow: '0 0 40px rgba(245,158,11,0.6)' },
        },
        gridMove: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        glitch: {
          '0%':   { textShadow: 'none',                          transform: 'translate(0)' },
          '20%':  { textShadow: '-2px 0 #f59e0b, 2px 0 #ef4444', transform: 'translate(-1px,0)' },
          '40%':  { textShadow: '2px 0 #ef4444, -2px 0 #fbbf24', transform: 'translate(1px,0)' },
          '60%':  { textShadow: 'none',                          transform: 'translate(0)' },
          '80%':  { textShadow: '1px 0 #f59e0b, -1px 0 #ef4444', transform: 'translate(0)' },
          '100%': { textShadow: 'none',                          transform: 'translate(0)' },
        },
        sweepIn: {
          '0%':   { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}

export default config
