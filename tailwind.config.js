/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './src/**/*.{js,jsx,ts,tsx}', '/index.html' ],
  theme: {
    extend: {
      colors: {
        'primary': '#17B4DA',
        'secondary': '#2F2F2F',
      }
    },
    fontFamily: {
      Lato: ['Lato, sans-serif'],
    },
    container: {
      center: true,
      padding: '1rem',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
  },
  plugins: [],
}

