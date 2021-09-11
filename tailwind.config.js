const defaultTheme = require( 'tailwindcss/defaultTheme' )
const plugin = require( 'tailwindcss/plugin' )
const purgeSafelist = require( './tailwind.config.safelist' )

const textShadowUtility = plugin( function ( { addUtilities } ) {
  const newUtilities = {
    '.text-shadow': {
      'text-shadow': '2px 2px 4px black'
    },
    '.text-shadow-md': {
      'text-shadow': '4px 4px 8px black'
    },
    '.text-shadow-lg': {
      'text-shadow': '15px 15px 30px black'
    },
    '.text-shadow-none': {
      'text-shadow': 'none'
    },

  }

  addUtilities( newUtilities )
} )

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'jit' : '',
  purge: {
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    safelist: purgeSafelist
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: {
        lightest: '#686c67',
        lighten: '#242320',
        DEFAULT: '#1a1916',

        primary: '#383030',
      },
      white: '#e4e4e4',
      placeholder: '#b2b2b2',

      safety: {
        darken: '#347f37',
        DEFAULT: '#49a24c'
      },
      message: '#2563EB',
      danger: {
        darken: '#f27e21',
        DEFAULT: '#fd9726',
      },

      primary: {
        darkest: '#8c1313',
        darken: '#c41d1e',
        DEFAULT: '#d12525',
        lighten: '#d32625',
        lightest: '#f43c2a'
      },
      secondary: {
        darken: '#003c8f',
        DEFAULT: '#1565c0',
        lighten: '#5e92f3'
      },
    },
    extend: {
      fontFamily: {
        sans: [ '\'Ubuntu\'', defaultTheme.fontFamily.sans ],
      },
      zIndex: {
        '-10': '-10'
      },
    }
  },
  variants: {
    extend: {
      margin: [ 'last' ]
    }
  },
  plugins: [ textShadowUtility ],
}
