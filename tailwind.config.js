/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5b8cff',
        accent: '#7c3aed',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124, 58, 237, 0.2), 0 20px 80px rgba(59, 130, 246, 0.25)',
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(circle at 20% 20%, rgba(124,58,237,.2), transparent 28%), radial-gradient(circle at 80% 0%, rgba(59,130,246,.25), transparent 35%), radial-gradient(circle at 80% 80%, rgba(56,189,248,.18), transparent 30%)',
      },
    },
  },
  plugins: [],
}

