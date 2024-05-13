/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'krono': {
          lime: '#83b81a',
          green: '#006633',
          pink: '#e13288',
          yellow: 'ffd300',
        },
      },
    },
  },
  plugins: [],
}

