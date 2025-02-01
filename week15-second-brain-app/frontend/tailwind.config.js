/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple:  {
          1200 : "#9e00ec",
          1100 : "#bc2ff0",
          1000 : "#d498f3"
        }
      },
      // fontFamily:{
      //   sans: ['ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
      // }
    },
  },
  plugins: [],
}

