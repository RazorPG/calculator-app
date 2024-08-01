/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-calc': 'inset 0 -5px 0 5px  rgb(26,46,53)',
        'inner-btn-primary': 'inset 0 -5px 0 3px  #dde1e0',
        'inner-btn-secondary': 'inset 0 0px 0 3px  rgba(0,168,143,1)',
        'inner-btn-link': "inset -4px -4px 0 2px rgba(0, 0, 0, 0.2)",
        'inner-input' : 'inset 0 0 7px 5px rgb(26,46,53)'
      },
      backgroundColor: {
        'color-primary': 'rgb(42, 69, 78)',
        'color-secondary' : '#0addbc',
        'input' : 'rgba(1,167,143,255)'
      },
      backgroundImage: {
        'main' : "radial-gradient(at left top, rgba(1, 127, 7, 1.0), rgba(6, 17, 92, 1.0))"
      },
      textColor: {
        'color-primary' :'#005a48',
      }
    },
  },
  plugins: [],
}

