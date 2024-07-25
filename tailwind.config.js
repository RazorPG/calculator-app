/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-btn': 'inset -5px -3px 0 5px  rgba(0, 0, 0, 0.2)'
      }
    },
  },
  plugins: [],
}

