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
        'mainBlue': '#444a9c',
        'mainYellow': '#f4cd57',
        'mainGrey': '#8c8c8c',
        'adminBlue': '#0f172a',
        'adminLightBlue': '#32a2d7',
      },
    },
  },
  plugins: [],
};
