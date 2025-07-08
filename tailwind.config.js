/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#040404',
        'brand-dark': '#2e2c2c',
        'brand-dark-gray': '#1a1a1a',
        'brand-light-gray': '#e4e4e4',
        'brand-white': '#ffffff',
        'brand-mid-gray': '#9f9f9f',
        'brand-copper': '#47B139',
        'brand-dark-copper': '#173B29',
        'brand-blue': '#194C99',
        'brand-blue-dark': '#103163',
        'brand-bronse': '#D3A273'
      },
      fontFamily: {
        sans: ['Roboto Flex', 'sans-serif'], // ← Это основной шрифт
        primary: ['Roboto Flex', 'sans-serif'], // Дублируем как primary
        secondary: ['Roboto Flex', 'sans-serif'],
      },
      transitionDuration: {
        '400': '0.4s',
      },
      boxShadow: {
        'custom': '3px 0px 3px 2px #9f9f9f',
        'card': '0 2px 8px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#d3a273 transparent',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            'background-color': '#d3a273',
            'border-radius': '3px'
          }
        }
      });
    }
  ],
}