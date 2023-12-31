/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      fontSize: {
        vsm: '0.5rem',
        sm: '0.8rem',
        base: '0.875',
        x1: '1rem',
        '2xl': '1.125rem',
        '3xl': '1.25rem',
        '4xl': '1.563rem',
        '5xl': '1.953rem',
        '6xl': '2.441rem',
        '7xl': '3.052rem',
        '8xl': '3.75rem',
        '10xl': '10rem'
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
        'silver2': '#D1D1D9',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'red': '#f33232',
        'secondary': '#F1F1F1',
        'light-grey': '#E0E0E0',
        'grey': '#C6C6C6',
        'dark': '#1f1f1f',
        'light': '#E4E4E4',
        'secondary2': '#F6F6F6',
        'black05': 'rgba(0, 0, 0, 0.100)',
        'noteName': '#333332',
        'note': '#b3b3b1',
        'username': 'rgba(55, 53, 47, 0.65)',
        'select': '#0000000a',
        'grey2': '#676767',
        'light-gray2': '#ABABAB',
        'white-2': '#F0F0F0',
        'text-home': '#050505',
        'button': '#121212',
        'button2': 'hsl(0, 0%, 100%)',
        'btn-hover': 'hsl(0, 0%, 96%)',
        'color-note': 'rgba(103, 103, 103)',
        'menu-bg': 'rgba(50, 50, 50, 5%)',
      },
    extend: {},
  },
  plugins: [],
}