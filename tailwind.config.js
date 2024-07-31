/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-calc': 'inset -5px -3px 0 3px  #1a2e35',
        'inner-btn': 'inset 0 0 0 5px  #dde1e0',
        'inner-btn-hover': 'inset 0 0 0 5px  rgba(0,168,143,.5)',
        'inner-btn-link': "inset -4px -4px 0 2px rgba(0, 0, 0, 0.2)"
      },
      backgroundColor: {
        'color-primary': '#2a454e',
        'color-secondary' : '#0addbc',
      },
      textColor: {
        'color-primary' :'#005a48',
      }
    },
  },
  plugins: [],
}

