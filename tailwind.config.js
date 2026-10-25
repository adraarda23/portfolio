/** @type {import('tailwindcss').Config} */

/**
 * Warm palette
 * cream  — paper-like canvas and surfaces
 * cocoa  — text and neutrals (warm brown instead of cold grey)
 * clay   — primary terracotta accent (600 passes AA on cream and with white text)
 * sage   — calm secondary accent
 * honey  — sunny highlight, used sparingly
 */
const cocoa = {
  50: '#FAF6F1',
  100: '#F1E9E0',
  200: '#E2D5C8',
  300: '#CBB9A8',
  400: '#A8937F',
  500: '#76624F',
  600: '#6B5A4E',
  700: '#54453B',
  800: '#3D312A',
  900: '#2B201A',
  950: '#1E1611',
}

const cream = {
  50: '#FFFCF7',
  100: '#FBF5EC',
  200: '#F5EBDD',
  300: '#EBDCC7',
  400: '#DCC7AA',
}

const clay = {
  50: '#FCEEE7',
  100: '#F8DCCD',
  200: '#F0BBA2',
  300: '#E5946F',
  400: '#D8774F',
  500: '#C8623E',
  600: '#B4532F',
  700: '#934224',
  800: '#73341E',
  DEFAULT: '#B4532F',
}

const sage = {
  50: '#EFF3EC',
  100: '#DDE6D8',
  200: '#BCCDB5',
  300: '#97B08E',
  400: '#7A9771',
  500: '#6A8763',
  600: '#5E7A5A',
  700: '#4F6B4C',
  800: '#3E543C',
  DEFAULT: '#5E7A5A',
}

const honey = {
  50: '#FDF5E3',
  100: '#FAE8BF',
  200: '#F4D48A',
  300: '#EDBF59',
  400: '#E3A33B',
  500: '#CF8A26',
  600: '#B3731B',
  700: '#9A6414',
  DEFAULT: '#E3A33B',
}

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cocoa,
        // Neutral utilities across the app (incl. admin) resolve to the warm scale.
        stone: cocoa,
        cream,
        clay,
        sage,
        honey,
        // Legacy aliases kept so older class names follow the new palette.
        ink: {
          0: '#FFFFFF',
          950: cream[100],
          900: cream[200],
          800: cream[300],
          700: cream[400],
          600: cocoa[300],
        },
        accent: {
          DEFAULT: clay[600],
          soft: clay[500],
          cyan: sage[600],
          pink: clay[400],
          amber: honey[700],
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(43, 32, 26, 0.04), 0 8px 24px -12px rgba(115, 52, 30, 0.18)',
        lift: '0 2px 4px rgba(43, 32, 26, 0.05), 0 24px 48px -20px rgba(115, 52, 30, 0.32)',
        glow: '0 10px 30px -10px rgba(180, 83, 47, 0.55)',
        card: '0 1px 2px rgba(43, 32, 26, 0.04), 0 8px 24px -12px rgba(115, 52, 30, 0.18)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.06)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.97)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '30%': { opacity: '0.7' },
          '100%': { transform: 'translateY(-18px) scaleX(1.3)', opacity: '0' },
        },
        wave: {
          '0%, 60%, 100%': { transform: 'rotate(0deg)' },
          '10%, 30%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 22s ease-in-out infinite',
        marquee: 'marquee 45s linear infinite',
        steam: 'steam 3s ease-out infinite',
        wave: 'wave 2.4s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'spin-slow': 'spinSlow 40s linear infinite',
      },
    },
  },
  plugins: [],
}
