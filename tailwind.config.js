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
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'black': '#111',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'red': '#f33232',
      },
    extend: {},
  },
  plugins: [],
}