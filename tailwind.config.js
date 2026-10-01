/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0b2e6b',
          50: '#e8eefa',
          100: '#c7d6f1',
          200: '#9db6e5',
          300: '#6f92d8',
          400: '#4b73cb',
          500: '#2c56ba',
          600: '#1a3f9c',
          700: '#122e79',
          800: '#0b2e6b',
          900: '#081f4a',
          950: '#05142f',
        },
        gold: {
          DEFAULT: '#f5a623',
          light: '#ffc861',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(11,46,107,0.25)',
        glass: '0 8px 32px -8px rgba(11,46,107,0.18), inset 0 1px 0 0 rgba(255,255,255,0.4)',
        'glass-lg': '0 20px 60px -12px rgba(11,46,107,0.28), inset 0 1px 0 0 rgba(255,255,255,0.45)',
        'glass-dark': '0 8px 32px -8px rgba(0,0,0,0.35), inset 0 1px 0 0 rgba(255,255,255,0.08)',
        glow: '0 0 40px -8px rgba(245,166,35,0.45)',
        'glow-navy': '0 0 40px -8px rgba(11,46,107,0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-18px,0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(20px,-24px,0) scale(1.06)' },
        },
        shine: {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '100%': { transform: 'translateX(250%) skewX(-20deg)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.45' },
          '100%': { transform: 'scale(2.8)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float-slow 14s ease-in-out infinite',
        shine: 'shine 2.6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        ripple: 'ripple 700ms ease-out forwards',
      },
      transitionDuration: {
        350: '350ms',
      },
    },
  },
  plugins: [],
}