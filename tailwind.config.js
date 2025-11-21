/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          bg: '#F3E8FF',      // Light Purple Background
          main: '#7C3AED',    // Membit Purple (Vibrant)
          accent: '#C084FC',  // Lighter Purple
          selection: '#A6A6FF', // Custom Selection Purple
          yellow: '#FEF08A',  // Yellow
          pink: '#F472B6',    // Pink
          blue: '#67E8F9',    // Cyan
          green: '#A3E635',   // Lime
          black: '#1a1a1a',   // Soft Black
          white: '#ffffff',   // White
        },
      },
      boxShadow: {
        neo: '4px 4px 0px 0px #1a1a1a',
        'neo-lg': '8px 8px 0px 0px #1a1a1a',
        'neo-sm': '2px 2px 0px 0px #1a1a1a',
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
