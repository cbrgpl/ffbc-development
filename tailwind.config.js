const remark = require( 'remark' )

module.exports = {
  purge: {
    transform: {
      content: [ './index.html', './src/**/*.{vue,js,ts,jsx,tsx}' ],
      md: ( content ) => {
        return remark().process( content )
      }
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
