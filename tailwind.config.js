/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ["Inter", "system-ui", "sans-serif"],
      inter: ["Inter", "system-ui", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    colors: {
      primary: {
        50: "#fff1f2",
        100: "#ffe4e6",
        200: "#fecdd3",
        300: "#fda4af",
        400: "#fb7185",
        500: "#f43f5e",
        600: "#e11d48",
        700: "#be123c",
        800: "#9f1239",
        900: "#881337",
      },
      secondary: {
        50: "#f8fafc",
        // 50: "#f8fafc",
        100: "#F0F2F3",
        150: "#F1F1F1",
        200: "#E1E4E8",
        250: "#DADCE0",
        300: "#C2C5C8",
        400: "#62656C",
        450: "rgba(55, 53, 47, 0.45)",
        500: "#64748b",
        550: "rgba(55, 53, 47, 0.5)",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "rgb(10, 10, 10)",
        950: "#3f3f3f",
      },
      white: {
        50: "#FFF",
      },
    },
    extend: {
      height: {
        custom: "calc(100vh - 76px)",
      },
    },
  },
  plugins: [],
};
