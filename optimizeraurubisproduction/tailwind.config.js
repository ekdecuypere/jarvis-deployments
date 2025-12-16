/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aurubis: {
          copper: '#B87333',
          dark: '#1a1a2e',
          navy: '#16213e',
          accent: '#0f3460',
          gold: '#e94560',
          silver: '#C0C0C0',
          platinum: '#E5E4E2'
        }
      }
    },
  },
  plugins: [],
}
