/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.125rem',
        '2xl': '1.25rem',
        '3xl': '1.563rem',
        '4xl': '1.953rem',
        '5xl': '2.441rem',
        '6xl': '3.052rem',
      },
    extend: {},
  },
  plugins: [],
}