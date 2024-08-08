/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-calc': 'inset 0 -15px 0 5px  rgb(26,46,53)',
        'btn-primary': '0 8px 0 rgba(221, 225, 224, 0.5)',
        'btn-secondary': '0 8px 0 rgba(0,168,143,0.5)',
        'inner-input' : ' 0 -2px 0 5px rgba(26,46,53, 0.5)'
      },
      backgroundColor: {
        'color-primary': '#2A454E',
        'color-secondary' : 'rgba(10, 221, 188, 1)',
        'color-third' : "rgba(221, 225, 224, 1)",
        'input' : 'rgba(1,167,143,255)',
        'modal' : 'rgba(0, 0, 0, 0.5)',
        'glassInput' : 'rgba(255, 255, 255, 0.8)'
      },
      textColor: {
        'color-primary' :'#005a48',
      },
    },
  },
  plugins: [
  ],
}

