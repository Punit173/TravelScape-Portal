/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFD700', // Yellow
          dark: '#B39700',
          light: '#FFE44D',
        },
        secondary: {
          DEFAULT: '#121212', // Dark background
          light: '#1E1E1E',
          dark: '#000000',
        },
        accent: {
          DEFAULT: '#FFB800',
          dark: '#CC9200',
          light: '#FFCC4D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}