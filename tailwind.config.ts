import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        bg:    '#09090D',
        surf:  '#111117',
        hi:    '#C4A9FF',
        ink:   '#EDEAF4',
        muted: '#66636F',
        faint: '#3A3842',
      },
    },
  },
  plugins: [],
} satisfies Config
