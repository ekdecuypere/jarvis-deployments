/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aurubis: {
          copper: '#B87333',
          dark: '#1a1a2e',
          green: '#10B981',
          blue: '#3B82F6',
          orange: '#F59E0B',
          red: '#EF4444'
        }
      }
    },
  },
  plugins: [],
}
