/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#fdf8f0',
          900: '#f8efe2',
          800: '#f1e4d1',
          700: '#e8d7bf',
          600: '#d8c3a5',
        },
        accent: {
          DEFAULT: '#ef7d22',
          soft: '#f59e3b',
          cyan: '#e3b32c',
          pink: '#e2673f',
          amber: '#f4c54a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(239, 125, 34, 0.55)',
        'glow-cyan': '0 0 40px -10px rgba(227, 179, 44, 0.5)',
        card: '0 1px 0 0 rgba(255,255,255,0.7) inset, 0 20px 50px -30px rgba(120, 70, 20, 0.35)',
      },
      backgroundImage: {
        'grid-dots':
          'radial-gradient(circle at 1px 1px, rgba(120,70,20,0.12) 1px, transparent 0)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-ring': 'pulseRing 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
      },
    },
  },
  plugins: [],
}
