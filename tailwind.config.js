/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#17B4DA',
        'secondary': '#2F2F2F',
        'tertiary': '#3085C3',
      }
    },
    fontFamily: {
      Lato: ['Lato, sans-serif'],
    },
    container: {
      center:true,
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

