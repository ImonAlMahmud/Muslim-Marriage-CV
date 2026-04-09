/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#064e3b', // Original Primary
          950: '#022c22', // Modern Primary
        },
        gold: {
          light: '#D4AF37',
          DEFAULT: '#B08968', // Classic Secondary
          dark: '#634832', // Gold Primary
        },
        ivory: {
          light: '#FFFCF5',
          DEFAULT: '#fcf9f2', // Classic UI BG
          dark: '#f5f2e8',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Outfit"', 'Georgia', 'serif'],
        bengali: ['"Hind Siliguri"', 'sans-serif'],
        arabic: ['"Amiri"', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(6, 78, 59, 0.08)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
      },
      animation: {
        'shimmer': 'shimmer 3s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
