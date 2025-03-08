/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue1' :"#00D4F5",
        'blue2' :"#1C4980",
      },
    },
  },
  plugins: [],
}