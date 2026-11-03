/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#07080B",
          cyan: "#00F2FE",
          pink: "#FF007A",
        }
      }
    },
  },
  plugins: [],
}