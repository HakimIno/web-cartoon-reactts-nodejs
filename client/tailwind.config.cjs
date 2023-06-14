/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.font-class': {
          'font-family': 'KeeponTruckin',
        },
        '.font-SF': {
          'font-family': 'SFProTH',
        },
      })
    },
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
  ],
};
