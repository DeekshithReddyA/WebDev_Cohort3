/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
          fontFamily: {
        sans: ['Roboto', 'Inter', 'Arial', 'sans-serif'], // Customize your font stack
      },
    },
  },
  plugins: [],
}