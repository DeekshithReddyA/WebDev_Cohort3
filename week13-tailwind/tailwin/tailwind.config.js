/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue : {
          1000 : "#00225b",
          950: "#0c3b6a"
        },
        green : {
          1000 : "#00ecd0"
        },
        gray : {
          950 : "#7994ac"
        }
      }
    },
  },
  plugins: [],
}