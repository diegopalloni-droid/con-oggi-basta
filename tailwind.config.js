/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'brand-start': '#16a34a', // green-600
        'brand-end': '#15803d',   // green-700
      }
    },
  },
  plugins: [],
}
