/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bonsai: {
          dark: '#0F0E0D', // Ultra-premium almost-black charcoal (Text)
          stone: '#E8E3DC', // Greige/Stone (Darker Backgrounds)
          beige: '#F2EEEB', // Soft Beige (Main Backgrounds)
          warm: '#FAFAF9', // Off-white/Alabaster (Base Background)
          copper: '#C6A87C', // Accent
          green: '#2C362F', // Forest
          white: '#F7F5F2', // Legacy white
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Outfit', 'sans-serif'], // Keeping it minimalist as requested
        jp: ['Noto Sans JP', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.04%22/%3E%3C/svg%3E')",
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'luxury': 'cubic-bezier(0.2, 0.8, 0.2, 1)', // Updated to a quint-like smoother ease
        'slow': 'cubic-bezier(0.5, 0, 0, 1)',
      }
    }
  },
  plugins: [],
}
