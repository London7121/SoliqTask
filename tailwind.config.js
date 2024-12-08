/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 1s linear infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      colors: {
        // Light mode colors
        'light-bg': '#ffffff',
        'light-text': '#333333',
        'light-primary': '#2189FF',
        'light-secondary': '#F5F5F5',

        // Dark mode colors
        'dark-bg': '#121212',
        'dark-text': '#E0E0E0',
        'dark-primary': '#4D9FEC',
        'dark-secondary': '#1E1E1E',
      },
      backgroundColor: {
        'light-body': '#F4F4F4',
        'dark-body': '#0A0A0A'
      }
    },
  },
  plugins: [],
}
