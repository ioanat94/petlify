/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'mainFont': ['Montserrat', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        'mainBlue': '#5a61cb',
        'mainYellow': '#f4cd57',
        'mainGrey': '#8c8c8c',
      },
    },
  },
  plugins: [],
};
