module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    
    extend: {
      backgroundImage: theme => ({

        // 'joke-cover': "url('./img/smile.png')",
       })
    },
  },
  variants: {
    opacity: ({ after }) => after(['disabled']),
    cursor :({after}) => after(['disabled']),
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
