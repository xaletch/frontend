/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      fontSize: {
        sm: '0.8rem',
        base: '0.875',
        x1: '1rem',
        '2xl': '1.125rem',
        '3xl': '1.25rem',
        '4xl': '1.563rem',
        '5xl': '1.953rem',
        '6xl': '2.441rem',
        '7xl': '3.052rem',
      },
    extend: {},
  },
  plugins: [],
}