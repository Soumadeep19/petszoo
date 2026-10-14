/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        flipkart: {
          blue: '#2874f0',
          darkBlue: '#1a5bc4',
          yellow: '#ffe500',
          orange: '#fb641b',
          green: '#388e3c',
          lightGray: '#f1f2f4',
          textDark: '#212121',
          textMuted: '#878787',
          border: '#e0e0e0',
          badgeBg: '#f0f5ff'
        }
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', '-apple-system', 'sans-serif']
      }
    },
  },
  plugins: [],
}
