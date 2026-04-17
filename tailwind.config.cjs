/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 60px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
